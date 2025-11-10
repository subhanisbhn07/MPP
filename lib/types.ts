export interface PhoneSpec {
  id: string;
  
  brand: string;
  model: string;
  releaseDate: string;
  price: number;
  currency: string;
  availability: string;
  
  displaySize: number;
  displayResolution: string;
  displayType: string;
  displayRefreshRate: number;
  displayProtection: string;
  displayPPI: number;
  displayAspectRatio: string;
  displayBrightness: number;
  displayHDR: boolean;
  displayAlwaysOn: boolean;
  
  chipset: string;
  cpu: string;
  gpu: string;
  ram: number[];
  storage: number[];
  expandableStorage: boolean;
  maxExpandableStorage: number;
  
  mainCameraMP: number;
  mainCameraAperture: string;
  mainCameraSensorSize: string;
  mainCameraPixelSize: number;
  mainCameraOIS: boolean;
  
  ultrawideCameraMP: number;
  ultrawideAperture: string;
  ultrawideFOV: number;
  
  telephotoCamera: number;
  telephotoAperture: string;
  telephotoZoom: string;
  telephotoOIS: boolean;
  
  depthSensor: boolean;
  macroCamera: number;
  
  videoRecording: string[];
  videoStabilization: string;
  nightMode: boolean;
  proMode: boolean;
  hdr: boolean;
  panorama: boolean;
  slowMotion: string;
  timelapseMode: boolean;
  
  frontCameraMP: number;
  frontCameraAperture: string;
  frontCameraVideo: string;
  frontCameraHDR: boolean;
  
  batteryCapacity: number;
  batteryType: string;
  fastCharging: number;
  wirelessCharging: number;
  reverseCharging: boolean;
  batteryLife: string;
  
  network5G: boolean;
  network4G: boolean;
  network3G: boolean;
  network2G: boolean;
  wifiStandards: string[];
  bluetooth: string;
  nfc: boolean;
  infrared: boolean;
  usbType: string;
  usbVersion: string;
  headphoneJack: boolean;
  
  dimensions: {
    height: number;
    width: number;
    thickness: number;
  };
  weight: number;
  buildMaterials: {
    front: string;
    back: string;
    frame: string;
  };
  colors: string[];
  ipRating: string;
  
  os: string;
  osVersion: string;
  ui: string;
  updatePolicy: string;
  
  speakers: string;
  audioFeatures: string[];
  
  fingerprint: string;
  faceUnlock: boolean;
  accelerometer: boolean;
  gyroscope: boolean;
  proximity: boolean;
  compass: boolean;
  barometer: boolean;
  
  dualSIM: boolean;
  simType: string;
  
  images: string[];
  videos: string[];
  
  rating: number;
  reviewCount: number;
  
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  trending: boolean;
  latestLaunch: boolean;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  wishlist: string[];
  createdAt: string;
  isAdmin: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
  tags: string[];
}

export interface HomepageSection {
  id: string;
  type: 'trending' | 'latest' | 'compare' | 'news' | 'blog' | 'custom';
  title: string;
  visible: boolean;
  order: number;
  phoneIds?: string[];
  newsIds?: string[];
  config?: Record<string, unknown>;
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
  location: 'header' | 'footer';
  children?: MenuItem[];
}

export interface SEOMetadata {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  phoneIds: string[];
  icon?: string;
}

export interface Review {
  id: string;
  phoneId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  createdAt: string;
  helpful: number;
  verified: boolean;
}

export interface PriceAlert {
  id: string;
  userId: string;
  phoneId: string;
  targetPrice: number;
  active: boolean;
  createdAt: string;
}

export interface Comparison {
  id: string;
  slug: string;
  phoneIds: string[];
  createdAt: string;
  views: number;
}
