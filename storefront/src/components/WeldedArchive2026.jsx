import React, { useEffect, useRef, useState } from 'react';
import { FallingPetals } from './FallingPetals';
import { Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export const WeldedArchive2026 = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const topShutterRef = useRef(null);
  const bottomShutterRef = useRef(null);
  const contentRef = useRef(null);
  const seamRef = useRef(null);

  // Unlocked state: Animation only triggers once per browser session refresh
  const hasCompletedRef = useRef(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Cinematic Pinned Scroll-Triggered Animation with Luxury Speed Ramps & Once-per-refresh lock
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // If already unlocked once this session, keep curtains permanently open
      if (hasCompletedRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const winHeight = window.innerHeight || 800;

          // Track length: total scroll distance while pinned (compact cinemascope track)
          const totalScroll = rect.height - winHeight;
          if (totalScroll <= 0) return;

          // Compute raw progress (0 when pinned at top, 1 when track ends)
          const scrolled = -rect.top;
          const rawProgress = Math.min(1, Math.max(0, scrolled / totalScroll));

          // Luxury Quintic Speed Ramp: Soft start, accelerated sweep, feathered deceleration
          const ease = rawProgress < 0.5
            ? 4 * rawProgress * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

          // White curtain panels part vertically (0% -> 103%)
          const translateY = ease * 103;
          const opacity = Math.max(0, 1 - ease * 1.6);

          if (topShutterRef.current) {
            topShutterRef.current.style.transform = `translate3d(0, -${translateY}%, 0)`;
          }
          if (bottomShutterRef.current) {
            bottomShutterRef.current.style.transform = `translate3d(0, ${translateY}%, 0)`;
          }

          // Center golden seam emblem fades out cleanly
          if (seamRef.current) {
            seamRef.current.style.opacity = `${opacity}`;
            seamRef.current.style.transform = `scale(${Math.max(0.7, 1 - ease * 0.3)})`;
            seamRef.current.style.pointerEvents = opacity <= 0.01 ? 'none' : 'auto';
          }

          // Revealed 2026 monument scales subtly from 0.94 -> 1.0 with soft brilliance ramp
          if (contentRef.current) {
            const scale = 0.94 + ease * 0.06;
            const contentOpacity = 0.25 + ease * 0.75;
            contentRef.current.style.transform = `scale(${scale})`;
            contentRef.current.style.opacity = `${contentOpacity}`;
          }

          // Once fully parted (> 92% scroll), lock curtains permanently open for this session
          if (rawProgress >= 0.92 && !hasCompletedRef.current) {
            hasCompletedRef.current = true;
            setIsUnlocked(true);
            if (topShutterRef.current) topShutterRef.current.style.transform = 'translate3d(0, -105%, 0)';
            if (bottomShutterRef.current) bottomShutterRef.current.style.transform = 'translate3d(0, 105%, 0)';
            if (seamRef.current) seamRef.current.style.display = 'none';
            if (contentRef.current) {
              contentRef.current.style.transform = 'scale(1)';
              contentRef.current.style.opacity = '1';
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  return (
    <section
      id="archive2026"
      ref={containerRef}
      className={`relative w-full ${isUnlocked ? 'h-auto py-10 sm:py-14' : 'h-[110vh] sm:h-[115vh]'} bg-white select-none border-t border-orange-500/15`}
    >
      {/* ── CINEMASCOPE STAGE (COMPACT HEIGHT, LETTERBOX PROPORTION) ── */}
      <div
        ref={stickyRef}
        className={`${isUnlocked ? 'relative' : 'sticky top-0'} h-[520px] sm:h-[580px] w-full overflow-hidden flex items-center justify-center bg-[#0a0402] shadow-[0_20px_60px_rgba(0,0,0,0.5)]`}
      >

        {/* ── CINEMATIC WHITE SHUTTER RECTANGLES (PARTING VERTICALLY UPON SCROLL) ── */}
        {/* Top White Shutter Panel (Pristine White #ffffff matching website background) */}
        <div
          ref={topShutterRef}
          className={`absolute top-0 inset-x-0 h-1/2 bg-white z-30 pointer-events-none will-change-transform border-b border-amber-300/40 shadow-[0_12px_30px_rgba(245,158,11,0.06)] ${isUnlocked ? 'hidden' : ''}`}
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {/* Subtle Golden Horizon Seam Accent */}
          <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.7)]" />
        </div>

        {/* Bottom White Shutter Panel (Pristine White #ffffff matching website background) */}
        <div
          ref={bottomShutterRef}
          className={`absolute bottom-0 inset-x-0 h-1/2 bg-white z-30 pointer-events-none will-change-transform border-t border-amber-300/40 shadow-[0_-12px_30px_rgba(245,158,11,0.06)] ${isUnlocked ? 'hidden' : ''}`}
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {/* Subtle Golden Horizon Seam Accent */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.7)]" />
        </div>

        {/* Center Golden Seam Emblem (Visible when closed, fades smoothly upon scroll) */}
        <div
          ref={seamRef}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-35 pointer-events-none flex flex-col items-center justify-center transition-opacity duration-200 ${isUnlocked ? 'hidden' : ''}`}
        >
          <div className="px-4 py-1.5 rounded-full bg-white/95 border border-amber-400/60 shadow-[0_4px_16px_rgba(245,158,11,0.25)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.22em] uppercase text-neutral-800">
              SCROLL TO UNLOCK 2026 ARCHIVE
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          </div>
        </div>

        {/* ── REVEALED FESTIVE ARCHIVE SANCTUM (CINEMASCOPE ATMOSPHERE) ── */}
        <div
          ref={contentRef}
          className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center z-20 will-change-transform py-2 sm:py-4"
          style={{ transform: isUnlocked ? 'scale(1)' : 'scale(0.94)', opacity: isUnlocked ? 1 : 0.25 }}
        >

          {/* Warm Radiant Molten Amber & Smoked Charcoal Spotlight Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(234,88,12,0.26)_0%,rgba(217,119,6,0.12)_35%,rgba(10,4,2,0.98)_75%)] pointer-events-none -z-10" />

          {/* Subtle Architectural Hairline Grid */}
          <div className="absolute inset-0 max-w-7xl mx-auto grid grid-cols-4 pointer-events-none divide-x divide-white/[0.04]" />

          {/* Falling Festive Petals Drifting Over the 2026 Monument */}
          <FallingPetals />

          {/* ── HAUTE COUTURE "HAPPY DIWALI" CURSIVE SCRIPT (COMPACT, LOWERED CLOSE ABOVE 2026) ── */}
          <div className="relative z-10 w-full flex items-center justify-center mt-3 sm:mt-5 mb-0 overflow-visible">
            <h3
              className="italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-wide select-none drop-shadow-[0_8px_30px_rgba(234,88,12,0.50)] overflow-visible inline-block text-center"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 35%, #fde047 70%, #d97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Playfair Display', 'Brush Script MT', cursive, serif",
                lineHeight: 1.25,
                paddingTop: '0.1em',
                paddingBottom: '0.15em'
              }}
            >
              Happy Diwali
            </h3>
          </div>

          {/* ── MASSIVE HIGH-IMPACT 2026 MONUMENT (IMPACT FONT, PURE WHITE RADIANCE, REDUCED GRADIENT) ── */}
          <div className="relative my-0 flex items-center justify-center w-full">
            
            {/* Radiant Halo behind 2026 */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/25 via-white/30 to-orange-500/25 blur-3xl rounded-full pointer-events-none transform scale-90" />

            {/* High-Impact 2026 Typography (Impact/Heavyweight Sans, More White, +2px Tracking, Clean Line Removed) */}
            <div className="relative flex items-center justify-center">
              <span
                className="text-7xl min-[390px]:text-8xl sm:text-[130px] md:text-[160px] lg:text-[185px] xl:text-[210px] leading-none select-none uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
                style={{
                  fontFamily: "Impact, 'Arial Black', sans-serif",
                  fontWeight: 900,
                  letterSpacing: '2px',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 62%, #FFFBEB 82%, #FDE68A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 8px 30px rgba(255,255,255,0.40))'
                }}
              >
                2026
              </span>
            </div>
          </div>

          {/* Archival Trust Statements (Crisp White & Amber on Cinemascope Stage) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 lg:gap-10 mt-2 pt-3 border-t border-white/10 w-full max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-300 font-sans font-semibold tracking-normal">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>100% Silk Mark Certified</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-300 font-sans font-semibold tracking-normal">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0" />
              <span>Direct Weaver Commerce</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-300 font-sans font-semibold tracking-normal">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span>Pure Gold Zari Weaves</span>
            </div>
          </div>

          {/* Final Catalog CTA Button */}
          <div className="mt-4 sm:mt-5">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-2 sm:py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-sans font-bold text-xs sm:text-sm tracking-normal uppercase rounded-lg transition-all shadow-[0_8px_25px_rgba(234,88,12,0.35)] hover:scale-105 active:scale-95"
            >
              <span>DISCOVER THE DIWALI 2026 COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
