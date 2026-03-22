'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Tag, 
  ShoppingCart, 
  DollarSign, 
  Percent, 
  Search, 
  Download, 
  Copy, 
  Edit2, 
  Trash2, 
  Calendar, 
  Users, 
  Truck, 
  X,
  Shuffle,
  ChevronDown
} from 'lucide-react';

export default function CouponsPage() {
  const [showModal, setShowModal] = useState(false);
  const [discountType, setDiscountType] = useState('percentage');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Categories']);

  const toggleCategory = (cat: string) => {
    if (cat === 'All Categories') {
      setSelectedCategories(['All Categories']);
      return;
    }

    setSelectedCategories(prev => {
      const filtered = prev.filter(c => c !== 'All Categories');
      if (filtered.includes(cat)) {
        const next = filtered.filter(c => c !== cat);
        return next.length === 0 ? ['All Categories'] : next;
      }
      return [...filtered, cat];
    });
  };

  const stats = [
    { label: 'Active Coupons', value: '5', icon: Tag, color: 'text-[#FF6B35]', bg: 'bg-[#FFF0EB]' },
    { label: 'Total Redemptions', value: '533', icon: ShoppingCart, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Revenue from Coupons', value: '$4,821', icon: DollarSign, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
    { label: 'Avg Discount', value: '$18.40', icon: Percent, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
  ];

  const coupons = [
    {
      code: 'WELCOME10',
      discount: '10% off',
      type: 'percentage',
      used: 142,
      limit: 500,
      savings: '$1,284',
      status: 'Active',
      expiry: 'No expiry',
      minOrder: 'No minimum',
      perCustomer: '1 per customer'
    },
    {
      code: 'SAVE30',
      discount: '$30 off',
      type: 'fixed',
      used: 89,
      limit: '∞',
      savings: '$2,670',
      status: 'Active',
      expiry: 'Jan 31, 2025',
      minOrder: '$150',
      perCustomer: 'Unlimited'
    },
    {
      code: 'FREESHIP',
      discount: 'Free Shipping',
      type: 'shipping',
      used: 234,
      limit: '∞',
      savings: '$1,170',
      status: 'Active',
      expiry: 'No expiry',
      minOrder: '$50',
      perCustomer: 'Unlimited'
    },
    {
      code: 'FLASH50',
      discount: '50% off',
      type: 'percentage',
      used: 12,
      limit: 50,
      savings: '$420',
      status: 'Expired',
      expiry: 'Jan 10, 2025',
      minOrder: 'No minimum',
      perCustomer: '1 per customer'
    },
    {
      code: 'VIP20',
      discount: '20% off',
      type: 'percentage',
      used: 56,
      limit: 200,
      savings: '$840',
      status: 'Active',
      expiry: 'Mar 31, 2025',
      minOrder: '$200',
      perCustomer: '1 per customer'
    },
    {
      code: 'NEWUSER15',
      discount: '15% off',
      type: 'percentage',
      used: 0,
      limit: '∞',
      savings: '$0',
      status: 'Draft',
      expiry: 'No expiry',
      minOrder: 'No minimum',
      perCustomer: '1 per customer'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-['Playfair_Display'] text-[32px] font-bold text-[#0D0D0D]">Coupons & Promotions</h1>
            <p className="text-[14px] text-[#9A9A9A] mt-1">Create and manage discount codes</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="h-[42px] px-5 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#E55A25] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Create Coupon
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white border border-[#E8E8E8] rounded-2xl p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <div className="text-[22px] font-bold text-[#0D0D0D] leading-none">{stat.value}</div>
                  <div className="text-[12px] text-[#9A9A9A] mt-1.5 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
              <input 
                type="text" 
                placeholder="Search coupon codes..."
                className="w-full h-10 pl-10 pr-4 bg-[#F5F5F5] border-transparent rounded-xl text-[13px] outline-none focus:bg-white focus:border-[#FF6B35] transition-all"
              />
            </div>
            <button className="w-full sm:w-auto h-10 px-4 border border-[#E8E8E8] rounded-xl text-[13px] font-medium text-[#4B4B4B] flex items-center justify-between gap-2 hover:bg-[#F5F5F5]">
              All Status <ChevronDown size={14} />
            </button>
            <button className="w-full sm:w-auto h-10 px-4 border border-[#E8E8E8] rounded-xl text-[13px] font-medium text-[#4B4B4B] flex items-center justify-between gap-2 hover:bg-[#F5F5F5]">
              All Types <ChevronDown size={14} />
            </button>
          </div>
          <button className="h-10 px-4 border border-[#E8E8E8] rounded-xl text-[13px] font-medium text-[#4B4B4B] flex items-center gap-2 hover:bg-[#F5F5F5]">
            <Download size={14} />
            Export
          </button>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((coupon, i) => (
            <div 
              key={i} 
              className={`bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${coupon.status === 'Expired' ? 'opacity-65 border-dashed' : ''}`}
            >
              {/* Top Stripe */}
              <div className={`h-1.5 w-full ${
                coupon.status === 'Active' ? 'bg-[#FF6B35]' : 
                coupon.status === 'Draft' ? 'bg-[#9A9A9A]' : 
                'bg-[#E8E8E8]'
              }`} />

              {/* Card Header */}
              <div className="px-5 py-4 border-b border-dashed border-[#E8E8E8]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[18px] font-bold font-mono tracking-[2px] text-[#0D0D0D]">{coupon.code}</div>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all">
                    <Copy size={14} />
                  </button>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  coupon.type === 'percentage' ? 'bg-[#FFF0EB] text-[#FF6B35]' :
                  coupon.type === 'fixed' ? 'bg-[#EFF6FF] text-[#2563EB]' :
                  'bg-[#F0FDF4] text-[#16A34A]'
                }`}>
                  {coupon.type === 'percentage' ? <Percent size={11} /> : 
                   coupon.type === 'fixed' ? <DollarSign size={11} /> : 
                   <Truck size={11} />}
                  {coupon.discount}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex gap-6 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[18px] font-bold text-[#0D0D0D]">{coupon.used}</span>
                    <span className="text-[11px] text-[#9A9A9A] mt-0.5 font-medium">times used</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[18px] font-bold text-[#0D0D0D]">{coupon.limit}</span>
                    <span className="text-[11px] text-[#9A9A9A] mt-0.5 font-medium">usage limit</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[18px] font-bold text-[#FF6B35]">{coupon.savings}</span>
                    <span className="text-[11px] text-[#9A9A9A] mt-0.5 font-medium">total saved</span>
                  </div>
                </div>

                {typeof coupon.limit === 'number' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[11px] text-[#9A9A9A] font-medium">{coupon.used} / {coupon.limit} used</span>
                      <span className="text-[11px] font-bold text-[#FF6B35]">{Math.round((coupon.used / coupon.limit) * 100)}%</span>
                    </div>
                    <div className="w-full h-1 bg-[#F5F5F5] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FF6B35] transition-all duration-500"
                        style={{ width: `${(coupon.used / coupon.limit) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[12px] text-[#4B4B4B]">
                    <Calendar size={13} className="text-[#9A9A9A]" />
                    <span>Expires: {coupon.expiry}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#4B4B4B]">
                    <ShoppingCart size={13} className="text-[#9A9A9A]" />
                    <span>Min order: {coupon.minOrder}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#4B4B4B]">
                    <Users size={13} className="text-[#9A9A9A]" />
                    <span>{coupon.perCustomer}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 border-t border-[#F5F5F5] bg-[#FAFAFA] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    coupon.status === 'Active' ? 'bg-[#16A34A]' : 
                    coupon.status === 'Draft' ? 'bg-[#9A9A9A]' : 
                    'bg-[#DC2626]'
                  }`} />
                  <span className="text-[11px] font-bold text-[#4B4B4B]">{coupon.status}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#F5F5F5] transition-all">
                    <Copy size={14} />
                  </button>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#FEF2F2] hover:text-[#DC2626] transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-6 py-5 border-b border-[#F5F5F5] flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-[#0D0D0D]">Create New Coupon</h3>
              <button onClick={() => setShowModal(false)} className="text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)] space-y-6">
              {/* Coupon Code Field */}
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#4B4B4B]">Coupon Code</label>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="e.g. SUMMER20"
                    className="flex-1 h-11 px-4 bg-white border border-[#E8E8E8] rounded-l-xl text-[14px] font-mono font-bold tracking-[2px] outline-none focus:border-[#FF6B35] uppercase"
                  />
                  <button className="h-11 px-4 bg-[#F5F5F5] border border-l-0 border-[#E8E8E8] rounded-r-xl text-[13px] font-semibold text-[#4B4B4B] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all flex items-center gap-2">
                    <Shuffle size={14} />
                    Generate
                  </button>
                </div>
              </div>

              {/* Discount Type */}
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#4B4B4B]">Discount Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setDiscountType('percentage')}
                    className={`p-4 border-1.5 rounded-xl flex flex-col items-center gap-2 transition-all ${discountType === 'percentage' ? 'bg-[#FFF0EB] border-[#FF6B35]' : 'bg-white border-[#E8E8E8] hover:border-[#FF6B35]'}`}
                  >
                    <Percent size={20} className={discountType === 'percentage' ? 'text-[#FF6B35]' : 'text-[#9A9A9A]'} />
                    <span className={`text-[13px] font-bold ${discountType === 'percentage' ? 'text-[#FF6B35]' : 'text-[#4B4B4B]'}`}>Percentage</span>
                  </button>
                  <button 
                    onClick={() => setDiscountType('fixed')}
                    className={`p-4 border-1.5 rounded-xl flex flex-col items-center gap-2 transition-all ${discountType === 'fixed' ? 'bg-[#EFF6FF] border-[#2563EB]' : 'bg-white border-[#E8E8E8] hover:border-[#2563EB]'}`}
                  >
                    <DollarSign size={20} className={discountType === 'fixed' ? 'text-[#2563EB]' : 'text-[#9A9A9A]'} />
                    <span className={`text-[13px] font-bold ${discountType === 'fixed' ? 'text-[#2563EB]' : 'text-[#4B4B4B]'}`}>Fixed Amount</span>
                  </button>
                  <button 
                    onClick={() => setDiscountType('shipping')}
                    className={`p-4 border-1.5 rounded-xl flex flex-col items-center gap-2 transition-all ${discountType === 'shipping' ? 'bg-[#F0FDF4] border-[#16A34A]' : 'bg-white border-[#E8E8E8] hover:border-[#16A34A]'}`}
                  >
                    <Truck size={20} className={discountType === 'shipping' ? 'text-[#16A34A]' : 'text-[#9A9A9A]'} />
                    <span className={`text-[13px] font-bold ${discountType === 'shipping' ? 'text-[#16A34A]' : 'text-[#4B4B4B]'}`}>Free Shipping</span>
                  </button>
                </div>
              </div>

              {/* Discount Value */}
              {discountType !== 'shipping' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">Discount Value</label>
                  <div className="flex">
                    <div className="h-11 px-4 bg-[#FAFAFA] border border-r-0 border-[#E8E8E8] rounded-l-xl flex items-center justify-center text-[13px] font-bold text-[#4B4B4B]">
                      {discountType === 'percentage' ? '%' : '$'}
                    </div>
                    <input 
                      type="number" 
                      placeholder="10"
                      className="flex-1 h-11 px-4 bg-white border border-[#E8E8E8] rounded-r-xl text-[14px] outline-none focus:border-[#FF6B35]"
                    />
                  </div>
                </div>
              )}

              {/* Usage Limits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">Usage Limit</label>
                  <input type="number" placeholder="Unlimited" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                  <p className="text-[11px] text-[#9A9A9A]">Total times this code can be used</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">Per Customer Limit</label>
                  <input type="number" placeholder="1" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                  <p className="text-[11px] text-[#9A9A9A]">Times one customer can use it</p>
                </div>
              </div>

              {/* Conditions */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">Minimum Order Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9A9A9A]">$</span>
                    <input 
                      type="number" 
                      placeholder="0"
                      className="w-full h-11 pl-8 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                    />
                  </div>
                  <p className="text-[11px] text-[#9A9A9A]">Leave 0 for no minimum</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">Applicable Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {['All Categories', 'Electronics', 'Fashion', 'Home', 'Beauty'].map((cat) => {
                      const isSelected = selectedCategories.includes(cat);
                      return (
                        <button 
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all border ${
                            isSelected 
                              ? 'bg-[#FFF0EB] text-[#FF6B35] border-[#FF6B35]' 
                              : 'bg-[#F5F5F5] text-[#4B4B4B] border-transparent hover:border-[#E8E8E8]'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Validity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
                    <input type="date" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
                    <input type="date" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <input type="checkbox" id="no-expiry" className="rounded border-[#E8E8E8] text-[#FF6B35] focus:ring-[#FF6B35]" />
                    <label htmlFor="no-expiry" className="text-[11px] text-[#9A9A9A] font-medium">No expiry</label>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#4B4B4B]">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" defaultChecked className="text-[#FF6B35] focus:ring-[#FF6B35]" />
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                      <span className="text-[13px] font-medium text-[#4B4B4B]">Active</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" className="text-[#FF6B35] focus:ring-[#FF6B35]" />
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9A9A9A]" />
                      <span className="text-[13px] font-medium text-[#4B4B4B]">Draft</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" className="text-[#FF6B35] focus:ring-[#FF6B35]" />
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      <span className="text-[13px] font-medium text-[#4B4B4B]">Scheduled</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 bg-[#FAFAFA] border-t border-[#F5F5F5] flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="h-11 px-6 border border-[#E8E8E8] rounded-xl text-[14px] font-bold text-[#4B4B4B] hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button className="h-11 px-6 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#E55A25] transition-all">
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
