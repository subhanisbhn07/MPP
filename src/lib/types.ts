
export type PhoneSpec = {
  network: {
    technology: string;
    bands2g: string;
    bands3g: string;
    bands4g: string;
    bands5g: string;
  };
  launch: {
    announced: string;
    status: string;
  };
  body: {
    dimensions: string;
    weight: string;
    build: string;
    sim: string;
    ipRating: string;
  };
  display: {
    type: string;
    size: string;
    resolution: string;
    protection: string;
    refreshRate: string;
    peakBrightness: string;
  };
  platform: {
    os: string;
    chipset: string;
    cpu: string;
    gpu: string;
  };
  memory: {
    internal: string;
    cardSlot: string;
    ram: string;
    storageType: string;
  };
  mainCamera: {
    modules: string;
    features: string;
    video: string;
    ois: string;
  };
  selfieCamera: {
    modules: string;
    video: string;
  };
  sound: {
    loudspeaker: string;
    jack: string;
  };
  comms: {
    wlan: string;
    bluetooth: string;
    positioning: string;
    nfc: string;
    usb: string;
  };
  features: {
    sensors: string;
  };
  battery: {
    type: string;
    charging: string;
    wirelessCharging?: string;
    reverseWirelessCharging?: string;
  };
  misc: {
    colors: string;
    price: string;
  };
};

export type Phone = {
  id: number;
  brand: string;
  model: string;
  image: string;
  price: number;
  specs: PhoneSpec;
};

export const specCategories: { category: keyof PhoneSpec, title: string, specs: { key: keyof PhoneSpec[keyof PhoneSpec], label: string }[] }[] = [
    {
        category: 'network',
        title: 'Network',
        specs: [
            { key: 'technology', label: 'Technology' },
            { key: 'bands2g', label: '2G Bands' },
            { key: 'bands3g', label: '3G Bands' },
            { key: 'bands4g', label: '4G Bands' },
            { key: 'bands5g', label: '5G Bands' },
        ],
    },
    {
        category: 'launch',
        title: 'Launch',
        specs: [
            { key: 'announced', label: 'Announced' },
            { key: 'status', label: 'Status' },
        ],
    },
    {
        category: 'body',
        title: 'Body',
        specs: [
            { key: 'dimensions', label: 'Dimensions' },
            { key: 'weight', label: 'Weight' },
            { key: 'build', label: 'Build' },
            { key: 'ipRating', label: 'IP Rating' },
            { key: 'sim', label: 'SIM' },
        ],
    },
    {
        category: 'display',
        title: 'Display',
        specs: [
            { key: 'type', label: 'Type' },
            { key: 'size', label: 'Size' },
            { key: 'resolution', label: 'Resolution' },
            { key: 'refreshRate', label: 'Refresh Rate' },
            { key: 'peakBrightness', label: 'Peak Brightness' },
            { key: 'protection', label: 'Protection' },
        ],
    },
    {
        category: 'platform',
        title: 'Platform',
        specs: [
            { key: 'os', label: 'OS' },
            { key: 'chipset', label: 'Chipset' },
            { key: 'cpu', label: 'CPU' },
            { key: 'gpu', label: 'GPU' },
        ],
    },
    {
        category: 'memory',
        title: 'Memory',
        specs: [
            { key: 'cardSlot', label: 'Card Slot' },
            { key: 'internal', label: 'Internal' },
            { key: 'ram', label: 'RAM' },
            { key: 'storageType', label: 'Storage Type' },
        ],
    },
    {
        category: 'mainCamera',
        title: 'Main Camera',
        specs: [
            { key: 'modules', label: 'Modules' },
            { key: 'features', label: 'Features' },
            { key: 'ois', label: 'OIS' },
            { key: 'video', label: 'Video' },
        ],
    },
    {
        category: 'selfieCamera',
        title: 'Selfie Camera',
        specs: [
            { key: 'modules', label: 'Modules' },
            { key: 'video', label: 'Video' },
        ],
    },
    {
        category: 'sound',
        title: 'Sound',
        specs: [
            { key: 'loudspeaker', label: 'Loudspeaker' },
            { key: 'jack', label: '3.5mm Jack' },
        ],
    },
    {
        category: 'comms',
        title: 'Connectivity',
        specs: [
            { key: 'wlan', label: 'WLAN' },
            { key: 'bluetooth', label: 'Bluetooth' },
            { key: 'positioning', label: 'Positioning' },
            { key: 'nfc', label: 'NFC' },
            { key: 'usb', label: 'USB' },
        ],
    },
    {
        category: 'features',
        title: 'Features',
        specs: [
            { key: 'sensors', label: 'Sensors' },
        ],
    },
    {
        category: 'battery',
        title: 'Battery',
        specs: [
            { key: 'type', label: 'Type' },
            { key: 'charging', label: 'Wired Charging' },
            { key: 'wirelessCharging', label: 'Wireless Charging' },
            { key: 'reverseWirelessCharging', label: 'Reverse Wireless' },
        ],
    },
    {
        category: 'misc',
        title: 'Miscellaneous',
        specs: [
            { key: 'colors', label: 'Colors' },
            { key: 'price', label: 'Price' },
        ],
    },
];
