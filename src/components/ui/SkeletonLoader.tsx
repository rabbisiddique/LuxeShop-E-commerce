'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => (
  <div className={`animate-pulse bg-[#F5F5F5] rounded-md ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="aspect-square rounded-2xl w-full" />
    <div className="space-y-2 px-1">
      <div className="flex justify-between items-start">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-12" />
      </div>
      <Skeleton className="h-4 w-1/3" />
      <div className="flex items-center gap-2 pt-1">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-3 w-3 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-3 w-10" />
      </div>
      <div className="pt-2">
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  </div>
);

export const OrderCardSkeleton = () => (
  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5 space-y-4">
    <div className="flex justify-between items-center border-b border-[#F5F5F5] pb-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
    <div className="flex gap-4">
      <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-5 w-16" />
    </div>
    <div className="pt-2 flex justify-between">
      <Skeleton className="h-9 w-28 rounded-lg" />
      <Skeleton className="h-9 w-28 rounded-lg" />
    </div>
  </div>
);

export const ProfileHeaderSkeleton = () => (
  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8">
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <Skeleton className="w-24 h-24 rounded-full border-4 border-[#F5F5F5]" />
      <div className="flex-1 text-center sm:text-left space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-4 w-64 mx-auto sm:mx-0" />
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      <Skeleton className="w-full sm:w-32 h-12 rounded-xl" />
    </div>
  </div>
);

export const SearchResultSkeleton = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-10 w-40 rounded-xl" />
    </div>
    <div className="flex gap-8">
      <div className="hidden lg:block w-[260px] shrink-0 space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default function SkeletonLoader({ type = 'product' }: { type?: 'product' | 'order' | 'profile' | 'search' }) {
  switch (type) {
    case 'product': return <ProductCardSkeleton />;
    case 'order': return <OrderCardSkeleton />;
    case 'profile': return <ProfileHeaderSkeleton />;
    case 'search': return <SearchResultSkeleton />;
    default: return <Skeleton className="h-20 w-full" />;
  }
}
