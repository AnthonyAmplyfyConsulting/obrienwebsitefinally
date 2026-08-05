import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "O'Brien Flooring | Hardwood Floor Specialists — Easthampton, MA",
  description:
    "Over 20 years of hardwood flooring expertise in Easthampton & Pioneer Valley. Sanding, refinishing, repair, and installation. Call (413) 538-8830.",
  keywords: [
    "hardwood flooring",
    "floor refinishing",
    "floor sanding",
    "hardwood installation",
    "Easthampton MA flooring",
    "Pioneer Valley flooring contractor",
    "O'Brien Flooring",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jost.variable}>
      <body>{children}</body>
    </html>
  );
}
