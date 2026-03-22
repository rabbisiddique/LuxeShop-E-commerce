import { Instagram, Twitter, Facebook, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0D0D] text-white">
      {/* Newsletter Strip */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h3 className="text-lg lg:text-xl font-semibold mb-2">Stay in the loop</h3>
            <p className="text-sm text-[#9A9A9A]">Get deals, new arrivals and style tips delivered to your inbox.</p>
          </div>
          <form className="w-full lg:w-auto flex items-center max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 bg-[#1F1F1F] border border-[#2A2A2A] px-4 text-sm outline-none focus:border-[#FF6B35] transition-colors rounded-l-lg"
            />
            <button className="h-11 bg-[#FF6B35] px-6 text-sm font-bold uppercase tracking-wider hover:bg-[#E55A25] transition-colors rounded-r-lg">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1.5">
            <Link href="/" className="flex items-center mb-6">
              <span className="font-['Playfair_Display'] text-2xl font-bold">Luxe</span>
              <span className="font-['Playfair_Display'] text-2xl font-bold text-[#FF6B35]">Shop</span>
            </Link>
            <p className="text-sm text-[#9A9A9A] leading-relaxed mb-8 max-w-[220px]">
              Premium products, effortless shopping. Elevate your lifestyle with our curated collections.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-[#1F1F1F] flex items-center justify-center text-white/60 hover:bg-[#FF6B35] hover:text-white transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[1.5px] mb-6">SHOP</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'All Products', href: '/shop' },
                { name: 'Electronics', href: '/category/electronics' },
                { name: 'Fashion', href: '/category/fashion' },
                { name: 'Beauty & Skincare', href: '/category/beauty' },
                { name: 'Sports & Fitness', href: '/category/sports' },
                { name: 'Deals', href: '/shop' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] text-[#9A9A9A] hover:text-[#FF6B35] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Account */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[1.5px] mb-6">ACCOUNT</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'My Account', href: '/account' },
                { name: 'My Orders', href: '/account?tab=Orders' },
                { name: 'Wishlist', href: '/wishlist' },
                { name: 'Track Order', href: '/account?tab=Orders' },
                { name: 'Returns', href: '/account?tab=Orders' },
                { name: 'Sign In', href: '/login' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] text-[#9A9A9A] hover:text-[#FF6B35] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Help */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[1.5px] mb-6">HELP</h4>
            <ul className="flex flex-col gap-3">
              {['FAQ', 'Shipping Info', 'Return Policy', 'Size Guide', 'Contact Us', 'Live Chat'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] text-[#9A9A9A] hover:text-[#FF6B35] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[1.5px] mb-6">CONTACT</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#FF6B35] mt-1" />
                <span className="text-[13px] text-[#9A9A9A]">123 Commerce St, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#FF6B35]" />
                <span className="text-[13px] text-[#9A9A9A]">hello@luxeshop.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#FF6B35]" />
                <span className="text-[13px] text-[#9A9A9A]">+1 (555) 000-0000</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1F1F1F] py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <p className="text-[12px] text-[#4B4B4B]">
            © 2025 LuxeShop. All rights reserved.
          </p>
          <div className="text-[12px] text-[#4B4B4B] flex items-center gap-2">
            <span>Visa</span> | <span>Mastercard</span> | <span>PayPal</span> | <span>Stripe</span> | <span>Apple Pay</span>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-[#4B4B4B]">
            <a href="#" className="hover:text-[#FF6B35] transition-colors">Privacy Policy</a>
            <span className="text-[#1F1F1F]">•</span>
            <a href="#" className="hover:text-[#FF6B35] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
