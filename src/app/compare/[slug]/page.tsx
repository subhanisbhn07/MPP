
import { getPhonesFromSlug } from "@/lib/utils";
import { CompareClient } from "../components/compare-client";

// This is the server-rendered page for a shared comparison URL.
// It fetches the initial phones from the slug on the server.
export default function CompareSlugPage({ params }: { params: { slug: string } }) {
  const initialPhones = getPhonesFromSlug(params.slug ? decodeURIComponent(params.slug) : '');

  // The CompareClient component receives the server-fetched initial phones.
  return <CompareClient initialPhones={initialPhones} />;
}
