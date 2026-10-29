import React from 'react';
import { Home, Layers, Search, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomBar = ({ onSelectCategory }) => {
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen } = useStore();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto glass-panel rounded-full border border-white/20 p-2 flex items-center justify-around shadow-2xl pointer-events-auto backdrop-blur-xl">
        
        {/* Home */}
        <a
          href="#"
          className="p-2 text-[#d5c3b3] hover:text-templeGold flex flex-col items-center gap-0.5"
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-medium">Home</span>
        </a>

        {/* Collections */}
        <a
          href="#collections"
          className="p-2 text-[#d5c3b3] hover:text-templeGold flex flex-col items-center gap-0.5"
          aria-label="Collections"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[9px] font-medium">Explore</span>
        </a>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 text-[#d5c3b3] hover:text-templeGold flex flex-col items-center gap-0.5"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
          <span className="text-[9px] font-medium">Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="p-2 text-[#d5c3b3] hover:text-templeGold flex flex-col items-center gap-0.5 relative"
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-1 right-2 bg-terracotta-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              {wishlist.length}
            </span>
          )}
          <span className="text-[9px] font-medium">Saved</span>
        </button>

        {/* Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="p-2 terracotta-gradient-bg text-white rounded-full flex items-center justify-center relative shadow-lg"
          aria-label="Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-templeGold text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </div>
  );
};
