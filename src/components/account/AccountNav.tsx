"use client";

import { createClient } from "@/src/lib/supabase/client";
import {
  ChevronRight,
  CreditCard,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Settings,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface AccountNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AccountNav({
  activeTab,
  setActiveTab,
}: AccountNavProps) {
  const navItems = [
    { id: "Overview", label: "Overview", icon: LayoutDashboard },
    { id: "Orders", label: "My Orders", icon: Package, badge: "3" },
    { id: "Wishlist", label: "Wishlist", icon: Heart, badge: "12" },
    { id: "Addresses", label: "Addresses", icon: MapPin },
    { id: "Payment", label: "Payment Methods", icon: CreditCard },
    { id: "Reviews", label: "My Reviews", icon: Star },
    { id: "Settings", label: "Settings", icon: Settings },
  ];
  const supabase = createClient();
  const router = useRouter();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[260px] bg-white border border-[#E8E8E8] rounded-[16px] overflow-hidden sticky top-[88px] h-fit">
        <div className="p-5 border-b border-[#E8E8E8] bg-[#FAFAFA]">
          <h2 className="text-[16px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">
            My Account
          </h2>
        </div>

        <nav className="p-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.id === activeTab;
              const Icon = item.icon;

              return (
                <li key={item.id} className="relative group">
                  <div
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] cursor-pointer transition-all duration-150
                      ${isActive ? "bg-[#FFF0EB]" : "bg-transparent hover:bg-[#FAFAFA]"}
                    `}
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[#FF6B35] rounded-r-[2px]" />
                    )}

                    <div
                      className={`
                      w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                      ${isActive ? "bg-[#FF6B35]" : "bg-[#F5F5F5] group-hover:bg-[#FFF0EB]"}
                    `}
                    >
                      <Icon
                        size={16}
                        className={
                          isActive
                            ? "text-white"
                            : "text-[#9A9A9A] group-hover:text-[#FF6B35]"
                        }
                      />
                    </div>

                    <span
                      className={`
                      flex-1 text-[14px] font-['DM_Sans'] transition-colors
                      ${isActive ? "font-semibold text-[#FF6B35]" : "text-[#4B4B4B] group-hover:text-[#0D0D0D]"}
                    `}
                    >
                      {item.label}
                    </span>

                    {item.badge && (
                      <div
                        className={`
                        min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full text-[11px] font-bold
                        ${isActive ? "bg-[#FF6B35] text-white" : "bg-[#F5F5F5] text-[#9A9A9A]"}
                      `}
                      >
                        {item.badge}
                      </div>
                    )}

                    {!isActive && (
                      <ChevronRight
                        size={14}
                        className="text-[#9A9A9A] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      />
                    )}
                  </div>
                </li>
              );
            })}

            <div className="mx-3.5 my-1 h-[1px] bg-[#F5F5F5]" />

            <li
              className="relative group"
              onClick={() => {
                supabase.auth.signOut();
                router.push("/login");
              }}
            >
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] cursor-pointer transition-all duration-150 bg-transparent hover:bg-[#FEF2F2]">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F5F5F5] group-hover:bg-[#FEE2E2] transition-colors">
                  <LogOut
                    size={16}
                    className="text-[#9A9A9A] group-hover:text-[#DC2626]"
                  />
                </div>
                <span className="flex-1 text-[14px] font-['DM_Sans'] text-[#9A9A9A] group-hover:text-[#DC2626] transition-colors">
                  Sign Out
                </span>
              </div>
            </li>
          </ul>
        </nav>

        <div className="p-4 px-5 border-t border-[#E8E8E8] bg-[#FAFAFA]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <HelpCircle size={14} className="text-[#9A9A9A]" />
              <span className="text-[13px] text-[#4B4B4B]">Need help?</span>
            </div>
            <button className="text-[13px] text-[#FF6B35] font-medium hover:underline text-left">
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden w-full bg-white border-b border-[#E8E8E8] h-14 overflow-x-auto scrollbar-hide flex items-center px-4 gap-6 sticky top-[104px] z-40">
        {navItems.map((item) => {
          const isActive = item.id === activeTab;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex items-center gap-2 h-full whitespace-nowrap relative px-1
                ${isActive ? "text-[#FF6B35]" : "text-[#9A9A9A]"}
              `}
            >
              <Icon size={16} />
              <span className="text-[13px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B35]" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
