"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { applyFilters, CATALOG, DEFAULT_FILTERS, MAKES, type Category, type Filters } from "@/data/fleetCatalog";
import CarGrid from "./CarGrid";
import CategoryTabs from "./CategoryTabs";
import CtaBanner from "./CtaBanner";
import FilterSidebar from "./FilterSidebar";

/** Fleet page body: sticky filter sidebar (drawer ≤1024px), sticky tabs, animated grid, CTA banner. */
export default function FleetBrowser() {
  const [category, setCategory] = useState<"All" | Category>("All");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [drawer, setDrawer] = useState(false);

  const cars = useMemo(() => applyFilters(CATALOG, category, filters), [category, filters]);
  const patch = (p: Partial<Filters>) => setFilters((f) => ({ ...f, ...p }));
  const reset = () => { setFilters(DEFAULT_FILTERS); setCategory("All"); };

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [drawer]);

  return (
    <main className="fleet-root pb-[120px]">
      <h1 className="sr-only">Our fleet</h1>
      <div className="mx-auto w-full max-w-[1920px] px-5 pt-6 sm:px-8 min-[641px]:pt-10 lg:px-10 xl:px-[60px]">
        <div className="lg:grid lg:grid-cols-[315px_minmax(0,1fr)] lg:gap-x-[clamp(40px,5.3vw,100px)]">
          <aside className="hidden self-start lg:sticky lg:top-[112px] lg:block" aria-label="Filters">
            <h2 className="mb-7 mt-0 text-[30px] font-medium leading-none">Filters</h2>
            <FilterSidebar filters={filters} makes={MAKES} onChange={patch} />
          </aside>

          <section className="min-w-0">
            <button type="button" onClick={() => setDrawer(true)} className="f-surface mb-3 inline-flex h-12 items-center gap-2 rounded-[14px] px-5 text-[16px] font-medium lg:hidden">
              <SlidersHorizontal size={18} strokeWidth={1.8} aria-hidden /> Filters
            </button>
            <CategoryTabs value={category} onChange={setCategory} />
            <CarGrid cars={cars} onReset={reset} />
          </section>
        </div>
      </div>

      <div className="mx-6 mt-[120px]"><CtaBanner /></div>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div key="scrim" className="fixed inset-0 z-[60] bg-black/30 lg:hidden" onClick={() => setDrawer(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden />
            <motion.aside key="panel" role="dialog" aria-modal="true" aria-label="Filters"
              className="fleet-root fixed inset-y-0 left-0 z-[61] flex w-[min(340px,88vw)] flex-col overflow-y-auto p-5 lg:hidden"
              style={{ minHeight: 0 }} initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="m-0 text-[26px] font-medium">Filters</h2>
                <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="f-surface grid h-11 w-11 place-items-center rounded-[14px]"><X size={20} aria-hidden /></button>
              </div>
              <FilterSidebar filters={filters} makes={MAKES} onChange={patch} />
              <button type="button" onClick={() => setDrawer(false)} className="f-btn f-grad mt-8 justify-center self-stretch" style={{ height: 60, padding: "0 20px" }}>
                Show {cars.length} {cars.length === 1 ? "car" : "cars"}
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
