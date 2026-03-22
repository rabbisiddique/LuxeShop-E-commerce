'use client';

import React from 'react';
import AnnouncementBar from '@/src/components/layout/AnnouncementBar';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <main className="pt-[112px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
