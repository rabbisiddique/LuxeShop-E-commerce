"use client";

import ActiveFilterChips from "@/src/components/shop/ActiveFilterChips";
import FilterSidebar from "@/src/components/shop/FilterSidebar";
import PageHeader from "@/src/components/shop/PageHeader";
import ProductGrid from "@/src/components/shop/ProductGrid";
import SortBar from "@/src/components/shop/SortBar";
import { useState } from "react";

export default function ShopPage({ category }: { category?: string }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <PageHeader category={category} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar activeCategory={category} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <SortBar />
            <ActiveFilterChips category={category} />
            <ProductGrid viewMode={viewMode} category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}
