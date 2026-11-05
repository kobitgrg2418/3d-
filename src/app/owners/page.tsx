"use client";

import React, { useState } from "react";
import Link from "next/link";
import CarentFooter from "@/components/CarentFooter";
import { TrendingUp, ShieldCheck, DollarSign, CalendarCheck, CheckCircle2, ChevronRight } from "lucide-react";

export default function OwnersPage() {
  const [vehicleValue, setVehicleValue] = useState("15000000");
  const [estimatedDays, setEstimatedDays] = useState("12");

  const dailyEarnings = 22000;
  const monthlyEst = dailyEarnings * parseInt(estimatedDays, 10);

  return (
    <div className="own-root">
      <style>{`
        .own-root {
          min-height: 100vh;
          background: var(--white);
          color: var(--black);
          font-family: var(--font-sans);
        }

        /* Top Nav */
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
        .own-hero {
          max-width: 1240px;
          margin: 0 auto;
          padding: 68px clamp(20px, 4vw, 80px) 40px;
          text-align: center;
        }

        .own-pill {
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

        .own-title {
          font-size: var(--fs-h1);
          font-weight:600;
          letter-spacing: -0.035em;
          color: var(--black);
          margin: 0 0 18px 0;
          line-height: 1.1;
        }

        .own-desc {
          font-size: var(--fs-body);
          color: var(--grey-600);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Calculator Section */
        .own-calc-wrap {
          max-width: 1100px;
          margin: 30px auto 90px;
          padding: 0 clamp(20px, 4vw, 40px);
        }

        .own-calc-card {
          background: var(--grey-100);
          border: 1px solid var(--grey-300);
          border-radius: 28px;
          padding: 48px clamp(24px, 4vw, 60px);
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 850px) {
          .own-calc-card {
            grid-template-columns: 1fr;
          }
        }

        .own-calc-left h3 {
          font-size: var(--fs-h3);
          font-weight:600;
          letter-spacing: -0.02em;
          color: var(--black);
          margin: 0 0 10px 0;
        }

        .own-calc-left p {
          font-size: var(--fs-body);
          color: var(--grey-600);
          line-height: 1.6;
          margin: 0 0 30px 0;
        }

        .calc-field {
          margin-bottom: 22px;
        }

        .calc-field label {
          display: block;
          font-size: var(--fs-caption);
          font-weight:600;
          
          letter-spacing: 0.05em;
          color: var(--grey-600);
          margin-bottom: 8px;
        }

        .calc-field select {
          width: 100%;
          background: var(--white);
          border: 1px solid var(--grey-300);
          border-radius: 14px;
          padding: 12px 16px;
          font-size: var(--fs-body);
          color: var(--black);
          outline: none;
        }

        .own-calc-result {
          background: var(--white);
          border: 1px solid var(--grey-300);
          border-radius: 24px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: var(--shadow-md);
        }

        .own-est-label {
          font-size: var(--fs-caption);
          
          letter-spacing: 0.06em;
          color: var(--grey-600);
          font-weight:600;
        }

        .own-est-value {
          font-size: var(--fs-h1);
          font-weight:600;
          letter-spacing: -0.03em;
          color: var(--black);
          margin: 10px 0 6px 0;
        }

        .own-est-sub {
          font-size: var(--fs-caption);
          color: var(--grey-600);
          margin-bottom: 28px;
        }

        .own-cta-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--black);
          color: var(--white);
          padding: 14px 24px;
          border-radius: 999px;
          font-size: var(--fs-body);
          font-weight:600;
          text-decoration: none;
        }

        /* Pillars */
        .own-pillars {
          border-top: 1px solid var(--grey-300);
          padding: 80px clamp(20px, 4vw, 80px);
        }

        .own-pillars-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .own-pillar-box {
          background: var(--white);
          border: 1px solid var(--grey-300);
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .own-pillar-box h4 {
          font-size: var(--fs-body);
          font-weight:600;
          color: var(--black);
          margin: 0;
        }

        .own-pillar-box p {
          font-size: var(--fs-body);
          color: var(--grey-600);
          line-height: 1.6;
          margin: 0;
        }
      `}</style>

      {/* Hero */}
      <section className="own-hero">
        <div className="own-pill">Host Your Luxury Vehicle</div>
        <h1 className="own-title">Turn Your Exotic Car<br />Into Premium Revenue</h1>
        <p className="own-desc">
          Partner with 30Rentals. We handle vetted member screening, white-glove storage, active insurance, and maintenance while you earn passive returns.
        </p>
      </section>

      {/* Earnings Calculator */}
      <section className="own-calc-wrap">
        <div className="own-calc-card">
          <div className="own-calc-left">
            <h3>Estimate Your Earnings</h3>
            <p>Select your vehicle category and availability to view approximate monthly host payouts after insurance and management.</p>

            <div className="calc-field">
              <label>Vehicle Class</label>
              <select value={vehicleValue} onChange={(e) => setVehicleValue(e.target.value)}>
                <option value="15000000">Executive Luxury SUV (e.g. Range Rover)</option>
                <option value="25000000">Super SUV / Performance (e.g. Urus, G63)</option>
                <option value="35000000">Exotic Track / GT (e.g. GT3 RS, 720S)</option>
              </select>
            </div>

            <div className="calc-field">
              <label>Available Days Per Month</label>
              <select value={estimatedDays} onChange={(e) => setEstimatedDays(e.target.value)}>
                <option value="6">6 days / month (Weekends only)</option>
                <option value="12">12 days / month (Part-time)</option>
                <option value="20">20 days / month (Full dispatch)</option>
              </select>
            </div>
          </div>

          <div className="own-calc-result">
            <span className="own-est-label">Estimated Monthly Payout</span>
            <div className="own-est-value">NPR {monthlyEst.toLocaleString("en-IN")}</div>
            <p className="own-est-sub">Net payout to vehicle owner / month</p>
            <Link href="mailto:partners@30rentals.com" className="own-cta-btn">
              Apply to Host <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Protection Pillars */}
      <section className="own-pillars">
        <div className="own-pillars-inner">
          <div className="own-pillar-box">
            <h4>NPR 50,000,000 Dedicated Fleet Coverage</h4>
            <p>Every booking is backed by comprehensive commercial insurance covering accidental damage, theft, and third-party liabilities.</p>
          </div>
          <div className="own-pillar-box">
            <h4>Strict Member Screening</h4>
            <p>We verify identities, driving histories, and security deposits before any key is handed over.</p>
          </div>
          <div className="own-pillar-box">
            <h4>Climate-Controlled Storage & Detailing</h4>
            <p>Complimentary secure garage storage and professional detailing before and after every single rental trip.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <CarentFooter />
    </div>
  );
}
