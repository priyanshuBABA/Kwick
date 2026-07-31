import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Star, Flame, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const FilterSidebar = ({ activeSort, setSort, activeCategory, setCategory, categories }) => {
  const sortOptions = [
    { id: 'popularity', name: 'Popularity', icon: Flame },
    { id: 'newest', name: 'Newest Arrivals', icon: Calendar },
    { id: 'price-low', name: 'Price: Low to High', icon: ArrowUpDown },
    { id: 'price-high', name: 'Price: High to Low', icon: ArrowUpDown },
    { id: 'rating', name: 'Customer Rating', icon: Star },
  ];

  return (
    <div className="space-y-10 sticky top-28 h-fit">
      {/* Title */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-sunset-orange rounded-xl text-white shadow-lg shadow-sunset-orange/20">
          <SlidersHorizontal size={20} />
        </div>
        <h3 className="text-xl font-bold text-deep-navy tracking-tight uppercase">Refine Selection</h3>
      </div>

      {/* Sort Section */}
      <div className="space-y-6">
        <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Organize By</h4>
        <div className="flex flex-col space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSort(option.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold border-2 ${
                activeSort === option.id 
                  ? 'bg-deep-navy text-white border-deep-navy shadow-xl shadow-deep-navy/20' 
                  : 'bg-white text-gray-500 border-transparent hover:bg-soft-cream/50 hover:text-deep-navy'
              }`}
            >
              <option.icon size={18} className={activeSort === option.id ? 'text-sunset-orange' : 'text-gray-400'} />
              <span>{option.name}</span>
              {activeSort === option.id && (
                <motion.div layoutId="sortDot" className="ml-auto w-1.5 h-1.5 bg-sunset-orange rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category Section */}
      <div className="space-y-6">
        <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Collection</h4>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setCategory('all')}
            className={`text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold border-2 ${
              activeCategory === 'all' 
                ? 'bg-soft-mint text-deep-navy border-soft-mint shadow-lg' 
                : 'bg-white text-gray-500 border-transparent hover:bg-soft-cream'
            }`}
          >
            All Masterpieces
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.name)}
              className={`text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold border-2 ${
                activeCategory === cat.name 
                  ? 'bg-soft-mint text-deep-navy border-soft-mint shadow-lg' 
                  : 'bg-white text-gray-500 border-transparent hover:bg-soft-cream'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6">
        <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Investment</h4>
        <div className="flex items-center space-x-3">
          <input 
            type="text" 
            placeholder="Min $" 
            className="w-full bg-white border border-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sunset-orange/20"
          />
          <span className="text-gray-300">—</span>
          <input 
            type="text" 
            placeholder="Max $" 
            className="w-full bg-white border border-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sunset-orange/20"
          />
        </div>
      </div>
    </div>
  );
};
