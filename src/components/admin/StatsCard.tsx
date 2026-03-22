'use client';

import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer 
} from 'recharts';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  data: { value: number }[];
  color?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  data,
  color = "#FF6B35"
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 bg-neutral-100 rounded-xl group-hover:bg-primary-light transition-colors">
          <Icon className="w-5 h-5 text-neutral-600 group-hover:text-primary transition-colors" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-display font-bold text-neutral-950">{value}</h3>
      </div>

      {/* Sparkline */}
      <div className="h-12 mt-4 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? '#10b981' : '#f43f5e'} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#gradient-${title})`} 
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
