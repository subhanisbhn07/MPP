import type { Phone } from './types';

export interface PhoneRating {
  overall: number;
  hardware: number;
  software: number;
  value: number;
  ecosystem: number;
  longevity: number;
  freshness: number;
  marketPosition: number;
}

// Rating weights based on MPP's 7-factor system
const WEIGHTS = {
  hardware: 0.30,      // 30% - Hardware quality
  software: 0.15,      // 15% - Software experience
  value: 0.15,         // 15% - Value for money
  ecosystem: 0.10,     // 10% - Ecosystem integration
  longevity: 0.10,     // 10% - Expected longevity
  freshness: 0.10,     // 10% - How recent the phone is
  marketPosition: 0.10 // 10% - Market positioning
};

// Color-coded rating badges based on score
export function getRatingColor(score: number): string {
  if (score >= 90) return '#22c55e'; // Green - Excellent
  if (score >= 80) return '#84cc16'; // Light Green - Very Good
  if (score >= 70) return '#f59e0b'; // Amber - Good
  if (score >= 60) return '#f97316'; // Orange - Average
  return '#ef4444'; // Red - Below Average
}

export function getRatingLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Very Good';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Average';
  return 'Below Average';
}

export function getRatingBadgeClass(score: number): string {
  if (score >= 90) return 'bg-green-500 text-white';
  if (score >= 80) return 'bg-lime-500 text-white';
  if (score >= 70) return 'bg-amber-500 text-white';
  if (score >= 60) return 'bg-orange-500 text-white';
  return 'bg-red-500 text-white';
}

// Calculate hardware score based on specs
function calculateHardwareScore(phone: Phone): number {
  let score = 50; // Base score
  
  // Chipset scoring (with null safety)
  const chipset = (phone.specs?.platform?.chipset || '').toLowerCase();
  if (chipset.includes('snapdragon 8 gen 3') || chipset.includes('a17 pro') || chipset.includes('a18')) {
    score += 25;
  } else if (chipset.includes('snapdragon 8 gen 2') || chipset.includes('a16') || chipset.includes('dimensity 9300')) {
    score += 20;
  } else if (chipset.includes('snapdragon 8 gen 1') || chipset.includes('a15') || chipset.includes('dimensity 9200')) {
    score += 15;
  } else if (chipset.includes('snapdragon 7') || chipset.includes('dimensity 8')) {
    score += 10;
  }
  
  // RAM scoring (with null safety)
  const ram = phone.specs?.memory?.ram_capacities || '';
  if (ram.includes('16') || ram.includes('24')) {
    score += 10;
  } else if (ram.includes('12')) {
    score += 8;
  } else if (ram.includes('8')) {
    score += 5;
  }
  
  // Display scoring (with null safety)
  const refreshRate = parseInt(phone.specs?.display?.refresh_rate_hz || '60') || 60;
  if (refreshRate >= 144) {
    score += 8;
  } else if (refreshRate >= 120) {
    score += 6;
  } else if (refreshRate >= 90) {
    score += 3;
  }
  
  // Battery scoring (with null safety)
  const battery = parseInt(phone.specs?.battery?.capacity_mah || '0') || 0;
  if (battery >= 5500) {
    score += 7;
  } else if (battery >= 5000) {
    score += 5;
  } else if (battery >= 4500) {
    score += 3;
  }
  
  return Math.min(100, score);
}

// Calculate software score
function calculateSoftwareScore(phone: Phone): number {
  let score = 60; // Base score
  
  // OS version scoring (with null safety)
  const os = (phone.specs?.platform?.os || '').toLowerCase();
  if (os.includes('android 15') || os.includes('ios 18')) {
    score += 20;
  } else if (os.includes('android 14') || os.includes('ios 17')) {
    score += 15;
  } else if (os.includes('android 13') || os.includes('ios 16')) {
    score += 10;
  }
  
  // Brand-specific software experience (with null safety)
  const brand = (phone.brand || '').toLowerCase();
  if (brand === 'apple' || brand === 'google') {
    score += 15; // Best software experience
  } else if (brand === 'samsung' || brand === 'oneplus') {
    score += 10;
  } else if (brand === 'xiaomi' || brand === 'oppo' || brand === 'vivo') {
    score += 5;
  }
  
  return Math.min(100, score);
}

// Calculate value score
function calculateValueScore(phone: Phone): number {
  const price = phone.price;
  const hardwareScore = calculateHardwareScore(phone);
  
  // Value = Hardware quality relative to price
  if (price < 300) {
    return hardwareScore >= 60 ? 90 : hardwareScore >= 50 ? 80 : 70;
  } else if (price < 500) {
    return hardwareScore >= 70 ? 85 : hardwareScore >= 60 ? 75 : 65;
  } else if (price < 800) {
    return hardwareScore >= 80 ? 80 : hardwareScore >= 70 ? 70 : 60;
  } else if (price < 1200) {
    return hardwareScore >= 85 ? 75 : hardwareScore >= 75 ? 65 : 55;
  } else {
    return hardwareScore >= 90 ? 70 : hardwareScore >= 80 ? 60 : 50;
  }
}

// Calculate ecosystem score
function calculateEcosystemScore(phone: Phone): number {
  const brand = (phone.brand || '').toLowerCase();
  
  if (brand === 'apple') return 95; // Best ecosystem
  if (brand === 'samsung') return 85;
  if (brand === 'google') return 80;
  if (brand === 'xiaomi') return 70;
  if (brand === 'oneplus' || brand === 'oppo' || brand === 'vivo') return 65;
  return 50;
}

// Calculate longevity score
function calculateLongevityScore(phone: Phone): number {
  let score = 50;
  
  const brand = (phone.brand || '').toLowerCase();
  // Update support duration
  if (brand === 'apple') {
    score += 30; // 5-6 years of updates
  } else if (brand === 'samsung' || brand === 'google') {
    score += 25; // 4-5 years of updates
  } else if (brand === 'oneplus') {
    score += 15; // 3-4 years of updates
  } else {
    score += 5; // 2-3 years of updates
  }
  
  // Build quality (with null safety)
  const materials = (phone.specs?.body?.materials || '').toLowerCase();
  if (materials.includes('titanium')) {
    score += 15;
  } else if (materials.includes('aluminum') || materials.includes('ceramic')) {
    score += 10;
  } else if (materials.includes('glass')) {
    score += 5;
  }
  
  return Math.min(100, score);
}

// Calculate freshness score based on release date
function calculateFreshnessScore(phone: Phone, currentDate?: Date): number {
  const now = currentDate || new Date();
  const announcedDate = phone.specs?.launch?.announced_date;
  if (!announcedDate) return 50; // Default score if no date available
  
  const releaseDate = new Date(announcedDate);
  if (isNaN(releaseDate.getTime())) return 50; // Invalid date
  
  const monthsOld = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  
  if (monthsOld <= 1) return 100;
  if (monthsOld <= 3) return 90;
  if (monthsOld <= 6) return 80;
  if (monthsOld <= 12) return 70;
  if (monthsOld <= 18) return 60;
  if (monthsOld <= 24) return 50;
  return 40;
}

// Calculate market position score
function calculateMarketPositionScore(phone: Phone): number {
  const price = phone.price || 0;
  const brand = (phone.brand || '').toLowerCase();
  
  // Flagship positioning
  if (price >= 1000) {
    if (brand === 'apple' || brand === 'samsung' || brand === 'google') {
      return 90;
    }
    return 75;
  }
  
  // Mid-range positioning
  if (price >= 500) {
    if (brand === 'apple' || brand === 'samsung' || brand === 'google' || brand === 'oneplus') {
      return 85;
    }
    return 70;
  }
  
  // Budget positioning
  if (brand === 'samsung' || brand === 'xiaomi' || brand === 'motorola') {
    return 80;
  }
  return 65;
}

// Main function to calculate overall phone rating
export function calculatePhoneRating(phone: Phone, currentDate?: Date): PhoneRating {
  const hardware = calculateHardwareScore(phone);
  const software = calculateSoftwareScore(phone);
  const value = calculateValueScore(phone);
  const ecosystem = calculateEcosystemScore(phone);
  const longevity = calculateLongevityScore(phone);
  const freshness = calculateFreshnessScore(phone, currentDate);
  const marketPosition = calculateMarketPositionScore(phone);
  
  const overall = Math.round(
    hardware * WEIGHTS.hardware +
    software * WEIGHTS.software +
    value * WEIGHTS.value +
    ecosystem * WEIGHTS.ecosystem +
    longevity * WEIGHTS.longevity +
    freshness * WEIGHTS.freshness +
    marketPosition * WEIGHTS.marketPosition
  );
  
  return {
    overall,
    hardware,
    software,
    value,
    ecosystem,
    longevity,
    freshness,
    marketPosition
  };
}

// Get percentile ranking text
export function getPercentileText(score: number): string {
  if (score >= 90) return 'Top 5% of all phones';
  if (score >= 80) return 'Top 15% of all phones';
  if (score >= 70) return 'Top 30% of all phones';
  if (score >= 60) return 'Top 50% of all phones';
  return 'Below average';
}

// Check if phone is new (released within last 30 days)
export function isNewPhone(phone: Phone, currentDate?: Date): boolean {
  const now = currentDate || new Date();
  const announcedDate = phone.specs?.launch?.announced_date;
  if (!announcedDate) return false;
  
  const releaseDate = new Date(announcedDate);
  if (isNaN(releaseDate.getTime())) return false;
  
  const daysOld = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysOld <= 30;
}

// Check if phone is trending (placeholder - would need view count data)
export function isTrendingPhone(phone: Phone): boolean {
  // This would typically check view counts from database
  // For now, return false as placeholder
  return false;
}

// Check if phone is best value (high rating + low price)
export function isBestValue(phone: Phone): boolean {
  const rating = calculatePhoneRating(phone);
  const price = phone.price || 0;
  
  // Best value: high rating relative to price
  if (price < 400 && rating.overall >= 70) return true;
  if (price < 600 && rating.overall >= 75) return true;
  if (price < 800 && rating.overall >= 80) return true;
  return false;
}
