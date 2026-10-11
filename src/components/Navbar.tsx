"use client";

import { useState } from "react";
import { ArrowRight, Menu, X, ChevronDown, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import MegaMenu from "./MegaMenu";

interface NavbarProps {
  scrollProgress: number;
}

interface MegaMenuData {
  label: string;
  columns: Array<{
    heading: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }>;
  panel?: {
    description_heading: string;
    description_text: string;
    card_label: string;
    card_title: string;
    card_subtitle: string;
    card_href: string;
    card_image: string;
  };
}

export default function Navbar({ scrollProgress }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Sample mega menu data - this would come from your Django backend
  const megaMenuData: Record<string, MegaMenuData> = {
    "FLEET": {
      label: "FLEET",
      columns: [
        {
          heading: "Vehicle Types",
          links: [
            { label: "Sedans", href: "/fleet/sedans" },
            { label: "SUVs", href: "/fleet/suvs" },
            { label: "Sports Cars", href: "/fleet/sports" },
            { label: "Electric", href: "/fleet/electric" },
          ],
        },
        {
          heading: "Features",
          links: [
            { label: "Luxury Features", href: "/fleet/features" },
            { label: "Performance", href: "/fleet/performance" },
            { label: "Technology", href: "/fleet/technology" },
          ],
        },
        {
          heading: "Services",
          links: [
            { label: "Maintenance", href: "/services/maintenance" },
            { label: "Repairs", href: "/services/repairs" },
            { label: "Customization", href: "/services/customization" },
          ],
        },
      ],
      panel: {
        description_heading: "Discover Our Fleet",
        description_text: "Explore our premium collection of luxury vehicles designed for those who demand excellence.",
        card_label: "New Arrivals",
        card_title: "2024 Collection",
        card_subtitle: "Experience the latest models",
        card_href: "/fleet/new",
        card_image: "/images/fleet-card.jpg",
      },
    },
    "EXPERIENCE": {
      label: "EXPERIENCE",
      columns: [
        {
          heading: "Services",
          links: [
            { label: "Test Drive", href: "/experience/test-drive" },
            { label: "Events", href: "/experience/events" },
            { label: "Track Days", href: "/experience/track-days" },
          ],
        },
        {
          heading: "Locations",
          links: [
            { label: "Showroom", href: "/locations/showroom" },
            { label: "Service Centers", href: "/locations/service" },
          ],
        },
      ],
    },
    "SERVICES": {
      label: "SERVICES",
      columns: [
        {
          heading: "Maintenance",
          links: [
            { label: "Scheduled Service", href: "/services/scheduled" },
            { label: "Emergency Repair", href: "/services/emergency" },
            { label: "Parts & Accessories", href: "/services/parts" },
          ],
        },
        {
          heading: "Customization",
          links: [
            { label: "Exterior Modifications", href: "/services/exterior" },
            { label: "Interior Upgrades", href: "/services/interior" },
            { label: "Performance Tuning", href: "/services/performance" },
          ],
        },
      ],
    },
  };

  const handleMouseEnter = (label: string) => {
    setActiveMegaMenu(label);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <>
      <nav
        className="absolute top-0 z-50 pointer-events-auto flex items-center justify-between px-6 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-6 w-full text-white"
      >
        {/* Brand */}
        <div className="hidden lg:block">
          <span className="text-sm tracking-[0.15em] uppercase font-light">
            30RENTAL
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {["FLEET", "EXPERIENCE", "SERVICES", "ABOUT"].map((item) => (
            <div
              key={item}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="text-xs tracking-[0.15em] uppercase font-light hover:opacity-70 transition-opacity flex items-center gap-1"
              >
                {item}
                {megaMenuData[item] && <ChevronDown size={14} />}
              </button>
              {item === "FLEET" && (
                <div className="absolute bottom-[-12px] left-0 right-0 h-[2px] bg-current" />
              )}

              {/* Mega Menu */}
              {activeMegaMenu === item && megaMenuData[item] && (
                <MegaMenu
                  isOpen={true}
                  onClose={() => setActiveMegaMenu(null)}
                  label={item}
                  columns={megaMenuData[item].columns}
                  panel={megaMenuData[item].panel}
                />
              )}
            </div>
          ))}
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-4 xl:gap-6">
          {/* Sign In Button */}
          <button className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-sm text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
            <User size={16} />
            <span>Sign in</span>
          </button>

          {/* Get a Quote Button */}
          <button className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-orange-500 border-2 border-orange-600 rounded-sm text-white text-sm font-medium hover:bg-orange-600 transition-colors">
            <span>Get a Quote</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-[5px]">
              <div className="w-6 h-[2px] bg-white" />
              <div className="w-6 h-[2px] bg-white" />
              <div className="w-4 h-[2px] bg-white" />
            </div>
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
