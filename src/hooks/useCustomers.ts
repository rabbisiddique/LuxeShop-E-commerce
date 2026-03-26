// src/hooks/useCustomers.ts

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getCustomers } from "../actions/admin/admin.customers";
import { createClient } from "../lib/supabase/client";

interface UseCustomersOptions {
  page?: number;
  limit?: number;
  search?: string;
  realtime?: boolean;
}

export const useCustomers = (options: UseCustomersOptions = {}) => {
  const { page = 1, limit = 10, search, realtime = false } = options;

  const [customers, setCustomers] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const optionsRef = useRef({
    page,
    limit,
    search,
  });

  useEffect(() => {
    optionsRef.current = { page, limit, search };
  }, [page, limit, search]);

  // ─── Fetch with loading ───────────────

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { page, limit, search } = optionsRef.current;

    const res = await getCustomers(page, limit, search);

    if (res.success) {
      setCustomers(res.data ?? []);
      setPagination(res.pagination ?? null);
    } else {
      setError(res.message);
      setCustomers([]);
    }

    setIsLoading(false);
  }, []);

  // ─── Silent fetch ─────────────────────

  const silentFetch = useCallback(async () => {
    const { page, limit, search } = optionsRef.current;

    const res = await getCustomers(page, limit, search);

    if (res.success) {
      setCustomers(res.data ?? []);
      setPagination(res.pagination ?? null);
    }
  }, []);

  // ─── Fetch on options change ──────────

  useEffect(() => {
    fetchCustomers();
  }, [page, limit, search]);

  // ─── Realtime ─────────────────────────

  useEffect(() => {
    if (!realtime) return;

    const supabase = createClient();

    const channel = supabase
      .channel("customers_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
        },
        (payload) => {
          console.log("Customer realtime:", payload.eventType);

          switch (payload.eventType) {
            case "INSERT":
              silentFetch();
              break;

            case "UPDATE":
              // ✅ Update customer in list
              setCustomers((prev) =>
                prev.map((c) =>
                  c.id === payload.new.id ? { ...c, ...payload.new } : c,
                ),
              );
              break;

            case "DELETE":
              // ✅ Remove customer from list
              setCustomers((prev) =>
                prev.filter((c) => c.id !== payload.old.id),
              );
              break;
          }
        },
      )
      .subscribe((status) => {
        console.log("Customers realtime status:", status);
        console.log("Status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [realtime]);

  return {
    customers,
    setCustomers,
    pagination,
    isLoading,
    error,
    refetch: fetchCustomers,
  };
};
