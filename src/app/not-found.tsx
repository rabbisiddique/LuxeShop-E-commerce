'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  ShoppingBag, 
  ArrowLeft, 
  Zap, 
  Shirt, 
  Sparkles, 
  Trophy, 
  Tag, 
  Phone,
  Search,
  Star,
  Frown
} from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  const helpfulLinks = [
    { icon: Zap, label: "Electronics" },
    { icon: Shirt, label: "Fashion" },
    { icon: Sparkles, label: "Beauty" },
    { icon: Trophy, label: "Sports" },
    { icon: Tag, label: "Today's Deals" },
    { icon: Phone, label: "Contact Us" },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FF6B35]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#2563EB]/5 blur-[100px] rounded-full" />
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{ 
            backgroundImage: 'radial-gradient(#E8E8E8 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
      </div>

      {/* 404 Visual */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center justify-center font-['Playfair_Display'] text-[120px] sm:text-[180px] font-[900] leading-none tracking-[-4px]">
          <span className="text-[#FF6B35]">4</span>
          <div className="relative text-[#0D0D0D] mx-[-10px]">
            0
            {/* Face design inside 0 */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 flex gap-4">
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-10 h-4 border-b-2 border-white rounded-full opacity-40" />
          </div>
          <span className="text-[#FF6B35]">4</span>
        </div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-[-20px] text-[#FF6B35]/40 rotate-[15deg]"
        >
          <Star size={24} />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-[20%] left-[-30px] text-[#9A9A9A]"
        >
          <Frown size={20} />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-[20%] text-[#E8E8E8]"
        >
          <Search size={18} />
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 mt-2">
        <div className="inline-flex items-center px-3 py-1 bg-[#FFF0EB] border border-[#FFD4C2] rounded-full mb-4">
          <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-wider">Page Not Found</span>
        </div>
        
        <h1 className="font-['Playfair_Display'] text-[26px] sm:text-[36px] font-bold text-[#0D0D0D] leading-tight">
          This page took a day off.
        </h1>
        
        <p className="text-[16px] text-[#4B4B4B] mt-3 max-w-[420px] mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or is temporarily unavailable.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-8">
        <Link 
          href="/"
          className="h-[50px] px-7 bg-[#FF6B35] text-white rounded-xl text-[15px] font-bold flex items-center gap-2 shadow-[0_4px_14px_rgba(255,107,53,0.35)] hover:bg-[#E55A25] transition-all"
        >
          <Home size={16} />
          Go Home
        </Link>
        <Link 
          href="/products"
          className="h-[50px] px-6 bg-white border border-[#E8E8E8] text-[#0D0D0D] rounded-xl text-[15px] font-bold flex items-center gap-2 hover:bg-[#F5F5F5] transition-all"
        >
          <ShoppingBag size={16} />
          Browse Products
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="h-[50px] px-5 text-[#4B4B4B] text-[15px] font-bold flex items-center gap-2 hover:text-[#FF6B35] transition-colors"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>

      {/* Helpful Links */}
      <div className="relative z-10 mt-12 w-full max-w-2xl">
        <p className="text-[13px] text-[#9A9A9A] mb-4">Or try one of these:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {helpfulLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link 
                key={i}
                href={`/products?category=${link.label.toLowerCase()}`}
                className="bg-white border border-[#E8E8E8] rounded-xl p-3 flex items-center gap-2.5 hover:border-[#FF6B35] hover:bg-[#FFF0EB] hover:-translate-y-0.5 transition-all group"
              >
                <Icon size={16} className="text-[#FF6B35]" />
                <span className="text-[13px] font-bold text-[#0D0D0D] group-hover:text-[#FF6B35] transition-colors">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 mt-10 w-full max-w-[480px]">
        <p className="text-[12px] text-[#9A9A9A] mb-2.5">Still can&apos;t find it? Search for it:</p>
        <div className="relative">
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full h-12 pl-4 pr-14 bg-white border-[1.5px] border-[#E8E8E8] rounded-xl text-[14px] font-['DM_Sans'] focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 outline-none transition-all"
          />
          <button className="absolute right-0 top-0 h-full w-12 bg-[#FF6B35] rounded-r-xl flex items-center justify-center text-white hover:bg-[#E55A25] transition-colors">
            <Search size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}
