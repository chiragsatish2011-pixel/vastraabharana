import React from 'react';

export const SpringShowcase = () => {
  return (
    <section id="spring-showcase" className="py-16 sm:py-24 bg-white border-b border-neutral-100 select-none">
      {/* ── ALMOST TOUCHING THE SIDES OF THE WEBSITE (MATCHING REFERENCE VIDEO FRAME 32 & 33) ── */}
      <div className="w-full max-w-[97%] xl:max-w-[1560px] mx-auto px-2 sm:px-4">
        
        {/* ── 3 CONTIGUOUS RECTANGLES DIVIDED BY HAIRLINE BORDER (ALL IN CONTACT, ZERO GAP) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border border-neutral-200 rounded-[2px] bg-white overflow-hidden shadow-sm min-h-[520px] sm:min-h-[560px] lg:min-h-[600px]">
          
          {/* ── LEFT RECTANGLE: EDITORIAL MODEL IMAGE AT SCALE ── */}
          <div className="bg-[#fafaf9] p-6 sm:p-8 lg:p-10 flex items-center justify-center relative overflow-hidden group">
            <div className="w-full h-full max-h-[460px] lg:max-h-[500px] flex items-center justify-center overflow-hidden rounded-[2px] bg-white shadow-sm border border-neutral-200/60">
              <picture className="w-full h-full">
                <source srcSet="/images/models/saris_banner.webp" type="image/webp" />
                <img
                  src="/images/models/saris_banner.jpg"
                  alt="Vastra Abharana Royal Mysore Silk Model"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
                />
              </picture>
            </div>
          </div>

          {/* ── CENTER RECTANGLE: BRAND STORY & HIGH-FASHION TYPOGRAPHY ── */}
          <div className="bg-white p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center space-y-6 relative">
            <div className="space-y-1.5 select-none">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black uppercase text-neutral-950 tracking-[0.05em] leading-none">
                SPRING
              </h3>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black uppercase text-neutral-950 tracking-[0.05em] leading-none">
                COLLECTION
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 font-sans font-normal max-w-sm leading-relaxed">
              Handcrafted in Bengaluru since 2018. Pure raw Mysore silks, handwoven golden zari motifs, and heirloom craftsmanship celebrating modern Indian royalty.
            </p>

            <div className="pt-2">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-3 rounded-[2px] border border-neutral-900 hover:border-orange-600 bg-transparent hover:bg-neutral-950 text-neutral-950 hover:text-white font-sans font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-sm active:scale-95"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* ── RIGHT RECTANGLE: PRODUCT AT SCALE ON LIGHT BACKGROUND ── */}
          <div className="bg-[#fafaf9] p-6 sm:p-8 lg:p-10 flex items-center justify-center relative overflow-hidden group">
            <div className="w-full h-full max-h-[460px] lg:max-h-[500px] flex items-center justify-center overflow-hidden rounded-[2px] bg-white shadow-sm border border-neutral-200/60 p-4 sm:p-6">
              <picture className="w-full h-full flex items-center justify-center">
                <source srcSet="/images/models/model_jewelry_detail.webp" type="image/webp" />
                <img
                  src="/images/models/model_jewelry_detail.jpg"
                  alt="22K Gold Handcrafted Temple Jewelry"
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain group-hover:scale-106 transition-transform duration-700"
                />
              </picture>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};