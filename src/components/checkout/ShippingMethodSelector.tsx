'use client';

import { useState } from 'react';
import { Truck, Clock, Store, MapPin } from 'lucide-react';

const shippingOptions = [
  { id: 1, name: 'Standard Delivery', price: 'Free', time: '3–5 business days', icon: Truck },
  { id: 2, name: 'Express Delivery', price: '$9.99', time: '1–2 business days', icon: Truck, popular: true },
  { id: 3, name: 'Same Day Delivery', price: '$19.99', time: 'Today by 9pm', icon: Clock, urgent: true },
  { id: 4, name: 'Store Pickup', price: 'Free', time: 'Ready in 2hrs', icon: Store, store: true },
];

export default function ShippingMethodSelector() {
  const [selectedId, setSelectedId] = useState(2);

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7 sm:p-8 shadow-sm">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFF0EB] flex items-center justify-center text-[#FF6B35]">
            <Truck size={20} />
          </div>
          <h2 className="font-['Playfair_Display'] text-[18px] font-semibold text-[#0D0D0D]">
            Shipping Method
          </h2>
        </div>
        <span className="text-[12px] text-[#9A9A9A]">Step 2 of 4</span>
      </div>

      {/* OPTIONS LIST */}
      <div className="flex flex-col gap-3">
        {shippingOptions.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <div
              key={option.id}
              onClick={() => setSelectedId(option.id)}
              className={`group flex flex-col p-4.5 sm:p-5 border-[1.5px] rounded-xl cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-[#FFF0EB] border-[#FF6B35] shadow-[0_0_0_3px_rgba(255,107,53,0.1)]'
                  : 'bg-white border-[#E8E8E8] hover:border-[#FF6B35]/40 hover:bg-[#FAFAFA]'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Radio Circle */}
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                  isSelected ? 'border-[#FF6B35] bg-white shadow-[0_0_0_3px_rgba(255,107,53,0.15)]' : 'border-[#E8E8E8] bg-white'
                }`}>
                  {isSelected && <div className="w-3 h-3 bg-[#FF6B35] rounded-full" />}
                </div>

                {/* Method Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#0D0D0D]">{option.name}</span>
                    {option.popular && (
                      <span className="bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <option.icon size={13} className="text-[#9A9A9A]" />
                    <span className="text-[13px] text-[#4B4B4B]">{option.time}</span>
                    <span className="text-[12px] text-[#9A9A9A] ml-1">Estimated: Mon, Jan 13</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <span className={`text-[15px] font-bold ${
                    option.price === 'Free' ? 'text-[#16A34A]' : isSelected ? 'text-[#FF6B35]' : 'text-[#0D0D0D]'
                  }`}>
                    {option.price}
                  </span>
                </div>
              </div>

              {/* Same Day Extras */}
              {option.urgent && (
                <div className="mt-3 pt-3 border-t border-dashed border-[#E8E8E8] flex items-center gap-2">
                  <Clock size={13} className="text-[#D97706]" />
                  <span className="text-[12px] font-medium text-[#D97706]">
                    Order within 2h 34m for same-day delivery
                  </span>
                </div>
              )}

              {/* Store Pickup Extras */}
              {option.store && (
                <div className="mt-3 pt-3 border-t border-dashed border-[#E8E8E8] flex items-center gap-2">
                  <MapPin size={12} className="text-[#9A9A9A]" />
                  <span className="text-[12px] text-[#9A9A9A]">
                    LuxeShop Store — 123 Commerce St, NY
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ADDRESS SUMMARY */}
      <div className="mt-5 pt-5 border-t border-[#E8E8E8] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[12px] text-[#9A9A9A]">Delivering to:</span>
          <span className="text-[13px] font-medium text-[#0D0D0D]">123 Main St, New York, NY 10001</span>
        </div>
        <button className="text-[12px] text-[#FF6B35] font-medium hover:underline">
          Edit
        </button>
      </div>

      {/* CONTINUE BUTTON */}
      <button className="w-full h-12 bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(255,107,53,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-6">
        Continue to Payment →
      </button>
    </div>
  );
}
