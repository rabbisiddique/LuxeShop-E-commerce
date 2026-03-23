"use server";

import { createClient } from "@/src/lib/supabase/server";

export const getCategories = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("is_active", true)
    .order("name");

  if (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }

  return {
    success: true,
    message: "Categories fetched!",
    data,
  };
};
