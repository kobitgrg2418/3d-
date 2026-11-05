import type { CSSProperties } from "react";

/** Intrinsic size of public/brand/logo*.png (cropped artwork). */
const RATIO = 720 / 291;

type LogoProps = {
  /** Rendered height in px; width follows the artwork's aspect ratio. */
  height?: number;
  /** "ink" = dark artwork for light backgrounds, "paper" = white artwork for dark backgrounds. */
  tone?: "ink" | "paper";
  className?: string;
  style?: CSSProperties;
};

/**
 * 30Rentals logo. Both artworks are always rendered so a parent can swap them in CSS
 * (e.g. the home navbar, which sits over imagery first and on white after scrolling);
 * `.logo-ink` / `.logo-paper` visibility is controlled in globals.css.
 * Clear space: keep at least 16px free on every side.
 */
export default function Logo({ height = 36, tone = "ink", className = "", style }: LogoProps) {
  const size = { height, width: Math.round(height * RATIO) };
  return (
    <span
      className={`logo ${className}`.trim()}
      data-tone={tone}
      role="img"
      aria-label="30Rentals"
      style={{ display: "inline-block", lineHeight: 0, ...size, ...style }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-ink" src="/brand/logo.png" alt="" {...size} draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-paper" src="/brand/logo-white.png" alt="" {...size} draggable={false} />
    </span>
  );
}
