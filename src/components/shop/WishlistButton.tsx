'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Loader2, Share2, Trash2, ShoppingCart, Eye, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistButtonProps {
  size?: 'sm' | 'md' | 'lg';
  isWishlisted?: boolean;
  isLoading?: boolean;
  onToggle?: () => void;
  showTooltip?: boolean;
}

const particles = [
  { id: 1, angle: 0, color: '#FF6B35' },
  { id: 2, angle: 60, color: '#E55A25' },
  { id: 3, angle: 120, color: '#FFB347' },
  { id: 4, angle: 180, color: '#FF6B35' },
  { id: 5, angle: 240, color: '#E55A25' },
  { id: 6, angle: 300, color: '#FFB347' },
];

export default function WishlistButton({
  size = 'md',
  isWishlisted: initialIsWishlisted = false,
  isLoading: initialIsLoading = false,
  showTooltip = true,
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isLoading, setIsLoading] = useState(initialIsLoading);
  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const toggleWishlist = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const nextState = !isWishlisted;
      setIsWishlisted(nextState);
      if (nextState) {
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 500);
      }
    }, 800);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 bg-white/90 backdrop-blur-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.10)]',
    md: 'w-10 h-10 bg-white border-[1.5px] border-[#E8E8E8] shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
    lg: 'w-[52px] h-[52px] bg-white border-[1.5px] border-[#E8E8E8] shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <div className="relative inline-block">
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && showTooltip && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -5, x: '-50%' }}
            animate={{ opacity: 1, y: -10, x: '-50%' }}
            exit={{ opacity: 0, y: -5, x: '-50%' }}
            transition={{ duration: 0.15 }}
            className={`absolute left-1/2 bottom-full mb-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium whitespace-nowrap z-50 pointer-events-none
              ${isWishlisted ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#0D0D0D] text-white'}
            `}
          >
            {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            {/* Arrow */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] 
              ${isWishlisted ? 'border-t-[#FEF2F2]' : 'border-t-[#0D0D0D]'}
            `} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {showParticles && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  scale: 1, 
                  x: Math.cos(p.angle * Math.PI / 180) * 20, 
                  y: Math.sin(p.angle * Math.PI / 180) * 20,
                  opacity: 0 
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: p.color }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleWishlist}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center justify-center rounded-full transition-all duration-200
          ${sizeClasses[size]}
          ${isHovered ? 'bg-[#FFF0EB] border-[#FF6B35]' : ''}
          ${isWishlisted ? 'bg-[#FFF0EB] border-[#FF6B35] shadow-[0_0_0_3px_rgba(255,107,53,0.12)]' : ''}
          ${isLoading ? 'cursor-wait opacity-80' : 'cursor-pointer'}
        `}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 
                size={iconSizes[size]} 
                className="text-[#FF6B35] animate-spin" 
                style={{ strokeWidth: 2.5 }}
              />
            </motion.div>
          ) : (
            <motion.div
              key={isWishlisted ? 'active' : 'inactive'}
              initial={isWishlisted ? { scale: 1 } : { scale: 1 }}
              animate={isWishlisted ? {
                scale: [1, 1.4, 0.9, 1.1, 1],
              } : { scale: 1 }}
              transition={isWishlisted ? {
                duration: 0.45,
                times: [0, 0.33, 0.55, 0.77, 1],
                ease: "easeOut"
              } : { duration: 0.2 }}
            >
              <Heart 
                size={iconSizes[size]} 
                className={`transition-colors duration-200 ${
                  isWishlisted ? 'fill-[#FF6B35] text-[#FF6B35]' : 
                  isHovered ? 'text-[#FF6B35]' : 'text-[#9A9A9A]'
                }`}
                style={{ strokeWidth: isWishlisted ? 0 : 2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// --- DESIGN SHOWCASE COMPONENTS ---

export function WishlistButtonShowcase() {
  return (
    <div className="p-12 bg-[#FAFAFA] space-y-16 font-['DM_Sans']">
      {/* 1. States & Sizes Grid */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-[#0D0D0D] border-b pb-4">Wishlist Button States & Sizes</h2>
        
        <div className="grid grid-cols-4 gap-12">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider">Default</span>
            <div className="flex items-center gap-6">
              <WishlistButton size="sm" />
              <WishlistButton size="md" />
              <WishlistButton size="lg" />
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider">Wishlisted</span>
            <div className="flex items-center gap-6">
              <WishlistButton size="sm" isWishlisted />
              <WishlistButton size="md" isWishlisted />
              <WishlistButton size="lg" isWishlisted />
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider">Loading</span>
            <div className="flex items-center gap-6">
              <WishlistButton size="sm" isLoading />
              <WishlistButton size="md" isLoading />
              <WishlistButton size="lg" isLoading />
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider">Hover (Tooltip)</span>
            <div className="flex items-center gap-6 pt-8">
              <div className="relative group">
                <WishlistButton size="md" />
                {/* Manual Tooltip for Showcase */}
                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 px-2.5 py-1.5 rounded-md text-[11px] font-medium bg-[#0D0D0D] text-white z-10">
                  Add to Wishlist
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-t-[#0D0D0D]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Context Mockups */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-[#0D0D0D] border-b pb-4">Placement Contexts</h2>
        
        <div className="grid grid-cols-3 gap-8">
          {/* Context A: Product Grid Card */}
          <div className="space-y-4">
            <span className="text-sm font-medium text-[#4B4B4B]">Context A: Product Grid</span>
            <div className="relative w-full aspect-[4/5] bg-white border border-[#E8E8E8] rounded-xl overflow-hidden group">
              <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center text-[#9A9A9A] text-xs">Product Image</div>
              <div className="absolute top-2.5 right-2.5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                <WishlistButton size="sm" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                <div className="h-3 w-2/3 bg-[#F5F5F5] rounded mb-2" />
                <div className="h-4 w-1/2 bg-[#F5F5F5] rounded" />
              </div>
            </div>
          </div>

          {/* Context B: List View Card */}
          <div className="space-y-4">
            <span className="text-sm font-medium text-[#4B4B4B]">Context B: List View</span>
            <div className="w-full p-4 bg-white border border-[#E8E8E8] rounded-xl flex gap-4 items-center">
              <div className="w-20 h-20 bg-[#F5F5F5] rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-[#F5F5F5] rounded" />
                <div className="h-3 w-1/2 bg-[#F5F5F5] rounded" />
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-[#0D0D0D] text-white text-xs font-bold rounded-lg">Add to Cart</button>
                <WishlistButton size="md" />
              </div>
            </div>
          </div>

          {/* Context C: Product Detail */}
          <div className="space-y-4">
            <span className="text-sm font-medium text-[#4B4B4B]">Context C: Product Detail</span>
            <div className="p-6 bg-white border border-[#E8E8E8] rounded-xl space-y-6">
              <div className="space-y-2">
                <div className="h-8 w-full bg-[#F5F5F5] rounded" />
                <div className="h-6 w-1/3 bg-[#F5F5F5] rounded" />
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 h-[52px] bg-[#FF6B35] text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(255,107,53,0.35)]">
                  Add to Cart
                </button>
                <WishlistButton size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navbar Context */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-[#0D0D0D] border-b pb-4">Navbar Context</h2>
        <div className="flex items-center gap-8 p-6 bg-white border border-[#E8E8E8] rounded-xl">
          <div className="text-lg font-bold">LuxeShop</div>
          <div className="flex-1" />
          <div className="flex items-center gap-6">
            <div className="relative">
              <Heart size={20} className="text-[#0D0D0D]" />
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B35] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white"
              >
                12
              </motion.div>
            </div>
            <div className="w-5 h-5 bg-[#0D0D0D] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
