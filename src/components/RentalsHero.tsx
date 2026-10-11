"use client";

/**
 * 30Rentals — scroll-driven immersive hero (single file).
 *
 * Setup:  put the frames in /public/frames/frame_00001.jpg … frame_00451.jpg
 *
 * Why it stays smooth:
 *  - Frames are drawn on a <canvas> (no <img> swapping, no layout work).
 *  - All frames are preloaded + decoded before the experience unlocks.
 *  - Scroll position is eased in a requestAnimationFrame loop (frame-rate
 *    independent), so wheel notches glide instead of stepping.
 *  - Text overlays are driven through refs / direct style writes, so React
 *    never re-renders while scrolling.
 *  - The canvas only redraws when the target frame actually changes.
 */

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 451;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(5, "0")}.jpg`;
const SCROLL_VH = 650; // total scroll length of the pinned hero, in viewport heights
const EASE = 11; // higher = snappier, lower = floatier

type Scene = {
  id: string;
  start: number;
  end: number;
  align: "left" | "right" | "center";
  eyebrow: string;
  title: string;
  body: string;
  cta?: boolean;
};

const SCENES: Scene[] = [
  {
    id: "intro",
    start: 0.0,
    end: 0.15,
    align: "left",
    eyebrow: "30Rentals",
    title: "Rent the drive.\nSkip the friction.",
    body: "A car rental designed around one idea: the interface should disappear and the car should take the stage.",
  },
  {
    id: "find",
    start: 0.2,
    end: 0.4,
    align: "left",
    eyebrow: "01 — Find",
    title: "Search that thinks\nlike you do.",
    body: "One glanceable bar for dates, seats, transmission and budget. Results respond as you type, with no page reloads and no dead ends.",
  },
  {
    id: "choose",
    start: 0.44,
    end: 0.64,
    align: "right",
    eyebrow: "02 — Choose",
    title: "See the car\nbefore you book.",
    body: "Large, honest imagery. Specs you can scan in two seconds. A live availability calendar that never shows a car you can't have.",
  },
  {
    id: "book",
    start: 0.68,
    end: 0.86,
    align: "left",
    eyebrow: "03 — Book",
    title: "Three taps.\nOne clear total.",
    body: "Pick-up, insurance and extras live on a single screen. The full price stays visible the whole way. No surprises at the counter.",
  },
  {
    id: "outro",
    start: 0.9,
    end: 1.001,
    align: "center",
    eyebrow: "Your next ride",
    title: "One scroll away.",
    body: "Calm design. Clear pricing. Cars that look as good as they drive.",
    cta: true,
  },
];

const PRINCIPLES = [
  {
    n: "01",
    t: "Clarity first",
    d: "Every screen answers one question. Type, spacing and contrast are tuned so the next step is always obvious.",
  },
  {
    n: "02",
    t: "Speed you can feel",
    d: "Instant filters, optimistic updates and prefetched pages. Booking takes seconds, not a coffee break.",
  },
  {
    n: "03",
    t: "Honest by design",
    d: "Total price up front, free cancellation spelled out, and no dark patterns hiding in the corners.",
  },
  {
    n: "04",
    t: "Made for thumbs",
    d: "Mobile-first layouts, large tap targets and a one-handed booking flow for when you're already on the move.",
  },
];


/* ---------- SAMPLE DATA: replace with your real fleet & prices ---------- */
type Body = "Hatchback" | "Sedan" | "SUV" | "Sport" | "Electric";
type Car = {
  id: string; name: string; body: Body; seats: number; gear: "Auto" | "Manual";
  fuel: string; bags: number; price: number; tag?: string; image?: string;
};
const FLEET: Car[] = [
  { id: "c1", name: "City Hatch", body: "Hatchback", seats: 4, gear: "Manual", fuel: "Petrol", bags: 2, price: 3500, tag: "Best value" },
  { id: "c2", name: "Urban Sedan", body: "Sedan", seats: 5, gear: "Auto", fuel: "Petrol", bags: 3, price: 5200 },
  { id: "c3", name: "Trail SUV", body: "SUV", seats: 5, gear: "Auto", fuel: "Diesel", bags: 4, price: 7800, tag: "Popular" },
  { id: "c4", name: "Family Explorer", body: "SUV", seats: 7, gear: "Auto", fuel: "Diesel", bags: 5, price: 9400 },
  { id: "c5", name: "Volt Commuter", body: "Electric", seats: 5, gear: "Auto", fuel: "Electric", bags: 3, price: 6900, tag: "Zero emissions" },
  { id: "c6", name: "Midnight Coupe", body: "Sport", seats: 4, gear: "Auto", fuel: "Petrol", bags: 2, price: 18500, tag: "Signature" },
];
const BODIES: ("All" | Body)[] = ["All", "Hatchback", "Sedan", "SUV", "Electric", "Sport"];
const PROTECTION_PER_DAY = 600;
const LOCATIONS = ["Pokhara Lakeside", "Pokhara Airport", "Kathmandu Airport", "Kathmandu Thamel"];

const STEPS = [
  { t: "Search", d: "Choose where, when and what you need. The fleet filters itself as you go." },
  { t: "Compare", d: "Clear specs side by side, with the total for your exact dates on every card." },
  { t: "Confirm", d: "One screen, one price. Add protection if you want it, skip it if you don't." },
  { t: "Drive", d: "Show your booking, collect the keys, go. Return is just as quick." },
];

const FAQS = [
  { q: "What do I need to rent a car?", a: "A valid driving licence, a government ID and a payment method. Exact requirements can be adjusted to your own policy." },
  { q: "Is the price I see the price I pay?", a: "Yes. The total on every card and in the booking summary includes everything except optional extras, which you choose yourself." },
  { q: "Can I change or cancel my booking?", a: "Edit dates or cancel from your booking page in a couple of taps. Cancellation terms are shown before you confirm, never after." },
  { q: "Is there a mileage limit?", a: "Set your own policy here: unlimited, a daily allowance, or per-kilometre pricing. The interface will show it up front either way." },
  { q: "What if I need help on the road?", a: "Roadside support details sit one tap away inside your booking, so you're never hunting for a phone number." },
];

const fmt = (n: number) => "Rs " + n.toLocaleString("en-IN");
const iso = (d: Date) => d.toISOString().slice(0, 10);

function CarArt({ body }: { body: Body }) {
  // simple, generic silhouettes (swap for real photos via Car.image)
  const paths: Record<Body, string> = {
    Hatchback: "M18 62 L26 44 Q30 38 40 37 L86 36 Q98 36 106 46 L130 50 Q142 52 144 62 Z",
    Sedan: "M10 62 L22 46 Q27 40 38 39 L70 38 Q80 28 98 28 L120 30 Q134 34 142 48 L152 52 Q158 56 158 62 Z",
    SUV: "M12 62 L16 40 Q18 30 30 29 L120 28 Q134 28 140 40 L152 48 Q158 52 158 62 Z",
    Electric: "M12 62 L24 44 Q30 36 44 35 L84 32 Q100 30 112 38 L136 46 Q150 50 154 62 Z",
    Sport: "M8 62 L20 50 Q32 42 52 40 L88 30 Q102 26 118 36 L146 46 Q160 50 162 62 Z",
  };
  return (
    <svg viewBox="0 0 170 80" className="car-art" aria-hidden>
      <defs>
        <linearGradient id={`g-${body}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0c0c0c" />
        </linearGradient>
      </defs>
      <ellipse cx="85" cy="68" rx="70" ry="5" fill="rgba(225,29,46,.18)" />
      <path d={paths[body]} fill={`url(#g-${body})`} stroke="rgba(255,255,255,.28)" strokeWidth="1" />
      <circle cx="42" cy="62" r="9" fill="#050505" stroke="rgba(255,255,255,.45)" />
      <circle cx="128" cy="62" r="9" fill="#050505" stroke="rgba(255,255,255,.45)" />
      <circle cx="42" cy="62" r="3" fill="#e11d2e" />
      <circle cx="128" cy="62" r="3" fill="#e11d2e" />
    </svg>
  );
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Horizontal camera pan (fraction of viewport width) so the car always
 *  sits opposite the text. + moves the car right, − moves it left. */
const PAN: [number, number][] = [
  [0, 0.15], [0.41, 0.15],
  [0.5, -0.17], [0.63, -0.17], [0.72, 0.1], [0.85, 0.1], [0.92, 0], [1, 0],
];
const panAt = (p: number) => {
  for (let i = 1; i < PAN.length; i++) {
    if (p <= PAN[i][0]) {
      const [p0, v0] = PAN[i - 1];
      const [p1, v1] = PAN[i];
      return v0 + (v1 - v0) * smooth(clamp((p - p0) / (p1 - p0)));
    }
  }
  return 0;
};


export default function Page() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  // booking state
  const [place, setPlace] = useState(LOCATIONS[0]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [body, setBody] = useState<"All" | Body>("All");
  const [picked, setPicked] = useState<string>("c3");
  const [protect, setProtect] = useState(true);
  const [faq, setFaq] = useState<number | null>(0);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const a = new Date(); a.setDate(a.getDate() + 1);
    const b = new Date(); b.setDate(b.getDate() + 4);
    setFrom(iso(a)); setTo(iso(b));
  }, []);

  const days = from && to ? Math.max(1, Math.round((+new Date(to) - +new Date(from)) / 864e5)) : 3;
  const car = FLEET.find((c) => c.id === picked) ?? FLEET[0];
  const rental = car.price * days;
  const prot = protect ? PROTECTION_PER_DAY * days : 0;
  const total = rental + prot;
  const shown = FLEET.filter((c) => body === "All" || c.body === body);

  // scroll-reveal for everything below the hero
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-rv]");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Eased page scrolling (wheel + anchor links). Touch/keyboard stay native.
  const smoothTo = useRef<(y: number) => void>((y) => window.scrollTo(0, y));
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let target = window.scrollY;
    let cur = window.scrollY;
    let active = false;
    let raf = 0;
    let last = 0;
    const max = () => document.documentElement.scrollHeight - window.innerHeight;
    const clampY = (y: number) => Math.min(max(), Math.max(0, y));

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      cur += (target - cur) * (1 - Math.exp(-9 * dt));
      if (Math.abs(target - cur) < 0.25) cur = target;
      window.scrollTo(0, cur);
      if (cur === target) { active = false; return; }
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (active) return;
      active = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 34 : e.deltaMode === 2 ? window.innerHeight : 1;
      if (!active) { cur = window.scrollY; target = cur; }
      target = clampY(target + e.deltaY * unit);
      kick();
    };
    const onScroll = () => { if (!active) { cur = target = window.scrollY; } };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : document.body;
      if (!el) return;
      e.preventDefault();
      smoothTo.current(id ? el.getBoundingClientRect().top + window.scrollY : 0);
    };
    smoothTo.current = (y: number) => {
      if (!active) { cur = window.scrollY; }
      target = clampY(y);
      kick();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) smoothTo.current(el.getBoundingClientRect().top + window.scrollY);
  };

  /* ------------------------------------------------------------------ */
  /* 1. Preload every frame (first frame immediately, rest in parallel)  */
  /* ------------------------------------------------------------------ */
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );

  useEffect(() => {
    let cancelled = false;
    let done = 0;
    let next = 0;
    const CONCURRENCY = 10;

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = FRAME_PATH(i);
        const finish = () => {
          if (cancelled) return resolve();
          imagesRef.current[i] = img;
          done++;
          if (done % 6 === 0 || done === FRAME_COUNT) setLoaded(done);
          resolve();
        };
        // decode() pushes the JPEG decode off the scroll path
        img
          .decode()
          .then(finish)
          .catch(finish);
      });

    const worker = async () => {
      while (!cancelled && next < FRAME_COUNT) {
        const i = next++;
        await loadOne(i);
      }
    };

    Promise.all(Array.from({ length: CONCURRENCY }, worker)).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /* 2. Render loop: eased scroll → frame + text overlays                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current!;
    const track = trackRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    ctx.imageSmoothingQuality = "high";

    let vw = 0;
    let vh = 0;
    let trackTop = 0;
    let scrollable = 1;
    let target = 0; // raw scroll progress 0..1
    let current = 0; // eased progress
    let lastFrame = -1;
    let lastPan = 999;
    let raf = 0;
    let last = performance.now();

    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = vw + "px";
      canvas.style.height = vh + "px";
      ctx.imageSmoothingQuality = "high";
      const rect = track.getBoundingClientRect();
      trackTop = rect.top + window.scrollY;
      scrollable = Math.max(1, track.offsetHeight - vh);
      lastFrame = -1; // force redraw
      lastPan = 999;
    };

    const onScroll = () => {
      target = clamp((window.scrollY - trackTop) / scrollable);
    };

    // Draws frame i0, then cross-fades frame i0+1 over it by `mix` (0..1).
    // Blending neighbours turns 30fps footage into continuous motion.
    const draw = (f: number, pan: number) => {
      const i0 = Math.min(FRAME_COUNT - 1, Math.floor(f));
      const i1 = Math.min(FRAME_COUNT - 1, i0 + 1);
      const mix = f - i0;
      const a = imagesRef.current[i0];
      if (!a) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / a.naturalWidth, ch / a.naturalHeight); // "cover"
      const dw = a.naturalWidth * s;
      const dh = a.naturalHeight * s;
      const x = (cw - dw) / 2 + pan * cw;
      const y = (ch - dh) / 2;
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(a, x, y, dw, dh);
      const b = imagesRef.current[i1];
      if (b && mix > 0.03) {
        ctx.globalAlpha = mix;
        ctx.drawImage(b, x, y, dw, dh);
        ctx.globalAlpha = 1;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // frame-rate independent easing
      current += (target - current) * (1 - Math.exp(-EASE * dt));
      if (Math.abs(target - current) < 0.00005) current = target;

      const f = Math.round(current * (FRAME_COUNT - 1) * 24) / 24; // 1/24-frame steps
      const pan = Math.round(panAt(current) * 4000) / 4000;
      if (f !== lastFrame || pan !== lastPan) {
        draw(f, pan);
        lastFrame = f;
        lastPan = pan;
        if (counterRef.current)
          counterRef.current.textContent = String(Math.round(current * 100)).padStart(2, "0");
      }

      // text scenes
      for (let i = 0; i < SCENES.length; i++) {
        const el = sceneRefs.current[i];
        if (!el) continue;
        const { start, end } = SCENES[i];
        const span = end - start;
        const fade = Math.min(0.045, span * 0.3);
        const inT = i === 0 ? 1 : smooth(clamp((current - start) / fade));
        // last scene stays visible
        const outT = i === SCENES.length - 1 ? 1 : smooth(clamp((end - current) / fade));
        const o = Math.min(inT, outT);
        const dir = current < (start + end) / 2 ? 1 : -1;
        const y = (1 - o) * 28 * dir;
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
        el.style.visibility = o < 0.01 ? "hidden" : "visible";
        el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      }

      // scroll hint + progress bar + nav
      if (hintRef.current) {
        const h = 1 - clamp(current / 0.035);
        hintRef.current.style.opacity = h.toFixed(3);
        hintRef.current.style.visibility = h < 0.01 ? "hidden" : "visible";
      }
      if (barRef.current) barRef.current.style.transform = `scaleY(${current.toFixed(4)})`;
      if (navRef.current)
        navRef.current.dataset.solid = window.scrollY > trackTop + scrollable ? "1" : "0";

      raf = requestAnimationFrame(tick);
    };

    measure();
    onScroll();
    current = target;
    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      measure();
      onScroll();
    };
    window.addEventListener("resize", onResize);
    // layout can shift after fonts/images; re-measure once settled
    const t = setTimeout(() => {
      measure();
      onScroll();
    }, 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

  const pct = Math.round((loaded / FRAME_COUNT) * 100);

  const scrollToNext = () => smoothTo.current(window.innerHeight * 1.1);

  return (
    <>
      <style>{CSS}</style>

      {/* ------------------------- loader ------------------------- */}
      <div className="loader" data-hidden={ready ? "1" : "0"} aria-hidden={ready}>
        <div className="loader-logo">
          30<span>Rentals</span>
        </div>
        <div className="loader-track">
          <div className="loader-fill" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <div className="loader-pct">Preparing your showroom · {pct}%</div>
      </div>

      {/* --------------------------- nav --------------------------- */}
      <nav className="nav" ref={navRef} data-solid="0">
        <a className="logo" href="#top">
          30<span>Rentals</span>
        </a>
        <div className="nav-links">
          <a href="#fleet">Fleet</a>
          <a href="#how">How it works</a>
          <a href="#experience">Experience</a>
          <a href="#faq">FAQ</a>
          <a href="#booking" className="btn btn-sm">
            Book now
          </a>
        </div>
      </nav>

      {/* ----------------- pinned scroll-driven hero ----------------- */}
      <main id="top">
        <div ref={trackRef} className="track" style={{ height: `${SCROLL_VH}vh` }}>
          <div className="stage">
            <canvas ref={canvasRef} className="canvas" aria-label="Porsche 911 rotating showroom animation" />
            <div className="vignette" />

            {SCENES.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => {
                  sceneRefs.current[i] = el;
                }}
                className={`scene scene-${s.align}`}
                style={{ opacity: 0, visibility: "hidden" }}
              >
                <p className="eyebrow">{s.eyebrow}</p>
                <h1 className="title">
                  {s.title.split("\n").map((l, k) => (
                    <span key={k}>{l}</span>
                  ))}
                </h1>
                <p className="body">{s.body}</p>
                {s.cta && (
                  <div className="cta-row">
                    <a href="#fleet" className="btn">
                      Browse the fleet
                    </a>
                    <a href="#experience" className="btn btn-ghost">
                      See how it works
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* progress rail */}
            <div className="rail" aria-hidden>
              <div className="rail-fill" ref={barRef} />
              <span className="rail-num">
                <span ref={counterRef}>00</span>
              </span>
            </div>

            {/* scroll down */}
            <div className="hint" ref={hintRef}>
              <button className="hint-btn" onClick={scrollToNext} aria-label="Scroll down">
                <div className="scroll-line" />
                <span className="scroll-text">SCROLL</span>
              </button>
            </div>
          </div>
        </div>

        {/* -------------------- booking bar -------------------- */}
        <section className="bookbar-wrap" id="booking">
          <form
            className="bookbar"
            data-rv
            onSubmit={(e) => { e.preventDefault(); go("fleet"); }}
          >
            <label>
              <span>Pick-up location</span>
              <select value={place} onChange={(e) => setPlace(e.target.value)}>
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </label>
            <label>
              <span>Pick-up date</span>
              <input type="date" value={from} min={iso(new Date())} onChange={(e) => {
                setFrom(e.target.value);
                if (to && e.target.value >= to) { const d = new Date(e.target.value); d.setDate(d.getDate() + 1); setTo(iso(d)); }
              }} />
            </label>
            <label>
              <span>Return date</span>
              <input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} />
            </label>
            <label>
              <span>Car type</span>
              <select value={body} onChange={(e) => setBody(e.target.value as "All" | Body)}>
                {BODIES.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
            <button className="btn" type="submit">Search cars</button>
          </form>
          <p className="bookbar-note" data-rv>
            {days} {days === 1 ? "day" : "days"} · {place} · prices update live
          </p>
        </section>

        {/* -------------------- promise strip -------------------- */}
        <section className="strip" data-rv>
          {["Total price up front", "Free-cancellation window", "Digital pick-up", "Support when you need it"].map((t) => (
            <div key={t}><i />{t}</div>
          ))}
        </section>

        {/* ------------------------- fleet ------------------------- */}
        <section className="section" id="fleet">
          <div className="wrap">
            <div className="head-row" data-rv>
              <div>
                <p className="eyebrow red">The fleet</p>
                <h2 className="h2">Pick a car.<br /><em>See the real total.</em></h2>
              </div>
              <div className="tabs" role="tablist" aria-label="Car type">
                {BODIES.map((b) => (
                  <button key={b} role="tab" aria-selected={body === b} className={body === b ? "on" : ""} onClick={() => setBody(b)}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="fleet">
              {shown.map((c, i) => (
                <article
                  key={c.id}
                  data-rv
                  style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                  className={`car ${picked === c.id ? "sel" : ""}`}
                  onClick={() => setPicked(c.id)}
                >
                  <div className="car-img">
                    {c.tag && <span className="chip">{c.tag}</span>}
                    {c.image ? <img src={c.image} alt={c.name} /> : <CarArt body={c.body} />}
                  </div>
                  <div className="car-body">
                    <div className="car-top">
                      <h3>{c.name}</h3>
                      <span className="muted">{c.body}</span>
                    </div>
                    <ul className="specs">
                      <li>{c.seats} seats</li><li>{c.gear}</li><li>{c.fuel}</li><li>{c.bags} bags</li>
                    </ul>
                    <div className="car-bottom">
                      <div>
                        <strong>{fmt(c.price * days)}</strong>
                        <small> / {days} {days === 1 ? "day" : "days"}</small>
                        <div className="muted sm">{fmt(c.price)} per day</div>
                      </div>
                      <button
                        className={`btn btn-sm ${picked === c.id ? "" : "btn-ghost"}`}
                        onClick={(e) => { e.stopPropagation(); setPicked(c.id); setBooked(false); go("summary"); }}
                      >
                        {picked === c.id ? "Selected" : "Select"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="sample" data-rv>Sample fleet &amp; prices shown. Replace the FLEET list at the top of this file with your cars.</p>
          </div>
        </section>

        {/* ---------------------- how it works ---------------------- */}
        <section className="section alt" id="how">
          <div className="wrap">
            <p className="eyebrow red" data-rv>How it works</p>
            <h2 className="h2" data-rv>Four steps.<br /><em>No detours.</em></h2>
            <ol className="steps">
              {STEPS.map((st, i) => (
                <li key={st.t} data-rv style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="step-n">0{i + 1}</span>
                  <h3>{st.t}</h3>
                  <p>{st.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------- UI principles -------------------- */}
        <section className="section" id="experience">
          <div className="wrap">
            <p className="eyebrow red" data-rv>The 30Rentals experience</p>
            <h2 className="h2" data-rv>
              Built interface-first.
              <br />
              <em>Everything else follows.</em>
            </h2>
            <p className="lead" data-rv>
              Renting a car shouldn't feel like filling in a tax form. We design every screen to
              get you from "I need a car" to "keys in hand" in the fewest, calmest steps possible.
            </p>
            <div className="grid">
              {PRINCIPLES.map((p, i) => (
                <article className="card" key={p.n} data-rv style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="card-n">{p.n}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------- live booking summary ----------------- */}
        <section className="section alt" id="summary">
          <div className="wrap split">
            <div data-rv>
              <p className="eyebrow red">Booking summary</p>
              <h2 className="h2">Your total,<br /><em>always in view.</em></h2>
              <p className="lead">
                Change the car, the dates or the protection and the price answers instantly.
                This is the same summary your customers see, from first search to confirmation.
              </p>
            </div>

            <aside className="sum" data-rv aria-live="polite">
              <div className="sum-head">
                <div className="sum-art"><CarArt body={car.body} /></div>
                <div>
                  <h3>{car.name}</h3>
                  <p className="muted sm">{car.seats} seats · {car.gear} · {car.fuel}</p>
                </div>
              </div>
              <dl>
                <div><dt>Pick-up</dt><dd>{place}</dd></div>
                <div><dt>Dates</dt><dd>{from || "—"} → {to || "—"}</dd></div>
                <div><dt>Rental · {days} {days === 1 ? "day" : "days"}</dt><dd>{fmt(rental)}</dd></div>
                <div><dt>Full protection</dt><dd>{protect ? fmt(prot) : "Not added"}</dd></div>
                <div><dt>Service fees</dt><dd>Rs 0</dd></div>
              </dl>
              <label className="toggle">
                <input type="checkbox" checked={protect} onChange={(e) => setProtect(e.target.checked)} />
                <span className="sw" />
                <span>Add full protection <small className="muted">({fmt(PROTECTION_PER_DAY)}/day)</small></span>
              </label>
              <div className="sum-total">
                <span>Total</span>
                <strong>{fmt(total)}</strong>
              </div>
              <button className="btn wide" onClick={() => setBooked(true)}>
                {booked ? "Request received ✓" : "Confirm booking"}
              </button>
              <p className="muted sm center-t">{booked ? "Demo only: connect this button to your booking backend." : "You won't be charged in this demo."}</p>
            </aside>
          </div>
        </section>

        {/* ------------------------- FAQ ------------------------- */}
        <section className="section" id="faq">
          <div className="wrap narrow">
            <p className="eyebrow red" data-rv>Questions</p>
            <h2 className="h2" data-rv>Good to know.</h2>
            <div className="faq" data-rv>
              {FAQS.map((f, i) => (
                <div key={f.q} className={`qa ${faq === i ? "open" : ""}`}>
                  <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}>
                    <span>{f.q}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  </button>
                  <div className="qa-body"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------- CTA ------------------------- */}
        <section className="section final" id="book">
          <div className="wrap center">
            <h2 className="h2" data-rv>Ready when you are.</h2>
            <p className="lead" data-rv>Pick your dates. We'll handle the rest.</p>
            <div className="cta-row center-row" data-rv>
              <a href="#booking" className="btn" onClick={(e) => { e.preventDefault(); go("booking"); }}>Start your booking</a>
              <a href="#top" className="btn btn-ghost">Back to top</a>
            </div>
          </div>
        </section>

        {/* ----------------------- footer ----------------------- */}
        <footer className="footer">
          <div className="wrap foot-grid">
            <div>
              <div className="logo">30<span>Rentals</span></div>
              <p className="muted sm">Car rental, designed around you.</p>
            </div>
            <div><h4>Explore</h4><a href="#fleet">Fleet</a><a href="#how">How it works</a><a href="#experience">Experience</a></div>
            <div><h4>Support</h4><a href="#faq">FAQ</a><a href="#booking">Book a car</a><a href="mailto:hello@30rentals.com">hello@30rentals.com</a></div>
            <div><h4>Legal</h4><a href="#top">Terms</a><a href="#top">Privacy</a><a href="#top">Rental policy</a></div>
          </div>
          <p className="foot">© {new Date().getFullYear()} 30Rentals. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

/* ====================================================================== */
/* Styles (kept in this file so the page is fully self-contained)          */
/* ====================================================================== */
const CSS = `
:root{
  --bg:#050505; --bg2:#0d0d0d; --bg-light:#ffffff; --fg:#f5f5f2; --fg-dark:#1a1a1a; --mute:rgba(245,245,242,.62); --mute-dark:rgba(26,26,26,.6);
  --line:rgba(255,255,255,.1); --line-dark:rgba(0,0,0,.1); --red:#e11d2e; --red-glow:rgba(225,29,46,.45);
  --font: "Inter","SF Pro Display",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
*{box-sizing:border-box}
html{background:var(--bg);-webkit-text-size-adjust:100%}
body{font-family:var(--font);color:var(--fg);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}

/* loader */
.loader{position:fixed;inset:0;z-index:100;background:var(--bg);display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:22px;transition:opacity .8s ease,visibility .8s}
.loader[data-hidden="1"]{opacity:0;visibility:hidden;pointer-events:none}
.loader-logo{font-size:34px;font-weight:700;letter-spacing:-.02em}
.loader-logo span,.logo span{color:var(--red)}
.loader-track{width:min(260px,60vw);height:2px;background:var(--line);overflow:hidden;border-radius:2px}
.loader-fill{height:100%;background:var(--red);transform-origin:left;transition:transform .25s ease}
.loader-pct{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--mute)}

/* nav */
.nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;
  padding:20px clamp(20px,4vw,48px);transition:background .4s ease,backdrop-filter .4s ease,border-color .4s}
.nav[data-solid="1"]{background:rgba(255,255,255,.95);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line-dark)}
.logo{font-size:22px;font-weight:700;letter-spacing:-.02em;color:var(--fg-dark)}
.logo span{color:var(--red)}
.nav-links{display:flex;align-items:center;gap:28px;font-size:14px;color:var(--fg-dark)}
.nav-links a:not(.btn):hover{color:var(--red)}
@media(max-width:640px){.nav-links a:not(.btn){display:none}}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;height:50px;padding:0 28px;border-radius:999px;
  background:var(--red);color:#fff;font-weight:600;font-size:15px;letter-spacing:.01em;
  box-shadow:0 0 0 0 var(--red-glow);transition:transform .25s ease,box-shadow .35s ease,background .25s}
.btn:hover{transform:translateY(-2px);box-shadow:0 10px 36px -6px var(--red-glow);background:#f02538}
.btn-sm{height:38px;padding:0 18px;font-size:13px}
.btn-ghost{background:transparent;border:1px solid rgba(255,255,255,.28);color:var(--fg)}
.btn-ghost:hover{background:rgba(255,255,255,.08);box-shadow:none}

/* pinned stage */
.track{position:relative}
.stage{position:sticky;top:0;height:100vh;height:100svh;width:100%;overflow:hidden;background:#000}
.canvas{position:absolute;inset:0;display:block;will-change:contents}
.vignette{position:absolute;inset:0;pointer-events:none;
  background:
   radial-gradient(120% 90% at 50% 50%,transparent 45%,rgba(0,0,0,.55) 100%),
   linear-gradient(to bottom,rgba(0,0,0,.45),transparent 22%,transparent 55%,rgba(0,0,0,.6))}

/* scenes */
.scene{position:absolute;z-index:5;max-width:min(470px,88vw);text-shadow:0 2px 30px rgba(0,0,0,.65);will-change:transform,opacity}
.scene-left{left:clamp(24px,6vw,96px);bottom:clamp(110px,17vh,190px)}
.scene-right{right:clamp(24px,6vw,96px);bottom:clamp(110px,17vh,190px);text-align:right}
.scene-right .eyebrow{justify-content:flex-end}
.scene-center{left:0;right:0;margin:0 auto;width:min(1000px,90vw);max-width:none;text-align:center;top:clamp(96px,17vh,170px)}
.scene-center .eyebrow{justify-content:center}
.scene-center .body{margin-inline:auto}
.eyebrow{display:flex;align-items:center;gap:10px;margin:0 0 16px;font-size:12px;font-weight:600;
  letter-spacing:.24em;text-transform:uppercase;color:var(--mute-dark)}
.eyebrow.red{color:var(--red)}
.scene .eyebrow::before{content:"";width:28px;height:1px;background:var(--red)}
.scene-center .eyebrow::before,.scene-center .eyebrow::after{content:"";width:28px;height:1px;background:var(--red)}
.scene-right .eyebrow::before{display:none}
.scene-right .eyebrow::after{content:"";width:28px;height:1px;background:var(--red)}
.title{margin:0;font-size:clamp(34px,4.9vw,72px);line-height:1;font-weight:700;letter-spacing:-.035em;text-wrap:balance}
.title span{display:block}
.body{margin:20px 0 0;max-width:46ch;font-size:clamp(15px,1.35vw,18px);line-height:1.6;color:var(--mute)}
.scene-right .body{margin-left:auto}
.cta-row{display:flex;gap:12px;margin-top:28px;flex-wrap:wrap}
.scene-center .cta-row{justify-content:center}

/* progress rail */
.rail{position:absolute;z-index:6;right:clamp(14px,2.4vw,32px);top:50%;transform:translateY(-50%);height:132px;width:2px;
  background:var(--line);border-radius:2px}
.rail-fill{position:absolute;inset:0;background:var(--red);transform-origin:top;transform:scaleY(0);border-radius:2px;
  box-shadow:0 0 12px var(--red-glow)}
.rail-num{position:absolute;top:calc(100% + 12px);left:50%;transform:translateX(-50%);font-size:11px;letter-spacing:.14em;
  color:var(--mute);font-variant-numeric:tabular-nums}
@media(max-width:640px){.rail{display:none}}

/* scroll hint */
.hint{position:absolute;z-index:7;left:0;right:0;bottom:clamp(22px,4vh,40px);display:flex;justify-content:center}
.hint-btn{display:flex;flex-direction:column;align-items:center;gap:20px;color:var(--fg)}
.scroll-line{width:1px;height:60px;background:rgba(255,255,255,0.6);animation:scrollLine 2s ease-in-out infinite}
.scroll-text{font-size:12px;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,0.8);font-weight:500}
@keyframes scrollLine{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(0.5);opacity:0.5}}

/* sections below */
.section{position:relative;background:var(--bg-light);padding:clamp(90px,14vh,160px) 0;color:var(--fg-dark)}
.wrap{width:min(1180px,100% - 48px);margin:0 auto}
.center{text-align:center}
.h2{margin:0;font-size:clamp(34px,5vw,68px);line-height:1.02;font-weight:700;letter-spacing:-.035em;color:var(--fg-dark)}
.h2 em{font-style:normal;color:var(--mute-dark)}
.lead{margin:24px 0 0;max-width:56ch;font-size:clamp(16px,1.5vw,20px);line-height:1.6;color:var(--mute-dark)}
.center .lead{margin-inline:auto}
.grid{margin-top:clamp(48px,8vh,88px);display:grid;gap:16px;grid-template-columns:repeat(4,1fr)}
@media(max-width:980px){.grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.grid{grid-template-columns:1fr}}
.card{position:relative;padding:28px 24px 32px;border:1px solid var(--line-dark);border-radius:20px;background:#ffffff;
  transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease}
.card:hover{transform:translateY(-6px);border-color:var(--red);box-shadow:0 10px 30px -10px rgba(225,29,46,.2)}
.card-n{font-size:12px;letter-spacing:.2em;color:var(--red);font-weight:600}
.card h3{margin:44px 0 10px;font-size:22px;letter-spacing:-.02em;color:var(--fg-dark)}
.card p{margin:0;font-size:15px;line-height:1.6;color:var(--mute-dark)}
.final{background:radial-gradient(60% 70% at 50% 100%,rgba(225,29,46,.16),transparent 70%),var(--bg-light);border-top:1px solid var(--line-dark)}
.center-row{justify-content:center}
.foot{margin:80px 0 0;font-size:12px;color:rgba(26,26,26,.5);letter-spacing:.06em}

@media (prefers-reduced-motion:reduce){
  .wheel,.chev{animation:none}
  .btn,.card{transition:none}
}

/* ===== home page sections ===== */
html{scroll-behavior:auto}
.muted{color:var(--mute-dark)} .sm{font-size:13px} .center-t{text-align:center}
.narrow{width:min(820px,100% - 48px)}
.section.alt{background:#f8f8f8;border-block:1px solid var(--line-dark)}
[data-rv]{opacity:0;transform:translate3d(0,28px,0);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
[data-rv].in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){[data-rv]{opacity:1;transform:none;transition:none}}

.bookbar-wrap{position:relative;z-index:10;background:var(--bg-light);padding:0 clamp(16px,4vw,48px);margin-top:-1px}
.bookbar{position:relative;top:-48px;margin:0 auto;max-width:1100px;display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr auto;gap:12px;align-items:end;
  padding:18px;border:1px solid var(--line-dark);border-radius:22px;background:rgba(255,255,255,.95);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  box-shadow:0 30px 80px -30px rgba(0,0,0,.15)}
.bookbar label{display:flex;flex-direction:column;gap:6px;min-width:0}
.bookbar label span{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mute-dark)}
.bookbar select,.bookbar input{height:50px;padding:0 14px;border-radius:12px;border:1px solid var(--line-dark);background:#ffffff;color:var(--fg-dark);font:inherit;font-size:15px;color-scheme:light;width:100%}
.bookbar select:focus,.bookbar input:focus{outline:2px solid var(--red);outline-offset:1px}
.bookbar-note{margin:-24px 0 0;text-align:center;font-size:13px;color:var(--mute-dark);padding-bottom:40px}
@media(max-width:900px){.bookbar{grid-template-columns:1fr 1fr}.bookbar .btn{grid-column:1/-1}}
@media(max-width:520px){.bookbar{grid-template-columns:1fr}}

.strip{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 40px;padding:8px 24px 70px;background:var(--bg-light);font-size:14px;color:var(--mute-dark)}
.strip div{display:flex;align-items:center;gap:10px}
.strip i{width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 10px var(--red-glow)}

.head-row{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap}
.tabs{display:flex;gap:6px;flex-wrap:wrap;padding:5px;border:1px solid var(--line-dark);border-radius:999px;background:#f0f0f0}
.tabs button{height:38px;padding:0 16px;border-radius:999px;font-size:14px;color:var(--mute-dark);transition:background .25s,color .25s}
.tabs button:hover{color:var(--fg-dark)}
.tabs button.on{background:var(--red);color:#fff}

.fleet{margin-top:48px;display:grid;gap:18px;grid-template-columns:repeat(3,1fr)}
@media(max-width:980px){.fleet{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.fleet{grid-template-columns:1fr}}
.car{cursor:pointer;border:1px solid var(--line-dark);border-radius:22px;overflow:hidden;background:#ffffff;
  transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .35s ease,border-color .3s,box-shadow .3s}
.car:hover{transform:translateY(-6px)!important;border-color:var(--red);box-shadow:0 10px 30px -10px rgba(225,29,46,.2)}
.car.sel{border-color:var(--red);box-shadow:0 0 0 1px var(--red),0 24px 60px -28px var(--red-glow)}
.car-img{position:relative;aspect-ratio:16/10;display:grid;place-items:center;background:radial-gradient(70% 80% at 50% 90%,rgba(225,29,46,.08),transparent 70%),#f5f5f5}
.car-img img{width:100%;height:100%;object-fit:cover}
.car-art{width:82%;height:auto}
.chip{position:absolute;top:14px;left:14px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.06em;background:rgba(225,29,46,.1);color:#e11d2e;border:1px solid rgba(225,29,46,.3)}
.car-body{padding:20px 20px 22px}
.car-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.car-top h3{margin:0;font-size:20px;letter-spacing:-.02em;color:var(--fg-dark)}
.specs{list-style:none;margin:14px 0 20px;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.specs li{padding:5px 10px;border-radius:8px;background:rgba(0,0,0,.06);font-size:12px;color:var(--mute-dark)}
.car-bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;padding-top:16px;border-top:1px solid var(--line-dark)}
.car-bottom strong{font-size:22px;letter-spacing:-.02em;color:var(--fg-dark)}
.car-bottom small{color:var(--mute-dark)}
.sample{margin:28px 0 0;text-align:center;font-size:12px;color:rgba(26,26,26,.4)}

.steps{list-style:none;margin:56px 0 0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:18px;position:relative}
@media(max-width:900px){.steps{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.steps{grid-template-columns:1fr}}
.steps li{padding-top:22px;border-top:1px solid var(--line-dark);position:relative}
.steps li::before{content:"";position:absolute;top:-1px;left:0;width:44px;height:2px;background:var(--red);box-shadow:0 0 12px var(--red-glow)}
.step-n{font-size:12px;letter-spacing:.2em;color:var(--red);font-weight:600}
.steps h3{margin:34px 0 8px;font-size:24px;letter-spacing:-.02em;color:var(--fg-dark)}
.steps p{margin:0;font-size:15px;line-height:1.6;color:var(--mute-dark)}

.split{display:grid;grid-template-columns:1fr 440px;gap:clamp(32px,6vw,90px);align-items:center}
@media(max-width:900px){.split{grid-template-columns:1fr}}
.sum{padding:24px;border:1px solid var(--line-dark);border-radius:24px;background:#ffffff;box-shadow:0 40px 90px -40px rgba(225,29,46,.15)}
.sum-head{display:flex;gap:16px;align-items:center;padding-bottom:20px;border-bottom:1px solid var(--line-dark)}
.sum-art{width:110px;flex:none;border-radius:14px;background:#f5f5f5;padding:6px}
.sum-head h3{margin:0 0 4px;font-size:20px;letter-spacing:-.02em;color:var(--fg-dark)}
.sum dl{margin:0;padding:8px 0}
.sum dl div{display:flex;justify-content:space-between;gap:16px;padding:11px 0;font-size:14px;border-bottom:1px dashed rgba(0,0,0,.08)}
.sum dt{color:var(--mute-dark)} .sum dd{margin:0;text-align:right;font-variant-numeric:tabular-nums;color:var(--fg-dark)}
.toggle{display:flex;align-items:center;gap:12px;margin:14px 0;font-size:14px;cursor:pointer;color:var(--fg-dark)}
.toggle input{position:absolute;opacity:0;pointer-events:none}
.sw{position:relative;flex:none;width:42px;height:24px;border-radius:99px;background:#ddd;transition:background .25s}
.sw::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .25s}
.toggle input:checked + .sw{background:var(--red)}
.toggle input:checked + .sw::after{transform:translateX(18px)}
.toggle input:focus-visible + .sw{outline:2px solid var(--red);outline-offset:2px}
.sum-total{display:flex;justify-content:space-between;align-items:baseline;padding:16px 0 18px;border-top:1px solid var(--line-dark)}
.sum-total strong{font-size:32px;letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:var(--fg-dark)}
.btn.wide{width:100%}
.sum .sm{margin:12px 0 0}

.faq{margin-top:40px;border-top:1px solid var(--line-dark)}
.qa{border-bottom:1px solid var(--line-dark)}
.qa button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:24px 0;text-align:left;font-size:clamp(16px,2vw,20px);font-weight:600;letter-spacing:-.01em;color:var(--fg-dark)}
.qa svg{flex:none;color:var(--red);transition:transform .35s}
.qa.open svg{transform:rotate(45deg)}
.qa-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s ease}
.qa.open .qa-body{grid-template-rows:1fr}
.qa-body p{overflow:hidden;margin:0;color:var(--mute-dark);line-height:1.7;font-size:16px}
.qa.open .qa-body p{padding-bottom:24px}

.final{border-top:1px solid var(--line-dark)}
.footer{background:#ffffff;border-top:1px solid var(--line-dark);padding:64px 0 28px;color:var(--fg-dark)}
.foot-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:32px}
@media(max-width:700px){.foot-grid{grid-template-columns:1fr 1fr}}
.foot-grid h4{margin:0 0 14px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute-dark);font-weight:600}
.foot-grid a{display:block;margin-bottom:10px;font-size:14px;color:rgba(26,26,26,.8)}
.foot-grid a:hover{color:var(--red)}
.footer .foot{text-align:center;margin:56px 0 0}
`;
