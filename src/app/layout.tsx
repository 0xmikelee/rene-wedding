import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const neueHaas = localFont({
  src: "../../public/fonts/NeueHaasDisplayRoman.ttf",
  variable: "--font-neue-haas",
  weight: "400",
  display: "swap",
});

const rhymes = localFont({
  src: "../../public/fonts/RhymesTextRegular.ttf",
  variable: "--font-rhymes",
  weight: "400",
  display: "swap",
});

const rhymesDisplay = localFont({
  src: "../../public/fonts/RhymesDisplayTrial-Regular.otf",
  variable: "--font-rhymes-display-face",
  weight: "400",
  display: "swap",
});

const instrumentSerif = localFont({
  src: "../../public/fonts/InstrumentSerif-Italic.ttf",
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rene & Arthur — 12.12.26",
  description:
    "Join Rene and Arthur on 12 December 2026. Schedule, venues, attire, and RSVP.",
  icons: {
    icon: { url: "/images/monogram.ico", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${neueHaas.variable} ${rhymes.variable} ${rhymesDisplay.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
