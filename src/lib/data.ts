import type { Phone } from './types';

export const latestPhones: Phone[] = [
  {
    id: 1,
    brand: 'Nova',
    model: 'Stellar 11 Pro',
    image: 'https://picsum.photos/400/301',
    price: 1099,
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      camera: '200MP Wide',
      processor: 'Quantum Fusion A17',
      battery: '5000mAh',
    },
  },
  {
    id: 2,
    brand: 'Apex',
    model: 'Vertex 5G',
    image: 'https://picsum.photos/400/302',
    price: 899,
    specs: {
      display: '6.7" Super Retina XDR',
      camera: '48MP Main',
      processor: 'Apex A16 Bionic',
      battery: '4323mAh',
    },
  },
  {
    id: 3,
    brand: 'Pixelate',
    model: 'Vision 8',
    image: 'https://picsum.photos/400/303',
    price: 799,
    specs: {
      display: '6.2" OLED',
      camera: '50MP Octa PD Wide',
      processor: 'Tensor G3',
      battery: '4575mAh',
    },
  },
  {
    id: 4,
    brand: 'Zenith',
    model: 'Horizon Fold',
    image: 'https://picsum.photos/400/304',
    price: 1799,
    specs: {
      display: '7.6" Foldable AMOLED',
      camera: '50MP Wide',
      processor: 'Quantum Fusion Fold',
      battery: '4400mAh',
    },
  },
  {
    id: 9,
    brand: 'Aura',
    model: 'Glimmer 6',
    image: 'https://picsum.photos/400/305',
    price: 599,
    specs: {
      display: '6.5" FHD+ LCD',
      camera: '108MP Main',
      processor: 'Helio G99',
      battery: '6000mAh',
    },
  },
  {
    id: 10,
    brand: 'Momentum',
    model: 'Drive X',
    image: 'https://picsum.photos/400/306',
    price: 399,
    specs: {
      display: '6.6" HD+ Display',
      camera: '50MP Dual',
      processor: 'Unisoc T616',
      battery: '5000mAh',
    },
  }
];

export const popularPhones: Phone[] = [
  {
    id: 5,
    brand: 'Nova',
    model: 'Stellar 10 Ultra',
    image: 'https://picsum.photos/400/307',
    price: 999,
    specs: {
      display: '6.8" Dynamic AMOLED',
      camera: '108MP Wide',
      processor: 'Quantum Fusion A16',
      battery: '5000mAh',
    },
  },
  {
    id: 6,
    brand: 'Apex',
    model: 'Vertex 4',
    image: 'https://picsum.photos/400/308',
    price: 799,
    specs: {
      display: '6.1" Super Retina XDR',
      camera: '12MP Main',
      processor: 'Apex A15 Bionic',
      battery: '3279mAh',
    },
  },
  {
    id: 7,
    brand: 'Pixelate',
    model: 'Vision 7a',
    image: 'https://picsum.photos/400/309',
    price: 499,
    specs: {
      display: '6.1" OLED',
      camera: '64MP Quad Bayer',
      processor: 'Tensor G2',
      battery: '4385mAh',
    },
  },
  {
    id: 8,
    brand: 'Connect',
    model: 'OnePlus 12',
    image: 'https://picsum.photos/400/310',
    price: 699,
    specs: {
      display: '6.7" Fluid AMOLED',
      camera: '50MP Sony LYT-808',
      processor: 'Snapdragon 8 Gen 3',
      battery: '5400mAh',
    },
  },
  {
    id: 11,
    brand: 'Infinix',
    model: 'GT 20 Pro',
    image: 'https://picsum.photos/400/311',
    price: 450,
    specs: {
      display: '6.78" AMOLED, 144Hz',
      camera: '108MP OIS',
      processor: 'Dimensity 8200 Ultimate',
      battery: '5000mAh',
    },
  },
  {
    id: 12,
    brand: 'Motorola',
    model: 'Edge 50 Ultra',
    image: 'https://picsum.photos/400/312',
    price: 950,
    specs: {
      display: '6.7" pOLED, 144Hz',
      camera: '50MP + 64MP Telephoto',
      processor: 'Snapdragon 8s Gen 3',
      battery: '4500mAh',
    },
  }
];

export const allPhones: Phone[] = [...latestPhones, ...popularPhones];
