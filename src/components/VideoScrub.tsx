"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* ================= STYLES ================= */
const CSS = `
:root {
  --bg: #050506;
  --fg: #f2f2f0;
  --muted: #8b8b90;
  --accent: #e5322d;
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
}
* { box-sizing: border-box; margin: 0; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--fg); -webkit-font-smoothing: antialiased; }
a { color: inherit; text-decoration: none; }

/* nav */
.nav {
  position: fixed; inset: 0 0 auto 0; z-index: 10;
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px clamp(20px, 4vw, 56px);
  mix-blend-mode: difference;
}
.brand { letter-spacing: 0.35em; font-weight: 600; font-size: 14px; }
.nav nav { display: flex; gap: 24px; align-items: center; font-size: 14px; }
.pill { border: 1px solid currentColor; padding: 8px 18px; border-radius: 999px; }

/* scrub */
.scrub { position: relative; height: 500vh; }
.stage { position: sticky; top: 0; height: 100vh; overflow: hidden; }
.canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.vignette {
  position: absolute; inset: 0; pointer-events: none;
  background:
    linear-gradient(to top, rgba(5,5,6,.85), transparent 40%),
    radial-gradient(ellipse at center, transparent 55%, rgba(5,5,6,.6));
}
.loading {
  position: absolute; inset: 0; display: grid; place-items: center;
  letter-spacing: 0.4em; font-size: 12px; text-transform: uppercase; color: var(--muted);
  background: var(--bg);
}
.beat {
  position: absolute; left: clamp(20px, 6vw, 96px); bottom: clamp(60px, 12vh, 140px);
  max-width: 90vw; will-change: opacity, transform; opacity: 0;
}
.eyebrow {
  letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px;
  color: var(--accent); margin-bottom: 16px;
}
h1 { font-size: clamp(44px, 9vw, 128px); line-height: 0.95; font-weight: 600; letter-spacing: -0.03em; }
h2 { font-size: clamp(36px, 6vw, 84px); line-height: 1; font-weight: 600; letter-spacing: -0.02em; }
.hint {
  position: absolute; left: 50%; bottom: 24px; transform: translateX(-50%);
  font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--muted);
}
.progress {
  position: absolute; left: 0; bottom: 0; height: 2px; width: 100%;
  background: var(--accent); transform-origin: left;
}

/* buttons */
.btn {
  display: inline-block; margin-top: 28px; padding: 14px 28px; border: 0; cursor: pointer;
  background: var(--fg); color: #000; border-radius: 999px; font: inherit; font-weight: 600;
  transition: transform .2s, background .2s;
}
.btn:hover { background: var(--accent); color: #fff; transform: translateY(-2px); }

/* specs */
.specs { padding: clamp(80px, 14vh, 160px) clamp(20px, 6vw, 96px); }
.specs h2 { margin-bottom: 56px; max-width: 12ch; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1px; background: #1c1c20; border: 1px solid #1c1c20; }
.spec { background: var(--bg); padding: 40px 28px; display: flex; flex-direction: column; gap: 10px; }
.spec strong { font-size: clamp(40px, 5vw, 64px); font-weight: 600; letter-spacing: -0.02em; }
.spec span { color: var(--muted); font-size: 14px; }

/* cta */
.cta { padding: clamp(80px, 14vh, 160px) 20px; text-align: center; border-top: 1px solid #1c1c20; }
.cta p { color: var(--muted); margin-top: 16px; }
.row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
.row input {
  margin-top: 28px; padding: 14px 20px; width: min(340px, 90vw); border-radius: 999px;
  border: 1px solid #2a2a30; background: transparent; color: var(--fg); font: inherit;
}
.row input:focus { outline: 2px solid var(--accent); outline-offset: 2px; }

.foot { padding: 32px 20px; text-align: center; color: var(--muted); font-size: 13px; border-top: 1px solid #1c1c20; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .btn { transition: none; }
}
`;

/* ================= HOOK ================= */
/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */
const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG = 60000;

const MAX_INFLIGHT = 4; // concurrent decodes, never "decode everything"

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type FrameEntry = {
  index: number;
  src: string;
};

type Drawable = ImageBitmap | HTMLImageElement;

type UseVideoScrubOptions = {
  containerRef: RefObject<HTMLElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  frameCount: number;
  framePath: string;
  /** File extension of the extracted frames. Defaults to "webp". */
  extension?: "webp" | "jpg" | "jpeg" | "png";
};

type UseVideoScrubState = {
  scrollProgress: number;
  ready: boolean;
  painted: boolean;
  reverted: boolean;
  canvasLive: boolean;
};

/* ------------------------------------------------------------------ */
/* Hook                                                                */
/* ------------------------------------------------------------------ */
function useVideoScrub({
  containerRef,
  canvasRef,
  frameCount,
  framePath,
  extension = "webp",
}: UseVideoScrubOptions): UseVideoScrubState {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [status, setStatus] = useState({
    ready: false,
    painted: false,
    reverted: false,
    canvasLive: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || frameCount < 1) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ---------------- state ---------------- */
    const bank: FrameEntry[] = [];
    for (let i = 0; i < frameCount; i++) {
      bank.push({
        index: i,
        src: `${framePath.replace(/\/$/, "")}/frame_${String(i + 1).padStart(
          4,
          "0"
        )}.${extension}`,
      });
    }

    // null = decode failed (kept so we don't hammer a broken frame)
    const lru = new Map<number, Drawable | null>();
    const inflight = new Map<number, Promise<void>>();

    const dur = frameCount - 1; // virtual duration

    let current = 0;
    let target = 0;

    let ready = false;
    let reverted = false;
    let painted = false;
    let building = true;
    let canvasLive = false;

    let disposed = false;
    let rafId = 0;
    let previousTime = performance.now();

    let wanted: number[] = [];
    let wantedSet = new Set<number>();
    let wantedKey = "";

    let lastDir = 1;
    let lastDrawnKey = -1;
    let needsDraw = true;

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMq.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    reducedMq.addEventListener?.("change", onMotionChange);

    const publishStatus = () =>
      setStatus({ ready, painted, reverted, canvasLive });

    /* ---------------- canvas setup ---------------- */
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 300ms ease";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      lastDrawnKey = -1;
      needsDraw = true;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    /* ---------------- helpers ---------------- */
    const getProgress = () => {
      const range = container.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return Math.min(1, Math.max(0, window.scrollY / range));
    };

    const closeEntry = (entry: Drawable | null) => {
      if (entry && "close" in entry && typeof entry.close === "function") {
        entry.close();
      }
    };

    /* ---------------- LRU ---------------- */
    const touch = (index: number) => {
      if (!lru.has(index)) return;
      const entry = lru.get(index) ?? null;
      lru.delete(index);
      lru.set(index, entry); // newest position
    };

    const store = (index: number, entry: Drawable | null) => {
      if (lru.has(index)) {
        const old = lru.get(index) ?? null;
        if (old !== entry) closeEntry(old);
        lru.delete(index);
      }
      lru.set(index, entry);

      while (lru.size > LRU_MAX) {
        // evict the oldest entry that is not currently wanted;
        // fall back to the oldest overall.
        let victim: number | undefined;
        for (const key of lru.keys()) {
          if (key !== index && !wantedSet.has(key)) {
            victim = key;
            break;
          }
        }
        if (victim === undefined) {
          for (const key of lru.keys()) {
            if (key !== index) {
              victim = key;
              break;
            }
          }
        }
        if (victim === undefined) break;
        closeEntry(lru.get(victim) ?? null);
        lru.delete(victim);
      }
    };

    /* ---------------- loading ---------------- */
    const buildWanted = (index: number, dir: number) => {
      const order: number[] = [
        index,
        index - 1,
        index + 1,
        index - 2,
        index + 2,
      ];
      for (let k = 3; k <= LEAD; k++) order.push(index + dir * k);

      const seen = new Set<number>();
      const list: number[] = [];
      for (const i of order) {
        if (i < 0 || i > frameCount - 1 || seen.has(i)) continue;
        seen.add(i);
        list.push(i);
        if (list.length >= LRU_MAX) break; // never ask for more than we can keep
      }
      return list;
    };

    const load = (index: number) => {
      const task = (async () => {
        let entry: Drawable | null = null;
        try {
          const image = new Image();
          image.decoding = "async";
          image.src = bank[index].src;
          await image.decode();

          if (typeof createImageBitmap === "function") {
            try {
              entry = await createImageBitmap(image);
            } catch {
              entry = image; // fallback: keep decoded image
            }
          } else {
            entry = image;
          }
        } catch {
          entry = null;
        }

        if (disposed) {
          closeEntry(entry);
          return;
        }
        store(index, entry);
        needsDraw = true;
      })().finally(() => {
        inflight.delete(index);
        pump();
      });
      inflight.set(index, task);
    };

    const pump = () => {
      if (disposed) return;
      for (const index of wanted) {
        if (inflight.size >= MAX_INFLIGHT) break;
        if (lru.has(index) || inflight.has(index)) continue;
        load(index);
      }
    };

    const setWanted = (index: number, dir: number) => {
      const key = `${index}:${dir}`;
      if (key === wantedKey) return;
      wantedKey = key;
      wanted = buildWanted(index, dir);
      wantedSet = new Set(wanted);
      pump();
    };

    /* ---------------- painting ---------------- */
    const pickFrame = (index: number, dir: number) => {
      // exact frame first, then nearest cached neighbour.
      // Prefer the side we came from so we never flash a future frame early.
      for (let r = 0; r <= LRU_MAX; r++) {
        const order = dir >= 0 ? [index - r, index + r] : [index + r, index - r];
        for (const i of order) {
          if (i < 0 || i > frameCount - 1) continue;
          const entry = lru.get(i);
          if (entry) return { key: i, entry };
        }
      }
      return null;
    };

    const draw = (index: number, dir: number) => {
      const found = pickFrame(index, dir);
      if (!found) return false;
      if (found.key === lastDrawnKey && !needsDraw) return true;

      const { entry, key } = found;
      const sourceWidth =
        "naturalWidth" in entry ? entry.naturalWidth : entry.width;
      const sourceHeight =
        "naturalHeight" in entry ? entry.naturalHeight : entry.height;
      if (!sourceWidth || !sourceHeight) return false;

      // object-cover
      const scale = Math.max(
        canvas.width / sourceWidth,
        canvas.height / sourceHeight
      );
      const width = sourceWidth * scale;
      const height = sourceHeight * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;

      ctx.drawImage(entry, x, y, width, height);
      touch(key);
      lastDrawnKey = key;
      needsDraw = false;

      if (!painted) {
        painted = true;
        canvasLive = true;
        ready = true;
        building = false;
        reverted = false;
        canvas.style.opacity = "1";
        publishStatus();
      }
      return true;
    };

    /* ---------------- watchdog ---------------- */
    const watchdog = window.setTimeout(() => {
      if (!painted) {
        reverted = true;
        canvasLive = false;
        building = false;
        publishStatus();
      }
    }, WATCHDOG);

    /* ---------------- rAF loop ---------------- */
    const tick = () => {
      if (disposed) return;

      const now = performance.now();
      const dt = Math.min(0.1, (now - previousTime) / 1000);
      previousTime = now;

      const p = getProgress();
      setScrollProgress(p);
      target = p * dur;

      if (target > current) lastDir = 1;
      else if (target < current) lastDir = -1;

      if (prefersReducedMotion) {
        current = target;
      } else {
        current += (target - current) * (1 - Math.exp(-dt * LERP_TAU));
        if (Math.abs(target - current) < SNAP) current = target;
      }

      const frameIndex = Math.round(current);
      const index = Math.max(0, Math.min(frameCount - 1, frameIndex));

      setWanted(index, lastDir);
      draw(index, lastDir);

      rafId = requestAnimationFrame(tick);
    };

    /* ---------------- boot: frame 1 first ---------------- */
    setWanted(0, 1); // wanted[0] === 0 → frame_0001 is requested first
    rafId = requestAnimationFrame(tick);

    /* ---------------- cleanup ---------------- */
    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.clearTimeout(watchdog);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      reducedMq.removeEventListener?.("change", onMotionChange);
      for (const entry of lru.values()) closeEntry(entry);
      lru.clear();
      inflight.clear();
    };
  }, [containerRef, canvasRef, frameCount, framePath, extension]);

  return { scrollProgress, ...status };
}

/* ================= PAGE ================= */
// Fades a text beat in and out over a scroll-progress window [a, b].
const beat = (p: number, a: number, b: number) => {
  const edge = (b - a) * 0.25;
  const o = Math.min(1, (p - a) / edge, (b - p) / edge);
  const opacity = Math.max(0, o);
  return {
    opacity,
    transform: `translateY(${(1 - opacity) * 24}px)`,
    pointerEvents: opacity > 0.5 ? ("auto" as const) : ("none" as const),
  };
};

const SPECS = [
  { value: "3.0L", label: "Twin-turbo flat-six" },
  { value: "3.4s", label: "0 – 100 km/h" },
  { value: "310", label: "Top speed, km/h" },
  { value: "8", label: "Speed dual-clutch" },
];

export default function VideoScrub() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollProgress: p, painted } = useVideoScrub({
    containerRef,
    canvasRef,
    frameCount: 450,
    framePath: "/frames",
    extension: "jpg",
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <header className="nav">
        <a href="#top" className="brand">NOCTURNE</a>
        <nav>
          <a href="#specs">Specs</a>
          <a href="#reserve" className="pill">Reserve</a>
        </nav>
      </header>

      {/* Scroll-scrubbed cinematic section */}
      <section id="top" ref={containerRef} className="scrub">
        <div className="stage">
          <canvas ref={canvasRef} className="canvas" />
          <div className="vignette" />

          {!painted && <div className="loading">Loading</div>}

          <div className="beat" style={beat(p, -0.1, 0.28)}>
            <p className="eyebrow">Nocturne 01</p>
            <h1>Built for<br />the dark.</h1>
          </div>

          <div className="beat" style={beat(p, 0.32, 0.66)}>
            <p className="eyebrow">Awake</p>
            <h2>Every light,<br />a signature.</h2>
          </div>

          <div className="beat" style={beat(p, 0.7, 1.1)}>
            <p className="eyebrow">Now reserving</p>
            <h2>Ready when<br />you are.</h2>
            <a href="#reserve" className="btn">Reserve yours</a>
          </div>

          <div className="hint" style={{ opacity: Math.max(0, 1 - p * 8) }}>
            Scroll
          </div>
          <div className="progress" style={{ transform: `scaleX(${p})` }} />
        </div>
      </section>

      <section id="specs" className="specs">
        <h2>Numbers, not adjectives.</h2>
        <div className="grid">
          {SPECS.map((s) => (
            <div key={s.label} className="spec">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="reserve" className="cta">
        <h2>Own the night.</h2>
        <p>Join the list for first access and private viewings.</p>
        <div className="row">
          <input type="email" placeholder="you@email.com" aria-label="Email" />
          <button type="button" className="btn">Notify me</button>
        </div>
      </section>

      <footer className="foot">© {new Date().getFullYear()} Nocturne. All rights reserved.</footer>
    </>
  );
}
