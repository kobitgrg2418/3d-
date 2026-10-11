import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "30Rental | Luxury Car Rental in Pokhara",
  description: "Luxury cars. Exceptional journeys. Premium car rental service in Pokhara, Nepal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
