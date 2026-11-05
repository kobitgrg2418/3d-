"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Logo from "../Logo";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const LINKS = [
  ["Fleet", "/fleet"],
  ["Owners", "/owners"],
  ["FAQ", "/faq"],
] as const;

/** Tool / internal routes that keep their own chrome. */
const HIDDEN = ["/admin", "/room", "/video-scrub", "/design-idea"];

/**
 * The one navbar for the whole site: a flat full-width bar: logo top-left, links centred, Book now top-right.
 * Home: fixed over the hero (transparent, white ink; RentalsHero flips data-solid once the hero ends).
 * Every other page: sticky, solid white.
 */
export default function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  if (HIDDEN.some((p) => pathname === p || pathname.startsWith(p + "/"))) return null;
  const home = pathname === "/";
  const book = () => {
    if (home) document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    else router.push("/#booking");
  };

  return (
    <nav className="rnav" data-mode={home ? "hero" : "page"} data-solid={home ? "0" : "1"}>
      <div className="rnav-box">
        <Link className="rbrand" href="/" aria-label="30Rentals home"><Logo height={36} tone="paper" /></Link>
        <div className={`rnav-links ${menu ? "open" : ""}`} onClick={() => setMenu(false)}>
          {LINKS.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(href + "/") ? "page" : undefined}>{label}</Link>
          ))}
        </div>
        <div className="rnav-cta"><InteractiveHoverButton text="Book now" className="ihb" onClick={book} /></div>
        <button className="rburger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <span /><span />
        </button>
        <motion.div className="rprog" style={{ scaleX: progress }} aria-hidden />
      </div>
    </nav>
  );
}
