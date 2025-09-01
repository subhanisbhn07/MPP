

'use client';

import { getPhonesFromSlug } from "@/lib/utils";
import { CompareClient } from "../components/compare-client";
import { useParams } from "next/navigation";
import { useEffect, useState, use } from "react";
import type { Phone } from "@/lib/types";

// This is the server-rendered page for a shared comparison URL.
// It fetches the initial phones from the slug on the server.
export default function CompareSlugPage() {
  const params = use(useParams());
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [initialPhones, setInitialPhones] = useState<Phone[]>([]);

  useEffect(() => {
    if (slug) {
        const phones = getPhonesFromSlug(decodeURIComponent(slug));
        setInitialPhones(phones);
    }
  }, [slug]);

  // The CompareClient component receives the server-fetched initial phones.
  return <CompareClient initialPhones={initialPhones} />;
}
