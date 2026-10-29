import React from 'react';

export const BentoGrid = ({ onSelectCategory }) => {
  return (
    <section id="collections" className="py-16 sm:py-24 bg-white border-b border-orange-500/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Bento Grid with Minimal Unobtrusive Typography (Matching Video Frame 20 & 21) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Tile 1: Tall Main Featured Card (2 cols x 2 rows) - Sarees */}
          <div
            onClick={() => onSelectCategory('saree')}
            className="group relative md:col-span-2 md:row-span-2 rounded-[2px] overflow-hidden bg-neutral-950 cursor-pointer min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-end transition-all duration-400 hover:shadow-2xl"
          >
            <picture className="absolute inset-0 w-full h-full">
              <source srcSet="/images/models/hero_model_green.webp" type="image/webp" />
              <img
                src="/images/models/hero_model_green.jpg"
                alt="Mysore Silk Sarees"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700"
              />
            </picture>
            
            {/* Soft Bottom Vignette for Legibility */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

            {/* Clean Minimal Noticeable-Yet-Ignorable Category Label (Matching Reference Video Frame 21) */}
            <div className="relative z-10 flex flex-col items-center justify-end text-center w-full pb-6 sm:pb-8 pointer-events-none">
              <h3 className="text-base sm:text-lg font-sans font-bold uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] mb-2.5">
                SAREES
              </h3>
              <span className="pointer-events-auto px-4 sm:px-5 py-1.5 sm:py-2 rounded-[2px] bg-white hover:bg-orange-600 text-neutral-900 hover:text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg active:scale-95">
                See collection
              </span>
            </div>
          </div>

          {/* Tile 2: Wide ACCESSORIES Card (Matching Video Frame 20 & 21 Right Top) */}
          <div
            onClick={() => onSelectCategory('Accessories')}
            className="group relative md:col-span-1 lg:col-span-2 rounded-[2px] overflow-hidden bg-neutral-950 cursor-pointer min-h-[240px] sm:min-h-[270px] flex flex-col justify-end transition-all duration-400 hover:shadow-xl"
          >
            <picture className="absolute inset-0 w-full h-full">
              <source srcSet="/images/models/model_jewelry_detail.webp" type="image/webp" />
              <img
                src="/images/models/model_jewelry_detail.jpg"
                alt="Temple Jewelry & Accessories"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 opacity-90"
              />
            </picture>
            
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-end text-center w-full pb-5 sm:pb-6 pointer-events-none">
              <h3 className="text-sm sm:text-base font-sans font-bold uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] mb-2">
                ACCESSORIES
              </h3>
              <span className="pointer-events-auto px-3.5 sm:px-4 py-1.5 rounded-[2px] bg-white hover:bg-orange-600 text-neutral-900 hover:text-white font-sans font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-lg active:scale-95">
                See collection
              </span>
            </div>
          </div>

          {/* Tile 3: Salwar Suits Card (Matching Video Frame 20 & 21 Right Bottom Left) */}
          <div
            onClick={() => onSelectCategory('salwar')}
            className="group relative rounded-[2px] overflow-hidden bg-neutral-950 cursor-pointer min-h-[240px] sm:min-h-[270px] flex flex-col justify-end transition-all duration-400 hover:shadow-xl"
          >
            <picture className="absolute inset-0 w-full h-full">
              <source srcSet="/images/models/model_saree_gold.webp" type="image/webp" />
              <img
                src="/images/models/model_saree_gold.jpg"
                alt="Festive Salwar Suits"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700"
              />
            </picture>
            
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-end text-center w-full pb-5 sm:pb-6 pointer-events-none">
              <h3 className="text-sm sm:text-base font-sans font-bold uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] mb-2">
                SALWAR SUITS
              </h3>
              <span className="pointer-events-auto px-3.5 sm:px-4 py-1.5 rounded-[2px] bg-white hover:bg-orange-600 text-neutral-900 hover:text-white font-sans font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-lg active:scale-95">
                See collection
              </span>
            </div>
          </div>

          {/* Tile 4: Combos Card (Matching Video Frame 20 & 21 Right Bottom Right) */}
          <div
            onClick={() => onSelectCategory('combos')}
            className="group relative rounded-[2px] overflow-hidden bg-neutral-950 cursor-pointer min-h-[240px] sm:min-h-[270px] flex flex-col justify-end transition-all duration-400 hover:shadow-xl"
          >
            <picture className="absolute inset-0 w-full h-full">
              <source srcSet="/images/models/saris_banner.webp" type="image/webp" />
              <img
                src="/images/models/saris_banner.jpg"
                alt="Festive Combos & Offers"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
              />
            </picture>
            
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-end text-center w-full pb-5 sm:pb-6 pointer-events-none">
              <h3 className="text-sm sm:text-base font-sans font-bold uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] mb-2">
                COMBOS
              </h3>
              <span className="pointer-events-auto px-3.5 sm:px-4 py-1.5 rounded-[2px] bg-white hover:bg-orange-600 text-neutral-900 hover:text-white font-sans font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-lg active:scale-95">
                See collection
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};