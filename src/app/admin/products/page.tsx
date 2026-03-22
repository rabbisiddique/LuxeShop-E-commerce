'use client';

import React from 'react';
import ProductTable from '@/src/components/admin/ProductTable';
import { Plus, Download } from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-950">Products</h1>
          <p className="text-neutral-500 mt-1">Manage your inventory, pricing, and product details.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <Link 
            href="/admin/products/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      <ProductTable />
    </div>
  );
}
