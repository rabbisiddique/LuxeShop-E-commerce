// ─── Helpers ──────────────────────────────────────────────────────────────────

import { ShippingMethod } from "@/index.type";
import { Clock, Store, Truck, Zap } from "lucide-react";

export const getMethodIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("express")) return Zap;
  if (n.includes("same")) return Clock;
  if (n.includes("pickup")) return Store;
  return Truck;
};

export const getIconBg = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("express")) return "bg-[#FFF0EB]";
  if (n.includes("same")) return "bg-[#FFFBEB]";
  if (n.includes("pickup")) return "bg-[#F0FDF4]";
  return "bg-[#EFF6FF]";
};

export const getIconColor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("express")) return "text-[#FF6B35]";
  if (n.includes("same")) return "text-[#D97706]";
  if (n.includes("pickup")) return "text-[#16A34A]";
  return "text-[#2563EB]";
};

export const formatTime = (min: number, max: number) => {
  if (min === 0 && max === 0) return "Today";
  if (min === max) return `${min} Business Day${min > 1 ? "s" : ""}`;
  return `${min}–${max} Business Days`;
};

export const formatPrice = (method: ShippingMethod) =>
  method.shipping_type === "free_shipping"
    ? "FREE"
    : `$${method.price.toFixed(2)}`;
