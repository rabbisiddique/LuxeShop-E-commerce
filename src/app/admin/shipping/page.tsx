"use client";

import {
  BarChart2,
  ChevronRight,
  DollarSign,
  Edit2,
  Globe,
  Loader2,
  Plus,
  Save,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";

import { ShippingMethod, ShippingType } from "@/index.type";
import {
  createShippingMethod,
  deleteShippingMethod,
  toggleShippingMethods,
  updateShippingMethod,
} from "@/src/actions/admin/admin.shipping";
import ConfirmDialog from "@/src/components/admin/ConfirmDialog";
import { Switch } from "@/src/components/ui/Switch";
import { useShipping } from "@/src/hooks/useShipping";
import {
  formatPrice,
  formatTime,
  getIconBg,
  getIconColor,
  getMethodIcon,
} from "@/src/lib/helper/shipping";
import { toast } from "sonner";

// ─── Default form ─────────────────────────────────────────────────────────────

const defaultForm = {
  name: "",
  description: "",
  price: 0.0,
  shipping_type: "free_shipping" as ShippingType, // Use the ShippingType type
  estimated_days_min: 0,
  estimated_days_max: 0,
  is_active: true,
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden animate-pulse">
    <div className="bg-[#FAFAFA] px-5 py-4 border-b border-[#E8E8E8] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E8E8E8]" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-32 bg-[#E8E8E8] rounded" />
          <div className="h-3 w-20 bg-[#E8E8E8] rounded" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-6 w-16 bg-[#E8E8E8] rounded-full" />
        <div className="h-6 w-10 bg-[#E8E8E8] rounded-full" />
      </div>
    </div>
    <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-1.5">
          <div className="h-3 w-20 bg-[#E8E8E8] rounded" />
          <div className="h-4 w-16 bg-[#E8E8E8] rounded" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShippingMethodsPage() {
  const { shipping, isLoading, error, setShipping } = useShipping();
  const [showModal, setShowModal] = useState(false);
  const [priceType, setPriceType] = useState("free");
  const [isMethodEnabled, setIsMethodEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Method name is required");
      return;
    }
    setIsSaving(true);
    try {
      if (editId) {
        const res = await updateShippingMethod(formData, editId);
        if (res.success) {
          toast.success(res.message);
          handleClose();
        } else {
          toast.error(res.message);
        }
        return; // ✅ stop here — don't fall through to create
      }
      const res = await createShippingMethod(formData);
      if (res.success) {
        toast.success(res.message);
        handleClose();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error("Error creating shipping method:", err);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (method: ShippingMethod) => {
    setEditId(method.id);
    setPriceType(method.shipping_type === "fixed_shipping" ? "fixed" : "free"); // ✅ add this
    setIsMethodEnabled(method.is_active);
    setFormData({
      name: method.name,
      description: method.description ?? "",
      price: method.price,
      shipping_type: method.shipping_type,
      estimated_days_min: method.estimated_days_min,
      estimated_days_max: method.estimated_days_max,
      is_active: method.is_active,
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    const result = await deleteShippingMethod(deleteId);

    if (result.success) {
      toast.success(result.message);
      setDeleteId(null);
    } else {
      toast.error(result.message);
    }

    setIsDeleting(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setPriceType("free"); // ✅ reset
    setIsMethodEnabled(true); // ✅ reset to default

    setEditId(null);
    setFormData(defaultForm);
  };

  const handleToggle = async (id: string, newValue: boolean) => {
    setTogglingId(id); // ✅ start loading
    const result = await toggleShippingMethods(id, newValue);
    if (result.success) {
      setShipping((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_active: newValue } : m)),
      );
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setTogglingId(null); // ✅ stop loading
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-['Playfair_Display'] text-[32px] font-bold text-[#0D0D0D]">
              Shipping Methods
            </h1>
            <p className="text-[14px] text-[#9A9A9A] mt-1">
              Manage delivery options for your store
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="h-[42px] px-5 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold hover:bg-[#E55A25] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            Add Method
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-[#FFF0EB] border border-[#FFD4C2] rounded-2xl p-4 sm:p-6 mb-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
            <Truck size={24} className="text-[#FF6B35]" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-[15px] font-bold text-[#0D0D0D]">
              Free Shipping Threshold
            </h3>
            <p className="text-[13px] text-[#4B4B4B] mt-0.5">
              Orders over this amount get free standard shipping
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#9A9A9A]">
                $
              </span>
              <input
                type="text"
                defaultValue="100.00"
                className="w-[100px] h-10 pl-6 pr-3 bg-white border border-[#E8E8E8] rounded-lg text-[14px] font-semibold text-right outline-none focus:border-[#FF6B35]"
              />
            </div>
            <button className="h-10 px-4 bg-[#FF6B35] text-white rounded-lg text-[13px] font-bold hover:bg-[#E55A25] transition-colors">
              Save
            </button>
          </div>
        </div>

        {/* Shipping Methods List */}
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton loading
            [1, 2, 3].map((i) => <SkeletonCard key={i} />)
          ) : error ? (
            // Error state
            <div className="bg-white border border-[#FEE2E2] rounded-2xl p-10 text-center">
              <p className="text-[15px] font-semibold text-[#DC2626]">
                Failed to load shipping methods
              </p>
              <p className="text-[13px] text-[#9A9A9A] mt-1">{error}</p>
            </div>
          ) : shipping.length === 0 ? (
            // Empty state
            <div className="bg-white border border-dashed border-[#E8E8E8] rounded-2xl p-16 text-center">
              <div className="w-14 h-14 bg-[#FFF0EB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={26} className="text-[#FF6B35]" />
              </div>
              <p className="text-[16px] font-bold text-[#0D0D0D]">
                No shipping methods yet
              </p>
              <p className="text-[13px] text-[#9A9A9A] mt-1 mb-5">
                Add your first shipping option to start accepting orders
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="h-10 px-5 bg-[#FF6B35] text-white rounded-xl text-[13px] font-bold hover:bg-[#E55A25] transition-colors inline-flex items-center gap-2"
              >
                <Plus size={14} />
                Add Method
              </button>
            </div>
          ) : (
            // Actual data
            shipping.map((method) => {
              const Icon = getMethodIcon(method.name);
              const price = formatPrice(method);
              const time = formatTime(
                method.estimated_days_min,
                method.estimated_days_max,
              );

              return (
                <div
                  key={method.id}
                  className={`bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${!method.is_active ? "opacity-70 border-dashed" : ""}`}
                >
                  {/* Card Header */}
                  <div className="bg-[#FAFAFA] px-5 py-4 border-b border-[#E8E8E8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBg(method.name)} ${getIconColor(method.name)}`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-[#0D0D0D]">
                          {method.name}
                        </h3>
                        <p className="text-[13px] text-[#9A9A9A] mt-0.5">
                          {method.description || time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${method.is_active ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#F5F5F5] text-[#9A9A9A]"}`}
                      >
                        {method.is_active ? "Active" : "Inactive"}
                      </span>
                      {togglingId === method.id ? (
                        <div className="w-10 h-6 flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        <Switch
                          checked={method.is_active}
                          onCheckedChange={() =>
                            handleToggle(method.id, !method.is_active)
                          }
                        />
                      )}
                      <div className="w-[1px] h-6 bg-[#E8E8E8] mx-1" />
                      <button
                        onClick={() => handleEdit(method)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#FFF0EB] hover:text-[#FF6B35] transition-all"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(method.id);
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A9A9A] hover:bg-[#FEF2F2] hover:text-[#DC2626] transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <span className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-[0.6px] block mb-1.5">
                        Price
                      </span>
                      <span
                        className={`text-[15px] font-bold ${price === "FREE" ? "text-[#16A34A]" : "text-[#0D0D0D]"}`}
                      >
                        {price}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-[0.6px] block mb-1.5">
                        Delivery Time
                      </span>
                      <span className="text-[15px] font-bold text-[#0D0D0D]">
                        {time}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-[0.6px] block mb-1.5">
                        Type
                      </span>
                      <span className="text-[15px] font-bold text-[#0D0D0D] capitalize">
                        {method.shipping_type === "free_shipping"
                          ? "Free Shipping"
                          : "Fixed Price"}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3 border-t border-[#F5F5F5] bg-[#FAFAFA] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart2 size={13} className="text-[#9A9A9A]" />
                      <span className="text-[12px] text-[#9A9A9A]">
                        {method.shipping_type === "free_shipping"
                          ? "Free shipping method"
                          : `Fixed rate · $${method.price.toFixed(2)}`}
                      </span>
                    </div>
                    <button className="text-[13px] font-semibold text-[#FF6B35] hover:underline">
                      Edit Details →
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Shipping Zones Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-['Playfair_Display'] text-[22px] font-bold text-[#0D0D0D]">
                Shipping Zones
              </h2>
              <p className="text-[14px] text-[#9A9A9A] mt-1">
                Define which regions you ship to
              </p>
            </div>
            <button className="h-9 px-4 border border-[#E8E8E8] rounded-lg text-[13px] font-semibold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-all">
              Add Zone
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl">🇺🇸</div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#0D0D0D]">
                    Domestic (United States)
                  </h4>
                  <p className="text-[12px] text-[#9A9A9A] mt-0.5">
                    All states covered
                  </p>
                  <div className="flex gap-1.5 mt-2">
                    {["Standard", "Express", "Same Day"].map((m) => (
                      <span
                        key={m}
                        className="px-2 py-0.5 bg-[#F5F5F5] rounded text-[10px] font-medium text-[#4B4B4B]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#E8E8E8]" />
            </div>
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center text-[#9A9A9A]">
                  <Globe size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[15px] font-bold text-[#0D0D0D]">
                      International
                    </h4>
                    <span className="px-1.5 py-0.5 bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold rounded">
                      Restricted
                    </span>
                  </div>
                  <p className="text-[12px] text-[#9A9A9A] mt-0.5">
                    42 countries
                  </p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="px-2 py-0.5 bg-[#F5F5F5] rounded text-[10px] font-medium text-[#4B4B4B]">
                      Standard only
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#E8E8E8]" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Shipping Method Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-[520px] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="px-6 py-5 border-b border-[#F5F5F5] flex items-center justify-between shrink-0">
              <h3 className="text-[18px] font-bold text-[#0D0D0D]">
                Add Shipping Method
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#4B4B4B]">
                  Method Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Express Delivery"
                  className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#4B4B4B]">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="1–2 business days"
                  className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#4B4B4B]">
                  Price Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setPriceType("free");
                      setFormData({
                        ...formData,
                        shipping_type: "free_shipping",
                        price: 0,
                      });
                    }}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${priceType === "free" ? "bg-[#FFF0EB] border-[#FF6B35]" : "bg-white border-[#E8E8E8] hover:border-[#FF6B35]"}`}
                  >
                    <Truck
                      size={20}
                      className={
                        priceType === "free"
                          ? "text-[#FF6B35]"
                          : "text-[#9A9A9A]"
                      }
                    />
                    <span
                      className={`text-[13px] font-bold ${priceType === "free" ? "text-[#FF6B35]" : "text-[#4B4B4B]"}`}
                    >
                      Free Shipping
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setPriceType("fixed");
                      setFormData({
                        ...formData,
                        shipping_type: "fixed_shipping",
                      });
                    }}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${priceType === "fixed" ? "bg-[#EFF6FF] border-[#2563EB]" : "bg-white border-[#E8E8E8] hover:border-[#2563EB]"}`}
                  >
                    <DollarSign
                      size={20}
                      className={
                        priceType === "fixed"
                          ? "text-[#2563EB]"
                          : "text-[#9A9A9A]"
                      }
                    />
                    <span
                      className={`text-[13px] font-bold ${priceType === "fixed" ? "text-[#2563EB]" : "text-[#4B4B4B]"}`}
                    >
                      Fixed Price
                    </span>
                  </button>
                </div>
              </div>

              {priceType === "fixed" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9A9A9A]">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full h-11 pl-8 pr-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">
                    Min Days
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                    value={formData.estimated_days_min}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimated_days_min: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-[#4B4B4B]">
                    Max Days
                  </label>
                  <input
                    type="number"
                    placeholder="2"
                    className="w-full h-11 px-4 bg-white border border-[#E8E8E8] rounded-xl text-[14px] outline-none focus:border-[#FF6B35]"
                    value={formData.estimated_days_max}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimated_days_max: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[14px] font-medium text-[#0D0D0D]">
                  Enable this shipping method
                </span>
                <Switch
                  checked={isMethodEnabled}
                  onCheckedChange={(value) => {
                    setFormData({ ...formData, is_active: !!value });
                    setIsMethodEnabled(!!value);
                  }}
                />
              </div>
            </div>

            <div className="px-6 py-5 bg-[#FAFAFA] border-t border-[#F5F5F5] flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="h-11 px-6 border border-[#E8E8E8] rounded-xl text-[14px] font-bold text-[#4B4B4B] hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editId ? "Update" : "Add Method"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Shipping Method"
        description="Are you sure you want to delete this shipping method? This cannot be undone."
        confirmLabel="Delete Method"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
