import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Phone } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCompareUrl(phones: Phone[]): string {
  if (phones.length === 0) return '/compare';
  const slug = phones.map(p => p.model.toLowerCase().replace(/ /g, '-')).join('-vs-');
  return `/compare/${slug}`;
}

export function getPhonesFromSlug(slug: string): Phone[] {
    // This is a simplified version. In a real app, you would have a more robust lookup.
    // This is also not very efficient, but for the sake of demonstration:
    const { allPhones } = require('@/lib/data');
    const phoneSlugs = slug.split('-vs-');
    return phoneSlugs.map(phoneSlug => 
        allPhones.find((p: Phone) => p.model.toLowerCase().replace(/ /g, '-') === phoneSlug)
    ).filter(Boolean) as Phone[];
}
