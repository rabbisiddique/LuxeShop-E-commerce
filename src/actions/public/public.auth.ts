"use server";

import { RegisterUser } from "@/public.index";
import { createClient } from "@/src/lib/supabase/server";

export const createRegisterAction = async (formData: RegisterUser) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.full_name, // <-- key
        },
      },
    });

    if (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }

    return {
      success: true,
      message: "Registration successful! Check your email.",
      data,
    };
  } catch (error: any) {
    console.error("Register Action Error:", error);
    return {
      success: false,
      message: error?.message || "Internal Server Error",
      data: null,
    };
  }
};

export const createSignInAction = async (email: string, password: string) => {
  try {
    const supabase = await createClient();
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

    return {
      success: true,
      message: "Welcome back.",
      data,
    };
  } catch (error: any) {
    console.error("Register Action Error:", error);
    return {
      success: false,
      message: error?.message || "Internal Server Error",
      data: null,
    };
  }
};
