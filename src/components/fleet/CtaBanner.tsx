"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "0px 0px -80px 0px" },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

/** Night-drive banner: CSS streaks + tail-light glow, centred headline and CTA. */
export default function CtaBanner() {
  return (
    <section className="f-cta" aria-labelledby="f-cta-title">
      <div className="f-cta-streaks" aria-hidden />
      <div className="f-cta-glow" aria-hidden />
      <div className="f-cta-line" style={{ bottom: 38, width: "46%" }} aria-hidden />
      <div className="f-cta-line" style={{ bottom: 26, width: "30%", opacity: 0.7 }} aria-hidden />
      <div className="flex flex-col items-center">
        <motion.h2 id="f-cta-title" {...reveal(0)}
          className="m-0 max-w-[640px] text-balance text-[32px] font-semibold leading-[1.05] tracking-[-0.025em] text-white min-[641px]:text-[48px]">
          Ready to Experience Your Dream Car?
        </motion.h2>
        <motion.p {...reveal(0.12)} className="mx-0 mb-7 mt-4 max-w-[420px] text-[14px] leading-[1.5] text-white/80">
          Book a private test drive and feel what true performance means. Every vehicle available for immediate viewing.
        </motion.p>
        <motion.div {...reveal(0.24)}>
          <a href="/#booking" className="f-btn f-btn-light">
            Schedule Test Drive
            <span className="f-btn-chip">
              <ArrowRight className="a1" size={22} strokeWidth={1.8} aria-hidden />
              <ArrowRight className="a2" size={22} strokeWidth={1.8} aria-hidden />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
