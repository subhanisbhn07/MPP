import { getPhonesFromSlug } from "@/lib/utils";
import { CompareClient } from "../components/compare-client";
import type { Phone } from "@/lib/types";

interface CompareSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// This is the server-rendered page for a shared comparison URL.
// It fetches the initial phones from the slug on the server.
export default async function CompareSlugPage({ params }: CompareSlugPageProps) {
  const { slug } = await params;
  let initialPhones: Phone[] = [];

  if (slug) {
    initialPhones = getPhonesFromSlug(decodeURIComponent(slug));
  }

  // The CompareClient component receives the server-fetched initial phones.
  return <CompareClient initialPhones={initialPhones} />;
}
