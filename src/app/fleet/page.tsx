"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FLEET, BODIES, Body, Car } from "@/data/fleet";

/* Icons copied from Framer Carent theme */
const ArrowTopRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FuelPumpIcon = () => (
  <img src="/assets/framerusercontent.com/images/Ysarex2MThrzXe9gykDpblExQ.svg" alt="Fuel" width="16" height="16" />
);

const GearboxIcon = () => (
  <img src="/assets/framerusercontent.com/images/5gO6ukdDexfwlOBIRoBPehfI4.svg" alt="Gearbox" width="16" height="16" />
);

const SeatsIcon = () => (
  <img src="/assets/framerusercontent.com/images/653DT4Z6snkyqJSs9g7PBNX3Zks.svg" alt="Seats" width="16" height="16" />
);

export default function FleetPage() {
  const [selectedBody, setSelectedBody] = useState<"All" | Body>("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredCars = useMemo(() => {
    return FLEET.filter((car) => {
      const matchesBody = selectedBody === "All" || car.body === selectedBody;
      const matchesSearch =
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.body.toLowerCase().includes(search.toLowerCase()) ||
        car.fuel.toLowerCase().includes(search.toLowerCase());
      return matchesBody && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [selectedBody, search, sortBy]);

  const fmt = (n: number) => `NPR ${n.toLocaleString("en-IN")}`;

  return (
    <div className="carent-root">
      <style>{`
        .carent-root {
          min-height: 100vh;
          background: #ffffff;
          color: #0b0f19;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ------------------ Carent Navbar ------------------ */
        .carent-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px clamp(20px, 4vw, 80px);
          background: #ffffff;
          border-bottom: 1px solid #f0f2f5;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .carent-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0b0f19;
        }

        .carent-brand-badge {
          background: #0b0f19;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .carent-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .carent-nav-links a {
          color: #525866;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .carent-nav-links a:hover,
        .carent-nav-links a.active {
          color: #0b0f19;
          font-weight: 600;
        }

        .carent-nav-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0b0f19;
          color: #ffffff;
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, background 0.2s;
        }

        .carent-nav-action:hover {
          background: #232733;
          transform: translateY(-1px);
        }

        /* ------------------ Header & Title ------------------ */
        .carent-hero-section {
          max-width: 1320px;
          margin: 0 auto;
          padding: 56px clamp(20px, 4vw, 80px) 24px;
        }

        .carent-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #868c98;
          margin-bottom: 14px;
        }

        .carent-breadcrumb a {
          color: #868c98;
          text-decoration: none;
        }

        .carent-breadcrumb a:hover {
          color: #0b0f19;
        }

        .carent-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 36px;
        }

        .carent-main-title {
          font-size: clamp(34px, 4.2vw, 56px);
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #0b0f19;
          margin: 0;
          line-height: 1.1;
        }

        .carent-main-desc {
          color: #525866;
          font-size: 16px;
          max-width: 460px;
          margin: 0;
          line-height: 1.55;
        }

        /* ------------------ Filter Bar ------------------ */
        .carent-filter-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 0;
          border-top: 1px solid #f0f2f5;
          border-bottom: 1px solid #f0f2f5;
        }

        .carent-pill-group {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .carent-pill {
          background: #f4f5f7;
          border: 1px solid transparent;
          color: #525866;
          padding: 9px 20px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .carent-pill:hover {
          background: #ebeef2;
          color: #0b0f19;
        }

        .carent-pill.active {
          background: #0b0f19;
          color: #ffffff;
        }

        .carent-controls-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .carent-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .carent-search-wrap input {
          background: #f4f5f7;
          border: 1px solid #e5e7eb;
          color: #0b0f19;
          padding: 9px 16px 9px 38px;
          border-radius: 999px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .carent-search-wrap input:focus {
          border-color: #0b0f19;
          background: #fff;
        }

        .carent-search-wrap svg {
          position: absolute;
          left: 14px;
          color: #868c98;
        }

        .carent-select {
          background: #f4f5f7;
          border: 1px solid #e5e7eb;
          color: #0b0f19;
          padding: 9px 16px;
          border-radius: 999px;
          font-size: 14px;
          outline: none;
          cursor: pointer;
        }

        /* ------------------ Carent Car Cards Grid ------------------ */
        .carent-cars-grid {
          max-width: 1320px;
          margin: 40px auto 80px;
          padding: 0 clamp(20px, 4vw, 80px);
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 32px;
        }

        @media (max-width: 480px) {
          .carent-cars-grid {
            grid-template-columns: 1fr;
          }
        }

        .carent-card {
          background: #ffffff;
          border: 1px solid #eaecf0;
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .carent-card:hover {
          transform: translateY(-5px);
          border-color: #d0d5dd;
          box-shadow: 0 20px 40px -15px rgba(11, 15, 25, 0.08);
        }

        .carent-card-img-wrap {
          position: relative;
          width: 100%;
          height: 260px;
          background: radial-gradient(circle at center, #f8f9fb 0%, #edf0f5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          overflow: hidden;
        }

        .carent-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .carent-card:hover .carent-card-img-wrap img {
          transform: scale(1.05);
        }

        .carent-card-tag {
          position: absolute;
          top: 18px;
          left: 18px;
          background: #0b0f19;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
          z-index: 2;
        }

        .carent-card-badge {
          position: absolute;
          top: 18px;
          right: 18px;
          background: #ffffff;
          border: 1px solid #eaecf0;
          color: #525866;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
          z-index: 2;
        }

        .carent-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .carent-card-title {
          font-size: 20px;
          font-weight: 700;
          color: #0b0f19;
          margin: 0 0 6px 0;
          letter-spacing: -0.02em;
        }

        .carent-card-desc {
          font-size: 13.5px;
          color: #667085;
          line-height: 1.5;
          margin: 0 0 18px 0;
          min-height: 40px;
        }

        .carent-card-specs {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-top: 1px solid #f2f4f7;
          border-bottom: 1px solid #f2f4f7;
          margin-bottom: 22px;
        }

        .carent-spec-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #344054;
        }

        .carent-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .carent-card-price {
          display: flex;
          flex-direction: column;
        }

        .carent-price-val {
          font-size: 22px;
          font-weight: 800;
          color: #0b0f19;
          letter-spacing: -0.03em;
        }

        .carent-price-sub {
          font-size: 12px;
          color: #667085;
        }

        .carent-book-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0b0f19;
          color: #ffffff;
          padding: 11px 20px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .carent-book-btn:hover {
          background: #232733;
          transform: translateY(-1px);
        }

        /* ------------------ Carent Footer ------------------ */
        .carent-footer {
          border-top: 1px solid #f0f2f5;
          padding: 60px clamp(20px, 4vw, 80px) 40px;
          background: #ffffff;
        }

        .carent-footer-inner {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }

        .carent-footer-copy {
          color: #868c98;
          font-size: 14px;
        }

        .carent-footer-links {
          display: flex;
          gap: 24px;
        }

        .carent-footer-links a {
          color: #525866;
          text-decoration: none;
          font-size: 14px;
        }

        .carent-footer-links a:hover {
          color: #0b0f19;
        }
      `}</style>

      {/* Carent Navbar */}
      <nav className="carent-nav">
        <Link href="/" className="carent-brand">
          30Rentals
          <span className="carent-brand-badge">FLEET</span>
        </Link>
        <div className="carent-nav-links">
          <Link href="/">Home</Link>
          <Link href="/fleet" className="active">Cars</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <Link href="/#booking" className="carent-nav-action">
          Book now
          <ArrowTopRight />
        </Link>
      </nav>

      {/* Hero Header */}
      <section className="carent-hero-section">
        <div className="carent-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: "#0b0f19", fontWeight: 600 }}>Cars</span>
        </div>

        <div className="carent-title-row">
          <div>
            <h1 className="carent-main-title">Explore Our Fleet</h1>
          </div>
          <p className="carent-main-desc">
            Choose from an elite portfolio of sports cars, luxury grand tourers, and executive SUVs maintained to peak perfection.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="carent-filter-bar">
          <div className="carent-pill-group">
            {BODIES.map((body) => (
              <button
                key={body}
                onClick={() => setSelectedBody(body)}
                className={`carent-pill ${selectedBody === body ? "active" : ""}`}
              >
                {body}
              </button>
            ))}
          </div>

          <div className="carent-controls-right">
            <div className="carent-search-wrap">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search models..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="carent-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <div className="carent-cars-grid">
        {filteredCars.map((car) => (
          <div key={car.id} className="carent-card">
            <div className="carent-card-img-wrap">
              <img src={car.image} alt={car.name} />
              {car.tag && <span className="carent-card-tag">{car.tag}</span>}
              <span className="carent-card-badge">{car.year}</span>
            </div>

            <div className="carent-card-body">
              <h2 className="carent-card-title">{car.name}</h2>
              <p className="carent-card-desc">{car.description}</p>

              <div className="carent-card-specs">
                <div className="carent-spec-badge">
                  <FuelPumpIcon />
                  <span>{car.fuel}</span>
                </div>
                <div className="carent-spec-badge">
                  <GearboxIcon />
                  <span>{car.gear}</span>
                </div>
                <div className="carent-spec-badge">
                  <SeatsIcon />
                  <span>{car.seats} Seats</span>
                </div>
              </div>

              <div className="carent-card-footer">
                <div className="carent-card-price">
                  <span className="carent-price-val">{fmt(car.price)}</span>
                  <span className="carent-price-sub">per day / taxes included</span>
                </div>
                <Link href={`/fleet/${car.slug}`} className="carent-book-btn">
                  View Details
                  <ArrowTopRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="carent-footer">
        <div className="carent-footer-inner">
          <div className="carent-footer-copy">
            © {new Date().getFullYear()} 30Rentals. All rights reserved.
          </div>
          <div className="carent-footer-links">
            <Link href="/">Home</Link>
            <Link href="/fleet">Cars</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
