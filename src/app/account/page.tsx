'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProfileHeader from '@/src/components/account/ProfileHeader';
import AccountNav from '@/src/components/account/AccountNav';
import OrderCard from '@/src/components/account/OrderCard';
import OrderTimeline from '@/src/components/account/OrderTimeline';
import AddressCard from '@/src/components/account/AddressCard';
import WishlistGrid from '@/src/components/account/WishlistGrid';

function AccountContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams?.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam || 'Overview');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/account?tab=${tab}`, { scroll: false });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-12">
            <section id="orders">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D]">Recent Orders</h2>
                <button 
                  onClick={() => handleTabChange('Orders')}
                  className="text-[14px] font-semibold text-[#FF6B35] hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 items-start">
                <OrderCard />
                <OrderTimeline />
              </div>
            </section>
            
            <section id="wishlist-preview">
               <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D]">Wishlist Preview</h2>
                <button 
                  onClick={() => handleTabChange('Wishlist')}
                  className="text-[14px] font-semibold text-[#FF6B35] hover:underline"
                >
                  View Wishlist
                </button>
              </div>
              <WishlistGrid />
            </section>
          </div>
        );
      case 'Orders':
        return (
          <section id="orders">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D]">My Orders</h2>
            </div>
            <div className="space-y-6">
              <OrderCard />
              <OrderCard />
            </div>
          </section>
        );
      case 'Wishlist':
        return (
          <section id="wishlist">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D]">My Wishlist</h2>
            </div>
            <WishlistGrid />
          </section>
        );
      case 'Addresses':
        return (
          <section id="addresses">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D]">My Addresses</h2>
            </div>
            <AddressCard />
          </section>
        );
      default:
        return (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-[#E8E8E8]">
            <p className="text-[#9A9A9A]">This section is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Profile Hero Section */}
        <ProfileHeader />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-[260px] shrink-0">
            <AccountNav activeTab={activeTab} setActiveTab={handleTabChange} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">Loading...</div>}>
      <AccountContent />
    </Suspense>
  );
}
