
'use client';

import { getPhonesFromSlug } from "@/lib/utils";
import { CompareClient } from "../components/compare-client";
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Phone } from "@/lib/types";

export default function CompareSlugPage() {
  const params = useParams();
  const [initialPhones, setInitialPhones] = useState<Phone[]>([]);

  useEffect(() => {
    if (params.slug) {
        const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
        setInitialPhones(getPhonesFromSlug(decodeURIComponent(slug)));
    }
  }, [params.slug]);

  return <CompareClient initialPhones={initialPhones} />;
}
