'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  Filter, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronRight,
  Clock,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import StatsCard from '@/src/components/admin/StatsCard';
import SalesChart from '@/src/components/admin/SalesChart';
import { motion } from 'motion/react';
import Image from 'next/image';

const statsData = [
  { title: 'Total Revenue', value: '$128,430', change: '+12.5%', isPositive: true, icon: DollarSign, data: [{value: 10}, {value: 25}, {value: 15}, {value: 40}, {value: 30}, {value: 50}] },
  { title: 'Total Orders', value: '1,240', change: '+8.2%', isPositive: true, icon: ShoppingBag, data: [{value: 20}, {value: 15}, {value: 35}, {value: 25}, {value: 45}, {value: 40}] },
  { title: 'Total Customers', value: '8,432', change: '+14.1%', isPositive: true, icon: Users, data: [{value: 5}, {value: 10}, {value: 20}, {value: 15}, {value: 25}, {value: 35}] },
  { title: 'Avg. Order Value', value: '$103.50', change: '-2.4%', isPositive: false, icon: TrendingUp, data: [{value: 40}, {value: 35}, {value: 30}, {value: 25}, {value: 20}, {value: 15}] },
];

const XCircle = ({ className }: { className?: string }) => <AlertCircle className={className} />; // Fallback

const recentActivity = [
  { id: 1, type: 'order', user: 'Sarah Johnson', action: 'placed a new order', time: '2 mins ago', icon: ShoppingBag, color: 'bg-primary' },
  { id: 2, type: 'customer', user: 'Michael Chen', action: 'registered as a new customer', time: '15 mins ago', icon: User, color: 'bg-emerald-500' },
  { id: 3, type: 'review', user: 'Emma Wilson', action: 'left a 5-star review', time: '1 hour ago', icon: CheckCircle2, color: 'bg-amber-500' },
  { id: 4, type: 'stock', user: 'System', action: 'Silk Blouse is low in stock', time: '3 hours ago', icon: AlertCircle, color: 'bg-rose-500' },
  { id: 5, type: 'order', user: 'James Miller', action: 'cancelled an order', time: '5 hours ago', icon: XCircle, color: 'bg-neutral-400' },
];

const bestSellers = [
  { name: 'Classic Silk Blouse', sales: 482, revenue: '$57,840', image: 'https://picsum.photos/seed/silk/50/50' },
  { name: 'Leather Crossbody Bag', sales: 324, revenue: '$27,540', image: 'https://picsum.photos/seed/bag/50/50' },
  { name: 'Minimalist Gold Watch', sales: 156, revenue: '$39,000', image: 'https://picsum.photos/seed/watch/50/50' },
  { name: 'Cashmere V-Neck Sweater', sales: 124, revenue: '$22,320', image: 'https://picsum.photos/seed/sweater/50/50' },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-950">Analytics Overview</h1>
          <p className="text-neutral-500 mt-1">Track your store performance and customer behavior</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-neutral-200 rounded-xl px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-neutral-400 mr-2" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-sm font-bold text-neutral-700 outline-none appearance-none pr-4"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
            </select>
          </div>
          <button className="p-2.5 bg-white border border-neutral-200 text-neutral-600 rounded-xl hover:bg-neutral-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-lg">Recent Activity</h3>
            <button className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 space-y-6">
            {recentActivity.map((activity, i) => (
              <div key={activity.id} className="flex gap-4 relative">
                {i !== recentActivity.length - 1 && (
                  <div className="absolute left-[18px] top-10 bottom-[-24px] w-px bg-neutral-100"></div>
                )}
                <div className={`w-9 h-9 rounded-full ${activity.color} flex items-center justify-center shrink-0 shadow-sm`}>
                  <activity.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-600 leading-tight">
                    <span className="font-bold text-neutral-950">{activity.user}</span> {activity.action}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full py-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl text-xs font-bold text-neutral-600 transition-all border border-neutral-200 flex items-center justify-center gap-2">
            View All Activity
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Best Sellers & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Best Sellers */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-lg">Best Selling Products</h3>
            <button className="text-xs font-bold text-primary hover:underline">View Report</button>
          </div>
          <div className="space-y-4">
            {bestSellers.map((product) => (
              <div key={product.name} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-xl transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-neutral-200 shrink-0">
                    <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-950 group-hover:text-primary transition-colors">{product.name}</p>
                    <p className="text-xs text-neutral-500">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-neutral-950">{product.revenue}</p>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center justify-end">
                    <ArrowUpRight className="w-3 h-3" /> +15%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-neutral-950 text-white p-8 rounded-2xl shadow-xl shadow-neutral-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Smart Insights</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Based on your sales data from the last 30 days, we recommend increasing stock for <span className="text-white font-bold">Classic Silk Blouse</span> as it&apos;s trending up by 24%. 
              <br /><br />
              Your conversion rate is 4.7%, which is <span className="text-emerald-400 font-bold">above industry average</span>.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Conversion</p>
                <p className="text-xl font-bold">4.7%</p>
              </div>
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Bounce Rate</p>
                <p className="text-xl font-bold">32.4%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
