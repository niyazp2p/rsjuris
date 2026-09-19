import type { Metadata } from "next";
import ContactSection from "../components/sections/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Chambers | RS Juris & Co. Advocates & Legal Consultants",
  description:
    "Speak with our legal team. Confidential intake for civil litigation, corporate advisory, criminal defense, arbitration, and appellate representation.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      <ContactSection />
    </main>
  );
}