'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

const orders = [
  {
    id: '#ORD-7482',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      avatar: 'SJ',
      color: 'bg-indigo-500'
    },
    date: 'Mar 15, 2024',
    items: 3,
    total: 345.00,
    status: 'Delivered',
    payment: 'Paid'
  },
  {
    id: '#ORD-7481',
    customer: {
      name: 'Michael Chen',
      email: 'm.chen@example.com',
      avatar: 'MC',
      color: 'bg-emerald-500'
    },
    date: 'Mar 14, 2024',
    items: 1,
    total: 120.00,
    status: 'Processing',
    payment: 'Paid'
  },
  {
    id: '#ORD-7480',
    customer: {
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      avatar: 'EW',
      color: 'bg-amber-500'
    },
    date: 'Mar 14, 2024',
    items: 2,
    total: 850.00,
    status: 'Shipped',
    payment: 'Paid'
  },
  {
    id: '#ORD-7479',
    customer: {
      name: 'James Miller',
      email: 'j.miller@example.com',
      avatar: 'JM',
      color: 'bg-rose-500'
    },
    date: 'Mar 13, 2024',
    items: 5,
    total: 1240.00,
    status: 'Pending',
    payment: 'Unpaid'
  },
  {
    id: '#ORD-7478',
    customer: {
      name: 'Olivia Davis',
      email: 'olivia.d@example.com',
      avatar: 'OD',
      color: 'bg-violet-500'
    },
    date: 'Mar 12, 2024',
    items: 2,
    total: 210.00,
    status: 'Cancelled',
    payment: 'Refunded'
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Delivered': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Processing': 'bg-blue-50 text-blue-600 border-blue-100',
    'Shipped': 'bg-indigo-50 text-indigo-600 border-indigo-100',
    'Pending': 'bg-amber-50 text-amber-600 border-amber-100',
    'Cancelled': 'bg-rose-50 text-rose-600 border-rose-100',
  };

  const icons: Record<string, any> = {
    'Delivered': CheckCircle2,
    'Processing': Clock,
    'Shipped': Truck,
    'Pending': Clock,
    'Cancelled': XCircle,
  };

  const Icon = icons[status] || Clock;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

export default function OrderTable() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = activeTab === 'All Orders' || order.status === activeTab;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Quick Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: '12', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Processing', value: '08', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Shipped', value: '24', icon: Truck, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Completed', value: '156', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map((stat) => (
          <div 
            key={stat.label} 
            className="bg-white p-4 rounded-2xl border border-neutral-200 flex items-center gap-4 cursor-pointer hover:border-primary transition-all"
            onClick={() => setActiveTab(stat.label === 'Completed' ? 'Delivered' : stat.label)}
          >
            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-lg font-bold text-neutral-950">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Tabs & Toolbar */}
        <div className="border-b border-neutral-200">
          <div className="px-6 pt-4 flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {['All Orders', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                  activeTab === tab ? 'text-primary' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 lg:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search orders, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-200 transition-colors">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-200 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-200">
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-neutral-950 hover:text-primary cursor-pointer transition-colors">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${order.customer.color} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>
                        {order.customer.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-950">{order.customer.name}</p>
                        <p className="text-[10px] text-neutral-500">{order.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{order.items} items</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-neutral-950">${order.total.toFixed(2)}</span>
                      <span className={`text-[10px] font-bold ${order.payment === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {order.payment}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary-light rounded-lg transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-8 h-8 text-neutral-200" />
                      <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider">No orders found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 lg:p-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Showing <span className="text-neutral-950">1-5</span> of <span className="text-neutral-950">482</span> orders
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
  );
}
