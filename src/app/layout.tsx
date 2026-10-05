import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rene & Arthur — 12.12.26",
  description:
    "Join Rene and Arthur on 12 December 2026. Schedule, venues, attire, and RSVP.",
  icons: { icon: "/images/monogram.webp" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
