import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, formatPrice, setQuickViewProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = wishlist.some(item => item.id === product.id);

  const getOptimizedUrl = (url, width = 420) => {
    if (!url) return '/images/models/saris_banner.webp';
    if (url.includes('cdn.shopify.com')) {
      if (url.includes('width=')) {
        return url.replace(/width=\d+/, `width=${width}`);
      }
      const sep = url.includes('?') ? '&' : '?';
      return `${url}${sep}width=${width}&crop=center`;
    }
    return url;
  };

  const handleOpenProduct = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      onDoubleClick={handleOpenProduct}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 select-none cursor-pointer"
      title="Double click to open product"
    >
      {/* ── PRODUCT IMAGE MEDIA CONTAINER (MATCHING VIDEO FRAME 24 & 26) ── */}
      <div
        onClick={handleOpenProduct}
        className="relative aspect-[3/4] overflow-hidden bg-neutral-100/70 rounded-[2px]"
      >
        <img
          src={getOptimizedUrl(product.image, 420)}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = '/images/models/saris_banner.webp';
          }}
        />

        {/* Top Badges (Matching Video Frame 24: "NEW" pill) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-[1px] bg-neutral-950 text-white">
            NEW
          </span>
          {product.discountPercent > 0 && (
            <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-[1px] bg-orange-600 text-white">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon (Matching Video Frame 24 Top-Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm transition-all active:scale-90 ${
            isSaved ? 'text-orange-600' : 'text-neutral-400 hover:text-black'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-orange-600 text-orange-600' : ''}`} />
        </button>

        {/* "Select Options" Button on Hover (Matching Video Frame 26 Bottom of Image) */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-20 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          <button
            onClick={handleOpenProduct}
            className="w-full py-2 px-3 rounded-[1px] bg-neutral-950 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-xl hover:bg-orange-600 transition-colors flex items-center justify-center"
          >
            <span>Select Options</span>
          </button>
        </div>
      </div>

      {/* ── PRODUCT METADATA (MATCHING VIDEO FRAME 24 & 28) ── */}
      <div className="pt-2.5 pb-1 space-y-0.5 bg-white">
        <h4
          onClick={handleOpenProduct}
          className="text-xs sm:text-[13px] font-sans font-medium text-neutral-800 hover:text-orange-600 transition-colors line-clamp-1"
        >
          {product.title}
        </h4>

        {/* Price Row */}
        <div className="flex items-baseline gap-2">
          <span className="text-xs sm:text-[13px] font-sans font-bold text-neutral-950">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-[11px] text-neutral-400 line-through font-sans">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Subtle Variant Color Dot (Matching Video Frame 28) */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="w-2.5 h-2.5 rounded-full border border-neutral-300 bg-neutral-800 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full border border-neutral-300 bg-amber-600 inline-block" />
        </div>
      </div>
    </div>
  );
};