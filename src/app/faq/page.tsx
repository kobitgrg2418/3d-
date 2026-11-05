"use client";

import React, { useState } from "react";
import Link from "next/link";
import CarentFooter from "@/components/CarentFooter";
import { ChevronDown, Search } from "lucide-react";

const CATEGORIES = ["General", "Booking & Payment", "Insurance & Safety", "Pickup & Return"];

const ALL_FAQS = [
  {
    category: "General",
    q: "What makes 30Rentals different from traditional rental agencies?",
    a: "We operate exclusively with guaranteed model availability, zero hidden fees, and an executive concierge handoff. The exact supercar or luxury SUV you pick is the exact model prepared for you."
  },
  {
    category: "General",
    q: "What are the age and license requirements?",
    a: "Drivers must be at least 21 years old (25 for high-horsepower supercars such as McLaren and GT3 RS) with a clean driving license held for at least 12 months."
  },
  {
    category: "Booking & Payment",
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, MasterCard, American Express), digital bank transfers, and verified corporate purchase orders."
  },
  {
    category: "Booking & Payment",
    q: "Is a security deposit required?",
    a: "Yes, a refundable security deposit is held at the start of your booking and released immediately upon return of the vehicle without damage."
  },
  {
    category: "Insurance & Safety",
    q: "What type of insurance coverage is included?",
    a: "Every rental includes standard comprehensive insurance and third-party liability. You can also add our Zero-Deductible Full Protection package for complete liability reduction."
  },
  {
    category: "Insurance & Safety",
    q: "What happens in case of a mechanical breakdown or puncture?",
    a: "Our 24/7 Roadside Concierge is on call immediately. We will dispatch roadside repair or arrange an immediate vehicle replacement wherever you are located."
  },
  {
    category: "Pickup & Return",
    q: "Can I arrange for pickup at Kathmandu Airport or Pokhara Airport?",
    a: "Yes. Our concierge meets you curbside directly at the terminal arrivals exit with the vehicle primed, detailed, and ready to drive."
  },
  {
    category: "Pickup & Return",
    q: "Can I pick up the car in Kathmandu and return it in Pokhara?",
    a: "Yes, we support one-way intercity rentals between major hubs. A standard intercity transfer fee applies depending on the drop-off location."
  }
];

export default function FAQPage() {
  const [selectedCat, setSelectedCat] = useState("General");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = ALL_FAQS.filter((f) => {
    const matchCat = selectedCat === "All" || f.category === selectedCat;
    const matchSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="faq-root">
      <style>{`
        .faq-root {
          min-height: 100vh;
          background: var(--white);
          color: var(--black);
          font-family: var(--font-sans);
        }

        /* Nav */
        .carent-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px clamp(20px, 4vw, 80px);
          background: var(--white);
          border-bottom: 1px solid var(--grey-300);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .carent-brand {
          font-size: var(--fs-h3);
          font-weight:600;
          letter-spacing: -0.03em;
          color: var(--black);
          text-decoration: none;
        }

        .carent-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .carent-nav-links a {
          color: var(--grey-600);
          text-decoration: none;
          font-size: var(--fs-body);
          font-weight:600;
          transition: color 0.2s;
        }

        .carent-nav-links a:hover,
        .carent-nav-links a.active {
          color: var(--black);
          font-weight:600;
        }

        .carent-nav-action {
          background: var(--black);
          color: var(--white);
          padding: 10px 22px;
          border-radius: 999px;
          font-size: var(--fs-caption);
          font-weight:600;
          text-decoration: none;
        }

        /* Hero */
        .faq-hero {
          max-width: 900px;
          margin: 0 auto;
          padding: 70px clamp(20px, 4vw, 40px) 30px;
          text-align: center;
        }

        .faq-pill {
          display: inline-flex;
          padding: 6px 16px;
          border-radius: 999px;
          background: var(--grey-100);
          border: 1px solid var(--grey-300);
          font-size: var(--fs-caption);
          font-weight:600;
          letter-spacing: 0.05em;
          
          color: var(--grey-600);
          margin-bottom: 16px;
        }

        .faq-title {
          font-size: var(--fs-h1);
          font-weight:600;
          letter-spacing: -0.035em;
          color: var(--black);
          margin: 0 0 18px 0;
          line-height: 1.1;
        }

        .faq-desc {
          font-size: var(--fs-body);
          color: var(--grey-600);
          margin: 0 auto 36px;
          line-height: 1.6;
        }

        /* Search & Filters */
        .faq-controls {
          max-width: 800px;
          margin: 0 auto 60px;
          padding: 0 clamp(20px, 4vw, 40px);
        }

        .faq-search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--grey-100);
          border: 1px solid var(--grey-300);
          border-radius: 999px;
          padding: 12px 24px;
          margin-bottom: 24px;
        }

        .faq-search-bar input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-size: var(--fs-body);
          color: var(--black);
        }

        .faq-cat-pills {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .faq-cat-btn {
          background: var(--white);
          border: 1px solid var(--grey-300);
          color: var(--grey-600);
          padding: 8px 18px;
          border-radius: 999px;
          font-size: var(--fs-caption);
          font-weight:600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .faq-cat-btn:hover {
          color: var(--black);
          border-color: var(--black);
        }

        .faq-cat-btn.active {
          background: var(--black);
          color: var(--white);
          border-color: var(--black);
        }

        /* Accordion */
        .faq-accordion {
          max-width: 840px;
          margin: 0 auto 100px;
          padding: 0 clamp(20px, 4vw, 40px);
        }

        .faq-item {
          border-bottom: 1px solid var(--grey-300);
        }

        .faq-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          background: none;
          border: none;
          text-align: left;
          font-size: var(--fs-body);
          font-weight:600;
          color: var(--black);
          cursor: pointer;
        }

        .faq-answer {
          padding-bottom: 24px;
          color: var(--grey-600);
          font-size: var(--fs-body);
          line-height: 1.65;
        }
      `}</style>

      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-pill">Knowledge Base & Support</div>
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-desc">
          Everything you need to know about reserving, collecting, and enjoying your luxury rental with total clarity.
        </p>
      </section>

      {/* Controls */}
      <div className="faq-controls">
        <div className="faq-search-bar">
          <Search size={18} color="var(--grey-600)" />
          <input
            type="text"
            placeholder="Search questions (e.g., license, airport, deposit)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="faq-cat-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`faq-cat-btn ${selectedCat === cat ? "active" : ""}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion */}
      <div className="faq-accordion">
        {filtered.map((item, idx) => (
          <div key={idx} className="faq-item">
            <button
              className="faq-btn"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span>{item.q}</span>
              <ChevronDown
                size={18}
                style={{
                  transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s"
                }}
              />
            </button>
            {openIndex === idx && <div className="faq-answer">{item.a}</div>}
          </div>
        ))}
      </div>

      {/* Footer */}
      <CarentFooter />
    </div>
  );
}
