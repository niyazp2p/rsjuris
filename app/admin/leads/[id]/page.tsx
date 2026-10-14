import React from "react";
import LeadDetailClient from "./LeadDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Required for Next.js static export
export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <LeadDetailClient leadId={id} />;
}