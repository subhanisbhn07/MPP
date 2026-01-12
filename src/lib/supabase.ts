import { createClient } from '@supabase/supabase-js';
import type { Phone, PhoneSpec } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for phone_specs JSONB columns
interface DbPhoneSpecs {
  id: string;
  phone_id: string;
  network?: Record<string, unknown>;
  launch?: Record<string, unknown>;
  body?: Record<string, unknown>;
  display?: Record<string, unknown>;
  platform?: Record<string, unknown>;
  memory?: Record<string, unknown>;
  main_camera?: Record<string, unknown>;
  selfie_camera?: Record<string, unknown>;
  audio?: Record<string, unknown>;
  connectivity?: Record<string, unknown>;
  sensors?: Record<string, unknown>;
  battery?: Record<string, unknown>;
  software?: Record<string, unknown>;
  build_quality?: Record<string, unknown>;
  thermal_performance?: Record<string, unknown>;
  imaging_features?: Record<string, unknown>;
  display_extras?: Record<string, unknown>;
  gaming_input?: Record<string, unknown>;
  wireless_positioning?: Record<string, unknown>;
  security?: Record<string, unknown>;
  packaging?: Record<string, unknown>;
  pricing_retail?: Record<string, unknown>;
  value_ratings?: Record<string, unknown>;
  data_sources?: unknown[];
}

interface DbPhone {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  image_url?: string;
  images?: string[];
  price_usd?: number;
  release_date?: string;
  is_active: boolean;
  brands?: {
    id: string;
    name: string;
    slug: string;
  };
  phone_specs?: DbPhoneSpecs[];
}

// Helper function to safely get string value from JSONB
function getStringValue(obj: Record<string, unknown> | undefined, key: string): string {
  if (!obj || obj[key] === undefined || obj[key] === null) return '';
  return String(obj[key]);
}

// Transform database phone to frontend Phone type
function transformDbPhoneToPhone(dbPhone: DbPhone, index: number): Phone {
  const specs = dbPhone.phone_specs?.[0];
  
  // Create default empty spec structure
  const defaultSpec: PhoneSpec = {
    network: {
      network_technology: '',
      '2g_bands': '',
      '3g_bands': '',
      '4g_bands': '',
      '5g_bands': '',
      '5g_mmwave_bands': '',
      esim_support: '',
      sim_slots_and_type: '',
      dual_sim_mode: '',
      carrier_aggregation_categories: '',
      network_speed: '',
      volte_support: '',
      vowifi: '',
      nr_ca_support: '',
    },
    launch: {
      announced_date: '',
      market_status: '',
      regions_available: '',
      model_variants: '',
      launch_price: '',
    },
    body: {
      dimensions_mm: '',
      weight_g: '',
      build_materials: '',
      frame_material: '',
      back_finish: '',
      colors: '',
      ip_rating: '',
      rugged_certifications: '',
      ingress_gaskets: '',
      form_factor: '',
      hinge_type_and_cycles: '',
      folded_dimensions: '',
      thermal_solution: '',
      notification_led_alert_slider: '',
      haptics_class: '',
    },
    display: {
      panel_type: '',
      size_inches: '',
      screen_to_body_ratio_pct: '',
      resolution_px: '',
      aspect_ratio: '',
      pixel_density_ppi: '',
      refresh_rate_hz: '60',
      adaptive_refresh_rate_range: '',
      touch_sampling_rate_hz: '',
      peak_brightness_nits: '',
      hdr_standards: '',
      color_gamut_coverage: '',
      color_depth_bits: '',
      pwm_dimming_hz: '',
      glass_protection: '',
      oleophobic_coating: '',
      curvature: '',
      always_on_display: '',
      display_driver_ic: '',
      cover_display_specs: '',
    },
    platform: {
      os_at_launch: '',
      update_policy: '',
      chipset: '',
      cpu_core_layout: '',
      gpu_model: '',
      npu_ai_tops: '',
      isp_features: '',
      modem_version: '',
      wifi_bluetooth_combo: '',
      thermal_throttling_behavior: '',
      geekbench_single_core: '',
      geekbench_multi_core: '',
      antutu_score: '',
      '3dmark_scores': '',
    },
    memory: {
      ram_capacities: '8GB',
      ram_type: '',
      storage_capacities: '128GB',
      storage_type: '',
      storage_speed: '',
      expandable_storage: 'No',
      slot_type: '',
      usb_otg_support: '',
      filesystem_encryption: '',
    },
    main_camera: {
      rear_camera_count: '',
      main_sensor_resolution: '12MP',
      main_sensor_size_and_pitch: '',
      sensor_brand_model: '',
      lens_aperture_and_focal_length: '',
      ois_type: '',
      autofocus_type: '',
      pixel_binning_mode: '',
      ultrawide_camera_specs: '',
      telephoto_specs: '',
      macro_tele_macro_specs: '',
      depth_tof_lidar: '',
      spectral_flicker_sensors: '',
      video_resolutions_and_framerates: '',
      video_codecs_profiles: '',
      '10bit_hdr_dolby_vision_capture': '',
      slow_motion_modes: '',
      stabilization_modes: '',
      night_mode_computational_features: '',
      raw_pro_controls: '',
      flash_type: '',
    },
    selfie_camera: {
      front_camera_resolution: '',
      sensor_size_pixel_pitch: '',
      autofocus_ois_on_front: '',
      aperture_focal_length: '',
      front_ultrawide_second_cam: '',
      front_flash_screen_flash: '',
      front_video_resolutions_fps: '',
      hdr_dolby_vision_selfie: '',
      face_unlock_hardware: '',
    },
    audio: {
      loudspeakers: '',
      '3.5mm_jack': '',
      hi_res_audio_support: '',
      spatial_audio_dolby_atmos: '',
      mics_count_and_placement: '',
      audio_codecs: '',
      dac_amp_details: '',
    },
    connectivity: {
      wifi_versions: '',
      wifi_mimo_triband: '',
      bluetooth_version_profiles: '',
      nfc: 'No',
      ir_blaster: '',
      uwb_support: '',
      gps_systems: '',
      dual_band_gnss: '',
      fm_radio: '',
      usb_type_and_speed: '',
      displayport_hdmi_out: '',
      esim_profile_capacity: '',
    },
    sensors: {
      fingerprint_type: '',
      face_id_3d_depth: '',
      accelerometer: '',
      gyroscope: '',
      magnetometer: '',
      proximity_sensor: '',
      ambient_light_sensor: '',
      barometer: '',
      thermometer_hygrometer: '',
      uv_sensor: '',
      hall_sensor: '',
      color_temperature_sensor: '',
      step_counter_health_sensors: '',
      satellite_sos_modem: '',
    },
    battery: {
      capacity_mah: '4000',
      battery_type: '',
      removable_battery: '',
      endurance_rating: '',
      wired_charging_wattage: '18',
      wired_charging_standard: '',
      '0_50_time_mins': '',
      full_charge_time_mins: '',
      wireless_charging_wattage: '',
      wireless_standards: '',
      reverse_wireless_charging_wattage: '',
      reverse_wired_charging: '',
      charger_in_box: '',
      battery_health_features: '',
    },
    software: {
      os_version_at_ship: '',
      update_window: '',
      skin_launcher: '',
      feature_drops_cadence: '',
      app_twins_second_space: '',
      game_mode_thermal_profiles: '',
      privacy_dashboard_features: '',
      accessibility_features: '',
      satellite_messaging_ui: '',
    },
    build_quality: {
      drop_resistance: '',
      scratch_resistance: '',
      dust_water_ingress_specifics: '',
      temperature_operating_range: '',
      button_actuation_cycles: '',
      port_wear_tests: '',
    },
    thermal_performance: {
      sustained_performance_pct: '',
      surface_temps_under_load: '',
      throttle_curve_characterization: '',
    },
    imaging_features: {
      multi_frame_hdr_versions: '',
      night_mode_gen_algorithms: '',
      portrait_pipeline: '',
      astro_milky_way_modes: '',
      macro_focus_distance: '',
      sensor_crop_2x_lossless_mode: '',
      video_hdr_curves: '',
      log_profiles_and_lut_export: '',
      audio_zoom_wind_filter: '',
    },
    display_extras: {
      dc_dimming_toggle: '',
      anti_flicker_mode: '',
      color_profiles: '',
      truetone_ambient_white_balance: '',
      glove_mode_high_brightness_mode: '',
    },
    gaming_input: {
      touch_sampling_peak_hz: '',
      shoulder_triggers: '',
      game_plugins: '',
      haptic_latency_profile: '',
      frame_interpolation_memc: '',
    },
    wireless_positioning: {
      wifi_7_features: '',
      bluetooth_le_audio_lc3_opus: '',
      uwb_use_cases: '',
      dual_frequency_gnss: '',
      rtk_precision_positioning_support: '',
    },
    security: {
      biometric_class: '',
      secure_enclave_tee_version: '',
      firmware_integrity_verified_boot: '',
      esim_profiles_security: '',
      sos_satellite_emergency_stack: '',
    },
    packaging: {
      in_box_contents: '',
      recycled_materials_pct: '',
      repairability_score_modularity: '',
      warranty_length_accidental_plans: '',
    },
    pricing_retail: {
      msrp_by_sku_region: '',
      street_price_trend: '',
      retailer_links: '',
      finance_emi_availability: '',
    },
    value_ratings: {
      overall_spec_score: '',
      category_scores: '',
      value_index: '',
      update_value: '',
    },
  };

  // Merge specs from database if available
  if (specs) {
    // Network
    if (specs.network) {
      defaultSpec.network = {
        ...defaultSpec.network,
        network_technology: getStringValue(specs.network, 'technology'),
        '2g_bands': getStringValue(specs.network, '2g_bands'),
        '3g_bands': getStringValue(specs.network, '3g_bands'),
        '4g_bands': getStringValue(specs.network, '4g_bands'),
        '5g_bands': getStringValue(specs.network, '5g_bands'),
      };
    }
    
    // Launch
    if (specs.launch) {
      defaultSpec.launch = {
        ...defaultSpec.launch,
        announced_date: getStringValue(specs.launch, 'announced') || new Date().toISOString().split('T')[0],
        market_status: getStringValue(specs.launch, 'status') || 'Available',
      };
    }
    
    // Body
    if (specs.body) {
      defaultSpec.body = {
        ...defaultSpec.body,
        dimensions_mm: getStringValue(specs.body, 'dimensions'),
        weight_g: getStringValue(specs.body, 'weight'),
        build_materials: getStringValue(specs.body, 'build'),
        ip_rating: getStringValue(specs.body, 'sim') || 'N/A',
      };
    }
    
    // Display
    if (specs.display) {
      defaultSpec.display = {
        ...defaultSpec.display,
        panel_type: getStringValue(specs.display, 'type'),
        size_inches: getStringValue(specs.display, 'size'),
        resolution_px: getStringValue(specs.display, 'resolution'),
        glass_protection: getStringValue(specs.display, 'protection'),
        refresh_rate_hz: '120', // Default for modern phones
      };
    }
    
    // Platform
    if (specs.platform) {
      defaultSpec.platform = {
        ...defaultSpec.platform,
        os_at_launch: getStringValue(specs.platform, 'os'),
        chipset: getStringValue(specs.platform, 'chipset'),
        cpu_core_layout: getStringValue(specs.platform, 'cpu'),
        gpu_model: getStringValue(specs.platform, 'gpu'),
      };
    }
    
    // Memory
    if (specs.memory) {
      defaultSpec.memory = {
        ...defaultSpec.memory,
        expandable_storage: getStringValue(specs.memory, 'card_slot') || 'No',
        storage_capacities: getStringValue(specs.memory, 'internal') || '128GB',
        ram_capacities: '8GB', // Default
      };
    }
    
    // Main Camera
    if (specs.main_camera) {
      const cameraSpecs = getStringValue(specs.main_camera, 'specs');
      const resolution = cameraSpecs.match(/(\d+)\s*MP/i)?.[1] || '12';
      defaultSpec.main_camera = {
        ...defaultSpec.main_camera,
        main_sensor_resolution: `${resolution}MP`,
      };
    }
    
    // Audio
    if (specs.audio) {
      defaultSpec.audio = {
        ...defaultSpec.audio,
        loudspeakers: getStringValue(specs.audio, 'loudspeaker'),
        '3.5mm_jack': getStringValue(specs.audio, 'audio_jack'),
      };
    }
    
    // Connectivity
    if (specs.connectivity) {
      defaultSpec.connectivity = {
        ...defaultSpec.connectivity,
        wifi_versions: getStringValue(specs.connectivity, 'wlan'),
        bluetooth_version_profiles: getStringValue(specs.connectivity, 'bluetooth'),
        nfc: getStringValue(specs.connectivity, 'nfc') || 'No',
        usb_type_and_speed: getStringValue(specs.connectivity, 'usb'),
      };
    }
    
    // Sensors
    if (specs.sensors) {
      const sensorList = getStringValue(specs.sensors, 'list');
      defaultSpec.sensors = {
        ...defaultSpec.sensors,
        fingerprint_type: sensorList.toLowerCase().includes('fingerprint') ? 'Yes' : 'No',
        accelerometer: sensorList.toLowerCase().includes('accelerometer') ? 'Yes' : 'No',
        gyroscope: sensorList.toLowerCase().includes('gyro') ? 'Yes' : 'No',
      };
    }
    
    // Battery
    if (specs.battery) {
      const batteryType = getStringValue(specs.battery, 'type');
      const capacityMatch = batteryType.match(/(\d+)\s*mAh/i);
      defaultSpec.battery = {
        ...defaultSpec.battery,
        capacity_mah: capacityMatch?.[1] || '4000',
        battery_type: batteryType,
        wired_charging_wattage: getStringValue(specs.battery, 'charging').match(/(\d+)W/)?.[1] || '18',
      };
    }
    
    // Pricing
    if (specs.pricing_retail) {
      defaultSpec.pricing_retail = {
        ...defaultSpec.pricing_retail,
        msrp_by_sku_region: getStringValue(specs.pricing_retail, 'price'),
      };
    }
  }

  return {
    id: index + 1,
    brand: dbPhone.brands?.name || 'Unknown',
    model: dbPhone.model,
    image: dbPhone.image_url || `https://picsum.photos/400/500?phone=${index + 1}`,
    images: dbPhone.images || [],
    price: dbPhone.price_usd || 0,
    specs: defaultSpec,
  };
}

// Fetch all phones from Supabase
export async function fetchPhonesFromSupabase(): Promise<Phone[]> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (id, name, slug),
      phone_specs (*)
    `)
    .order('model');

  if (error) {
    console.error('Error fetching phones from Supabase:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data.map((phone, index) => transformDbPhoneToPhone(phone as DbPhone, index));
}

// Fetch a single phone by slug
export async function fetchPhoneBySlug(slug: string): Promise<Phone | null> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (id, name, slug),
      phone_specs (*)
    `)
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching phone by slug:', error);
    return null;
  }

  return transformDbPhoneToPhone(data as DbPhone, 0);
}
