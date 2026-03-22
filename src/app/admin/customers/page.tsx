'use client';

import React from 'react';
import CustomerTable from '@/src/components/admin/CustomerTable';
import { UserPlus, Download } from 'lucide-react';

export default function AdminCustomersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-950">Customers</h1>
          <p className="text-neutral-500 mt-1">View and manage your customer base and their activity.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            <UserPlus className="w-4 h-4" />
            Invite Customer
          </button>
        </div>
      </div>

      <CustomerTable />
    </div>
  );
}
