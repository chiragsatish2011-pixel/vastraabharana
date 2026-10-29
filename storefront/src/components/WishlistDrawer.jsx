import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart, formatPrice } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 p-6 flex flex-col justify-between shadow-2xl select-none">
          
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-orange-600 fill-orange-600" />
                <h3 className="text-lg font-sans font-bold text-neutral-950 tracking-tight">Saved Styles</h3>
                <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full font-sans">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-grow overflow-y-auto py-4 space-y-3 pr-1">
            {wishlist.length > 0 ? (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-neutral-200/90 bg-[#fafafb] flex gap-3.5 items-center justify-between shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 rounded-md object-cover object-top border border-neutral-200/80 shrink-0 bg-white"
                    onError={(e) => {
                      e.target.src = '/images/models/saris_banner.jpg';
                    }}
                  />

                  <div className="flex-grow min-w-0 space-y-1">
                    <h4 className="text-xs font-sans font-bold text-neutral-900 truncate tracking-tight">{item.title}</h4>
                    <p className="text-[11px] text-neutral-500 font-sans tracking-normal">{item.type}</p>
                    <span className="text-xs font-sans font-extrabold text-neutral-950 tracking-tight">{formatPrice(item.price)}</span>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => addToCart(item)}
                      className="p-2 rounded-lg bg-neutral-950 hover:bg-orange-600 text-white transition-colors"
                      title="Move to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-400 hover:text-rose-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <Heart className="w-12 h-12 text-neutral-300 mb-3 stroke-[1.2]" />
                <h4 className="font-sans font-bold text-base text-neutral-900 tracking-tight mb-1">Your wishlist is empty</h4>
                <p className="text-xs text-neutral-500 font-sans tracking-normal max-w-xs mb-4">
                  Save your favorite sarees, suits, and jewelry to review them later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2.5 bg-neutral-950 text-white text-xs font-sans font-bold rounded-lg tracking-normal hover:bg-orange-600 transition-colors"
                >
                  Discover Collections
                </button>
              </div>
            )}
          </div>

          {wishlist.length > 0 && (
            <div className="pt-4 border-t border-neutral-200">
              <button
                onClick={() => {
                  wishlist.forEach(item => addToCart(item));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 bg-neutral-950 hover:bg-orange-600 text-white font-sans font-bold text-xs uppercase tracking-normal rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Add All to Bag</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
