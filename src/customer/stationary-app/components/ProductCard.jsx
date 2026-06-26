import React, { useState } from 'react';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white/40 backdrop-blur-sm border border-gray-100 rounded-2xl overflow-hidden p-4 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-soft-cream/30">
        {product.isNew && (
          <span className="absolute top-2 left-2 z-10 bg-sunset-orange text-white text-[10px] uppercase font-black px-2 py-1 rounded-full shadow-lg">New Arrival</span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Overlay Buttons */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center space-x-3"
            >
              <motion.button
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => onQuickView(product)}
                className="w-12 h-12 bg-white text-deep-navy rounded-full flex items-center justify-center hover:bg-sunset-orange hover:text-white transition-all duration-300 shadow-xl"
              >
                <Eye size={20} />
              </motion.button>
              <motion.button
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white text-deep-navy rounded-full flex items-center justify-center hover:bg-sunset-orange hover:text-white transition-all duration-300 shadow-xl"
              >
                <Heart size={20} />
              </motion.button>
              <motion.button
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => onAddToCart(product)}
                className="w-12 h-12 bg-white text-deep-navy rounded-full flex items-center justify-center hover:bg-sunset-orange hover:text-white transition-all duration-300 shadow-xl"
              >
                <ShoppingCart size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{product.brand}</p>
            <h3 className="text-lg font-bold text-deep-navy leading-tight line-clamp-1">{product.name}</h3>
          </div>
          <div className="flex items-center space-x-1 bg-soft-mint px-2 py-1 rounded-lg">
            <Star size={12} className="text-deep-navy fill-deep-navy" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <span className="text-2xl font-black text-deep-navy tracking-tight">₹{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through font-medium">₹{product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        {/* Quick Add Button Mobile */}
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full md:hidden mt-4 bg-deep-navy text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform"
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};
