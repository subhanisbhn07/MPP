
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
        { key: '2g_bands', label: '2G Bands', priority: 1 },
        { key: '3g_bands', label: '3G Bands', priority: 1 },
        { key: '4g_bands', label: '4G LTE Bands', priority: 1 },
        { key: '5g_bands', label: '5G Sub-6 Bands', priority: 1 },
      ],
    },
    {
      title: 'Launch',
      category: 'launch',
      specs: [
        { key: 'announced_date', label: 'Announced Date', priority: 1 },
        { key: 'market_status', label: 'Market Status', priority: 1 },
      ],
    },
    {
      title: 'Body & Design',
      category: 'body',
      specs: [
        { key: 'dimensions_mm', label: 'Dimensions (mm)', priority: 1 },
        { key: 'weight_g', label: 'Weight (g)', priority: 1 },
        { key: 'build_materials', label: 'Build Materials', priority: 1 },
        { key: 'ip_rating', label: 'IP Rating', priority: 1 },
        { key: 'colors', label: 'Colors', priority: 1 },
      ],
    },
    {
      title: 'Display',
      category: 'display',
      specs: [
        { key: 'panel_type', label: 'Panel Type', priority: 1 },
        { key: 'size_inches', label: 'Size (inches)', priority: 1 },
        { key: 'resolution_px', label: 'Resolution (px)', priority: 1 },
        { key: 'refresh_rate_hz', label: 'Refresh Rate (Hz)', priority: 1 },
        { key: 'peak_brightness_nits', label: 'Peak Brightness (nits)', priority: 2 },
        { key: 'glass_protection', label: 'Glass Protection', priority: 1 },
        { key: 'hdr_standards', label: 'HDR Standards', priority: 1 },
      ],
    },
    {
      title: 'Platform (SoC)',
      category: 'platform',
      specs: [
        { key: 'os_at_launch', label: 'OS at Launch', priority: 1 },
        { key: 'chipset', label: 'Chipset', priority: 1 },
        { key: 'cpu_core_layout', label: 'CPU', priority: 1 },
        { key: 'gpu_model', label: 'GPU', priority: 1 },
      ],
    },
    {
      title: 'Memory & Storage',
      category: 'memory',
      specs: [
        { key: 'ram_capacities', label: 'RAM', priority: 1 },
        { key: 'storage_capacities', label: 'Storage', priority: 1 },
        { key: 'storage_type', label: 'Storage Type', priority: 1 },
        { key: 'expandable_storage', label: 'Expandable Storage', priority: 1 },
      ],
    },
    {
      title: 'Main Camera System',
      category: 'main_camera',
      specs: [
        { key: 'main_sensor_resolution', label: 'Main Sensor', priority: 1 },
        { key: 'ois_type', label: 'OIS', priority: 1 },
        { key: 'ultrawide_camera_specs', label: 'Ultrawide', priority: 1 },
        { key: 'telephoto_specs', label: 'Telephoto', priority: 1 },
        { key: 'video_resolutions_and_framerates', label: 'Video', priority: 1 },
      ],
    },
    {
      title: 'Selfie Camera',
      category: 'selfie_camera',
      specs: [
        { key: 'front_camera_resolution', label: 'Resolution', priority: 1 },
        { key: 'autofocus_ois_on_front', label: 'AF/OIS', priority: 1 },
        { key: 'front_video_resolutions_fps', label: 'Video', priority: 1 },
      ],
    },
    {
      title: 'Audio',
      category: 'audio',
      specs: [
        { key: 'loudspeakers', label: 'Loudspeakers', priority: 1 },
        { key: '3.5mm_jack', label: '3.5mm Jack', priority: 1 },
        { key: 'spatial_audio_dolby_atmos', label: 'Spatial Audio', priority: 1 },
      ],
    },
    {
      title: 'Connectivity',
      category: 'connectivity',
      specs: [
        { key: 'wifi_versions', label: 'Wi-Fi', priority: 1 },
        { key: 'bluetooth_version_profiles', label: 'Bluetooth', priority: 1 },
        { key: 'nfc', label: 'NFC', priority: 1 },
        { key: 'usb_type_and_speed', label: 'USB', priority: 1 },
        { key: 'gps_systems', label: 'Positioning', priority: 1 },
      ],
    },
    {
      title: 'Battery & Charging',
      category: 'battery',
      specs: [
        { key: 'capacity_mah', label: 'Capacity (mAh)', priority: 1 },
        { key: 'wired_charging_wattage', label: 'Wired Charging', priority: 1 },
        { key: 'wireless_charging_wattage', label: 'Wireless Charging', priority: 1 },
        { key: 'reverse_wireless_charging_wattage', label: 'Reverse Wireless', priority: 1 },
      ],
    },
  ];
