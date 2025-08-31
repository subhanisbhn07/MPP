
'use client';

import { allPhones } from "@/lib/data"
import { CompareClient } from "./components/compare-client";

// This is the default/empty compare page
export default function ComparePage() {
    const defaultPhones = allPhones.slice(0,2);
    return <CompareClient initialPhones={defaultPhones} />;
}
