// src/hooks/useProducts.ts

import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../actions/admin/admin.products";
import { createClient } from "../lib/supabase/client";

interface UseProductsOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
  active?: boolean;
  realtime?: boolean; // ← control realtime
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const {
    page = 1,
    limit = 10,
    category,
    search,
    featured,
    active = true,
    realtime = false, // ← off by default
  } = options;

  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const res = await getProducts(
      page,
      limit,
      category,
      search,
      featured,
      active,
    );

    if (res.success) {
      setProducts(res.data ?? []);
      setPagination(res.pagination ?? null);
    } else {
      setError(res.message);
      setProducts([]);
    }

    setIsLoading(false);
  }, [page, limit, category, search, featured, active]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!realtime) return; // ← check flag

    const supabase = createClient();

    const channel = supabase
      .channel("products_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        (payload) => {
          console.log("Realtime update:", payload);

          switch (payload.eventType) {
            case "INSERT":
              fetchProducts(); // ← full data ✅
              break;

            case "UPDATE":
              setProducts((prev) =>
                prev.map((t) =>
                  t.id === payload.new.id ? { ...t, ...payload.new } : t,
                ),
              );
              break;

            case "DELETE":
              setProducts((prev) =>
                prev.filter((t) => t.id !== payload.old.id),
              );
              break;
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [realtime]);

  return {
    products,
    pagination,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};
