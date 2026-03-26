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
