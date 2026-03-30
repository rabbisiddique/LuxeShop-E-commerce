"use server";

import { ShippingMethod } from "@/index.type";
import { supabaseAdmin } from "@/src/lib/supabase/admin";

export const createShippingMethod = async (shippings: ShippingMethod) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("shipping_methods")
      .insert({
        name: shippings.name,
        description: shippings.description,
        price: shippings.price,
        estimated_days_min: shippings.estimated_days_min,
        estimated_days_max: shippings.estimated_days_max,
        shipping_type: shippings.shipping_type,
        is_active: shippings.is_active,
      })
      .select()
      .single();
    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: true,
      message: "Shipping Method created!",
      data,
    };
  } catch (error) {
    console.log("Error in creating shipping method");
    return {
      success: false,
      data: null,
    };
  }
};

export const updateShippingMethod = async (
  shippings: ShippingMethod,
  shippingId: string,
) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("shipping_methods")
      .update({ shippings, updated_at: new Date().toISOString() })
      .eq("id", shippingId)
      .select()
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
      message: "Updated Shipping Method!",
      data,
    };
  } catch (error) {
    console.log("Error in updating shipping method in action");
    return {
      success: false,
      data: null,
    };
  }
};

export const deleteShippingMethod = async (shippingId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("shipping_methods")
      .delete()
      .eq("id", shippingId)
      .select()
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
      message: "Deleted Shipping Method!",
      data,
    };
  } catch (error) {
    console.log("Error in deleting shipping method in action");
    return {
      success: false,
      data: null,
    };
  }
};

export const getShippingMethod = async (shippingId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("shipping_methods")
      .select("*")
      .eq("id", shippingId)
      .select()
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
      message: "Fetch Shipping Method!",
      data,
    };
  } catch (error) {
    console.log("Error in fetching shipping method in action");
    return {
      success: false,
      data: null,
    };
  }
};
