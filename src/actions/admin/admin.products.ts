"use server";

import { AddProductInput } from "@/index.type";
import { supabaseAdmin } from "@/src/lib/supabase/admin";
import { createClient } from "../../lib/supabase/server";
// add product
export const addProduct = async (input: AddProductInput) => {
  const supabase = await createClient();
  try {
    const { data: product, error } = await supabase
      .from("products")
      .insert({
        name: input.name,
        slug: input.slug,
        description: input.description,
        category_id: input.category_id,
        base_price: input.base_price,
        compare_price: input.compare_price,
        cost_price: input.cost_price,
        sku: input.sku,
        stock_quantity: input.stock_quantity,
        images: input.images ?? [],
        tags: input.tags ?? [],
        is_active: input.is_active,
        is_featured: input.is_featured,
        has_variants: input.has_variants,
      })
      .select()
      .single();
    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    // Step 2: Insert variants
    if (input.has_variants && input.variants && input.variants.length > 0) {
      // ✅ Convert to guaranteed clean array
      const cleanVariants = [...input.variants].map((v: any) => ({
        product_id: product.id,
        name: String(v.name),
        options: v.options ?? {},
        price: Number(v.price) || Number(input.base_price),
        stock_quantity: Number(v.stock_quantity) || 0,
      }));

      console.log("Clean variants:", JSON.stringify(cleanVariants));

      const { error: variantError } = await supabaseAdmin
        .from("product_variants")
        .insert(cleanVariants);

      if (variantError) {
        console.log("Variant error:", variantError);
        // Delete product if variants fail
        await supabaseAdmin.from("products").delete().eq("id", product.id);

        return {
          success: false,
          message: variantError.message,
        };
      }
    }

    return {
      success: true,
      message: "Product added successfully!",
      data: product,
    };
  } catch (error) {
    console.log("Error in addProduct actions");
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

// get products

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  category?: string,
  search?: string,
  featured?: boolean,
  active: boolean = true,
) => {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase
      .from("products")
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        ),
        product_variants (
          id,
          name,
          options,
          price,
          stock_quantity
        )
      `,
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .range(from, to);

    // Filters
    if (active) {
      query = query.eq("is_active", true);
    }

    if (category) {
      query = query.eq("categories.slug", category);
    }

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    if (featured !== undefined) {
      query = query.eq("is_featured", featured);
    }

    const { data, error, count } = await query;

    if (error) {
      return {
        success: false,
        message: error.message,
        data: [],
        pagination: null,
      };
    }

    return {
      success: true,
      message: "Products fetched!",
      data,
      pagination: {
        page,
        limit,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
        hasNext: page < Math.ceil((count ?? 0) / limit),
        hasPrev: page > 1,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      data: [],
      pagination: null,
    };
  }
};

// get product

export const getProduct = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        id,
        name,
        slug
      ),
      product_variants (
        id,
        name,
        options,
        price,
        stock_quantity
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }

  return {
    success: true,
    message: "Product fetched!",
    data,
  };
};

// get update product

export const updateProduct = async (
  id: string,
  input: Partial<AddProductInput>,
) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("products")
      .update({
        name: input.name,
        slug: input.slug,
        description: input.description,
        category_id: input.category_id,
        base_price: input.base_price,
        compare_price: input.compare_price || null,
        cost_price: input.cost_price || null,
        sku: input.sku || null,
        stock_quantity: input.stock_quantity,
        images: input.images ?? [],
        tags: input.tags ?? [],
        is_active: input.is_active,
        is_featured: input.is_featured,
        has_variants: input.has_variants,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    // Step 2: Update variants separately
    if (input.has_variants && input.variants && input.variants.length > 0) {
      // Delete old variants first
      await supabaseAdmin
        .from("product_variants")
        .delete()
        .eq("product_id", id);

      // Insert new variants
      const cleanVariants = input.variants.map((v: any) => ({
        product_id: id,
        name: String(v.name),
        options: v.options ?? {},
        price: Number(v.price) || Number(input.base_price),
        stock_quantity: Number(v.stock_quantity) || 0,
      }));

      const { error: variantError } = await supabaseAdmin
        .from("product_variants")
        .insert(cleanVariants);

      if (variantError) {
        return {
          success: false,
          message: variantError.message,
        };
      }
    }

    return {
      success: true,
      message: "Product updated!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

// get delete product

// src/app/actions/admin/admin.products.ts

export const deleteProduct = async (id: string) => {
  try {
    // Step 1: Delete variants first
    const { error: variantError } = await supabaseAdmin
      .from("product_variants")
      .delete()
      .eq("product_id", id);

    if (variantError) {
      return {
        success: false,
        message: variantError.message,
      };
    }

    // Step 2: Delete product
    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Product deleted!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

// Same for bulk delete
export const deleteMultipleProducts = async (ids: string[]) => {
  try {
    // Step 1: Delete variants first
    const { error: variantError } = await supabaseAdmin
      .from("product_variants")
      .delete()
      .in("product_id", ids);

    if (variantError) {
      return {
        success: false,
        message: variantError.message,
      };
    }

    // Step 2: Delete products
    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .in("id", ids);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: `${ids.length} products deleted!`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
