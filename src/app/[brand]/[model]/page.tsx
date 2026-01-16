import { allPhones } from "@/lib/data";
import type { Phone } from "@/lib/types";
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

  const phone = allPhones.find(
    (p) =>
      p.brand.toLowerCase() === decodeURIComponent(brand).toLowerCase() &&
      p.model.toLowerCase().replace(/ /g, "-") === decodeURIComponent(model).toLowerCase()
  );

  if (!phone) {
    notFound();
  }

  return <PhoneDetailsClient phone={phone} />;
}
