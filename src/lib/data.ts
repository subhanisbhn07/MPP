
import type { Phone } from './types';

export const allPhones: Phone[] = [
  {
    id: 1,
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    image: 'https://picsum.photos/400/500?phone=1',
    price: 1299,
    specs: {
      network: {
        technology: 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
        bands2g: 'GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2 (Dual SIM model only)',
        bands3g: 'HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100',
        bands4g: '1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66',
        bands5g: '1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6',
      },
      launch: { announced: '2024, January 17', status: 'Available. Released 2024, January 24' },
      body: {
        dimensions: '162.3 x 79 x 8.6 mm',
        weight: '232 g or 233 g',
        build: 'Glass front (Gorilla Armor), glass back (Gorilla Armor), titanium frame (grade 2)',
        sim: 'Nano-SIM and eSIM/ Dual eSIM or Dual SIM',
        ipRating: 'IP68 dust/water resistant (up to 1.5m for 30 min)'
      },
      display: {
        type: 'Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 2600 nits (peak)',
        size: '6.8 inches, 113.5 cm2 (~88.5% screen-to-body ratio)',
        resolution: '1440 x 3120 pixels, 19.5:9 ratio (~505 ppi density)',
        protection: 'Corning Gorilla Armor',
        refreshRate: '120Hz',
        peakBrightness: '2600 nits',
      },
      platform: {
        os: 'Android 14, One UI 6.1',
        chipset: 'Qualcomm SM8650-AC Snapdragon 8 Gen 3 (4 nm)',
        cpu: '8-core (1x3.39GHz Cortex-X4 & 3x3.1GHz Cortex-A720 & 2x2.9GHz Cortex-A720 & 2x2.2GHz Cortex-A520)',
        gpu: 'Adreno 750 (1 GHz)',
      },
      memory: {
        cardSlot: 'No',
        internal: '256GB/512GB/1TB storage',
        ram: '12GB',
        storageType: 'UFS 4.0',
      },
      mainCamera: {
        modules: '200MP Wide, 50MP Periscope Telephoto (5x), 10MP Telephoto (3x), 12MP Ultrawide',
        features: 'LED flash, auto-HDR, panorama',
        video: '8K@24/30fps, 4K@30/60/120fps, 1080p@30/60/240fps, HDR10+, stereo sound rec., gyro-EIS',
        ois: 'Yes, multi-directional OIS',
      },
      selfieCamera: {
        modules: '12 MP, f/2.2, 26mm (wide), Dual Pixel PDAF',
        video: '4K@30/60fps, 1080p@30fps',
      },
      sound: {
        loudspeaker: 'Yes, with stereo speakers',
        jack: 'No',
      },
      comms: {
        wlan: 'Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct',
        bluetooth: '5.3, A2DP, LE',
        positioning: 'GPS, GLONASS, BDS, GALILEO, QZSS',
        nfc: 'Yes',
        usb: 'USB Type-C 3.2, OTG, DisplayPort 1.2',
      },
      features: {
        sensors: 'Fingerprint (under display, ultrasonic), accelerometer, gyro, proximity, compass, barometer',
      },
      battery: {
        type: 'Li-Ion 5000 mAh, non-removable',
        charging: '45W wired, PD3.0, 65% in 30 min (advertised)',
        wirelessCharging: '15W wireless (Qi/PMA)',
        reverseWirelessCharging: '4.5W reverse wireless'
      },
      misc: {
        colors: 'Titanium Black, Titanium Gray, Titanium Violet, Titanium Yellow, Titanium Blue, Titanium Green, Titanium Orange',
        price: '~$1,299.99',
      },
    }
  },
  {
    id: 2,
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    image: 'https://picsum.photos/400/500?phone=2',
    price: 999,
    specs: {
      network: {
        technology: 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
        bands2g: 'GSM 850 / 900 / 1800 / 1900',
        bands3g: 'HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100',
        bands4g: '1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66',
        bands5g: '1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 66, 70, 77, 78, 79 SA/NSA/Sub6',
      },
      launch: { announced: '2023, September 12', status: 'Available. Released 2023, September 22' },
      body: {
        dimensions: '146.6 x 70.6 x 8.3 mm',
        weight: '187 g',
        build: 'Glass front (Ceramic Shield), glass back (Corning-made glass), titanium frame (grade 5)',
        sim: 'Nano-SIM and eSIM - International',
        ipRating: 'IP68 dust/water resistant (up to 6m for 30 min)'
      },
      display: {
        type: 'LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 1000 nits (typ), 2000 nits (HBM)',
        size: '6.1 inches, 91.3 cm2 (~88.2% screen-to-body ratio)',
        resolution: '1179 x 2556 pixels, 19.5:9 ratio (~460 ppi density)',
        protection: 'Ceramic Shield glass',
        refreshRate: '120Hz',
        peakBrightness: '2000 nits',
      },
      platform: {
        os: 'iOS 17, upgradable to iOS 17.5.1',
        chipset: 'Apple A17 Pro (3 nm)',
        cpu: '6-core (2x3.78 GHz + 4x2.11 GHz)',
        gpu: 'Apple GPU (6-core graphics)',
      },
      memory: {
        cardSlot: 'No',
        internal: '128GB/256GB/512GB/1TB storage',
        ram: '8GB',
        storageType: 'NVMe',
      },
      mainCamera: {
        modules: '48MP Wide, 12MP Telephoto (3x), 12MP Ultrawide, TOF 3D LiDAR scanner (depth)',
        features: 'Dual-LED dual-tone flash, HDR (photo/panorama)',
        video: '4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, 10-bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode (4K@24/30fps), 3D (spatial) video, stereo sound rec.',
        ois: 'Yes, sensor-shift OIS',
      },
      selfieCamera: {
        modules: '12 MP, f/1.9, 23mm (wide), 1/3.6", PDAF, OIS',
        video: '4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS',
      },
      sound: {
        loudspeaker: 'Yes, with stereo speakers',
        jack: 'No',
      },
      comms: {
        wlan: 'Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band, hotspot',
        bluetooth: '5.3, A2DP, LE',
        positioning: 'GPS, GLONASS, GALILEO, BDS, QZSS, NavIC',
        nfc: 'Yes',
        usb: 'USB Type-C 3.2 Gen 2, DisplayPort',
      },
      features: {
        sensors: 'Face ID, accelerometer, gyro, proximity, compass, barometer, Ultra Wideband 2 (UWB) support',
      },
      battery: {
        type: 'Li-Ion 3274 mAh, non-removable',
        charging: 'Wired, 50% in 30 min (advertised)',
        wirelessCharging: '15W wireless (MagSafe)',
        reverseWirelessCharging: '4.5W reverse wired'
      },
      misc: {
        colors: 'Black Titanium, White Titanium, Blue Titanium, Natural Titanium',
        price: '~$999',
      },
    }
  },
  {
    id: 3,
    brand: 'Google',
    model: 'Pixel 8 Pro',
    image: 'https://picsum.photos/400/500?phone=3',
    price: 999,
    specs: {
      network: {
        technology: 'GSM / HSPA / LTE / 5G',
        bands2g: 'GSM 850 / 900 / 1800 / 1900',
        bands3g: 'HSDPA 800 / 850 / 900 / 1700(AWS) / 1900 / 2100',
        bands4g: '1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 28, 29, 30, 38, 39, 40, 41, 46, 48, 66, 71',
        bands5g: '1, 2, 3, 5, 7, 8, 12, 20, 25, 28, 30, 38, 40, 41, 48, 66, 70, 71, 77, 78 SA/NSA/Sub6',
      },
      launch: { announced: '2023, October 4', status: 'Available. Released 2023, October 12' },
      body: {
        dimensions: '162.6 x 76.5 x 8.8 mm',
        weight: '213 g',
        build: 'Glass front (Gorilla Glass Victus 2), glass back (Gorilla Glass Victus 2), aluminum frame',
        sim: 'Nano-SIM and eSIM',
        ipRating: 'IP68 dust/water resistant (up to 1.5m for 30 min)'
      },
      display: {
        type: 'LTPO OLED, 120Hz, HDR10+, 1600 nits (HBM), 2400 nits (peak)',
        size: '6.7 inches, 108.7 cm2 (~87.4% screen-to-body ratio)',
        resolution: '1344 x 2992 pixels, 20:9 ratio (~489 ppi density)',
        protection: 'Corning Gorilla Glass Victus 2',
        refreshRate: '120Hz',
        peakBrightness: '2400 nits',
      },
      platform: {
        os: 'Android 14',
        chipset: 'Google Tensor G3 (4 nm)',
        cpu: '9-core (1x3.0 GHz Cortex-X3 & 4x2.45 GHz Cortex-A715 & 4x2.15 GHz Cortex-A510)',
        gpu: 'Immortalis-G715s MC10',
      },
      memory: {
        cardSlot: 'No',
        internal: '128GB/256GB/512GB/1TB storage',
        ram: '12GB',
        storageType: 'UFS 3.1',
      },
      mainCamera: {
        modules: '50MP Wide, 48MP Telephoto (5x), 48MP Ultrawide',
        features: 'Dual-LED flash, Pixel Shift, Ultra-HDR, panorama, Best Take',
        video: '4K@30/60fps, 1080p@30/60/120/240fps, OIS, 10-bit HDR',
        ois: 'Yes, OIS',
      },
      selfieCamera: {
        modules: '10.5 MP, f/2.2, 17mm (ultrawide), 1/3.1", 1.22µm, PDAF',
        video: '4K@30/60fps, 1080p@30/60fps',
      },
      sound: {
        loudspeaker: 'Yes, with stereo speakers',
        jack: 'No',
      },
      comms: {
        wlan: 'Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct',
        bluetooth: '5.3, A2DP, LE, aptX HD',
        positioning: 'GPS, GLONASS, GALILEO, QZSS, BDS',
        nfc: 'Yes',
        usb: 'USB Type-C 3.2',
      },
      features: {
        sensors: 'Fingerprint (under display, optical), accelerometer, gyro, proximity, compass, barometer, thermometer (skin)',
      },
      battery: {
        type: 'Li-Ion 5050 mAh, non-removable',
        charging: '30W wired, PD3.0, PPS, 50% in 30 min (advertised)',
        wirelessCharging: '23W wireless',
        reverseWirelessCharging: 'Reverse wireless'
      },
      misc: {
        colors: 'Obsidian, Porcelain, Bay',
        price: '~$999',
      },
    }
  },
  {
    id: 4,
    brand: 'Samsung',
    model: 'Galaxy Z Fold 5',
    image: 'https://picsum.photos/400/500?phone=4',
    price: 1799,
    specs: {
      network: {
        technology: 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
        bands2g: 'GSM 850 / 900 / 1800 / 1900',
        bands3g: 'HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100',
        bands4g: '1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 38, 39, 40, 41, 46, 48, 66',
        bands5g: '1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 46, 48, 66, 71, 77, 78 SA/NSA/Sub6',
      },
      launch: { announced: '2023, July 26', status: 'Available. Released 2023, August 11' },
      body: {
        dimensions: 'Unfolded: 154.9 x 129.9 x 6.1 mm, Folded: 154.9 x 67.1 x 13.4 mm',
        weight: '253 g',
        build: 'Glass front (Gorilla Glass Victus 2) (folded), plastic front (unfolded), glass back (Gorilla Glass Victus 2), aluminum frame',
        sim: 'Up to two Nano SIM and one eSIM',
        ipRating: 'IPX8 water resistant (up to 1.5m for 30 min)'
      },
      display: {
        type: 'Foldable Dynamic AMOLED 2X, 120Hz, HDR10+',
        size: '7.6 inches, 183.2 cm2 (~91.1% screen-to-body ratio)',
        resolution: '1812 x 2176 pixels (~373 ppi density)',
        protection: 'Corning Gorilla Glass Victus 2 (Cover display)',
        refreshRate: '120Hz',
        peakBrightness: '1750 nits',
      },
      platform: {
        os: 'Android 13, upgradable to Android 14, One UI 6.1',
        chipset: 'Qualcomm SM8550-AC Snapdragon 8 Gen 2 (4 nm)',
        cpu: '8-core (1x3.36 GHz Cortex-X3 & 2x2.8 GHz Cortex-A715 & 2x2.8 GHz Cortex-A710 & 3x2.0 GHz Cortex-A510)',
        gpu: 'Adreno 740',
      },
      memory: {
        cardSlot: 'No',
        internal: '256GB/512GB/1TB storage',
        ram: '12GB',
        storageType: 'UFS 4.0',
      },
      mainCamera: {
        modules: '50MP Wide, 10MP Telephoto (3x), 12MP Ultrawide',
        features: 'LED flash, HDR, panorama',
        video: '8K@30fps, 4K@60fps, 1080p@60/240fps (gyro-EIS), 720p@960fps (gyro-EIS), HDR10+',
        ois: 'Yes, OIS',
      },
      selfieCamera: {
        modules: '4 MP (under display), 10MP (Cover camera)',
        video: '4K@30/60fps, 1080p@30/60fps, gyro-EIS',
      },
      sound: {
        loudspeaker: 'Yes, with stereo speakers',
        jack: 'No',
      },
      comms: {
        wlan: 'Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, Wi-Fi Direct',
        bluetooth: '5.3, A2DP, LE, aptX HD',
        positioning: 'GPS, GLONASS, BDS, GALILEO',
        nfc: 'Yes',
        usb: 'USB Type-C 3.2, OTG',
      },
      features: {
        sensors: 'Fingerprint (side-mounted), accelerometer, gyro, proximity, compass, barometer',
      },
      battery: {
        type: 'Li-Po 4400 mAh, non-removable',
        charging: '25W wired, 50% in 30 min (advertised)',
        wirelessCharging: '15W wireless',
        reverseWirelessCharging: '4.5W reverse wireless'
      },
      misc: {
        colors: 'Icy Blue, Phantom Black, Cream, Gray, Blue',
        price: '~$1,799',
      },
    }
  },
  {
    id: 9,
    brand: 'Xiaomi',
    model: '14 Ultra',
    image: 'https://picsum.photos/400/500?phone=5',
    price: 1199,
    specs: {
      network: {
        technology: 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
        bands2g: 'GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2',
        bands3g: 'HSDPA 800 / 850 / 900 / 1700(AWS) / 1900 / 2100',
        bands4g: '1, 2, 3, 4, 5, 7, 8, 18, 19, 20, 26, 28, 38, 40, 41, 42, 48, 66',
        bands5g: '1, 2, 3, 5, 7, 8, 20, 28, 38, 40, 41, 48, 66, 77, 78, 79 SA/NSA',
      },
      launch: { announced: '2024, February 22', status: 'Available. Released 2024, February 22' },
      body: {
        dimensions: '161.4 x 75.3 x 9.2 mm',
        weight: '219.8 g or 224.4 g or 229.5 g',
        build: 'Glass front (Shield Glass), eco leather back or glass back, titanium (grade 5) or aluminum alloy frame',
        sim: 'Dual SIM (Nano-SIM, dual stand-by)',
        ipRating: 'IP68 dust/water resistant (up to 1.5m for 30 min)'
      },
      display: {
        type: 'LTPO AMOLED, 68B colors, 120Hz, Dolby Vision, HDR10+, 1000 nits (typ), 3000 nits (peak)',
        size: '6.73 inches, 108.9 cm2 (~89.6% screen-to-body ratio)',
        resolution: '1440 x 3200 pixels, 20:9 ratio (~522 ppi density)',
        protection: 'Xiaomi Shield Glass / Xiaomi Longjing Glass',
        refreshRate: '120Hz',
        peakBrightness: '3000 nits',
      },
      platform: {
        os: 'Android 14, HyperOS',
        chipset: 'Qualcomm SM8650-AB Snapdragon 8 Gen 3 (4 nm)',
        cpu: '8-core (1x3.3 GHz Cortex-X4 & 3x3.2 GHz Cortex-A720 & 2x3.0 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)',
        gpu: 'Adreno 750',
      },
      memory: {
        cardSlot: 'No',
        internal: '256GB/512GB/1TB storage',
        ram: '12GB/16GB',
        storageType: 'UFS 4.0',
      },
      mainCamera: {
        modules: '50MP Wide, 50MP Periscope Telephoto (5x), 50MP Telephoto (3.2x), 50MP Ultrawide, TOF 3D (depth)',
        features: 'Leica lenses, Dual-LED flash, HDR, panorama, 67mm filter ring holder (optional)',
        video: '8K@24/30fps, 4K@24/30/60/120fps, 1080p@30/60/120/240/480/960/1920fps, gyro-EIS, Dolby Vision HDR 10-bit rec. (4K@60fps, 1080p)',
        ois: 'Yes, OIS',
      },
      selfieCamera: {
        modules: '32 MP, f/2.0, 22mm (wide), 1/3.14", 0.7µm',
        video: '4K@30/60fps, 1080p@30/60fps, gyro-EIS',
      },
      sound: {
        loudspeaker: 'Yes, with stereo speakers',
        jack: 'No',
      },
      comms: {
        wlan: 'Wi-Fi 802.11 a/b/g/n/ac/6e/7, dual-band, Wi-Fi Direct',
        bluetooth: '5.4, A2DP, LE, aptX HD, aptX Adaptive, LHDC',
        positioning: 'GPS (L1+L5), GLONASS (L1), BDS (B1I+B1c+B2a), GALILEO (E1+E5a), QZSS (L1+L5), NavIC (L5)',
        nfc: 'Yes',
        usb: 'USB Type-C 3.2 Gen 2, DisplayPort, OTG',
      },
      features: {
        sensors: 'Fingerprint (under display, optical), accelerometer, proximity, gyro, compass, color spectrum, barometer',
      },
      battery: {
        type: 'Li-Po 5000 mAh, non-removable',
        charging: '90W wired, PD3.0, QC4, 100% in 33 min (advertised)',
        wirelessCharging: '80W wireless, 100% in 46 min (advertised)',
        reverseWirelessCharging: '10W reverse wireless'
      },
      misc: {
        colors: 'Black, Blue, White, Titanium Gray',
        price: '~$1,199',
      },
    }
  },
  {
    id: 10,
    brand: 'OnePlus',
    model: '12',
    image: 'https://picsum.photos/400/500?phone=6',
    price: 799,
    specs: {
      network: {
        technology: 'GSM / CDMA / HSPA / LTE / 5G',
        bands2g: 'GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2',
        bands3g: 'HSDPA 800 / 850 / 900 / 1700(AWS) / 1900 / 2100',
        bands4g: '1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 38, 39, 40, 41, 48, 66, 71',
        bands5g: '1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 66, 71, 77, 78, 79 SA/NSA',
      },
      launch: { announced: '2023, December 5', status: 'Available. Released 2023, December 11' },
      body: {
        dimensions: '164.3 x 75.8 x 9.2 mm',
        weight: '220 g',
        build: 'Glass front (Gorilla Glass Victus 2), glass back (Gorilla Glass), aluminum frame',
        sim: 'Dual SIM (2x Nano-SIM, eSIM, dual stand-by)',
        ipRating: 'IP65, waterproof and dustproof'
      },
      display: {
        type: 'LTPO AMOLED, 1B colors, 120Hz, Dolby Vision, HDR10+, 600 nits (typ), 1600 nits (HBM), 4500 nits (peak)',
        size: '6.82 inches, 113.0 cm2 (~90.8% screen-to-body ratio)',
        resolution: '1440 x 3168 pixels (~510 ppi density)',
        protection: 'Corning Gorilla Glass Victus 2',
        refreshRate: '120Hz',
        peakBrightness: '4500 nits',
      },
      platform: {
        os: 'Android 14, OxygenOS 14 (International), ColorOS 14 (China)',
        chipset: 'Qualcomm SM8650-AB Snapdragon 8 Gen 3 (4 nm)',
        cpu: '8-core (1x3.3 GHz Cortex-X4 & 5x3.2 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)',
        gpu: 'Adreno 750',
      },
      memory: {
        cardSlot: 'No',
        internal: '256GB/512GB/1TB storage',
        ram: '12GB/16GB/24GB',
        storageType: 'UFS 4.0',
      },
      mainCamera: {
        modules: '50MP Wide, 64MP Periscope Telephoto (3x), 48MP Ultrawide',
        features: 'Hasselblad Color Calibration, Dual-LED flash, HDR, panorama',
        video: '8K@24fps, 4K@30/60fps, 1080p@30/60/240/480fps, Auto HDR, gyro-EIS, Dolby Vision',
        ois: 'Yes, OIS',
      },
      selfieCamera: {
        modules: '32 MP, f/2.4, 21mm (wide), 1/3.14", 0.7µm',
        video: '4K@30fps, 1080p@30fps, gyro-EIS',
      },
      sound: {
        loudspeaker: 'Yes, with stereo speakers',
        jack: 'No',
      },
      comms: {
        wlan: 'Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band',
        bluetooth: '5.4, A2DP, LE, aptX HD, LHDC',
        positioning: 'GPS (L1+L5), GLONASS, BDS, GALILEO, QZSS',
        nfc: 'Yes, eSE, HCE',
        usb: 'USB Type-C 3.2, OTG',
      },
      features: {
        sensors: 'Fingerprint (under display, optical), accelerometer, gyro, proximity, compass, color spectrum',
      },
      battery: {
        type: 'Li-Po 5400 mAh, non-removable',
        charging: '100W wired, 1-100% in 26 min (International), 80W wired (USA)',
        wirelessCharging: '50W wireless, 1-100% in 55 min (advertised)',
        reverseWirelessCharging: '10W reverse wireless'
      },
      misc: {
        colors: 'Flowy Emerald, Silky Black, White',
        price: '~$799',
      },
    }
  }
];
