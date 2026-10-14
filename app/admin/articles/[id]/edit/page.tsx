import React from "react";
import EditArticleClient from "./EditArticleClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Required for Next.js static export: generates the static shell during build
export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  return <EditArticleClient articleId={id} />;
}