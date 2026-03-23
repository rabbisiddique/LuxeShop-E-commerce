"use client";

import { adminLoginAction } from "@/src/actions/admin/admin.auth";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleAdminLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await adminLoginAction({ email, password });
      console.log(res);

      if (res.success) {
        // toast.success(" Welcome back! 👋");
        router.push("/admin");
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("Error in handleAdminLoing Client");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF6B35]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Login Card */}
        <div className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-[20px] p-10 w-[420px] shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
          {/* Card Header */}
          <header className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 bg-[#FF6B35] rounded-[14px] flex items-center justify-center shadow-[0_8px_20px_rgba(255,107,53,0.4)] mb-4">
              <Store size={26} className="text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Admin Portal
            </h1>
            <p className="text-[13px] text-[#9A9A9A] mt-1.5 font-medium">
              LuxeShop Management System
            </p>
          </header>

          {/* Security Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-full px-4 py-2">
              <ShieldCheck size={14} className="text-[#16A34A]" />
              <span className="text-[12px] text-[#9A9A9A] font-medium tracking-wide">
                Authorized personnel only
              </span>
            </div>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={(e) => handleAdminLogin(e, email, password)}
          >
            {/* Email Field */}
            <div>
              <label className="block text-[12px] font-semibold text-[#9A9A9A] uppercase tracking-wider mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] group-focus-within:text-[#FF6B35] transition-colors"
                  size={16}
                />
                <input
                  type="email"
                  placeholder="admin@luxeshop.com"
                  className="w-full h-12 bg-[#2A2A2A] border-[1.5px] border-[#3A3A3A] rounded-[10px] pl-11 pr-4 text-white text-sm outline-none focus:border-[#FF6B35] focus:ring-[4px] focus:ring-[#FF6B35]/15 transition-all placeholder:text-[#4B4B4B]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="text-[12px] font-semibold text-[#9A9A9A] uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[12px] text-[#FF6B35] font-semibold hover:underline transition-all"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] group-focus-within:text-[#FF6B35] transition-colors"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-12 bg-[#2A2A2A] border-[1.5px] border-[#3A3A3A] rounded-[10px] pl-11 pr-11 text-white text-sm outline-none focus:border-[#FF6B35] focus:ring-[4px] focus:ring-[#FF6B35]/15 transition-all placeholder:text-[#4B4B4B]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              className="w-full h-[50px] bg-[#FF6B35] hover:bg-[#E55A25] text-white text-[15px] font-semibold rounded-[10px] shadow-[0_4px_20px_rgba(255,107,53,0.4)] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Card Footer */}
          <footer className="mt-7 pt-6 border-t border-[#2A2A2A] text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-[#9A9A9A] hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={13}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Store</span>
            </Link>
          </footer>
        </div>

        {/* Bottom Page Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[#4B4B4B]">
          <Lock size={12} />
          <span className="text-[12px] font-medium tracking-tight">
            Secured by 256-bit SSL encryption
          </span>
        </div>
      </div>
    </main>
  );
}
