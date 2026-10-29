import React, { useState, useEffect, useRef } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { BentoGrid } from './components/BentoGrid';
import { SpringShowcase } from './components/SpringShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { StatsCounter } from './components/StatsCounter';
import { LookbookGrid } from './components/LookbookGrid';
import { WeldedArchive2026 } from './components/WeldedArchive2026';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { MobileBottomBar } from './components/MobileBottomBar';

export function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const heroInnerRef = useRef(null);

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // High-performance direct GPU scroll transformation (ZERO React re-renders on scroll for DDR4 zero lag)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroInnerRef.current) {
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight || 800;
            const progress = Math.min(1, Math.max(0, scrollY / (windowHeight * 0.85)));

            const scale = 1 - progress * 0.10;
            const opacity = 1 - progress * 0.20;
            const radius = progress * 28;

            heroInnerRef.current.style.transform = `scale(${scale})`;
            heroInnerRef.current.style.opacity = opacity;
            heroInnerRef.current.style.borderRadius = `${radius}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#ffffff] text-[#111111] relative selection:bg-[#a04508] selection:text-white">
        
        {/* Clean Sticky Header */}
        <Navbar />

        {/* ── CINEMATIC HERO & ARTISAN COLLECTIONS SLIDE-UP WRAPPER ── */}
        <div className="relative">
          
          {/* STICKY HERO: Pinned at top-0, scales down as user scrolls */}
          <div className="sticky top-0 h-screen w-full overflow-hidden z-10 bg-[#0d0604]">
            <div
              ref={heroInnerRef}
              className="w-full h-full will-change-transform flex items-center justify-center overflow-hidden"
              style={{
                transformOrigin: 'center center',
                transition: 'transform 0.06s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.06s ease-out, border-radius 0.06s ease-out',
              }}
            >
              <Hero3D />
            </div>
          </div>

          {/* ARTISAN COLLECTIONS: Layers directly OVER the recessed Hero screen */}
          <div
            id="collections-layer"
            className="relative z-20 bg-white rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-30px_70px_rgba(0,0,0,0.65)] border-t border-orange-500/10 overflow-hidden"
          >
            <BentoGrid onSelectCategory={handleSelectCategory} />
          </div>

        </div>

        {/* 5-Column Product Grid & Filter Tabs */}
        <ProductCatalog activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {/* 3-Column Spring Collection Editorial (User's Favorite Section) */}
        <SpringShowcase />

        {/* Animated Numerical Counters */}
        <StatsCounter />

        {/* Instagram Lookbook Grid & @vastraabharana Tag */}
        <LookbookGrid />

        {/* Sculpted Welded 2026 Archival Monument Section */}
        <WeldedArchive2026 />

        {/* Clean White Verified Footer */}
        <Footer />

        {/* Drawers, Modals & Urgency Engine */}
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <SearchModal />

        {/* Mobile Sticky App Bar */}
        <MobileBottomBar onSelectCategory={handleSelectCategory} />

      </div>
    </StoreProvider>
  );
}

export default App;
