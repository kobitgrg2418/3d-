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
          background: var(--white);
          color: var(--black);
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
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
        }

        .carent-nav-links a:hover {
          color: var(--black);
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
          font-size: var(--fs-caption);
          color: var(--grey-600);
          margin-bottom: 30px;
        }

        .carent-breadcrumbs a {
          color: var(--grey-600);
          text-decoration: none;
        }

        .carent-breadcrumbs a:hover {
          color: var(--black);
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
          background: var(--grey-100);
          border: 1px solid var(--grey-300);
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
          background: var(--black);
          color: var(--white);
          padding: 6px 14px;
          border-radius: 999px;
          font-size: var(--fs-caption);
          font-weight:600;
          letter-spacing: 0.05em;
          
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
          font-size: var(--fs-h1);
          font-weight:600;
          letter-spacing: -0.035em;
          color: var(--black);
          margin: 0;
        }

        .carent-body-pill {
          background: var(--grey-100);
          border: 1px solid var(--grey-300);
          color: var(--grey-600);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: var(--fs-caption);
          font-weight:600;
        }

        .carent-price-banner {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin: 16px 0 24px;
          padding: 20px 24px;
          background: var(--grey-100);
          border: 1px solid var(--grey-300);
          border-radius: 16px;
        }

        .carent-price-number {
          font-size: var(--fs-h2);
          font-weight:600;
          color: var(--black);
          letter-spacing: -0.03em;
        }

        .carent-price-term {
          font-size: var(--fs-caption);
          color: var(--grey-600);
        }

        .carent-car-overview {
          font-size: var(--fs-body);
          color: var(--grey-600);
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
          background: var(--white);
          border: 1px solid var(--grey-300);
          padding: 16px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .carent-spec-title {
          font-size: var(--fs-caption);
          
          color: var(--grey-600);
          font-weight:600;
        }

        .carent-spec-value {
          font-size: var(--fs-body);
          font-weight:600;
          color: var(--black);
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
          background: var(--black);
          color: var(--white);
          padding: 16px 28px;
          border-radius: 999px;
          font-size: var(--fs-body);
          font-weight:600;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }

        .carent-primary-cta:hover {
          background: var(--black-surface);
          transform: translateY(-1px);
        }

        /* Features Section */
        .carent-features-section {
          border-top: 1px solid var(--grey-300);
          padding: 60px 0;
        }

        .carent-section-title {
          font-size: var(--fs-h3);
          font-weight:600;
          letter-spacing: -0.02em;
          color: var(--black);
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
          background: var(--grey-100);
          border: 1px solid var(--grey-300);
          border-radius: 14px;
          font-size: var(--fs-body);
          font-weight:600;
          color: var(--black-surface);
        }

        .carent-check-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--black);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--fs-caption);
        }

        /* Policy Accordion / Cards */
        .carent-policies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }

        .carent-policy-card {
          border: 1px solid var(--grey-300);
          border-radius: 18px;
          padding: 24px;
          background: var(--white);
        }

        .carent-policy-card h4 {
          margin: 0 0 10px 0;
          font-size: var(--fs-body);
          font-weight:600;
          color: var(--black);
        }

        .carent-policy-card p {
          margin: 0;
          font-size: var(--fs-caption);
          color: var(--grey-600);
          line-height: 1.5;
        }

        /* Similar Cars */
        .carent-related-section {
          border-top: 1px solid var(--grey-300);
          padding: 60px 0 0;
        }

        .carent-related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 28px;
        }
      `}</style>

      {/* Main Body */}
      <main className="carent-container">
        {/* Breadcrumbs */}
        <div className="carent-breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/fleet">Cars</Link>
          <span>/</span>
          <span style={{ color: "var(--black)", fontWeight: 600 }}>{car.name}</span>
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
                    border: "1px solid var(--grey-300)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "var(--white)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ height: "180px", background: "var(--grey-100)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", overflow: "hidden" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "18px" }}>
                    <div style={{ fontSize: "var(--fs-body)", fontWeight: 600, marginBottom: "4px" }}>{item.name}</div>
                    <div style={{ fontSize: "var(--fs-caption)", color: "var(--grey-600)", marginBottom: "12px" }}>{item.year} · {item.body} · {item.gear}</div>
                    <div style={{ fontSize: "var(--fs-body)", fontWeight: 600, color: "var(--black)" }}>{fmt(item.price)} <span style={{ fontSize: "var(--fs-caption)", color: "var(--grey-600)", fontWeight: 400 }}>/ day</span></div>
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
