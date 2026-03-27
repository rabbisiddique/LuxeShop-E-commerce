"use client";

import { CouponInput } from "@/index.type";
import { useEffect, useState } from "react";
import { getCoupons } from "../actions/admin/admin.coupons";
import { createClient } from "../lib/supabase/client";

export const useCoupon = (search: string) => {
  const [coupons, setCoupons] = useState<CouponInput[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch (only once)
  useEffect(() => {
    const fetchCoupons = async () => {
      const res = await getCoupons(search);
      if (res.success) {
        setCoupons(res.data);
      } else {
        setCoupons([]);
      }
      setLoading(false);
    };

    const timer = setTimeout(() => {
      fetchCoupons();
    }, 300); // wait 300ms after typing stops
    return () => clearTimeout(timer);
  }, [search]);

  // 🚀 Real-time WITHOUT refetch
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("realtime-coupons")

      // 🟢 CREATE
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "coupons" },
        (payload) => {
          setCoupons((prev) => [payload.new as CouponInput, ...prev]);
        },
      )

      // 🟡 UPDATE
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "coupons" },
        (payload) => {
          setCoupons((prev) =>
            prev.map((item) =>
              item.id === payload.new.id
                ? { ...item, ...payload.new } // merge update
                : item,
            ),
          );
        },
      )

      // 🔴 DELETE
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "coupons" },
        (payload) => {
          setCoupons((prev) =>
            prev.filter((item) => item.id !== payload.old.id),
          );
        },
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    coupons,
    loading,
  };
};
