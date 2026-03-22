"use client";

import AdminSidebar from "@/src/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname?.startsWith("/admin/login");

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#0D0D0D]">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-white">{children}</main>
    </div>
  );
}
