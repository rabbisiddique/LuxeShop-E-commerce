'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  ChevronLeft, 
  ChevronRight,
  Crown,
  Star,
  Shield,
  ArrowUpRight,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';

const customers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'SJ',
    color: 'from-indigo-500 to-blue-500',
    tier: 'Platinum',
    orders: 42,
    spent: 12450.00,
    since: 'Jan 2023',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    avatar: 'MC',
    color: 'from-emerald-500 to-teal-500',
    tier: 'Gold',
    orders: 28,
    spent: 5840.00,
    since: 'Mar 2023',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    avatar: 'EW',
    color: 'from-amber-500 to-orange-500',
    tier: 'Silver',
    orders: 15,
    spent: 2100.00,
    since: 'Jun 2023',
    status: 'Inactive'
  },
  {
    id: 4,
    name: 'James Miller',
    email: 'j.miller@example.com',
    avatar: 'JM',
    color: 'from-rose-500 to-pink-500',
    tier: 'Gold',
    orders: 31,
    spent: 7200.00,
    since: 'Feb 2023',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Olivia Davis',
    email: 'olivia.d@example.com',
    avatar: 'OD',
    color: 'from-violet-500 to-purple-500',
    tier: 'Platinum',
    orders: 56,
    spent: 18900.00,
    since: 'Nov 2022',
    status: 'Active'
  },
];

const TierBadge = ({ tier }: { tier: string }) => {
  const styles: Record<string, string> = {
    'Platinum': 'bg-indigo-50 text-indigo-600 border-indigo-100',
    'Gold': 'bg-amber-50 text-amber-600 border-amber-100',
    'Silver': 'bg-neutral-100 text-neutral-600 border-neutral-200',
  };

  const icons: Record<string, any> = {
    'Platinum': Crown,
    'Gold': Star,
    'Silver': Shield,
  };

  const Icon = icons[tier] || Shield;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[tier]}`}>
      <Icon className="w-3 h-3" />
      {tier}
    </span>
  );
};

export default function CustomerTable() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {/* Main Table Area */}
      <div className="xl:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 lg:p-6 border-b border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full bg-neutral-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-200 transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2.5 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                <UserPlus className="w-4 h-4" />
                Invite Customer
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-200">
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Tier</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Member Since</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="group hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${customer.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                          {customer.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-neutral-950 group-hover:text-primary transition-colors">{customer.name}</p>
                          <p className="text-[10px] text-neutral-500">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <TierBadge tier={customer.tier} />
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-neutral-950">{customer.orders}</td>
                    <td className="px-6 py-4 text-sm font-bold text-neutral-950">${customer.spent.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{customer.since}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        customer.status === 'Active' ? 'text-emerald-600 bg-emerald-50' : 'text-neutral-400 bg-neutral-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${customer.status === 'Active' ? 'bg-emerald-500' : 'bg-neutral-400'}`}></span>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary-light rounded-lg transition-all">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary-light rounded-lg transition-all">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 lg:p-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Showing <span className="text-neutral-950">1-5</span> of <span className="text-neutral-950">1,240</span> customers
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-neutral-200 rounded-lg text-neutral-400 hover:bg-neutral-50 transition-colors disabled:opacity-50" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold bg-primary text-white shadow-md shadow-primary/20">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold text-neutral-600 hover:bg-neutral-100">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold text-neutral-600 hover:bg-neutral-100">3</button>
              <button className="p-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Card: Top Spenders */}
      <div className="space-y-6">
        <div className="bg-neutral-950 text-white p-6 rounded-2xl shadow-xl shadow-neutral-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <h3 className="font-display font-bold text-lg mb-6 relative z-10">Top Spenders <span className="text-primary text-xs ml-2 font-sans uppercase tracking-widest">This Month</span></h3>
          
          <div className="space-y-5 relative z-10">
            {[
              { name: 'Olivia Davis', spent: '$4,250', growth: '+12%', avatar: 'OD', color: 'bg-violet-500' },
              { name: 'Sarah Johnson', spent: '$3,840', growth: '+8%', avatar: 'SJ', color: 'bg-indigo-500' },
              { name: 'James Miller', spent: '$2,900', growth: '+15%', avatar: 'JM', color: 'bg-rose-500' },
            ].map((spender, i) => (
              <div key={spender.name} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full ${spender.color} flex items-center justify-center text-xs font-bold border-2 border-neutral-800`}>
                      {spender.avatar}
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-neutral-950">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">{spender.name}</p>
                    <p className="text-[10px] text-neutral-500">Platinum Member</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{spender.spent}</p>
                  <p className="text-[10px] text-emerald-500 font-bold flex items-center justify-end">
                    <ArrowUpRight className="w-3 h-3" /> {spender.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs font-bold transition-all border border-neutral-700">
            View Leaderboard
          </button>
        </div>

        {/* Customer Tiers Overview */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-6">Customer Tiers</h3>
          <div className="space-y-4">
            {[
              { label: 'Platinum', count: 124, color: 'bg-indigo-500', percent: 10 },
              { label: 'Gold', count: 482, color: 'bg-amber-500', percent: 38 },
              { label: 'Silver', count: 634, color: 'bg-neutral-400', percent: 52 },
            ].map((tier) => (
              <div key={tier.label} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-neutral-600">{tier.label}</span>
                  <span className="text-neutral-950">{tier.count} <span className="text-neutral-400 font-normal ml-1">({tier.percent}%)</span></span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${tier.color} rounded-full`}
                    style={{ width: `${tier.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
