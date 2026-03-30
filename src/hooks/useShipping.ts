// src/hooks/useCustomers.ts

"use client";

import { ShippingMethod } from "@/index.type";
import { useCallback, useEffect, useState } from "react";
import { getShippingMethods } from "../actions/admin/admin.shipping";
import { createClient } from "../lib/supabase/client";

export const useShipping = () => {
  const [shipping, setShipping] = useState<ShippingMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ─── Fetch with loading ───────────────

  const fetchShipping = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const res = await getShippingMethods();

    if (res.success && res.data) {
      setShipping(res.data);
    } else {
      setError(res.message!);
    }

    setIsLoading(false);
  }, []);

  // ─── Fetch on options change ──────────

  useEffect(() => {
    fetchShipping();
  }, []);

  // ─── Realtime ─────────────────────────

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("shipping_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "shipping_methods", // ✅ correct table
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              fetchShipping();
              break;
            case "UPDATE":
              setShipping((prev) =>
                prev.map((s) =>
                  s.id === payload.new.id ? { ...s, ...payload.new } : s,
                ),
              );
              break;
            case "DELETE":
              setShipping((prev) =>
                prev.filter((s) => s.id !== payload.old.id),
              );
              break;
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    isLoading,
    error,
    shipping,
    setShipping,
  };
};
