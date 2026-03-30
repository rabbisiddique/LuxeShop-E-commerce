"use client";

import {
  getStoreSettings,
  removeLogo,
  updateStoreSettings,
  uploadLogo,
} from "@/src/actions/admin/admin.settings"; // adjust import path
import { Switch } from "@/src/components/ui/Switch";
import {
  AlertTriangle,
  Bell,
  Check,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Store,
  Truck,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────

interface StoreSettings {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  currency: string;
  language: string;
  timezone: string;
  date_format: string;
  primary_color: string;
  logo_url: string | null;
  favicon_url: string | null;
  store_online: boolean;
  maintenance_mode: boolean;
  maintenance_message: string;
  social: {
    instagram: string;
    twitter: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
}

type NotificationKey =
  | "newOrder"
  | "lowStock"
  | "newReview"
  | "customerSignup"
  | "failedPayment";

// ─── Toast ────────────────────────────

function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-[14px] font-semibold animate-in slide-in-from-bottom-4 fade-in duration-300 ${
        type === "success" ? "bg-[#16A34A]" : "bg-[#DC2626]"
      }`}
    >
      {type === "success" ? <Check size={16} /> : <X size={16} />}
      {message}
    </div>
  );
}

// ─── Page ─────────────────────────────

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("Store");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);

  // ── Store form state
  const [settings, setSettings] = useState<StoreSettings>({
    name: "",
    tagline: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "United States",
    currency: "USD",
    language: "English (US)",
    timezone: "America/New_York",
    date_format: "MM/DD/YYYY",
    primary_color: "#FF6B35",
    logo_url: null,
    favicon_url: null,
    store_online: true,
    maintenance_mode: false,
    maintenance_message: "We're currently updating our store. Back soon!",
    social: {
      instagram: "",
      twitter: "",
      facebook: "",
      youtube: "",
      tiktok: "",
    },
  });

  // ── Notifications state
  const [notifications, setNotifications] = useState({
    newOrder: true,
    lowStock: true,
    newReview: false,
    customerSignup: true,
    failedPayment: true,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");

  // ─── Helpers ──────────────────────────

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const set = (field: keyof StoreSettings, value: any) =>
    setSettings((prev) => ({ ...prev, [field]: value }));

  const setSocial = (platform: keyof StoreSettings["social"], value: string) =>
    setSettings((prev) => ({
      ...prev,
      social: { ...prev.social, [platform]: value },
    }));

  // ─── Load on mount ────────────────────

  useEffect(() => {
    (async () => {
      const res = await getStoreSettings();
      if (res.success && res.data) {
        const d = res.data as any;
        setSettings((prev) => ({
          ...prev,
          name: d.name ?? prev.name,
          tagline: d.tagline ?? prev.tagline,
          description: d.description ?? prev.description,
          email: d.email ?? prev.email,
          phone: d.phone ?? prev.phone,
          address: d.address ?? prev.address,
          city: d.city ?? prev.city,
          state: d.state ?? prev.state,
          country: d.country ?? prev.country,
          currency: d.currency ?? prev.currency,
          language: d.language ?? prev.language,
          timezone: d.timezone ?? prev.timezone,
          date_format: d.date_format ?? prev.date_format,
          primary_color: d.primary_color ?? prev.primary_color,
          logo_url: d.logo_url ?? null,
          favicon_url: d.favicon_url ?? null,
          store_online: d.store_online ?? prev.store_online,
          maintenance_mode: d.maintenance_mode ?? prev.maintenance_mode,
          maintenance_message:
            d.maintenance_message ?? prev.maintenance_message,
          social: {
            instagram: d.social?.instagram ?? "",
            twitter: d.social?.twitter ?? "",
            facebook: d.social?.facebook ?? "",
            youtube: d.social?.youtube ?? "",
            tiktok: d.social?.tiktok ?? "",
          },
        }));
      }
      setLoading(false);
    })();
  }, []);

  // ─── Save store settings ──────────────

  const handleSaveStore = async () => {
    setSaving(true);
    const res = await updateStoreSettings({
      name: settings.name,
      tagline: settings.tagline,
      description: settings.description,
      email: settings.email,
      phone: settings.phone,
      address: settings.address,
      city: settings.city,
      state: settings.state,
      country: settings.country,
      currency: settings.currency,
      language: settings.language,
      timezone: settings.timezone,
      date_format: settings.date_format,
      primary_color: settings.primary_color,
      logo_url: settings.logo_url,
      favicon_url: settings.favicon_url,
      store_online: settings.store_online,
      maintenance_mode: settings.maintenance_mode,
      maintenance_message: settings.maintenance_message,
      social: settings.social,
    });
    setSaving(false);
    showToast(
      res.success ? "Settings saved!" : res.message,
      res.success ? "success" : "error",
    );
  };

  // ─── Save notifications ───────────────

  const handleSaveNotifications = async () => {
    setSaving(true);
    const res = await updateStoreSettings({ notifications });
    setSaving(false);
    showToast(
      res.success ? "Notifications saved!" : res.message,
      res.success ? "success" : "error",
    );
  };

  // ─── Logo upload ──────────────────────

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadLogo(formData);
    if (res.success && res.url) {
      set("logo_url", res.url);
      showToast("Logo uploaded!", "success");
    } else {
      showToast(res.message, "error");
    }
    setLogoUploading(false);
    // reset input so same file can be re-selected
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  // ─── Logo remove ──────────────────────

  const handleRemoveLogo = async () => {
    const res = await removeLogo();
    if (res.success) {
      set("logo_url", null);
      showToast("Logo removed!", "success");
    } else {
      showToast(res.message, "error");
    }
  };

  // ─── Shared save button ───────────────

  const SaveButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      disabled={saving}
      className="h-10 px-6 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#E55A25] transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {saving ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Save size={16} />
      )}
      Save Changes
    </button>
  );

  const navItems = [
    { id: "Store", icon: Store, label: "Store" },
    { id: "Notifications", icon: Bell, label: "Notifications" },
    { id: "Shipping", icon: Truck, label: "Shipping" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#FF6B35]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-[32px] font-bold text-[#0D0D0D]">
            Settings
          </h1>
          <p className="text-[14px] text-[#9A9A9A] mt-1">
            Manage your store configuration
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Nav */}
          <aside className="w-full lg:w-[240px] shrink-0">
            <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden sticky top-[88px]">
              <div className="px-5 py-4 border-b border-[#E8E8E8]">
                <span className="text-[13px] font-bold text-[#9A9A9A] uppercase tracking-wider">
                  Configuration
                </span>
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
                        isActive
                          ? "bg-[#FFF0EB] text-[#FF6B35]"
                          : "text-[#4B4B4B] hover:bg-[#FAFAFA]"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#FF6B35] rounded-r-full" />
                      )}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-[#FF6B35] text-white"
                            : "bg-[#F5F5F5] text-[#9A9A9A] group-hover:text-[#FF6B35]"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <span
                        className={`text-[13px] ${isActive ? "font-semibold" : "font-medium"}`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Content */}
          <main className="flex-1">
            {/* ── Store Tab ── */}
            {activeTab === "Store" && (
              <div className="space-y-5">
                {/* General Information */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">
                      General Information
                    </h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">
                      Basic details about your store
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">
                          Store Name
                        </label>
                        <div className="relative">
                          <Store
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                            size={16}
                          />
                          <input
                            type="text"
                            value={settings.name}
                            onChange={(e) => set("name", e.target.value)}
                            className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">
                          Store Tagline
                        </label>
                        <input
                          type="text"
                          value={settings.tagline}
                          onChange={(e) => set("tagline", e.target.value)}
                          className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">
                        Store Description
                      </label>
                      <textarea
                        value={settings.description}
                        onChange={(e) => set("description", e.target.value)}
                        className="w-full h-[100px] p-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">
                          Store Email
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                            size={16}
                          />
                          <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => set("email", e.target.value)}
                            className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">
                          Support Phone
                        </label>
                        <div className="relative">
                          <Phone
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                            size={16}
                          />
                          <input
                            type="text"
                            value={settings.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">
                        Store Address
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                          size={16}
                        />
                        <input
                          type="text"
                          value={settings.address}
                          onChange={(e) => set("address", e.target.value)}
                          className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">
                          City
                        </label>
                        <input
                          type="text"
                          value={settings.city}
                          onChange={(e) => set("city", e.target.value)}
                          className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">
                          State
                        </label>
                        <input
                          type="text"
                          value={settings.state}
                          onChange={(e) => set("state", e.target.value)}
                          className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">
                          Country
                        </label>
                        <select
                          value={settings.country}
                          onChange={(e) => set("country", e.target.value)}
                          className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <SaveButton onClick={handleSaveStore} />
                    </div>
                  </div>
                </section>

                {/* Store Logo & Branding */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">
                      Store Logo & Branding
                    </h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">
                      Manage your visual identity
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Logo */}
                    <div className="flex items-center gap-6">
                      {/* hidden file input */}
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />

                      {settings.logo_url ? (
                        <img
                          src={settings.logo_url}
                          alt="Store logo"
                          className="w-20 h-20 rounded-xl border-2 border-[#E8E8E8] object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-[#FF6B35] rounded-xl border-2 border-[#E8E8E8] flex items-center justify-center text-white text-3xl font-bold">
                          {settings.name?.[0]?.toUpperCase() ?? "L"}
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => logoInputRef.current?.click()}
                            disabled={logoUploading}
                            className="h-9 px-4 border border-[#E8E8E8] rounded-lg text-[13px] font-semibold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all flex items-center gap-2 disabled:opacity-60"
                          >
                            {logoUploading ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <Upload size={14} />
                            )}
                            {logoUploading ? "Uploading…" : "Change Logo"}
                          </button>
                          {settings.logo_url && (
                            <button
                              onClick={handleRemoveLogo}
                              className="text-[12px] font-medium text-[#DC2626] hover:underline"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <p className="text-[12px] text-[#9A9A9A]">
                          Recommended size: 512x512px. PNG, JPG or SVG.
                        </p>
                      </div>
                    </div>

                    {/* Favicon */}
                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 bg-[#FF6B35] rounded-lg border border-[#E8E8E8] flex items-center justify-center text-white text-[10px] font-bold">
                        {settings.name?.[0]?.toUpperCase() ?? "L"}
                      </div>
                      <button className="h-9 px-4 border border-[#E8E8E8] rounded-lg text-[13px] font-semibold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all">
                        Change Favicon
                      </button>
                    </div>

                    {/* Primary Color */}
                    <div className="flex items-center gap-4">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">
                        Primary Color
                      </label>
                      <div className="flex items-center gap-2 p-1 bg-white border border-[#E8E8E8] rounded-lg">
                        <div
                          className="w-7 h-7 rounded-full border border-[#00000010]"
                          style={{ backgroundColor: settings.primary_color }}
                        />
                        <input
                          type="text"
                          value={settings.primary_color}
                          onChange={(e) => set("primary_color", e.target.value)}
                          className="w-20 h-7 text-[13px] font-mono text-[#0D0D0D] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Regional Settings */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">
                      Regional Settings
                    </h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">
                      Configure localization options
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">
                        Currency
                      </label>
                      <div className="relative">
                        <DollarSign
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                          size={16}
                        />
                        <select
                          value={settings.currency}
                          onChange={(e) => set("currency", e.target.value)}
                          className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none"
                        >
                          <option value="USD">USD — US Dollar ($)</option>
                          <option value="EUR">EUR — Euro (€)</option>
                          <option value="GBP">GBP — British Pound (£)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">
                        Language
                      </label>
                      <div className="relative">
                        <Globe
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                          size={16}
                        />
                        <select
                          value={settings.language}
                          onChange={(e) => set("language", e.target.value)}
                          className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none"
                        >
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">
                        Timezone
                      </label>
                      <div className="relative">
                        <Clock
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                          size={16}
                        />
                        <select
                          value={settings.timezone}
                          onChange={(e) => set("timezone", e.target.value)}
                          className="w-full h-11 pl-10 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none"
                        >
                          <option value="America/New_York">
                            America/New_York (EST)
                          </option>
                          <option value="Europe/London">
                            Europe/London (GMT)
                          </option>
                          <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-[#4B4B4B]">
                        Date Format
                      </label>
                      <select
                        value={settings.date_format}
                        onChange={(e) => set("date_format", e.target.value)}
                        className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none appearance-none"
                      >
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Store Status */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">
                      Store Status
                    </h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">
                      Control your store availability
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">
                          Store Online
                        </h4>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">
                          Your store is currently accepting orders
                        </p>
                      </div>
                      <Switch
                        checked={settings.store_online}
                        onCheckedChange={(v) => set("store_online", v)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D0D0D]">
                          Maintenance Mode
                        </h4>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">
                          Show maintenance page to visitors
                        </p>
                      </div>
                      <Switch
                        checked={settings.maintenance_mode}
                        onCheckedChange={(v) => set("maintenance_mode", v)}
                      />
                    </div>

                    {settings.maintenance_mode && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="text-[13px] font-semibold text-[#4B4B4B]">
                          Maintenance Message
                        </label>
                        <textarea
                          value={settings.maintenance_message}
                          onChange={(e) =>
                            set("maintenance_message", e.target.value)
                          }
                          className="w-full h-24 p-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none resize-none focus:border-[#FF6B35]"
                        />
                      </div>
                    )}
                  </div>
                </section>

                {/* Social Media */}
                <section className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                  <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                    <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">
                      Social Media
                    </h2>
                    <p className="text-[13px] text-[#9A9A9A] mt-1">
                      Connect your social profiles
                    </p>
                  </div>

                  <div className="space-y-4">
                    {(
                      [
                        {
                          platform: "Instagram",
                          key: "instagram",
                          placeholder: "@luxeshop",
                        },
                        {
                          platform: "Twitter/X",
                          key: "twitter",
                          placeholder: "@luxeshop",
                        },
                        {
                          platform: "Facebook",
                          key: "facebook",
                          placeholder: "facebook.com/luxeshop",
                        },
                        {
                          platform: "YouTube",
                          key: "youtube",
                          placeholder: "youtube.com/@luxeshop",
                        },
                        {
                          platform: "TikTok",
                          key: "tiktok",
                          placeholder: "@luxeshop",
                        },
                      ] as {
                        platform: string;
                        key: keyof StoreSettings["social"];
                        placeholder: string;
                      }[]
                    ).map((social) => (
                      <div
                        key={social.platform}
                        className="flex items-center gap-4"
                      >
                        <div className="w-32 text-[13px] font-semibold text-[#4B4B4B]">
                          {social.platform}
                        </div>
                        <input
                          type="text"
                          placeholder={social.placeholder}
                          value={settings.social[social.key]}
                          onChange={(e) =>
                            setSocial(social.key, e.target.value)
                          }
                          className="flex-1 h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-6">
                    <SaveButton onClick={handleSaveStore} />
                  </div>
                </section>
              </div>
            )}

            {/* ── Notifications Tab ── */}
            {activeTab === "Notifications" && (
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                  <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">
                    Notifications
                  </h2>
                  <p className="text-[13px] text-[#9A9A9A] mt-1">
                    Manage email and system alerts
                  </p>
                </div>

                <div className="space-y-5">
                  {(
                    [
                      {
                        id: "newOrder",
                        label: "New Order",
                        desc: "Get notified when a new order is placed",
                      },
                      {
                        id: "lowStock",
                        label: "Low Stock Alert",
                        desc: "Alert when product stock falls below 10",
                      },
                      {
                        id: "newReview",
                        label: "New Review",
                        desc: "Get notified on new product reviews",
                      },
                      {
                        id: "customerSignup",
                        label: "Customer Signup",
                        desc: "Alert when a new customer registers",
                      },
                      {
                        id: "failedPayment",
                        label: "Failed Payment",
                        desc: "Get notified on failed payments",
                      },
                    ] as { id: NotificationKey; label: string; desc: string }[]
                  ).map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-center justify-between py-4 border-b border-[#F5F5F5] last:border-0"
                    >
                      <div>
                        <p className="text-[14px] font-semibold text-[#0D0D0D]">
                          {notif.label}
                        </p>
                        <p className="text-[12px] text-[#9A9A9A] mt-0.5">
                          {notif.desc}
                        </p>
                      </div>
                      <Switch
                        checked={notifications[notif.id]}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            [notif.id]: checked,
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  {/* <SaveButton onClick={handleSaveNotifications} /> */}
                </div>
              </div>
            )}

            {/* ── Shipping Tab ── */}
            {activeTab === "Shipping" && (
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
                <div className="border-b border-[#F5F5F5] pb-5 mb-6">
                  <h2 className="text-[18px] font-semibold font-['Playfair_Display'] text-[#0D0D0D]">
                    Shipping Settings
                  </h2>
                  <p className="text-[13px] text-[#9A9A9A] mt-1">
                    Manage your delivery options and zones
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-[#FFF0EB] rounded-full flex items-center justify-center text-[#FF6B35] mb-4">
                    <Truck size={32} />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0D0D0D]">
                    Manage Shipping Methods
                  </h3>
                  <p className="text-[14px] text-[#9A9A9A] mt-2 max-w-sm">
                    Configure your shipping rates, delivery times, and zones in
                    the dedicated shipping management page.
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
          </main>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm"
            onClick={() => setShowConfirmModal(false)}
          />
          <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center text-[#DC2626] mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-[20px] font-bold text-[#0D0D0D] text-center mb-2">
              Are you absolutely sure?
            </h3>
            <p className="text-[14px] text-[#9A9A9A] text-center mb-8">
              This action is irreversible. Type{" "}
              <span className="font-bold text-[#0D0D0D]">CONFIRM</span> to
              proceed.
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
                    setConfirmInput("");
                  }}
                  className="h-12 border border-[#E8E8E8] rounded-xl text-[14px] font-bold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all"
                >
                  Cancel
                </button>
                <button
                  disabled={confirmInput !== "CONFIRM"}
                  className={`h-12 rounded-xl text-[14px] font-bold text-white transition-all ${
                    confirmInput === "CONFIRM"
                      ? "bg-[#DC2626] hover:bg-[#B91C1C]"
                      : "bg-[#E8E8E8] cursor-not-allowed"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
