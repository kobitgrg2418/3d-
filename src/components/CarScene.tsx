"use client";

import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

/* ================= CONSTANTS ================= */
const LERP_TAU = 8;
const SNAP = 0.002;
const FPS = 120; // Blender timeline: 1200 frames @ 120fps
const FRAME_COUNT = 1200;
const DUR = FRAME_COUNT - 1;

// Blender keyframe windows (frame numbers)
const ramp = (frame: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (frame - a) / (b - a)));

/* ================= SCENE ================= */
type SceneProps = {
  containerRef: RefObject<HTMLElement | null>;
  onProgress: (p: number) => void;
  onReady: () => void;
};

// soft volumetric-looking headlight beam
function makeBeam(angle: number, length: number) {
  const geo = new THREE.ConeGeometry(Math.tan(angle) * length, length, 48, 1, true);
  geo.translate(0, -length / 2, 0);
  geo.rotateX(Math.PI / 2); // apex at origin, opens toward -Z
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uOpacity: { value: 0 }, uLen: { value: length } },
    vertexShader: `
      varying vec3 vN; varying vec3 vV; varying float vT; uniform float uLen;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        vT = clamp(-position.z / uLen, 0.0, 1.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying vec3 vN; varying vec3 vV; varying float vT; uniform float uOpacity;
      void main(){
        float edge = pow(abs(dot(normalize(vN), normalize(vV))), 2.0);
        float fall = pow(1.0 - vT, 1.6) * smoothstep(0.0, 0.06, vT);
        gl_FragColor = vec4(vec3(0.75,0.85,1.0) * edge * fall * uOpacity, 1.0);
      }`,
  });
  return new THREE.Mesh(geo, mat);
}

export function CarScene({ containerRef, onProgress, onReady }: SceneProps) {
  const gltf = useGLTF("/car.glb");
  const { camera, size } = useThree();

  const rig = useMemo(() => {
    const root = gltf.scene;
    const mixer = new THREE.AnimationMixer(root);
    gltf.animations.forEach((clip) => {
      const a = mixer.clipAction(clip);
      a.setLoop(THREE.LoopOnce, 1);
      a.clampWhenFinished = true;
      a.play();
    });

    const camNode = root.getObjectByName("Cold_Start_Camera") as THREE.PerspectiveCamera | undefined;
    const baseFov = camNode?.isPerspectiveCamera ? camNode.fov : 16.5;

    // materials we drive by hand (Blender animated their emission)
    const mats: Record<string, THREE.MeshStandardMaterial> = {};
    const flares: THREE.Object3D[] = [];
    let floorY = -0.33;
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.frustumCulled = false;
      const m = mesh.material as THREE.MeshStandardMaterial;
      if (mesh.name.startsWith("Headlight_Flare")) flares.push(mesh);
      if (m?.name) mats[m.name] = m;
      if (m?.name === "invisible_all") mesh.visible = false;
      if (m?.name === "Studio_Floor_Mat") {
        mesh.visible = false; // replaced by a real reflector below
        floorY = mesh.getWorldPosition(new THREE.Vector3()).y;
      }
    });
    const glow = (name: string, hex: string) => {
      if (mats[name]) {
        mats[name].emissive = new THREE.Color(hex);
        mats[name].emissiveIntensity = 0;
      }
    };
    glow("red_light_main", "#ff1a10");
    glow("lights", "#e8f2ff");
    glow("hedlights_grid", "#cfe4ff");
    glow("monitor", "#dfeaff");

    const spots: THREE.SpotLight[] = [];
    const beams: THREE.Mesh[] = [];
    root.traverse((o) => {
      if ((o as THREE.SpotLight).isSpotLight) {
        const s = o as THREE.SpotLight;
        s.intensity = 0;
        s.penumbra = 0.7;
        s.decay = 2;
        s.distance = 0;
        spots.push(s);
        const beam = makeBeam(s.angle, 14);
        s.add(beam);
        beams.push(beam);
      }
    });
    return { root, mixer, camNode, baseFov, mats, flares, spots, beams, floorY };
  }, [gltf]);

  const state = useRef({ current: 0, target: 0, notified: false, lastP: -1 });
  const reduced = useRef(false);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  // useEffect(() => {
  //   const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  //   reduced.current = mq.matches;
  //   const h = (e: MediaQueryListEvent) => (reduced.current = e.matches);
  //   mq.addEventListener("change", h);
  //   return () => mq.removeEventListener("change", h);
  // }, []);

  // one continuous loop: scroll -> LERP -> Blender timeline
  useFrame((_, delta) => {
    const container = containerRef.current;
    if (!container) return;
    const st = state.current;
    const dt = Math.min(0.1, delta);

    const range = container.offsetHeight - window.innerHeight;
    const p = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    if (Math.abs(p - st.lastP) > 0.0005) {
      st.lastP = p;
      onProgress(p);
    }
    st.target = p * DUR;

    if (reduced.current) st.current = st.target;
    else {
      st.current += (st.target - st.current) * (1 - Math.exp(-dt * LERP_TAU));
      if (Math.abs(st.target - st.current) < SNAP) st.current = st.target;
    }

    const cur = st.current;
    const frame = cur + 1; // Blender frame number
    rig.mixer.setTime(cur / FPS);

    // emission / lights, same keyframes as the .blend
    const head = ramp(frame, 349, 361);
    const grid = ramp(frame, 241, 337);
    const dash = ramp(frame, 265, 313);
    if (rig.mats.red_light_main) rig.mats.red_light_main.emissiveIntensity = 2.5 * head;
    if (rig.mats.lights) rig.mats.lights.emissiveIntensity = 3 * head;
    if (rig.mats.hedlights_grid) rig.mats.hedlights_grid.emissiveIntensity = 0.9 * grid;
    if (rig.mats.monitor) rig.mats.monitor.emissiveIntensity = 0.8 * dash;
    ["Headlight_Flare_L_Mat", "Headlight_Flare_R_Mat"].forEach((n) => {
      if (rig.mats[n]) rig.mats[n].emissiveIntensity = 1.7 * head;
    });
    rig.flares.forEach((f) => (f.visible = head > 0.001));
    rig.spots.forEach((s) => (s.intensity = 500 * head));
    rig.beams.forEach((b) => ((b.material as THREE.ShaderMaterial).uniforms.uOpacity.value = 0.35 * head));

    // follow the animated Blender camera
    if (rig.camNode) {
      rig.camNode.updateWorldMatrix(true, false);
      rig.camNode.matrixWorld.decompose(camera.position, camera.quaternion, tmp);
      const cam = camera as THREE.PerspectiveCamera;
      const aspect = size.width / size.height;
      const wide = 16 / 9;
      const hHalf = Math.tan(THREE.MathUtils.degToRad(rig.baseFov) / 2);
      cam.fov = THREE.MathUtils.radToDeg(2 * Math.atan(aspect < wide ? (hHalf * wide) / aspect : hHalf));
      cam.updateProjectionMatrix();
    }

    if (!st.notified) {
      st.notified = true;
      onReady();
    }
  });

  return (
    <>
      <primitive object={rig.root} />

      <mesh rotation-x={-Math.PI / 2} position={[0, rig.floorY, 0]}>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          color="#050506"
          metalness={0.4}
          roughness={0.5}
          blur={[300, 80]}
          mixBlur={1}
          mixStrength={22}
          resolution={512}
          mirror={0.6}
          depthScale={0.6}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
        />
      </mesh>

      <directionalLight position={[-6, 6, -6]} intensity={1.4} color="#cfe0ff" />
      <directionalLight position={[6, 4, 5]} intensity={0.35} />

      <Environment resolution={256} background={false}>
        <Lightformer form="rect" intensity={6} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[14, 6, 1]} />
        <Lightformer form="rect" intensity={3} position={[-8, 2, 2]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2} position={[8, 2, -2]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[0, 1, -9]} scale={[14, 2, 1]} />
      </Environment>

      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={1} radius={0.7} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
}
