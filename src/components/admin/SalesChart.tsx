'use client';

import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';
import { Download, Calendar, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { motion } from 'motion/react';

const salesData = [
  { name: 'Jan', revenue: 45000, orders: 320 },
  { name: 'Feb', revenue: 52000, orders: 380 },
  { name: 'Mar', revenue: 48000, orders: 350 },
  { name: 'Apr', revenue: 61000, orders: 420 },
  { name: 'May', revenue: 55000, orders: 390 },
  { name: 'Jun', revenue: 67000, orders: 480 },
  { name: 'Jul', revenue: 72000, orders: 510 },
  { name: 'Aug', revenue: 69000, orders: 490 },
  { name: 'Sep', revenue: 78000, orders: 550 },
  { name: 'Oct', revenue: 85000, orders: 610 },
  { name: 'Nov', revenue: 92000, orders: 680 },
  { name: 'Dec', revenue: 110000, orders: 820 },
];

const categoryData = [
  { name: 'Fashion', value: 45000, color: '#FF6B35' },
  { name: 'Electronics', value: 32000, color: '#0D0D0D' },
  { name: 'Home', value: 28000, color: '#4B4B4B' },
  { name: 'Beauty', value: 15000, color: '#9A9A9A' },
  { name: 'Accessories', value: 12000, color: '#E8E8E8' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-neutral-200 shadow-xl rounded-xl">
        <p className="text-xs font-bold text-neutral-400 uppercase mb-2">{label} 2024</p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-xs text-neutral-600">Revenue</span>
            </div>
            <span className="text-sm font-bold">${payload[0].value.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neutral-950"></div>
              <span className="text-xs text-neutral-600">Orders</span>
            </div>
            <span className="text-sm font-bold">{payload[1]?.value}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function SalesChart() {
  const [period, setPeriod] = useState('Yearly');

  return (
    <div className="space-y-6">
      {/* Main Sales Chart */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-display font-bold text-neutral-950">Revenue Analytics</h2>
            <p className="text-sm text-neutral-500">Overview of sales and order performance</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-100 p-1 rounded-lg">
              {['Weekly', 'Monthly', 'Yearly'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    period === p 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="p-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary Pills */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="px-4 py-2 bg-primary-light rounded-xl border border-primary/10">
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Total Revenue</p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-neutral-950">$834,200</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +12.5%
              </span>
            </div>
          </div>
          <div className="px-4 py-2 bg-neutral-100 rounded-xl border border-neutral-200">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Total Orders</p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-neutral-950">5,842</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +8.2%
              </span>
            </div>
          </div>
          <div className="px-4 py-2 bg-neutral-100 rounded-xl border border-neutral-200">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Avg. Order Value</p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-neutral-950">$142.80</span>
              <span className="text-[10px] font-bold text-rose-600 flex items-center">
                <ArrowDownRight className="w-3 h-3" /> -2.1%
              </span>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#9A9A9A' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#9A9A9A' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FF6B35', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#FF6B35" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                dataKey="orders" 
                stroke="#0D0D0D" 
                strokeWidth={2}
                fill="transparent"
                strokeDasharray="5 5"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-lg">Revenue by Category</h3>
            <button className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 40 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#1F1F1F' }}
                />
                <Tooltip 
                  cursor={{ fill: '#F5F5F5' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Funnel / Conversion */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-6">Sales Funnel</h3>
          <div className="space-y-4">
            {[
              { label: 'Visits', value: '124,500', percent: 100, color: 'bg-neutral-950' },
              { label: 'Product Views', value: '86,200', percent: 69, color: 'bg-neutral-800' },
              { label: 'Add to Cart', value: '12,400', percent: 14, color: 'bg-neutral-600' },
              { label: 'Checkout', value: '8,200', percent: 9, color: 'bg-primary' },
              { label: 'Purchased', value: '5,842', percent: 4.7, color: 'bg-primary-dark' },
            ].map((step) => (
              <div key={step.label} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-neutral-600">{step.label}</span>
                  <span className="text-neutral-950">{step.value} <span className="text-neutral-400 font-normal ml-1">({step.percent}%)</span></span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${step.percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${step.color} rounded-full`}
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
