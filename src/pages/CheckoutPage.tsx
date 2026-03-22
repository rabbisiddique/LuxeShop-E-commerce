'use client';

import CheckoutStepper from '@/src/components/checkout/CheckoutStepper';
import AddressForm from '@/src/components/checkout/AddressForm';
import ShippingMethodSelector from '@/src/components/checkout/ShippingMethodSelector';
import OrderSummaryPanel from '@/src/components/checkout/OrderSummaryPanel';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Header with back button */}
      <div className="bg-white border-b border-[#E8E8E8] sticky top-[104px] z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/cart"
            className="flex items-center gap-2 text-[14px] font-medium text-[#4B4B4B] hover:text-[#FF6B35] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
          <div className="flex items-center gap-2 text-[#9A9A9A]">
            <ShieldCheck size={18} />
            <span className="text-[13px] font-medium">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Checkout Steps */}
          <div className="flex-1">
            <CheckoutStepper />
            
            <div className="flex flex-col gap-8">
              {/* In a real app, these would be conditional based on currentStep */}
              <AddressForm />
              <ShippingMethodSelector />
              
              {/* Payment Section Placeholder */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 shadow-sm opacity-50 grayscale pointer-events-none">
                <h2 className="font-['Playfair_Display'] text-[18px] font-semibold text-[#0D0D0D] mb-6">
                  Payment Method
                </h2>
                <p className="text-[14px] text-[#9A9A9A]">Complete previous steps to unlock payment options.</p>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:w-[400px] flex-shrink-0">
            <OrderSummaryPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
