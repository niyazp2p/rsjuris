import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/'Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RS Juris & Co. | Law Firm",
  description: "Trusted Legal Counsel. Strategic Representation. Results-Driven Approach. Your Rights | Our Priority.",
  keywords: ["Law Firm", "Legal Counsel", "Corporate Law", "Litigation", "RS Juris & Co."],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-brand-cream text-brand-charcoal selection:bg-brand-gold selection:text-white">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}