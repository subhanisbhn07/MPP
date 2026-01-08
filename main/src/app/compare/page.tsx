
'use client';

import { CompareClient } from "./components/compare-client";
import { useCompare } from "@/contexts/compare-context";

// This is the default/empty compare page.
// It will display the phones currently in the comparison context.
export default function ComparePage() {
    const { compareList } = useCompare();
    return <CompareClient initialPhones={compareList} />;
}
