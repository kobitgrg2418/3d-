"use client";

import Logo from "./Logo";
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
          background: var(--black-surface);
          border-top: 1px solid color-mix(in srgb, var(--white) 8%, transparent);
          color: var(--grey-100);
          font-family: var(--font-sans);
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
          font-size: var(--fs-h3);
          font-weight:600;
          letter-spacing: -0.03em;
          color: var(--white);
          margin: 0 0 10px 0;
        }

        .cf-vip-desc {
          color: color-mix(in srgb, var(--white) 65%, transparent);
          font-size: var(--fs-body);
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
          background: color-mix(in srgb, var(--white) 6%, transparent);
          border: 1px solid color-mix(in srgb, var(--white) 12%, transparent);
          border-radius: 999px;
          padding: 13px 22px;
          font-size: var(--fs-caption);
          color: var(--white);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .cf-input::placeholder {
          color: color-mix(in srgb, var(--white) 35%, transparent);
        }

        .cf-input:focus {
          border-color: color-mix(in srgb, var(--white) 50%, transparent);
          background: color-mix(in srgb, var(--white) 10%, transparent);
        }

        .cf-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--white);
          color: var(--black);
          border: none;
          padding: 13px 24px;
          border-radius: 999px;
          font-size: var(--fs-caption);
          font-weight:600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
        }

        .cf-btn:hover {
          background: var(--grey-300);
          transform: translateY(-1px);
        }

        .cf-note {
          font-size: var(--fs-caption);
          color: color-mix(in srgb, var(--white) 40%, transparent);
          margin: 0;
        }

        /* Col 2 & 3: Links & Info */
        .cf-col-title {
          font-size: var(--fs-body);
          font-weight:600;
          color: var(--white);
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
          color: color-mix(in srgb, var(--white) 65%, transparent);
          text-decoration: none;
          font-size: var(--fs-body);
          transition: color 0.2s;
        }

        .cf-links-list a:hover {
          color: var(--white);
        }

        .cf-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: color-mix(in srgb, var(--white) 65%, transparent);
          font-size: var(--fs-body);
          line-height: 1.5;
          text-decoration: none;
          transition: color 0.2s;
        }

        .cf-contact-item:hover {
          color: var(--white);
        }

        .cf-icon-chip {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: color-mix(in srgb, var(--white) 7%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: color-mix(in srgb, var(--white) 80%, transparent);
          flex-shrink: 0;
        }

        /* Bottom Row */
        .cf-bottom-row {
          border-top: 1px solid color-mix(in srgb, var(--white) 8%, transparent);
          padding-top: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .cf-brand-name {
          font-size: var(--fs-body);
          font-weight:600;
          letter-spacing: -0.02em;
          color: var(--white);
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
          background: color-mix(in srgb, var(--white) 6%, transparent);
          border: 1px solid color-mix(in srgb, var(--white) 10%, transparent);
          color: color-mix(in srgb, var(--white) 80%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s, color 0.2s;
        }

        .cf-social-link:hover {
          background: color-mix(in srgb, var(--white) 15%, transparent);
          color: var(--white);
          transform: translateY(-2px);
        }

        .cf-copyright {
          font-size: var(--fs-caption);
          color: color-mix(in srgb, var(--white) 45%, transparent);
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
          font-size: var(--fs-hero);
          font-weight:600;
          letter-spacing: -0.05em;
          line-height: 0.85;
          
          color: transparent;
          -webkit-text-stroke: 1.5px color-mix(in srgb, var(--white) 12%, transparent);
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--orange)", fontSize: "var(--fs-caption)", fontWeight: 600, padding: "10px 0" }}>
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
            <Link href="/" className="cf-brand-name" aria-label="30Rentals home"><Logo height={36} tone="paper" /></Link>
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
