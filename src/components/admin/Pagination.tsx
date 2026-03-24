// src/components/admin/Pagination.tsx

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Generate page numbers
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, last, current and neighbors
      pages.push(1);

      if (page > 3) pages.push("...");

      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200">
      {/* Left — info */}
      <p className="text-sm text-neutral-500">
        Page <span className="font-bold text-neutral-900">{page}</span> of{" "}
        <span className="font-bold text-neutral-900">{totalPages}</span>
      </p>

      {/* Right — controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-neutral-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(Number(p))}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                page === p
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "border border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary"
              }`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
