import React from 'react';
import Image from 'next/image';
import { CheckCircle, Truck, Clock, Package, RotateCcw, Star, Download, ChevronRight } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  items: number;
  total: string;
  images: string[];
  deliveredDate?: string;
  estimatedDate?: string;
}

export default function OrderCard() {
  const orders: Order[] = [
    {
      id: "#LS-2024-8821",
      date: "January 10, 2025",
      status: "Delivered",
      items: 3,
      total: "$489.97",
      images: [
        "https://picsum.photos/seed/headphones/100/100",
        "https://picsum.photos/seed/shoes/100/100",
        "https://picsum.photos/seed/bag/100/100"
      ],
      deliveredDate: "January 14, 2025"
    },
    {
      id: "#LS-2024-8756",
      date: "January 5, 2025",
      status: "Shipped",
      items: 1,
      total: "$129.99",
      images: ["https://picsum.photos/seed/watch/100/100"],
      estimatedDate: "January 12, 2025"
    },
    {
      id: "#LS-2024-8690",
      date: "December 28, 2024",
      status: "Processing",
      items: 2,
      total: "$299.98",
      images: [
        "https://picsum.photos/seed/sneakers/100/100",
        "https://picsum.photos/seed/jacket/100/100"
      ]
    }
  ];

  const StatusBadge = ({ status }: { status: Order['status'] }) => {
    const configs = {
      Delivered: { bg: 'bg-[#F0FDF4]', border: 'border-[#BBF7D0]', text: 'text-[#16A34A]', icon: CheckCircle },
      Shipped: { bg: 'bg-[#EFF6FF]', border: 'border-[#BFDBFE]', text: 'text-[#2563EB]', icon: Truck },
      Processing: { bg: 'bg-[#FFFBEB]', border: 'border-[#FDE68A]', text: 'text-[#D97706]', icon: Clock },
      Cancelled: { bg: 'bg-[#FEF2F2]', border: 'border-[#FECACA]', text: 'text-[#DC2626]', icon: CheckCircle }
    };

    const config = configs[status];
    const Icon = config.icon;

    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${config.bg} ${config.border} ${config.text}`}>
        <Icon size={13} />
        <span className="text-[12px] font-semibold">{status}</span>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <div 
          key={order.id}
          className="bg-white border border-[#E8E8E8] rounded-[14px] overflow-hidden transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        >
          {/* CARD HEADER */}
          <div className="bg-[#FAFAFA] px-5 py-4 border-b border-[#E8E8E8] flex flex-wrap items-center justify-between gap-5">
            <div className="flex flex-wrap gap-5 sm:gap-10">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-[#9A9A9A] uppercase tracking-wider">ORDER</span>
                <span className="text-[14px] font-bold text-[#0D0D0D]">{order.id}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-[#9A9A9A] uppercase tracking-wider">DATE</span>
                <span className="text-[13px] font-medium text-[#4B4B4B]">{order.date}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-[#9A9A9A] uppercase tracking-wider">TOTAL</span>
                <span className="text-[14px] font-bold text-[#0D0D0D]">{order.total}</span>
              </div>
            </div>
            <StatusBadge status={order.status} />
          </div>

          {/* CARD BODY */}
          <div className="p-5 flex flex-col sm:flex-row items-center gap-6">
            {/* Product image previews */}
            <div className="flex items-center -space-x-3 shrink-0">
              {order.images.slice(0, 3).map((img, i) => (
                <div 
                  key={i} 
                  className="w-[52px] h-[52px] rounded-full border-2 border-white bg-[#F5F5F5] overflow-hidden relative shadow-sm"
                  style={{ zIndex: 10 - i }}
                >
                  <Image 
                    src={img} 
                    alt="Product" 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              {order.items > 3 && (
                <div className="w-[52px] h-[52px] rounded-full border-2 border-white bg-[#F5F5F5] flex items-center justify-center text-[12px] font-bold text-[#9A9A9A] relative z-0 shadow-sm">
                  +{order.items - 3}
                </div>
              )}
            </div>

            {/* Order info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                <Package size={14} className="text-[#9A9A9A]" />
                <span className="text-[14px] font-semibold text-[#0D0D0D]">{order.items} {order.items === 1 ? 'item' : 'items'}</span>
              </div>
              
              {order.status === 'Delivered' && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[13px] text-[#16A34A] font-medium">
                  <CheckCircle size={13} />
                  <span>Delivered {order.deliveredDate?.split(',')[0]}</span>
                </div>
              )}
              {order.status === 'Shipped' && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[13px] text-[#2563EB] font-medium">
                  <Truck size={13} />
                  <span>Est. delivery {order.estimatedDate?.split(',')[0]}</span>
                </div>
              )}
              {order.status === 'Processing' && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[13px] text-[#D97706] font-medium">
                  <Clock size={13} />
                  <span>Preparing your order</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <button className="h-9 px-4 border border-[#E8E8E8] rounded-lg text-[13px] font-bold text-[#0D0D0D] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all flex items-center justify-center gap-1.5">
                View Order
              </button>
              <button className="h-9 px-4 text-[13px] font-bold text-[#FF6B35] hover:bg-[#FFF0EB] rounded-lg transition-all flex items-center justify-center gap-1.5">
                <RotateCcw size={13} />
                Buy Again
              </button>
            </div>
          </div>

          {/* CARD FOOTER (Delivered orders only) */}
          {order.status === 'Delivered' && (
            <div className="border-top border-[#F5F5F5] px-5 py-3 flex items-center justify-between bg-[#FAFAFA]">
              <button className="flex items-center gap-1.5 text-[13px] text-[#4B4B4B] hover:text-[#FF6B35] transition-colors">
                <Star size={14} className="text-[#FF6B35]" />
                <span>Rate this order</span>
              </button>
              <button className="flex items-center gap-1.5 text-[12px] text-[#9A9A9A] hover:text-[#FF6B35] transition-colors">
                <Download size={14} />
                <span>Invoice</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
