import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import PublicShell from "./components/layout/PublicShell";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const BASE_URL = "https://rsjuris.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "RS Juris & Co. | Law Firm & Legal Counsel",
    template: "%s | RS Juris & Co.",
  },
  description:
    "Trusted Legal Counsel & Strategic Representation across Corporate, Civil, Commercial Litigation, and Arbitration matters.",
  keywords: [
    "RS Juris",
    "Law Firm Delhi",
    "Corporate Lawyer Delhi",
    "Commercial Litigation Counsel",
    "Arbitration Advocate",
    "High Court Advocate Delhi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RS Juris & Co. | Law Firm & Strategic Legal Counsel",
    description:
      "Full-service legal counsel providing representation in corporate law, commercial disputes, and appellate litigation.",
    url: BASE_URL,
    siteName: "RS Juris & Co.",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.jpeg", // Place an 1200x630px image in your /public folder
        width: 1200,
        height: 630,
        alt: "RS Juris & Co. Legal Chambers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RS Juris & Co. | Law Firm",
    description:
      "Strategic Legal Counsel & Appellate Representation across Corporate, Commercial, and Civil Disputes.",
    images: ["/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "RS Juris & Co.",
    alternateName: "RS Juris Law Offices",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.jpeg`,
    image: `${BASE_URL}/logo.jpeg`,
    description:
      "Premier legal consultancy offering statutory advisory, corporate compliance, and high-stakes litigation representation.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mohali",
      addressRegion: "Mohali",
      addressCountry: "IN",
    },
    areaServed: [
      "Delhi NCR",
      "High Court of Delhi",
      "Supreme Court of India",
      "National Company Law Tribunal (NCLT)",
    ],
    knowsAbout: [
      "Corporate & Commercial Law",
      "Civil Litigation & Dispute Resolution",
      "Arbitration & Conciliation",
      "Intellectual Property Rights",
      "Insolvency and Bankruptcy Code (IBC)",
    ],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#FAF7F0] text-[#001C41]">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}