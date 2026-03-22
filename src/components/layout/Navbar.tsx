"use client";

import { useCartStore } from "@/src/store/cart";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Reviews", href: "/reviews" },
  { name: "Electronics", href: "/category/electronics" },
  { name: "Fashion", href: "/category/fashion" },
  { name: "Beauty", href: "/category/beauty" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);

  const openCart = useCartStore((state) => state.openCart);
  const itemCount = useCartStore((state) => state.itemCount());

  const handleCartClick = () => {
    openCart();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   supabase.auth.getUser().then(({ data: { user } }) => {
  //     setUser(user);
  //   });

  //   const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user ?? null);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white border-b border-[#E8E8E8]"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2 text-[#1F1F1F] hover:text-[#FF6B35] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <Link href="/" className="flex items-center">
              <span className="font-['Playfair_Display'] text-2xl font-bold text-[#0D0D0D]">
                Luxe
              </span>
              <span className="font-['Playfair_Display'] text-2xl font-bold text-[#FF6B35]">
                Shop
              </span>
            </Link>
          </div>

          {/* Center: Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-['DM_Sans'] text-sm font-medium text-[#4B4B4B] hover:text-[#FF6B35] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B35] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="relative overflow-hidden"
                  >
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Escape" && setIsSearchOpen(false)
                      }
                      className="w-full h-9 bg-[#F5F5F5] border-none rounded-full px-4 text-sm focus:ring-1 focus:ring-[#FF6B35] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4B4B4B] hover:text-[#FF6B35]"
                    >
                      <X size={14} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              {!isSearchOpen && (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#1F1F1F] hover:text-[#FF6B35] transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            <Link
              href="/wishlist"
              className="p-2 text-[#1F1F1F] hover:text-[#FF6B35] transition-colors"
            >
              <Heart size={20} />
            </Link>

            <Link
              href={user ? "/account" : "/login"}
              className="flex items-center gap-2 p-2 text-[#1F1F1F] hover:text-[#FF6B35] transition-colors group"
            >
              <User size={20} fill={user ? "currentColor" : "none"} />
              {!user && (
                <span className="hidden xl:inline text-sm font-medium">
                  Sign In
                </span>
              )}
            </Link>

            <button
              onClick={handleCartClick}
              className="p-2 text-[#1F1F1F] hover:text-[#FF6B35] transition-colors relative"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FF6B35] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center">
                  <span className="font-['Playfair_Display'] text-xl font-bold text-[#0D0D0D]">
                    Luxe
                  </span>
                  <span className="font-['Playfair_Display'] text-xl font-bold text-[#FF6B35]">
                    Shop
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#1F1F1F] hover:text-[#FF6B35]"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-['DM_Sans'] text-lg font-medium text-[#4B4B4B] hover:text-[#FF6B35] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
