import React from 'react';
import { MapPin, Phone, Mail, Instagram, Youtube, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#f8f8fa] border-t border-gray-200 pt-16 pb-24 lg:pb-12 text-gray-600 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-200">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-sans font-black text-2xl tracking-wider uppercase text-neutral-950 block">
              VASTRA ABHARANA
            </span>
            <p className="text-neutral-500 leading-relaxed max-w-sm font-sans">
              Launched in 2018 in Bengaluru to bring women timeless handcrafted ethnic wear at direct weaver prices with impeccable customer care.
            </p>
            <div className="pt-2 text-[11px] space-y-1 text-neutral-400 font-sans font-medium">
              <p>Trade Entity: <span className="text-neutral-700 font-bold">BALASYBRAMANIAM KANAGAPRIYA</span></p>
              <p>Legal Name: <span className="text-neutral-700">Vastra Abharana</span></p>
              <p>GSTIN: <span className="text-orange-600 font-bold">29DKQPK5756N1Z1</span></p>
            </div>
            {/* Social Channels */}
            <div className="flex gap-2.5 pt-2">
              <a
                href="https://www.instagram.com/vastraabharana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@vastraabharana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-red-500 hover:border-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/vastraabharana2018/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-blue-500 hover:border-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#111111]">Collections</h5>
            <ul className="space-y-2 text-gray-600 font-sans">
              <li><a href="#sarees" className="hover:text-black transition-colors">Mysore Silk Sarees</a></li>
              <li><a href="#salwars" className="hover:text-black transition-colors">Aarvi Cotton Suits</a></li>
              <li><a href="#combos" className="hover:text-black transition-colors">Buy 3 @ ₹1,200/- Combos</a></li>
              <li><a href="#combos" className="hover:text-black transition-colors">Buy 3 @ ₹1,400/- Combos</a></li>
              <li><a href="#jewellery" className="hover:text-black transition-colors">Temple Jewelry Sets</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#111111]">Customer Care</h5>
            <ul className="space-y-2 text-gray-600 font-sans">
              <li><a href="#" className="hover:text-black transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-black transition-colors">5-Day Exchange Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Statement</a></li>
            </ul>
          </div>

          {/* Bengaluru Store Address */}
          <div className="space-y-3">
            <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#111111]">Bengaluru Store</h5>
            <div className="space-y-2.5 text-gray-600">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Ground Floor, 796/2, 80 Feet Road, Next To Parimala Sweets, BSK 3rd Stage Girinagar VBHCS, Bengaluru 560085
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-terracotta shrink-0" />
                <a href="tel:+918073394735" className="hover:text-black font-sans font-semibold">
                  +91-8073394735
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-terracotta shrink-0" />
                <a href="mailto:vastraabharana1@gmail.com" className="hover:text-black font-sans font-medium">
                  vastraabharana1@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
          <p>© 2026 Vastra Abharana. Authentic Indian Craftsmanship.</p>
          <div className="flex items-center gap-4 text-[11px] font-medium">
            <span>UPI • RuPay • Cards • NetBanking • Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
