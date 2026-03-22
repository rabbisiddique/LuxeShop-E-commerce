'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingCart, Star, StarHalf } from 'lucide-react';

interface ProductCardProps {
  id?: string;
  image?: string;
  category?: string;
  name?: string;
  price?: number;
  comparePrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: "SALE" | "NEW" | "FEATURED" | "BEST SELLER";
  inStock?: boolean;
  stockCount?: number;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({
  id = "1",
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
  category = "Electronics",
  name = "Premium Wireless Headphones",
  price = 129.99,
  comparePrice = 179.99,
  rating = 4.5,
  reviewCount = 248,
  badge = "SALE",
  inStock = true,
  stockCount = 8,
  viewMode = 'grid'
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : null;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={12} className="text-[#FF6B35] fill-[#FF6B35]" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i} size={12} className="text-[#FF6B35] fill-[#FF6B35]" />);
      } else {
        stars.push(<Star key={i} size={12} className="text-[#E8E8E8]" />);
      }
    }
    return stars;
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="group relative bg-white border border-[#E8E8E8] rounded-xl overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.10)] hover:border-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <Link href={`/products/${id}`} className="relative w-full sm:w-[240px] aspect-square sm:aspect-auto bg-[#F5F5F5] overflow-hidden block">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {badge && (
              <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                badge === 'SALE' ? 'bg-[#FF6B35] text-white' :
                badge === 'NEW' ? 'bg-[#0D0D0D] text-white' :
                badge === 'FEATURED' ? 'bg-[#2563EB] text-white' :
                'bg-[#FFF0EB] text-[#FF6B35] border border-[#FF6B35]'
              }`}>
                {badge}
              </span>
            )}
          </div>
        </Link>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-[0.8px] block mb-1.5">{category}</span>
            <Link href={`/products/${id}`}>
              <h3 className="text-lg font-semibold text-[#0D0D0D] mb-2 line-clamp-1 hover:text-[#FF6B35] transition-colors">{name}</h3>
            </Link>
            <p className="text-sm text-[#4B4B4B] line-clamp-2 mb-4">
              Experience unparalleled sound quality and comfort with our premium wireless headphones. Perfect for music lovers and professionals alike.
            </p>
            <div className="flex items-center gap-1 mb-4">
              <div className="flex items-center gap-0.5">{renderStars(rating)}</div>
              <span className="text-[13px] font-semibold text-[#0D0D0D] ml-1">{rating}</span>
              <span className="text-[12px] text-[#9A9A9A]">({reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#FF6B35]">${price}</span>
              {comparePrice && (
                <span className="text-sm text-[#9A9A9A] line-through">${comparePrice}</span>
              )}
            </div>
            <button className="bg-[#0D0D0D] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#FF6B35] transition-colors flex items-center gap-2">
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-white border border-[#E8E8E8] rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.10)] hover:border-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square bg-[#F5F5F5] overflow-hidden block">
        <Link href={`/products/${id}`} className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {badge && (
            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
              badge === 'SALE' ? 'bg-[#FF6B35] text-white' :
              badge === 'NEW' ? 'bg-[#0D0D0D] text-white' :
              badge === 'FEATURED' ? 'bg-[#2563EB] text-white' :
              'bg-[#FFF0EB] text-[#FF6B35] border border-[#FF6B35]'
            }`}>
              {badge}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 z-10 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <button className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#9A9A9A] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all">
            <Heart size={14} />
          </button>
          <Link 
            href={`/products/${id}`}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#9A9A9A] hover:bg-[#0D0D0D] hover:text-white transition-all"
          >
            <Eye size={14} />
          </Link>
        </div>

        {/* Quick Add Bar */}
        <div className={`absolute bottom-0 left-0 right-0 bg-[#0D0D0D] py-3 px-4 flex items-center justify-center gap-2 transition-transform duration-300 z-10 ${isHovered && inStock ? 'translate-y-0' : 'translate-y-full'}`}>
          <button className="w-full text-white text-[13px] font-semibold flex items-center justify-center gap-2 hover:text-[#FF6B35] transition-colors">
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
        
        {!inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 pointer-events-none">
            <span className="bg-[#9A9A9A] text-white px-4 py-2 rounded-lg text-sm font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-[0.8px] block mb-1.5">{category}</span>
        <Link href={`/products/${id}`}>
          <h3 className="text-[15px] font-semibold text-[#0D0D0D] mb-2 line-clamp-2 leading-[1.4] font-['DM_Sans'] hover:text-[#FF6B35] transition-colors">{name}</h3>
        </Link>
        
        <div className="flex items-center gap-0.5 mb-2.5">
          {renderStars(rating)}
          <span className="text-[13px] font-semibold text-[#0D0D0D] ml-1">{rating}</span>
          <span className="text-[12px] text-[#9A9A9A] ml-0.5">({reviewCount})</span>
        </div>

        <div className="mt-auto pt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-[#FF6B35]">${price}</span>
          {comparePrice && (
            <>
              <span className="text-sm text-[#9A9A9A] line-through">${comparePrice}</span>
              <span className="bg-[#FFF0EB] text-[#FF6B35] text-[11px] font-bold px-1.5 py-0.5 rounded-md ml-1">
                -{discount}%
              </span>
            </>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${inStock ? (stockCount <= 10 ? 'bg-[#D97706]' : 'bg-[#16A34A]') : 'bg-[#9A9A9A]'}`} />
          <span className={`text-[12px] font-medium ${inStock ? (stockCount <= 10 ? 'text-[#D97706]' : 'text-[#16A34A]') : 'text-[#9A9A9A]'}`}>
            {!inStock ? 'Sold Out' : stockCount <= 10 ? `Only ${stockCount} left` : 'In Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}
