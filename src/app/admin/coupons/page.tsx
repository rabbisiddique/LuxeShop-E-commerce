"use client";
import { Coupon } from "@/index.type";
import {
  deleteCoupon,
  getSigleCoupon,
} from "@/src/actions/admin/admin.coupons";
import ConfirmDialog from "@/src/components/admin/ConfirmDialog";
import CreateCouponModal from "@/src/components/admin/createCouponModal";
import { useCategory } from "@/src/hooks/useCategory";
import { useCoupon } from "@/src/hooks/useCoupon";
import {
  Calendar,
  ChevronDown,
  Copy,
  DollarSign,
  Download,
  Edit2,
  Percent,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  Truck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDiscount(coupon: Coupon): string {
  if (coupon.discount_type === "percentage")
    return `${coupon.discount_value}% off`;
  if (coupon.discount_type === "fixed") return `$${coupon.discount_value} off`;
  return "Free Shipping";
}

function statusLabel(status: Coupon["status"]): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatExpiry(coupon: Coupon): string {
  if (coupon.no_expiry || !coupon.end_date) return "No expiry";
  return new Date(coupon.end_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMinOrder(amount: number): string {
  if (!amount || amount === 0) return "No minimum";
  return `$${amount.toLocaleString()}`;
}

function formatPerCustomer(limit: number): string {
  if (!limit || limit === 0) return "Unlimited";
  return `${limit} per customer`;
}

function calcTotalSaved(coupon: Coupon): number {
  const used = coupon.used_count ?? 0;
  if (coupon.discount_type === "percentage")
    return Math.round(
      (coupon.discount_value / 100) * coupon.minimum_order_amount * used,
    );
  if (coupon.discount_type === "fixed") return coupon.discount_value * used;
  return 0;
}

// ─── component ──────────────────────────────────────────────────────────────

export default function CouponsPage() {
  const [showModal, setShowModal] = useState(false);
  const { categories } = useCategory();
  const { coupons, loading } = useCoupon();
  const [editCouponId, setEditCouponId] = useState<string | undefined>();
  const [editCouponData, setEditCouponData] = useState<Coupon | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit button handler — fetch FIRST, then open
  const handleEditClick = async (couponId: string) => {
    const { success, data } = await getSigleCoupon(couponId);
    if (success && data) {
      setEditCouponId(couponId);
      setEditCouponData(data);
      setShowModal(true);
    } else {
      toast.error("Failed to load coupon");
    }
  };

  const handleDeleteCoupon = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const res = await deleteCoupon(deleteId);
      console.log(res);

      if (res.success) {
        toast.success(res.message);
        setDeleteId(null);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("Error in deleting coupon");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-['Playfair_Display'] text-[32px] font-bold text-[#0D0D0D]">
              Coupons & Promotions
            </h1>
            <p className="text-[14px] text-[#9A9A9A] mt-1">
              Create and manage discount codes
            </p>
          </div>
          <button
            onClick={() => {
              setEditCouponId(undefined);
              setEditCouponData(null);
              setShowModal(true);
            }}
            className="h-[42px] px-5 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#E55A25] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Create Coupon
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search coupon codes..."
                className="w-full h-10 pl-10 pr-4 bg-[#F5F5F5] border-transparent rounded-xl text-[13px] outline-none focus:bg-white focus:border-[#FF6B35] transition-all"
              />
            </div>
            <button className="w-full sm:w-auto h-10 px-4 border border-[#E8E8E8] rounded-xl text-[13px] font-medium text-[#4B4B4B] flex items-center justify-between gap-2 hover:bg-[#F5F5F5]">
              All Status <ChevronDown size={14} />
            </button>
            <button className="w-full sm:w-auto h-10 px-4 border border-[#E8E8E8] rounded-xl text-[13px] font-medium text-[#4B4B4B] flex items-center justify-between gap-2 hover:bg-[#F5F5F5]">
              All Types <ChevronDown size={14} />
            </button>
          </div>
          <button className="h-10 px-4 border border-[#E8E8E8] rounded-xl text-[13px] font-medium text-[#4B4B4B] flex items-center gap-2 hover:bg-[#F5F5F5]">
            <Download size={14} />
            Export
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-1.5 w-full bg-[#E8E8E8]" />
                <div className="px-5 py-4 border-b border-dashed border-[#E8E8E8]">
                  <div className="h-5 bg-[#F5F5F5] rounded w-32 mb-3" />
                  <div className="h-6 bg-[#F5F5F5] rounded-full w-24" />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex gap-6">
                    <div className="h-8 bg-[#F5F5F5] rounded w-12" />
                    <div className="h-8 bg-[#F5F5F5] rounded w-12" />
                    <div className="h-8 bg-[#F5F5F5] rounded w-16" />
                  </div>
                  <div className="h-1 bg-[#F5F5F5] rounded w-full" />
                  <div className="h-4 bg-[#F5F5F5] rounded w-3/4" />
                  <div className="h-4 bg-[#F5F5F5] rounded w-2/3" />
                  <div className="h-4 bg-[#F5F5F5] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coupons Grid */}
        {!loading && coupons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon, i) => {
              const used = coupon.used_count ?? 0;
              const limit = coupon.usage_limit ?? null;
              const totalSaved = calcTotalSaved(coupon);
              const usagePct =
                typeof limit === "number" && limit > 0
                  ? Math.min((used / limit) * 100, 100)
                  : null;

              return (
                <div
                  key={coupon.id ?? i}
                  className={`bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${
                    coupon.status === "draft" ? "opacity-65 border-dashed" : ""
                  }`}
                >
                  {/* Top Stripe */}
                  <div
                    className={`h-1.5 w-full ${
                      coupon.status === "active"
                        ? "bg-[#FF6B35]"
                        : coupon.status === "draft"
                          ? "bg-[#9A9A9A]"
                          : "bg-[#3B82F6]"
                    }`}
                  />

                  {/* Card Header */}
                  <div className="px-5 py-4 border-b border-dashed border-[#E8E8E8]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[18px] font-bold font-mono tracking-[2px] text-[#0D0D0D]">
                        {coupon.code}
                      </div>
                      <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all">
                        <Copy size={14} />
                      </button>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        coupon.discount_type === "percentage"
                          ? "bg-[#FFF0EB] text-[#FF6B35]"
                          : coupon.discount_type === "fixed"
                            ? "bg-[#EFF6FF] text-[#2563EB]"
                            : "bg-[#F0FDF4] text-[#16A34A]"
                      }`}
                    >
                      {coupon.discount_type === "percentage" ? (
                        <Percent size={11} />
                      ) : coupon.discount_type === "fixed" ? (
                        <DollarSign size={11} />
                      ) : (
                        <Truck size={11} />
                      )}
                      {formatDiscount(coupon)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    {/* Stats Row */}
                    <div className="flex gap-6 mb-4">
                      <div className="flex flex-col">
                        <span className="text-[18px] font-bold text-[#0D0D0D]">
                          {used}
                        </span>
                        <span className="text-[11px] text-[#9A9A9A] mt-0.5 font-medium">
                          times used
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[18px] font-bold text-[#0D0D0D]">
                          {limit ?? "∞"}
                        </span>
                        <span className="text-[11px] text-[#9A9A9A] mt-0.5 font-medium">
                          usage limit
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[18px] font-bold text-[#FF6B35]">
                          ${totalSaved.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-[#9A9A9A] mt-0.5 font-medium">
                          total saved
                        </span>
                      </div>
                    </div>

                    {/* Usage progress bar — only when there's a finite limit */}
                    {usagePct !== null && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[11px] text-[#9A9A9A] font-medium">
                            {used} / {limit} used
                          </span>
                          <span className="text-[11px] font-bold text-[#FF6B35]">
                            {Math.round(usagePct)}%
                          </span>
                        </div>
                        <div className="w-full h-1 bg-[#F5F5F5] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF6B35] transition-all duration-500"
                            style={{ width: `${usagePct}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[12px] text-[#4B4B4B]">
                        <Calendar size={13} className="text-[#9A9A9A]" />
                        <span>Expires: {formatExpiry(coupon)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-[#4B4B4B]">
                        <ShoppingCart size={13} className="text-[#9A9A9A]" />
                        <span>
                          Min order:{" "}
                          {formatMinOrder(coupon.minimum_order_amount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-[#4B4B4B]">
                        <Users size={13} className="text-[#9A9A9A]" />
                        <span>
                          {formatPerCustomer(coupon.per_customer_limit)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3 border-t border-[#F5F5F5] bg-[#FAFAFA] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          coupon.status === "active"
                            ? "bg-[#16A34A]"
                            : coupon.status === "draft"
                              ? "bg-[#9A9A9A]"
                              : "bg-[#3B82F6]"
                        }`}
                      />
                      <span className="text-[11px] font-bold text-[#4B4B4B]">
                        {statusLabel(coupon.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditClick(coupon.id!)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all disabled:opacity-50"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#F5F5F5] transition-all">
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(coupon.id!);
                        }}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#FEF2F2] hover:text-[#DC2626] transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && coupons.length === 0 && (
          <div className="text-center py-20 text-[#9A9A9A] text-[14px]">
            No coupons found. Create your first one!
          </div>
        )}
      </div>

      {/* Create/Edit Coupon Modal */}
      {showModal && (
        <CreateCouponModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditCouponId(undefined);
            setEditCouponData(null);
          }}
          categories={categories}
          mode={editCouponId ? "edit" : "create"}
          couponId={editCouponId}
          initialData={editCouponData}
        />
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete coupon"
        description="This will permanently delete the coupon. This action cannot be undone."
        confirmLabel="Delete Coupon"
        isLoading={isDeleting}
        onConfirm={handleDeleteCoupon}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
