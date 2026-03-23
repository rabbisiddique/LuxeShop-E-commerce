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

export interface ProductVariant {
  name: string;
  options: Record<string, string>;
  price: number;
  stock_quantity: number;
}

export interface AddProductInput {
  name: string;
  slug: string;
  description?: string;
  category_id: string;
  base_price: number;
  compare_price?: number;
  cost_price?: number;
  sku?: string;
  stock_quantity: number;
  images?: string[];
  tags?: string[];
  is_active: boolean;
  is_featured: boolean;
  has_variants: boolean;
  variants?: ProductVariant[];
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
