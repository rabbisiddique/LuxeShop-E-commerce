'use client';

import React from 'react';
import OrderTable from '@/src/components/admin/OrderTable';
import { Download, Calendar } from 'lucide-react';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-950">Orders</h1>
          <p className="text-neutral-500 mt-1">Track and manage customer orders and shipments.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors shadow-sm">
            <Calendar className="w-4 h-4" />
            Select Date
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <OrderTable />
    </div>
  );
}
