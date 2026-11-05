"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fmtDay, type CatalogCar } from "@/data/fleetCatalog";

/** One fleet card: image with a carved-in arrow corner, name + daily rate, year + badge. */
export default function CarCard({ car }: { car: CatalogCar }) {
  return (
    <motion.div layout
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
      <Link href={`/fleet/${car.slug}`} className="group block cursor-pointer" aria-label={`${car.name}, ${fmtDay(car.price)} per day`}>
        <div className="relative aspect-[664/352]">
          <div className="f-surface absolute inset-0 overflow-hidden rounded-[22px]">
            <img src={car.image} alt={car.name} loading="lazy" draggable={false}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
          </div>
          <div className="f-notch">
            <span className="f-arrow f-grad">
              <ArrowRight className="a1" size={22} strokeWidth={1.8} aria-hidden />
              <ArrowRight className="a2" size={22} strokeWidth={1.8} aria-hidden />
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-4 text-[20px] font-medium leading-tight">
          <h3 className="m-0 text-[20px] font-medium">{car.name}</h3>
          <span className="shrink-0">{fmtDay(car.price)}<span className="f-mute text-[14px]">/day</span></span>
        </div>
        <div className="f-mute mt-1 flex items-center justify-between gap-4 text-[16px]">
          <span>{car.year}</span>
          {car.tag && <span>{car.tag}</span>}
        </div>
      </Link>
    </motion.div>
  );
}
