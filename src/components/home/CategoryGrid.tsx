'use client';

import { useState, useEffect } from 'react';
import { Grid } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/src/lib/supabase/client';

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .limit(6);
        
        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Fallback mock data if table doesn't exist
        setCategories([
          { id: '1', name: 'Electronics', slug: 'electronics', image_url: 'https://picsum.photos/seed/tech/800/400' },
          { id: '2', name: 'Fashion', slug: 'fashion', image_url: 'https://picsum.photos/seed/fashion/400/400' },
          { id: '3', name: 'Beauty', slug: 'beauty', image_url: 'https://picsum.photos/seed/beauty/400/400' },
          { id: '4', name: 'Sports', slug: 'sports', image_url: 'https://picsum.photos/seed/sports/400/400' },
          { id: '5', name: 'Home', slug: 'home', image_url: 'https://picsum.photos/seed/home/400/400' },
          { id: '6', name: 'Accessories', slug: 'accessories', image_url: 'https://picsum.photos/seed/watch/400/400' },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="h-3 w-32 bg-[#E8E8E8] rounded mb-2 animate-pulse" />
            <div className="h-10 w-64 bg-[#E8E8E8] rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-2 aspect-[2/1] bg-[#E8E8E8] rounded-xl animate-pulse" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-[#E8E8E8] rounded-xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[11px] font-semibold text-[#FF6B35] uppercase tracking-[1.2px] block mb-2">
            SHOP BY CATEGORY
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#0D0D0D]">
            Explore Our Collections
          </h2>
        </div>
        <a href="/categories" className="text-sm font-medium text-[#FF6B35] hover:underline flex items-center gap-1">
          View All →
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <a
            key={category.id}
            href={`/category/${category.slug}`}
            className={`group relative overflow-hidden rounded-xl bg-[#F5F5F5] ${
              index === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'
            }`}
          >
            {/* Image Layer */}
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
              {category.image_url ? (
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-[#9A9A9A]">
                  <Grid size={48} />
                </div>
              )}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 p-5 lg:p-6 w-full">
              <h3 className="font-['Playfair_Display'] text-xl lg:text-2xl font-semibold text-white mb-1">
                {category.name}
              </h3>
              <span className="text-[13px] font-['DM_Sans'] text-white/70 group-hover:text-white transition-colors flex items-center gap-1">
                Shop now <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>

            {/* Hover Ring */}
            <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-[#FF6B35] transition-all duration-300 rounded-xl pointer-events-none" />
          </a>
        ))}
      </div>
    </section>
  );
}
