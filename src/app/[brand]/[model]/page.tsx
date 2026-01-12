import { allPhones } from "@/lib/data";
import { fetchPhoneByBrandAndModel } from "@/lib/supabase";
import { PhoneDetailsClient } from "./components/phone-details-client";
import { notFound } from "next/navigation";

interface PhoneDetailsPageProps {
  params: Promise<{
    brand: string;
    model: string;
  }>;
}

// This is now a Server Component
export default async function PhoneDetailsPage({ params }: PhoneDetailsPageProps) {
  const { brand, model } = await params;

  if (!brand || !model) {
    notFound();
  }

  // First try to fetch from Supabase
  const supabasePhone = await fetchPhoneByBrandAndModel(
    decodeURIComponent(brand),
    decodeURIComponent(model)
  );

  if (supabasePhone) {
    return <PhoneDetailsClient phone={supabasePhone} />;
  }

  // Fallback to static data if not found in Supabase
  const staticPhone = allPhones.find(
    (p) =>
      p.brand.toLowerCase() === decodeURIComponent(brand).toLowerCase() &&
      p.model.toLowerCase().replace(/ /g, "-") === decodeURIComponent(model).toLowerCase()
  );

  if (!staticPhone) {
    notFound();
  }

  return <PhoneDetailsClient phone={staticPhone} />;
}
