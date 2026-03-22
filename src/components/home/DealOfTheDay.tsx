"use client";

import { useCartStore } from "@/src/store/cart";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

interface Product {
  id: string;
  name: string;
  price: number;
  compare_at_price: number;
  image_url: string;
  description: string;
  stock: number;
  category: { name: string };
}

export default function DealOfTheDay() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchDeal() {
      try {
        // const { data, error } = await supabase
        //   .from('products')
        //   .select('*, category:categories(name)')
        //   .eq('is_featured', true)
        //   .not('compare_at_price', 'is', null)
        //   .limit(1)
        //   .single();
        // if (error) throw error;
        // setProduct(data);
      } catch (err) {
        console.error("Error fetching deal:", err);
        // Mock fallback
        setProduct({
          id: "deal-1",
          name: "Premium Wireless Headphones Pro",
          price: 199,
          compare_at_price: 299,
          image_url: "https://picsum.photos/seed/headphones/600/600",
          description:
            "Experience studio-quality sound with active noise cancellation and 40-hour battery life.",
          stock: 12,
          category: { name: "Electronics" },
        });
      } finally {
        setLoading(false);
      }
    }
    fetchDeal();
  }, []);

  if (loading || !product) return null;

  const savings = product.compare_at_price - product.price;
  const savingsPercent = Math.round((savings / product.compare_at_price) * 100);
  const stockPercent = (product.stock / 40) * 100; // Assuming 40 is max for visual

  return (
    <section className="w-full bg-[#0D0D0D] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-[2px] block mb-3">
            TODAY&apos;S DEAL
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-white mb-4">
            Deal of the Day
          </h2>
          <p className="text-sm text-[#9A9A9A] max-w-md mx-auto">
            Prices reset at midnight. Don&apos;t miss out on these exclusive
            savings.
          </p>
        </div>

        {/* Main Deal Card */}
        <div className="bg-[#1F1F1F] rounded-2xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-10 gap-10 items-center">
          {/* Image Side */}
          <div className="lg:col-span-4 relative aspect-square rounded-xl overflow-hidden bg-[#2A2A2A]">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#FF6B35] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm">
              HOT DEAL
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-widest mb-2">
              {product.category?.name}
            </span>
            <h3 className="font-['Playfair_Display'] text-2xl lg:text-3xl font-bold text-white mb-4">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#FF6B35]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-xs text-[#9A9A9A]">(128 Reviews)</span>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl lg:text-4xl font-bold text-[#FF6B35]">
                ${product.price}
              </span>
              <span className="text-xl text-[#9A9A9A] line-through">
                ${product.compare_at_price}
              </span>
              <span className="bg-[#FF6B35]/15 text-[#FF6B35] text-[11px] font-bold px-3 py-1 rounded-full">
                Save ${savings} ({savingsPercent}% off)
              </span>
            </div>

            <p className="text-sm text-[#9A9A9A] mb-8 leading-relaxed line-clamp-2">
              {product.description}
            </p>

            {/* Stock Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-white">
                  Only {product.stock} left! Selling fast
                </span>
                <span className="text-[10px] text-[#9A9A9A] uppercase tracking-wider">
                  {Math.round(stockPercent)}% Claimed
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF6B35] transition-all duration-1000 ease-out"
                  style={{ width: `${stockPercent}%` }}
                />
              </div>
            </div>

            {/* Countdown */}
            <div className="mb-10">
              <CountdownTimer />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image_url,
                  })
                }
                className="w-full sm:flex-1 bg-[#FF6B35] text-white py-4 font-bold text-sm uppercase tracking-widest hover:bg-[#E55A25] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <Link
                href={`/products/${product.id}`}
                className="text-white/60 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
              >
                View Product <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
