import { FLEET, type Car } from "./fleet";

export type Category = "SUV" | "Coupe" | "Convertible" | "Estate";
export type Condition = "New" | "Pre-owned";

export const CATEGORIES: ("All" | Category)[] = ["All", "SUV", "Coupe", "Convertible", "Estate"];
export const CONDITIONS: Condition[] = ["New", "Pre-owned"];

export type CatalogCar = Car & {
  make: string;
  category: Category;
  condition: Condition;
  /** odometer in km */
  mileage: number;
};

/** Filter metadata per car. NOTE: mileage / condition are placeholders — replace with real fleet data. */
const META: Record<string, Pick<CatalogCar, "make" | "category" | "condition" | "mileage">> = {
  "range-rover-sport": { make: "Range Rover", category: "SUV", condition: "Pre-owned", mileage: 18500 },
  "porsche-911-gt3-rs": { make: "Porsche", category: "Coupe", condition: "Pre-owned", mileage: 6200 },
  "lamborghini-urus": { make: "Lamborghini", category: "SUV", condition: "New", mileage: 2400 },
  "mclaren-720s-spider": { make: "McLaren", category: "Convertible", condition: "Pre-owned", mileage: 7800 },
  "bmw-m4-competition": { make: "BMW", category: "Coupe", condition: "New", mileage: 3100 },
  "aston-martin-db12": { make: "Aston Martin", category: "Coupe", condition: "New", mileage: 1900 },
  "mercedes-amg-g63": { make: "Mercedes-AMG", category: "SUV", condition: "Pre-owned", mileage: 12300 },
  "audi-rs6-avant": { make: "Audi", category: "Estate", condition: "Pre-owned", mileage: 15400 },
  "range-rover-velar": { make: "Range Rover", category: "SUV", condition: "New", mileage: 4600 },
};

export const CATALOG: CatalogCar[] = FLEET.flatMap((car) => (META[car.slug] ? [{ ...car, ...META[car.slug] }] : []));
export const MAKES: string[] = Array.from(new Set(CATALOG.map((c) => c.make))).sort();

/** Daily rate bands, NPR. min inclusive, max exclusive. */
export const PRICE_RANGES = [
  { id: "lt15", label: "Under 15k", min: 0, max: 15000 },
  { id: "15-30", label: "15k\u201330k", min: 15000, max: 30000 },
  { id: "gt30", label: "Over 30k", min: 30000, max: Infinity },
] as const;

export type Filters = {
  query: string;
  make: string; // "All" or a make
  condition: string; // "All" or a Condition
  year: string; // from year
  maxMileage: string;
  ranges: string[]; // PRICE_RANGES ids; empty = any
};

export const DEFAULT_FILTERS: Filters = { query: "", make: "All", condition: "All", year: "", maxMileage: "", ranges: [] };

export function applyFilters(cars: CatalogCar[], category: "All" | Category, f: Filters): CatalogCar[] {
  const q = f.query.trim().toLowerCase();
  const year = Number(f.year) || 0;
  const maxKm = Number(f.maxMileage) || 0;
  const bands = PRICE_RANGES.filter((r) => f.ranges.includes(r.id));
  return cars.filter(
    (c) =>
      (category === "All" || c.category === category) &&
      (!q || c.name.toLowerCase().includes(q) || c.make.toLowerCase().includes(q)) &&
      (f.make === "All" || c.make === f.make) &&
      (f.condition === "All" || c.condition === f.condition) &&
      (!year || c.year >= year) &&
      (!maxKm || c.mileage <= maxKm) &&
      (!bands.length || bands.some((r) => c.price >= r.min && c.price < r.max)),
  );
}

export const fmtDay = (n: number) => `NPR ${n.toLocaleString("en-IN")}`;
