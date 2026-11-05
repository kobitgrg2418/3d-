"use client";

import { motion } from "framer-motion";
import { CATEGORIES, type Category } from "@/data/fleetCatalog";

type Props = { value: "All" | Category; onChange: (v: "All" | Category) => void };

/** Sticky category pills. The active pill is one shared gradient that glides between tabs. */
export default function CategoryTabs({ value, onChange }: Props) {
  return (
    <div className="f-tabs-wrap">
      <div role="tablist" aria-label="Car category"
        className="flex gap-3 overflow-x-auto [scrollbar-width:none] min-[641px]:grid min-[641px]:grid-cols-5 min-[641px]:overflow-visible [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((c) => (
          <button key={c} role="tab" type="button" className="f-tab" aria-selected={value === c} onClick={() => onChange(c)}>
            {value === c && <motion.span layoutId="f-tab-bg" className="f-tab-bg f-grad" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
            <span>{c}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
