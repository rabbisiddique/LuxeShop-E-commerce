"use client";

import {
  AlertCircle,
  ChevronRight,
  DollarSign,
  Package,
  Plus,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Dynamic imports for client components that might cause SSR issues

import dynamic from "next/dynamic";

const StatsCard = dynamic(() => import("@/src/components/admin/StatsCard"), {
  ssr: false,
});

const SalesChart = dynamic(() => import("@/src/components/admin/SalesChart"), {
  ssr: false,
});
const OrderTable = dynamic(() => import("@/src/components/admin/OrderTable"), {
  ssr: false,
});
const statsData = [
  {
    title: "Total Revenue",
    value: "$128,430",
    change: "+12.5%",
    isPositive: true,
    icon: DollarSign,
    data: [
      { value: 10 },
      { value: 25 },
      { value: 15 },
      { value: 40 },
      { value: 30 },
      { value: 50 },
    ],
  },
  {
    title: "Total Orders",
    value: "1,240",
    change: "+8.2%",
    isPositive: true,
    icon: ShoppingBag,
    data: [
      { value: 20 },
      { value: 15 },
      { value: 35 },
      { value: 25 },
      { value: 45 },
      { value: 40 },
    ],
  },
  {
    title: "Total Customers",
    value: "8,432",
    change: "+14.1%",
    isPositive: true,
    icon: Users,
    data: [
      { value: 5 },
      { value: 10 },
      { value: 20 },
      { value: 15 },
      { value: 25 },
      { value: 35 },
    ],
  },
  {
    title: "Avg. Order Value",
    value: "$103.50",
    change: "-2.4%",
    isPositive: false,
    icon: TrendingUp,
    data: [
      { value: 40 },
      { value: 35 },
      { value: 30 },
      { value: 25 },
      { value: 20 },
      { value: 15 },
    ],
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-950">
            Dashboard Overview
          </h1>
          <p className="text-neutral-500 mt-1">
            Welcome back, Admin. Here&apos;s what&apos;s happening today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        {/* Quick Actions & Notifications */}
        <div className="space-y-8">
          {/* Inventory Alert */}
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="font-bold text-rose-900">Inventory Alert</h3>
            </div>
            <p className="text-sm text-rose-700 mb-4">
              <span className="font-bold">12 products</span> are currently out
              of stock or running low.
            </p>
            <Link
              href="/admin/products?filter=low-stock"
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 hover:underline"
            >
              Restock Now <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Best Sellers Mini */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg">Best Sellers</h3>
              <Link
                href="/admin/analytics"
                className="text-xs font-bold text-primary hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Silk Blouse",
                  sales: 482,
                  image: "https://picsum.photos/seed/silk/40/40",
                },
                {
                  name: "Leather Bag",
                  sales: 324,
                  image: "https://picsum.photos/seed/bag/40/40",
                },
                {
                  name: "Gold Watch",
                  sales: 156,
                  image: "https://picsum.photos/seed/watch/40/40",
                },
              ].map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-neutral-200">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-950">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-neutral-500">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <button className="p-1.5 text-neutral-400 hover:text-neutral-950">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-neutral-950 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-display font-bold text-lg mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Coupons", icon: Package },
                { label: "Shipping", icon: TrendingUp },
                { label: "Marketing", icon: Users },
                { label: "Settings", icon: DollarSign },
              ].map((link) => (
                <button
                  key={link.label}
                  className="flex flex-col items-center gap-2 p-4 bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-all border border-neutral-800"
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-neutral-950">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
          >
            View All Orders <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <OrderTable />
      </div>
    </div>
  );
}
