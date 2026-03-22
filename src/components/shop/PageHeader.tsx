import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  category?: string;
  title?: string;
  description?: string;
  productCount?: number;
  breadcrumbs?: Breadcrumb[];
}

const categoryData: Record<string, { title: string; description: string }> = {
  electronics: {
    title: "Electronics",
    description: "Cutting-edge gadgets and premium tech accessories for your modern lifestyle."
  },
  fashion: {
    title: "Fashion",
    description: "Discover the latest trends in high-end apparel and designer clothing."
  },
  beauty: {
    title: "Beauty",
    description: "Premium skincare, makeup, and wellness products for your daily routine."
  },
  sports: {
    title: "Sports",
    description: "High-performance gear and equipment for athletes and fitness enthusiasts."
  }
};

export default function PageHeader({
  category,
  title: propTitle,
  description: propDescription,
  productCount = 124,
  breadcrumbs: propBreadcrumbs,
}: PageHeaderProps) {
  const categoryInfo = category ? categoryData[category.toLowerCase()] : null;
  const title = propTitle || categoryInfo?.title || "Shop All";
  const description = propDescription || categoryInfo?.description || "Explore our curated collection of premium products across all categories.";
  
  const breadcrumbs = propBreadcrumbs || [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    ...(category ? [{ label: title, href: `/category/${category.toLowerCase()}` }] : []),
  ];

  return (
    <div className="w-full bg-white border-b border-[#E8E8E8] py-6">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-[6px] mb-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {breadcrumbs.map((item, index) => (
              <div key={item.label} className="flex items-center gap-[6px]">
                <Link
                  href={item.href}
                  className={`text-[13px] transition-colors ${
                    index === breadcrumbs.length - 1
                      ? "text-[#0D0D0D] font-medium pointer-events-none"
                      : "text-[#9A9A9A] hover:text-[#FF6B35]"
                  }`}
                >
                  {item.label}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight size={12} className="text-[#9A9A9A]" />
                )}
              </div>
            ))}
          </nav>

          {/* Title & Count */}
          <div className="flex flex-col">
            <h1 className="font-['Playfair_Display'] text-2xl sm:text-[32px] font-bold text-[#0D0D0D] leading-tight">
              {title}
            </h1>
            <p className="font-['DM_Sans'] text-[13px] text-[#9A9A9A] mt-1">
              Showing {productCount} products
            </p>
            {description && (
              <p className="font-['DM_Sans'] text-sm text-[#4B4B4B] mt-2 max-w-2xl hidden sm:block">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Category Image (Desktop) */}
        <div className="hidden lg:block">
          <div className="w-12 h-12 rounded-full border-2 border-[#FF6B35] overflow-hidden bg-[#F5F5F5] relative">
            <Image
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=100&auto=format&fit=crop"
              alt={title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
