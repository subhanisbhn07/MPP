'use server';

/**
 * @fileOverview An AI agent that generates mobile phone specifications.
 *
 * - generateMobileSpec - A function that generates mobile phone specifications.
 * - GenerateMobileSpecInput - The input type for the generateMobileSpec function.
 * - GenerateMobileSpecOutput - The return type for the generateMobileSpec function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMobileSpecInputSchema = z.object({
  name: z.string(),
  model: z.string(),
});
export type GenerateMobileSpecInput = z.infer<typeof GenerateMobileSpecInputSchema>;

// Define schemas for each category
const NetworkSpecSchema = z.object({
    network_technology: z.string(),
    '2g_bands': z.string(),
    '3g_bands': z.string(),
    '4g_bands': z.string(),
    '5g_bands': z.string(),
    '5g_mmwave_bands': z.string(),
    esim_support: z.string(),
    sim_slots_and_type: z.string(),
    dual_sim_mode: z.string(),
    carrier_aggregation_categories: z.string(),
    network_speed: z.string(),
    volte_support: z.string(),
    vowifi: z.string(),
    nr_ca_support: z.string(),
});

const LaunchSpecSchema = z.object({
    announced_date: z.string(),
    market_status: z.string(),
    regions_available: z.string(),
    model_variants: z.string(),
    launch_price: z.string(),
});

const BodySpecSchema = z.object({
    dimensions_mm: z.string(),
    weight_g: z.string(),
    build_materials: z.string(),
    frame_material: z.string(),
    back_finish: z.string(),
    colors: z.string(),
    ip_rating: z.string(),
    rugged_certifications: z.string(),
    ingress_gaskets: z.string(),
    form_factor: z.string(),
    hinge_type_and_cycles: z.string(),
    folded_dimensions: z.string(),
    thermal_solution: z.string(),
    notification_led_alert_slider: z.string(),
    haptics_class: z.string(),
});

const DisplaySpecSchema = z.object({
    panel_type: z.string(),
    size_inches: z.string(),
    screen_to_body_ratio_pct: z.string(),
    resolution_px: z.string(),
    aspect_ratio: z.string(),
    pixel_density_ppi: z.string(),
    refresh_rate_hz: z.string(),
    adaptive_refresh_rate_range: z.string(),
    touch_sampling_rate_hz: z.string(),
    peak_brightness_nits: z.string(),
    hdr_standards: z.string(),
    color_gamut_coverage: z.string(),
    color_depth_bits: z.string(),
    pwm_dimming_hz: z.string(),
    glass_protection: z.string(),
    oleophobic_coating: z.string(),
    curvature: z.string(),
    always_on_display: z.string(),
    display_driver_ic: z.string(),
    cover_display_specs: z.string(),
});

const PlatformSpecSchema = z.object({
    os_at_launch: z.string(),
    update_policy: z.string(),
    chipset: z.string(),
    cpu_core_layout: z.string(),
    gpu_model: z.string(),
    npu_ai_tops: z.string(),
    isp_features: z.string(),
    modem_version: z.string(),
    wifi_bluetooth_combo: z.string(),
    thermal_throttling_behavior: z.string(),
    geekbench_single_core: z.string(),
    geekbench_multi_core: z.string(),
    antutu_score: z.string(),
    '3dmark_scores': z.string(),
});

const MemorySpecSchema = z.object({
    ram_capacities: z.string(),
    ram_type: z.string(),
    storage_capacities: z.string(),
    storage_type: z.string(),
    storage_speed: z.string(),
    expandable_storage: z.string(),
    slot_type: z.string(),
    usb_otg_support: z.string(),
    filesystem_encryption: z.string(),
});

const MainCameraSpecSchema = z.object({
    rear_camera_count: z.string(),
    main_sensor_resolution: z.string(),
    main_sensor_size_and_pitch: z.string(),
    sensor_brand_model: z.string(),
    lens_aperture_and_focal_length: z.string(),
    ois_type: z.string(),
    autofocus_type: z.string(),
    pixel_binning_mode: z.string(),
    ultrawide_camera_specs: z.string(),
    telephoto_specs: z.string(),
    macro_tele_macro_specs: z.string(),
    depth_tof_lidar: z.string(),
    spectral_flicker_sensors: z.string(),
    video_resolutions_and_framerates: z.string(),
    video_codecs_profiles: z.string(),
    '10bit_hdr_dolby_vision_capture': z.string(),
    slow_motion_modes: z.string(),
    stabilization_modes: z.string(),
    night_mode_computational_features: z.string(),
    raw_pro_controls: z.string(),
    flash_type: z.string(),
});

const SelfieCameraSpecSchema = z.object({
    front_camera_resolution: z.string(),
    sensor_size_pixel_pitch: z.string(),
    autofocus_ois_on_front: z.string(),
    aperture_focal_length: z.string(),
    front_ultrawide_second_cam: z.string(),
    front_flash_screen_flash: z.string(),
    front_video_resolutions_fps: z.string(),
    hdr_dolby_vision_selfie: z.string(),
    face_unlock_hardware: z.string(),
});

const AudioSpecSchema = z.object({
    loudspeakers: z.string(),
    '3.5mm_jack': z.string(),
    hi_res_audio_support: z.string(),
    spatial_audio_dolby_atmos: z.string(),
    mics_count_and_placement: z.string(),
    audio_codecs: z.string(),
    dac_amp_details: z.string(),
});

const ConnectivitySpecSchema = z.object({
    wifi_versions: z.string(),
    wifi_mimo_triband: z.string(),
    bluetooth_version_profiles: z.string(),
    nfc: z.string(),
    ir_blaster: z.string(),
    uwb_support: z.string(),
    gps_systems: z.string(),
    dual_band_gnss: z.string(),
    fm_radio: z.string(),
    usb_type_and_speed: z.string(),
    displayport_hdmi_out: z.string(),
    esim_profile_capacity: z.string(),
});

const SensorsSpecSchema = z.object({
    fingerprint_type: z.string(),
    face_id_3d_depth: z.string(),
    accelerometer: z.string(),
    gyroscope: z.string(),
    magnetometer: z.string(),
    proximity_sensor: z.string(),
    ambient_light_sensor: z.string(),
    barometer: z.string(),
    thermometer_hygrometer: z.string(),
    uv_sensor: z.string(),
    hall_sensor: z.string(),
    color_temperature_sensor: z.string(),
    step_counter_health_sensors: z.string(),
    satellite_sos_modem: z.string(),
});

const BatterySpecSchema = z.object({
    capacity_mah: z.string(),
    battery_type: z.string(),
    removable_battery: z.string(),
    endurance_rating: z.string(),
    wired_charging_wattage: z.string(),
    wired_charging_standard: z.string(),
    '0_50_time_mins': z.string(),
    full_charge_time_mins: z.string(),
    wireless_charging_wattage: z.string(),
    wireless_standards: z.string(),
    reverse_wireless_charging_wattage: z.string(),
    reverse_wired_charging: z.string(),
    charger_in_box: z.string(),
    battery_health_features: z.string(),
});

const SoftwareSpecSchema = z.object({
    os_version_at_ship: z.string(),
    update_window: z.string(),
    skin_launcher: z.string(),
    feature_drops_cadence: z.string(),
    app_twins_second_space: z.string(),
    game_mode_thermal_profiles: z.string(),
    privacy_dashboard_features: z.string(),
    accessibility_features: z.string(),
    satellite_messaging_ui: z.string(),
});

const PackagingSpecSchema = z.object({
    in_box_contents: z.string(),
    recycled_materials_pct: z.string(),
    repairability_score_modularity: z.string(),
    warranty_length_accidental_plans: z.string(),
});

const MiscSpecSchema = z.object({
    build_quality: z.object({
        drop_resistance: z.string(),
        scratch_resistance: z.string(),
        dust_water_ingress_specifics: z.string(),
        temperature_operating_range: z.string(),
        button_actuation_cycles: z.string(),
        port_wear_tests: z.string(),
    }),
    thermal_performance: z.object({
        sustained_performance_pct: z.string(),
        surface_temps_under_load: z.string(),
        throttle_curve_characterization: z.string(),
    }),
    imaging_features: z.object({
        multi_frame_hdr_versions: z.string(),
        night_mode_gen_algorithms: z.string(),
        portrait_pipeline: z.string(),
        astro_milky_way_modes: z.string(),
        macro_focus_distance: z.string(),
        sensor_crop_2x_lossless_mode: z.string(),
        video_hdr_curves: z.string(),
        log_profiles_and_lut_export: z.string(),
        audio_zoom_wind_filter: z.string(),
    }),
    display_extras: z.object({
        dc_dimming_toggle: z.string(),
        anti_flicker_mode: z.string(),
        color_profiles: z.string(),
        truetone_ambient_white_balance: z.string(),
        glove_mode_high_brightness_mode: z.string(),
    }),
    gaming_input: z.object({
        touch_sampling_peak_hz: z.string(),
        shoulder_triggers: z.string(),
        game_plugins: z.string(),
        haptic_latency_profile: z.string(),
        frame_interpolation_memc: z.string(),
    }),
    wireless_positioning: z.object({
        wifi_7_features: z.string(),
        bluetooth_le_audio_lc3_opus: z.string(),
        uwb_use_cases: z.string(),
        dual_frequency_gnss: z.string(),
        rtk_precision_positioning_support: z.string(),
    }),
    security: z.object({
        biometric_class: z.string(),
        secure_enclave_tee_version: z.string(),
        firmware_integrity_verified_boot: z.string(),
        esim_profiles_security: z.string(),
        sos_satellite_emergency_stack: z.string(),
    }),
    pricing_retail: z.object({
        msrp_by_sku_region: z.string(),
        street_price_trend: z.string(),
        retailer_links: z.string(),
        finance_emi_availability: z.string(),
    }),
    value_ratings: z.object({
        overall_spec_score: z.string(),
        category_scores: z.string(),
        value_index: z.string(),
        update_value: z.string(),
    }),
});

const GenerateMobileSpecOutputSchema = z.object({
  network: NetworkSpecSchema,
  launch: LaunchSpecSchema,
  body: BodySpecSchema,
  display: DisplaySpecSchema,
  platform: PlatformSpecSchema,
  memory: MemorySpecSchema,
  main_camera: MainCameraSpecSchema,
  selfie_camera: SelfieCameraSpecSchema,
  audio: AudioSpecSchema,
  connectivity: ConnectivitySpecSchema,
  sensors: SensorsSpecSchema,
  battery: BatterySpecSchema,
  software: SoftwareSpecSchema,
  packaging: PackagingSpecSchema,
  ...MiscSpecSchema.shape,
});
export type GenerateMobileSpecOutput = z.infer<typeof GenerateMobileSpecOutputSchema>;

export async function generateMobileSpec(input: GenerateMobileSpecInput): Promise<GenerateMobileSpecOutput> {
  return generateMobileSpecFlow(input);
}

const safetySettings = [
  {
    category: 'HARM_CATEGORY_HATE_SPEECH',
    threshold: 'BLOCK_ONLY_HIGH',
  },
  {
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    threshold: 'BLOCK_NONE',
  },
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    threshold: 'BLOCK_LOW_AND_ABOVE',
  },
];

const generationConfig = {
  safetySettings,
};


const generateMobileSpecFlow = ai.defineFlow(
  {
    name: 'generateMobileSpecFlow',
    inputSchema: GenerateMobileSpecInputSchema,
    outputSchema: GenerateMobileSpecOutputSchema,
  },
  async (input) => {
    const prompt = ai.definePrompt({
      name: `generateAllSpecsPrompt`,
      input: { schema: GenerateMobileSpecInputSchema },
      output: { schema: GenerateMobileSpecOutputSchema },
      prompt: `You are a mobile phone expert. Generate the specifications for all categories for the following mobile phone:

Name: {{{name}}}
Model: {{{model}}}

Ensure the specifications are detailed and accurate. Provide specifications for all fields in the schema. If a value is not available or not applicable, use "N/A". Output should be a valid JSON conforming to the schema.`,
      config: generationConfig,
    });

    const { output } = await prompt(input);
    if (!output) {
      throw new Error(`Failed to generate specifications.`);
    }
    return output;
  }
);
