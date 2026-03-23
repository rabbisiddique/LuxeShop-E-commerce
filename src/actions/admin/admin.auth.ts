"use server";

import { AdminLogin, AdminUser, AuthResponse } from "@/index.type";
import { supabaseAdmin } from "@/src/lib/supabase/admin";
import { createClient } from "@/src/lib/supabase/server";

export const adminLoginAction = async ({ email, password }: AdminLogin) => {
  const supabase = await createClient();

  try {
    // Step 1: Sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }

    // Debug: log user id
    console.log("User ID:", data.user.id);
    console.log("User Email:", data.user.email);

    // Step 2: Check supabaseAdmin
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Service Key exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    // Step 3: Fetch profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle();

    // Debug: log profile result
    console.log("Profile:", profile);
    console.log("Profile Error:", profileError);

    if (profileError || !profile) {
      return {
        success: false,
        message: `Profile not found: 
          ${profileError?.message}`,
        data: null,
      };
    }

    if (profile.role !== "admin") {
      await supabase.auth.signOut();
      return {
        success: false,
        message: "Access denied. Admin only.",
        data: null,
      };
    }

    return {
      success: true,
      message: "Welcome back, Admin!",
      data: profile as unknown as AdminUser,
    };
  } catch (error) {
    console.log("Catch error:", error);
    return {
      success: false,
      message: "Internal Server Error",
      data: null,
    };
  }
};

export const adminLogOutAction = async () => {
  const supabase = await createClient();

  try {
    // Step 1: Sign in
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    // Step 4: Success ✅
    return {
      success: true,
      message: "Logout Successful!",
    };
  } catch (error) {
    console.log("Error in admin logOut action");
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

export const getAdminUser = async (): Promise<AuthResponse> => {
  const supabase = await createClient();

  try {
    // Step 1: Get current logged in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: "Not authenticated",
        data: null,
      };
    }

    // Step 2: Get profile using user id
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id) // ← pass user.id
      .single(); // ← single object

    if (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }

    return {
      success: true,
      message: "Profile fetched!",
      data: data as unknown as AdminUser,
    };
  } catch (error) {
    console.log("Error in getAdminUser");
    return {
      success: false,
      message: "Internal Server Error",
      data: null,
    };
  }
};
