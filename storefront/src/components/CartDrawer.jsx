import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles, Plus, Minus, Lock, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotalINR, formatPrice } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [orderNote, setOrderNote] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const progressPercent = Math.min(100, Math.round((cartTotalINR / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotalINR);

  const applyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'VA10') {
      setPromoDiscount(0.10);
      setPromoSuccess('10% Festive Privilege Applied');
      setPromoError('');
    } else if (code === 'COMBO' || code === 'FESTIVE') {
      setPromoDiscount(0.15);
      setPromoSuccess('15% Weaver Privilege Applied');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try VA10 for 10% off or COMBO for 15% off.');
      setPromoSuccess('');
    }
  };

  const giftWrapCost = includeGiftWrap ? 149 : 0;
  const discountAmount = cartTotalINR * promoDiscount;
  const finalTotal = Math.max(0, cartTotalINR - discountAmount + giftWrapCost);
  const totalItemCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white text-neutral-900 select-none animate-in fade-in duration-200">
      
      {/* Subtle Warm Brand Aura (Crisp white majority with soft sunset glow) */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Fixed Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-6 sm:px-12 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <ShoppingBag className="w-5 h-5 text-orange-600" />
          <span className="font-sans font-extrabold text-sm sm:text-base tracking-normal uppercase text-neutral-950">
            Vastra Abharana
          </span>
          <span className="text-neutral-300 font-bold">•</span>
          <span className="text-xs font-sans font-medium text-neutral-500 tracking-normal">
            {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        <button
          onClick={() => setIsCartOpen(false)}
          className="flex items-center gap-1.5 text-xs font-sans font-semibold text-neutral-700 hover:text-orange-600 px-3.5 py-1.5 rounded-full border border-neutral-200 hover:border-orange-500/40 transition-all bg-neutral-50/80 tracking-normal"
        >
          <span>Continue Shopping</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Cart Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-10">
        
        {/* Elite Minimalist Title with Clean Low Tracking */}
        <div className="mb-6">
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-tight">
            Your Shopping Bag
          </h1>
        </div>

        {/* Free Express Delivery Progress Indicator */}
        <div className="bg-[#fafafb] p-4 sm:p-5 rounded-xl border border-neutral-200/80 mb-8 max-w-3xl shadow-sm">
          <div className="flex items-center justify-between text-xs sm:text-sm font-sans mb-2.5">
            {remainingForFreeShipping > 0 ? (
              <span className="text-neutral-700 font-normal tracking-normal">
                Add <strong className="text-neutral-950 font-bold">{formatPrice(remainingForFreeShipping)}</strong> more to unlock <span className="text-orange-600 font-bold">Free Express Delivery</span> across India
              </span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5 tracking-normal">
                <Sparkles className="w-4 h-4 text-amber-500" /> Free Express Delivery Unlocked!
              </span>
            )}
            <span className="text-orange-600 font-sans font-bold tracking-normal">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-sans font-bold text-2xl tracking-tight text-neutral-900 mb-2">
              Your bag is empty
            </h3>
            <p className="text-sm text-neutral-500 font-sans tracking-normal mb-6">
              Explore our handcrafted Mysore silks, salwar suits, and temple jewelry.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-950 hover:bg-orange-600 text-white font-sans font-bold text-sm tracking-normal rounded-lg transition-all shadow-md"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* 2-Column Shopify Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left 7 Columns: Product Rows & Customizations */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3.5">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.variantId}`}
                    className="flex gap-4 sm:gap-6 items-start bg-white p-4 sm:p-5 rounded-xl border border-neutral-200/90 shadow-sm hover:border-neutral-300 transition-all"
                  >
                    {/* Product Photo */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 sm:w-24 aspect-[3/4] object-cover rounded-md border border-neutral-100 bg-neutral-50 shrink-0"
                      onError={(e) => {
                        e.target.src = '/images/models/saris_banner.jpg';
                      }}
                    />

                    {/* Details in Clean Google Sans with Low Tracking */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-950 leading-snug tracking-tight">
                            {item.title}
                          </h4>
                          {item.variantTitle && item.variantTitle !== 'Default Title' && (
                            <p className="text-xs text-neutral-500 font-sans tracking-normal mt-0.5">
                              {item.variantTitle}
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right shrink-0">
                          <p className="font-sans font-extrabold text-sm sm:text-base text-neutral-950 tracking-tight">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[11px] text-neutral-400 font-sans font-medium">
                              {formatPrice(item.price)} each
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
                        <div className="flex items-center border border-neutral-200 rounded-md bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                            className="p-1 sm:p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-sans font-bold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                            className="p-1 sm:p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.variantId)}
                          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-rose-600 transition-colors font-sans font-medium tracking-normal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Add-on: Royal Gift Packaging with Silk Ribbon */}
              <div className="bg-[#fffdfa] p-4 rounded-xl border border-orange-500/20 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="giftWrap"
                    checked={includeGiftWrap}
                    onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                    className="w-4 h-4 rounded-sm accent-orange-600 cursor-pointer"
                  />
                  <label htmlFor="giftWrap" className="cursor-pointer text-xs sm:text-sm font-sans text-neutral-800">
                    <span className="font-bold text-neutral-950 block tracking-normal">Royal Saffron Gift Packaging with Silk Ribbon</span>
                    <span className="text-[11px] text-neutral-500 tracking-normal">Handcrafted gift box, personalized calligraphy note & wax seal (+₹149)</span>
                  </label>
                </div>
                <span className="text-xs font-sans font-bold text-neutral-900 shrink-0">₹149</span>
              </div>

              {/* Special Weaving / Stitching Notes */}
              <div>
                <label className="block text-xs font-sans font-semibold text-neutral-700 tracking-normal mb-1.5">
                  Special Weaving / Fall & Pico / Stitching Instructions
                </label>
                <textarea
                  rows="2"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="e.g. Free fall & edging requested, custom blouse stitching measurement notes..."
                  className="w-full bg-[#fafafb] border border-neutral-200 rounded-lg p-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 font-sans tracking-normal"
                />
              </div>

            </div>

            {/* Right 5 Columns: Order Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#fafafb] p-6 sm:p-7 rounded-2xl border border-neutral-200/90 sticky top-24 space-y-6 shadow-sm">
                
                <h3 className="font-sans font-extrabold text-base tracking-tight text-neutral-950 pb-3 border-b border-neutral-200/70">
                  Order Summary
                </h3>

                {/* Promo Code Input */}
                <form onSubmit={applyPromo} className="space-y-2">
                  <label className="block text-xs font-sans font-semibold text-neutral-600 tracking-normal">
                    Discount Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try 'VA10' or 'COMBO'"
                        className="w-full bg-white border border-neutral-200 rounded-lg pl-9 pr-3 py-2 text-xs font-sans font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 tracking-normal"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-950 hover:bg-orange-600 text-white font-sans text-xs font-bold rounded-lg transition-colors tracking-normal"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[11px] text-rose-600 font-sans font-medium">{promoError}</p>}
                  {promoSuccess && <p className="text-[11px] text-emerald-600 font-sans font-medium flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {promoSuccess}</p>}
                </form>

                {/* Calculation Breakdown */}
                <div className="space-y-3 pt-3 border-t border-neutral-200/70 text-xs sm:text-sm font-sans text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-sans font-bold text-neutral-900">{formatPrice(cartTotalINR)}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Promo Discount ({Math.round(promoDiscount * 100)}%)</span>
                      <span className="font-sans font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  {includeGiftWrap && (
                    <div className="flex justify-between text-neutral-600">
                      <span>Royal Gift Packaging</span>
                      <span className="font-sans font-bold text-neutral-900">₹149</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured Express Shipping</span>
                    <span className="font-sans font-bold text-emerald-600">
                      {remainingForFreeShipping === 0 ? 'FREE' : formatPrice(99)}
                    </span>
                  </div>

                  {/* Total Amount */}
                  <div className="flex justify-between items-baseline pt-4 border-t border-neutral-200/80">
                    <span className="font-sans font-extrabold text-sm sm:text-base text-neutral-950 tracking-tight">Total Amount</span>
                    <span className="font-sans font-black text-xl sm:text-2xl text-neutral-950 tracking-tight">{formatPrice(finalTotal)}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans tracking-normal">
                    Includes all GST & Weaver Handloom Cess. Free door delivery across India.
                  </p>
                </div>

                {/* Primary Checkout Button */}
                <button
                  onClick={() => alert(`Redirecting to Shopify Secure Checkout for ${formatPrice(finalTotal)} ...`)}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-sans font-bold text-sm tracking-normal rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 active:scale-98"
                >
                  <Lock className="w-4 h-4 text-white" />
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Supported Payment Badges */}
                <div className="pt-1 text-center">
                  <p className="text-[11px] font-sans text-neutral-400 font-medium tracking-normal mb-2">
                    Guaranteed Safe & Secure Checkout
                  </p>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap text-[10px] font-sans font-medium text-neutral-600">
                    <span className="px-2 py-0.5 bg-white rounded border border-neutral-200/80">UPI / GPay</span>
                    <span className="px-2 py-0.5 bg-white rounded border border-neutral-200/80">Credit Cards</span>
                    <span className="px-2 py-0.5 bg-white rounded border border-neutral-200/80">Net Banking</span>
                    <span className="px-2 py-0.5 bg-white rounded border border-neutral-200/80">Cash on Delivery</span>
                  </div>
                </div>

                {/* Trust Guarantee Box */}
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/60 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] font-sans text-emerald-900 leading-snug tracking-normal">
                    <strong className="block font-bold">100% Genuine Silk Mark Certified</strong>
                    Direct from Karnataka master weavers with 7-day exchange guarantee.
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
