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
  name: z.string().describe('The name of the mobile phone.'),
  model: z.string().describe('The model of the mobile phone.'),
});
export type GenerateMobileSpecInput = z.infer<typeof GenerateMobileSpecInputSchema>;

const GenerateMobileSpecOutputSchema = z.object({
  network: z.object({
    network_technology: z.string().describe('Network Technology (e.g., GSM / CDMA / HSPA / EVDO / LTE / 5G)'),
    '2g_bands': z.string().describe('2G Bands'),
    '3g_bands': z.string().describe('3G Bands'),
    '4g_bands': z.string().describe('4G LTE Bands'),
    '5g_bands': z.string().describe('5G Sub-6 Bands'),
    '5g_mmwave_bands': z.string().describe('5G mmWave Bands'),
    esim_support: z.string().describe('eSIM Support'),
    sim_slots_and_type: z.string().describe('SIM Slots and Type'),
    dual_sim_mode: z.string().describe('Dual SIM Mode'),
    carrier_aggregation_categories: z.string().describe('Carrier Aggregation Categories'),
    network_speed: z.string().describe('Network Speed'),
    volte_support: z.string().describe('VoLTE Support'),
    vowifi: z.string().describe('VoWiFi Support'),
    nr_ca_support: z.string().describe('NR CA Support'),
  }),
  launch: z.object({
    announced_date: z.string().describe('Announced Date'),
    market_status: z.string().describe('Market Status'),
    regions_available: z.string().describe('Regions Available'),
    model_variants: z.string().describe('Model Variants'),
    launch_price: z.string().describe('Launch Price'),
  }),
  body: z.object({
    dimensions_mm: z.string().describe('Dimensions (mm)'),
    weight_g: z.string().describe('Weight (g)'),
    build_materials: z.string().describe('Build Materials'),
    frame_material: z.string().describe('Frame Material'),
    back_finish: z.string().describe('Back Finish'),
    colors: z.string().describe('Colors'),
    ip_rating: z.string().describe('IP Rating'),
    rugged_certifications: z.string().describe('Rugged Certifications'),
    ingress_gaskets: z.string().describe('Ingress Gaskets'),
    form_factor: z.string().describe('Form Factor'),
    hinge_type_and_cycles: z.string().describe('Hinge Type and Cycles'),
    folded_dimensions: z.string().describe('Folded Dimensions'),
    thermal_solution: z.string().describe('Thermal Solution'),
    notification_led_alert_slider: z.string().describe('Notification LED / Alert Slider'),
    haptics_class: z.string().describe('Haptics Class'),
  }),
  display: z.object({
    panel_type: z.string().describe('Panel Type'),
    size_inches: z.string().describe('Size (inches)'),
    screen_to_body_ratio_pct: z.string().describe('Screen-to-body Ratio (%)'),
    resolution_px: z.string().describe('Resolution (px)'),
    aspect_ratio: z.string().describe('Aspect Ratio'),
    pixel_density_ppi: z.string().describe('Pixel Density (ppi)'),
    refresh_rate_hz: z.string().describe('Refresh Rate (Hz)'),
    adaptive_refresh_rate_range: z.string().describe('Adaptive Refresh Rate Range'),
    touch_sampling_rate_hz: z.string().describe('Touch Sampling Rate (Hz)'),
    peak_brightness_nits: z.string().describe('Peak Brightness (nits)'),
    hdr_standards: z.string().describe('HDR Standards'),
    color_gamut_coverage: z.string().describe('Color Gamut Coverage'),
    color_depth_bits: z.string().describe('Color Depth (bits)'),
    pwm_dimming_hz: z.string().describe('PWM Dimming (Hz)'),
    glass_protection: z.string().describe('Glass Protection'),
    oleophobic_coating: z.string().describe('Oleophobic Coating'),
    curvature: z.string().describe('Curvature'),
    always_on_display: z.string().describe('Always-on Display'),
    display_driver_ic: z.string().describe('Display Driver IC'),
    cover_display_specs: z.string().describe('Cover Display Specifications'),
  }),
  platform: z.object({
    os_at_launch: z.string().describe('OS at Launch'),
    update_policy: z.string().describe('Update Policy'),
    chipset: z.string().describe('Chipset'),
    cpu_core_layout: z.string().describe('CPU Core Layout'),
    gpu_model: z.string().describe('GPU Model'),
    npu_ai_tops: z.string().describe('NPU/AI TOPs'),
    isp_features: z.string().describe('ISP Features'),
    modem_version: z.string().describe('Modem Version'),
    wifi_bluetooth_combo: z.string().describe('Wi-Fi/Bluetooth Combo Chip'),
    thermal_throttling_behavior: z.string().describe('Thermal Throttling Behavior'),
    geekbench_single_core: z.string().describe('Geekbench Single-Core Score'),
    geekbench_multi_core: z.string().describe('Geekbench Multi-Core Score'),
    antutu_score: z.string().describe('AnTuTu Score'),
    '3dmark_scores': z.string().describe('3DMark Scores'),
  }),
  memory: z.object({
    ram_capacities: z.string().describe('RAM Capacities'),
    ram_type: z.string().describe('RAM Type'),
    storage_capacities: z.string().describe('Storage Capacities'),
    storage_type: z.string().describe('Storage Type'),
    storage_speed: z.string().describe('Storage Speed (Read/Write MB/s)'),
    expandable_storage: z.string().describe('Expandable Storage'),
    slot_type: z.string().describe('Slot Type (e.g., Dedicated, Hybrid)'),
    usb_otg_support: z.string().describe('USB OTG Support'),
    filesystem_encryption: z.string().describe('Filesystem Encryption'),
  }),
  main_camera: z.object({
    rear_camera_count: z.string().describe('Rear Camera Count'),
    main_sensor_resolution: z.string().describe('Main Sensor Resolution'),
    main_sensor_size_and_pitch: z.string().describe('Main Sensor Size and Pixel Pitch'),
    sensor_brand_model: z.string().describe('Sensor Brand and Model'),
    lens_aperture_and_focal_length: z.string().describe('Lens Aperture and Focal Length'),
    ois_type: z.string().describe('OIS Type'),
    autofocus_type: z.string().describe('Autofocus Type'),
    pixel_binning_mode: z.string().describe('Pixel Binning Mode'),
    ultrawide_camera_specs: z.string().describe('Ultrawide Camera Specifications'),
    telephoto_specs: z.string().describe('Telephoto Specifications'),
    macro_tele_macro_specs: z.string().describe('Macro/Tele-macro Specifications'),
    depth_tof_lidar: z.string().describe('Depth/ToF/LiDAR sensor details'),
    spectral_flicker_sensors: z.string().describe('Spectral/Flicker Sensors'),
    video_resolutions_and_framerates: z.string().describe('Video Resolutions and Framerates'),
    video_codecs_profiles: z.string().describe('Video Codecs and Profiles'),
    '10bit_hdr_dolby_vision_capture': z.string().describe('10-bit/HDR/Dolby Vision Capture'),
    slow_motion_modes: z.string().describe('Slow Motion Modes'),
    stabilization_modes: z.string().describe('Stabilization Modes'),
    night_mode_computational_features: z.string().describe('Night Mode Computational Features'),
    raw_pro_controls: z.string().describe('RAW/Pro Controls'),
    flash_type: z.string().describe('Flash Type'),
  }),
  selfie_camera: z.object({
    front_camera_resolution: z.string().describe('Front Camera Resolution'),
    sensor_size_pixel_pitch: z.string().describe('Sensor Size and Pixel Pitch'),
    autofocus_ois_on_front: z.string().describe('Autofocus/OIS on Front'),
    aperture_focal_length: z.string().describe('Aperture and Focal Length'),
    front_ultrawide_second_cam: z.string().describe('Front Ultrawide/Second Camera'),
    front_flash_screen_flash: z.string().describe('Front Flash/Screen Flash'),
    front_video_resolutions_fps: z.string().describe('Front Video Resolutions and FPS'),
    hdr_dolby_vision_selfie: z.string().describe('HDR/Dolby Vision Selfie'),
    face_unlock_hardware: z.string().describe('Face Unlock Hardware'),
  }),
  audio: z.object({
    loudspeakers: z.string().describe('Loudspeakers'),
    '3.5mm_jack': z.string().describe('3.5mm Jack'),
    hi_res_audio_support: z.string().describe('Hi-Res Audio Support'),
    spatial_audio_dolby_atmos: z.string().describe('Spatial Audio/Dolby Atmos'),
    mics_count_and_placement: z.string().describe('Mics Count and Placement'),
    audio_codecs: z.string().describe('Audio Codecs'),
    dac_amp_details: z.string().describe('DAC/Amp Details'),
  }),
  connectivity: z.object({
    wifi_versions: z.string().describe('Wi-Fi Versions'),
    wifi_mimo_triband: z.string().describe('Wi-Fi MIMO/Tri-band'),
    bluetooth_version_profiles: z.string().describe('Bluetooth Version and Profiles'),
    nfc: z.string().describe('NFC'),
    ir_blaster: z.string().describe('IR Blaster'),
    uwb_support: z.string().describe('UWB Support'),
    gps_systems: z.string().describe('GPS Systems'),
    dual_band_gnss: z.string().describe('Dual-Band GNSS'),
    fm_radio: z.string().describe('FM Radio'),
    usb_type_and_speed: z.string().describe('USB Type and Speed'),
    displayport_hdmi_out: z.string().describe('DisplayPort/HDMI Out'),
    esim_profile_capacity: z.string().describe('eSIM Profile Capacity'),
  }),
  sensors: z.object({
    fingerprint_type: z.string().describe('Fingerprint Type'),
    face_id_3d_depth: z.string().describe('Face ID 3D Depth'),
    accelerometer: z.string().describe('Accelerometer'),
    gyroscope: z.string().describe('Gyroscope'),
    magnetometer: z.string().describe('Magnetometer'),
    proximity_sensor: z.string().describe('Proximity Sensor'),
    ambient_light_sensor: z.string().describe('Ambient Light Sensor'),
    barometer: z.string().describe('Barometer'),
    thermometer_hygrometer: z.string().describe('Thermometer/Hygrometer'),
    uv_sensor: z.string().describe('UV Sensor'),
    hall_sensor: z.string().describe('Hall Sensor'),
    color_temperature_sensor: z.string().describe('Color Temperature Sensor'),
    step_counter_health_sensors: z.string().describe('Step Counter/Health Sensors'),
    satellite_sos_modem: z.string().describe('Satellite SOS Modem'),
  }),
  battery: z.object({
    capacity_mah: z.string().describe('Capacity (mAh)'),
    battery_type: z.string().describe('Battery Type'),
    removable_battery: z.string().describe('Removable Battery'),
    endurance_rating: z.string().describe('Endurance Rating'),
    wired_charging_wattage: z.string().describe('Wired Charging Wattage'),
    wired_charging_standard: z.string().describe('Wired Charging Standard'),
    '0_50_time_mins': z.string().describe('0-50% Time (mins)'),
    full_charge_time_mins: z.string().describe('Full Charge Time (mins)'),
    wireless_charging_wattage: z.string().describe('Wireless Charging Wattage'),
    wireless_standards: z.string().describe('Wireless Standards'),
    reverse_wireless_charging_wattage: z.string().describe('Reverse Wireless Charging Wattage'),
    reverse_wired_charging: z.string().describe('Reverse Wired Charging'),
    charger_in_box: z.string().describe('Charger in Box'),
    battery_health_features: z.string().describe('Battery Health Features'),
  }),
  software: z.object({
    os_version_at_ship: z.string().describe('OS Version at Ship'),
    update_window: z.string().describe('Update Window'),
    skin_launcher: z.string().describe('UI Skin/Launcher'),
    feature_drops_cadence: z.string().describe('Feature Drops Cadence'),
    app_twins_second_space: z.string().describe('App Twins/Second Space'),
    game_mode_thermal_profiles: z.string().describe('Game Mode/Thermal Profiles'),
    privacy_dashboard_features: z.string().describe('Privacy Dashboard Features'),
    accessibility_features: z.string().describe('Accessibility Features'),
    satellite_messaging_ui: z.string().describe('Satellite Messaging UI'),
  }),
  packaging: z.object({
      in_box_contents: z.string().describe('In-Box Contents'),
      recycled_materials_pct: z.string().describe('Recycled Materials (%)'),
      repairability_score_modularity: z.string().describe('Repairability Score and Modularity'),
      warranty_length_accidental_plans: z.string().describe('Warranty Length and Accidental Plans'),
  })
});
export type GenerateMobileSpecOutput = z.infer<typeof GenerateMobileSpecOutputSchema>;

export async function generateMobileSpec(input: GenerateMobileSpecInput): Promise<GenerateMobileSpecOutput> {
  return generateMobileSpecFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMobileSpecPrompt',
  input: {schema: GenerateMobileSpecInputSchema},
  output: {schema: GenerateMobileSpecOutputSchema},
  prompt: `You are a mobile phone expert. Generate the specifications for the following mobile phone:

Name: {{{name}}}
Model: {{{model}}}

Ensure the specifications are detailed and accurate. Provide specifications for all fields in the schema. If a value is not available or not applicable, use "N/A". Output should be a valid JSON conforming to the schema.`,
  config: {
    safetySettings: [
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
    ],
  },
});

const generateMobileSpecFlow = ai.defineFlow(
  {
    name: 'generateMobileSpecFlow',
    inputSchema: GenerateMobileSpecInputSchema,
    outputSchema: GenerateMobileSpecOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
