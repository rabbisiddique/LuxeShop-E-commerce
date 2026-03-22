'use client';

import { motion, AnimatePresence } from 'motion/react';
import { PackageSearch } from 'lucide-react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  viewMode?: 'grid' | 'list';
  isLoading?: boolean;
  category?: string;
}

const placeholderProducts = [
  { id: '1', name: 'Premium Wireless Headphones', price: 129.99, comparePrice: 179.99, badge: 'SALE', rating: 4.8, reviewCount: 124, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '2', name: 'Ultra-Slim Smart Watch', price: 249.00, badge: 'NEW', rating: 4.5, reviewCount: 86, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '3', name: 'Professional DSLR Camera', price: 899.00, comparePrice: 1099.00, badge: 'FEATURED', rating: 4.9, reviewCount: 52, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '4', name: 'Noise Cancelling Earbuds', price: 79.99, rating: 4.2, reviewCount: 210, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '5', name: 'Portable Bluetooth Speaker', price: 45.00, comparePrice: 59.00, badge: 'BEST SELLER', rating: 4.7, reviewCount: 340, image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '6', name: 'Mechanical Gaming Keyboard', price: 119.00, rating: 4.6, reviewCount: 156, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '7', name: 'Ergonomic Wireless Mouse', price: 39.99, badge: 'SALE', rating: 4.4, reviewCount: 92, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '8', name: '4K Ultra HD Monitor', price: 349.00, comparePrice: 429.00, rating: 4.8, reviewCount: 45, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '9', name: 'Smart Home Hub', price: 129.00, badge: 'NEW', rating: 4.3, reviewCount: 68, image: 'https://images.unsplash.com/photo-1558002038-103792e19724?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '10', name: 'High-Speed External SSD', price: 159.00, rating: 4.9, reviewCount: 112, image: 'https://images.unsplash.com/photo-1597872200370-499df514417b?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '11', name: 'Wireless Charging Pad', price: 29.99, comparePrice: 39.99, rating: 4.1, reviewCount: 184, image: 'https://images.unsplash.com/photo-1586816832793-e11c0c35b0d0?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '12', name: 'Compact Projector', price: 199.00, badge: 'SALE', rating: 4.4, reviewCount: 34, image: 'https://images.unsplash.com/photo-1535016120720-40c646bebbfc?q=80&w=600&auto=format&fit=crop', category: 'electronics' },
  { id: '13', name: 'Summer Floral Dress', price: 89.00, badge: 'NEW', rating: 4.7, reviewCount: 45, image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&auto=format&fit=crop', category: 'fashion' },
  { id: '14', name: 'Classic Leather Jacket', price: 299.00, comparePrice: 399.00, badge: 'SALE', rating: 4.9, reviewCount: 32, image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=600&auto=format&fit=crop', category: 'fashion' },
  { id: '15', name: 'Hydrating Face Serum', price: 45.00, rating: 4.8, reviewCount: 124, image: 'https://images.unsplash.com/photo-1570172619380-2126400a7291?q=80&w=600&auto=format&fit=crop', category: 'beauty' },
  { id: '16', name: 'Matte Lipstick Set', price: 35.00, badge: 'BEST SELLER', rating: 4.6, reviewCount: 89, image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?q=80&w=600&auto=format&fit=crop', category: 'beauty' },
  { id: '17', name: 'Professional Running Shoes', price: 229.99, badge: 'NEW', rating: 4.8, reviewCount: 56, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop', category: 'sports' },
  { id: '18', name: 'Premium Yoga Mat', price: 74.99, badge: 'SALE', rating: 4.7, reviewCount: 92, image: 'https://images.unsplash.com/photo-1592432676556-28456573a50d?q=80&w=600&auto=format&fit=crop', category: 'sports' },
];

export default function ProductGrid({ viewMode = 'grid', isLoading = false, category }: ProductGridProps) {
  const filteredProducts = category 
    ? placeholderProducts.filter(p => p.category === category.toLowerCase())
    : placeholderProducts;

  if (isLoading) {
    return (
      <div className={`flex-1 ${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-5' : 'flex flex-col gap-3'}`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-[#F5F5F5] rounded-xl overflow-hidden relative">
            <div className="aspect-square bg-[#E8E8E8]" />
            <div className="p-4 space-y-3">
              <div className="h-3 w-[60%] bg-[#E8E8E8] rounded-full" />
              <div className="h-3 w-[80%] bg-[#E8E8E8] rounded-full" />
              <div className="h-4 w-[40%] bg-[#E8E8E8] rounded-full" />
            </div>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
        <div className="w-[120px] h-[120px] bg-[#F5F5F5] rounded-full flex items-center justify-center mb-6">
          <PackageSearch size={64} className="text-[#E8E8E8]" />
        </div>
        <h3 className="text-xl font-semibold text-[#0D0D0D]">No products found</h3>
        <p className="text-sm text-[#9A9A9A] mt-2 max-w-xs">Try adjusting your filters or search term to find what you&apos;re looking for.</p>
        <button className="mt-6 px-6 py-2.5 border border-[#E8E8E8] rounded-lg text-sm font-semibold text-[#0D0D0D] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all">
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className={`flex-1 ${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-5' : 'flex flex-col gap-3'}`}>
      <AnimatePresence>
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
          >
            <ProductCard 
              {...product} 
              viewMode={viewMode}
              badge={product.badge as any}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
