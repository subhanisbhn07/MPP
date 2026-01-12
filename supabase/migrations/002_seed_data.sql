-- Seed Data Migration
-- Migrates existing phone data from the static data.ts file to Supabase
-- This includes all 25 phones with their complete spec data

-- ============================================
-- SEED BRANDS
-- ============================================
INSERT INTO brands (name, slug, logo_url, country_of_origin) VALUES
    ('Samsung', 'samsung', NULL, 'South Korea'),
    ('Apple', 'apple', NULL, 'United States'),
    ('Google', 'google', NULL, 'United States'),
    ('Motorola', 'motorola', NULL, 'United States'),
    ('Oppo', 'oppo', NULL, 'China'),
    ('Xiaomi', 'xiaomi', NULL, 'China'),
    ('OnePlus', 'oneplus', NULL, 'China'),
    ('Nothing', 'nothing', NULL, 'United Kingdom'),
    ('Asus', 'asus', NULL, 'Taiwan'),
    ('Sony', 'sony', NULL, 'Japan'),
    ('Fairphone', 'fairphone', NULL, 'Netherlands'),
    ('Ulefone', 'ulefone', NULL, 'China'),
    ('CAT', 'cat', NULL, 'United States'),
    ('Vivo', 'vivo', NULL, 'China'),
    ('Realme', 'realme', NULL, 'China'),
    ('Honor', 'honor', NULL, 'China'),
    ('Huawei', 'huawei', NULL, 'China'),
    ('Nokia', 'nokia', NULL, 'Finland'),
    ('LG', 'lg', NULL, 'South Korea'),
    ('ZTE', 'zte', NULL, 'China'),
    ('Tecno', 'tecno', NULL, 'China'),
    ('Infinix', 'infinix', NULL, 'China'),
    ('Poco', 'poco', NULL, 'China'),
    ('iQOO', 'iqoo', NULL, 'China'),
    ('Redmi', 'redmi', NULL, 'China')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SEED PHONES
-- Note: This is a template. The actual phone data will be inserted
-- via the admin panel or data pipeline. Below are sample entries
-- for the first few phones to demonstrate the structure.
-- ============================================

-- Samsung Galaxy S24 Ultra
INSERT INTO phones (brand_id, model, slug, image_url, images, youtube_video_id, price_usd, announced_date, market_status, is_featured, is_trending)
SELECT 
    b.id,
    'Galaxy S24 Ultra',
    'galaxy-s24-ultra',
    'https://picsum.photos/400/500?phone=1',
    '["https://picsum.photos/400/500?phone=1a", "https://picsum.photos/400/500?phone=1b", "https://picsum.photos/400/500?phone=1c", "https://picsum.photos/400/500?phone=1d"]'::jsonb,
    'd6yD3g3bJkY',
    1299,
    '2024-01-17',
    'available',
    true,
    true
FROM brands b WHERE b.slug = 'samsung';

-- Insert specs for Samsung Galaxy S24 Ultra
INSERT INTO phone_specs (phone_id, network, launch, body, display, platform, memory, main_camera, selfie_camera, audio, connectivity, sensors, battery, software, build_quality, thermal_performance, imaging_features, display_extras, gaming_input, wireless_positioning, security, packaging, pricing_retail, value_ratings)
SELECT 
    p.id,
    '{
        "network_technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
        "2g_bands": "GSM 850 / 900 / 1800 / 1900",
        "3g_bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
        "4g_bands": "LTE",
        "5g_bands": "SA/NSA/Sub6/mmWave",
        "5g_mmwave_bands": "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78",
        "esim_support": "Yes, Dual eSIM",
        "sim_slots_and_type": "Nano-SIM and eSIM",
        "dual_sim_mode": "Dual SIM (2 Nano-SIMs and eSIM, dual stand-by)",
        "carrier_aggregation_categories": "DL Cat 20/UL Cat 18",
        "network_speed": "HSPA, LTE-A (CA), 5G",
        "volte_support": "Yes",
        "vowifi": "Yes",
        "nr_ca_support": "Yes"
    }'::jsonb,
    '{
        "announced_date": "2024-01-17",
        "market_status": "Available",
        "regions_available": "Global",
        "model_variants": "SM-S928B, SM-S928U, SM-S928U1, SM-S928N, SM-S928W, SM-S9280",
        "launch_price": "~$1299"
    }'::jsonb,
    '{
        "dimensions_mm": "162.3 x 79 x 8.6",
        "weight_g": "232",
        "build_materials": "Gorilla Armor front/back, titanium frame",
        "frame_material": "Titanium (grade 2)",
        "back_finish": "Matte Glass",
        "colors": "Titanium Black, Gray, Violet, Yellow, Blue, Green, Orange",
        "ip_rating": "IP68 (1.5m for 30 min)",
        "rugged_certifications": "N/A",
        "ingress_gaskets": "Yes",
        "form_factor": "Bar",
        "hinge_type_and_cycles": "N/A",
        "folded_dimensions": "N/A",
        "thermal_solution": "Vapor Chamber",
        "notification_led_alert_slider": "No",
        "haptics_class": "Premium"
    }'::jsonb,
    '{
        "panel_type": "Dynamic LTPO AMOLED 2X",
        "size_inches": "6.8",
        "screen_to_body_ratio_pct": "88.5",
        "resolution_px": "1440 x 3120",
        "aspect_ratio": "19.5:9",
        "pixel_density_ppi": "505",
        "refresh_rate_hz": "120",
        "adaptive_refresh_rate_range": "1-120Hz",
        "touch_sampling_rate_hz": "240",
        "peak_brightness_nits": "2600",
        "hdr_standards": "HDR10+",
        "color_gamut_coverage": "100% DCI-P3",
        "color_depth_bits": "10-bit",
        "pwm_dimming_hz": "480",
        "glass_protection": "Corning Gorilla Armor",
        "oleophobic_coating": "Yes",
        "curvature": "Flat",
        "always_on_display": "Yes",
        "display_driver_ic": "Samsung S6E3XA1",
        "cover_display_specs": "N/A"
    }'::jsonb,
    '{
        "os_at_launch": "Android 14, One UI 6.1",
        "update_policy": "7 years of OS and security updates",
        "chipset": "Qualcomm Snapdragon 8 Gen 3 for Galaxy",
        "cpu_core_layout": "1x3.39 GHz Cortex-X4 & 3x3.1 GHz Cortex-A720 & 2x2.9 GHz Cortex-A720 & 2x2.2 GHz Cortex-A520",
        "gpu_model": "Adreno 750",
        "npu_ai_tops": "N/A",
        "isp_features": "Cognitive ISP",
        "modem_version": "Snapdragon X75",
        "wifi_bluetooth_combo": "Qualcomm FastConnect 7800",
        "thermal_throttling_behavior": "Good",
        "geekbench_single_core": "2200",
        "geekbench_multi_core": "7000",
        "antutu_score": "2100000",
        "3dmark_scores": "Wild Life Extreme: 5000"
    }'::jsonb,
    '{
        "ram_capacities": "12GB",
        "ram_type": "LPDDR5X",
        "storage_capacities": "256GB/512GB/1TB",
        "storage_type": "UFS 4.0",
        "storage_speed": "Read: 4200 MB/s, Write: 2800 MB/s",
        "expandable_storage": "No",
        "slot_type": "N/A",
        "usb_otg_support": "Yes",
        "filesystem_encryption": "FBE"
    }'::jsonb,
    '{
        "rear_camera_count": "4",
        "main_sensor_resolution": "200MP",
        "main_sensor_size_and_pitch": "1/1.3\", 0.6µm",
        "sensor_brand_model": "Samsung ISOCELL HP2",
        "lens_aperture_and_focal_length": "f/1.7, 24mm",
        "ois_type": "Sensor-shift OIS",
        "autofocus_type": "Super Quad Pixel AF, Laser AF",
        "pixel_binning_mode": "16-in-1",
        "ultrawide_camera_specs": "12MP, f/2.2, 13mm, 120˚ FoV, 1/2.55\", 1.4µm, Dual Pixel PDAF",
        "telephoto_specs": "10MP, f/2.4, 67mm (3x optical zoom), OIS; 50MP, f/3.4, 111mm (5x optical zoom), periscope, OIS",
        "macro_tele_macro_specs": "Via Ultrawide",
        "depth_tof_lidar": "No",
        "spectral_flicker_sensors": "Yes",
        "video_resolutions_and_framerates": "8K@24/30fps, 4K@30/60/120fps, 1080p@30/60/240fps, 960fps",
        "video_codecs_profiles": "H.265, H.264, AV1",
        "10bit_hdr_dolby_vision_capture": "HDR10+",
        "slow_motion_modes": "1080p@240fps, 720p@960fps",
        "stabilization_modes": "Super Steady Video",
        "night_mode_computational_features": "Advanced Nightography",
        "raw_pro_controls": "Expert RAW",
        "flash_type": "LED flash"
    }'::jsonb,
    '{
        "front_camera_resolution": "12MP",
        "sensor_size_pixel_pitch": "1/3.2\", 1.12µm",
        "autofocus_ois_on_front": "PDAF",
        "aperture_focal_length": "f/2.2, 26mm",
        "front_ultrawide_second_cam": "No",
        "front_flash_screen_flash": "Screen Flash",
        "front_video_resolutions_fps": "4K@30/60fps, 1080p@30fps",
        "hdr_dolby_vision_selfie": "HDR10+",
        "face_unlock_hardware": "2D"
    }'::jsonb,
    '{
        "loudspeakers": "Stereo speakers",
        "3.5mm_jack": "No",
        "hi_res_audio_support": "32-bit/384kHz audio",
        "spatial_audio_dolby_atmos": "Dolby Atmos",
        "mics_count_and_placement": "3 mics",
        "audio_codecs": "AAC, aptX, aptX HD, LDAC, SSC",
        "dac_amp_details": "Integrated"
    }'::jsonb,
    '{
        "wifi_versions": "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct",
        "wifi_mimo_triband": "Yes, tri-band",
        "bluetooth_version_profiles": "5.3, A2DP, LE",
        "nfc": "Yes",
        "ir_blaster": "No",
        "uwb_support": "Yes",
        "gps_systems": "GPS, GLONASS, BDS, GALILEO, QZSS",
        "dual_band_gnss": "Yes, L1+L5",
        "fm_radio": "No",
        "usb_type_and_speed": "USB Type-C 3.2, DisplayPort 1.2, OTG",
        "displayport_hdmi_out": "Yes (DisplayPort)",
        "esim_profile_capacity": "Multiple"
    }'::jsonb,
    '{
        "fingerprint_type": "Under display, ultrasonic",
        "face_id_3d_depth": "No",
        "accelerometer": "Yes",
        "gyroscope": "Yes",
        "magnetometer": "Yes",
        "proximity_sensor": "Yes",
        "ambient_light_sensor": "Yes",
        "barometer": "Yes",
        "thermometer_hygrometer": "No",
        "uv_sensor": "No",
        "hall_sensor": "Yes",
        "color_temperature_sensor": "Yes",
        "step_counter_health_sensors": "Yes",
        "satellite_sos_modem": "Yes, Two-way via satellite"
    }'::jsonb,
    '{
        "capacity_mah": "5000",
        "battery_type": "Li-Ion",
        "removable_battery": "No",
        "endurance_rating": "126h",
        "wired_charging_wattage": "45W",
        "wired_charging_standard": "PD3.0, PPS",
        "0_50_time_mins": "30",
        "full_charge_time_mins": "65",
        "wireless_charging_wattage": "15W",
        "wireless_standards": "Qi/PMA",
        "reverse_wireless_charging_wattage": "4.5W",
        "reverse_wired_charging": "Yes",
        "charger_in_box": "No",
        "battery_health_features": "Charging protection, Adaptive battery"
    }'::jsonb,
    '{
        "os_version_at_ship": "Android 14",
        "update_window": "7 OS updates, 7 years security",
        "skin_launcher": "One UI 6.1",
        "feature_drops_cadence": "Quarterly",
        "app_twins_second_space": "Dual Messenger, Secure Folder",
        "game_mode_thermal_profiles": "Game Booster",
        "privacy_dashboard_features": "Privacy Dashboard, Permissions Manager",
        "accessibility_features": "Live Caption, Live Transcribe",
        "satellite_messaging_ui": "Integrated in messaging app"
    }'::jsonb,
    '{
        "drop_resistance": "Improved with Gorilla Armor",
        "scratch_resistance": "Improved with Gorilla Armor",
        "dust_water_ingress_specifics": "IP68 up to 1.5m for 30 mins",
        "temperature_operating_range": "0-35°C",
        "button_actuation_cycles": "200,000+",
        "port_wear_tests": "5,000+ cycles"
    }'::jsonb,
    '{
        "sustained_performance_pct": "85%",
        "surface_temps_under_load": "~42°C",
        "throttle_curve_characterization": "Gradual"
    }'::jsonb,
    '{
        "multi_frame_hdr_versions": "Super HDR",
        "night_mode_gen_algorithms": "Nightography v4",
        "portrait_pipeline": "AI Stereo Depth Map",
        "astro_milky_way_modes": "Astrophotography",
        "macro_focus_distance": "3cm",
        "sensor_crop_2x_lossless_mode": "In-sensor zoom",
        "video_hdr_curves": "HDR10+",
        "log_profiles_and_lut_export": "Pro Video mode",
        "audio_zoom_wind_filter": "Audio Zoom"
    }'::jsonb,
    '{
        "dc_dimming_toggle": "Extra dimming option",
        "anti_flicker_mode": "Yes, at high frequency",
        "color_profiles": "Vivid, Natural",
        "truetone_ambient_white_balance": "Adaptive color tone",
        "glove_mode_high_brightness_mode": "Vision Booster"
    }'::jsonb,
    '{
        "touch_sampling_peak_hz": "240Hz",
        "shoulder_triggers": "No",
        "game_plugins": "Game Plugins from Galaxy Store",
        "haptic_latency_profile": "Low",
        "frame_interpolation_memc": "No"
    }'::jsonb,
    '{
        "wifi_7_features": "MLO, 320MHz channels",
        "bluetooth_le_audio_lc3_opus": "LE Audio, LC3",
        "uwb_use_cases": "Digital Key, SmartTag",
        "dual_frequency_gnss": "L1+L5",
        "rtk_precision_positioning_support": "No"
    }'::jsonb,
    '{
        "biometric_class": "Class 3 (Strong)",
        "secure_enclave_tee_version": "Knox Vault",
        "firmware_integrity_verified_boot": "Yes",
        "esim_profiles_security": "GSMA SGP.22",
        "sos_satellite_emergency_stack": "Qualcomm Satellite"
    }'::jsonb,
    '{
        "in_box_contents": "Phone, USB-C Cable, SIM Ejector",
        "recycled_materials_pct": "~20%",
        "repairability_score_modularity": "8.2/10",
        "warranty_length_accidental_plans": "1 year standard, Samsung Care+"
    }'::jsonb,
    '{
        "msrp_by_sku_region": "$1299 (256GB, US), €1449 (256GB, EU)",
        "street_price_trend": "Stable",
        "retailer_links": "Samsung.com, BestBuy, Amazon",
        "finance_emi_availability": "Yes"
    }'::jsonb,
    '{
        "overall_spec_score": "9.5/10",
        "category_scores": "Performance: 9, Display: 10, Camera: 10, Battery: 9, Build: 10, Connectivity: 10",
        "value_index": "High",
        "update_value": "Excellent"
    }'::jsonb
FROM phones p
JOIN brands b ON p.brand_id = b.id
WHERE p.slug = 'galaxy-s24-ultra' AND b.slug = 'samsung';

-- Apple iPhone 15 Pro
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status, is_featured, is_trending)
SELECT 
    b.id,
    'iPhone 15 Pro',
    'iphone-15-pro',
    'https://picsum.photos/400/500?phone=2',
    '["https://picsum.photos/400/500?phone=2a", "https://picsum.photos/400/500?phone=2b", "https://picsum.photos/400/500?phone=2c", "https://picsum.photos/400/500?phone=2d"]'::jsonb,
    999,
    '2023-09-12',
    'available',
    true,
    true
FROM brands b WHERE b.slug = 'apple';

-- Google Pixel 8 Pro
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status, is_featured, is_trending)
SELECT 
    b.id,
    'Pixel 8 Pro',
    'pixel-8-pro',
    'https://picsum.photos/400/500?phone=3',
    '["https://picsum.photos/400/500?phone=3a", "https://picsum.photos/400/500?phone=3b", "https://picsum.photos/400/500?phone=3c", "https://picsum.photos/400/500?phone=3d"]'::jsonb,
    999,
    '2023-10-04',
    'available',
    true,
    true
FROM brands b WHERE b.slug = 'google';

-- Samsung Galaxy Z Fold 5
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status, is_featured)
SELECT 
    b.id,
    'Galaxy Z Fold 5',
    'galaxy-z-fold-5',
    'https://picsum.photos/400/500?phone=4',
    '["https://picsum.photos/400/500?phone=4a", "https://picsum.photos/400/500?phone=4b"]'::jsonb,
    1799,
    '2023-07-26',
    'available',
    true
FROM brands b WHERE b.slug = 'samsung';

-- Samsung Galaxy Z Flip 5
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Galaxy Z Flip 5',
    'galaxy-z-flip-5',
    'https://picsum.photos/400/500?phone=5',
    '["https://picsum.photos/400/500?phone=5a", "https://picsum.photos/400/500?phone=5b"]'::jsonb,
    999,
    '2023-07-26',
    'available'
FROM brands b WHERE b.slug = 'samsung';

-- Google Pixel Fold
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Pixel Fold',
    'pixel-fold',
    'https://picsum.photos/400/500?phone=6',
    '["https://picsum.photos/400/500?phone=6a", "https://picsum.photos/400/500?phone=6b"]'::jsonb,
    1799,
    '2023-05-10',
    'available'
FROM brands b WHERE b.slug = 'google';

-- Motorola Razr+ 2023
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Razr+ 2023',
    'razr-plus-2023',
    'https://picsum.photos/400/500?phone=7',
    '["https://picsum.photos/400/500?phone=7a", "https://picsum.photos/400/500?phone=7b"]'::jsonb,
    999,
    '2023-06-01',
    'available'
FROM brands b WHERE b.slug = 'motorola';

-- Oppo Find N3
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Find N3',
    'find-n3',
    'https://picsum.photos/400/500?phone=8',
    '["https://picsum.photos/400/500?phone=8a", "https://picsum.photos/400/500?phone=8b"]'::jsonb,
    1899,
    '2023-10-19',
    'available'
FROM brands b WHERE b.slug = 'oppo';

-- Xiaomi 14 Ultra
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status, is_featured)
SELECT 
    b.id,
    '14 Ultra',
    '14-ultra',
    'https://picsum.photos/400/500?phone=9',
    '["https://picsum.photos/400/500?phone=9a", "https://picsum.photos/400/500?phone=9b"]'::jsonb,
    1199,
    '2024-02-22',
    'available',
    true
FROM brands b WHERE b.slug = 'xiaomi';

-- OnePlus 12
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status, is_featured)
SELECT 
    b.id,
    '12',
    'oneplus-12',
    'https://picsum.photos/400/500?phone=10',
    '["https://picsum.photos/400/500?phone=10a", "https://picsum.photos/400/500?phone=10b"]'::jsonb,
    799,
    '2024-01-23',
    'available',
    true
FROM brands b WHERE b.slug = 'oneplus';

-- Nothing Phone (2a)
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Phone (2a)',
    'phone-2a',
    'https://picsum.photos/400/500?phone=11',
    '["https://picsum.photos/400/500?phone=11a", "https://picsum.photos/400/500?phone=11b"]'::jsonb,
    349,
    '2024-03-05',
    'available'
FROM brands b WHERE b.slug = 'nothing';

-- Asus ROG Phone 8 Pro
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'ROG Phone 8 Pro',
    'rog-phone-8-pro',
    'https://picsum.photos/400/500?phone=12',
    '["https://picsum.photos/400/500?phone=12a", "https://picsum.photos/400/500?phone=12b"]'::jsonb,
    1199,
    '2024-01-08',
    'available'
FROM brands b WHERE b.slug = 'asus';

-- Sony Xperia 1 VI
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Xperia 1 VI',
    'xperia-1-vi',
    'https://picsum.photos/400/500?phone=13',
    '["https://picsum.photos/400/500?phone=13a", "https://picsum.photos/400/500?phone=13b"]'::jsonb,
    1399,
    '2024-05-15',
    'available'
FROM brands b WHERE b.slug = 'sony';

-- Fairphone 5
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    '5',
    'fairphone-5',
    'https://picsum.photos/400/500?phone=14',
    '["https://picsum.photos/400/500?phone=14a", "https://picsum.photos/400/500?phone=14b"]'::jsonb,
    750,
    '2023-08-30',
    'available'
FROM brands b WHERE b.slug = 'fairphone';

-- Ulefone Armor 23 Ultra
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Armor 23 Ultra',
    'armor-23-ultra',
    'https://picsum.photos/400/500?phone=15',
    '["https://picsum.photos/400/500?phone=15a", "https://picsum.photos/400/500?phone=15b"]'::jsonb,
    600,
    '2024-01-15',
    'available'
FROM brands b WHERE b.slug = 'ulefone';

-- CAT S75
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'S75',
    's75',
    'https://picsum.photos/400/500?phone=16',
    '["https://picsum.photos/400/500?phone=16a", "https://picsum.photos/400/500?phone=16b"]'::jsonb,
    650,
    '2023-02-27',
    'available'
FROM brands b WHERE b.slug = 'cat';

-- Apple iPhone 15 Pro Max
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status, is_featured, is_trending)
SELECT 
    b.id,
    'iPhone 15 Pro Max',
    'iphone-15-pro-max',
    'https://picsum.photos/400/500?phone=17',
    '["https://picsum.photos/400/500?phone=17a", "https://picsum.photos/400/500?phone=17b"]'::jsonb,
    1199,
    '2023-09-12',
    'available',
    true,
    true
FROM brands b WHERE b.slug = 'apple';

-- Samsung Galaxy S24
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Galaxy S24',
    'galaxy-s24',
    'https://picsum.photos/400/500?phone=18',
    '["https://picsum.photos/400/500?phone=18a", "https://picsum.photos/400/500?phone=18b"]'::jsonb,
    799,
    '2024-01-17',
    'available'
FROM brands b WHERE b.slug = 'samsung';

-- Oppo Find N3 Flip
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Find N3 Flip',
    'find-n3-flip',
    'https://picsum.photos/400/500?phone=19',
    '["https://picsum.photos/400/500?phone=19a", "https://picsum.photos/400/500?phone=19b"]'::jsonb,
    1099,
    '2023-08-29',
    'available'
FROM brands b WHERE b.slug = 'oppo';

-- Motorola Razr 40 Ultra
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'Razr 40 Ultra',
    'razr-40-ultra',
    'https://picsum.photos/400/500?phone=20',
    '["https://picsum.photos/400/500?phone=20a", "https://picsum.photos/400/500?phone=20b"]'::jsonb,
    999,
    '2023-06-01',
    'available'
FROM brands b WHERE b.slug = 'motorola';

-- Apple iPhone 15
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'iPhone 15',
    'iphone-15',
    'https://picsum.photos/400/500?phone=21',
    '["https://picsum.photos/400/500?phone=21a", "https://picsum.photos/400/500?phone=21b"]'::jsonb,
    799,
    '2023-09-12',
    'available'
FROM brands b WHERE b.slug = 'apple';

-- Apple iPhone 14 Pro
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'iPhone 14 Pro',
    'iphone-14-pro',
    'https://picsum.photos/400/500?phone=22',
    '["https://picsum.photos/400/500?phone=22a", "https://picsum.photos/400/500?phone=22b"]'::jsonb,
    899,
    '2022-09-07',
    'available'
FROM brands b WHERE b.slug = 'apple';

-- Apple iPhone 14
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'iPhone 14',
    'iphone-14',
    'https://picsum.photos/400/500?phone=23',
    '["https://picsum.photos/400/500?phone=23a", "https://picsum.photos/400/500?phone=23b"]'::jsonb,
    699,
    '2022-09-07',
    'available'
FROM brands b WHERE b.slug = 'apple';

-- Apple iPhone SE (2022)
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'iPhone SE (2022)',
    'iphone-se-2022',
    'https://picsum.photos/400/500?phone=24',
    '["https://picsum.photos/400/500?phone=24a", "https://picsum.photos/400/500?phone=24b"]'::jsonb,
    429,
    '2022-03-08',
    'available'
FROM brands b WHERE b.slug = 'apple';

-- Apple iPhone 13
INSERT INTO phones (brand_id, model, slug, image_url, images, price_usd, announced_date, market_status)
SELECT 
    b.id,
    'iPhone 13',
    'iphone-13',
    'https://picsum.photos/400/500?phone=25',
    '["https://picsum.photos/400/500?phone=25a", "https://picsum.photos/400/500?phone=25b"]'::jsonb,
    599,
    '2021-09-14',
    'available'
FROM brands b WHERE b.slug = 'apple';

-- ============================================
-- ASSIGN CATEGORIES TO PHONES
-- ============================================

-- Flagship phones
INSERT INTO phone_categories (phone_id, category_id)
SELECT p.id, c.id FROM phones p, categories c
WHERE p.slug IN ('galaxy-s24-ultra', 'iphone-15-pro', 'iphone-15-pro-max', 'pixel-8-pro', '14-ultra', 'oneplus-12', 'xperia-1-vi')
AND c.slug = 'flagship-phones';

-- Gaming phones
INSERT INTO phone_categories (phone_id, category_id)
SELECT p.id, c.id FROM phones p, categories c
WHERE p.slug IN ('rog-phone-8-pro', 'galaxy-s24-ultra', 'oneplus-12')
AND c.slug = 'best-gaming-phones';

-- Camera phones
INSERT INTO phone_categories (phone_id, category_id)
SELECT p.id, c.id FROM phones p, categories c
WHERE p.slug IN ('galaxy-s24-ultra', 'iphone-15-pro-max', 'pixel-8-pro', '14-ultra', 'xperia-1-vi')
AND c.slug = 'best-camera-phones';

-- Foldable phones
INSERT INTO phone_categories (phone_id, category_id)
SELECT p.id, c.id FROM phones p, categories c
WHERE p.slug IN ('galaxy-z-fold-5', 'galaxy-z-flip-5', 'pixel-fold', 'razr-plus-2023', 'razr-40-ultra', 'find-n3', 'find-n3-flip')
AND c.slug = 'foldable-phones';

-- Budget phones
INSERT INTO phone_categories (phone_id, category_id)
SELECT p.id, c.id FROM phones p, categories c
WHERE p.slug IN ('phone-2a', 'iphone-se-2022', 'iphone-13')
AND c.slug = 'budget-phones';

-- iOS phones
INSERT INTO phone_categories (phone_id, category_id)
SELECT p.id, c.id FROM phones p, categories c
WHERE p.slug LIKE 'iphone%'
AND c.slug = 'ios-phones';

-- Android phones
INSERT INTO phone_categories (phone_id, category_id)
SELECT p.id, c.id FROM phones p, categories c
WHERE p.slug NOT LIKE 'iphone%'
AND c.slug = 'android-phones';

-- 5G phones (all modern phones)
INSERT INTO phone_categories (phone_id, category_id)
SELECT p.id, c.id FROM phones p, categories c
WHERE c.slug = '5g-phones';

-- Rugged phones
INSERT INTO phone_categories (phone_id, category_id)
SELECT p.id, c.id FROM phones p, categories c
WHERE p.slug IN ('armor-23-ultra', 's75', 'fairphone-5')
AND c.slug = 'rugged-phones';
