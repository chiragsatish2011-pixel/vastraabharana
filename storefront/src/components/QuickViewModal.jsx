import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist, formatPrice } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isSaved = wishlist.some(item => item.id === quickViewProduct.id);
  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.image];

  const handleAdd = () => {
    addToCart(quickViewProduct, { title: selectedSize, price: quickViewProduct.price }, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click Outside */}
      <div className="absolute inset-0" onClick={() => setQuickViewProduct(null)} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 text-[#111111]">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 text-gray-600 hover:text-black hover:bg-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
            <img
              src={images[selectedImage] || quickViewProduct.image}
              alt={quickViewProduct.title}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.src = '/images/models/saree_lavender.jpg';
              }}
            />
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded bg-[#111111] text-white">
                {quickViewProduct.badge}
              </span>
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? 'border-black scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info & Actions */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-black text-xs">{quickViewProduct.rating} / 5.0</span>
              <span className="text-gray-400 text-xs">({quickViewProduct.reviewsCount} reviews)</span>
            </div>

            <h3 className="text-2xl font-sans font-extrabold tracking-wide uppercase text-black leading-tight">
              {quickViewProduct.title}
            </h3>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-black text-black">
                {formatPrice(quickViewProduct.price)}
              </span>
              {quickViewProduct.compareAtPrice > quickViewProduct.price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(quickViewProduct.compareAtPrice)}
                </span>
              )}
              {quickViewProduct.discountPercent > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-terracotta text-white">
                  -{quickViewProduct.discountPercent}% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
              {quickViewProduct.description}
            </p>

            {/* Size Selector */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Size:</span>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL', '2XL', '3XL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 uppercase">Quantity:</span>
              <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-black font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-black font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-grow flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-neutral-950 text-white font-sans font-bold tracking-widest uppercase text-sm hover:bg-orange-600 transition-colors shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • {formatPrice(quickViewProduct.price * quantity)}</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`p-3.5 rounded-full border border-gray-200 transition-all ${
                  isSaved ? 'text-brand-terracotta bg-red-50' : 'text-gray-500 hover:text-black hover:bg-gray-100'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-brand-terracotta' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-gray-500 text-center">
              <div className="flex items-center justify-center gap-1">
                <Truck className="w-3.5 h-3.5 text-black" />
                <span>Express Ship</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-black" />
                <span>5-Day Exchange</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-black" />
                <span>Verified GST</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
