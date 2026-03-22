'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/src/lib/supabase/client';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (authError) throw authError;
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetSuccess(false);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (resetError) throw resetError;
      setResetSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[40%_60%] bg-[#FAFAFA]">
      {/* LEFT PANEL (desktop only) */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:flex flex-col justify-between p-12 bg-[#0D0D0D] relative overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-transparent" />
        <div 
          className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#FF6B35]/30 rounded-full blur-3xl" 
        />

        {/* Top section */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center group">
            <span className="font-['Playfair_Display'] text-[28px] font-bold text-white group-hover:text-[#FF6B35] transition-colors">Luxe</span>
            <span className="font-['Playfair_Display'] text-[28px] font-bold text-[#FF6B35] group-hover:text-white transition-colors">Shop</span>
          </Link>
        </div>

        {/* Middle section */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-['Playfair_Display'] text-[64px] text-[#FF6B35] leading-none mb-4"
          >
            &quot;
          </motion.span>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-['Playfair_Display'] italic text-[22px] font-normal text-white leading-[1.5]"
          >
            Shopping made effortless,<br />quality made premium.
          </motion.p>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[14px] text-[#9A9A9A] mt-4"
          >
            — LuxeShop Promise
          </motion.span>
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
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-[440px] w-full mx-auto"
        >
          <header className="mb-8">
            <h1 className="font-['Playfair_Display'] text-[32px] font-bold text-[#0D0D0D]">Welcome back</h1>
            <p className="text-[14px] text-[#9A9A9A] mt-2">Sign in to your account to continue.</p>
          </header>

          {/* GOOGLE OAUTH BUTTON */}
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-[48px] bg-white border-[1.5px] border-[#E8E8E8] rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-center gap-3 hover:border-[#D0D0D0] hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-[14px] font-semibold text-[#1F1F1F]">Continue with Google</span>
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-[#E8E8E8]" />
            <span className="text-[12px] text-[#9A9A9A] font-medium uppercase">or</span>
            <div className="flex-1 h-[1px] bg-[#E8E8E8]" />
          </div>

          {/* EMAIL FORM */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-[#4B4B4B] mb-2">Email Address</label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-[#DC2626]' : 'text-[#9A9A9A] group-focus-within:text-[#FF6B35]'}`} size={16} />
                <input 
                  type="email" 
                  {...register('email')}
                  placeholder="you@example.com"
                  className={`w-full h-[44px] bg-white border-[1.5px] rounded-lg pl-[42px] pr-4 text-[14px] outline-none transition-all ${
                    errors.email 
                      ? 'border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10' 
                      : 'border-[#E8E8E8] focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/15'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[12px] text-[#DC2626] mt-1.5 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-semibold text-[#4B4B4B]">Password</label>
                <button 
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[12px] text-[#FF6B35] font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-[#DC2626]' : 'text-[#9A9A9A] group-focus-within:text-[#FF6B35]'}`} size={16} />
                <input 
                  type={showPassword ? "text" : "password"}
                  {...register('password')}
                  placeholder="••••••••"
                  className={`w-full h-[44px] bg-white border-[1.5px] rounded-lg pl-[42px] pr-12 text-[14px] outline-none transition-all ${
                    errors.password 
                      ? 'border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10' 
                      : 'border-[#E8E8E8] focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/15'
                  }`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#4B4B4B] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[12px] text-[#DC2626] mt-1.5 font-medium">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 mb-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" {...register('rememberMe')} className="peer sr-only" />
                  <div className="w-4 h-4 border-[1.5px] border-[#E8E8E8] rounded peer-checked:bg-[#FF6B35] peer-checked:border-[#FF6B35] transition-all" />
                  <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[13px] text-[#4B4B4B]">Remember me for 30 days</span>
              </label>
            </div>

            {/* ERROR STATE */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-3.5 flex items-start gap-2.5">
                    <AlertCircle className="text-[#DC2626] shrink-0" size={16} />
                    <p className="text-[13px] text-[#DC2626] leading-tight">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-[50px] bg-[#FF6B35] hover:bg-[#E55A25] text-white text-[15px] font-semibold rounded-[10px] shadow-[0_4px_14px_rgba(255,107,53,0.35)] active:scale-[0.97] transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[13px] text-[#9A9A9A]">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-[#FF6B35] hover:underline">Create one &rarr;</Link>
            </p>
          </div>

          <div className="text-center mt-8">
            <p className="text-[11px] text-[#9A9A9A] leading-relaxed">
              By signing in you agree to our{' '}
              <Link href="#" className="text-[#4B4B4B] hover:text-[#FF6B35] transition-colors">Terms of Service</Link>{' '}
              and{' '}
              <Link href="#" className="text-[#4B4B4B] hover:text-[#FF6B35] transition-colors">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForgotModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-[400px] rounded-2xl shadow-2xl p-8"
            >
              <button 
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock size={32} className="text-[#FF6B35]" />
                </div>
                <h2 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D]">Forgot Password?</h2>
                <p className="text-[14px] text-[#9A9A9A] mt-2">Enter your email and we&apos;ll send you a reset link.</p>
              </div>

              {resetSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail size={24} className="text-[#16A34A]" />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#16A34A] mb-1">Check your email</h3>
                  <p className="text-[13px] text-[#16A34A]/80">We&apos;ve sent a password reset link to {resetEmail}.</p>
                  <button 
                    onClick={() => setShowForgotModal(false)}
                    className="mt-6 text-[14px] font-semibold text-[#16A34A] hover:underline"
                  >
                    Back to Login
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#4B4B4B] mb-2">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] group-focus-within:text-[#FF6B35] transition-colors" size={16} />
                      <input 
                        type="email" 
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full h-[44px] bg-white border-[1.5px] border-[#E8E8E8] rounded-lg pl-[42px] pr-4 text-[14px] outline-none focus:border-[#FF6B35] transition-all"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={resetLoading}
                    className="w-full h-[48px] bg-[#FF6B35] hover:bg-[#E55A25] text-white text-[15px] font-semibold rounded-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70"
                  >
                    {resetLoading ? <Loader2 className="animate-spin" size={20} /> : 'Send Reset Link'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
