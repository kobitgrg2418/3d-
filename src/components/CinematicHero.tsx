"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { CarScene } from "./CarScene";
import { useCarSound } from "@/hooks/useCarSound";
import { Stagger } from "./ScrollSection";
import Navbar from "./Navbar";

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { progress } = useProgress();

  const { isMuted, hasInteracted, audioLoaded, toggleMute, enableSound } = useCarSound(p);

  useEffect(() => setMounted(true), []);

  // Section opacities
  const section1Opacity =
    p < 0.2
      ? 1
      : Math.max(0, 1 - (p - 0.2) / 0.08);

  const section2Opacity =
    p < 0.32
      ? 0
      : p < 0.4
        ? (p - 0.32) / 0.08
        : p < 0.55
          ? 1
          : Math.max(0, 1 - (p - 0.55) / 0.08);

  const section3Opacity =
    p < 0.67
      ? 0
      : p < 0.75
        ? (p - 0.67) / 0.08
        : 1;

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Three.js Canvas */}
        <div className="absolute inset-0 w-full h-full" style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms ease" }}>
          {mounted && (
            <Canvas
              dpr={[1, 1.5]}
              gl={{ antialias: true, powerPreference: "high-performance" }}
              camera={{ near: 0.1, far: 200, fov: 16.5 }}
            >
              <color attach="background" args={["#050506"]} />
              <Suspense fallback={null}>
                <CarScene containerRef={containerRef} onProgress={setP} onReady={() => setReady(true)} />
              </Suspense>
            </Canvas>
          )}
        </div>

        {/* Loading indicator */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050506]">
            <div className="text-white/60 text-sm tracking-[0.4em] uppercase">
              Loading {Math.round(progress)}%
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0">
          <Navbar scrollProgress={p} />

          {/* Sound Toggle Button */}
          {audioLoaded && (
            <button
              onClick={toggleMute}
              className="absolute top-8 sm:top-12 right-6 sm:right-8 md:right-12 z-50 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition-colors bg-black/20 backdrop-blur-sm"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
            </button>
          )}

          {/* Sound Enable Prompt */}
          {!hasInteracted && ready && audioLoaded && (
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40">
              <button
                onClick={enableSound}
                className="px-6 py-3 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm text-white/80 text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
              >
                Enable Sound
              </button>
            </div>
          )}

          {/* Section 1 - Hero */}
          <div
            className="absolute inset-0 flex items-center px-6 sm:px-8 md:px-20 lg:px-32"
            style={{
              opacity: section1Opacity,
              transition: "opacity 0.1s ease-out",
            }}
          >
            <div>
              <Stagger delay={0} opacity={section1Opacity}>
                <h1
                  className="text-[clamp(2rem,5vw,5rem)] font-extralight uppercase leading-[1.1] text-white tracking-tight"
                >
                  Arrive different.
                  <br />
                  Drive extraordinary.
                </h1>
              </Stagger>
              <Stagger delay={150} opacity={section1Opacity}>
                <p
                  className="text-sm tracking-[0.3em] uppercase mt-6 text-white/90 font-light"
                >
                  Luxury cars. Exceptional journeys.
                </p>
              </Stagger>
            </div>

            <Stagger delay={300} opacity={section1Opacity}>
              <button
                className="absolute bottom-12 right-6 sm:right-8 md:right-12 w-[48px] h-[48px] rounded-full border border-white/50 flex items-center justify-center hover:opacity-70 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </Stagger>
          </div>

          {/* Section 2 - Brand Statement */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6 sm:px-8"
            style={{
              opacity: section2Opacity,
              transition: "opacity 0.1s ease-out",
            }}
          >
            <div className="max-w-[900px] text-center">
              <Stagger delay={0} opacity={section2Opacity}>
                <h2
                  className="text-[clamp(1.5rem,4.5vw,4.5rem)] font-extralight tracking-tight leading-[1.1] uppercase text-white"
                >
                  Your journey deserves
                  <br />
                  <span className="text-white/80">
                    a remarkable car.
                  </span>
                </h2>
              </Stagger>
            </div>

            <div className="absolute bottom-16 right-6 sm:right-8 md:right-12 flex flex-col items-center gap-4">
              <Stagger delay={200} opacity={section2Opacity}>
                <button
                  className="w-[48px] h-[48px] rounded-full border border-white/40 flex items-center justify-center"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </button>
              </Stagger>

              <Stagger delay={350} opacity={section2Opacity}>
                <div className="flex flex-col gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded-full bg-white"
                      style={{
                        width: i === 1 ? "8px" : "6px",
                        height: i === 1 ? "8px" : "6px",
                        opacity: i === 1 ? 1 : 0.4,
                      }}
                    />
                  ))}
                </div>
              </Stagger>

              <Stagger delay={500} opacity={section2Opacity}>
                <button
                  className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center mt-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </Stagger>
            </div>
          </div>

          {/* Section 3 - Final CTA */}
          <div
            className="absolute inset-0 flex items-center justify-end px-6 sm:px-8 md:px-20 lg:px-32"
            style={{
              opacity: section3Opacity,
              transition: "opacity 0.1s ease-out",
            }}
          >
            <div className="max-w-2xl text-left">
              <Stagger delay={0} opacity={section3Opacity}>
                <p className="text-white/60 text-lg tracking-wide mb-4">
                  30Rental | Pokhara
                </p>
              </Stagger>

              <Stagger delay={150} opacity={section3Opacity}>
                <h2
                  className="text-[clamp(2rem,4vw,4rem)] font-extralight text-white leading-[1.1] uppercase tracking-tight mb-8"
                >
                  Make every arrival
                  <br />
                  unforgettable.
                </h2>
              </Stagger>

              <Stagger delay={300} opacity={section3Opacity}>
                <div className="flex items-center gap-4">
                  <span className="text-sm tracking-[0.3em] text-white/80 uppercase">
                    Reserve your car
                  </span>
                  <button className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray-800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
