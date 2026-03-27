"use client";

import { Category } from "@/index.type";
import { useEffect, useState } from "react";
import { getCategories } from "../actions/admin/admin.categories";

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.success) {
          setCategories(res.data);
        }
      } catch (error) {
        console.log("Error in useCategory:", error);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
  };
};
