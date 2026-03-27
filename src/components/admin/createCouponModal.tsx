"use client";

import { Category, CouponInput } from "@/index.type";
import { createCoupon, updateCoupon } from "@/src/actions/admin/admin.coupons";
import { Calendar, DollarSign, Percent, Shuffle, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────

interface CreateCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  mode: "create" | "edit";
  couponId?: string;
  initialData?: CouponInput | null; // 👈 add this
}

// ─── Generate Code ───────────────────────

const generateCouponCode = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
};

// ─── Default Form State ──────────────────

const defaultForm = {
  code: "",
  discount_type: "percentage" as "percentage" | "fixed" | "free_shipping",
  discount_value: 0,
  usage_limit: null as number | null,
  per_customer_limit: 1,
  minimum_order_amount: 0,
  applicable_categories: [] as string[],
  start_date: "",
  end_date: "",
  no_expiry: true,
  status: "active" as "active" | "draft" | "scheduled",
};
// Helper to map Coupon → form shape
const couponToForm = (data: CouponInput) => ({
  code: data.code ?? "",
  discount_type: data.discount_type ?? "percentage",
  discount_value: data.discount_value ?? 0,
  usage_limit: data.usage_limit ?? null,
  per_customer_limit: data.per_customer_limit ?? 1,
  minimum_order_amount: data.minimum_order_amount ?? 0,
  applicable_categories: data.applicable_categories ?? [],
  start_date: data.start_date ? data.start_date.slice(0, 10) : "",
  end_date: data.end_date ? data.end_date.slice(0, 10) : "",
  no_expiry: data.no_expiry ?? true,
  status: data.status ?? "active",
});
// ─── Component ───────────────────────────

export default function CreateCouponModal({
  isOpen,
  onClose,
  categories,
  mode,
  couponId,
  initialData,
}: CreateCouponModalProps) {
  // Seed form immediately — no loading delay
  const [formData, setFormData] = useState(() =>
    initialData ? couponToForm(initialData) : defaultForm,
  );
  const [isLoading, setIsLoading] = useState(false);

  // Sync if initialData changes (e.g. modal reused)
  useEffect(() => {
    if (initialData) {
      setFormData(couponToForm(initialData));
    } else {
      setFormData(defaultForm);
    }
  }, [initialData]);

  if (!isOpen) return null;

  // ─── Handlers ──────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? value === ""
              ? null
              : Number(value)
            : value,
    }));
  };

  const handleDiscountType = (
    type: "percentage" | "fixed" | "free_shipping",
  ) => {
    setFormData((prev) => ({
      ...prev,
      discount_type: type,
      discount_value: type === "free_shipping" ? 0 : prev.discount_value,
    }));
  };

  const handleGenerate = () => {
    const code = generateCouponCode(10);
    setFormData((prev) => ({ ...prev, code }));
  };

  const toggleCategory = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      applicable_categories: prev.applicable_categories.includes(id)
        ? prev.applicable_categories.filter((c) => c !== id)
        : [...prev.applicable_categories, id],
    }));
  };

  const handleAllCategories = () => {
    setFormData((prev) => ({
      ...prev,
      applicable_categories: [],
    }));
  };

  const handleClose = () => {
    setFormData(defaultForm);
    onClose();
  };

  // ─── Submit ─────────────────────────────

  const handleSubmit = async () => {
    if (!formData.code.trim()) {
      toast.error("Coupon code is required");
      return;
    }
    if (
      formData.discount_value <= 0 &&
      formData.discount_type !== "free_shipping"
    ) {
      toast.error("Please enter a valid discount value");
      return;
    }

    // 👇 Guard — catch undefined before hitting the DB
    if (mode === "edit" && !couponId) {
      toast.error("Coupon ID is missing, cannot update");
      return;
    }

    setIsLoading(true);

    if (mode === "edit" && couponId) {
      const result = await updateCoupon(formData, couponId);
      console.log("update res", result);
      if (result.success) {
        toast.success(result.message ?? "Coupon updated!");
        handleClose();
      } else {
        toast.error(result.message ?? "Something went wrong");
      }
    } else {
      const result = await createCoupon(formData);
      console.log(result);

      if (result.success) {
        toast.success(result.message ?? "Coupon created!");
        handleClose();
      } else {
        toast.error(result.message ?? "Something went wrong");
      }
    }

    setIsLoading(false);
  };

  // ─── Render ──────────────────────────────

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#F5F5F5] flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-[#0D0D0D]">
            {mode === "edit" ? "Edit Coupon" : "Create New Coupon"}
          </h3>
          <button
            onClick={handleClose}
            className="text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)] space-y-6">
          {/* ── Coupon Code ── */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#4B4B4B]">
              Coupon Code *
            </label>
            <div className="flex">
              <input
                type="text"
                name="code"
                placeholder="E.G. SUMMER20"
                className="flex-1 h-11 px-4 bg-white border border-[#E8E8E8] rounded-l-xl text-[14px] font-mono font-bold tracking-[2px] uppercase outline-none focus:border-[#FF6B35]"
                value={formData.code}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    code: e.target.value.toUpperCase(),
                  }))
                }
              />
              <button
                type="button"
                onClick={handleGenerate}
                className="h-11 px-4 bg-[#F5F5F5] border border-l-0 border-[#E8E8E8] rounded-r-xl text-[13px] font-semibold text-[#4B4B4B] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all flex items-center gap-2"
              >
                <Shuffle size={14} />
                Generate
              </button>
            </div>
          </div>

          {/* ── Discount Type ── */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#4B4B4B]">
              Discount Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  value: "percentage" as const,
                  label: "Percentage",
                  icon: Percent,
                  active: "bg-[#FFF0EB] border-[#FF6B35] text-[#FF6B35]",
                  hover: "hover:border-[#FF6B35]",
                },
                {
                  value: "fixed" as const,
                  label: "Fixed Amount",
                  icon: DollarSign,
                  active: "bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]",
                  hover: "hover:border-[#2563EB]",
                },
                {
                  value: "free_shipping" as const,
                  label: "Free Shipping",
                  icon: Truck,
                  active: "bg-[#F0FDF4] border-[#16A34A] text-[#16A34A]",
                  hover: "hover:border-[#16A34A]",
                },
              ].map((type) => {
                const isActive = formData.discount_type === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleDiscountType(type.value)}
                    className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                      isActive
                        ? type.active
                        : `bg-white border-[#E8E8E8] text-[#9A9A9A] ${type.hover}`
                    }`}
                  >
                    <type.icon size={20} />
                    <span className="text-[13px] font-bold">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Discount Value ── */}
          {formData.discount_type !== "free_shipping" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[13px] font-semibold text-[#4B4B4B]">
                Discount Value
              </label>
              <div className="flex">
                <div className="h-11 px-4 bg-[#FAFAFA] border border-r-0 border-[#E8E8E8] rounded-l-xl flex items-center text-[13px] font-bold text-[#4B4B4B]">
                  {formData.discount_type === "percentage" ? "%" : "$"}
                </div>
                <input
                  type="number"
                  name="discount_value"
                  placeholder="10"
                  min={0}
                  max={
                    formData.discount_type === "percentage" ? 100 : undefined
                  }
                  className="flex-1 h-11 px-4 bg-white border border-[#E8E8E8] rounded-r-xl text-[14px] outline-none focus:border-[#FF6B35]"
                  value={formData.discount_value || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* ── Usage Limits ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-[#4B4B4B]">
                Usage Limit
              </label>
              <input
                type="number"
                name="usage_limit"
                placeholder="Unlimited"
                min={0}
                className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                value={formData.usage_limit ?? ""}
                onChange={handleChange}
              />
              <p className="text-[11px] text-[#9A9A9A]">
                Total times this code can be used
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-[#4B4B4B]">
                Per Customer Limit
              </label>
              <input
                type="number"
                name="per_customer_limit"
                placeholder="1"
                min={1}
                className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                value={formData.per_customer_limit}
                onChange={handleChange}
              />
              <p className="text-[11px] text-[#9A9A9A]">
                Times one customer can use it
              </p>
            </div>
          </div>

          {/* ── Minimum Order ── */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#4B4B4B]">
              Minimum Order Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9A9A9A]">
                $
              </span>
              <input
                type="number"
                name="minimum_order_amount"
                placeholder="0"
                min={0}
                className="w-full h-11 pl-8 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                value={formData.minimum_order_amount || ""}
                onChange={handleChange}
              />
            </div>
            <p className="text-[11px] text-[#9A9A9A]">Leave 0 for no minimum</p>
          </div>

          {/* ── Applicable Categories ── */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#4B4B4B]">
              Applicable Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {/* All Categories */}
              <button
                type="button"
                onClick={handleAllCategories}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all border ${
                  formData.applicable_categories.length === 0
                    ? "bg-[#FFF0EB] text-[#FF6B35] border-[#FF6B35]"
                    : "bg-[#F5F5F5] text-[#4B4B4B] border-transparent hover:border-[#E8E8E8]"
                }`}
              >
                All Categories
              </button>

              {/* Real categories from DB */}
              {categories.map((cat) => {
                const isSelected = formData.applicable_categories.includes(
                  cat.id,
                );
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all border ${
                      isSelected
                        ? "bg-[#FFF0EB] text-[#FF6B35] border-[#FF6B35]"
                        : "bg-[#F5F5F5] text-[#4B4B4B] border-transparent hover:border-[#E8E8E8]"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Validity ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-[#4B4B4B]">
                Start Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] pointer-events-none"
                  size={16}
                />
                <input
                  type="date"
                  name="start_date"
                  className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-[#4B4B4B]">
                End Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] pointer-events-none"
                  size={16}
                />
                <input
                  type="date"
                  name="end_date"
                  disabled={formData.no_expiry}
                  className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35] disabled:opacity-40 disabled:cursor-not-allowed"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  id="no_expiry"
                  name="no_expiry"
                  checked={formData.no_expiry}
                  onChange={handleChange}
                  className="rounded border-[#E8E8E8] accent-[#FF6B35]"
                />
                <label
                  htmlFor="no_expiry"
                  className="text-[11px] text-[#9A9A9A] font-medium cursor-pointer"
                >
                  No expiry
                </label>
              </div>
            </div>
          </div>

          {/* ── Status ── */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#4B4B4B]">
              Status
            </label>
            <div className="flex gap-4">
              {[
                {
                  value: "active",
                  label: "Active",
                  color: "bg-[#16A34A]",
                },
                {
                  value: "draft",
                  label: "Draft",
                  color: "bg-[#9A9A9A]",
                },
                {
                  value: "scheduled",
                  label: "Scheduled",
                  color: "bg-[#2563EB]",
                },
              ].map((s) => (
                <label
                  key={s.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    value={s.value}
                    checked={formData.status === s.value}
                    onChange={handleChange}
                    className="accent-[#FF6B35]"
                  />
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                    <span className="text-[13px] font-medium text-[#4B4B4B]">
                      {s.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-[#FAFAFA] border-t border-[#F5F5F5] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="h-11 px-6 border border-[#E8E8E8] rounded-xl text-[14px] font-bold text-[#4B4B4B] hover:bg-white transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-11 px-6 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#E55A25] transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {mode === "edit" ? "Saving..." : "Creating..."}
              </>
            ) : mode === "edit" ? (
              "Save Changes"
            ) : (
              "Create Coupon"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
