import type { Phone } from './types';

export const latestPhones: Phone[] = [
  {
    id: 1,
    brand: 'Nova',
    model: 'Stellar 11 Pro',
    image: 'https://picsum.photos/400/300',
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
    image: 'https://picsum.photos/400/300',
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
    image: 'https://picsum.photos/400/300',
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
    image: 'https://picsum.photos/400/300',
    price: 1799,
    specs: {
      display: '7.6" Foldable AMOLED',
      camera: '50MP Wide',
      processor: 'Quantum Fusion Fold',
      battery: '4400mAh',
    },
  },
];

export const popularPhones: Phone[] = [
  {
    id: 5,
    brand: 'Nova',
    model: 'Stellar 10 Ultra',
    image: 'https://picsum.photos/400/300',
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
    image: 'https://picsum.photos/400/300',
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
    image: 'https://picsum.photos/400/300',
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
    image: 'https://picsum.photos/400/300',
    price: 699,
    specs: {
      display: '6.7" Fluid AMOLED',
      camera: '50MP Sony LYT-808',
      processor: 'Snapdragon 8 Gen 3',
      battery: '5400mAh',
    },
  },
];

export const allPhones: Phone[] = [...latestPhones, ...popularPhones];
