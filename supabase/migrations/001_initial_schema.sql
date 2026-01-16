-- MobilePhonesPro Database Schema
-- Comprehensive schema for PSEO phone comparison platform
-- Supports 12,000+ phones with 150+ spec fields

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- BRANDS TABLE
-- ============================================
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    logo_url TEXT,
    description TEXT,
    website_url TEXT,
    country_of_origin VARCHAR(100),
    founded_year INTEGER,
    is_active BOOLEAN DEFAULT true,
    phone_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_name_trgm ON brands USING gin(name gin_trgm_ops);

-- ============================================
-- PHONES TABLE
-- ============================================
CREATE TABLE phones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    model VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    
    -- Basic info
    image_url TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    youtube_video_id VARCHAR(50),
    
    -- Pricing
    price_usd DECIMAL(10, 2),
    price_inr DECIMAL(12, 2),
    price_eur DECIMAL(10, 2),
    price_gbp DECIMAL(10, 2),
    
    -- Status
    announced_date DATE,
    release_date DATE,
    market_status VARCHAR(50) DEFAULT 'available',
    is_featured BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Ratings
    overall_rating DECIMAL(3, 2),
    rating_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(brand_id, slug)
);

CREATE INDEX idx_phones_brand_id ON phones(brand_id);
CREATE INDEX idx_phones_slug ON phones(slug);
CREATE INDEX idx_phones_model_trgm ON phones USING gin(model gin_trgm_ops);
CREATE INDEX idx_phones_price_usd ON phones(price_usd);
CREATE INDEX idx_phones_announced_date ON phones(announced_date DESC);
CREATE INDEX idx_phones_is_featured ON phones(is_featured) WHERE is_featured = true;
CREATE INDEX idx_phones_is_trending ON phones(is_trending) WHERE is_trending = true;

-- ============================================
-- PHONE SPECS TABLE (JSONB for flexibility)
-- ============================================
CREATE TABLE phone_specs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_id UUID NOT NULL UNIQUE REFERENCES phones(id) ON DELETE CASCADE,
    
    -- All spec categories stored as JSONB
    network JSONB DEFAULT '{}'::jsonb,
    launch JSONB DEFAULT '{}'::jsonb,
    body JSONB DEFAULT '{}'::jsonb,
    display JSONB DEFAULT '{}'::jsonb,
    platform JSONB DEFAULT '{}'::jsonb,
    memory JSONB DEFAULT '{}'::jsonb,
    main_camera JSONB DEFAULT '{}'::jsonb,
    selfie_camera JSONB DEFAULT '{}'::jsonb,
    audio JSONB DEFAULT '{}'::jsonb,
    connectivity JSONB DEFAULT '{}'::jsonb,
    sensors JSONB DEFAULT '{}'::jsonb,
    battery JSONB DEFAULT '{}'::jsonb,
    software JSONB DEFAULT '{}'::jsonb,
    build_quality JSONB DEFAULT '{}'::jsonb,
    thermal_performance JSONB DEFAULT '{}'::jsonb,
    imaging_features JSONB DEFAULT '{}'::jsonb,
    display_extras JSONB DEFAULT '{}'::jsonb,
    gaming_input JSONB DEFAULT '{}'::jsonb,
    wireless_positioning JSONB DEFAULT '{}'::jsonb,
    security JSONB DEFAULT '{}'::jsonb,
    packaging JSONB DEFAULT '{}'::jsonb,
    pricing_retail JSONB DEFAULT '{}'::jsonb,
    value_ratings JSONB DEFAULT '{}'::jsonb,
    
    -- Data source tracking
    data_sources JSONB DEFAULT '[]'::jsonb,
    last_verified_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_phone_specs_phone_id ON phone_specs(phone_id);

-- GIN indexes for JSONB querying
CREATE INDEX idx_specs_display ON phone_specs USING gin(display);
CREATE INDEX idx_specs_platform ON phone_specs USING gin(platform);
CREATE INDEX idx_specs_battery ON phone_specs USING gin(battery);
CREATE INDEX idx_specs_main_camera ON phone_specs USING gin(main_camera);

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);

-- ============================================
-- PHONE CATEGORIES (Many-to-Many)
-- ============================================
CREATE TABLE phone_categories (
    phone_id UUID NOT NULL REFERENCES phones(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (phone_id, category_id)
);

CREATE INDEX idx_phone_categories_category ON phone_categories(category_id);

-- ============================================
-- COMPARISONS TABLE (Pre-generated for SEO)
-- ============================================
CREATE TABLE comparisons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(500) NOT NULL UNIQUE,
    phone_ids UUID[] NOT NULL,
    
    -- SEO content
    title VARCHAR(255),
    meta_description TEXT,
    generated_content TEXT,
    
    -- Stats
    view_count INTEGER DEFAULT 0,
    
    -- Status
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comparisons_slug ON comparisons(slug);
CREATE INDEX idx_comparisons_phone_ids ON comparisons USING gin(phone_ids);
CREATE INDEX idx_comparisons_view_count ON comparisons(view_count DESC);

-- ============================================
-- PRICE HISTORY TABLE
-- ============================================
CREATE TABLE price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_id UUID NOT NULL REFERENCES phones(id) ON DELETE CASCADE,
    price_usd DECIMAL(10, 2),
    price_inr DECIMAL(12, 2),
    price_eur DECIMAL(10, 2),
    price_gbp DECIMAL(10, 2),
    source VARCHAR(100),
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_price_history_phone_id ON price_history(phone_id);
CREATE INDEX idx_price_history_recorded_at ON price_history(recorded_at DESC);

-- ============================================
-- USER REVIEWS TABLE
-- ============================================
CREATE TABLE user_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_id UUID NOT NULL REFERENCES phones(id) ON DELETE CASCADE,
    user_id UUID,
    
    -- Review content
    rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    pros TEXT[],
    cons TEXT[],
    
    -- Category ratings
    performance_rating DECIMAL(2, 1),
    camera_rating DECIMAL(2, 1),
    battery_rating DECIMAL(2, 1),
    display_rating DECIMAL(2, 1),
    value_rating DECIMAL(2, 1),
    
    -- Metadata
    is_verified_purchase BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_reviews_phone_id ON user_reviews(phone_id);
CREATE INDEX idx_user_reviews_rating ON user_reviews(rating DESC);
CREATE INDEX idx_user_reviews_is_approved ON user_reviews(is_approved) WHERE is_approved = true;

-- ============================================
-- AFFILIATE LINKS TABLE
-- ============================================
CREATE TABLE affiliate_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_id UUID NOT NULL REFERENCES phones(id) ON DELETE CASCADE,
    
    -- Link details
    retailer VARCHAR(100) NOT NULL,
    region VARCHAR(10) NOT NULL,
    url TEXT NOT NULL,
    price DECIMAL(12, 2),
    currency VARCHAR(3),
    
    -- Tracking
    click_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    
    -- Timestamps
    last_checked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(phone_id, retailer, region)
);

CREATE INDEX idx_affiliate_links_phone_id ON affiliate_links(phone_id);
CREATE INDEX idx_affiliate_links_region ON affiliate_links(region);

-- ============================================
-- NEWS ARTICLES TABLE
-- ============================================
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    
    -- Categorization
    category VARCHAR(100),
    tags TEXT[],
    related_phone_ids UUID[],
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Status
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    view_count INTEGER DEFAULT 0,
    
    -- Author
    author_name VARCHAR(255),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_news_articles_slug ON news_articles(slug);
CREATE INDEX idx_news_articles_published_at ON news_articles(published_at DESC);
CREATE INDEX idx_news_articles_category ON news_articles(category);

-- ============================================
-- SEARCH ANALYTICS TABLE
-- ============================================
CREATE TABLE search_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    query TEXT NOT NULL,
    results_count INTEGER,
    clicked_phone_id UUID REFERENCES phones(id),
    session_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_search_analytics_query ON search_analytics(query);
CREATE INDEX idx_search_analytics_created_at ON search_analytics(created_at DESC);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to update brand phone count
CREATE OR REPLACE FUNCTION update_brand_phone_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE brands SET phone_count = phone_count + 1 WHERE id = NEW.brand_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE brands SET phone_count = phone_count - 1 WHERE id = OLD.brand_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Function to update phone rating
CREATE OR REPLACE FUNCTION update_phone_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE phones 
    SET 
        overall_rating = (SELECT AVG(rating) FROM user_reviews WHERE phone_id = COALESCE(NEW.phone_id, OLD.phone_id) AND is_approved = true),
        rating_count = (SELECT COUNT(*) FROM user_reviews WHERE phone_id = COALESCE(NEW.phone_id, OLD.phone_id) AND is_approved = true)
    WHERE id = COALESCE(NEW.phone_id, OLD.phone_id);
    RETURN NULL;
END;
$$ language 'plpgsql';

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated_at triggers
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_phones_updated_at BEFORE UPDATE ON phones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_phone_specs_updated_at BEFORE UPDATE ON phone_specs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comparisons_updated_at BEFORE UPDATE ON comparisons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_reviews_updated_at BEFORE UPDATE ON user_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_links_updated_at BEFORE UPDATE ON affiliate_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Brand phone count trigger
CREATE TRIGGER update_brand_phone_count_trigger
    AFTER INSERT OR DELETE ON phones
    FOR EACH ROW EXECUTE FUNCTION update_brand_phone_count();

-- Phone rating trigger
CREATE TRIGGER update_phone_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON user_reviews
    FOR EACH ROW EXECUTE FUNCTION update_phone_rating();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE phone_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE phone_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read access for brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Public read access for phones" ON phones FOR SELECT USING (true);
CREATE POLICY "Public read access for phone_specs" ON phone_specs FOR SELECT USING (true);
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for phone_categories" ON phone_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for comparisons" ON comparisons FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access for price_history" ON price_history FOR SELECT USING (true);
CREATE POLICY "Public read access for approved reviews" ON user_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Public read access for active affiliate_links" ON affiliate_links FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for published news" ON news_articles FOR SELECT USING (is_published = true);

-- Service role full access (for admin operations)
CREATE POLICY "Service role full access brands" ON brands FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access phones" ON phones FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access phone_specs" ON phone_specs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access categories" ON categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access phone_categories" ON phone_categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access comparisons" ON comparisons FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access price_history" ON price_history FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access user_reviews" ON user_reviews FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access affiliate_links" ON affiliate_links FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access news_articles" ON news_articles FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access search_analytics" ON search_analytics FOR ALL USING (auth.role() = 'service_role');

-- Insert policy for search analytics (anyone can insert)
CREATE POLICY "Anyone can insert search analytics" ON search_analytics FOR INSERT WITH CHECK (true);

-- ============================================
-- SEED DATA: Categories
-- ============================================
INSERT INTO categories (name, slug, description, icon, display_order) VALUES
    ('Flagship', 'flagship-phones', 'Premium flagship smartphones', 'crown', 1),
    ('Gaming', 'best-gaming-phones', 'Best phones for mobile gaming', 'gamepad', 2),
    ('Camera', 'best-camera-phones', 'Best camera phones for photography', 'camera', 3),
    ('Battery', 'best-battery-phones', 'Phones with the best battery life', 'battery', 4),
    ('Budget', 'budget-phones', 'Best budget-friendly smartphones', 'dollar-sign', 5),
    ('Foldable', 'foldable-phones', 'Foldable and flip phones', 'smartphone', 6),
    ('5G', '5g-phones', 'Phones with 5G connectivity', 'signal', 7),
    ('Compact', 'compact-phones', 'Small and compact smartphones', 'minimize', 8),
    ('Rugged', 'rugged-phones', 'Durable and rugged phones', 'shield', 9),
    ('iOS', 'ios-phones', 'Apple iPhones', 'apple', 10),
    ('Android', 'android-phones', 'Android smartphones', 'smartphone', 11),
    ('Fast Charging', 'fast-charging-phones', 'Phones with fast charging', 'zap', 12);
