export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          description: string | null;
          website_url: string | null;
          country_of_origin: string | null;
          founded_year: number | null;
          is_active: boolean;
          phone_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          description?: string | null;
          website_url?: string | null;
          country_of_origin?: string | null;
          founded_year?: number | null;
          is_active?: boolean;
          phone_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          description?: string | null;
          website_url?: string | null;
          country_of_origin?: string | null;
          founded_year?: number | null;
          is_active?: boolean;
          phone_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      phones: {
        Row: {
          id: string;
          brand_id: string;
          model: string;
          slug: string;
          image_url: string | null;
          images: Json;
          youtube_video_id: string | null;
          price_usd: number | null;
          price_inr: number | null;
          price_eur: number | null;
          price_gbp: number | null;
          announced_date: string | null;
          release_date: string | null;
          market_status: string;
          is_featured: boolean;
          is_trending: boolean;
          meta_title: string | null;
          meta_description: string | null;
          overall_rating: number | null;
          rating_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          model: string;
          slug: string;
          image_url?: string | null;
          images?: Json;
          youtube_video_id?: string | null;
          price_usd?: number | null;
          price_inr?: number | null;
          price_eur?: number | null;
          price_gbp?: number | null;
          announced_date?: string | null;
          release_date?: string | null;
          market_status?: string;
          is_featured?: boolean;
          is_trending?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          overall_rating?: number | null;
          rating_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string;
          model?: string;
          slug?: string;
          image_url?: string | null;
          images?: Json;
          youtube_video_id?: string | null;
          price_usd?: number | null;
          price_inr?: number | null;
          price_eur?: number | null;
          price_gbp?: number | null;
          announced_date?: string | null;
          release_date?: string | null;
          market_status?: string;
          is_featured?: boolean;
          is_trending?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          overall_rating?: number | null;
          rating_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      phone_specs: {
        Row: {
          id: string;
          phone_id: string;
          network: Json;
          launch: Json;
          body: Json;
          display: Json;
          platform: Json;
          memory: Json;
          main_camera: Json;
          selfie_camera: Json;
          audio: Json;
          connectivity: Json;
          sensors: Json;
          battery: Json;
          software: Json;
          build_quality: Json;
          thermal_performance: Json;
          imaging_features: Json;
          display_extras: Json;
          gaming_input: Json;
          wireless_positioning: Json;
          security: Json;
          packaging: Json;
          pricing_retail: Json;
          value_ratings: Json;
          data_sources: Json;
          last_verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone_id: string;
          network?: Json;
          launch?: Json;
          body?: Json;
          display?: Json;
          platform?: Json;
          memory?: Json;
          main_camera?: Json;
          selfie_camera?: Json;
          audio?: Json;
          connectivity?: Json;
          sensors?: Json;
          battery?: Json;
          software?: Json;
          build_quality?: Json;
          thermal_performance?: Json;
          imaging_features?: Json;
          display_extras?: Json;
          gaming_input?: Json;
          wireless_positioning?: Json;
          security?: Json;
          packaging?: Json;
          pricing_retail?: Json;
          value_ratings?: Json;
          data_sources?: Json;
          last_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone_id?: string;
          network?: Json;
          launch?: Json;
          body?: Json;
          display?: Json;
          platform?: Json;
          memory?: Json;
          main_camera?: Json;
          selfie_camera?: Json;
          audio?: Json;
          connectivity?: Json;
          sensors?: Json;
          battery?: Json;
          software?: Json;
          build_quality?: Json;
          thermal_performance?: Json;
          imaging_features?: Json;
          display_extras?: Json;
          gaming_input?: Json;
          wireless_positioning?: Json;
          security?: Json;
          packaging?: Json;
          pricing_retail?: Json;
          value_ratings?: Json;
          data_sources?: Json;
          last_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      phone_categories: {
        Row: {
          phone_id: string;
          category_id: string;
        };
        Insert: {
          phone_id: string;
          category_id: string;
        };
        Update: {
          phone_id?: string;
          category_id?: string;
        };
      };
      comparisons: {
        Row: {
          id: string;
          slug: string;
          phone_ids: string[];
          title: string | null;
          meta_description: string | null;
          generated_content: string | null;
          view_count: number;
          is_featured: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          phone_ids: string[];
          title?: string | null;
          meta_description?: string | null;
          generated_content?: string | null;
          view_count?: number;
          is_featured?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          phone_ids?: string[];
          title?: string | null;
          meta_description?: string | null;
          generated_content?: string | null;
          view_count?: number;
          is_featured?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      price_history: {
        Row: {
          id: string;
          phone_id: string;
          price_usd: number | null;
          price_inr: number | null;
          price_eur: number | null;
          price_gbp: number | null;
          source: string | null;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          phone_id: string;
          price_usd?: number | null;
          price_inr?: number | null;
          price_eur?: number | null;
          price_gbp?: number | null;
          source?: string | null;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          phone_id?: string;
          price_usd?: number | null;
          price_inr?: number | null;
          price_eur?: number | null;
          price_gbp?: number | null;
          source?: string | null;
          recorded_at?: string;
        };
      };
      user_reviews: {
        Row: {
          id: string;
          phone_id: string;
          user_id: string | null;
          rating: number;
          title: string | null;
          content: string | null;
          pros: string[] | null;
          cons: string[] | null;
          performance_rating: number | null;
          camera_rating: number | null;
          battery_rating: number | null;
          display_rating: number | null;
          value_rating: number | null;
          is_verified_purchase: boolean;
          is_approved: boolean;
          helpful_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone_id: string;
          user_id?: string | null;
          rating: number;
          title?: string | null;
          content?: string | null;
          pros?: string[] | null;
          cons?: string[] | null;
          performance_rating?: number | null;
          camera_rating?: number | null;
          battery_rating?: number | null;
          display_rating?: number | null;
          value_rating?: number | null;
          is_verified_purchase?: boolean;
          is_approved?: boolean;
          helpful_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone_id?: string;
          user_id?: string | null;
          rating?: number;
          title?: string | null;
          content?: string | null;
          pros?: string[] | null;
          cons?: string[] | null;
          performance_rating?: number | null;
          camera_rating?: number | null;
          battery_rating?: number | null;
          display_rating?: number | null;
          value_rating?: number | null;
          is_verified_purchase?: boolean;
          is_approved?: boolean;
          helpful_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      affiliate_links: {
        Row: {
          id: string;
          phone_id: string;
          retailer: string;
          region: string;
          url: string;
          price: number | null;
          currency: string | null;
          click_count: number;
          is_active: boolean;
          last_checked_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone_id: string;
          retailer: string;
          region: string;
          url: string;
          price?: number | null;
          currency?: string | null;
          click_count?: number;
          is_active?: boolean;
          last_checked_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone_id?: string;
          retailer?: string;
          region?: string;
          url?: string;
          price?: number | null;
          currency?: string | null;
          click_count?: number;
          is_active?: boolean;
          last_checked_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      news_articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          featured_image: string | null;
          category: string | null;
          tags: string[] | null;
          related_phone_ids: string[] | null;
          meta_title: string | null;
          meta_description: string | null;
          is_published: boolean;
          published_at: string | null;
          view_count: number;
          author_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          featured_image?: string | null;
          category?: string | null;
          tags?: string[] | null;
          related_phone_ids?: string[] | null;
          meta_title?: string | null;
          meta_description?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          view_count?: number;
          author_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          featured_image?: string | null;
          category?: string | null;
          tags?: string[] | null;
          related_phone_ids?: string[] | null;
          meta_title?: string | null;
          meta_description?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          view_count?: number;
          author_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      search_analytics: {
        Row: {
          id: string;
          query: string;
          results_count: number | null;
          clicked_phone_id: string | null;
          session_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          query: string;
          results_count?: number | null;
          clicked_phone_id?: string | null;
          session_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          query?: string;
          results_count?: number | null;
          clicked_phone_id?: string | null;
          session_id?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for easier usage
export type Brand = Database['public']['Tables']['brands']['Row'];
export type BrandInsert = Database['public']['Tables']['brands']['Insert'];
export type Phone = Database['public']['Tables']['phones']['Row'];
export type PhoneInsert = Database['public']['Tables']['phones']['Insert'];
export type PhoneSpecs = Database['public']['Tables']['phone_specs']['Row'];
export type PhoneSpecsInsert = Database['public']['Tables']['phone_specs']['Insert'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Comparison = Database['public']['Tables']['comparisons']['Row'];
export type PriceHistory = Database['public']['Tables']['price_history']['Row'];
export type UserReview = Database['public']['Tables']['user_reviews']['Row'];
export type AffiliateLink = Database['public']['Tables']['affiliate_links']['Row'];
export type NewsArticle = Database['public']['Tables']['news_articles']['Row'];

// Phone with brand and specs joined
export type PhoneWithDetails = Phone & {
  brand: Brand;
  phone_specs: PhoneSpecs | null;
};
