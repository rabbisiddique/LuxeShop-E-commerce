'use client';

import { useParams } from 'next/navigation';
import ProductImageGallery from '@/src/components/shop/ProductImageGallery';
import ProductInfo from '@/src/components/shop/ProductInfo';
import ProductVariantSelector from '@/src/components/shop/ProductVariantSelector';
import ProductQuantityPicker from '@/src/components/shop/ProductQuantityPicker';
import ProductActions from '@/src/components/shop/ProductActions';
import ProductDescription from '@/src/components/shop/ProductDescription';
import RatingHistogram from '@/src/components/reviews/RatingHistogram';
import ReviewCard from '@/src/components/reviews/ReviewCard';
import WebReviews from '@/src/components/reviews/WebReviews';

const products = [
  { id: '1', name: 'Premium Wireless Headphones', price: 129.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
  { id: '2', name: 'Ultra-Slim Smart Watch', price: 249.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop' },
  { id: '3', name: 'Professional DSLR Camera', price: 899.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop' },
  { id: '4', name: 'Noise Cancelling Earbuds', price: 79.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop' },
  { id: '5', name: 'Portable Bluetooth Speaker', price: 45.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop' },
  { id: '6', name: 'Mechanical Gaming Keyboard', price: 119.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=600&auto=format&fit=crop' },
  { id: '7', name: 'Ergonomic Wireless Mouse', price: 39.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop' },
  { id: '8', name: '4K Ultra HD Monitor', price: 349.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop' },
  { id: '9', name: 'Smart Home Hub', price: 129.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1558002038-103792e19724?q=80&w=600&auto=format&fit=crop' },
  { id: '10', name: 'High-Speed External SSD', price: 159.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1597872200370-499df514417b?q=80&w=600&auto=format&fit=crop' },
  { id: '11', name: 'Wireless Charging Pad', price: 29.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1586816832793-e11c0c35b0d0?q=80&w=600&auto=format&fit=crop' },
  { id: '12', name: 'Compact Projector', price: 199.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1535016120720-40c646bebbfc?q=80&w=600&auto=format&fit=crop' },
  { id: '13', name: 'Summer Floral Dress', price: 89.00, category: 'Fashion', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&auto=format&fit=crop' },
  { id: '14', name: 'Classic Leather Jacket', price: 299.00, category: 'Fashion', image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=600&auto=format&fit=crop' },
  { id: '15', name: 'Hydrating Face Serum', price: 45.00, category: 'Beauty', image: 'https://images.unsplash.com/photo-1570172619380-2126400a7291?q=80&w=600&auto=format&fit=crop' },
  { id: '16', name: 'Matte Lipstick Set', price: 35.00, category: 'Beauty', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?q=80&w=600&auto=format&fit=crop' },
];

export default function ProductDetailPage({ id: propId }: { id?: string }) {
  const params = useParams();
  const id = propId || (params?.id as string);
  
  const product = products.find(p => p.id === id) || products[0];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8">
        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2">
            <div className="sticky top-[120px]">
              <ProductImageGallery mainImage={product.image} />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <ProductInfo 
              name={product.name} 
              price={product.price} 
              category={product.category} 
            />
            <ProductVariantSelector />
            <ProductQuantityPicker />
            <ProductActions />
          </div>
        </div>

        {/* Description & Specs Section */}
        <ProductDescription />

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0D0D0D] mb-8">
            Customer Reviews
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Histogram & Web Reviews */}
            <div className="lg:w-1/3">
              <div className="sticky top-[120px] space-y-6">
                <RatingHistogram 
                  productName={product.name}
                  productImage={product.image}
                />
                <WebReviews productName={product.name} />
              </div>
            </div>

            {/* Right: Individual Reviews */}
            <div className="lg:w-2/3">
              <ReviewCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
