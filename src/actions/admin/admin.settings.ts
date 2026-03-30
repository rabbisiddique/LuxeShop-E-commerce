"use server";

import { supabaseAdmin } from "@/src/lib/supabase/admin";

// ─── Get Store Settings ───────────────

export const getStoreSettings = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "store")
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
      message: "Settings fetched!",
      data: data.value,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      data: null,
    };
  }
};

// ─── Update Store Settings ────────────

export const updateStoreSettings = async (value: Record<string, any>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("settings")
      .update({
        value,
        updated_at: new Date().toISOString(),
      })
      .eq("key", "store")
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
      message: "Store settings saved!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      data: null,
    };
  }
};

// ─── Upload Logo ──────────────────────

export const uploadLogo = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return {
        success: false,
        message: "No file provided",
        url: null,
      };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to store_assets bucket
    const { error } = await supabaseAdmin.storage
      .from("store_assets")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      return {
        success: false,
        message: error.message,
        url: null,
      };
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("store_assets").getPublicUrl(fileName);

    // Save URL to settings
    const { data: settings } = await supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "store")
      .single();

    await supabaseAdmin
      .from("settings")
      .update({
        value: {
          ...settings?.value,
          logo_url: publicUrl,
        },
        updated_at: new Date().toISOString(),
      })
      .eq("key", "store");

    return {
      success: true,
      message: "Logo uploaded!",
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

// ─── Remove Logo ──────────────────────

export const removeLogo = async () => {
  try {
    const { data: settings } = await supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "store")
      .single();

    await supabaseAdmin
      .from("settings")
      .update({
        value: {
          ...settings?.value,
          logo_url: null,
        },
        updated_at: new Date().toISOString(),
      })
      .eq("key", "store");

    return {
      success: true,
      message: "Logo removed!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
