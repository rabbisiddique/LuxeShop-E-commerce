"use server";

import { supabaseAdmin } from "@/src/lib/supabase/admin";
import { createClient } from "@/src/lib/supabase/server";

// ─── Get All Customers ───────────────────

export const getCustomers = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  role: string = "customer",
) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabaseAdmin
      .from("profiles")
      .select("*", { count: "exact" })
      .eq("role", role)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
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
      message: "Customers fetched!",
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

// ─── Get Signle Customer ───────────────────

export const getCustomer = async (id: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }

    return {
      success: true,
      message: "Customers fetched!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      data: [],
    };
  }
};

// ─── update  Customers ───────────────────

export const updateCustomer = async (
  input: { full_name?: string; phone?: string; is_active?: string },
  id: string,
) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ ...input, update_at: new Date().toISOString() })
      .eq("id", id)
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
      message: "Customer updated!",
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

// ─── Ban Customer ────────────────────────

export const banCustomer = async (id: string, ban: boolean) => {
  try {
    // ✅ Use regular client
    // so realtime events fire
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .update({
        is_banned: ban,
        is_active: !ban,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // Fallback to admin client
      // if RLS blocks it
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from("profiles")
        .update({
          is_banned: ban,
          is_active: !ban,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (adminError) {
        return {
          success: false,
          message: adminError.message,
          data: null,
        };
      }

      return {
        success: true,
        message: ban ? "Customer banned!" : "Customer unbanned!",
        data: adminData,
      };
    }

    return {
      success: true,
      message: ban ? "Customer banned!" : "Customer unbanned!",
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

// ─── Delete Customer ─────────────────────

export const deleteCustomer = async (id: string) => {
  try {
    // Delete from auth.users
    // profiles deleted via CASCADE
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Customer deleted!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
