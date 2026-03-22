import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On all orders over $100"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "30-day hassle-free returns"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    desc: "256-bit SSL encryption"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Here whenever you need us"
  }
];

export default function TrustBadges() {
  return (
    <section className="w-full bg-[#FAFAFA] border-y border-[#E8E8E8] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {badges.map((badge, index) => (
            <div 
              key={badge.title}
              className={`flex items-center gap-3 lg:px-8 ${
                index !== badges.length - 1 ? 'lg:border-r lg:border-[#E8E8E8]' : ''
              }`}
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#FFF0EB] flex items-center justify-center text-[#FF6B35]">
                <badge.icon size={20} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-[#1F1F1F] leading-tight">
                  {badge.title}
                </h3>
                <p className="text-[12px] text-[#9A9A9A] mt-0.5 leading-tight">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
