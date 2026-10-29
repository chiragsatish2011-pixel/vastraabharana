import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useStore, currencies } from '../context/StoreContext';

export const Navbar = () => {
  const {
    cartCount,
    wishlist,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const currencyRef = useRef(null);

  // Compressible scroll listener with passive event for DDR4 zero-lag performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      
      {/* ── COMPRESSIBLE FLOATING LUXURY CAPSULE / ISLAND ── */}
      <div
        className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'max-w-5xl mx-3 sm:mx-auto mt-2 sm:mt-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.60)]'
            : 'w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4.5 bg-gradient-to-b from-[#0d0604]/90 via-[#0d0604]/50 to-transparent border-b border-white/[0.06] backdrop-blur-[2px]'
        }`}
      >
        <div className="relative flex items-center justify-between select-none min-h-[42px] sm:min-h-[46px]">
          
          {/* ── LEFT: DESKTOP NAVIGATION LINKS & MOBILE MENU TOGGLE ── */}
          <div className="flex items-center gap-1 sm:gap-2 z-10">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/90 hover:text-orange-400 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <nav className="hidden lg:flex items-center gap-6 text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-neutral-300">
              <a
                href="#collections"
                className="hover:text-white transition-colors relative group py-1"
              >
                <span>Collections</span>
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
              <a
                href="#sarees"
                className="hover:text-white transition-colors relative group py-1"
              >
                <span>Mysore Silk</span>
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
              <a
                href="#salwars"
                className="hover:text-white transition-colors relative group py-1"
              >
                <span>Suits</span>
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
              <a
                href="#combos"
                className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1.5 py-1"
              >
                <span>Combos</span>
                <span className="text-[9px] bg-orange-600 text-white px-1.5 py-0.2 rounded-sm font-black tracking-normal shadow-sm">
                  HOT
                </span>
              </a>
            </nav>
          </div>

          {/* ── CENTER: HIGH-FASHION VASTRA ABHARANA LOGO (PERFECT GEOMETRIC DEAD CENTER OF PAGE) ── */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-auto z-20 whitespace-nowrap max-w-[calc(100%-120px)] sm:max-w-none">
            <a href="#" className="group flex flex-col items-center">
              <span
                className={`text-white group-hover:text-orange-400 transition-all duration-300 leading-none ${
                  isScrolled
                    ? 'text-lg sm:text-xl lg:text-2xl'
                    : 'text-[21px] sm:text-2xl lg:text-[32px]'
                }`}
                style={{
                  fontFamily: "'Alex Brush', 'Playfair Display', cursive, serif",
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)'
                }}
              >
                Vastra Abharana
              </span>
              <span
                className={`transition-all duration-300 uppercase text-orange-400/90 font-sans font-bold ${
                  isScrolled
                    ? 'text-[6px] sm:text-[6.5px] tracking-[0.22em] opacity-80 mt-0.5'
                    : 'text-[6.5px] sm:text-[7.5px] tracking-[0.28em] opacity-100 mt-0.5 sm:mt-1'
                }`}
              >
                Bengaluru • Estd 2018
              </span>
            </a>
          </div>

          {/* ── RIGHT: LUXURY ACTION PILLS (CURRENCY, SEARCH, WISHLIST, CART) ── */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 z-10 ml-auto">
            
            {/* Currency Pill Selector (Desktop only; on mobile/tablet accessible in menu & footer) */}
            <div className="relative hidden lg:block" ref={currencyRef}>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className={`flex items-center gap-1 text-[11px] font-sans font-bold text-neutral-300 hover:text-white px-2.5 py-1 rounded-full border border-white/15 hover:border-orange-400/50 transition-all ${
                  isScrolled ? 'bg-white/5' : 'bg-black/30'
                }`}
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-neutral-950 text-white rounded-xl shadow-2xl p-1.5 z-50 border border-white/20 font-sans backdrop-blur-xl animate-in fade-in duration-150">
                  {Object.entries(currencies).map(([code, cur]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                        currency === code ? 'bg-orange-600 text-white font-bold' : 'text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{code}</span>
                      <span className="opacity-75">{cur.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chic Minimal Search Button (Desktop only; on Mobile & Tablet accessible via bottom navigation bar) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Chic Minimal Wishlist Button (Desktop only; on Mobile & Tablet accessible via bottom navigation bar) */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="hidden lg:flex p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-orange-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* High-End Compressible Luxury Cart Capsule (Visible & Perfectly Proportioned Across ALL screens) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-orange-400/40 transition-all duration-300 shadow-md shadow-orange-600/30 active:scale-95 group shrink-0"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-wider">
                {cartCount}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* ── MOBILE DRAWER NAVIGATION MENU ── */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden fixed inset-x-0 top-16 bg-neutral-950/95 backdrop-blur-2xl border-b border-white/15 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-sm font-sans font-bold uppercase tracking-[0.14em] text-neutral-200">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/10 hover:text-orange-400 flex items-center justify-between"
            >
              <span>Home</span>
              <Sparkles className="w-4 h-4 text-orange-400" />
            </a>
            <a
              href="#collections"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/10 hover:text-orange-400"
            >
              Artisan Collections
            </a>
            <a
              href="#sarees"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/10 hover:text-orange-400"
            >
              Mysore Silk Sarees
            </a>
            <a
              href="#salwars"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/10 hover:text-orange-400"
            >
              Salwar Suits
            </a>
            <a
              href="#combos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 flex items-center justify-between text-orange-400"
            >
              <span>Combos & Offers</span>
              <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded-full font-bold">HOT</span>
            </a>
            
            {/* Mobile Currency Selector */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Currency</span>
              <div className="flex gap-2">
                {Object.keys(currencies).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      currency === code ? 'bg-orange-600 text-white' : 'bg-white/10 text-neutral-300'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
};