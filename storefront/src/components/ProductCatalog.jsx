import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Search } from 'lucide-react';
import productsData from '../data/curated_products.json';

export const ProductCatalog = ({ activeCategory, setActiveCategory }) => {
  const [activeTab, setActiveTab] = useState('bestselling');
  const [searchQuery, setSearchQuery] = useState('');

  // Category Tabs Matching Reference Video Frame 24
  const tabs = [
    { id: 'bestselling', label: 'Bestselling' },
    { id: 'new-drop', label: 'NEW DROP' },
    { id: 'combo-1200', label: 'UNDER ₹1,500' },
    { id: 'mysore-silk', label: 'Mysore Silk' },
    { id: 'festive-combos', label: 'COMBOS' }
  ];

  const filteredProducts = useMemo(() => {
    return productsData.filter(p => {
      // Category / Tab filter
      let matchesTab = true;
      if (activeTab === 'new-drop') matchesTab = p.badge.includes('NEW');
      else if (activeTab === 'combo-1200') matchesTab = p.price <= 1500;
      else if (activeTab === 'mysore-silk') matchesTab = p.type.toLowerCase() === 'saree';
      else if (activeTab === 'festive-combos') matchesTab = p.title.toLowerCase().includes('combo') || p.title.toLowerCase().includes('buy 3');

      // Category override from parent Bento selection
      let matchesCat = true;
      if (activeCategory === 'saree') matchesCat = p.type.toLowerCase() === 'saree';
      else if (activeCategory === 'salwar') matchesCat = p.type.toLowerCase() === 'salwar';
      else if (activeCategory === 'blouse') matchesCat = p.type.toLowerCase() === 'blouse';
      else if (activeCategory === 'Accessories') matchesCat = p.type.toLowerCase().includes('access') || p.type.toLowerCase().includes('jewel');

      // Search Query
      const matchesSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesCat && matchesSearch;
    });
  }, [activeTab, activeCategory, searchQuery]);

  return (
    <section id="catalog" className="relative py-16 sm:py-24 bg-[#ffffff] select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── SECTION HEADING (MATCHING REFERENCE VIDEO FRAME 22 & 23) ── */}
        <div className="text-center mb-8 select-none">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black uppercase text-neutral-950 tracking-[0.05em] leading-none">
            FEATURED PRODUCTS
          </h2>
          {/* Subtle Faint Duplicate / Reflection Shadow as in Reference Video */}
          <p className="text-xs sm:text-sm font-sans font-bold uppercase text-neutral-300 tracking-[0.16em] mt-1 select-none opacity-60">
            FEATURED PRODUCTS
          </p>
        </div>

        {/* ── FILTER TABS (MATCHING REFERENCE VIDEO FRAME 24) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-neutral-100">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto pb-1 max-w-full scrollbar-none mx-auto sm:mx-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (activeCategory !== 'all') setActiveCategory('all');
                }}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-[2px] font-sans font-bold text-xs uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'bg-transparent text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 font-sans"
            />
          </div>

        </div>

        {/* ── 5-COLUMN PRODUCT GRID (MATCHING REFERENCE VIDEO FRAME 24 TO 28) ── */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {filteredProducts.slice(0, 30).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-3">
            <SlidersHorizontal className="w-9 h-9 text-neutral-400 mx-auto" />
            <h4 className="text-sm font-bold text-neutral-800 font-sans">No products found in this category</h4>
            <p className="text-xs text-neutral-500 font-sans">Try selecting Bestselling or clearing search.</p>
            <button
              onClick={() => { setActiveTab('bestselling'); setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-2 px-4 py-1.5 bg-neutral-950 text-white font-sans text-xs font-bold rounded-sm uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};