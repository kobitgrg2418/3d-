import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FLEET, Car } from "@/data/fleet";
import CarentFooter from "@/components/CarentFooter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FLEET.map((car) => ({
    slug: car.slug,
  }));
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = FLEET.find((c) => c.slug === slug);

  if (!car) {
    notFound();
  }

  const fmt = (n: number) => `NPR ${n.toLocaleString("en-IN")}`;
  const otherCars = FLEET.filter((c) => c.id !== car.id).slice(0, 3);

  return (
    <div className="carent-detail-page">
      <style>{`
        .carent-detail-page {
          min-height: 100vh;
          background: #ffffff;
          color: #0b0f19;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* Nav */
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
        }

        .carent-nav-links a:hover {
          color: #0b0f19;
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

        /* Detail Container */
        .carent-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 40px clamp(20px, 4vw, 80px) 100px;
        }

        .carent-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #868c98;
          margin-bottom: 30px;
        }

        .carent-breadcrumbs a {
          color: #868c98;
          text-decoration: none;
        }

        .carent-breadcrumbs a:hover {
          color: #0b0f19;
        }

        /* Top Grid */
        .carent-showcase-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 48px;
          align-items: start;
          margin-bottom: 70px;
        }

        @media (max-width: 960px) {
          .carent-showcase-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Showcase Left Image Stage */
        .carent-stage {
          background: radial-gradient(circle at center, #f8f9fb 0%, #ebedf2 100%);
          border: 1px solid #e5e7eb;
          border-radius: 32px;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          position: relative;
          overflow: hidden;
        }

        .carent-stage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .carent-stage:hover img {
          transform: scale(1.03);
        }

        .carent-tag-chip {
          position: absolute;
          top: 24px;
          left: 24px;
          background: #0b0f19;
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Showcase Right Info Box */
        .carent-info-col {
          display: flex;
          flex-direction: column;
        }

        .carent-car-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .carent-car-name {
          font-size: clamp(30px, 3.4vw, 44px);
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #0b0f19;
          margin: 0;
        }

        .carent-body-pill {
          background: #f4f5f7;
          border: 1px solid #e5e7eb;
          color: #525866;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .carent-price-banner {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin: 16px 0 24px;
          padding: 20px 24px;
          background: #f8f9fa;
          border: 1px solid #f0f2f5;
          border-radius: 16px;
        }

        .carent-price-number {
          font-size: 32px;
          font-weight: 800;
          color: #0b0f19;
          letter-spacing: -0.03em;
        }

        .carent-price-term {
          font-size: 14px;
          color: #667085;
        }

        .carent-car-overview {
          font-size: 15px;
          color: #525866;
          line-height: 1.65;
          margin-bottom: 28px;
        }

        /* Quick Specs Matrix */
        .carent-quick-specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .carent-spec-box {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          padding: 16px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .carent-spec-title {
          font-size: 12px;
          text-transform: uppercase;
          color: #868c98;
          font-weight: 600;
        }

        .carent-spec-value {
          font-size: 16px;
          font-weight: 700;
          color: #0b0f19;
        }

        /* Booking Button */
        .carent-action-row {
          display: flex;
          gap: 14px;
        }

        .carent-primary-cta {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0b0f19;
          color: #ffffff;
          padding: 16px 28px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }

        .carent-primary-cta:hover {
          background: #232733;
          transform: translateY(-1px);
        }

        /* Features Section */
        .carent-features-section {
          border-top: 1px solid #f0f2f5;
          padding: 60px 0;
        }

        .carent-section-title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0b0f19;
          margin-bottom: 28px;
        }

        .carent-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .carent-feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: #f9fafb;
          border: 1px solid #f0f2f5;
          border-radius: 14px;
          font-size: 14.5px;
          font-weight: 600;
          color: #1f2937;
        }

        .carent-check-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0b0f19;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
        }

        /* Policy Accordion / Cards */
        .carent-policies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }

        .carent-policy-card {
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 24px;
          background: #ffffff;
        }

        .carent-policy-card h4 {
          margin: 0 0 10px 0;
          font-size: 16px;
          font-weight: 700;
          color: #0b0f19;
        }

        .carent-policy-card p {
          margin: 0;
          font-size: 14px;
          color: #667085;
          line-height: 1.5;
        }

        /* Similar Cars */
        .carent-related-section {
          border-top: 1px solid #f0f2f5;
          padding: 60px 0 0;
        }

        .carent-related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 28px;
        }
      `}</style>

      {/* Nav */}
      <nav className="carent-nav">
        <Link href="/" className="carent-brand">30Rentals</Link>
        <div className="carent-nav-links">
          <Link href="/">Home</Link>
          <Link href="/fleet" style={{ color: "#0b0f19", fontWeight: 600 }}>Fleet</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/owners">Owners</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <Link href="/#booking" className="carent-nav-action">Book now</Link>
      </nav>

      {/* Main Body */}
      <main className="carent-container">
        {/* Breadcrumbs */}
        <div className="carent-breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/fleet">Cars</Link>
          <span>/</span>
          <span style={{ color: "#0b0f19", fontWeight: 600 }}>{car.name}</span>
        </div>

        {/* Hero Showcase Grid */}
        <div className="carent-showcase-grid">
          {/* Left Stage */}
          <div className="carent-stage">
            <img src={car.image} alt={car.name} />
            {car.tag && <span className="carent-tag-chip">{car.tag}</span>}
          </div>

          {/* Right Info */}
          <div className="carent-info-col">
            <div className="carent-car-header-row">
              <h1 className="carent-car-name">{car.name}</h1>
              <span className="carent-body-pill">{car.year} · {car.body}</span>
            </div>

            <div className="carent-price-banner">
              <span className="carent-price-number">{fmt(car.price)}</span>
              <span className="carent-price-term">/ day (all taxes included)</span>
            </div>

            <p className="carent-car-overview">
              {car.overview || car.description}
            </p>

            {/* Quick Specs */}
            <div className="carent-quick-specs">
              <div className="carent-spec-box">
                <span className="carent-spec-title">0-100 KM/H</span>
                <span className="carent-spec-value">{car.acceleration || "3.5s"}</span>
              </div>
              <div className="carent-spec-box">
                <span className="carent-spec-title">Top Speed</span>
                <span className="carent-spec-value">{car.topSpeed || "300 km/h"}</span>
              </div>
              <div className="carent-spec-box">
                <span className="carent-spec-title">Horsepower</span>
                <span className="carent-spec-value">{car.power || "500+ HP"}</span>
              </div>
              <div className="carent-spec-box">
                <span className="carent-spec-title">Transmission</span>
                <span className="carent-spec-value">{car.gear}</span>
              </div>
              <div className="carent-spec-box">
                <span className="carent-spec-title">Fuel Type</span>
                <span className="carent-spec-value">{car.fuel}</span>
              </div>
              <div className="carent-spec-box">
                <span className="carent-spec-title">Seating</span>
                <span className="carent-spec-value">{car.seats} Passengers</span>
              </div>
            </div>

            <div className="carent-action-row">
              <Link href="/#booking" className="carent-primary-cta">
                Reserve This Car
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        {car.features && car.features.length > 0 && (
          <section className="carent-features-section">
            <h2 className="carent-section-title">Vehicle Features & Highlights</h2>
            <div className="carent-features-grid">
              {car.features.map((feature, idx) => (
                <div key={idx} className="carent-feature-item">
                  <div className="carent-check-icon">✓</div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Rental Policies */}
        <section className="carent-features-section">
          <h2 className="carent-section-title">Terms & Rental Requirements</h2>
          <div className="carent-policies-grid">
            <div className="carent-policy-card">
              <h4>Insurance and Coverage</h4>
              <p>Comprehensive standard coverage with collision damage waiver included with optional zero-deductible add-on.</p>
            </div>
            <div className="carent-policy-card">
              <h4>Rental Requirements</h4>
              <p>Valid driver's license (held for min. 2 years), national ID/passport, and refundable security deposit required at pickup.</p>
            </div>
            <div className="carent-policy-card">
              <h4>Cancellation Policy</h4>
              <p>Free cancellation up to 48 hours prior to reservation pickup. Instant deposit return with no hidden penalties.</p>
            </div>
          </div>
        </section>

        {/* Related Vehicles */}
        {otherCars.length > 0 && (
          <section className="carent-related-section">
            <h2 className="carent-section-title">You May Also Like</h2>
            <div className="carent-related-grid">
              {otherCars.map((item) => (
                <Link
                  key={item.id}
                  href={`/fleet/${item.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    border: "1px solid #eaecf0",
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ height: "180px", background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", overflow: "hidden" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "18px" }}>
                    <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "4px" }}>{item.name}</div>
                    <div style={{ fontSize: "13px", color: "#667085", marginBottom: "12px" }}>{item.year} · {item.body} · {item.gear}</div>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#0b0f19" }}>{fmt(item.price)} <span style={{ fontSize: "12px", color: "#868c98", fontWeight: "normal" }}>/ day</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <CarentFooter />
    </div>
  );
}
