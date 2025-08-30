
export type SpecCategory = {
  title: string;
  category: keyof PhoneSpec;
  specs: {
    key: string;
    label: string;
    priority: number;
  }[];
};

export type PhoneSpec = {
  network: {
    network_technology: string;
    '2g_bands': string;
    '3g_bands': string;
    '4g_bands': string;
    '5g_bands': string;
    '5g_mmwave_bands': string;
    esim_support: string;
    sim_slots_and_type: string;
    dual_sim_mode: string;
    carrier_aggregation_categories: string;
    network_speed: string;
    volte_support: string;
    vowifi: string;
    nr_ca_support: string;
  };
  launch: {
    announced_date: string;
    market_status: string;
    regions_available: string;
    model_variants: string;
    launch_price: string;
  };
  body: {
    dimensions_mm: string;
    weight_g: string;
    build_materials: string;
    frame_material: string;
    back_finish: string;
    colors: string;
    ip_rating: string;
    rugged_certifications: string;
    ingress_gaskets: string;
    form_factor: string;
    hinge_type_and_cycles: string;
    folded_dimensions: string;
    thermal_solution: string;
    notification_led_alert_slider: string;
    haptics_class: string;
  };
  display: {
    panel_type: string;
    size_inches: string;
    screen_to_body_ratio_pct: string;
    resolution_px: string;
    aspect_ratio: string;
    pixel_density_ppi: string;
    refresh_rate_hz: string;
    adaptive_refresh_rate_range: string;
    touch_sampling_rate_hz: string;
    peak_brightness_nits: string;
    hdr_standards: string;
    color_gamut_coverage: string;
    color_depth_bits: string;
    pwm_dimming_hz: string;
    glass_protection: string;
    oleophobic_coating: string;
    curvature: string;
    always_on_display: string;
    display_driver_ic: string;
    cover_display_specs: string;
  };
  platform: {
    os_at_launch: string;
    update_policy: string;
    chipset: string;
    cpu_core_layout: string;
    gpu_model: string;
    npu_ai_tops: string;
    isp_features: string;
    modem_version: string;
    wifi_bluetooth_combo: string;
    thermal_throttling_behavior: string;
    geekbench_single_core: string;
    geekbench_multi_core: string;
    antutu_score: string;
    '3dmark_scores': string;
  };
  memory: {
    ram_capacities: string;
    ram_type: string;
    storage_capacities: string;
    storage_type: string;
    storage_speed: string;
    expandable_storage: string;
    slot_type: string;
    usb_otg_support: string;
    filesystem_encryption: string;
  };
  main_camera: {
    rear_camera_count: string;
    main_sensor_resolution: string;
    main_sensor_size_and_pitch: string;
    sensor_brand_model: string;
    lens_aperture_and_focal_length: string;
    ois_type: string;
    autofocus_type: string;
    pixel_binning_mode: string;
    ultrawide_camera_specs: string;
    telephoto_specs: string;
    macro_tele_macro_specs: string;
    depth_tof_lidar: string;
    spectral_flicker_sensors: string;
    video_resolutions_and_framerates: string;
    video_codecs_profiles: string;
    '10bit_hdr_dolby_vision_capture': string;
    slow_motion_modes: string;
    stabilization_modes: string;
    night_mode_computational_features: string;
    raw_pro_controls: string;
    flash_type: string;
  };
  selfie_camera: {
    front_camera_resolution: string;
    sensor_size_pixel_pitch: string;
    autofocus_ois_on_front: string;
    aperture_focal_length: string;
    front_ultrawide_second_cam: string;
    front_flash_screen_flash: string;
    front_video_resolutions_fps: string;
    hdr_dolby_vision_selfie: string;
    face_unlock_hardware: string;
  };
  audio: {
    loudspeakers: string;
    '3.5mm_jack': string;
    hi_res_audio_support: string;
    spatial_audio_dolby_atmos: string;
    mics_count_and_placement: string;
    audio_codecs: string;
    dac_amp_details: string;
  };
  connectivity: {
    wifi_versions: string;
    wifi_mimo_triband: string;
    bluetooth_version_profiles: string;
    nfc: string;
    ir_blaster: string;
    uwb_support: string;
    gps_systems: string;
    dual_band_gnss: string;
    fm_radio: string;
    usb_type_and_speed: string;
    displayport_hdmi_out: string;
    esim_profile_capacity: string;
  };
  sensors: {
    fingerprint_type: string;
    face_id_3d_depth: string;
    accelerometer: string;
    gyroscope: string;
    magnetometer: string;
    proximity_sensor: string;
    ambient_light_sensor: string;
    barometer: string;
    thermometer_hygrometer: string;
    uv_sensor: string;
    hall_sensor: string;
    color_temperature_sensor: string;
    step_counter_health_sensors: string;
    satellite_sos_modem: string;
  };
  battery: {
    capacity_mah: string;
    battery_type: string;
    removable_battery: string;
    endurance_rating: string;
    wired_charging_wattage: string;
    wired_charging_standard: string;
    '0_50_time_mins': string;
    full_charge_time_mins: string;
    wireless_charging_wattage: string;
    wireless_standards: string;
    reverse_wireless_charging_wattage: string;
    reverse_wired_charging: string;
    charger_in_box: string;
    battery_health_features: string;
  };
  software: {
    os_version_at_ship: string;
    update_window: string;
    skin_launcher: string;
    feature_drops_cadence: string;
    app_twins_second_space: string;
    game_mode_thermal_profiles: string;
    privacy_dashboard_features: string;
    accessibility_features: string;
    satellite_messaging_ui: string;
  };
  build_quality: {
    drop_resistance: string;
    scratch_resistance: string;
    dust_water_ingress_specifics: string;
    temperature_operating_range: string;
    button_actuation_cycles: string;
    port_wear_tests: string;
  };
  thermal_performance: {
    sustained_performance_pct: string;
    surface_temps_under_load: string;
    throttle_curve_characterization: string;
  };
  imaging_features: {
    multi_frame_hdr_versions: string;
    night_mode_gen_algorithms: string;
    portrait_pipeline: string;
    astro_milky_way_modes: string;
    macro_focus_distance: string;
    sensor_crop_2x_lossless_mode: string;
    video_hdr_curves: string;
    log_profiles_and_lut_export: string;
    audio_zoom_wind_filter: string;
  };
  display_extras: {
    dc_dimming_toggle: string;
    anti_flicker_mode: string;
    color_profiles: string;
    truetone_ambient_white_balance: string;
    glove_mode_high_brightness_mode: string;
  };
  gaming_input: {
    touch_sampling_peak_hz: string;
    shoulder_triggers: string;
    game_plugins: string;
    haptic_latency_profile: string;
    frame_interpolation_memc: string;
  };
  wireless_positioning: {
    wifi_7_features: string;
    bluetooth_le_audio_lc3_opus: string;
    uwb_use_cases: string;
    dual_frequency_gnss: string;
    rtk_precision_positioning_support: string;
  };
  security: {
    biometric_class: string;
    secure_enclave_tee_version: string;
    firmware_integrity_verified_boot: string;
    esim_profiles_security: string;
    sos_satellite_emergency_stack: string;
  };
  packaging: {
    in_box_contents: string;
    recycled_materials_pct: string;
    repairability_score_modularity: string;
    warranty_length_accidental_plans: string;
  };
  pricing_retail: {
    msrp_by_sku_region: string;
    street_price_trend: string;
    retailer_links: string;
    finance_emi_availability: string;
  };
  value_ratings: {
    overall_spec_score: string;
    category_scores: string;
    value_index: string;
    update_value: string;
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

export const specCategoryGroups: SpecCategory[] = [
    {
        title: 'Network',
        category: 'network',
        specs: [
            { key: 'network_technology', label: 'Technology', priority: 1 },
            { key: '2g_bands', label: '2G Bands', priority: 2 },
            { key: '3g_bands', label: '3G Bands', priority: 2 },
            { key: '4g_bands', label: '4G LTE Bands', priority: 2 },
            { key: '5g_bands', label: '5G Sub-6 Bands', priority: 2 },
            { key: '5g_mmwave_bands', label: '5G mmWave Bands', priority: 2 },
            { key: 'network_speed', label: 'Speed', priority: 1 },
            { key: 'carrier_aggregation_categories', label: 'Carrier Aggregation', priority: 3 },
            { key: 'sim_slots_and_type', label: 'SIM', priority: 1 },
            { key: 'dual_sim_mode', label: 'Dual SIM Mode', priority: 2 },
            { key: 'esim_support', label: 'eSIM Support', priority: 1 },
            { key: 'volte_support', label: 'VoLTE Support', priority: 2 },
            { key: 'vowifi', label: 'VoWiFi', priority: 2 },
            { key: 'nr_ca_support', label: 'NR CA Support', priority: 3 },
        ],
    },
    {
        title: 'Launch',
        category: 'launch',
        specs: [
            { key: 'announced_date', label: 'Announced', priority: 1 },
            { key: 'market_status', label: 'Status', priority: 1 },
            { key: 'regions_available', label: 'Availability', priority: 2 },
            { key: 'model_variants', label: 'Model Variants', priority: 3 },
            { key: 'launch_price', label: 'Launch Price', priority: 1 },
        ],
    },
    {
        title: 'Body & Design',
        category: 'body',
        specs: [
            { key: 'dimensions_mm', label: 'Dimensions (mm)', priority: 1 },
            { key: 'weight_g', label: 'Weight (g)', priority: 1 },
            { key: 'build_materials', label: 'Build Materials', priority: 1 },
            { key: 'frame_material', label: 'Frame', priority: 2 },
            { key: 'back_finish', label: 'Back Finish', priority: 2 },
            { key: 'colors', label: 'Colors', priority: 1 },
            { key: 'ip_rating', label: 'IP Rating', priority: 1 },
            { key: 'rugged_certifications', label: 'Rugged Certifications', priority: 2 },
            { key: 'ingress_gaskets', label: 'Ingress Gaskets', priority: 3 },
            { key: 'form_factor', label: 'Form Factor', priority: 1 },
            { key: 'hinge_type_and_cycles', label: 'Hinge Type', priority: 2 },
            { key: 'folded_dimensions', label: 'Folded Dimensions', priority: 2 },
            { key: 'thermal_solution', label: 'Thermal Solution', priority: 2 },
            { key: 'notification_led_alert_slider', label: 'Notification/Alert', priority: 2 },
            { key: 'haptics_class', label: 'Haptics', priority: 2 },
        ],
    },
    {
        title: 'Display',
        category: 'display',
        specs: [
            { key: 'panel_type', label: 'Panel Type', priority: 1 },
            { key: 'size_inches', label: 'Size (inches)', priority: 1 },
            { key: 'resolution_px', label: 'Resolution (px)', priority: 1 },
            { key: 'aspect_ratio', label: 'Aspect Ratio', priority: 2 },
            { key: 'pixel_density_ppi', label: 'Pixel Density (ppi)', priority: 1 },
            { key: 'screen_to_body_ratio_pct', label: 'Screen-to-body Ratio (%)', priority: 2 },
            { key: 'refresh_rate_hz', label: 'Refresh Rate (Hz)', priority: 1 },
            { key: 'adaptive_refresh_rate_range', label: 'Adaptive Refresh Rate', priority: 2 },
            { key: 'touch_sampling_rate_hz', label: 'Touch Sampling Rate (Hz)', priority: 2 },
            { key: 'peak_brightness_nits', label: 'Peak Brightness (nits)', priority: 1 },
            { key: 'hdr_standards', label: 'HDR Standards', priority: 1 },
            { key: 'color_gamut_coverage', label: 'Color Gamut', priority: 2 },
            { key: 'color_depth_bits', label: 'Color Depth', priority: 2 },
            { key: 'pwm_dimming_hz', label: 'PWM Dimming (Hz)', priority: 3 },
            { key: 'glass_protection', label: 'Glass Protection', priority: 1 },
            { key: 'oleophobic_coating', label: 'Oleophobic Coating', priority: 3 },
            { key: 'curvature', label: 'Curvature', priority: 2 },
            { key: 'always_on_display', label: 'Always-on Display', priority: 1 },
            { key: 'display_driver_ic', label: 'Display Driver IC', priority: 3 },
            { key: 'cover_display_specs', label: 'Cover Display', priority: 2 },
        ],
    },
    {
        title: 'Platform (SoC)',
        category: 'platform',
        specs: [
            { key: 'os_at_launch', label: 'OS at Launch', priority: 1 },
            { key: 'update_policy', label: 'Update Policy', priority: 1 },
            { key: 'chipset', label: 'Chipset', priority: 1 },
            { key: 'cpu_core_layout', label: 'CPU', priority: 1 },
            { key: 'gpu_model', label: 'GPU', priority: 1 },
            { key: 'npu_ai_tops', label: 'NPU/AI TOPs', priority: 2 },
            { key: 'isp_features', label: 'ISP Features', priority: 3 },
            { key: 'modem_version', label: 'Modem', priority: 2 },
            { key: 'wifi_bluetooth_combo', label: 'Wi-Fi/Bluetooth Chip', priority: 3 },
            { key: 'thermal_throttling_behavior', label: 'Throttling Behavior', priority: 2 },
            { key: 'geekbench_single_core', label: 'Geekbench Single-Core', priority: 2 },
            { key: 'geekbench_multi_core', label: 'Geekbench Multi-Core', priority: 2 },
            { key: 'antutu_score', label: 'AnTuTu Score', priority: 2 },
            { key: '3dmark_scores', label: '3DMark Scores', priority: 2 },
        ],
    },
    {
        title: 'Memory & Storage',
        category: 'memory',
        specs: [
            { key: 'ram_capacities', label: 'RAM', priority: 1 },
            { key: 'ram_type', label: 'RAM Type', priority: 1 },
            { key: 'storage_capacities', label: 'Storage', priority: 1 },
            { key: 'storage_type', label: 'Storage Type', priority: 1 },
            { key: 'storage_speed', label: 'Storage Speed', priority: 2 },
            { key: 'expandable_storage', label: 'Expandable Storage', priority: 1 },
            { key: 'slot_type', label: 'Slot Type', priority: 2 },
            { key: 'usb_otg_support', label: 'USB OTG', priority: 2 },
            { key: 'filesystem_encryption', label: 'Filesystem Encryption', priority: 3 },
        ],
    },
    {
        title: 'Main Camera System',
        category: 'main_camera',
        specs: [
            { key: 'rear_camera_count', label: 'Rear Cameras', priority: 1 },
            { key: 'main_sensor_resolution', label: 'Main Sensor', priority: 1 },
            { key: 'main_sensor_size_and_pitch', label: 'Main Sensor Size', priority: 2 },
            { key: 'sensor_brand_model', label: 'Main Sensor Model', priority: 2 },
            { key: 'lens_aperture_and_focal_length', label: 'Main Lens', priority: 1 },
            { key: 'ois_type', label: 'OIS', priority: 1 },
            { key: 'autofocus_type', label: 'Autofocus', priority: 1 },
            { key: 'pixel_binning_mode', label: 'Pixel Binning', priority: 2 },
            { key: 'ultrawide_camera_specs', label: 'Ultrawide', priority: 1 },
            { key: 'telephoto_specs', label: 'Telephoto', priority: 1 },
            { key: 'macro_tele_macro_specs', label: 'Macro', priority: 2 },
            { key: 'depth_tof_lidar', label: 'Depth/ToF/LiDAR', priority: 2 },
            { key: 'spectral_flicker_sensors', label: 'Flicker/Color Sensors', priority: 3 },
            { key: 'flash_type', label: 'Flash', priority: 2 },
            { key: 'video_resolutions_and_framerates', label: 'Video Resolution', priority: 1 },
            { key: '10bit_hdr_dolby_vision_capture', label: 'HDR/Dolby Vision Video', priority: 1 },
            { key: 'video_codecs_profiles', label: 'Video Codecs', priority: 3 },
            { key: 'slow_motion_modes', label: 'Slow Motion', priority: 2 },
            { key: 'stabilization_modes', label: 'Video Stabilization', priority: 1 },
            { key: 'night_mode_computational_features', label: 'Night Mode Features', priority: 2 },
            { key: 'raw_pro_controls', label: 'RAW/Pro Controls', priority: 2 },
        ],
    },
    {
        title: 'Selfie Camera',
        category: 'selfie_camera',
        specs: [
            { key: 'front_camera_resolution', label: 'Resolution', priority: 1 },
            { key: 'sensor_size_pixel_pitch', label: 'Sensor Size', priority: 2 },
            { key: 'aperture_focal_length', label: 'Aperture', priority: 1 },
            { key: 'autofocus_ois_on_front', label: 'AF/OIS', priority: 1 },
            { key: 'front_ultrawide_second_cam', label: 'Secondary Front Cam', priority: 2 },
            { key: 'front_flash_screen_flash', label: 'Front Flash', priority: 2 },
            { key: 'front_video_resolutions_fps', label: 'Video', priority: 1 },
            { key: 'hdr_dolby_vision_selfie', label: 'HDR/Dolby Vision', priority: 2 },
            { key: 'face_unlock_hardware', label: 'Face Unlock', priority: 1 },
        ],
    },
    {
        title: 'Audio',
        category: 'audio',
        specs: [
            { key: 'loudspeakers', label: 'Loudspeakers', priority: 1 },
            { key: '3.5mm_jack', label: '3.5mm Jack', priority: 1 },
            { key: 'hi_res_audio_support', label: 'Hi-Res Audio', priority: 1 },
            { key: 'spatial_audio_dolby_atmos', label: 'Spatial Audio / Dolby Atmos', priority: 1 },
            { key: 'mics_count_and_placement', label: 'Microphones', priority: 2 },
            { key: 'audio_codecs', label: 'Bluetooth Codecs', priority: 2 },
            { key: 'dac_amp_details', label: 'DAC/Amp', priority: 3 },
        ],
    },
    {
        title: 'Connectivity',
        category: 'connectivity',
        specs: [
            { key: 'wifi_versions', label: 'Wi-Fi', priority: 1 },
            { key: 'wifi_mimo_triband', label: 'Wi-Fi Features', priority: 2 },
            { key: 'bluetooth_version_profiles', label: 'Bluetooth', priority: 1 },
            { key: 'nfc', label: 'NFC', priority: 1 },
            { key: 'ir_blaster', label: 'IR Blaster', priority: 2 },
            { key: 'uwb_support', label: 'UWB', priority: 1 },
            { key: 'gps_systems', label: 'Positioning', priority: 1 },
            { key: 'dual_band_gnss', label: 'Dual-Band GNSS', priority: 2 },
            { key: 'fm_radio', label: 'FM Radio', priority: 3 },
            { key: 'usb_type_and_speed', label: 'USB', priority: 1 },
            { key: 'displayport_hdmi_out', label: 'Display Out', priority: 1 },
            { key: 'esim_profile_capacity', label: 'eSIM Capacity', priority: 3 },
        ],
    },
    {
        title: 'Sensors',
        category: 'sensors',
        specs: [
            { key: 'fingerprint_type', label: 'Fingerprint Sensor', priority: 1 },
            { key: 'face_id_3d_depth', label: '3D Face ID', priority: 2 },
            { key: 'accelerometer', label: 'Accelerometer', priority: 3 },
            { key: 'gyroscope', label: 'Gyroscope', priority: 3 },
            { key: 'magnetometer', label: 'Magnetometer', priority: 3 },
            { key: 'proximity_sensor', label: 'Proximity Sensor', priority: 3 },
            { key: 'ambient_light_sensor', label: 'Ambient Light', priority: 3 },
            { key: 'barometer', label: 'Barometer', priority: 2 },
            { key: 'thermometer_hygrometer', label: 'Thermo/Hygrometer', priority: 2 },
            { key: 'uv_sensor', label: 'UV Sensor', priority: 3 },
            { key: 'hall_sensor', label: 'Hall Sensor', priority: 3 },
            { key: 'color_temperature_sensor', label: 'Color Temp Sensor', priority: 2 },
            { key: 'step_counter_health_sensors', label: 'Health Sensors', priority: 2 },
            { key: 'satellite_sos_modem', label: 'Satellite SOS', priority: 1 },
        ],
    },
    {
        title: 'Battery & Charging',
        category: 'battery',
        specs: [
            { key: 'capacity_mah', label: 'Capacity (mAh)', priority: 1 },
            { key: 'battery_type', label: 'Type', priority: 2 },
            { key: 'removable_battery', label: 'Removable', priority: 2 },
            { key: 'endurance_rating', label: 'Endurance Rating', priority: 2 },
            { key: 'wired_charging_wattage', label: 'Wired Charging', priority: 1 },
            { key: 'wired_charging_standard', label: 'Wired Standard', priority: 2 },
            { key: '0_50_time_mins', label: '0-50% Time (mins)', priority: 1 },
            { key: 'full_charge_time_mins', label: 'Full Charge Time', priority: 1 },
            { key: 'wireless_charging_wattage', label: 'Wireless Charging', priority: 1 },
            { key: 'wireless_standards', label: 'Wireless Standard', priority: 2 },
            { key: 'reverse_wireless_charging_wattage', label: 'Reverse Wireless', priority: 1 },
            { key: 'reverse_wired_charging', label: 'Reverse Wired', priority: 2 },
            { key: 'charger_in_box', label: 'Charger in Box', priority: 1 },
            { key: 'battery_health_features', label: 'Battery Health Features', priority: 2 },
        ],
    },
    {
      title: 'Software',
      category: 'software',
      specs: [
        { key: 'os_version_at_ship', label: 'OS at Launch', priority: 1 },
        { key: 'update_window', label: 'Update Window', priority: 1 },
        { key: 'skin_launcher', label: 'UI Skin / Launcher', priority: 2 },
        { key: 'feature_drops_cadence', label: 'Feature Drops', priority: 2 },
        { key: 'app_twins_second_space', label: 'App Cloning', priority: 3 },
        { key: 'game_mode_thermal_profiles', label: 'Game Mode', priority: 2 },
        { key: 'privacy_dashboard_features', label: 'Privacy Features', priority: 2 },
        { key: 'accessibility_features', label: 'Accessibility', priority: 3 },
        { key: 'satellite_messaging_ui', label: 'Satellite Messaging UI', priority: 2 },
      ]
    },
    {
      title: 'Miscellaneous',
      category: 'packaging',
      specs: [
         { key: 'in_box_contents', label: 'In-Box Contents', priority: 1 },
         { key: 'recycled_materials_pct', label: 'Recycled Materials (%)', priority: 2 },
         { key: 'repairability_score_modularity', label: 'Repairability Score', priority: 1 },
         { key: 'warranty_length_accidental_plans', label: 'Warranty', priority: 2 },
      ]
    }
  ];

    