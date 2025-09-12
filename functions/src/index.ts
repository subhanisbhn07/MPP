/**
 * @fileOverview Firebase Cloud Functions for the MobilePhonesPro homepage API.
 *
 * This file sets up an Express server to handle various API endpoints
 * for fetching homepage data. It follows the microservices pattern
 * outlined in the project's architecture, where each data domain
 * has its own route. The entire Express app is exported as a single
 * Cloud Function for simplified deployment and management.
 */

import * as functions from 'firebase-functions';
import * as express from 'express';
import * as crypto from 'crypto';
import { allPhones } from '../../src/lib/data'; // Adjust path based on your structure

const app = express();

const setCacheHeaders = (res: express.Response, ttl: number, swr: number) => {
  res.setHeader('Cache-Control', `s-maxage=${ttl}, stale-while-revalidate=${swr}`);
};

const createEtag = (data: any) => {
  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
};

const sendJsonResponse = (res: express.Response, data: any, ttl: number, swr: number) => {
    const etag = createEtag(data);
    res.setHeader('ETag', etag);
    setCacheHeaders(res, ttl, swr);

    if (res.req.headers['if-none-match'] === etag) {
        res.status(304).send();
    } else {
        res.json({
            status: 'success',
            version: 'v1.0.0',
            ttl: `${ttl}s`,
            data,
        });
    }
}

// GET /api/home/trending (TTL 5m; SWR 10m)
app.get('/trending', (req, res) => {
  const data = allPhones.slice(0, 6);
  sendJsonResponse(res, data, 300, 600);
});

// GET /api/home/latest (TTL 5m; SWR 10m)
app.get('/latest', (req, res) => {
  const data = [...allPhones].sort((a, b) => new Date(b.specs.launch.announced_date).getTime() - new Date(a.specs.launch.announced_date).getTime()).slice(0, 6);
  sendJsonResponse(res, data, 300, 600);
});

// GET /api/home/flagship (TTL 30m; SWR 60m)
app.get('/flagship', (req, res) => {
  const data = allPhones.filter(p => p.price > 900).slice(0, 6);
  sendJsonResponse(res, data, 1800, 3600);
});

// GET /api/home/performance (TTL 15m; SWR 30m)
app.get('/performance', (req, res) => {
  const data = allPhones.filter(p => p.specs.platform.chipset.includes('Snapdragon 8 Gen 3') || p.specs.platform.chipset.includes('Apple A17 Pro') || p.specs.platform.chipset.includes('Snapdragon 8 Gen 2')).slice(0, 6);
  sendJsonResponse(res, data, 900, 1800);
});

app.get('/battery', (req, res) => {
  const data = [...allPhones].sort((a,b) => parseInt(b.specs.battery.capacity_mah) - parseInt(a.specs.battery.capacity_mah)).slice(0, 6);
  sendJsonResponse(res, data, 900, 1800);
});

app.get('/camera', (req, res) => {
  const data = [...allPhones].sort((a,b) => parseInt(a.specs.main_camera.main_sensor_resolution) - parseInt(b.specs.main_camera.main_sensor_resolution)).slice(0, 6);
  sendJsonResponse(res, data, 900, 1800);
});

app.get('/foldable', (req, res) => {
    const data = allPhones.filter((p) => p.specs.body.form_factor.toLowerCase().includes('fold') || p.specs.body.form_factor.toLowerCase().includes('flip') || p.model.toLowerCase().includes('razr')).slice(0, 6);
    sendJsonResponse(res, data, 1800, 3600);
});

app.get('/rugged', (req, res) => {
    const data = allPhones.filter(p => p.specs.body.rugged_certifications.includes("MIL-STD-810H")).slice(0, 6);
    sendJsonResponse(res, data, 1800, 3600);
});

app.get('/unique', (req, res) => {
    const data = allPhones.filter(p => p.brand === "Nothing" || p.brand === "Asus" || p.brand === "Fairphone" || p.brand === "Sony").slice(0, 6);
    sendJsonResponse(res, data, 1800, 3600);
});

app.get('/ios', (req, res) => {
    const data = allPhones.filter(p => p.brand === 'Apple').slice(0, 6);
    sendJsonResponse(res, data, 1800, 3600);
});

app.get('/android', (req, res) => {
    const data = allPhones.filter(p => p.brand !== 'Apple').slice(0, 6);
    sendJsonResponse(res, data, 1800, 3600);
});

// GET /api/home/power (TTL 15m; SWR 30m) - DEPRECATED, use individual endpoints
app.get('/power', (req, res) => {
  const batteryPhones = [...allPhones].sort((a,b) => parseInt(b.specs.battery.capacity_mah) - parseInt(a.specs.battery.capacity_mah)).slice(0, 5);
  const gamingPhones = allPhones.filter(p => p.specs.platform.chipset.includes('Snapdragon 8 Gen 3') || p.specs.platform.chipset.includes('Apple A17 Pro') || p.specs.platform.chipset.includes('Snapdragon 8 Gen 2')).slice(0, 5);
  const cameraPhones = [...allPhones].sort((a,b) => parseInt(a.specs.main_camera.main_sensor_resolution) - parseInt(b.specs.main_camera.main_sensor_resolution)).slice(0, 5);
  const data = { battery: batteryPhones, gaming: gamingPhones, camera: cameraPhones };
  sendJsonResponse(res, data, 900, 1800);
});

// GET /api/home/specialty (TTL 30m; SWR 60m) - DEPRECATED, use individual endpoints
app.get('/specialty', (req, res) => {
  const foldablePhones = allPhones.filter((p) => p.specs.body.form_factor.toLowerCase().includes('fold') || p.specs.body.form_factor.toLowerCase().includes('flip') || p.model.toLowerCase().includes('razr')).slice(0, 5);
  const ruggedPhones = allPhones.filter(p => p.specs.body.rugged_certifications.includes("MIL-STD-810H")).slice(0, 5);
  const uniquePhones = allPhones.filter(p => p.brand === "Nothing" || p.brand === "Asus" || p.brand === "Fairphone" || p.brand === "Sony").slice(0, 5);
  const data = { foldable: foldablePhones, rugged: ruggedPhones, unique: uniquePhones };
  sendJsonResponse(res, data, 1800, 3600);
});

// GET /api/home/quick-compare (TTL 60m; SWR 120m)
app.get('/quick-compare', (req, res) => {
  // Placeholder data
  const data = {};
  sendJsonResponse(res, data, 3600, 7200);
});

// GET /api/home/popular-compares (TTL 60m; SWR 120m)
app.get('/popular-compares', (req, res) => {
  const popularComparisons = [
    ["iPhone 15 Pro Max", "Galaxy S24 Ultra"],
    ["Pixel 8 Pro", "iPhone 15 Pro"],
    ["OnePlus 12", "Xiaomi 14 Ultra"],
    ["Galaxy Z Fold 5", "Pixel Fold"],
    ["Galaxy S24", "Pixel 8 Pro"],
    ["Nothing Phone (2a)", "Motorola Razr+ 2023"],
  ];
  const trendingComparisons = [
      ["Galaxy S24 Ultra", "Xiaomi 14 Ultra"],
      ["iPhone 15 Pro Max", "OnePlus 12"],
      ["Pixel 8 Pro", "Galaxy S24"],
      ["Galaxy Z Flip 5", "Motorola Razr 40 Ultra"],
      ["Asus ROG Phone 8 Pro", "OnePlus 12"],
      ["Sony Xperia 1 VI", "iPhone 15 Pro Max"],
      ["Google Pixel 8 Pro", "Samsung Galaxy S24 Ultra"],
      ["OnePlus 12", "Samsung Galaxy S24"],
      ["Xiaomi 14 Ultra", "iPhone 15 Pro Max"],
  ];
  const data = { popular: popularComparisons, trending: trendingComparisons };
  sendJsonResponse(res, data, 3600, 7200);
});

// GET /api/home/specs-categories (TTL 24h; SWR 48h)
app.get('/specs-categories', (req, res) => {
  const data = [
      { icon: 'Camera', label: 'Best Camera', href: '#' },
      { icon: 'Battery', label: 'Battery Phones', href: '#' },
      { icon: 'Zap', label: 'Fast Charging', href: '#' },
      { icon: 'Gamepad2', label: 'Gaming Phones', href: '#' },
      { icon: null, label: 'Under ₹20K', href: '#' },
      { icon: 'Megaphone', label: '5G Phones', href: '#' },
      { icon: 'Star', label: 'Flagships', href: '#' },
      { icon: 'Smartphone', label: 'Compact Phones', href: '#' },
      { icon: 'Layers', label: 'Expandable Storage', href: '#' },
      { icon: null, label: 'Satellite Phones', href: '#' },
  ];
  sendJsonResponse(res, data, 86400, 172800);
});

// GET /api/home/calendar (TTL 6h; SWR 12h)
app.get('/calendar', (req, res) => {
  const data = [
    { date: "28", month: "AUG", title: "Galaxy S25 India Launch", description: "Expected to be announced online." },
    { date: "05", month: "SEP", title: "Apple iPhone Event", description: "The official reveal of the new iPhone 17 series." }
  ];
  sendJsonResponse(res, data, 21600, 43200);
});

// GET /api/home/news (TTL 15m; SWR 30m)
app.get('/news', (req, res) => {
    const data = [
        { badge: "Deep Dive", title: "iPhone 16 Explained: Everything We Know" },
        { badge: "Industry News", title: "Snapdragon 8 Gen 4: What to Expect" },
        { badge: "Guides", title: "Top Phones to Buy in September" },
    ];
    sendJsonResponse(res, data, 900, 1800);
});

// GET /api/home/blog (TTL 60m; SWR 120m)
app.get('/blog', (req, res) => {
    const data = {
        categories: ["Buying Guides", "Top 10 Phones", "Tips & Tricks", "Industry Insights"],
        posts: [
            { image: "https://picsum.photos/600/400", badge: "Buying Guides", title: "How to Choose the Right Phone for You", excerpt: "A comprehensive guide to navigating the complex world of smartphones." },
            { image: "https://picsum.photos/600/401", badge: "Tips & Tricks", title: "Master Your Phone's Camera: Pro Tips", excerpt: "Unlock the full potential of your smartphone's camera with these expert tips." }
        ]
    };
    sendJsonResponse(res, data, 3600, 7200);
});


export const homeApi = functions.region('asia-south1').https.onRequest(app);
