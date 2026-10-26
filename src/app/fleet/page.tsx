"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FLEET, BODIES, Body, Car } from "@/data/fleet";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default function FleetPage() {
  const [selectedBody, setSelectedBody] = useState<"All" | Body>("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [activeCar, setActiveCar] = useState<Car | null>(null);

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
    <div className="fleet-page-wrapper">
      <style>{`
        .fleet-page-wrapper {
          min-height: 100vh;
          background: #0c0d0e;
          color: #f3f4f6;
          font-family: var(--rfont, system-ui, -apple-system, sans-serif);
          padding-bottom: 80px;
        }

        /* Top Nav */
        .fleet-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px clamp(20px, 4vw, 60px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(12, 13, 14, 0.85);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .fleet-brand {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
        }

        .fleet-nav-links {
          display: flex;
          align-items: center;
          gap: clamp(16px, 2.5vw, 36px);
        }

        .fleet-nav-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .fleet-nav-links a:hover,
        .fleet-nav-links a.active {
          color: #ffffff;
        }

        .fleet-nav-btn {
          background: #ffffff;
          color: #000000;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, background 0.2s;
        }

        .fleet-nav-btn:hover {
          transform: translateY(-1px);
          background: #e5e5e5;
        }

        /* Hero Header */
        .fleet-hero {
          padding: 60px clamp(20px, 4vw, 60px) 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .fleet-eyebrow {
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .fleet-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 36px;
        }

        .fleet-title {
          font-size: clamp(32px, 4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin: 0;
          color: #fff;
        }

        .fleet-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 16px;
          max-width: 420px;
          margin: 0;
          line-height: 1.5;
        }

        /* Filters Bar */
        .fleet-controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .fleet-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .fleet-tab-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .fleet-tab-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .fleet-tab-btn.active {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        .fleet-search-sort {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .fleet-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .fleet-search-box input {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 8px 14px 8px 36px;
          border-radius: 999px;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }

        .fleet-search-box input:focus {
          border-color: rgba(255, 255, 255, 0.4);
        }

        .fleet-search-box svg {
          position: absolute;
          left: 12px;
          color: rgba(255, 255, 255, 0.4);
        }

        .fleet-sort-select {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 13px;
          outline: none;
          cursor: pointer;
        }

        .fleet-sort-select option {
          background: #1a1c1e;
          color: #fff;
        }

        /* Grid */
        .fleet-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 28px;
          max-width: 1400px;
          margin: 36px auto 0;
          padding: 0 clamp(20px, 4vw, 60px);
        }

        @media (max-width: 480px) {
          .fleet-grid {
            grid-template-columns: 1fr;
          }
        }

        .car-card {
          background: #141618;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: column;
        }

        .car-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .car-image-container {
          position: relative;
          width: 100%;
          height: 240px;
          background: radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 70%), #101113;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow: hidden;
        }

        .car-image-container img {
          max-width: 95%;
          max-height: 85%;
          object-fit: contain;
          transition: transform 0.35s ease;
          filter: drop-shadow(0 15px 15px rgba(0,0,0,0.6));
        }

        .car-card:hover .car-image-container img {
          transform: scale(1.05);
        }

        .car-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .car-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .car-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .car-name {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .car-body-badge {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.08);
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 500;
        }

        .car-desc {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.45;
          margin: 6px 0 16px;
          min-height: 38px;
        }

        .car-specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 12px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 20px;
        }

        .spec-item {
          display: flex;
          flex-direction: column;
        }

        .spec-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }

        .spec-val {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 2px;
        }

        .car-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .price-group {
          display: flex;
          flex-direction: column;
        }

        .price-val {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .price-period {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.45);
        }

        .card-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          color: #000000;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
          text-decoration: none;
        }

        .card-action-btn:hover {
          background: #e6e6e6;
          transform: translateY(-1px);
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 100;
        }

        .modal-card {
          background: #16181b;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 28px;
          max-width: 650px;
          width: 100%;
          overflow: hidden;
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
        }

        .modal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #fff;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .modal-body {
          padding: 30px;
        }

        .modal-img-wrap {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 70%), #0e1012;
          border-radius: 20px;
          margin-bottom: 24px;
        }

        .modal-img-wrap img {
          max-width: 90%;
          max-height: 85%;
          object-fit: contain;
          filter: drop-shadow(0 20px 20px rgba(0,0,0,0.7));
        }

        .modal-specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          background: rgba(255, 255, 255, 0.04);
          padding: 16px;
          border-radius: 16px;
          margin: 20px 0;
        }
      `}</style>

      {/* Nav */}
      <nav className="fleet-nav">
        <Link href="/" className="fleet-brand">30Rentals</Link>
        <div className="fleet-nav-links">
          <Link href="/">Home</Link>
          <Link href="/fleet" className="active">Fleet</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <Link href="/#booking" className="fleet-nav-btn">Book Now</Link>
      </nav>

      {/* Hero Header */}
      <div className="fleet-hero">
        <p className="fleet-eyebrow">Executive & Exotic Collection</p>
        <div className="fleet-title-row">
          <div>
            <h1 className="fleet-title">Available Fleet</h1>
          </div>
          <p className="fleet-subtitle">
            Every vehicle is thoroughly inspected, fully insured, and prepared with pristine attention to detail.
          </p>
        </div>

        {/* Controls */}
        <div className="fleet-controls">
          <div className="fleet-tabs">
            {BODIES.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBody(b)}
                className={`fleet-tab-btn ${selectedBody === b ? "active" : ""}`}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="fleet-search-sort">
            <div className="fleet-search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search models..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="fleet-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="fleet-grid">
        {filteredCars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-container">
              <img src={car.image} alt={car.name} />
              {car.tag && <span className="car-tag">{car.tag}</span>}
            </div>

            <div className="car-content">
              <div className="car-header">
                <h3 className="car-name">{car.name}</h3>
                <span className="car-body-badge">{car.body}</span>
              </div>
              <p className="car-desc">{car.description}</p>

              <div className="car-specs">
                <div className="spec-item">
                  <span className="spec-label">Year</span>
                  <span className="spec-val">{car.year}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Seats</span>
                  <span className="spec-val">{car.seats} Seats</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Trans</span>
                  <span className="spec-val">{car.gear}</span>
                </div>
              </div>

              <div className="car-footer">
                <div className="price-group">
                  <span className="price-val">{fmt(car.price)}</span>
                  <span className="price-period">per day / taxes included</span>
                </div>
                <button
                  onClick={() => setActiveCar(car)}
                  className="card-action-btn"
                >
                  Details <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {activeCar && (
        <div className="modal-overlay" onClick={() => setActiveCar(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveCar(null)}>✕</button>
            <div className="modal-body">
              <div className="modal-img-wrap">
                <img src={activeCar.image} alt={activeCar.name} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "24px", margin: 0 }}>{activeCar.name}</h2>
                <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: "999px" }}>
                  {activeCar.year} · {activeCar.body}
                </span>
              </div>

              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: "1.6", margin: "16px 0" }}>
                {activeCar.description}
              </p>

              <div className="modal-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">0-100 km/h</span>
                  <span className="spec-val">{activeCar.acceleration || "3.5s"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Top Speed</span>
                  <span className="spec-val">{activeCar.topSpeed || "300 km/h"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Horsepower</span>
                  <span className="spec-val">{activeCar.power || "500+ HP"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Transmission</span>
                  <span className="spec-val">{activeCar.gear}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Fuel</span>
                  <span className="spec-val">{activeCar.fuel}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Luggage</span>
                  <span className="spec-val">{activeCar.bags} Bags</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" }}>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: "700" }}>{fmt(activeCar.price)}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Daily rental rate</div>
                </div>
                <Link
                  href={`/#booking`}
                  className="card-action-btn"
                  style={{ padding: "12px 24px", fontSize: "14px" }}
                >
                  Reserve This Car
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
