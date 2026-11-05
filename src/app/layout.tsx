import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import "../components/site/site.css";
import SiteNavbar from "@/components/site/SiteNavbar";

export const metadata: Metadata = {
  title: "30Rentals | Luxury Car Rental in Pokhara",
  description: "Luxury cars. Exceptional journeys. Premium car rental service in Pokhara, Nepal.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    title: "30Rentals | Luxury Car Rental in Pokhara",
    description: "Luxury cars. Exceptional journeys. Premium car rental service in Pokhara, Nepal.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}
