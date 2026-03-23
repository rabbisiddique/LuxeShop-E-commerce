"use client";

import { AdminUser } from "@/index.type";
import { useEffect, useState } from "react";
import { getAdminUser } from "../actions/admin/admin.auth";

export const useAuth = () => {
  const [adminData, setAdminData] = useState<AdminUser | null>(null);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await getAdminUser();
        if (res.success && res.data) {
          setAdminData(res.data as AdminUser);
        }
      } catch (error) {
        console.log("Error in fetching data!");
      }
    };
    fetchAdmin();
  }, []);
  return {
    adminData,
  };
};
