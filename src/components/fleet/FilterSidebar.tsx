"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import { CONDITIONS, PRICE_RANGES, type Filters } from "@/data/fleetCatalog";

type Props = {
  filters: Filters;
  makes: string[];
  onChange: (patch: Partial<Filters>) => void;
};

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="f-label" htmlFor={`f-${label}`}>{label}</label>
      <div className="relative">
        <select id={`f-${label}`} data-select className="f-field" value={value} onChange={(e) => onChange(e.target.value)}
          style={value !== "All" ? { color: "var(--f-ink)" } : undefined}>
          <option value="All">All</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={18} strokeWidth={1.8} className="f-mute pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2" aria-hidden />
      </div>
    </div>
  );
}

/** Live filters: search, make, condition, year, max mileage, price range. */
export default function FilterSidebar({ filters, makes, onChange }: Props) {
  const toggleRange = (id: string) =>
    onChange({ ranges: filters.ranges.includes(id) ? filters.ranges.filter((r) => r !== id) : [...filters.ranges, id] });

  return (
    <div className="flex flex-col gap-7">
      <div className="relative">
        <Search size={18} strokeWidth={1.8} className="f-mute pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2" aria-hidden />
        <input className="f-field" style={{ paddingLeft: 48 }} type="search" placeholder="Search Car..." aria-label="Search cars"
          value={filters.query} onChange={(e) => onChange({ query: e.target.value })} />
      </div>

      <Select label="Make" value={filters.make} options={makes} onChange={(make) => onChange({ make })} />
      <Select label="Condition" value={filters.condition} options={CONDITIONS} onChange={(condition) => onChange({ condition })} />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="f-label" htmlFor="f-year">Year</label>
          <input id="f-year" className="f-field" inputMode="numeric" placeholder="Year..." value={filters.year}
            onChange={(e) => onChange({ year: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
        </div>
        <div>
          <label className="f-label" htmlFor="f-km">Max Mileage</label>
          <input id="f-km" className="f-field" inputMode="numeric" placeholder="Max..." value={filters.maxMileage}
            onChange={(e) => onChange({ maxMileage: e.target.value.replace(/\D/g, "").slice(0, 6) })} />
        </div>
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className="f-label">Price Range</legend>
        <div className="flex flex-col gap-4">
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="f-cb">
              <input type="checkbox" checked={filters.ranges.includes(r.id)} onChange={() => toggleRange(r.id)} />
              <span className="f-check"><Check size={14} strokeWidth={3} aria-hidden /></span>
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
