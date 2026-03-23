"use client";

import { adminLogOutAction } from "@/src/actions/admin/admin.auth";
import { useAuth } from "@/src/hooks/auth";
import { clsx, type ClassValue } from "clsx";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Tag,
  Truck,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Coupons", href: "/admin/coupons", icon: Tag },
  { name: "Shipping", href: "/admin/shipping", icon: Truck },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { adminData } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await adminLogOutAction();
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        router.push("/admin/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("Error in client Logout");
    }
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-neutral-950 text-white">
      {/* Logo Section */}
      <div
        className={cn(
          "flex items-center h-20 px-6 border-b border-neutral-800",
          isCollapsed ? "justify-center px-0" : "justify-between",
        )}
      >
        {!isCollapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              LuxeShop
            </span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Store className="w-6 h-6 text-white" />
          </div>
        )}
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-md hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white hidden lg:block"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {!isCollapsed && (
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-4">
            Main Menu
          </p>
        )}
        {navItems.map((item) => {
          const isActive = pathname
            ? pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href))
            : false;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive ? "text-white" : "group-hover:text-white",
                )}
              />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}

        <div className="pt-8">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-4">
              Support
            </p>
          )}
          <Link
            href="/admin/help"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative text-neutral-400 hover:text-white hover:bg-neutral-800",
            )}
          >
            <HelpCircle className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <span className="font-medium text-sm">Help Center</span>
            )}
          </Link>
        </div>
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-neutral-800">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl bg-neutral-900",
            isCollapsed ? "justify-center" : "",
          )}
        >
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-primary">
            AD
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">
                {adminData?.first_name || "Admin"}
              </p>
              <p className="text-[10px] text-neutral-500 truncate">
                {adminData?.email || "Email"}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <button
              className="text-neutral-500 hover:text-white transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="mt-4 w-full flex justify-center p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden sm:flex flex-col sticky top-0 h-screen z-50 transition-all duration-300 ease-in-out border-r border-neutral-800 shrink-0",
          isCollapsed ? "w-[72px]" : "w-[260px]",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="sm:hidden fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 bg-neutral-950 text-white rounded-lg shadow-lg border border-neutral-800"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] sm:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] z-[80] sm:hidden shadow-2xl"
            >
              <div className="relative h-full">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="absolute top-6 right-4 p-1 text-neutral-400 hover:text-white z-[90]"
                >
                  <X className="w-6 h-6" />
                </button>
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
