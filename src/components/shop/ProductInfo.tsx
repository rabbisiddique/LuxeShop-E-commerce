import { Star, ShieldCheck, Zap, Wifi, Shield, Share2 } from 'lucide-react';

interface ProductInfoProps {
  name?: string;
  price?: number;
  category?: string;
}

export default function ProductInfo({ 
  name = "Premium Wireless Noise-Cancelling Headphones",
  price = 129.99,
  category = "Electronics"
}: ProductInfoProps) {
  const comparePrice = price * 1.4;
  const savings = comparePrice - price;
  const savingsPercent = Math.round((savings / comparePrice) * 100);

  return (
    <div className="flex flex-col">
      {/* Row 1: Category + Brand */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-[0.8px] bg-[#FFF0EB] px-2.5 py-1 rounded-full">
          {category}
        </span>
        <span className="text-[#E8E8E8] text-xs">/</span>
        <button className="text-[13px] font-medium text-[#4B4B4B] hover:text-[#FF6B35] transition-colors">
          SoundMaster Pro
        </button>
      </div>

      {/* Row 2: Product Name */}
      <h1 className="font-['Playfair_Display'] text-2xl lg:text-[32px] font-bold text-[#0D0D0D] leading-tight mb-4">
        {name}
      </h1>

      {/* Row 3: Rating Row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-0.5">
          {[...Array(4)].map((_, i) => (
            <Star key={i} size={16} className="text-[#FF6B35] fill-[#FF6B35]" />
          ))}
          <div className="relative">
            <Star size={16} className="text-[#E8E8E8]" />
            <div className="absolute inset-0 overflow-hidden w-[70%]">
              <Star size={16} className="text-[#FF6B35] fill-[#FF6B35]" />
            </div>
          </div>
        </div>
        <span className="text-[15px] font-bold text-[#0D0D0D]">4.7</span>
        <button className="text-[13px] text-[#9A9A9A] hover:underline">
          (2,847 reviews)
        </button>
        <div className="w-[1px] h-4 bg-[#E8E8E8]" />
        <div className="flex items-center gap-1.5 bg-[#F0FDF4] px-2 py-1 rounded-full">
          <ShieldCheck size={13} className="text-[#16A34A]" />
          <span className="text-[12px] font-medium text-[#16A34A]">Verified</span>
        </div>
      </div>

      {/* Row 4: Price Block */}
      <div className="mb-5">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="text-[36px] font-extrabold text-[#FF6B35]">${price.toFixed(2)}</span>
          <span className="text-[20px] text-[#9A9A9A] line-through">${comparePrice.toFixed(2)}</span>
          <span className="bg-[#FFF0EB] border border-[#FF6B35] text-[12px] font-semibold text-[#FF6B35] px-2.5 py-1 rounded-full">
            Save ${savings.toFixed(2)} ({savingsPercent}% off)
          </span>
        </div>
        <p className="text-[11px] text-[#9A9A9A] mt-1.5">Price inclusive of all taxes</p>
      </div>

      {/* Row 5: Stock Indicator */}
      <div className="flex flex-col gap-1.5 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D97706]" />
          <span className="text-[13px] font-semibold text-[#D97706]">
            Only 8 left — order soon!
          </span>
        </div>
        <div className="w-full h-1 bg-[#F5F5F5] rounded-full overflow-hidden">
          <div className="h-full bg-[#FF6B35] w-[80%]" />
        </div>
        <p className="text-[11px] text-[#9A9A9A] text-right">8 of 10 remaining</p>
      </div>

      {/* Row 6: Quick Specs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { icon: Zap, label: "40hr Battery" },
          { icon: Wifi, label: "Bluetooth 5.3" },
          { icon: Shield, label: "2yr Warranty" },
        ].map((spec, i) => (
          <div key={i} className="flex items-center gap-1.5 bg-[#F5F5F5] border border-[#E8E8E8] px-3 py-1.5 rounded-lg">
            <spec.icon size={14} className="text-[#FF6B35]" />
            <span className="text-[12px] text-[#4B4B4B]">{spec.label}</span>
          </div>
        ))}
      </div>

      {/* Row 7: SKU + Share */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[11px] text-[#9A9A9A]">SKU: SM-WH-001</span>
        <button className="flex items-center gap-1.5 text-[#9A9A9A] hover:text-[#FF6B35] transition-colors">
          <Share2 size={14} />
          <span className="text-[12px]">Share</span>
        </button>
      </div>
    </div>
  );
}
