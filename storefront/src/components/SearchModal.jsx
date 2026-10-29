import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import productsData from '../data/curated_products.json';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct, formatPrice } = useStore();
  const [query, setQuery] = useState('');

  const quickTags = ['Mysore Silk', 'Buy 3 at 1200', 'Aarvi Cotton', 'Designer Blouse', 'Temple Jewelry', 'Festive Saree'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return productsData.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.type.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-neutral-950/50 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      
      {/* Click Outside */}
      <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)} />

      {/* Search Container (Clean White) */}
      <div className="relative bg-white rounded-2xl border border-neutral-200/90 max-w-2xl w-full p-6 shadow-2xl z-10 space-y-4">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search across 1,993+ sarees, suits, blouses & jewelry..."
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 font-sans tracking-normal"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-3.5 p-1 text-neutral-400 hover:text-neutral-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-neutral-500 flex items-center gap-1 font-sans font-semibold text-xs tracking-normal">
            <Sparkles className="w-3 h-3 text-orange-600" /> Popular:
          </span>
          {quickTags.map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 font-sans font-medium text-xs tracking-normal transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="pt-2 border-t border-neutral-100 space-y-2 max-h-80 overflow-y-auto">
            {results.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  setQuickViewProduct(product);
                  setIsSearchOpen(false);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-14 object-cover rounded-md border border-neutral-100 shrink-0 bg-neutral-50"
                    onError={(e) => {
                      e.target.src = '/images/models/saris_banner.jpg';
                    }}
                  />
                  <div>
                    <h5 className="font-sans font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-orange-600 transition-colors tracking-tight line-clamp-1">
                      {product.title}
                    </h5>
                    <p className="text-[11px] text-neutral-500 font-sans tracking-normal">{product.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-sans font-extrabold text-xs sm:text-sm text-neutral-950 tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="text-center py-8 text-neutral-500 text-xs font-sans tracking-normal">
            No styles found matching &quot;{query}&quot;. Try Mysore silk, salwar, or combo.
          </div>
        )}

      </div>
    </div>
  );
};
