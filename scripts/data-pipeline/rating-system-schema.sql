-- MPP Dynamic Rating System Schema
-- This creates the tables and functions needed for the dynamic phone rating algorithm

-- ============================================================================
-- PART 1: Rating Configuration Table
-- Stores the weights and parameters for the rating algorithm
-- ============================================================================

CREATE TABLE IF NOT EXISTS rating_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_name TEXT NOT NULL UNIQUE,
    config_value JSONB NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default rating weights
INSERT INTO rating_config (config_name, config_value, description) VALUES
('rating_weights', '{
    "hardware_score": 0.30,
    "software_score": 0.15,
    "value_score": 0.15,
    "ecosystem_score": 0.10,
    "longevity_score": 0.10,
    "user_sentiment_score": 0.10,
    "market_position_score": 0.10
}', 'Weights for each rating component (must sum to 1.0)'),

('hardware_weights', '{
    "processor": 0.20,
    "camera": 0.20,
    "display": 0.15,
    "battery": 0.15,
    "ram_storage": 0.10,
    "build_quality": 0.10,
    "connectivity": 0.10
}', 'Weights for hardware sub-components'),

('time_decay_params', '{
    "decay_rate": 0.02,
    "max_age_months": 36,
    "freshness_tiers": [
        {"max_months": 6, "score": 100},
        {"max_months": 12, "score": 85},
        {"max_months": 18, "score": 70},
        {"max_months": 24, "score": 55},
        {"max_months": 36, "score": 40}
    ]
}', 'Time decay parameters for freshness scoring'),

('brand_ecosystem_scores', '{
    "Apple": 95,
    "Samsung": 85,
    "Google": 80,
    "OnePlus": 70,
    "Xiaomi": 65,
    "Oppo": 60,
    "Vivo": 60,
    "Realme": 55,
    "Motorola": 50,
    "Nothing": 55,
    "default": 40
}', 'Base ecosystem scores by brand'),

('software_update_years', '{
    "Apple": 6,
    "Samsung": 4,
    "Google": 7,
    "OnePlus": 3,
    "Xiaomi": 3,
    "Oppo": 3,
    "Vivo": 3,
    "Realme": 2,
    "Motorola": 2,
    "Nothing": 3,
    "default": 2
}', 'Expected software update years by brand'),

('price_segments', '{
    "budget": {"min": 0, "max": 300},
    "mid_range": {"min": 300, "max": 600},
    "flagship": {"min": 600, "max": 1200},
    "ultra_premium": {"min": 1200, "max": 99999}
}', 'Price segment definitions in USD')

ON CONFLICT (config_name) DO UPDATE SET
    config_value = EXCLUDED.config_value,
    updated_at = NOW();

-- ============================================================================
-- PART 2: Phone Rating Scores Table
-- Stores pre-calculated component scores for each phone
-- ============================================================================

CREATE TABLE IF NOT EXISTS phone_rating_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_id UUID NOT NULL REFERENCES phones(id) ON DELETE CASCADE,
    
    -- Component scores (0-100)
    hardware_score DECIMAL(5,2) DEFAULT 0,
    software_score DECIMAL(5,2) DEFAULT 0,
    value_score DECIMAL(5,2) DEFAULT 0,
    ecosystem_score DECIMAL(5,2) DEFAULT 0,
    longevity_score DECIMAL(5,2) DEFAULT 0,
    user_sentiment_score DECIMAL(5,2) DEFAULT 50, -- Default to neutral
    market_position_score DECIMAL(5,2) DEFAULT 0,
    
    -- Sub-component scores for hardware
    processor_score DECIMAL(5,2) DEFAULT 0,
    camera_score DECIMAL(5,2) DEFAULT 0,
    display_score DECIMAL(5,2) DEFAULT 0,
    battery_score DECIMAL(5,2) DEFAULT 0,
    ram_storage_score DECIMAL(5,2) DEFAULT 0,
    build_quality_score DECIMAL(5,2) DEFAULT 0,
    connectivity_score DECIMAL(5,2) DEFAULT 0,
    
    -- Metadata
    price_segment TEXT,
    segment_rank INTEGER,
    overall_rank INTEGER,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(phone_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_phone_rating_scores_phone_id ON phone_rating_scores(phone_id);
CREATE INDEX IF NOT EXISTS idx_phone_rating_scores_segment ON phone_rating_scores(price_segment);

-- ============================================================================
-- PART 3: Market Benchmarks Table
-- Stores the current best values for each spec category (updated periodically)
-- ============================================================================

CREATE TABLE IF NOT EXISTS market_benchmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    benchmark_name TEXT NOT NULL UNIQUE,
    benchmark_value DECIMAL(15,2) NOT NULL,
    phone_id UUID REFERENCES phones(id),
    phone_name TEXT,
    category TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial benchmark placeholders
INSERT INTO market_benchmarks (benchmark_name, benchmark_value, category) VALUES
('max_antutu_score', 2000000, 'processor'),
('max_geekbench_single', 3000, 'processor'),
('max_geekbench_multi', 8000, 'processor'),
('max_camera_mp', 200, 'camera'),
('max_display_refresh_hz', 165, 'display'),
('max_display_brightness_nits', 3000, 'display'),
('max_battery_mah', 7000, 'battery'),
('max_charging_watts', 240, 'battery'),
('max_ram_gb', 24, 'memory'),
('max_storage_gb', 1024, 'memory')
ON CONFLICT (benchmark_name) DO NOTHING;

-- ============================================================================
-- PART 4: User Reviews Aggregation (for sentiment score)
-- ============================================================================

-- Add rating columns to user_reviews if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_reviews' AND column_name = 'rating') THEN
        ALTER TABLE user_reviews ADD COLUMN rating DECIMAL(3,1) DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_reviews' AND column_name = 'verified_purchase') THEN
        ALTER TABLE user_reviews ADD COLUMN verified_purchase BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- ============================================================================
-- PART 5: PostgreSQL Functions for Dynamic Rating Calculation
-- ============================================================================

-- Function to calculate freshness score based on release date
CREATE OR REPLACE FUNCTION calculate_freshness_score(release_date DATE)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    months_old INTEGER;
    freshness DECIMAL(5,2);
BEGIN
    IF release_date IS NULL THEN
        RETURN 50; -- Default for unknown release date
    END IF;
    
    months_old := EXTRACT(MONTH FROM AGE(CURRENT_DATE, release_date)) + 
                  (EXTRACT(YEAR FROM AGE(CURRENT_DATE, release_date)) * 12);
    
    -- Apply tiered freshness scoring
    IF months_old <= 6 THEN
        freshness := 100;
    ELSIF months_old <= 12 THEN
        freshness := 85;
    ELSIF months_old <= 18 THEN
        freshness := 70;
    ELSIF months_old <= 24 THEN
        freshness := 55;
    ELSE
        freshness := GREATEST(40, 100 * EXP(-0.02 * months_old));
    END IF;
    
    RETURN freshness;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate relative score (phone spec vs market best)
CREATE OR REPLACE FUNCTION calculate_relative_score(
    phone_value DECIMAL,
    benchmark_name TEXT
)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    max_value DECIMAL;
    relative DECIMAL(5,2);
BEGIN
    SELECT benchmark_value INTO max_value 
    FROM market_benchmarks 
    WHERE market_benchmarks.benchmark_name = calculate_relative_score.benchmark_name;
    
    IF max_value IS NULL OR max_value = 0 THEN
        RETURN 50; -- Default if no benchmark
    END IF;
    
    relative := LEAST(100, (phone_value / max_value) * 100);
    RETURN relative;
END;
$$ LANGUAGE plpgsql;

-- Function to get price segment
CREATE OR REPLACE FUNCTION get_price_segment(price_usd DECIMAL)
RETURNS TEXT AS $$
BEGIN
    IF price_usd IS NULL OR price_usd = 0 THEN
        RETURN 'unknown';
    ELSIF price_usd < 300 THEN
        RETURN 'budget';
    ELSIF price_usd < 600 THEN
        RETURN 'mid_range';
    ELSIF price_usd < 1200 THEN
        RETURN 'flagship';
    ELSE
        RETURN 'ultra_premium';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Main function to calculate dynamic rating for a phone
CREATE OR REPLACE FUNCTION calculate_phone_rating(p_phone_id UUID)
RETURNS TABLE (
    overall_rating DECIMAL(5,2),
    hardware_score DECIMAL(5,2),
    software_score DECIMAL(5,2),
    value_score DECIMAL(5,2),
    ecosystem_score DECIMAL(5,2),
    longevity_score DECIMAL(5,2),
    freshness_score DECIMAL(5,2),
    price_segment TEXT
) AS $$
DECLARE
    v_phone RECORD;
    v_specs RECORD;
    v_brand_name TEXT;
    v_release_date DATE;
    v_price DECIMAL;
    v_hardware DECIMAL(5,2) := 50;
    v_software DECIMAL(5,2) := 50;
    v_value DECIMAL(5,2) := 50;
    v_ecosystem DECIMAL(5,2) := 50;
    v_longevity DECIMAL(5,2) := 50;
    v_freshness DECIMAL(5,2) := 50;
    v_segment TEXT;
    v_overall DECIMAL(5,2);
    v_ecosystem_config JSONB;
    v_update_years_config JSONB;
BEGIN
    -- Get phone basic info
    SELECT p.*, b.name as brand_name
    INTO v_phone
    FROM phones p
    JOIN brands b ON p.brand_id = b.id
    WHERE p.id = p_phone_id;
    
    IF NOT FOUND THEN
        RETURN;
    END IF;
    
    v_brand_name := v_phone.brand_name;
    v_release_date := v_phone.release_date;
    v_price := COALESCE(v_phone.price_usd, 0);
    
    -- Get phone specs
    SELECT * INTO v_specs
    FROM phone_specs
    WHERE phone_id = p_phone_id
    LIMIT 1;
    
    -- Get config values
    SELECT config_value INTO v_ecosystem_config
    FROM rating_config WHERE config_name = 'brand_ecosystem_scores';
    
    SELECT config_value INTO v_update_years_config
    FROM rating_config WHERE config_name = 'software_update_years';
    
    -- Calculate Ecosystem Score based on brand
    v_ecosystem := COALESCE(
        (v_ecosystem_config->>v_brand_name)::DECIMAL,
        (v_ecosystem_config->>'default')::DECIMAL,
        40
    );
    
    -- Calculate Longevity Score based on expected update years
    DECLARE
        update_years INTEGER;
    BEGIN
        update_years := COALESCE(
            (v_update_years_config->>v_brand_name)::INTEGER,
            (v_update_years_config->>'default')::INTEGER,
            2
        );
        v_longevity := LEAST(100, update_years * 15); -- 15 points per year of updates
    END;
    
    -- Calculate Freshness Score
    v_freshness := calculate_freshness_score(v_release_date);
    
    -- Calculate Hardware Score (simplified - based on available specs)
    IF v_specs IS NOT NULL THEN
        DECLARE
            processor_score DECIMAL := 50;
            camera_score DECIMAL := 50;
            display_score DECIMAL := 50;
            battery_score DECIMAL := 50;
        BEGIN
            -- Extract and score processor (from chipset name heuristics)
            IF v_specs.platform IS NOT NULL THEN
                IF v_specs.platform::TEXT ILIKE '%snapdragon 8 gen 3%' OR 
                   v_specs.platform::TEXT ILIKE '%a17%' OR
                   v_specs.platform::TEXT ILIKE '%a18%' THEN
                    processor_score := 95;
                ELSIF v_specs.platform::TEXT ILIKE '%snapdragon 8 gen 2%' OR 
                      v_specs.platform::TEXT ILIKE '%a16%' OR
                      v_specs.platform::TEXT ILIKE '%dimensity 9300%' THEN
                    processor_score := 90;
                ELSIF v_specs.platform::TEXT ILIKE '%snapdragon 8 gen 1%' OR 
                      v_specs.platform::TEXT ILIKE '%a15%' OR
                      v_specs.platform::TEXT ILIKE '%dimensity 9200%' THEN
                    processor_score := 85;
                ELSIF v_specs.platform::TEXT ILIKE '%snapdragon 7%' OR
                      v_specs.platform::TEXT ILIKE '%dimensity 8%' THEN
                    processor_score := 70;
                ELSIF v_specs.platform::TEXT ILIKE '%snapdragon 6%' OR
                      v_specs.platform::TEXT ILIKE '%dimensity 7%' THEN
                    processor_score := 55;
                END IF;
            END IF;
            
            -- Score camera (from main_camera resolution)
            IF v_specs.main_camera IS NOT NULL THEN
                IF v_specs.main_camera::TEXT ILIKE '%200%MP%' THEN
                    camera_score := 95;
                ELSIF v_specs.main_camera::TEXT ILIKE '%108%MP%' OR
                      v_specs.main_camera::TEXT ILIKE '%50%MP%' THEN
                    camera_score := 85;
                ELSIF v_specs.main_camera::TEXT ILIKE '%48%MP%' THEN
                    camera_score := 75;
                ELSIF v_specs.main_camera::TEXT ILIKE '%12%MP%' THEN
                    camera_score := 70;
                END IF;
            END IF;
            
            -- Score display (from display specs)
            IF v_specs.display IS NOT NULL THEN
                IF v_specs.display::TEXT ILIKE '%120Hz%' OR
                   v_specs.display::TEXT ILIKE '%144Hz%' OR
                   v_specs.display::TEXT ILIKE '%165Hz%' THEN
                    display_score := 90;
                ELSIF v_specs.display::TEXT ILIKE '%90Hz%' THEN
                    display_score := 75;
                END IF;
                
                IF v_specs.display::TEXT ILIKE '%AMOLED%' OR
                   v_specs.display::TEXT ILIKE '%OLED%' THEN
                    display_score := display_score + 5;
                END IF;
            END IF;
            
            -- Score battery
            IF v_specs.battery IS NOT NULL THEN
                IF v_specs.battery::TEXT ILIKE '%5000%mAh%' OR
                   v_specs.battery::TEXT ILIKE '%6000%mAh%' THEN
                    battery_score := 90;
                ELSIF v_specs.battery::TEXT ILIKE '%4500%mAh%' THEN
                    battery_score := 80;
                ELSIF v_specs.battery::TEXT ILIKE '%4000%mAh%' THEN
                    battery_score := 70;
                END IF;
                
                -- Bonus for fast charging
                IF v_specs.battery::TEXT ILIKE '%65W%' OR
                   v_specs.battery::TEXT ILIKE '%100W%' OR
                   v_specs.battery::TEXT ILIKE '%120W%' THEN
                    battery_score := battery_score + 10;
                END IF;
            END IF;
            
            -- Calculate weighted hardware score
            v_hardware := (processor_score * 0.30) + 
                          (camera_score * 0.25) + 
                          (display_score * 0.25) + 
                          (battery_score * 0.20);
        END;
    END IF;
    
    -- Calculate Software Score (based on brand reputation)
    IF v_brand_name IN ('Apple', 'Google') THEN
        v_software := 95;
    ELSIF v_brand_name IN ('Samsung', 'OnePlus') THEN
        v_software := 80;
    ELSIF v_brand_name IN ('Xiaomi', 'Oppo', 'Vivo') THEN
        v_software := 65;
    ELSE
        v_software := 55;
    END IF;
    
    -- Calculate Value Score
    IF v_price > 0 THEN
        -- Value = hardware quality relative to price
        v_value := LEAST(100, (v_hardware / (v_price / 10)) * 10);
        -- Normalize to reasonable range
        v_value := GREATEST(30, LEAST(100, v_value));
    END IF;
    
    -- Get price segment
    v_segment := get_price_segment(v_price);
    
    -- Calculate Overall Rating with weights and time decay
    v_overall := (
        (v_hardware * 0.30) +
        (v_software * 0.15) +
        (v_value * 0.15) +
        (v_ecosystem * 0.10) +
        (v_longevity * 0.10) +
        (50 * 0.10) + -- User sentiment placeholder
        (50 * 0.10)   -- Market position placeholder
    ) * (v_freshness / 100);
    
    -- Ensure rating is in valid range
    v_overall := GREATEST(0, LEAST(100, v_overall));
    
    RETURN QUERY SELECT 
        v_overall,
        v_hardware,
        v_software,
        v_value,
        v_ecosystem,
        v_longevity,
        v_freshness,
        v_segment;
END;
$$ LANGUAGE plpgsql;

-- Function to get all phones with dynamic ratings
CREATE OR REPLACE FUNCTION get_phones_with_ratings()
RETURNS TABLE (
    phone_id UUID,
    brand TEXT,
    model TEXT,
    image_url TEXT,
    price_usd DECIMAL,
    release_date DATE,
    overall_rating DECIMAL(5,2),
    hardware_score DECIMAL(5,2),
    software_score DECIMAL(5,2),
    value_score DECIMAL(5,2),
    ecosystem_score DECIMAL(5,2),
    longevity_score DECIMAL(5,2),
    freshness_score DECIMAL(5,2),
    price_segment TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id as phone_id,
        b.name as brand,
        p.model,
        p.image_url,
        p.price_usd,
        p.release_date,
        r.overall_rating,
        r.hardware_score,
        r.software_score,
        r.value_score,
        r.ecosystem_score,
        r.longevity_score,
        r.freshness_score,
        r.price_segment
    FROM phones p
    JOIN brands b ON p.brand_id = b.id
    CROSS JOIN LATERAL calculate_phone_rating(p.id) r
    ORDER BY r.overall_rating DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PART 6: Materialized View for Performance (optional, refresh periodically)
-- ============================================================================

-- Drop if exists and recreate
DROP MATERIALIZED VIEW IF EXISTS phone_ratings_mv;

CREATE MATERIALIZED VIEW phone_ratings_mv AS
SELECT 
    p.id as phone_id,
    b.name as brand,
    p.model,
    p.image_url,
    p.price_usd,
    p.release_date,
    r.overall_rating,
    r.hardware_score,
    r.software_score,
    r.value_score,
    r.ecosystem_score,
    r.longevity_score,
    r.freshness_score,
    r.price_segment,
    RANK() OVER (ORDER BY r.overall_rating DESC) as overall_rank,
    RANK() OVER (PARTITION BY r.price_segment ORDER BY r.overall_rating DESC) as segment_rank
FROM phones p
JOIN brands b ON p.brand_id = b.id
CROSS JOIN LATERAL calculate_phone_rating(p.id) r;

-- Create indexes on materialized view
CREATE INDEX IF NOT EXISTS idx_phone_ratings_mv_rating ON phone_ratings_mv(overall_rating DESC);
CREATE INDEX IF NOT EXISTS idx_phone_ratings_mv_segment ON phone_ratings_mv(price_segment);
CREATE INDEX IF NOT EXISTS idx_phone_ratings_mv_brand ON phone_ratings_mv(brand);

-- Function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_phone_ratings()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW phone_ratings_mv;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PART 7: Enable Row Level Security (RLS) for public access
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE rating_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE phone_rating_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_benchmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to rating_config"
    ON rating_config FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access to phone_rating_scores"
    ON phone_rating_scores FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access to market_benchmarks"
    ON market_benchmarks FOR SELECT
    USING (true);

-- Grant necessary permissions
GRANT SELECT ON rating_config TO anon, authenticated;
GRANT SELECT ON phone_rating_scores TO anon, authenticated;
GRANT SELECT ON market_benchmarks TO anon, authenticated;
GRANT SELECT ON phone_ratings_mv TO anon, authenticated;

-- ============================================================================
-- VERIFICATION: Test the rating calculation
-- ============================================================================

-- This will show ratings for all phones
-- SELECT * FROM get_phones_with_ratings() LIMIT 10;

-- Or use the materialized view for better performance
-- SELECT * FROM phone_ratings_mv ORDER BY overall_rating DESC LIMIT 10;
