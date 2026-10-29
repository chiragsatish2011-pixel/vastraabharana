import React from 'react';
import { Instagram } from 'lucide-react';

export const LookbookGrid = () => {
  const photos = [
    { webp: '/images/models/hero_model_green.webp', fallback: '/images/models/hero_model_green.jpg' },
    { webp: '/images/models/model_hero_woman.webp', fallback: '/images/models/model_hero_woman.jpg' },
    { webp: '/images/models/model_saree_maroon.webp', fallback: '/images/models/model_saree_maroon.jpg' },
    { webp: '/images/models/model_jewelry_detail.webp', fallback: '/images/models/model_jewelry_detail.jpg' },
    { webp: '/images/models/model_saree_gold.webp', fallback: '/images/models/model_saree_gold.jpg' },
    { webp: '/images/models/saris_banner.webp', fallback: '/images/models/saris_banner.jpg' }
  ];

  return (
    <section id="lookbook" className="pt-2 pb-20 bg-white border-b border-neutral-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 6-Card Community Lookbook Grid (Matching Video Frame 38: Tight Grid Border-to-Border) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {photos.map((item, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/vastraabharana"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[3px] overflow-hidden bg-neutral-100 border border-neutral-200/80 block hover:border-orange-500/50 transition-colors shadow-xs"
            >
              <picture>
                <source srcSet={item.webp} type="image/webp" />
                <img
                  src={item.fallback}
                  alt="Vastra Abharana Festive Lookbook"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
              </picture>
              
              {/* Instagram Icon Hover Overlay (Matching Video Frame 38) */}
              <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-9 h-9 rounded-full bg-white/95 text-neutral-900 flex items-center justify-center shadow-lg">
                  <Instagram className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Center Pill Badge Positioned Below Images (Matching Video Frame 38: "@materiathemes") */}
        <div className="flex justify-center mt-8">
          <a
            href="https://www.instagram.com/vastraabharana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-50 hover:bg-neutral-950 hover:text-white transition-all text-xs font-sans font-semibold text-neutral-800 shadow-xs border border-neutral-200 tracking-normal hover:scale-105"
          >
            <Instagram className="w-3.5 h-3.5 text-orange-600 group-hover:text-white" />
            <span>@vastraabharana</span>
          </a>
        </div>

      </div>
    </section>
  );
};
