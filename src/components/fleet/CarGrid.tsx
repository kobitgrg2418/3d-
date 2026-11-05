"use client";

import { AnimatePresence } from "framer-motion";
import type { CatalogCar } from "@/data/fleetCatalog";
import CarCard from "./CarCard";

type Props = { cars: CatalogCar[]; onReset: () => void };

export default function CarGrid({ cars, onReset }: Props) {
  if (!cars.length) {
    return (
      <div className="mt-5 flex flex-col items-start gap-5 py-16">
        <p className="m-0 text-[20px] font-medium">No cars match those filters.</p>
        <button type="button" onClick={onReset} className="f-btn f-grad" style={{ height: 56, paddingRight: 28 }}>Reset filters</button>
      </div>
    );
  }
  return (
    <div className="mt-5 grid grid-cols-1 gap-x-[30px] gap-y-10 min-[641px]:grid-cols-2">
      <AnimatePresence mode="popLayout">
        {cars.map((c) => <CarCard key={c.id} car={c} />)}
      </AnimatePresence>
    </div>
  );
}
