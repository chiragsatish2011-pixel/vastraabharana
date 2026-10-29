import React, { useEffect, useRef } from 'react';
import { FallingPetals } from './FallingPetals';
import { ArrowRight } from 'lucide-react';

export const Hero3D = () => {
  const textLayerRef = useRef(null);
  const modelLayerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  // High-performance direct GPU transform (ZERO React re-renders on mousemove for DDR4 zero lag)
  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;

        if (textLayerRef.current) {
          textLayerRef.current.style.transform = `translate3d(${x * -8}px, ${y * -5}px, 0)`;
        }
        if (modelLayerRef.current) {
          modelLayerRef.current.style.transform = `translate3d(${x * 6}px, ${y * 4}px, 0)`;
        }
        if (card1Ref.current) {
          card1Ref.current.style.transform = `translate3d(${x * -14}px, ${y * -8}px, 0) rotate(-5deg)`;
        }
        if (card2Ref.current) {
          card2Ref.current.style.transform = `translate3d(${x * -10}px, ${y * -6}px, 0) rotate(4deg)`;
        }
        if (card3Ref.current) {
          card3Ref.current.style.transform = `translate3d(${x * 14}px, ${y * 8}px, 0) rotate(6deg)`;
        }
        if (card4Ref.current) {
          card4Ref.current.style.transform = `translate3d(${x * 10}px, ${y * 6}px, 0) rotate(-4deg)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative w-full h-full min-h-[600px] bg-[#0d0604] text-white overflow-hidden select-none flex items-center justify-center pt-12 sm:pt-16 pb-4">
      
      {/* Original Dramatic Sunset Saffron & Amber Spotlight Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(234,88,12,0.60)_0%,rgba(217,119,6,0.36)_28%,rgba(180,83,9,0.16)_52%,rgba(13,6,4,0.98)_82%)] pointer-events-none" />

      {/* Subtle Architectural Hairline Grid */}
      <div className="absolute inset-0 max-w-7xl mx-auto grid grid-cols-4 pointer-events-none divide-x divide-white/[0.04]" />

      {/* ── FALLING PETALS CANVAS: Tiny Petals Drifting from Top-Right Corner ── */}
      <FallingPetals />

      {/* ── MAIN HERO STAGE ── */}
      <div className="relative w-full h-full flex items-center justify-center max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── LAYER 1: CLEAN GOOGLE SANS LUXURY TYPOGRAPHY (GLOWING PURE WHITE, CENTERED AS A CROWN) ── */}
        <div
          ref={textLayerRef}
          className="absolute inset-0 flex flex-col items-center justify-start pt-[50px] min-[390px]:pt-[54px] sm:pt-[64px] md:pt-[70px] lg:pt-0 lg:justify-center z-10 will-change-transform pointer-events-none text-center px-4"
        >
          {/* Top Line: BE THE (Clean bold modern geometric sans, glowing pure white) */}
          <h1 className="font-sans font-extrabold text-[30px] min-[390px]:text-[34px] sm:text-[46px] md:text-[54px] lg:text-[104px] xl:text-[116px] uppercase text-white tracking-[0.06em] drop-shadow-[0_8px_32px_rgba(0,0,0,0.90)] select-none leading-none">
            BE THE
          </h1>

          {/* Bottom Line: DESI GIRL (Centered with generous letter spacing) */}
          <h2 className="font-sans font-extrabold text-[30px] min-[390px]:text-[34px] sm:text-[46px] md:text-[54px] lg:text-[104px] xl:text-[116px] uppercase text-white tracking-[0.08em] drop-shadow-[0_12px_45px_rgba(0,0,0,0.98)] select-none leading-none mt-0.5 min-[390px]:mt-1 sm:mt-1.5 lg:mt-3">
            DESI GIRL
          </h2>
        </div>

        {/* ── LAYER 2: STATUESQUE CENTERPIECE WOMAN MODEL (DRASTICALLY ENLARGED ON MOBILE, VISIBLE TO ABDOMEN) ── */}
        <div
          ref={modelLayerRef}
          className="relative z-20 h-[76vh] sm:h-[72vh] lg:h-[80vh] max-h-[720px] xl:max-h-[760px] flex items-end justify-center will-change-transform pointer-events-none pb-0 mt-3 sm:mt-10 md:mt-16 lg:mt-8"
        >
          {/* Subtle Ground Shadow Grounding the Waist Silhouette */}
          <div className="absolute bottom-0 w-80 sm:w-[480px] h-12 bg-black/70 rounded-[100%] blur-xl pointer-events-none" />

          {/* Model Cutout (Body visible till abdomen, head unclipped, haute couture portrait scale) */}
          <picture className="h-full flex items-end justify-center">
            <source srcSet="/images/hero_saree_model_cutout.webp" type="image/webp" />
            <img
              src="/images/hero_saree_model_cutout.png"
              alt="Vastra Abharana Royal Mysore Silk Saree Model"
              className="h-full w-auto max-h-full object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] select-none transition-transform duration-300"
              fetchPriority="high"
              decoding="sync"
            />
          </picture>

          {/* ── LAYER 3: MINIMAL EDITORIAL CTA BUTTON (GUARANTEED SINGLE LINE, NO WRAPPING) ── */}
          <div className="absolute bottom-4 sm:bottom-auto sm:top-[58%] left-1/2 -translate-x-1/2 sm:-translate-y-1/2 z-30 pointer-events-auto flex items-center justify-center whitespace-nowrap">
            <a
              href="#collections"
              className="inline-flex flex-row flex-nowrap items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-[2px] bg-neutral-950/90 hover:bg-orange-600 text-white font-sans font-bold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 border border-white/50 hover:border-orange-400 shadow-[0_14px_32px_rgba(0,0,0,0.85)] hover:scale-105 active:scale-95 whitespace-nowrap select-none group shrink-0"
            >
              <span className="whitespace-nowrap tracking-[0.16em] text-white font-sans font-bold">SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
          </div>
        </div>

        {/* ── BOTTOM VIGNETTE: SOFT SEAMLESS BLEND AT BOTTOM EDGE ── */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0d0604] to-transparent z-[25] pointer-events-none" />

        {/* ── LAYER 4: 4 EDITORIAL CARDS (MINIMUM HAIRLINE BORDER, SHARP CORNERS, CLEAN SANS) ── */}
        
        {/* Card 1: Top Left (-5deg tilt) - Mysore Gold Zari Saree */}
        <div
          ref={card1Ref}
          className="hidden lg:block absolute top-8 left-3 lg:left-8 z-15 will-change-transform pointer-events-auto"
          style={{ transform: 'rotate(-5deg)' }}
        >
          <a
            href="#collections"
            className="block w-44 sm:w-50 lg:w-54 aspect-[3/4] bg-neutral-900 rounded-[2px] shadow-[0_18px_40px_rgba(0,0,0,0.6)] border border-white/15 hover:border-orange-500 hover:scale-105 hover:rotate-0 transition-all duration-400 group overflow-hidden"
          >
            <div className="w-full h-full relative">
              <picture>
                <source srcSet="/images/models/saris_banner.webp" type="image/webp" />
                <img
                  src="/images/models/saris_banner.jpg"
                  alt="Mysore Gold Saree"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  loading="eager"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 pt-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-white">MYSORE GOLD SILK</p>
                  <p className="text-[10px] font-sans text-white/80 font-medium">Handwoven Zari</p>
                </div>
                <span className="text-[11px] font-sans font-bold text-white bg-white/10 px-2 py-0.5 rounded-sm border border-white/20">₹3,850</span>
              </div>
            </div>
          </a>
        </div>

        {/* Card 2: Bottom Left (+4deg tilt) - Bridal Kanjeevaram Saree */}
        <div
          ref={card2Ref}
          className="hidden md:block absolute bottom-12 left-4 lg:left-12 z-26 will-change-transform pointer-events-auto"
          style={{ transform: 'rotate(4deg)' }}
        >
          <a
            href="#collections"
            className="block w-40 sm:w-46 lg:w-50 aspect-[3/4] bg-neutral-900 rounded-[2px] shadow-[0_18px_40px_rgba(0,0,0,0.6)] border border-white/15 hover:border-orange-500 hover:scale-105 hover:rotate-0 transition-all duration-400 group overflow-hidden"
          >
            <div className="w-full h-full relative">
              <picture>
                <source srcSet="/images/models/model_saree_maroon.webp" type="image/webp" />
                <img
                  src="/images/models/model_saree_maroon.jpg"
                  alt="Bridal Kanjeevaram"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 pt-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-white">KANJEEVARAM</p>
                  <p className="text-[10px] font-sans text-white/80 font-medium">Pure Mulberry Silk</p>
                </div>
                <span className="text-[11px] font-sans font-bold text-white bg-white/10 px-2 py-0.5 rounded-sm border border-white/20">₹6,200</span>
              </div>
            </div>
          </a>
        </div>

        {/* Card 3: Top Right (+6deg tilt) - Royal 22K Gold Temple Jewelry */}
        <div
          ref={card3Ref}
          className="hidden lg:block absolute top-10 right-3 lg:right-8 z-15 will-change-transform pointer-events-auto"
          style={{ transform: 'rotate(6deg)' }}
        >
          <a
            href="#collections"
            className="block w-44 sm:w-50 lg:w-54 aspect-[3/4] bg-neutral-900 rounded-[2px] shadow-[0_18px_40px_rgba(0,0,0,0.6)] border border-white/15 hover:border-orange-500 hover:scale-105 hover:rotate-0 transition-all duration-400 group overflow-hidden"
          >
            <div className="w-full h-full relative">
              <picture>
                <source srcSet="/images/models/model_jewelry_detail.webp" type="image/webp" />
                <img
                  src="/images/models/model_jewelry_detail.jpg"
                  alt="Royal Temple Jewelry"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  loading="eager"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 pt-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-white">TEMPLE JEWELRY</p>
                  <p className="text-[10px] font-sans text-white/80 font-medium">22K Gold Plated</p>
                </div>
                <span className="text-[11px] font-sans font-bold text-white bg-white/10 px-2 py-0.5 rounded-sm border border-white/20">₹2,450</span>
              </div>
            </div>
          </a>
        </div>

        {/* Card 4: Bottom Right (-4deg tilt) - Emerald Raw Silk Saree */}
        <div
          ref={card4Ref}
          className="hidden md:block absolute bottom-12 right-4 lg:right-12 z-26 will-change-transform pointer-events-auto"
          style={{ transform: 'rotate(-4deg)' }}
        >
          <a
            href="#collections"
            className="block w-40 sm:w-46 lg:w-50 aspect-[3/4] bg-neutral-900 rounded-[2px] shadow-[0_18px_40px_rgba(0,0,0,0.6)] border border-white/15 hover:border-orange-500 hover:scale-105 hover:rotate-0 transition-all duration-400 group overflow-hidden"
          >
            <div className="w-full h-full relative">
              <picture>
                <source srcSet="/images/models/hero_model_green.webp" type="image/webp" />
                <img
                  src="/images/models/hero_model_green.jpg"
                  alt="Emerald Green Raw Silk Saree"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 pt-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-white">EMERALD RAW SILK</p>
                  <p className="text-[10px] font-sans text-white/80 font-medium">Palace Arch Edition</p>
                </div>
                <span className="text-[11px] font-sans font-bold text-white bg-white/10 px-2 py-0.5 rounded-sm border border-white/20">₹4,850</span>
              </div>
            </div>
          </a>
        </div>

      </div>

    </section>
  );
};
