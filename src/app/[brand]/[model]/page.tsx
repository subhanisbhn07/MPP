import { allPhones } from "@/lib/data";
import type { Phone } from "@/lib/types";
import { PhoneDetailsClient } from "./components/phone-details-client";
import { notFound } from "next/navigation";

interface PhoneDetailsPageProps {
  params: {
    brand: string;
    model: string;
  };
}

// This is now a Server Component
export default function PhoneDetailsPage({ params }: PhoneDetailsPageProps) {
  const { brand, model } = params;

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
