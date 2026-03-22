'use client';

import React, { useState } from 'react';
import { 
  Store, 
  Palette, 
  CreditCard, 
  Bell, 
  Truck, 
  Receipt, 
  Shield, 
  Settings, 
  Mail, 
  Phone, 
  MapPin, 
  Upload, 
  Globe, 
  Clock, 
  DollarSign,
  ChevronRight,
  Save,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  AlertTriangle,
  Download,
  CheckCircle2,
  XCircle,
  Info,
  ExternalLink,
  Search,
  Zap,
  Layout,
  Type,
  Database,
  Code,
  History
} from 'lucide-react';

import { Switch } from '@/src/components/ui/Switch';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('Store');
  const [storeOnline, setStoreOnline] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notifications, setNotifications] = useState({
    newOrder: true,
    lowStock: true,
    newReview: false,
    customerSignup: true,
    failedPayment: true
  });
  const [twoFactor, setTwoFactor] = useState(false);
  
  // Tax Settings State
  const [taxMethod, setTaxMethod] = useState('exclusive');
  const [autoTax, setAutoTax] = useState(false);
  const [showTaxInPrice, setShowTaxInPrice] = useState(false);
  const [showTaxBreakdown, setShowTaxBreakdown] = useState(true);
  const [taxExemptCustomers, setTaxExemptCustomers] = useState(false);
  const [b2bWholesale, setB2bWholesale] = useState(false);

  // Advanced Settings State
  const [guestCheckout, setGuestCheckout] = useState(true);
  const [promptAccountCreation, setPromptAccountCreation] = useState(true);
  const [outOfStockBehavior, setOutOfStockBehavior] = useState('show');
  const [allowReviews, setAllowReviews] = useState(true);
  const [verifiedReviewsOnly, setVerifiedReviewsOnly] = useState(true);
  const [autoApproveReviews, setAutoApproveReviews] = useState(false);
  const [addressValidation, setAddressValidation] = useState(true);
  const [autoCompressImages, setAutoCompressImages] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [revealSecretKey, setRevealSecretKey] = useState(false);

  // Danger Zone State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmInput, setConfirmInput] = useState('');

  const navItems = [
    { id: 'Store', icon: Store, label: 'Store' },
    { id: 'Appearance', icon: Palette, label: 'Appearance' },
    { id: 'Payments', icon: CreditCard, label: 'Payments' },
    { id: 'Notifications', icon: Bell, label: 'Notifications' },
    { id: 'Shipping', icon: Truck, label: 'Shipping' },
    { id: 'Tax', icon: Receipt, label: 'Tax' },
    { id: 'Security', icon: Shield, label: 'Security' },
    { id: 'Advanced', icon: Settings, label: 'Advanced' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-[32px] font-bold text-[#0D0D0D]">Settings</h1>
          <p className="text-[14px] text-[#9A9A9A] mt-1">Manage your store configuration</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Settings Nav */}
          <aside className="w-full lg:w-[240px] shrink-0">
            <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden sticky top-[88px]">
              <div className="px-5 py-4 border-bottom border-[#E8E8E8]">
                <span className="text-[13px] font-bold text-[#9A9A9A] uppercase tracking-wider">Configuration</span>
              </div>
              <nav className="py-2">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-[calc(100%-16px)] mx-2 my-0.5 px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all relative group ${
                        isActive ? 'bg-[#FFF0EB] text-[#FF6B35]' : 'text-[#4B4B4B] hover:bg-[#FAFAFA]'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#FF6B35] rounded-r-full" />
                      )}
                      <div className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#FF6B35] text-white' : 'bg-[#F5F5F5] text-[#9A9A9A] group-hover:text-[#FF6B35]'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right: Settings Content */}
          <main className="flex-1">
            {activeTab === 'Store' && (
              <div className="space-y-5">
                {/* Section 1: General Information */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">General Information</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Basic details about your store</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">Store Name</label>
                        <div className="relative">
                          <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
                          <input 
                            type="text" 
                            defaultValue="LuxeShop"
                            className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">Store Tagline</label>
                        <input 
                          type="text" 
                          defaultValue="Premium products, effortless shopping"
                          className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Store Description</label>
                      <textarea 
                        defaultValue="LuxeShop is a premium e-commerce platform dedicated to providing the finest selection of luxury goods with an effortless shopping experience."
                        className="w-full h-[100px] p-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">Store Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
                          <input 
                            type="email" 
                            defaultValue="hello@luxeshop.com"
                            className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">Support Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
                          <input 
                            type="text" 
                            defaultValue="+1 (555) 000-0000"
                            className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Store Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
                        <input 
                          type="text" 
                          defaultValue="123 Commerce St, NY 10001"
                          className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">City</label>
                        <input type="text" defaultValue="New York" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">State</label>
                        <input type="text" defaultValue="NY" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">Country</label>
                        <select className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button className="h-10 px-6 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#E55A25] transition-colors flex items-center gap-2">
                        <Save size={16} />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </section>

                {/* Section 2: Store Logo & Branding */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Store Logo & Branding</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Manage your visual identity</p>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-[#FF6B35] rounded-xl border-2 border-[#E8E8E8] flex items-center justify-center text-white text-3xl font-bold">
                        L
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <button className="h-9 px-4 border border-[#E8E8E8] rounded-lg text-[13px] font-semibold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all flex items-center gap-2">
                            <Upload size={14} />
                            Change Logo
                          </button>
                          <button className="text-[12px] font-medium text-[#DC2626] hover:underline">Remove</button>
                        </div>
                        <p className="text-[12px] text-[#9A9A9A]">Recommended size: 512x512px. PNG, JPG or SVG.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 bg-[#FF6B35] rounded-lg border border-[#E8E8E8] flex items-center justify-center text-white text-[10px] font-bold">
                        L
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="h-9 px-4 border border-[#E8E8E8] rounded-lg text-[13px] font-semibold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all">
                          Change Favicon
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Primary Color</label>
                      <div className="flex items-center gap-2 p-1 bg-white border border-[#E8E8E8] rounded-lg">
                        <div className="w-7 h-7 rounded-full bg-[#FF6B35] border border-[#00000010]" />
                        <input 
                          type="text" 
                          defaultValue="#FF6B35"
                          className="w-20 h-7 text-[13px] font-mono text-[#0D0D0D] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3: Regional Settings */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Regional Settings</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Configure localization options</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Currency</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
                        <select className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none">
                          <option>USD — US Dollar ($)</option>
                          <option>EUR — Euro (€)</option>
                          <option>GBP — British Pound (£)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Language</label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
                        <select className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none">
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Timezone</label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
                        <select className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none">
                          <option>America/New_York (EST)</option>
                          <option>Europe/London (GMT)</option>
                          <option>Asia/Tokyo (JST)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Date Format</label>
                      <select className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Weight Unit</label>
                      <select className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none">
                        <option>Pounds (lb)</option>
                        <option>Kilograms (kg)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Dimension Unit</label>
                      <select className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none">
                        <option>Inches (in)</option>
                        <option>Centimeters (cm)</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Section 4: Store Status */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Store Status</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Control your store availability</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Store Status</h4>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">Your store is currently accepting orders</p>
                      </div>
                      <Switch 
                        checked={storeOnline}
                        onCheckedChange={setStoreOnline}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Maintenance Mode</h4>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">Show maintenance page to visitors</p>
                      </div>
                      <Switch 
                        checked={maintenanceMode}
                        onCheckedChange={setMaintenanceMode}
                      />
                    </div>

                    {maintenanceMode && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">Maintenance Message</label>
                        <textarea 
                          defaultValue="We're currently updating our store. Back soon!"
                          className="w-full h-24 p-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none resize-none"
                        />
                      </div>
                    )}
                  </div>
                </section>

                {/* Section 5: Social Media */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Social Media</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Connect your social profiles</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { platform: 'Instagram', placeholder: '@luxeshop', color: 'text-[#E1306C]' },
                      { platform: 'Twitter/X', placeholder: '@luxeshop', color: 'text-[#0D0D0D]' },
                      { platform: 'Facebook', placeholder: 'facebook.com/luxeshop', color: 'text-[#1877F2]' },
                      { platform: 'YouTube', placeholder: 'youtube.com/@luxeshop', color: 'text-[#DC2626]' },
                      { platform: 'TikTok', placeholder: '@luxeshop', color: 'text-[#0D0D0D]' },
                    ].map((social) => (
                      <div key={social.platform} className="flex items-center gap-4">
                        <div className="w-32 text-[13px] font-semibold text-[#4B4B4B]">{social.platform}</div>
                        <input 
                          type="text" 
                          placeholder={social.placeholder}
                          className="flex-1 h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'Appearance' && (
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                  <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Appearance</h2>
                  <p className="text-[13px] text-[#9A9A9A] mt-1">Customize your store theme</p>
                </div>
                <div className="space-y-8">
                  <div>
                    <label className="text-[13px] font-semibold text-[#4B4B4B] block mb-4">Theme Colors</label>
                    <div className="grid grid-cols-6 gap-3 max-w-sm">
                      {['#FF6B35', '#2563EB', '#16A34A', '#7C3AED', '#DB2777', '#0D0D0D'].map((color) => (
                        <button 
                          key={color} 
                          className={`w-10 h-10 rounded-full border-2 ${color === '#FF6B35' ? 'border-[#FF6B35]' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between max-w-sm">
                    <span className="text-[14px] font-medium text-[#0D0D0D]">Dark Mode</span>
                    <Switch />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <label className="text-[13px] font-semibold text-[#4B4B4B]">Primary Font</label>
                    <select className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none">
                      <option>DM Sans</option>
                      <option>Inter</option>
                      <option>Roboto</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Payments' && (
              <div className="space-y-5">
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Payment Providers</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Configure how your customers pay</p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Stripe */}
                    <div className="p-6 border border-[#E8E8E8] rounded-2xl">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#635BFF] rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
                          <div>
                            <h3 className="text-[15px] font-bold text-[#0D0D0D]">Stripe</h3>
                            <p className="text-[12px] text-[#9A9A9A]">Accept credit cards, Apple Pay, and Google Pay</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[13px] font-semibold text-[#4B4B4B]">Publishable Key</label>
                          <input type="text" defaultValue="pk_test_51P..." className="w-full h-11 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[13px] font-mono outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-semibold text-[#4B4B4B]">Secret Key</label>
                          <input type="password" defaultValue="sk_test_51P..." className="w-full h-11 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[13px] font-mono outline-none" />
                        </div>
                      </div>
                    </div>

                    {/* PayPal */}
                    <div className="p-6 border border-[#E8E8E8] rounded-2xl">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#003087] rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
                          <div>
                            <h3 className="text-[15px] font-bold text-[#0D0D0D]">PayPal</h3>
                            <p className="text-[12px] text-[#9A9A9A]">Accept PayPal payments and credit cards</p>
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertTriangle size={18} className="text-[#D97706]" />
                        <span className="text-[13px] font-medium text-[#92400E]">Test Mode is currently enabled</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                  <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Notifications</h2>
                  <p className="text-[13px] text-[#9A9A9A] mt-1">Manage email and system alerts</p>
                </div>
                <div className="space-y-5">
                  {[
                    { id: 'newOrder', label: 'New order email' },
                    { id: 'lowStock', label: 'Low stock alert' },
                    { id: 'newReview', label: 'New review' },
                    { id: 'customerSignup', label: 'Customer signup' },
                    { id: 'failedPayment', label: 'Failed payment' },
                  ].map((notif) => (
                    <div key={notif.id} className="flex items-center justify-between py-3 border-b border-[#F5F5F5] last:border-0">
                      <span className="text-[14px] font-medium text-[#0D0D0D]">{notif.label}</span>
                      <Switch 
                        checked={notifications[notif.id as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [notif.id]: checked }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Shipping' && (
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                  <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Shipping Settings</h2>
                  <p className="text-[13px] text-[#9A9A9A] mt-1">Manage your delivery options and zones</p>
                </div>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-[#FFF0EB] rounded-full flex items-center justify-center text-[#FF6B35] mb-4">
                    <Truck size={32} />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0D0D0D]">Manage Shipping Methods</h3>
                  <p className="text-[14px] text-[#9A9A9A] mt-2 max-w-sm">
                    Configure your shipping rates, delivery times, and zones in the dedicated shipping management page.
                  </p>
                  <Link 
                    href="/admin/shipping"
                    className="mt-6 h-11 px-6 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#E55A25] transition-all flex items-center gap-2"
                  >
                    Go to Shipping Management
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'Tax' && (
              <div className="space-y-5">
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Tax Configuration</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Manage how taxes are calculated and displayed</p>
                  </div>

                  <div className="space-y-8">
                    {/* 1. Tax Calculation Method */}
                    <div className="space-y-4">
                      <label className="text-[14px] font-semibold text-[#0D0D0D]">Tax Calculation Method</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button 
                          onClick={() => setTaxMethod('inclusive')}
                          className={`p-4 border rounded-xl flex items-center gap-3 transition-all text-left ${taxMethod === 'inclusive' ? 'bg-[#FFF0EB] border-[#FF6B35]' : 'bg-white border-[#E8E8E8] hover:border-[#FF6B35]'}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${taxMethod === 'inclusive' ? 'border-[#FF6B35]' : 'border-[#E8E8E8]'}`}>
                            {taxMethod === 'inclusive' && <div className="w-2.5 h-2.5 bg-[#FF6B35] rounded-full" />}
                          </div>
                          <div>
                            <span className="text-[13px] font-bold block">Inclusive</span>
                            <span className="text-[11px] text-[#9A9A9A]">Product price already includes tax</span>
                          </div>
                        </button>
                        <button 
                          onClick={() => setTaxMethod('exclusive')}
                          className={`p-4 border rounded-xl flex items-center gap-3 transition-all text-left ${taxMethod === 'exclusive' ? 'bg-[#FFF0EB] border-[#FF6B35]' : 'bg-white border-[#E8E8E8] hover:border-[#FF6B35]'}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${taxMethod === 'exclusive' ? 'border-[#FF6B35]' : 'border-[#E8E8E8]'}`}>
                            {taxMethod === 'exclusive' && <div className="w-2.5 h-2.5 bg-[#FF6B35] rounded-full" />}
                          </div>
                          <div>
                            <span className="text-[13px] font-bold block">Exclusive</span>
                            <span className="text-[11px] text-[#9A9A9A]">Tax is added at checkout</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* 2. Default Tax Rate */}
                    <div className="space-y-2 max-w-xs">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Default Tax Rate</label>
                      <div className="relative">
                        <input type="text" defaultValue="8.5" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9A9A9A] font-bold">%</span>
                      </div>
                      <p className="text-[11px] text-[#9A9A9A]">Applied to all products by default</p>
                    </div>

                    {/* 3. Tax by Region */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[14px] font-semibold text-[#0D0D0D]">Tax by Region</label>
                        <button className="text-[12px] font-bold text-[#FF6B35] hover:underline">+ Add Region</button>
                      </div>
                      <div className="border border-[#E8E8E8] rounded-xl overflow-hidden">
                        <table className="w-full text-left text-[13px]">
                          <thead className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
                            <tr>
                              <th className="px-4 py-3 font-semibold text-[#4B4B4B]">Region</th>
                              <th className="px-4 py-3 font-semibold text-[#4B4B4B]">Rate</th>
                              <th className="px-4 py-3 text-right"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F5F5F5]">
                            {[
                              { name: 'New York', rate: '8.875%' },
                              { name: 'California', rate: '10.25%' },
                              { name: 'Texas', rate: '8.25%' },
                              { name: 'Florida', rate: '7.00%' },
                            ].map((region) => (
                              <tr key={region.name}>
                                <td className="px-4 py-3 font-medium text-[#0D0D0D]">{region.name}</td>
                                <td className="px-4 py-3 text-[#4B4B4B]">{region.rate}</td>
                                <td className="px-4 py-3 text-right">
                                  <button className="text-[#9A9A9A] hover:text-[#DC2626] transition-colors"><Trash2 size={14} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 4. Category Tax Rules */}
                    <div className="space-y-4">
                      <label className="text-[14px] font-semibold text-[#0D0D0D]">Category Tax Rules</label>
                      <div className="border border-[#E8E8E8] rounded-xl overflow-hidden">
                        <table className="w-full text-left text-[13px]">
                          <thead className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
                            <tr>
                              <th className="px-4 py-3 font-semibold text-[#4B4B4B]">Category</th>
                              <th className="px-4 py-3 font-semibold text-[#4B4B4B]">Rate</th>
                              <th className="px-4 py-3 font-semibold text-[#4B4B4B]">Override</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F5F5F5]">
                            {[
                              { cat: 'Food items', rate: '0%', override: true },
                              { cat: 'Electronics', rate: '8.5%', override: false },
                              { cat: 'Clothing', rate: '0%', override: true },
                              { cat: 'Digital goods', rate: 'Varies', override: true },
                            ].map((rule) => (
                              <tr key={rule.cat}>
                                <td className="px-4 py-3 font-medium text-[#0D0D0D]">{rule.cat}</td>
                                <td className="px-4 py-3 text-[#4B4B4B]">{rule.rate}</td>
                                <td className="px-4 py-3">
                                  <Switch checked={rule.override} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 5. Tax Exemptions */}
                    <div className="space-y-4 pt-4 border-t border-[#F5F5F5]">
                      <h3 className="text-[14px] font-semibold text-[#0D0D0D]">Tax Exemptions</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-[#4B4B4B]">Tax exempt customers</span>
                          <Switch checked={taxExemptCustomers} onCheckedChange={setTaxExemptCustomers} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-[#4B4B4B]">B2B / Wholesale toggle</span>
                          <Switch checked={b2bWholesale} onCheckedChange={setB2bWholesale} />
                        </div>
                        <button className="h-9 px-4 border border-[#E8E8E8] rounded-lg text-[12px] font-semibold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all flex items-center gap-2">
                          <Upload size={14} />
                          Upload Exemption Certificate Template
                        </button>
                      </div>
                    </div>

                    {/* 6. Tax Display Options */}
                    <div className="space-y-4 pt-4 border-t border-[#F5F5F5]">
                      <h3 className="text-[14px] font-semibold text-[#0D0D0D]">Display Options</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-[#4B4B4B]">Show tax in product price?</span>
                          <Switch checked={showTaxInPrice} onCheckedChange={setShowTaxInPrice} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-[#4B4B4B]">Show tax breakdown at checkout?</span>
                          <Switch checked={showTaxBreakdown} onCheckedChange={setShowTaxBreakdown} />
                        </div>
                        <div className="space-y-2 max-w-xs">
                          <label className="text-[12px] font-semibold text-[#9A9A9A]">Tax Label</label>
                          <select className="w-full h-10 px-3 bg-white border border-[#E8E8E8] rounded-lg text-[13px] outline-none">
                            <option>Sales Tax</option>
                            <option>VAT</option>
                            <option>GST</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 7. Tax ID */}
                    <div className="space-y-2 max-w-sm pt-4 border-t border-[#F5F5F5]">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Tax ID / VAT Number</label>
                      <input type="text" placeholder="e.g. 12-3456789" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]" />
                      <p className="text-[11px] text-[#9A9A9A]">Displayed on invoices and receipts</p>
                    </div>

                    {/* 8. Automatic Tax */}
                    <div className="p-4 bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap size={18} className="text-[#2563EB]" />
                        <div>
                          <h4 className="text-[13px] font-bold text-[#1E40AF]">Automatic Tax Calculation</h4>
                          <p className="text-[11px] text-[#3B82F6]">Use automatic tax rates based on customer location (Stripe Tax)</p>
                        </div>
                      </div>
                      <Switch checked={autoTax} onCheckedChange={setAutoTax} />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="space-y-5">
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Security</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Protect your store and data</p>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Two-Factor Authentication</h4>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">Add an extra layer of security to your account</p>
                      </div>
                      <Switch 
                        checked={twoFactor}
                        onCheckedChange={setTwoFactor}
                      />
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Session Timeout</label>
                      <select className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none">
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>24 hours</option>
                      </select>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-[#F5F5F5]">
                      <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Login History</h4>
                      <div className="space-y-3">
                        {[
                          { device: 'Chrome on MacOS', ip: '192.168.1.1', time: 'Just now', current: true },
                          { device: 'Safari on iPhone', ip: '192.168.1.42', time: '2 hours ago', current: false },
                        ].map((login, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-[#FAFAFA] rounded-xl border border-[#F5F5F5]">
                            <div className="flex items-center gap-3">
                              <History size={16} className="text-[#9A9A9A]" />
                              <div>
                                <div className="text-[13px] font-bold text-[#0D0D0D]">
                                  {login.device}
                                  {login.current && <span className="ml-2 px-1.5 py-0.5 bg-[#F0FDF4] text-[#16A34A] text-[10px] rounded">Current</span>}
                                </div>
                                <div className="text-[11px] text-[#9A9A9A]">{login.ip} · {login.time}</div>
                              </div>
                            </div>
                            {!login.current && <button className="text-[11px] font-bold text-[#DC2626] hover:underline">Log out</button>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'Advanced' && (
              <div className="space-y-5">
                {/* 1. Store Behavior */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Store Behavior</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Configure how your store functions</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Guest Checkout</h4>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">Allow checkout without account</p>
                      </div>
                      <Switch checked={guestCheckout} onCheckedChange={setGuestCheckout} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Account Creation</h4>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">Prompt guest to create account after first order</p>
                      </div>
                      <Switch checked={promptAccountCreation} onCheckedChange={setPromptAccountCreation} />
                    </div>
                    <div className="space-y-2 max-w-xs">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Low Stock Threshold</label>
                      <input type="number" defaultValue="10" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                      <p className="text-[11px] text-[#9A9A9A]">Show low stock warning below this qty</p>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Out of Stock Behavior</label>
                      <div className="space-y-2">
                        {[
                          { id: 'hide', label: 'Hide product from store' },
                          { id: 'show', label: 'Show as "Sold Out"' },
                          { id: 'backorder', label: 'Allow backorders' },
                        ].map((opt) => (
                          <label key={opt.id} className="flex items-center gap-3 p-3 border border-[#E8E8E8] rounded-xl cursor-pointer hover:bg-[#FAFAFA] transition-all">
                            <input 
                              type="radio" 
                              name="oos" 
                              checked={outOfStockBehavior === opt.id}
                              onChange={() => setOutOfStockBehavior(opt.id)}
                              className="text-[#FF6B35] focus:ring-[#FF6B35]" 
                            />
                            <span className="text-[13px] font-medium text-[#4B4B4B]">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-[#F5F5F5]">
                      <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Product Reviews</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-[#4B4B4B]">Allow product reviews</span>
                          <Switch checked={allowReviews} onCheckedChange={setAllowReviews} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-[#4B4B4B]">Only verified buyers can review</span>
                          <Switch checked={verifiedReviewsOnly} onCheckedChange={setVerifiedReviewsOnly} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-[#4B4B4B]">Auto-approve reviews</span>
                          <Switch checked={autoApproveReviews} onCheckedChange={setAutoApproveReviews} />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. Checkout Behavior */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Checkout Behavior</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Optimize the checkout experience</p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">Order Number Format</label>
                      <input type="text" defaultValue="LS-{YEAR}-{NUMBER}" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                      <p className="text-[11px] text-[#9A9A9A]">Preview: <span className="font-bold text-[#0D0D0D]">LS-2025-0001</span></p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">Min Order Amount</label>
                        <input type="text" defaultValue="$0" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">Max Order Amount</label>
                        <input type="text" defaultValue="No limit" className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Address Validation</h4>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">Validate shipping addresses at checkout</p>
                      </div>
                      <Switch checked={addressValidation} onCheckedChange={setAddressValidation} />
                    </div>
                  </div>
                </section>

                {/* 3. Cache & Performance */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Cache & Performance</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">Optimize store speed and assets</p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Cache Settings</h4>
                      <div className="flex flex-wrap gap-3">
                        <button className="h-10 px-5 border border-[#E8E8E8] rounded-xl text-[13px] font-bold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all">Clear Product Cache</button>
                        <button className="h-10 px-5 border border-[#E8E8E8] rounded-xl text-[13px] font-bold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all">Clear All Cache</button>
                      </div>
                      <p className="text-[11px] text-[#9A9A9A]">Last cleared: <span className="font-bold">2 hours ago</span></p>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-[#F5F5F5]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Image Optimization</h4>
                          <p className="text-[13px] text-[#9A9A9A] mt-0.5">Auto-compress uploaded images</p>
                        </div>
                        <Switch checked={autoCompressImages} onCheckedChange={setAutoCompressImages} />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[12px] font-bold">
                          <span className="text-[#4B4B4B]">Compression Quality</span>
                          <span className="text-[#FF6B35]">85%</span>
                        </div>
                        <input type="range" min="60" max="100" defaultValue="85" className="w-full h-1.5 bg-[#F5F5F5] rounded-lg appearance-none cursor-pointer accent-[#FF6B35]" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. Developer */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">Developer Tools</h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">API access and advanced debugging</p>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">API Keys</h4>
                        <button className="text-[12px] font-bold text-[#DC2626] hover:underline">Regenerate Keys</button>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-bold text-[#9A9A9A] uppercase mb-1">Public Key</p>
                            <code className="text-[13px] text-[#4B4B4B]">pk_live_51P...9u7</code>
                          </div>
                          <button className="p-2 text-[#9A9A9A] hover:text-[#FF6B35] transition-colors"><Copy size={16} /></button>
                        </div>
                        <div className="p-4 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-bold text-[#9A9A9A] uppercase mb-1">Secret Key</p>
                            <code className="text-[13px] text-[#4B4B4B]">{revealSecretKey ? 'sk_live_51P...k2m' : 'sk_live_••••••••••••••••'}</code>
                          </div>
                          <button 
                            onClick={() => setRevealSecretKey(!revealSecretKey)}
                            className="p-2 text-[#9A9A9A] hover:text-[#FF6B35] transition-colors"
                          >
                            {revealSecretKey ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[#F5F5F5]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Webhooks</h4>
                        <button className="text-[12px] font-bold text-[#FF6B35] hover:underline">Add Webhook</button>
                      </div>
                      <div className="border border-[#E8E8E8] rounded-xl overflow-hidden">
                        <table className="w-full text-left text-[12px]">
                          <thead className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
                            <tr>
                              <th className="px-4 py-3 font-semibold text-[#4B4B4B]">URL</th>
                              <th className="px-4 py-3 font-semibold text-[#4B4B4B]">Event</th>
                              <th className="px-4 py-3 font-semibold text-[#4B4B4B]">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F5F5F5]">
                            <tr>
                              <td className="px-4 py-3 text-[#0D0D0D] truncate max-w-[150px]">https://api.example.com/webhook</td>
                              <td className="px-4 py-3 text-[#4B4B4B]">order.created</td>
                              <td className="px-4 py-3"><span className="px-1.5 py-0.5 bg-[#F0FDF4] text-[#16A34A] rounded-md font-bold">Active</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#F5F5F5]">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">Debug Mode</h4>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">Enable detailed error logging</p>
                      </div>
                      <Switch checked={debugMode} onCheckedChange={setDebugMode} />
                    </div>
                  </div>
                </section>

                {/* 5. Danger Zone */}
                <section className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-2xl p-7">
                  <div className="border-b border-[#FCA5A5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#991B1B]">Danger Zone</h2>
                    <p className="text-[13px] text-[#B91C1C] mt-1">Irreversible actions that affect your entire store</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-[#FEE2E2] rounded-xl">
                      <div>
                        <h4 className="text-[14px] font-bold text-[#0D0D0D]">Export All Data</h4>
                        <p className="text-[12px] text-[#9A9A9A]">Download a complete backup of your store data</p>
                      </div>
                      <button className="h-10 px-5 border border-[#E8E8E8] rounded-xl text-[13px] font-bold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all flex items-center gap-2">
                        <Download size={14} />
                        Export Data
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-[#FEE2E2] rounded-xl">
                      <div>
                        <h4 className="text-[14px] font-bold text-[#0D0D0D]">Reset Store Settings</h4>
                        <p className="text-[12px] text-[#9A9A9A]">Restore all settings to their default values</p>
                      </div>
                      <button 
                        onClick={() => {
                          setConfirmAction('RESET_SETTINGS');
                          setShowConfirmModal(true);
                        }}
                        className="h-10 px-5 bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2] rounded-xl text-[13px] font-bold hover:bg-[#FEE2E2] transition-all"
                      >
                        Reset Settings
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-[#FEE2E2] rounded-xl">
                      <div>
                        <h4 className="text-[14px] font-bold text-[#0D0D0D]">Delete All Products</h4>
                        <p className="text-[12px] text-[#9A9A9A]">Permanently remove all products from your catalog</p>
                      </div>
                      <button 
                        onClick={() => {
                          setConfirmAction('DELETE_PRODUCTS');
                          setShowConfirmModal(true);
                        }}
                        className="h-10 px-5 bg-[#DC2626] text-white rounded-xl text-[14px] font-bold hover:bg-[#B91C1C] transition-all"
                      >
                        Delete Products
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)} />
          <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center text-[#DC2626] mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-[20px] font-bold text-[#0D0D0D] text-center mb-2">Are you absolutely sure?</h3>
            <p className="text-[14px] text-[#9A9A9A] text-center mb-8">
              This action is irreversible. To proceed, please type <span className="font-bold text-[#0D0D0D]">CONFIRM</span> below.
            </p>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Type CONFIRM here"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                className="w-full h-12 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[14px] text-center font-bold outline-none focus:border-[#DC2626] transition-all"
              />
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    setShowConfirmModal(false);
                    setConfirmInput('');
                  }}
                  className="h-12 border border-[#E8E8E8] rounded-xl text-[14px] font-bold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={confirmInput !== 'CONFIRM'}
                  className={`h-12 rounded-xl text-[14px] font-bold text-white transition-all ${confirmInput === 'CONFIRM' ? 'bg-[#DC2626] hover:bg-[#B91C1C]' : 'bg-[#E8E8E8] cursor-not-allowed'}`}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
