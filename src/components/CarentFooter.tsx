"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Check } from "lucide-react";

export default function CarentFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <footer className="cf-root">
      <style>{`
        .cf-root {
          background: #090a0c;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          color: #f3f4f6;
          font-family: var(--rfont, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          position: relative;
          overflow: hidden;
        }

        .cf-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 90px clamp(20px, 4vw, 80px) 40px;
          position: relative;
          z-index: 2;
        }

        /* Top Grid */
        .cf-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr;
          gap: clamp(32px, 5vw, 80px);
          margin-bottom: 70px;
        }

        @media (max-width: 900px) {
          .cf-top-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* Col 1: VIP Priority Booking */
        .cf-vip-col {
          display: flex;
          flex-direction: column;
        }

        .cf-vip-title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 10px 0;
        }

        .cf-vip-desc {
          color: rgba(255, 255, 255, 0.65);
          font-size: 14.5px;
          line-height: 1.55;
          margin: 0 0 24px 0;
          max-width: 440px;
        }

        .cf-form {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          max-width: 450px;
        }

        .cf-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          padding: 13px 22px;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .cf-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .cf-input:focus {
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.1);
        }

        .cf-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          color: #000000;
          border: none;
          padding: 13px 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
        }

        .cf-btn:hover {
          background: #e5e5e5;
          transform: translateY(-1px);
        }

        .cf-note {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }

        /* Col 2 & 3: Links & Info */
        .cf-col-title {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 22px 0;
          letter-spacing: -0.01em;
        }

        .cf-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cf-links-list a {
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          font-size: 14.5px;
          transition: color 0.2s;
        }

        .cf-links-list a:hover {
          color: #ffffff;
        }

        .cf-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.65);
          font-size: 14.5px;
          line-height: 1.5;
          text-decoration: none;
          transition: color 0.2s;
        }

        .cf-contact-item:hover {
          color: #ffffff;
        }

        .cf-icon-chip {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.8);
          flex-shrink: 0;
        }

        /* Bottom Row */
        .cf-bottom-row {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .cf-brand-name {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-decoration: none;
        }

        .cf-socials {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cf-social-link {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s, color 0.2s;
        }

        .cf-social-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .cf-copyright {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.45);
        }

        /* BIG CARENT WATERMARK (30RENTALS) */
        .cf-huge-watermark {
          margin-top: 60px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          user-select: none;
          overflow: hidden;
        }

        .cf-huge-text {
          font-size: clamp(80px, 14vw, 210px);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.85;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.12);
          text-align: center;
          white-space: nowrap;
        }
      `}</style>

      <div className="cf-container">
        {/* Top 3-Col Grid */}
        <div className="cf-top-grid">
          {/* Priority Booking */}
          <div className="cf-vip-col">
            <h3 className="cf-vip-title">Get priority booking</h3>
            <p className="cf-vip-desc">
              Exclusive offers, early access to new exotic arrivals, and dedicated concierge dispatch.
            </p>
            {submitted ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4ade80", fontSize: "14px", fontWeight: "600", padding: "10px 0" }}>
                <Check size={18} /> Thank you! We will reach out within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cf-form">
                <input
                  type="email"
                  className="cf-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="cf-btn">
                  Join VIP
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
            <p className="cf-note">We will contact you within 24 hours for availability details.</p>
          </div>

          {/* Quick Pages */}
          <div>
            <h4 className="cf-col-title">Pages</h4>
            <ul className="cf-links-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/fleet">Fleet</Link></li>
              <li><Link href="/how-it-works">How it works</Link></li>
              <li><Link href="/experience">Experience</Link></li>
              <li><Link href="/owners">Owners</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="cf-col-title">Contact info</h4>
            <ul className="cf-links-list">
              <li>
                <a href="tel:+9779800000000" className="cf-contact-item">
                  <div className="cf-icon-chip">
                    <Phone size={15} />
                  </div>
                  <span>+977 (0)1 445-5667</span>
                </a>
              </li>
              <li>
                <a href="mailto:concierge@30rentals.com" className="cf-contact-item">
                  <div className="cf-icon-chip">
                    <Mail size={15} />
                  </div>
                  <span>concierge@30rentals.com</span>
                </a>
              </li>
              <li>
                <div className="cf-contact-item">
                  <div className="cf-icon-chip">
                    <MapPin size={15} />
                  </div>
                  <span>Lakeside-6, Pokhara / Thamel, Kathmandu</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="cf-bottom-row">
          <div>
            <Link href="/" className="cf-brand-name">30Rentals</Link>
          </div>

          <div className="cf-copyright">
            © {new Date().getFullYear()} 30Rentals. All rights reserved.
          </div>

          <div className="cf-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="cf-social-link" aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="cf-social-link" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="cf-social-link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Massive Watermark 30RENTALS brand text (Same as CARENT) */}
        <div className="cf-huge-watermark">
          <span className="cf-huge-text">30RENTALS</span>
        </div>
      </div>
    </footer>
  );
}
