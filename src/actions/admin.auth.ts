"use server";

import { createClient } from "../lib/supabase/server";

export const adminLoginAction = async (email: string, password: string) => {
  const supabase = await createClient();
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return {
        success: false,
        message:
          error.message === "Invalid login credentials"
            ? "Invalid email or password"
            : error.message,
      };
    }
    return {
      success: true,
      message: "Login Successful!",
    };
  } catch (error) {
    console.log("Error in admin login action");
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
