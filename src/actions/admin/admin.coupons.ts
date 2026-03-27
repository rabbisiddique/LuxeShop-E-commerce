"use server";

import { CouponInput } from "@/index.type";
import { supabaseAdmin } from "@/src/lib/supabase/admin";

export const createCoupon = async (input: CouponInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("coupons")
      .insert({
        code: input.code,
        discount_type: input.discount_type,
        discount_value: input.discount_value,
        usage_limit: input.usage_limit || null,
        per_customer_limit: input.per_customer_limit,
        minimum_order_amount: input.minimum_order_amount,
        start_date: input.start_date || null,
        end_date: input.no_expiry ? null : input.end_date || null, // 👈 same fix
        no_expiry: input.no_expiry,
        status: input.status,
      })
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }

    // Step 2: Insert into coupon_categories
    if (input.applicable_categories && input.applicable_categories.length > 0) {
      const categoryRows = input.applicable_categories.map(
        (category_id: string) => ({
          coupon_id: data.id,
          category_id,
        }),
      );
      const { error: catError } = await supabaseAdmin
        .from("coupon_categories")
        .insert(categoryRows);

      if (catError) {
        return {
          success: false,
          message: catError.message,
          data: null,
        };
      }
    }
    return {
      success: true,
      message: "Coupon created!",
      data,
    };
  } catch (error) {
    console.log("Error in createCopuon action");
    return {
      success: false,
      message: "Internal Server Error",
      data: null,
    };
  }
};

// update coupon

export const updateCoupon = async (input: CouponInput, couponId: string) => {
  try {
    console.log("updateCoupon called with couponId:", couponId); // 👈 add this
    console.log("input:", input); // 👈 and this
    // Step 1: Update the coupon row
    const { data, error } = await supabaseAdmin
      .from("coupons")
      .update({
        code: input.code,
        discount_type: input.discount_type,
        discount_value: input.discount_value,
        usage_limit: input.usage_limit || null,
        per_customer_limit: input.per_customer_limit,
        minimum_order_amount: input.minimum_order_amount,
        start_date: input.start_date || null,
        end_date: input.no_expiry ? null : input.end_date || null, // 👈 || null converts "" to null        no_expiry: input.no_expiry,
        status: input.status,
      })
      .eq("id", couponId)
      .select();

    if (error) {
      return { success: false, message: error.message, data: null };
    }

    // Step 2: Only run if couponId is a valid string
    if (!couponId || couponId === "undefined") {
      return { success: true, message: "Coupon updated!", data };
    }

    // Step 2: Update coupon_categories if applicable
    if (input.applicable_categories) {
      // Delete existing categories
      const { error: deleteError } = await supabaseAdmin
        .from("coupon_categories")
        .delete()
        .eq("coupon_id", couponId);

      if (deleteError) {
        return { success: false, message: deleteError.message, data: null };
      }

      // Insert new categories
      // Step 2: Update coupon_categories if applicable
      if (input.applicable_categories) {
        const { error: deleteError } = await supabaseAdmin
          .from("coupon_categories")
          .delete()
          .eq("coupon_id", couponId); // 👈 was input.id

        if (deleteError) {
          return { success: false, message: deleteError.message, data: null };
        }

        if (input.applicable_categories.length > 0) {
          const categoryRows = input.applicable_categories.map(
            (category_id: string) => ({
              coupon_id: couponId, // 👈 was input.id
              category_id,
            }),
          );

          const { error: insertError } = await supabaseAdmin
            .from("coupon_categories")
            .insert(categoryRows);

          if (insertError) {
            return { success: false, message: insertError.message, data: null };
          }
        }
      }
    }

    return { success: true, message: "Coupon updated!", data };
  } catch (err) {
    console.log("Error in updateCoupon action:", err);
    return { success: false, message: "Internal Server Error", data: null };
  }
};

// get single coupons
export const getCoupons = async (search?: string) => {
  try {
    let query = supabaseAdmin
      .from("coupons")
      .select(
        `
        *,
        coupon_categories (
          category_id
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (search && search.trim() !== "") {
      query = query.ilike("code", `%${search.trim()}%`);
    }

    const { data, error } = await query;

    if (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }

    return {
      success: true,
      message: "Coupons fetched successfully",
      data,
    };
  } catch (error) {
    console.log("Error in getCoupons:", error);
    return {
      success: false,
      message: "Internal Server Error",
      data: [],
    };
  }
};

// get single coupon
export const getSigleCoupon = async (couponId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("coupons")
      .select("*")
      .eq("id", couponId)
      .single();

    if (error) {
      return { success: false, message: error.message, data: null };
    }

    return { success: true, message: "Coupon fetched!", data };
  } catch (err) {
    console.log("Error in updateCoupon action:", err);
    return { success: false, message: "Internal Server Error", data: null };
  }
};

// delete coupon
export const deleteCoupon = async (couponId: string) => {
  try {
    const { error: couponError } = await supabaseAdmin
      .from("coupon_categories")
      .delete()
      .eq("coupon_id", couponId);

    if (couponError) {
      return { success: false, message: couponError.message };
    }

    // Step 2: Delete coupon;

    const { data, error } = await supabaseAdmin
      .from("coupons")
      .delete()
      .eq("id", couponId);

    if (error) {
      return { success: false, message: error.message, data: null };
    }

    return { success: true, message: "Coupon deleted!", data };
  } catch (err) {
    console.log("Error in updateCoupon action:", err);
    return { success: false, message: "Internal Server Error", data: null };
  }
};
