"use client";

/**
 * 30Rentals — scroll-driven immersive hero (single file).
 *
 * Setup:  put the frames in /public/frames/frame_00001.jpg … frame_00451.jpg
 *
 * Why it stays smooth:
 *  - Frames are drawn on a <canvas> (no <img> swapping, no layout work).
 *  - Frames are preloaded + decoded in the background while the page is live.
 *  - Scroll position is eased in a requestAnimationFrame loop (frame-rate
 *    independent), so wheel notches glide instead of stepping.
 *  - Text overlays are driven through refs / direct style writes, so React
 *    never re-renders while scrolling.
 *  - The canvas only redraws when the target frame actually changes.
 */

import RBtn, { Arrow } from "./site/RBtn";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { animate, inView, motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, RefreshCw, ShieldCheck, BadgeDollarSign } from "lucide-react";
import CarentFooter from "./CarentFooter";
import { TOKENS } from "@/lib/tokens";

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
  title: string;
  facts?: { k: string; v: string }[];
  cta?: boolean;
};

const SCENES: Scene[] = [
  {
    id: "intro",
    start: 0.0,
    end: 0.25,
    align: "left",
    title: "Luxury cars.\nPokhara.",
    facts: [
      { k: "From", v: "Rs 11,500/day" },
      { k: "Pickup", v: "Airport or Lakeside" },
      { k: "Cancel", v: "Free" },
    ],
  },
  {
    id: "find",
    start: 0.35,
    end: 0.62,
    align: "right",
    title: "Handpicked\nFleet.",
    facts: [
      { k: "Cars", v: "9 models" },
      { k: "Insured", v: "Every trip" },
      { k: "Inspected", v: "Before handover" },
    ],
  },
  {
    id: "outro",
    start: 0.75,
    end: 1.001,
    align: "center",
    title: "Book in minutes.",
    facts: [
      { k: "Price", v: "Total shown upfront" },
      { k: "Keys", v: "Same-day" },
    ],
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


/* ---------- SAMPLE DATA: replace with your real fleet, photos & prices ---------- */
type Body = "SUV" | "Sport" | "Coupe" | "Wagon";
type Car = {
  id: string; name: string; year: number; body: Body; seats: number; gear: "Auto" | "Manual";
  fuel: string; bags: number; price: number; tag?: string; image: string;
};
const FLEET: Car[] = [
  { id: "c1", name: "Range Rover Sport", year: 2024, body: "SUV", seats: 5, gear: "Auto", fuel: "Petrol", bags: 4, price: 14500, tag: "Popular", image: "/rent/range-rover-sport.png" },
  { id: "c2", name: "Porsche 911 GT3 RS", year: 2023, body: "Sport", seats: 2, gear: "Auto", fuel: "Petrol", bags: 1, price: 32000, tag: "Performance icon", image: "/rent/porsche-gt3.webp" },
  { id: "c3", name: "Lamborghini Urus", year: 2024, body: "SUV", seats: 5, gear: "Auto", fuel: "Petrol", bags: 4, price: 36000, tag: "New arrival", image: "/rent/urus.webp" },
  { id: "c4", name: "McLaren 720S Spider", year: 2023, body: "Sport", seats: 2, gear: "Auto", fuel: "Petrol", bags: 1, price: 42000, image: "/rent/mclaren.webp" },
  { id: "c5", name: "BMW M4 Competition", year: 2024, body: "Coupe", seats: 4, gear: "Auto", fuel: "Petrol", bags: 2, price: 17500, image: "/rent/aurvane.png" },
  { id: "c6", name: "Aston Martin DB12", year: 2024, body: "Coupe", seats: 4, gear: "Auto", fuel: "Petrol", bags: 2, price: 34000, tag: "Signature", image: "/rent/green-gt.webp" },
  { id: "c7", name: "Mercedes-AMG G63", year: 2024, body: "SUV", seats: 5, gear: "Auto", fuel: "Petrol", bags: 4, price: 24000, image: "/rent/veltora.png" },
  { id: "c8", name: "Audi RS6 Avant", year: 2023, body: "Wagon", seats: 5, gear: "Auto", fuel: "Petrol", bags: 5, price: 21000, image: "/rent/krynox.png" },
  { id: "c9", name: "Range Rover Velar", year: 2024, body: "SUV", seats: 5, gear: "Auto", fuel: "Diesel", bags: 4, price: 11500, tag: "Best value", image: "/rent/pharyx.png" },
];
const BODIES: ("All" | Body)[] = ["All", "SUV", "Sport", "Coupe", "Wagon"];
const PROTECTION_PER_DAY = 600;
const LOCATIONS = ["Pokhara Lakeside", "Pokhara Airport", "Kathmandu Airport", "Kathmandu Thamel"];

const STEPS = [
  { t: "Search", d: "Choose where, when and what you need. The fleet filters itself as you go." },
  { t: "Compare", d: "Clear specs side by side, with the total for your exact dates on every card." },
  { t: "Confirm", d: "One screen, one price. Add protection if you want it, skip it if you don't." },
  { t: "Drive", d: "Show your booking, collect the keys, go. Return is just as quick." },
];

const TESTIMONIALS = [
  { quote: "Outstanding service from start to finish. The booking was clear, the car was immaculate, and handover took minutes.", name: "James Mitchell", car: "Porsche 911" },
  { quote: "Finally a rental site that shows the real total up front. I booked from my phone on the lakeside and collected the same afternoon.", name: "Priya Sharma", car: "Range Rover Sport" },
];

const TEAM = [
  { name: "Michael Richardson", role: "Fleet lead", image: "/rent/team-1.webp" },
  { name: "Sarah Thompson", role: "Founder", image: "/rent/team-2.webp" },
];

const FAQS = [
  { q: "What do I need to rent a car?", a: "A valid driving licence, a government ID and a payment method. Exact requirements can be adjusted to your own policy." },
  { q: "Is the price I see the price I pay?", a: "Yes. The total on every card and in the booking summary includes everything except optional extras, which you choose yourself." },
  { q: "Can I change or cancel my booking?", a: "Edit dates or cancel from your booking page in a couple of taps. Cancellation terms are shown before you confirm, never after." },
  { q: "Is there a mileage limit?", a: "Set your own policy here: unlimited, a daily allowance, or per-kilometre pricing. The interface will show it up front either way." },
  { q: "What if I need help on the road?", a: "Roadside support details sit one tap away inside your booking, so you're never hunting for a phone number." },
];

const fmt = (n: number) => "Rs " + n.toLocaleString("en-IN");
const goTo = (hash: string) => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Scroll-linked image: drifts and scales as it crosses the viewport (framer-motion useScroll). */
function Parallax({ src, alt = "", amount = 36 }: { src: string; alt?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.22, 1.14, 1.22]);
  return (
    <div ref={ref} className="r-px">
      <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale }} />
    </div>
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

  // booking state
  const [place, setPlace] = useState(LOCATIONS[0]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [body, setBody] = useState<"All" | Body>("All");
  const [picked, setPicked] = useState<string>("c1");
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
  const shown = FLEET.filter((c) => body === "All" || c.body === body).slice(0, 3);


  // Section reveals: IntersectionObserver + framer-motion animate.
  // Re-runs when the fleet filter changes so newly mounted cards animate in too.
  // Done once-per-element via data-rvd (not a WeakSet) so React Strict Mode
  // remounts can re-attach observers after the previous ones were stopped.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stops: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-rv]").forEach((el) => {
      if (el.dataset.rvd === "1") return;
      if (reduce) {
        el.style.opacity = "1";
        el.dataset.rvd = "1";
        return;
      }
      const delay = (parseFloat(el.style.transitionDelay) || 0) / 1000;
      el.style.transitionDelay = "";
      stops.push(
        inView(
          el,
          () => {
            if (el.dataset.rvd === "1") return;
            el.dataset.rvd = "1";
            animate(
              el,
              { opacity: [0, 1], y: [44, 0], filter: ["blur(6px)", "blur(0px)"] },
              { duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] },
            );
          },
          { margin: "0px 0px -8% 0px", amount: 0.12 },
        ),
      );
    });
    return () => stops.forEach((st) => st());
  }, [body]);

  // Lenis smooth scroll (wheel / touch / keyboard) + anchor links
  const smoothTo = useRef<(y: number) => void>((y) => window.scrollTo(0, y));
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    smoothTo.current = (y: number) => lenis.scrollTo(y, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : document.body;
      if (!el) return;
      e.preventDefault();
      smoothTo.current(id ? el.getBoundingClientRect().top + window.scrollY - 70 : 0);
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      smoothTo.current = (y) => window.scrollTo(0, y);
    };
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) smoothTo.current(el.getBoundingClientRect().top + window.scrollY - 88);
  };

  /* ------------------------------------------------------------------ */
  /* 1. Preload every frame (first frame immediately, rest in parallel)  */
  /* ------------------------------------------------------------------ */
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );

  useEffect(() => {
    let cancelled = false;
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

    Promise.all(Array.from({ length: CONCURRENCY }, worker));

    return () => {
      cancelled = true;
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /* 2. Render loop: eased scroll → frame + text overlays                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
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
      ctx.fillStyle = TOKENS.black;
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
      const nav = document.querySelector<HTMLElement>(".rnav");
      if (nav) nav.dataset.solid = window.scrollY > trackTop + scrollable ? "1" : "0";

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
  }, []);

  const scrollToNext = () => smoothTo.current(window.innerHeight * 1.1);

  return (
    <>
      <style>{CSS}</style>

      {/* --------------------------- nav --------------------------- */}
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
                <h1 className="title">
                  {s.title.split("\n").map((l, k) => (
                    <span key={k}>{l}</span>
                  ))}
                </h1>
                {s.facts && (
                  <dl className="facts">
                    {s.facts.map((f) => (
                      <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
                    ))}
                  </dl>
                )}
                {s.cta && (
                  <div className="cta-row">
                    <InteractiveHoverButton text="Browse the fleet" className="ihb" onClick={() => goTo("#fleet")} />
                    <InteractiveHoverButton text="Book now" className="ihb ihb-ghost" onClick={() => goTo("#booking")} />
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
                <ChevronDown className="chev" size={18} strokeWidth={1.6} aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {/* -------------------- booking bar -------------------- */}
        <div className="lt">
        <section className="r-bookwrap" id="booking">
          <form className="r-book" data-rv onSubmit={(e) => { e.preventDefault(); go("fleet"); }}>
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
            <RBtn type="submit">Search cars</RBtn>
          </form>
          <p className="r-note" data-rv>{days} {days === 1 ? "day" : "days"} · {place} · prices update live</p>
        </section>

        {/* ------------------------- fleet ------------------------- */}
        <section className="r-sec" id="fleet">
          <div className="r-wrap">
            <div className="r-head" data-rv>
              <div>
                <p className="r-eye">Fleet</p>
                <h2 className="r-h2">Featured cars</h2>
              </div>
              <div className="r-side">
                <RBtn href="/fleet">View all cars</RBtn>
              </div>
            </div>

            <div className="r-fleet">
              {shown.map((c, i) => (
                <article key={c.id} data-rv style={{ transitionDelay: `${(i % 3) * 70}ms` }} className={`r-car ${picked === c.id ? "sel" : ""}`}>
                  <div className="r-car-img" onClick={() => setPicked(c.id)}>
                    <img src={c.image} alt={`${c.name} ${c.year}`} loading="lazy" />
                    {c.tag && <span className="r-chip">{c.tag}</span>}
                    <button
                      className="r-go"
                      aria-label={`Select ${c.name}`}
                      onClick={(e) => { e.stopPropagation(); setPicked(c.id); setBooked(false); go("summary"); }}
                    ><i><Arrow /></i></button>
                  </div>
                  <div className="r-car-meta" onClick={() => setPicked(c.id)}>
                    <div>
                      <h3>{c.name}</h3>
                      <p>{c.year} · {c.body} · {c.seats} seats · {c.gear}</p>
                    </div>
                    <div className="r-price">
                      <strong>{fmt(c.price * days)}</strong>
                      <p>{fmt(c.price)} / day</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------- services bento ---------------------- */}
        <section className="r-sec" id="experience">
          <div className="r-wrap r-split2">
            <div data-rv>
              <p className="r-eye">Why 30Rentals</p>
              <h2 className="r-h2">We&rsquo;re way more<br />than a rental desk</h2>
              <p className="r-p" style={{ marginTop: 20, maxWidth: 380 }}>
                Renting a car shouldn&rsquo;t feel like filling in a tax form. Every screen is designed to get you
                from &ldquo;I need a car&rdquo; to &ldquo;keys in hand&rdquo; in the fewest, calmest steps possible.
              </p>
            </div>
            <div className="r-bento">
              <div className="r-col">
                <figure className="r-tile t1" data-rv><Parallax src="/rent/inspect.webp" /><figcaption>Inspected before every trip</figcaption></figure>
                <figure className="r-tile t3" data-rv><Parallax src="/rent/wheel.webp" /><figcaption>Detailed between rentals</figcaption></figure>
              </div>
              <div className="r-col">
                <figure className="r-tile r-black t2" data-rv>
                  <div className="r-ico">
                    <b><RefreshCw size={26} strokeWidth={1.8} aria-hidden /></b>
                    <b><ShieldCheck size={26} strokeWidth={1.8} aria-hidden /></b>
                    <b><BadgeDollarSign size={26} strokeWidth={1.8} aria-hidden /></b>
                  </div>
                  <figcaption>One clear price, always visible</figcaption>
                </figure>
                <figure className="r-tile t4" data-rv><Parallax src="/rent/keys.jpg" /><figcaption>Keys handed over in minutes</figcaption></figure>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------- how it works ---------------------- */}
        <section className="r-sec" id="how">
          <div className="r-wrap">
            <div className="r-head" data-rv>
              <div>
                <p className="r-eye">How it works</p>
                <h2 className="r-h2">Four steps.<br />No detours.</h2>
              </div>
              <div className="r-side"><RBtn href="#fleet">Browse fleet</RBtn></div>
            </div>
            <ol className="r-steps">
              {STEPS.map((st, i) => (
                <li key={st.t} data-rv style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="r-num">0{i + 1}</span>
                  <h3>{st.t}</h3>
                  <p>{st.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------- UI principles -------------------- */}
        <section className="r-sec">
          <div className="r-wrap">
            <div className="r-head" data-rv>
              <div>
                <p className="r-eye">The interface</p>
                <h2 className="r-h2">Built interface-first.<br />Everything else follows.</h2>
              </div>
            </div>
            <div className="r-grid4">
              {PRINCIPLES.map((p, i) => (
                <article className="r-card" key={p.n} data-rv style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="r-num">{p.n}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------- live booking summary ----------------- */}
        <section className="r-sec" id="summary">
          <div className="r-wrap r-split3">
            <div data-rv>
              <p className="r-eye">Booking summary</p>
              <h2 className="r-h2">Your total,<br />always in view.</h2>
              <p className="r-p" style={{ marginTop: 20, maxWidth: 420 }}>
                Change the car, the dates or the protection and the price answers instantly.
                This is the same summary your customers see, from first search to confirmation.
              </p>
            </div>

            <aside className="r-sum" data-rv aria-live="polite">
              <div className="r-sum-img"><img src={car.image} alt={car.name} /></div>
              <div className="r-sum-body">
                <div className="r-sum-title">
                  <h3>{car.name}</h3>
                  <p>{car.year} · {car.seats} seats · {car.gear} · {car.fuel}</p>
                </div>
                <dl>
                  <div><dt>Pick-up</dt><dd>{place}</dd></div>
                  <div><dt>Dates</dt><dd>{from || "—"} → {to || "—"}</dd></div>
                  <div><dt>Rental · {days} {days === 1 ? "day" : "days"}</dt><dd>{fmt(rental)}</dd></div>
                  <div><dt>Full protection</dt><dd>{protect ? fmt(prot) : "Not added"}</dd></div>
                  <div><dt>Service fees</dt><dd>Rs 0</dd></div>
                </dl>
                <label className="r-toggle">
                  <input type="checkbox" checked={protect} onChange={(e) => setProtect(e.target.checked)} />
                  <span className="sw" />
                  <span>Add full protection <small>({fmt(PROTECTION_PER_DAY)}/day)</small></span>
                </label>
                <div className="r-total"><span>Total</span><strong>{fmt(total)}</strong></div>
                <RBtn onClick={() => setBooked(true)}>{booked ? "Request received" : "Confirm booking"}</RBtn>
                <p className="r-fine">{booked ? "Demo only: connect this button to your booking backend." : "You won't be charged in this demo."}</p>
              </div>
            </aside>
          </div>
        </section>

        {/* ------------------------- CTA ------------------------- */}
        <section className="r-sec r-tight" id="book">
          <div className="r-wrap">
            <div className="r-cta" data-rv>
              <Parallax src="/rent/studio-lambo.webp" amount={70} />
              <div className="r-cta-in">
                <h2>Ready to hit<br />the road?</h2>
                <RBtn light href="#booking">Start your booking</RBtn>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------- testimonials ---------------------- */}
        <section className="r-sec" id="owners">
          <div className="r-wrap">
            <div className="r-head" data-rv>
              <div>
                <p className="r-eye">Testimonials</p>
                <h2 className="r-h2">Great numbers,<br />happy owners.</h2>
              </div>
              <div className="r-side">
                <p className="r-p">Real experiences from people who booked, collected and drove — then came back.</p>
              </div>
            </div>
            <div className="r-quotes">
              {TESTIMONIALS.map((t) => (
                <blockquote className="r-quote" key={t.name} data-rv>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <footer><strong>{t.name}</strong><span>{t.car}</span></footer>
                </blockquote>
              ))}
            </div>
            <div className="r-team">
              {TEAM.map((m) => (
                <figure className="r-person" key={m.name} data-rv>
                  <img src={m.image} alt={m.name} />
                  <figcaption>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </figcaption>
                </figure>
              ))}
              <div className="r-stats" data-rv>
                <div><b>800+</b><span>Trips completed</span></div>
                <div><b>20+</b><span>Years on the road</span></div>
                <div><b>4.9</b><span>Average owner rating</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------- FAQ ------------------------- */}
        <section className="r-sec" id="faq">
          <div className="r-wrap r-split2 faqs">
            <div data-rv>
              <p className="r-eye">FAQ</p>
              <h2 className="r-h2">Everything<br />you need to know</h2>
              <p className="r-p" style={{ marginTop: 20, maxWidth: 340 }}>Pick-up, pricing, changes and support, answered before you have to ask.</p>
            </div>
            <div className="r-faq" data-rv>
              {FAQS.map((f, i) => (
                <div key={f.q} className={`r-qa ${faq === i ? "open" : ""}`}>
                  <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}>
                    <span>{f.q}</span><Arrow down />
                  </button>
                  <div className="r-qa-body"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------- footer ----------------------- */}
        <CarentFooter />
        </div>
      </main>
    </>
  );
}

/* ====================================================================== */
/* Styles (kept in this file so the page is fully self-contained)          */
/* ====================================================================== */
const CSS = `
:root{
  --bg:var(--black-surface); --bg2:var(--black-surface); --fg:var(--white); --mute:color-mix(in srgb, var(--white) 70%, transparent);
  --line:color-mix(in srgb, var(--white) 12%, transparent); --red:var(--orange);
  --font:var(--font-sans);
}
*{box-sizing:border-box}
html{background:var(--rbg,var(--grey-100));-webkit-text-size-adjust:100%}
body{font-family: var(--font-sans);color:var(--fg);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}

/* buttons — solid, flat */
.btn{display:inline-flex;align-items:center;justify-content:center;height:var(--btn-h);padding:0 28px;border-radius:var(--radius-pill);
  background:var(--white);color:var(--black);font-weight:500;font-size:var(--fs-body);letter-spacing:-.011em;border:0;
  transition:transform var(--dur) var(--ease),background var(--dur) var(--ease)}
.btn:hover{background:var(--grey-100)}
.btn:active{transform:scale(.98)}
.btn-sm{height:40px;padding:0 24px;font-size:var(--fs-caption)}
.btn-ghost{background:transparent;color:var(--white);border:1px solid var(--white)}
.btn-ghost:hover{background:color-mix(in srgb, var(--white) 12%, transparent)}

/* pinned stage */
.track{position:relative}
.stage{position:sticky;top:0;height:100vh;height:100svh;width:100%;overflow:hidden;background:var(--black)}
.canvas{position:absolute;inset:0;display:block;will-change:contents}
.vignette{position:absolute;inset:0;pointer-events:none;
  background:
   radial-gradient(120% 90% at 50% 50%,transparent 45%,color-mix(in srgb, var(--black) 55%, transparent) 100%),
   linear-gradient(to bottom,color-mix(in srgb, var(--black) 45%, transparent),transparent 22%,transparent 55%,color-mix(in srgb, var(--black) 60%, transparent))}

/* scenes */
.scene{position:absolute;z-index:5;max-width:min(470px,88vw);will-change:transform,opacity}
.scene-left{left:clamp(24px,6vw,96px);bottom:clamp(110px,17vh,190px)}
.scene-right{right:clamp(24px,6vw,96px);bottom:clamp(110px,17vh,190px);text-align:right}
.scene-center{left:0;right:0;margin:0 auto;width:min(1000px,90vw);max-width:none;text-align:center;top:clamp(110px,19vh,180px)}
.title{margin:0;font-size:var(--fs-hero);line-height:1.05;font-weight:600;letter-spacing:-.03em;text-wrap:balance}
.title span{display:block}
.facts{display:flex;flex-wrap:wrap;gap:var(--space-2) var(--space-8);margin:var(--space-6) 0 0;padding:var(--space-4) 0 0;border-top:1px solid color-mix(in srgb, var(--white) 35%, transparent)}
.facts div{display:flex;flex-direction:column;gap:2px}
.facts dt{font-size:var(--fs-caption);letter-spacing:.02em;color:var(--mute)}
.facts dd{margin:0;font-size:var(--fs-body);font-weight:500;color:var(--white)}
.scene-right .facts{justify-content:flex-end}
.scene-center .facts{justify-content:center}
.cta-row{display:flex;gap:var(--space-3);margin-top:var(--space-8);flex-wrap:wrap}
.scene-center .cta-row{justify-content:center}

/* progress rail */
.rail{position:absolute;z-index:6;right:clamp(14px,2.4vw,32px);top:50%;transform:translateY(-50%);height:132px;width:2px;
  background:var(--line);border-radius:2px}
.rail-fill{position:absolute;inset:0;background:var(--red);transform-origin:top;transform:scaleY(0);border-radius:2px}
.rail-num{position:absolute;top:calc(100% + 12px);left:50%;transform:translateX(-50%);font-size:var(--fs-caption);letter-spacing:.14em;
  color:var(--mute);font-variant-numeric:tabular-nums}
.rail{display:none}

/* scroll hint */
.hint{position:absolute;z-index:7;left:0;right:0;bottom:clamp(22px,4vh,40px);display:flex;justify-content:center}
.hint-btn{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;color:var(--white);border:1px solid var(--white);background:transparent;transition:background var(--dur) var(--ease),color var(--dur) var(--ease)}
.hint-btn:hover{background:var(--white);color:var(--black)}
.hint-label,.mouse,.wheel{display:none}
.chev{animation:bob 1.8s ease-in-out infinite}
@keyframes wheel{0%{transform:translateY(0);opacity:1}70%{transform:translateY(14px);opacity:0}100%{opacity:0}}
@keyframes bob{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(5px);opacity:1}}


/* ====================================================================== */
/* Light theme (rent.zip look): navbar, cards, bento, FAQ, footer          */
/* Hero styles above are untouched.                                        */
/* ====================================================================== */
:root{--rbg:var(--white);--rcard:var(--grey-100);--rink:var(--black);--rmute:var(--grey-600);--rline:var(--grey-300);
  --rfont:var(--font-sans)}

/* light page wrapper */
.lt{position:relative;background:var(--rbg);color:var(--rink);font-family: var(--font-sans);-webkit-font-smoothing:antialiased}
.lt a{color:inherit;text-decoration:none}
.lt .rbtn{color:var(--white)}
.lt .rbtn-light{color:var(--black)}
.lt .r-pin{color:var(--white)}
.lt h2,.lt h3,.lt p{margin:0}
[data-rv]{opacity:0}
@media(prefers-reduced-motion:reduce){[data-rv]{opacity:1}}
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}
.lenis.lenis-stopped{overflow:hidden}
.r-px{position:absolute;inset:0;overflow:hidden}
.r-px img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;will-change:transform}
.r-wrap{width:min(var(--content-max),100% - 32px);margin:0 auto}
.r-sec{padding:var(--section-y) 0}
.r-tight{padding-top:0}
.r-eye{font-size:var(--fs-caption);letter-spacing:.02em;color:var(--rmute);margin-bottom:14px!important}
.r-h2{font-size:var(--fs-h1);line-height:1.04;font-weight:600;letter-spacing:-.025em}
.r-p{font-size:var(--fs-body);line-height:1.55;color:var(--rmute)}
.r-head{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;flex-wrap:wrap;margin-bottom:clamp(32px,4vw,56px)}
.r-side{display:flex;flex-direction:column;align-items:flex-end;gap:18px;max-width:420px;text-align:right}
@media(max-width:700px){.r-side{align-items:flex-start;text-align:left}}

/* booking bar */
.r-bookwrap{position:relative;z-index:10;padding:0 clamp(16px,4vw,48px)}
.r-book{position:relative;top:-52px;margin:0 auto;max-width:1120px;display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr auto;gap:12px;align-items:end;
  padding:16px;border-radius:var(--radius-card);background:var(--white);border:1px solid var(--rline);}
.r-book label{display:flex;flex-direction:column;gap:6px;min-width:0}
.r-book label span{font-size:var(--fs-caption);letter-spacing:.04em;color:var(--rmute)}
.r-book select,.r-book input{height:var(--input-h);padding:0 16px;border-radius:var(--radius-input);border:1px solid var(--rline);background:var(--white);color:var(--rink);font:inherit;font-family: var(--font-sans);font-size:var(--fs-body);width:100%}
.r-book select:focus,.r-book input:focus{outline:2px solid var(--orange);outline-offset:1px}
.r-note{margin:-28px 0 0!important;text-align:center;font-size:var(--fs-caption);color:var(--rmute);padding-bottom:12px}
@media(max-width:960px){.r-book{grid-template-columns:1fr 1fr}.r-book .rbtn{grid-column:1/-1;justify-content:space-between}}
@media(max-width:520px){.r-book{grid-template-columns:1fr}}

/* fleet */
.r-tabs{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.r-tabs button{height:var(--btn-h);padding:0 24px;border-radius:var(--radius-pill);background:var(--rcard);font:inherit;font-family: var(--font-sans);font-size:var(--fs-caption);font-weight:600;color:var(--rink);border:0;cursor:pointer;transition:background var(--dur) var(--ease),color var(--dur) var(--ease)}
.r-tabs button:hover{background:var(--grey-300)}
.r-tabs button.on{background:var(--orange);color:var(--black)}
.r-fleet{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,1.6vw,24px)}
@media(max-width:980px){.r-fleet{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.r-fleet{grid-template-columns:1fr}}
.r-car{cursor:pointer}
.r-car-img{position:relative;aspect-ratio:3/2;border-radius:var(--radius-card);overflow:hidden;background:var(--grey-300);transition:box-shadow .3s}
.r-car-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
.r-car:hover .r-car-img img{transform:scale(1.04)}
.r-car.sel .r-car-img{box-shadow:0 0 0 3px var(--rbg),0 0 0 5px var(--orange)}
.r-chip{position:absolute;top:14px;left:14px;padding:6px 12px;border-radius:10px;background:var(--white);font-size:var(--fs-caption);font-weight:600}
/* notched arrow chip (inverse corners) */
.r-go{position:absolute;right:0;bottom:0;padding:7px 0 0 7px;background:var(--rbg);border-top-left-radius:22px;border:0;cursor:pointer}
.r-go::before,.r-go::after{content:"";position:absolute;width:22px;height:22px;pointer-events:none;background:radial-gradient(circle at 0 0,transparent 21px,var(--rbg) 22px)}
.r-go::before{right:0;top:-22px}
.r-go::after{left:-22px;bottom:0}
.r-go i{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:var(--black);color:var(--white);transition:transform .3s}
.r-car:hover .r-go i{transform:translateX(2px)}
.r-car.sel .r-go i{background:var(--orange);color:var(--black)}
.r-car-meta{display:flex;justify-content:space-between;gap:14px;padding:16px 8px 0}
.r-car-meta h3{font-size:var(--fs-body);font-weight:600;letter-spacing:-.01em}
.r-car-meta p{font-size:var(--fs-caption);color:var(--rmute);margin-top:6px}
.r-price{text-align:right;flex:none}
.r-price strong{font-size:var(--fs-body);font-weight:600;letter-spacing:-.01em;font-variant-numeric:tabular-nums}
.r-sample{margin-top:28px!important;text-align:center;font-size:var(--fs-caption);color:var(--grey-600)}

/* bento */
.r-split2{display:grid;grid-template-columns:1fr 1.15fr;gap:clamp(24px,4vw,56px);align-items:start}
@media(max-width:900px){.r-split2{grid-template-columns:1fr}}
.r-bento{display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,1.4vw,20px);align-items:start}
.r-col{display:flex;flex-direction:column;gap:clamp(12px,1.4vw,20px)}
.r-col:last-child{margin-top:clamp(0px,3vw,48px)}
.r-tile{position:relative;margin:0;border-radius:var(--radius-card);overflow:hidden;background:var(--black);color:var(--white)}
.r-tile img{display:block;width:100%;height:100%;object-fit:cover;filter:brightness(.8)}
.r-tile::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,color-mix(in srgb, var(--black) 65%, transparent));pointer-events:none}
.r-tile figcaption{position:absolute;left:20px;right:20px;bottom:18px;z-index:2;font-size:var(--fs-body);font-weight:600;line-height:1.2}
.t1{aspect-ratio:1/1.2}.t3{aspect-ratio:1/.95}.t2{aspect-ratio:1/.7}.t4{aspect-ratio:1/1.2}
.r-black::after{display:none}
.r-ico{position:absolute;inset:0}
.r-ico b{position:absolute;display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--grey-600);color:var(--white)}
.r-ico b:nth-child(1){left:6%;top:10%}.r-ico b:nth-child(2){left:42%;top:8%}.r-ico b:nth-child(3){left:62%;top:34%}

/* steps + cards */
.r-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(12px,1.4vw,20px)}
@media(max-width:900px){.r-steps{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.r-steps{grid-template-columns:1fr}}
.r-steps li,.r-card{background:var(--rcard);border:1px solid var(--rline);border-radius:var(--radius-card);padding:var(--space-8);min-height:250px;display:flex;flex-direction:column;transition:transform .35s cubic-bezier(.25,.1,.25,1),box-shadow .35s}
.r-steps li:hover,.r-card:hover{border-color:var(--black)}
.r-num{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:var(--black);color:var(--white);font-size:var(--fs-caption);font-weight:600}
.r-steps h3,.r-card h3{margin-top:auto!important;font-size:var(--fs-h3);font-weight:600;letter-spacing:-.015em}
.r-steps p,.r-card p{margin-top:10px!important;font-size:var(--fs-body);line-height:1.55;color:var(--rmute);min-height:6.3em}
.r-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(12px,1.4vw,20px)}
@media(max-width:980px){.r-grid4{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.r-grid4{grid-template-columns:1fr}}

/* summary */
.r-split3{display:grid;grid-template-columns:1fr minmax(0,560px);gap:clamp(24px,5vw,80px);align-items:center}
@media(max-width:960px){.r-split3{grid-template-columns:1fr}}
.r-sum{background:var(--white);border:1px solid var(--rline);border-radius:var(--radius-card);padding:var(--space-2)}
.r-sum-img{border-radius:20px;overflow:hidden;aspect-ratio:16/8;background:var(--grey-300)}
.r-sum-img img{width:100%;height:100%;object-fit:cover;display:block}
.r-sum-body{padding:20px 14px 14px}
.r-sum-title h3{font-size:var(--fs-h3);font-weight:600;letter-spacing:-.015em}
.r-sum-title p{margin-top:6px;font-size:var(--fs-caption);color:var(--rmute)}
.r-sum dl{margin:14px 0 4px;padding:0}
.r-sum dl div{display:flex;justify-content:space-between;gap:16px;padding:12px 0;font-size:var(--fs-body);border-bottom:1px dashed var(--rline)}
.r-sum dt{color:var(--rmute)}.r-sum dd{margin:0;text-align:right;font-variant-numeric:tabular-nums}
.r-toggle{display:flex;align-items:center;gap:12px;margin:16px 0;font-size:var(--fs-body);cursor:pointer}
.r-toggle small{color:var(--rmute);font-size:var(--fs-caption)}
.r-toggle input{position:absolute;opacity:0;pointer-events:none}
.r-toggle .sw{position:relative;flex:none;width:44px;height:26px;border-radius:99px;background:var(--grey-300);transition:background .25s}
.r-toggle .sw::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:var(--white);transition:transform .25s;box-shadow:var(--shadow-sm)}
.r-toggle input:checked + .sw{background:var(--orange)}
.r-toggle input:checked + .sw::after{transform:translateX(18px)}
.r-toggle input:focus-visible + .sw{outline:2px solid var(--orange);outline-offset:2px}
.r-total{display:flex;justify-content:space-between;align-items:baseline;padding:16px 0 18px;border-top:1px solid var(--rline)}
.r-total span{color:var(--rmute)}
.r-total strong{font-size:var(--fs-h2);font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.r-sum .rbtn{width:100%;justify-content:space-between}
.r-fine{margin-top:12px!important;text-align:center;font-size:var(--fs-caption);color:var(--rmute)}

/* CTA banner */
.r-cta{position:relative;border-radius:var(--radius-card);overflow:hidden;min-height:clamp(340px,40vw,520px);background:var(--black-surface);color:var(--white)}
.r-cta img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.75)}
.r-cta::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,color-mix(in srgb, var(--black) 55%, transparent),transparent 70%)}
.r-cta-in{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:28px;justify-content:center;min-height:inherit;padding:clamp(28px,5vw,72px)}
.r-cta h2{font-size:var(--fs-hero);line-height:1;font-weight:600;letter-spacing:-.03em}

/* FAQ */
.faqs{align-items:start}
.r-faq{border-top:1px solid var(--rline)}
.r-qa{border-bottom:1px solid var(--rline)}
.r-qa button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px 4px;text-align:left;font:inherit;font-family: var(--font-sans);font-size:var(--fs-body);font-weight:600;color:var(--rink);background:none;border:0;cursor:pointer}
.r-qa button svg{flex:none;transition:transform .35s}
.r-qa.open button svg{transform:rotate(270deg)!important}
.r-qa-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s cubic-bezier(.25,.1,.25,1)}
.r-qa.open .r-qa-body{grid-template-rows:1fr}
.r-qa-body p{overflow:hidden;color:var(--rmute);line-height:1.65;font-size:var(--fs-body);padding-inline:4px;max-width:60ch}
.r-qa.open .r-qa-body p{padding-bottom:24px}

/* footer */
.r-foot{border-top:1px solid var(--rline);padding:clamp(40px,6vw,72px) 0 28px}
.r-foot-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:start}
@media(max-width:800px){.r-foot-grid{grid-template-columns:1fr}}
.r-big{font-size:var(--fs-hero);line-height:.95;font-weight:600;letter-spacing:-.04em}
.r-foot-btns{display:flex;gap:10px;align-items:center}
.r-pin{display:grid;place-items:center;width:54px;height:54px;border-radius:16px;background:var(--black);color:var(--white)}
.r-pills{display:grid;grid-template-columns:1fr 1fr;gap:10px;justify-items:start;max-width:520px;justify-self:end;width:100%}
@media(max-width:800px){.r-pills{justify-self:start}}
.r-pills a{padding:12px 24px;border-radius:var(--radius-pill);background:var(--rcard);font-size:var(--fs-caption);font-weight:600;transition:background .25s}
.r-pills a:hover{background:var(--white)}
.r-legal{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:clamp(40px,6vw,80px);padding-top:20px;border-top:1px solid var(--rline);font-size:var(--fs-caption);color:var(--rmute)}
.r-legal a:hover{color:var(--black)}

/* testimonials + team */
.r-quotes{display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,1.6vw,24px);margin-bottom:clamp(28px,4vw,48px)}
@media(max-width:800px){.r-quotes{grid-template-columns:1fr}}
.r-quote{margin:0;background:var(--rcard);border:1px solid var(--rline);border-radius:var(--radius-card);padding:var(--space-8);min-height:220px;display:flex;flex-direction:column}
.r-quote p{font-size:var(--fs-h3);line-height:1.4;letter-spacing:-.02em;font-weight:600}
.r-quote footer{margin-top:auto;padding-top:22px;display:flex;flex-direction:column;gap:4px}
.r-quote strong{font-weight:600}
.r-quote span{font-size:var(--fs-caption);color:var(--rmute)}
.r-team{display:grid;grid-template-columns:1fr 1fr 1.15fr;gap:clamp(12px,1.6vw,24px);align-items:stretch}
@media(max-width:900px){.r-team{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.r-team{grid-template-columns:1fr}}
.r-person{margin:0;border-radius:var(--radius-card);overflow:hidden;background:var(--grey-300);position:relative;min-height:340px}
.r-person img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92)}
.r-person figcaption{position:absolute;left:18px;right:18px;bottom:18px;color:var(--white);display:flex;flex-direction:column;gap:4px;}
.r-person strong{font-size:var(--fs-body);font-weight:600}
.r-person span{font-size:var(--fs-caption);opacity:.85}
.r-stats{background:var(--black-surface);color:var(--white);border-radius:var(--radius-card);padding:var(--space-8);display:flex;flex-direction:column;justify-content:space-between;gap:var(--space-4);min-height:340px}
.r-stats div{display:flex;flex-direction:column;gap:4px}
.r-stats b{font-size:var(--fs-h1);font-weight:600;letter-spacing:-.04em;line-height:1}
.r-stats span{color:color-mix(in srgb, var(--white) 65%, transparent);font-size:var(--fs-caption)}
`;
