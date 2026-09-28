import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import PublicShell from "./components/layout/PublicShell";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RS Juris & Co. | Law Firm",
  description: "Trusted Legal Counsel. Strategic Representation. Results-Driven Approach.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#FAF7F0] text-[#001C41]">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}