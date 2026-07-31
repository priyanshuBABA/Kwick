import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = ({ cartCount, openCart }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-deep-navy tracking-tight">
              Stationary<span className="text-sunset-orange underline underline-offset-4 decoration-2">Hub</span>
            </span>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className={`relative w-full transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
              <input
                type="text"
                placeholder="Search premium journals, pens..."
                className="w-full bg-soft-cream/50 border border-gray-200 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-sunset-orange/20 focus:border-sunset-orange transition-all duration-300"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Icons - Right */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:p-2 text-deep-navy hover:text-sunset-orange transition-colors duration-300">
              <User className="h-6 w-6" />
            </button>
            <button className="hidden sm:p-2 text-deep-navy hover:text-sunset-orange transition-colors duration-300 relative group">
              <Heart className="h-6 w-6" />
              <span className="absolute top-2 right-2 bg-sunset-orange h-2 w-2 rounded-full border-2 border-white group-hover:scale-150 transition-transform"></span>
            </button>
            <button 
              onClick={openCart}
              className="p-2 text-deep-navy hover:text-sunset-orange transition-colors duration-300 relative group"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-deep-navy text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-deep-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-soft-cream rounded-xl py-3 px-10 text-sm focus:outline-none"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center space-x-2 p-3 bg-soft-cream rounded-xl">
                  <User size={20} /> <span className="text-sm font-medium">Profile</span>
                </button>
                <button className="flex items-center space-x-2 p-3 bg-soft-cream rounded-xl">
                  <Heart size={20} /> <span className="text-sm font-medium">Wishlist</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
