
'use client';

import { getPhonesFromSlug } from "@/lib/utils";
import { CompareClient } from "../components/compare-client";

export default function CompareSlugPage({ params }: { params: { slug: string } }) {
  const initialPhones = getPhonesFromSlug(decodeURIComponent(params.slug));

  return <CompareClient initialPhones={initialPhones} />;
}
