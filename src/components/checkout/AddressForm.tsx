'use client';

import { MapPin, Mail, Phone, ChevronDown, Check, AlertCircle, Plus } from 'lucide-react';

export default function AddressForm() {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7 sm:p-8 shadow-sm">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFF0EB] flex items-center justify-center text-[#FF6B35]">
            <MapPin size={20} />
          </div>
          <h2 className="font-['Playfair_Display'] text-[18px] font-semibold text-[#0D0D0D]">
            Shipping Address
          </h2>
        </div>
        <span className="text-[12px] text-[#9A9A9A]">Step 1 of 4</span>
      </div>

      {/* SAVED ADDRESS QUICK-SELECT */}
      <div className="mb-6 pb-6 border-b border-dashed border-[#E8E8E8]">
        <label className="block text-[12px] font-semibold text-[#4B4B4B] uppercase tracking-wider mb-3">
          Saved Addresses
        </label>
        <div className="flex flex-wrap gap-2.5">
          <button className="flex items-center gap-2 bg-[#FFF0EB] border-[1.5px] border-[#FF6B35] px-3 py-2 rounded-lg text-[12px] font-medium text-[#FF6B35] transition-all">
            <MapPin size={12} />
            Home — 123 Main St
          </button>
          <button className="flex items-center gap-2 bg-[#F5F5F5] border border-[#E8E8E8] px-3 py-2 rounded-lg text-[12px] font-medium text-[#1F1F1F] hover:border-[#FF6B35] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all">
            <MapPin size={12} className="text-[#9A9A9A]" />
            Office — 456 Tech Ave
          </button>
          <button className="flex items-center gap-2 border border-dashed border-[#E8E8E8] px-3 py-2 rounded-lg text-[12px] font-medium text-[#9A9A9A] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all">
            <Plus size={12} />
            Add New
          </button>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">First Name*</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] rounded-lg px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">Last Name*</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] rounded-lg px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">Email Address*</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail size={16} className="text-[#9A9A9A]" />
            </div>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#16A34A] rounded-lg pl-10 pr-10 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
              <Check size={16} className="text-[#16A34A]" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">
            Phone Number <span className="text-[11px] text-[#9A9A9A] font-normal ml-1">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Phone size={16} className="text-[#9A9A9A]" />
            </div>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] rounded-lg pl-10 px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">Street Address*</label>
          <input
            type="text"
            defaultValue="123 Main Street"
            className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#DC2626] rounded-lg px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all"
          />
          <div className="flex items-center gap-1.5 mt-1.5 text-[#DC2626]">
            <AlertCircle size={12} />
            <span className="text-[12px]">Please enter a valid address</span>
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">Apartment, Suite (optional)</label>
          <input
            type="text"
            placeholder="Apt, Suite, Unit (optional)"
            className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] rounded-lg px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">City*</label>
            <input
              type="text"
              defaultValue="New York"
              className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] rounded-lg px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">State*</label>
            <div className="relative">
              <select className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] rounded-lg px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all appearance-none">
                <option>New York</option>
                <option>California</option>
                <option>Texas</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-[#9A9A9A]" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">ZIP Code*</label>
            <input
              type="text"
              defaultValue="10001X invalid"
              className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#DC2626] rounded-lg px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all"
            />
            <div className="flex items-center gap-1.5 mt-1.5 text-[#DC2626]">
              <AlertCircle size={12} />
              <span className="text-[12px]">Invalid ZIP code</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#0D0D0D] mb-1.5">Country</label>
          <div className="relative">
            <select className="w-full h-11 bg-[#FAFAFA] border-[1.5px] border-[#E8E8E8] rounded-lg px-3.5 text-[14px] font-['DM_Sans'] text-[#0D0D0D] focus:outline-none focus:border-[#FF6B35] focus:ring-[3px] focus:ring-[#FF6B35]/15 transition-all appearance-none">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
              <ChevronDown size={16} className="text-[#9A9A9A]" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM OPTIONS */}
      <div className="mt-8 pt-6 border-t border-[#E8E8E8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="w-5 h-5 border-[1.5px] border-[#E8E8E8] rounded bg-white peer-checked:bg-[#FF6B35] peer-checked:border-[#FF6B35] transition-all" />
              <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <span className="text-[13px] font-medium text-[#1F1F1F]">Save this address to my account</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="w-5 h-5 border-[1.5px] border-[#E8E8E8] rounded bg-white peer-checked:bg-[#FF6B35] peer-checked:border-[#FF6B35] transition-all" />
              <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <span className="text-[13px] font-medium text-[#1F1F1F]">Billing address same as shipping</span>
          </label>
        </div>

        <button className="w-full sm:w-auto h-12 px-8 bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(255,107,53,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
          Continue to Shipping →
        </button>
      </div>
    </div>
  );
}
