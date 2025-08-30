import type { Phone } from './types';

export const latestPhones: Phone[] = [
  {
    id: 1,
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    image: 'https://picsum.photos/400/300?phone=1',
    price: 1299,
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      camera: '200MP Wide',
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      battery: '5000mAh',
    },
  },
  {
    id: 2,
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    image: 'https://picsum.photos/400/300?phone=2',
    price: 999,
    specs: {
      display: '6.1" Super Retina XDR',
      camera: '48MP Main',
      processor: 'A17 Pro Chip',
      battery: '3274mAh',
    },
  },
  {
    id: 3,
    brand: 'Google',
    model: 'Pixel 8 Pro',
    image: 'https://picsum.photos/400/300?phone=3',
    price: 999,
    specs: {
      display: '6.7" Super Actua',
      camera: '50MP Octa PD Wide',
      processor: 'Google Tensor G3',
      battery: '5050mAh',
    },
  },
  {
    id: 4,
    brand: 'Samsung',
    model: 'Galaxy Z Fold 5',
    image: 'https://picsum.photos/400/300?phone=4',
    price: 1799,
    specs: {
      display: '7.6" Foldable AMOLED',
      camera: '50MP Wide',
      processor: 'Snapdragon 8 Gen 2 for Galaxy',
      battery: '4400mAh',
    },
  },
  {
    id: 9,
    brand: 'Xiaomi',
    model: 'Redmi Note 13 Pro',
    image: 'https://picsum.photos/400/300?phone=5',
    price: 399,
    specs: {
      display: '6.67" AMOLED, 120Hz',
      camera: '200MP Main',
      processor: 'Snapdragon 7s Gen 2',
      battery: '5100mAh',
    },
  },
  {
    id: 10,
    brand: 'OnePlus',
    model: '12R',
    image: 'https://picsum.photos/400/300?phone=6',
    price: 499,
    specs: {
      display: '6.78" ProXDR Display, 120Hz',
      camera: '50MP Sony IMX890',
      processor: 'Snapdragon 8 Gen 2',
      battery: '5500mAh',
    },
  }
];

export const popularPhones: Phone[] = [
  {
    id: 5,
    brand: 'Samsung',
    model: 'Galaxy S23 Ultra',
    image: 'https://picsum.photos/400/300?phone=7',
    price: 999,
    specs: {
      display: '6.8" Dynamic AMOLED',
      camera: '200MP Wide',
      processor: 'Snapdragon 8 Gen 2 for Galaxy',
      battery: '5000mAh',
    },
  },
  {
    id: 6,
    brand: 'Apple',
    model: 'iPhone 14 Pro',
    image: 'https://picsum.photos/400/300?phone=8',
    price: 899,
    specs: {
      display: '6.1" Super Retina XDR',
      camera: '48MP Main',
      processor: 'A16 Bionic',
      battery: '3200mAh',
    },
  },
  {
    id: 7,
    brand: 'Google',
    model: 'Pixel 7a',
    image: 'https://picsum.photos/400/300?phone=9',
    price: 499,
    specs: {
      display: '6.1" OLED, 90Hz',
      camera: '64MP Quad Bayer',
      processor: 'Google Tensor G2',
      battery: '4385mAh',
    },
  },
  {
    id: 8,
    brand: 'OnePlus',
    model: '11',
    image: 'https://picsum.photos/400/300?phone=10',
    price: 699,
    specs: {
      display: '6.7" Fluid AMOLED, 120Hz',
      camera: '50MP Sony IMX890',
      processor: 'Snapdragon 8 Gen 2',
      battery: '5000mAh',
    },
  },
  {
    id: 11,
    brand: 'Nothing',
    model: 'Phone (2)',
    image: 'https://picsum.photos/400/300?phone=11',
    price: 599,
    specs: {
      display: '6.7" LTPO OLED, 120Hz',
      camera: '50MP Sony IMX890',
      processor: 'Snapdragon 8+ Gen 1',
      battery: '4700mAh',
    },
  },
  {
    id: 12,
    brand: 'Asus',
    model: 'ROG Phone 8 Pro',
    image: 'https://picsum.photos/400/300?phone=12',
    price: 1199,
    specs: {
      display: '6.78" AMOLED, 165Hz',
      camera: '50MP Sony IMX890',
      processor: 'Snapdragon 8 Gen 3',
      battery: '5500mAh',
    },
  }
];

export const allPhones: Phone[] = [...latestPhones, ...popularPhones];
