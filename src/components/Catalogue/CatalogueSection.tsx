import React, { memo, useState, useMemo, useCallback } from 'react';
import { Search, Plus, Check, ShoppingBag, Info, X } from 'lucide-react';
import { Product, CartItem } from '../../types';
import { PRODUCT_INVENTORY } from '../../data/products';
import { MotionCard } from '../UI/MotionCard';
import { ScrollAnimate } from '../UI/ScrollAnimate';

interface CatalogueSectionProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

const CATEGORIES = [
  'ALL',
  'Deck & Rigging',
  'Personal Protective Equipment (PPE)',
  'Fire & Safety Equipment',
  'Navigation & Bridge Equipment',
  'Engine Room & Maintenance Tools',
  'Electrical Supplies',
  'Cabin & Housekeeping Stores',
  'Sealants, Adhesives & Welding Supplies'
] as const;

export const CatalogueSection: React.FC<CatalogueSectionProps> = memo(({
  cart,
  addToCart,
  setSectionRef
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Optimized Filtered Inventory
  const filteredProducts = useMemo(() => {
    return PRODUCT_INVENTORY.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.impaCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const getCategoryCount = useCallback((cat: string) => {
    if (cat === 'ALL') return PRODUCT_INVENTORY.length;
    return PRODUCT_INVENTORY.filter(p => p.category === cat).length;
  }, []);

  return (
    <section 
      id="catalogue" 
      ref={setSectionRef('catalogue')}
      className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-12 bg-[#F5F2ED] border-b border-[#00214E]/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <ScrollAnimate direction="up">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-2 sm:mb-3">
              Standardized IMPA/ISSA Directory
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#00214E]">
              Technical Marine Stores Catalogue.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#00214E]/70 max-w-2xl mx-auto mt-2">
              Search 15,000+ catalogued marine items by IMPA code, product name, or specification category.
            </p>
          </div>
        </ScrollAnimate>

        {/* Search Bar */}
        <ScrollAnimate direction="up" delay={0.1}>
          <div className="max-w-2xl mx-auto mb-8 sm:mb-10 relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#2E6DAE] absolute left-4 pointer-events-none" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by IMPA code (e.g. 232152), keyword, or item name..."
                className="w-full bg-white border border-[#00214E]/20 pl-12 pr-12 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2E6DAE] focus:ring-2 focus:ring-[#2E6DAE]/20 shadow-sm min-h-[48px]"
                aria-label="Search marine products by IMPA code or keyword"
              />
              {searchTerm && (
                <button 
                  onClick={handleClearSearch}
                  className="absolute right-4 p-1.5 text-gray-400 hover:text-[#00214E] transition-colors rounded-full focus:outline-none"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-[#00214E]/60 mt-2 px-2">
              <span>Showing {filteredProducts.length} items</span>
              <span>Search by 6-digit IMPA Code</span>
            </div>
          </div>
        </ScrollAnimate>

        {/* Category Pills Bar */}
        <div role="tablist" aria-label="Product Categories" className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
          {CATEGORIES.map((category) => {
            const count = getCategoryCount(category);
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#2E6DAE] ${
                  isSelected
                    ? 'bg-[#00214E] text-white shadow-md scale-[1.02]'
                    : 'bg-white border border-[#00214E]/15 text-[#00214E]/80 hover:bg-[#2E6DAE]/10 hover:border-[#2E6DAE]'
                }`}
              >
                <span>{category}</span>
                <span className={`px-1.5 py-0.5 text-[9px] rounded-full font-sans ${
                  isSelected ? 'bg-[#2E6DAE] text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Info Helper Banner */}
        {selectedCategory !== 'ALL' && (
          <div className="bg-[#2E6DAE]/10 border border-[#2E6DAE]/20 p-4 rounded-xl mb-8 flex items-center gap-3 text-xs text-[#00214E]">
            <Info className="w-5 h-5 text-[#2E6DAE] shrink-0" />
            <div>
              <span className="font-bold block">Filtering: {selectedCategory}</span>
              <span className="text-[11px] opacity-80">All items meet strict marine safety, ISO 9001 quality audits, and IMPA/ISSA index standards.</span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => {
              const inCart = cart.find(item => item.product.id === product.id);
              return (
                <ScrollAnimate key={product.id} direction="up" delay={(idx % 4) * 0.08}>
                  <MotionCard tiltDegree={2.5} className="h-full bg-white border border-[#00214E]/10 rounded-xl overflow-hidden flex flex-col justify-between group">
                    {/* Card Header & Image */}
                    <div>
                      <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-[#00214E] text-white px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider shadow">
                          IMPA {product.impaCode}
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#00214E] px-2 py-0.5 rounded text-[9px] font-mono font-bold border border-[#00214E]/10">
                          ${product.priceEstimate} Est.
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="p-5">
                        <span className="text-[9px] font-mono uppercase text-[#2E6DAE] font-bold block mb-1">
                          {product.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-[#00214E] mb-2 line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[#00214E]/70 line-clamp-2 leading-relaxed mb-4">
                          {product.description}
                        </p>

                        {/* Specs Table */}
                        <div className="bg-[#F5F2ED] p-3 rounded-lg border border-[#00214E]/5 space-y-1 font-mono text-[10px] text-[#00214E]/80 mb-4">
                          {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                            <div key={key} className="flex justify-between border-b border-gray-200/60 pb-1 last:border-0 last:pb-0">
                              <span className="opacity-60">{key}:</span>
                              <span className="font-bold truncate max-w-[120px] text-right">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => addToCart(product)}
                        className={`w-full py-3 px-4 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#2E6DAE] ${
                          inCart
                            ? 'bg-[#2E6DAE] text-white shadow-md'
                            : 'bg-[#00214E] hover:bg-[#2E6DAE] text-white shadow'
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>In Basket ({inCart.quantity})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Requisition</span>
                          </>
                        )}
                      </button>
                    </div>
                  </MotionCard>
                </ScrollAnimate>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-xl border border-dashed border-[#00214E]/20 max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-serif italic text-[#00214E] mb-2">No Matching Products Found</h3>
            <p className="text-xs text-[#00214E]/70 mb-6">
              Try refining your search keyword or switching category filters.
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('ALL'); }}
              className="px-6 py-2.5 bg-[#00214E] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#2E6DAE] transition-colors"
            >
              Reset Search Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
});

CatalogueSection.displayName = 'CatalogueSection';
