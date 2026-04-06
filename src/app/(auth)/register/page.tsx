"use client";

import { createRegisterAction } from "@/src/actions/public/public.auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShoppingBag,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const registerSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const password = watch("password");
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    setStrength(s);
  }, [password]);

  const handleRegister = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await createRegisterAction(data);
      console.log(res);
      if (res.success) {
        toast.success("Account created!");
        router.push("/profile");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
      console.log("Error in creating register in client");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // try {
    //   const { error: authError } = await supabase.auth.signInWithOAuth({
    //     provider: "google",
    //     options: {
    //       redirectTo: `${window.location.origin}/auth/callback`,
    //     },
    //   });
    //   if (authError) throw authError;
    // } catch (err: any) {
    //   setError(err.message || "Failed to sign in with Google.");
    // }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[40%_60%] bg-[#FAFAFA]">
      {/* LEFT PANEL (desktop only) */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex flex-col justify-between p-12 bg-[#0D0D0D] relative overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#FF6B35]/30 rounded-full blur-3xl"
        />

        {/* Top section */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center group">
            <span className="font-['Playfair_Display'] text-[28px] font-bold text-white group-hover:text-[#FF6B35] transition-colors">
              Luxe
            </span>
            <span className="font-['Playfair_Display'] text-[28px] font-bold text-[#FF6B35] group-hover:text-white transition-colors">
              Shop
            </span>
          </Link>
        </div>

        {/* Middle section */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-24 bg-[#FF6B35]/20 rounded-full flex items-center justify-center mb-6"
          >
            <ShoppingBag size={64} className="text-[#FF6B35]" />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-['Playfair_Display'] text-[22px] font-bold text-white mb-3"
          >
            Join 50,000+ shoppers
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[14px] text-[#9A9A9A] leading-relaxed"
          >
            Create your account and unlock exclusive deals, fast checkout, and
            order tracking.
          </motion.p>

          <div className="mt-8 space-y-4 w-full text-left">
            {[
              "Free shipping on your first order",
              "Exclusive member-only deals",
              "Easy returns & order tracking",
              "Save addresses & payment methods",
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle size={18} className="text-[#FF6B35] shrink-0" />
                <span className="text-[13px] text-white">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative z-10 flex items-center justify-between border-t border-[#1F1F1F] pt-8">
          <div className="flex-1 text-center">
            <div className="text-[24px] font-bold text-white">50K+</div>
            <div className="text-[12px] text-[#9A9A9A]">customers</div>
          </div>
          <div className="w-[1px] h-8 bg-[#1F1F1F]" />
          <div className="flex-1 text-center">
            <div className="text-[24px] font-bold text-white">4.9★</div>
            <div className="text-[12px] text-[#9A9A9A]">rating</div>
          </div>
          <div className="w-[1px] h-8 bg-[#1F1F1F]" />
          <div className="flex-1 text-center">
            <div className="text-[24px] font-bold text-white">99%</div>
            <div className="text-[12px] text-[#9A9A9A]">satisfaction</div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT PANEL (form side) */}
      <div className="flex flex-col justify-center px-6 py-8 sm:px-12 lg:px-24 xl:px-32 overflow-y-auto relative">
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-[14px] text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to home
        </Link>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-[480px] w-full mx-auto"
        >
          <header className="mb-7">
            <h1 className="font-['Playfair_Display'] text-[30px] font-bold text-[#0D0D0D]">
              Create your account
            </h1>
            <p className="text-[14px] text-[#9A9A9A] mt-2">
              Join LuxeShop today &mdash; it&apos;s free.
            </p>
          </header>

          {/* GOOGLE OAUTH BUTTON */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-[48px] bg-white border-[1.5px] border-[#E8E8E8] rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-center gap-3 hover:border-[#D0D0D0] hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-[14px] font-semibold text-[#1F1F1F]">
              Continue with Google
            </span>
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-[#E8E8E8]" />
            <span className="text-[12px] text-[#9A9A9A] font-medium uppercase">
              or
            </span>
            <div className="flex-1 h-[1px] bg-[#E8E8E8]" />
          </div>

          {/* REGISTER FORM */}
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div>
              <div>
                <label className="block text-[13px] font-semibold text-[#4B4B4B] mb-1.5">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.first_name ? "text-[#DC2626]" : "text-[#9A9A9A] group-focus-within:text-[#FF6B35]"}`}
                    size={16}
                  />
                  <input
                    type="text"
                    {...register("full_name")}
                    placeholder="Sarah"
                    className={`w-full h-[44px] bg-white border-[1.5px] rounded-lg pl-[42px] pr-4 text-[14px] outline-none transition-all ${
                      errors.full_name
                        ? "border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10"
                        : "border-[#E8E8E8] focus:border-[#FF6B35]"
                    }`}
                  />
                </div>
                {errors.full_name && (
                  <p className="text-[11px] text-[#DC2626] mt-1 font-medium">
                    {errors.full_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#4B4B4B] mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? "text-[#DC2626]" : "text-[#9A9A9A] group-focus-within:text-[#FF6B35]"}`}
                  size={16}
                />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="sarah@example.com"
                  className={`w-full h-[44px] bg-white border-[1.5px] rounded-lg pl-[42px] pr-10 text-[14px] outline-none transition-all ${
                    errors.email
                      ? "border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10"
                      : "border-[#E8E8E8] focus:border-[#FF6B35]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-[#DC2626] mt-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#4B4B4B] mb-1.5">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? "text-[#DC2626]" : "text-[#9A9A9A] group-focus-within:text-[#FF6B35]"}`}
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`w-full h-[44px] bg-white border-[1.5px] rounded-lg pl-[42px] pr-12 text-[14px] outline-none transition-all ${
                    errors.password
                      ? "border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10"
                      : "border-[#E8E8E8] focus:border-[#FF6B35]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#4B4B4B]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength indicator */}
              <div className="mt-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex gap-1 flex-1">
                    <div
                      className={`h-1 rounded-full flex-1 transition-colors ${strength >= 1 ? "bg-[#FF6B35]" : "bg-[#E8E8E8]"}`}
                    />
                    <div
                      className={`h-1 rounded-full flex-1 transition-colors ${strength >= 2 ? "bg-[#FF6B35]" : "bg-[#E8E8E8]"}`}
                    />
                    <div
                      className={`h-1 rounded-full flex-1 transition-colors ${strength >= 3 ? "bg-[#16A34A]" : "bg-[#E8E8E8]"}`}
                    />
                    <div
                      className={`h-1 rounded-full flex-1 transition-colors ${strength >= 4 ? "bg-[#16A34A]" : "bg-[#E8E8E8]"}`}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-semibold ml-3 transition-colors ${strength >= 3 ? "text-[#16A34A]" : "text-[#9A9A9A]"}`}
                  >
                    {strength === 0
                      ? "Weak"
                      : strength === 1
                        ? "Fair"
                        : strength === 2
                          ? "Good"
                          : "Strong"}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-[#DC2626] mt-1 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2 mt-4 mb-6">
              <label className="flex items-start gap-2 cursor-pointer group pt-0.5">
                <div className="relative flex items-center justify-center shrink-0">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="peer sr-only"
                  />
                  <div
                    className={`w-4 h-4 border-[1.5px] rounded transition-all ${errors.terms ? "border-[#DC2626]" : "border-[#E8E8E8] peer-checked:bg-[#FF6B35] peer-checked:border-[#FF6B35]"}`}
                  />
                  <svg
                    className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[13px] text-[#4B4B4B] leading-tight">
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-[#FF6B35] font-medium hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-[#FF6B35] font-medium hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* ERROR STATE */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-3.5 flex items-start gap-2.5">
                    <AlertCircle
                      className="text-[#DC2626] shrink-0"
                      size={16}
                    />
                    <p className="text-[13px] text-[#DC2626] leading-tight">
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[50px] bg-[#FF6B35] hover:bg-[#E55A25] text-white text-[15px] font-semibold rounded-[10px] shadow-[0_4px_14px_rgba(255,107,53,0.35)] active:scale-[0.97] transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <>Creating...</> : "Create Account →"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[13px] text-[#9A9A9A]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#FF6B35] hover:underline"
              >
                Sign in →
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
