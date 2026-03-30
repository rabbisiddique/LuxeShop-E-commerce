// src/types/index.ts

// Admin Login
export interface AdminLogin {
  email: string;
  password: string;
}

// Admin User (full profile)
export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  role: "admin" | "customer";
  avatar_url: string | null;
  loyalty_points: number;
  loyalty_tier: "bronze" | "silver" | "gold" | "platinum";
  total_orders: number;
  total_spent: number;
  is_active: boolean;
  marketing_emails: boolean;
  is_banned: boolean;
  created_at: string;
  updated_at: string;
}

// Auth Response
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: AdminUser | null;
}

// Admin Categories and products

// ─── Product Variant ─────────────────────
export interface ProductVariant {
  id?: string;
  product_id?: string;
  name: string;
  options: Record<string, string>;
  price: number;
  stock_quantity: number;
}

// ─── Add Product ─────────────────────────
export interface AddProductInput {
  // Basic
  name: string;
  slug: string;
  description?: string;

  // Organization
  category_id: string;
  tags?: string[];

  // Pricing
  base_price: number;
  compare_price?: number;
  cost_price?: number;

  // Inventory
  sku?: string;
  stock_quantity: number;

  // Media
  images?: string[];

  // Variants
  has_variants: boolean;
  variants?: ProductVariant[];

  // Status
  is_active: boolean;
  is_featured: boolean;

  // Rating (auto calculated)
  average_rating?: number;
  review_count?: number;
}

// ─── Update Product ──────────────────────
export type UpdateProductInput = Partial<AddProductInput>;

// ─── Product (from DB) ───────────────────
export interface Product extends AddProductInput {
  id: string;
  categories?: Category;
  product_variants?: ProductVariant[];
  created_at: string;
  updated_at: string;
}

// Category

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductFormProps {
  categories: Category[];
}

export type Variant = {
  id: number;
  name: string;
  values: string[];
};

// Images

export interface ImageItem {
  url: string;
  uploading: boolean;
}

// id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
// code                  TEXT UNIQUE NOT NULL,
// discount_type         TEXT DEFAULT 'percentage' NOT NULL,
// discount_value        NUMERIC DEFAULT 0.00 NOT NULL,
// usage_limit           INT4,
// per_customer_limit    INT4 DEFAULT 1 NOT NULL,
// minimum_order_amount  NUMERIC DEFAULT 0.00 NOT NULL,
// start_date            TIMESTAMPTZ,
// end_date              TIMESTAMPTZ,
// no_expiry             BOOLEAN DEFAULT true NOT NULL,
// status                TEXT DEFAULT 'draft' NOT NULL,
// used_count            INT4 DEFAULT 0 NOT NULL,
// created_at            TIMESTAMPTZ DEFAULT NOW(),
// updated_at            TIMESTAMPTZ DEFAULT NOW(),

// coupons type

export interface Coupon {
  id?: string;
  code: string;
  discount_type: "percentage" | "fixed" | "free_shipping";
  discount_value: number;
  usage_limit?: number | null;
  per_customer_limit: number;
  minimum_order_amount: number;
  start_date?: string | null;
  end_date?: string | null;
  no_expiry: boolean;
  status: "active" | "draft" | "scheduled";
  used_count?: number;
  created_at?: string;
  updated_at?: string;
}

// Separate input type for form
export interface CouponInput extends Coupon {
  applicable_categories?: string[]; // ← only in form
}

// settings
// ─── Types ─────────────────────────────────────────────────────────

export interface StoreSettings {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  currency: string;
  timezone: string;
  logo_url: string | null;
  favicon_url: string | null;
  primary_color: string;
  social: {
    instagram: string;
    twitter: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
}

// shipping methods
// Types

export interface ShippingMethod {
  // id: string;
  name: string;
  description: string;
  price: number;
  shipping_type: "free_shipping" | "fixed_shipping";
  estimated_days_min: number;
  estimated_days_max: number;
  is_active: boolean;
}
