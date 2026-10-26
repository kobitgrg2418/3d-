"use client";

import React from "react";
import Link from "next/link";
import CarentFooter from "@/components/CarentFooter";
import { Compass, Gauge, Shield, Award, Users, HeartHandshake } from "lucide-react";

const EXPERIENCES = [
  {
    title: "Scenic Mountain Touring",
    desc: "Unleash high-horsepower grand tourers through winding Himalayan passes and panoramic mountain highways with bespoke route maps curated for enthusiasts.",
    image: "/rent/green-gt.webp",
    tag: "Signature Journey"
  },
  {
    title: "Chauffeured Executive VIP",
    desc: "Discreet, highly trained security-conscious chauffeurs dedicated to state visits, corporate executive logistics, and VIP airport terminal escorts.",
    image: "/rent/range-rover-sport.png",
    tag: "Chauffeured"
  },
  {
    title: "Track Day Exhilaration",
    desc: "Experience naturally aspirated precision, DRS aerodynamics, and dedicated telemetry coaching in our track-spec Porsche 911 GT3 RS.",
    image: "/rent/porsche-gt3.webp",
    tag: "Motorsport"
  },
  {
    title: "All-Terrain Alpine Expedition",
    desc: "Command steep gravel switchbacks and rugged lake trails in supreme comfort aboard the Mercedes-AMG G63 or Lamborghini Urus.",
    image: "/rent/urus.webp",
    tag: "Off-Road Luxury"
  }
];

export default function ExperiencePage() {
  return (
    <div className="exp-root">
      <style>{`
        .exp-root {
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

        /* Hero */
        .exp-hero {
          max-width: 1240px;
          margin: 0 auto;
          padding: 70px clamp(20px, 4vw, 80px) 40px;
          text-align: center;
        }

        .exp-pill {
          display: inline-flex;
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

        .exp-title {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #0b0f19;
          margin: 0 0 18px 0;
          line-height: 1.1;
        }

        .exp-desc {
          font-size: 17px;
          color: #525866;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Showcase Grid */
        .exp-grid {
          max-width: 1240px;
          margin: 40px auto 90px;
          padding: 0 clamp(20px, 4vw, 80px);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 32px;
        }

        .exp-card {
          background: #ffffff;
          border: 1px solid #eaecf0;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }

        .exp-card:hover {
          transform: translateY(-5px);
          border-color: #d0d5dd;
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
        }

        .exp-card-img {
          height: 240px;
          background: radial-gradient(circle at center, #f8f9fb 0%, #edf0f5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .exp-card-img img {
          max-width: 90%;
          max-height: 85%;
          object-fit: contain;
          transition: transform 0.35s ease;
          filter: drop-shadow(0 15px 15px rgba(0,0,0,0.18));
        }

        .exp-card:hover .exp-card-img img {
          transform: scale(1.05);
        }

        .exp-card-tag {
          position: absolute;
          top: 18px;
          left: 18px;
          background: #0b0f19;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
        }

        .exp-card-body {
          padding: 26px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .exp-card-body h3 {
          font-size: 20px;
          font-weight: 700;
          color: #0b0f19;
          margin: 0 0 10px 0;
          letter-spacing: -0.015em;
        }

        .exp-card-body p {
          font-size: 14.5px;
          color: #525866;
          line-height: 1.6;
          margin: 0;
        }

        /* Pillars Banner */
        .exp-pillars-sec {
          background: #f9fafb;
          border-top: 1px solid #f0f2f5;
          padding: 80px clamp(20px, 4vw, 80px);
        }

        .exp-pillars-inner {
          max-width: 1240px;
          margin: 0 auto;
        }

        .exp-pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 28px;
        }

        .exp-pillar-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .exp-pillar-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #eaecf0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0b0f19;
        }

        .exp-pillar-item h4 {
          font-size: 17px;
          font-weight: 700;
          color: #0b0f19;
          margin: 0;
        }

        .exp-pillar-item p {
          font-size: 14px;
          color: #525866;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>

      {/* Nav */}
      <nav className="carent-nav">
        <Link href="/" className="carent-brand">30Rentals</Link>
        <div className="carent-nav-links">
          <Link href="/">Home</Link>
          <Link href="/fleet">Fleet</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/experience" className="active">Experience</Link>
          <Link href="/owners">Owners</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <Link href="/#booking" className="carent-nav-action">Book now</Link>
      </nav>

      {/* Header */}
      <section className="exp-hero">
        <div className="exp-pill">Beyond The Drive</div>
        <h1 className="exp-title">Curated Journeys &<br />Bespoke Moments</h1>
        <p className="exp-desc">
          More than vehicle rentals. We unlock rare driving thrills, tailored mountain itineraries, and effortless luxury travel.
        </p>
      </section>

      {/* Showcase Grid */}
      <section className="exp-grid">
        {EXPERIENCES.map((exp) => (
          <div key={exp.title} className="exp-card">
            <div className="exp-card-img">
              <img src={exp.image} alt={exp.title} />
              <span className="exp-card-tag">{exp.tag}</span>
            </div>
            <div className="exp-card-body">
              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Pillars Section */}
      <section className="exp-pillars-sec">
        <div className="exp-pillars-inner">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 10px 0" }}>The 30Rentals Promise</h2>
            <p style={{ color: "#525866", fontSize: "15px", margin: 0 }}>Four pillars that define every moment on the road.</p>
          </div>
          <div className="exp-pillars-grid">
            <div className="exp-pillar-item">
              <div className="exp-pillar-icon"><Gauge size={22} /></div>
              <h4>Direct Performance</h4>
              <p>Every engine is broken in properly, detailed, and maintained exclusively by certified factory technicians.</p>
            </div>
            <div className="exp-pillar-item">
              <div className="exp-pillar-icon"><Compass size={22} /></div>
              <h4>Curated Routes</h4>
              <p>Receive digital route guides tailored with scenic turnouts, smooth surfaces, and scenic stops.</p>
            </div>
            <div className="exp-pillar-item">
              <div className="exp-pillar-icon"><Shield size={22} /></div>
              <h4>Total Protection</h4>
              <p>Comprehensive zero-deductible coverage options with instant claim settlement.</p>
            </div>
            <div className="exp-pillar-item">
              <div className="exp-pillar-icon"><HeartHandshake size={22} /></div>
              <h4>White-Glove Service</h4>
              <p>Luggage transfer, airport gate meeting, and 24/7 dedicated concierge assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <CarentFooter />
    </div>
  );
}
