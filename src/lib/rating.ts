/**
 * MPP Dynamic Phone Rating System
 * 
 * This module calculates dynamic ratings for phones based on:
 * - Hardware specs (processor, camera, display, battery)
 * - Software quality (brand reputation, update policy)
 * - Value score (price-to-specs ratio)
 * - Ecosystem score (brand ecosystem integration)
 * - Longevity score (expected software update years)
 * - Freshness score (time decay based on release date)
 * 
 * Ratings auto-adjust as new phones are added to the database.
 */

import type { Phone, PhoneSpec } from './types';

// Rating weights for each component
const RATING_WEIGHTS = {
  hardware: 0.30,
  software: 0.15,
  value: 0.15,
  ecosystem: 0.10,
  longevity: 0.10,
  userSentiment: 0.10,
  marketPosition: 0.10,
};

// Hardware sub-component weights
const HARDWARE_WEIGHTS = {
  processor: 0.30,
  camera: 0.25,
  display: 0.25,
  battery: 0.20,
};

// Brand ecosystem scores (0-100)
const BRAND_ECOSYSTEM_SCORES: Record<string, number> = {
  'Apple': 95,
  'Samsung': 85,
  'Google': 80,
  'OnePlus': 70,
  'Xiaomi': 65,
  'Oppo': 60,
  'Vivo': 60,
  'Realme': 55,
  'Motorola': 50,
  'Nothing': 55,
  'Sony': 60,
  'Asus': 55,
  'Huawei': 70,
  'Honor': 60,
};

// Expected software update years by brand
const SOFTWARE_UPDATE_YEARS: Record<string, number> = {
  'Apple': 6,
  'Samsung': 4,
  'Google': 7,
  'OnePlus': 3,
  'Xiaomi': 3,
  'Oppo': 3,
  'Vivo': 3,
  'Realme': 2,
  'Motorola': 2,
  'Nothing': 3,
  'Sony': 2,
  'Asus': 2,
  'Huawei': 3,
  'Honor': 3,
};

// Software quality scores by brand (0-100)
const BRAND_SOFTWARE_SCORES: Record<string, number> = {
  'Apple': 95,
  'Google': 95,
  'Samsung': 80,
  'OnePlus': 75,
  'Nothing': 70,
  'Motorola': 70,
  'Sony': 70,
  'Xiaomi': 65,
  'Oppo': 65,
  'Vivo': 65,
  'Realme': 60,
  'Asus': 65,
  'Huawei': 70,
  'Honor': 65,
};

// Price segments
export type PriceSegment = 'budget' | 'mid_range' | 'flagship' | 'ultra_premium' | 'unknown';

export interface PhoneRating {
  overall: number;
  hardware: number;
  software: number;
  value: number;
  ecosystem: number;
  longevity: number;
  freshness: number;
  userSentiment: number;
  marketPosition: number;
  priceSegment: PriceSegment;
  // Sub-scores
  processorScore: number;
  cameraScore: number;
  displayScore: number;
  batteryScore: number;
}

/**
 * Calculate the freshness score based on release date
 * Newer phones get higher scores, older phones decay over time
 */
function calculateFreshnessScore(releaseDate: string | undefined): number {
  if (!releaseDate) {
    return 50; // Default for unknown release date
  }

  const release = new Date(releaseDate);
  const now = new Date();
  const monthsOld = (now.getFullYear() - release.getFullYear()) * 12 + 
                    (now.getMonth() - release.getMonth());

  // Tiered freshness scoring
  if (monthsOld <= 6) return 100;
  if (monthsOld <= 12) return 85;
  if (monthsOld <= 18) return 70;
  if (monthsOld <= 24) return 55;
  
  // Exponential decay for older phones
  return Math.max(40, Math.round(100 * Math.exp(-0.02 * monthsOld)));
}

/**
 * Get price segment based on USD price
 */
function getPriceSegment(price: number | undefined): PriceSegment {
  if (!price || price === 0) return 'unknown';
  if (price < 300) return 'budget';
  if (price < 600) return 'mid_range';
  if (price < 1200) return 'flagship';
  return 'ultra_premium';
}

/**
 * Calculate processor score based on chipset name
 */
function calculateProcessorScore(specs: PhoneSpec): number {
  const chipset = specs.platform?.chipset?.toLowerCase() || '';
  
  // Flagship chipsets (2024-2025)
  if (chipset.includes('snapdragon 8 gen 3') || 
      chipset.includes('a18') ||
      chipset.includes('dimensity 9400')) {
    return 98;
  }
  
  // Previous flagship (2023-2024)
  if (chipset.includes('snapdragon 8 gen 2') || 
      chipset.includes('a17') ||
      chipset.includes('dimensity 9300') ||
      chipset.includes('exynos 2400')) {
    return 92;
  }
  
  // Older flagship (2022-2023)
  if (chipset.includes('snapdragon 8 gen 1') || 
      chipset.includes('snapdragon 8+') ||
      chipset.includes('a16') ||
      chipset.includes('dimensity 9200') ||
      chipset.includes('exynos 2200')) {
    return 85;
  }
  
  // Upper mid-range
  if (chipset.includes('snapdragon 7') ||
      chipset.includes('dimensity 8') ||
      chipset.includes('a15') ||
      chipset.includes('exynos 1') ||
      chipset.includes('tensor')) {
    return 75;
  }
  
  // Mid-range
  if (chipset.includes('snapdragon 6') ||
      chipset.includes('dimensity 7') ||
      chipset.includes('helio g')) {
    return 60;
  }
  
  // Budget
  if (chipset.includes('snapdragon 4') ||
      chipset.includes('dimensity 6') ||
      chipset.includes('helio')) {
    return 45;
  }
  
  return 50; // Default for unknown chipsets
}

/**
 * Calculate camera score based on camera specs
 */
function calculateCameraScore(specs: PhoneSpec): number {
  const mainCamera = specs.main_camera?.main_sensor_resolution?.toLowerCase() || '';
  let score = 50;
  
  // Resolution scoring
  if (mainCamera.includes('200')) score = 95;
  else if (mainCamera.includes('108')) score = 88;
  else if (mainCamera.includes('50')) score = 82;
  else if (mainCamera.includes('48')) score = 75;
  else if (mainCamera.includes('12')) score = 70; // iPhone-style smaller but high quality
  else if (mainCamera.includes('64')) score = 72;
  
  // Bonus for OIS
  const ois = specs.main_camera?.ois_type?.toLowerCase() || '';
  if (ois.includes('ois') || ois.includes('optical')) {
    score += 5;
  }
  
  // Bonus for telephoto
  const telephoto = specs.main_camera?.telephoto_specs?.toLowerCase() || '';
  if (telephoto && telephoto !== 'n/a' && telephoto.length > 2) {
    score += 5;
  }
  
  return Math.min(100, score);
}

/**
 * Calculate display score based on display specs
 */
function calculateDisplayScore(specs: PhoneSpec): number {
  let score = 50;
  
  const panelType = specs.display?.panel_type?.toLowerCase() || '';
  const refreshRate = specs.display?.refresh_rate_hz || '';
  const resolution = specs.display?.resolution_px?.toLowerCase() || '';
  
  // Panel type scoring
  if (panelType.includes('ltpo') || panelType.includes('super retina')) {
    score = 90;
  } else if (panelType.includes('amoled') || panelType.includes('oled')) {
    score = 80;
  } else if (panelType.includes('ips') || panelType.includes('lcd')) {
    score = 60;
  }
  
  // Refresh rate bonus
  if (refreshRate.includes('165') || refreshRate.includes('144')) {
    score += 10;
  } else if (refreshRate.includes('120')) {
    score += 8;
  } else if (refreshRate.includes('90')) {
    score += 4;
  }
  
  // Resolution bonus
  if (resolution.includes('3200') || resolution.includes('2960') || resolution.includes('qhd')) {
    score += 5;
  }
  
  return Math.min(100, score);
}

/**
 * Calculate battery score based on battery specs
 */
function calculateBatteryScore(specs: PhoneSpec): number {
  let score = 50;
  
  const capacity = specs.battery?.capacity_mah || '';
  const charging = specs.battery?.wired_charging_wattage || '';
  const wireless = specs.battery?.wireless_charging_wattage || '';
  
  // Capacity scoring
  const capacityNum = parseInt(capacity.replace(/\D/g, '')) || 0;
  if (capacityNum >= 6000) score = 95;
  else if (capacityNum >= 5000) score = 85;
  else if (capacityNum >= 4500) score = 75;
  else if (capacityNum >= 4000) score = 65;
  else if (capacityNum >= 3500) score = 55;
  
  // Charging speed bonus
  const chargingNum = parseInt(charging.replace(/\D/g, '')) || 0;
  if (chargingNum >= 100) score += 10;
  else if (chargingNum >= 65) score += 7;
  else if (chargingNum >= 45) score += 5;
  else if (chargingNum >= 25) score += 3;
  
  // Wireless charging bonus
  const wirelessNum = parseInt(wireless.replace(/\D/g, '')) || 0;
  if (wirelessNum > 0) score += 3;
  
  return Math.min(100, score);
}

/**
 * Calculate hardware score from sub-components
 */
function calculateHardwareScore(specs: PhoneSpec): {
  hardware: number;
  processor: number;
  camera: number;
  display: number;
  battery: number;
} {
  const processor = calculateProcessorScore(specs);
  const camera = calculateCameraScore(specs);
  const display = calculateDisplayScore(specs);
  const battery = calculateBatteryScore(specs);
  
  const hardware = 
    processor * HARDWARE_WEIGHTS.processor +
    camera * HARDWARE_WEIGHTS.camera +
    display * HARDWARE_WEIGHTS.display +
    battery * HARDWARE_WEIGHTS.battery;
  
  return {
    hardware: Math.round(hardware * 10) / 10,
    processor,
    camera,
    display,
    battery,
  };
}

/**
 * Calculate value score (price-to-specs ratio)
 */
function calculateValueScore(hardwareScore: number, price: number | undefined): number {
  if (!price || price === 0) return 50;
  
  // Expected hardware score for price point
  let expectedScore: number;
  if (price < 300) expectedScore = 55;
  else if (price < 600) expectedScore = 70;
  else if (price < 1200) expectedScore = 85;
  else expectedScore = 95;
  
  // Value = how much better/worse than expected
  const ratio = hardwareScore / expectedScore;
  const value = Math.round(ratio * 70); // Scale to reasonable range
  
  return Math.max(30, Math.min(100, value));
}

/**
 * Calculate the complete rating for a phone
 */
export function calculatePhoneRating(phone: Phone, releaseDate?: string): PhoneRating {
  const specs = phone.specs;
  const brand = phone.brand;
  const price = phone.price;
  
  // Calculate component scores
  const hardwareScores = calculateHardwareScore(specs);
  const software = BRAND_SOFTWARE_SCORES[brand] || 55;
  const ecosystem = BRAND_ECOSYSTEM_SCORES[brand] || 40;
  const updateYears = SOFTWARE_UPDATE_YEARS[brand] || 2;
  const longevity = Math.min(100, updateYears * 15); // 15 points per year
  const freshness = calculateFreshnessScore(releaseDate);
  const value = calculateValueScore(hardwareScores.hardware, price);
  
  // Placeholder scores (can be enhanced with real data later)
  const userSentiment = 50; // Default neutral
  const marketPosition = 50; // Default neutral
  
  // Calculate overall rating with weights and time decay
  const weightedScore = 
    hardwareScores.hardware * RATING_WEIGHTS.hardware +
    software * RATING_WEIGHTS.software +
    value * RATING_WEIGHTS.value +
    ecosystem * RATING_WEIGHTS.ecosystem +
    longevity * RATING_WEIGHTS.longevity +
    userSentiment * RATING_WEIGHTS.userSentiment +
    marketPosition * RATING_WEIGHTS.marketPosition;
  
  // Apply freshness as a component rather than a multiplier
  // This prevents freshness from cutting scores in half
  const freshnessContribution = freshness * 0.10; // 10% weight for freshness
  const overall = Math.round((weightedScore * 0.90 + freshnessContribution) * 10) / 10;
  
  return {
    overall: Math.max(0, Math.min(100, overall)),
    hardware: hardwareScores.hardware,
    software,
    value,
    ecosystem,
    longevity,
    freshness,
    userSentiment,
    marketPosition,
    priceSegment: getPriceSegment(price),
    processorScore: hardwareScores.processor,
    cameraScore: hardwareScores.camera,
    displayScore: hardwareScores.display,
    batteryScore: hardwareScores.battery,
  };
}

/**
 * Get rating color based on score (returns hex color for inline styles)
 */
export function getRatingColor(score: number): string {
  if (score >= 80) return '#22c55e'; // green-500
  if (score >= 60) return '#eab308'; // yellow-500
  if (score >= 40) return '#f97316'; // orange-500
  return '#ef4444'; // red-500
}

/**
 * Get rating label based on score
 */
export function getRatingLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Very Good';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Above Average';
  if (score >= 50) return 'Average';
  if (score >= 40) return 'Below Average';
  return 'Poor';
}

/**
 * Format price segment for display
 */
export function formatPriceSegment(segment: PriceSegment): string {
  switch (segment) {
    case 'budget': return 'Budget';
    case 'mid_range': return 'Mid-Range';
    case 'flagship': return 'Flagship';
    case 'ultra_premium': return 'Ultra Premium';
    default: return 'Unknown';
  }
}
