// src/app/actions/upload.ts

"use server";

import { supabaseAdmin } from "../lib/supabase/admin";

export const uploadProductImage = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return {
        success: false,
        message: "No file provided",
        url: null,
      };
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message: "Only JPG, PNG, WEBP allowed",
        url: null,
      };
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        message: "File size must be under 5MB",
        url: null,
      };
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from("products_images")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return {
        success: false,
        message: uploadError.message,
        url: null,
      };
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("products_images").getPublicUrl(filePath);

    return {
      success: true,
      message: "Image uploaded!",
      url: publicUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: "Upload failed",
      url: null,
    };
  }
};

export const deleteProductImage = async (url: string) => {
  try {
    // Extract file path from URL
    const path = url.split("products_images/")[1];

    const { error } = await supabaseAdmin.storage
      .from("products_images")
      .remove([path]);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Image deleted!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Delete failed",
    };
  }
};
