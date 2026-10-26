"use client";

import React, { useState } from "react";
import Link from "next/link";
import CarentFooter from "@/components/CarentFooter";
import { ArrowRight, ChevronDown, ShieldCheck, Clock, Key, Calendar, Sparkles } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Browse & Select",
    tagline: "Instant Transparency",
    desc: "Explore our curated fleet of luxury sedans, exotic supercars, and premium SUVs. Filter by body type, specifications, and features with real-time pricing.",
    icon: <Sparkles className="w-6 h-6 text-emerald-500" />
  },
  {
    num: "02",
    title: "Custom Schedule & Location",
    tagline: "Total Flexibility",
    desc: "Choose flexible dates and pickup points across Kathmandu, Pokhara, or direct airport VIP dispatch right to your terminal door.",
    icon: <Calendar className="w-6 h-6 text-blue-500" />
  },
  {
    num: "03",
    title: "Instant Verification & Booking",
    tagline: "Zero Hassle",
    desc: "Seamless digital verification with encrypted identity check. Add full comprehensive protection or roadside concierge with transparent pricing.",
    icon: <ShieldCheck className="w-6 h-6 text-purple-500" />
  },
  {
    num: "04",
    title: "Key Handover & Drive",
    tagline: "Pure Performance",
    desc: "Receive your vehicle meticulously inspected, detailed, and primed with a full tank. Our concierge hands over keys within 5 minutes.",
    icon: <Key className="w-6 h-6 text-amber-500" />
  }
];

const FAQS = [
  {
    q: "What documents are required to rent a vehicle?",
    a: "You need a valid driver's license (held for at least 1 year), a valid government ID or Passport, and a major credit/debit card for the security deposit."
  },
  {
    q: "Can I receive delivery of the car directly at the airport or hotel?",
    a: "Yes. We offer VIP delivery service to all major international and domestic airports, luxury hotels, and private residences in Kathmandu and Pokhara."
  },
  {
    q: "How does insurance and protection work?",
    a: "Every rental includes third-party liability and comprehensive basic coverage. You can optionally upgrade to Zero-Deductible Full Protection for absolute peace of mind."
  },
  {
    q: "What is your fuel policy?",
    a: "We operate on a full-to-full policy. You will receive the car with a full tank, and simply return it with a full tank."
  }
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="hiw-root">
      <style>{`
        .hiw-root {
          min-height: 100vh;
          background: #ffffff;
          color: #0b0f19;
          font-family: var(--rfont, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        }

        /* Top Nav */
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
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0b0f19;
          text-decoration: none;
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
          background: #0b0f19;
          color: #ffffff;
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }

        /* Header */
        .hiw-hero {
          max-width: 1240px;
          margin: 0 auto;
          padding: 64px clamp(20px, 4vw, 80px) 40px;
          text-align: center;
        }

        .hiw-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 999px;
          background: #f4f5f7;
          border: 1px solid #e5e7eb;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #525866;
          margin-bottom: 16px;
        }

        .hiw-title {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.1;
          color: #0b0f19;
          margin: 0 0 18px 0;
        }

        .hiw-subtitle {
          font-size: 17px;
          color: #525866;
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Steps Timeline Grid */
        .hiw-steps-wrap {
          max-width: 1240px;
          margin: 40px auto 80px;
          padding: 0 clamp(20px, 4vw, 80px);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .hiw-step-card {
          background: #ffffff;
          border: 1px solid #eaecf0;
          border-radius: 24px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }

        .hiw-step-card:hover {
          transform: translateY(-5px);
          border-color: #d0d5dd;
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
        }

        .hiw-step-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .hiw-step-num {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0b0f19;
        }

        .hiw-step-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #f4f5f7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hiw-step-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #0b0f19;
          margin: 0 0 6px 0;
          letter-spacing: -0.015em;
        }

        .hiw-step-tagline {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #868c98;
          margin-bottom: 14px;
        }

        .hiw-step-card p {
          font-size: 14.5px;
          color: #525866;
          line-height: 1.6;
          margin: 0;
        }

        /* Principles Bento Section */
        .hiw-bento-sec {
          background: #f9fafb;
          border-top: 1px solid #f0f2f5;
          border-bottom: 1px solid #f0f2f5;
          padding: 80px clamp(20px, 4vw, 80px);
        }

        .hiw-bento-inner {
          max-width: 1240px;
          margin: 0 auto;
        }

        .hiw-bento-title-row {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 50px;
        }

        .hiw-bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .hiw-bento-card {
          background: #ffffff;
          border: 1px solid #eaecf0;
          border-radius: 20px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hiw-bento-card h4 {
          font-size: 18px;
          font-weight: 700;
          color: #0b0f19;
          margin: 0;
        }

        .hiw-bento-card p {
          font-size: 14.5px;
          color: #525866;
          line-height: 1.55;
          margin: 0;
        }

        /* FAQ Section */
        .hiw-faq-sec {
          max-width: 900px;
          margin: 80px auto;
          padding: 0 clamp(20px, 4vw, 40px);
        }

        .hiw-faq-title {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.025em;
          text-align: center;
          margin: 0 0 40px 0;
        }

        .hiw-faq-item {
          border-bottom: 1px solid #eaecf0;
        }

        .hiw-faq-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 0;
          background: none;
          border: none;
          text-align: left;
          font-size: 17px;
          font-weight: 600;
          color: #0b0f19;
          cursor: pointer;
        }

        .hiw-faq-answer {
          padding-bottom: 22px;
          color: #525866;
          font-size: 15px;
          line-height: 1.6;
        }
      `}</style>

      {/* Top Nav */}
      <nav className="carent-nav">
        <Link href="/" className="carent-brand">30Rentals</Link>
        <div className="carent-nav-links">
          <Link href="/">Home</Link>
          <Link href="/fleet">Fleet</Link>
          <Link href="/how-it-works" className="active">How it works</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/owners">Owners</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <Link href="/#booking" className="carent-nav-action">Book now</Link>
      </nav>

      {/* Hero Header */}
      <section className="hiw-hero">
        <div className="hiw-pill">Seamless Rental Protocol</div>
        <h1 className="hiw-title">Four Simple Steps.<br />Zero Friction.</h1>
        <p className="hiw-subtitle">
          Designed from the ground up for speed, convenience, and complete transparency. Discover how simple getting behind the wheel can be.
        </p>
      </section>

      {/* Steps Grid */}
      <section className="hiw-steps-wrap">
        {STEPS.map((s) => (
          <div key={s.num} className="hiw-step-card">
            <div className="hiw-step-header">
              <span className="hiw-step-num">{s.num}</span>
              <div className="hiw-step-icon">{s.icon}</div>
            </div>
            <h3>{s.title}</h3>
            <div className="hiw-step-tagline">{s.tagline}</div>
            <p>{s.desc}</p>
          </div>
        ))}
      </section>

      {/* Bento Standard */}
      <section className="hiw-bento-sec">
        <div className="hiw-bento-inner">
          <div className="hiw-bento-title-row">
            <h2 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 10px 0" }}>The 30Rentals Standard</h2>
            <p style={{ color: "#525866", fontSize: "15px", margin: 0 }}>Built for precision drivers who expect high standards of service.</p>
          </div>
          <div className="hiw-bento-grid">
            <div className="hiw-bento-card">
              <h4>Meticulous Vehicle Inspection</h4>
              <p>Every vehicle undergoes a 45-point mechanical and aesthetic check prior to every single dispatch.</p>
            </div>
            <div className="hiw-bento-card">
              <h4>Guaranteed Model Availability</h4>
              <p>The exact car, model year, and specification you book is guaranteed to be waiting for you.</p>
            </div>
            <div className="hiw-bento-card">
              <h4>24/7 Roadside Concierge</h4>
              <p>Direct priority support line for immediate assistance anywhere across the country.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="hiw-faq-sec">
        <h2 className="hiw-faq-title">Frequently Asked Questions</h2>
        {FAQS.map((faq, i) => (
          <div key={i} className="hiw-faq-item">
            <button
              className="hiw-faq-btn"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span>{faq.q}</span>
              <ChevronDown
                size={18}
                style={{
                  transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s"
                }}
              />
            </button>
            {openFaq === i && <div className="hiw-faq-answer">{faq.a}</div>}
          </div>
        ))}
      </section>

      {/* Footer */}
      <CarentFooter />
    </div>
  );
}
