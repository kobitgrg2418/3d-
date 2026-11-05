import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@/components/fleet/fleet.css";
import CarentFooter from "@/components/CarentFooter";
import FleetBrowser from "@/components/fleet/FleetBrowser";

export const metadata: Metadata = {
  title: "Fleet | 30Rentals",
  description: "Browse the 30Rentals luxury fleet — SUVs, coupes, convertibles and estates available for rent in Pokhara.",
};

export default function FleetPage() {
  return (
    <>
      <FleetBrowser />
      <CarentFooter />
    </>
  );
}
