import React from 'react';
import { X, Star, ShoppingCart, Heart, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-navy/70 backdrop-blur-md z-[150]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-5xl bg-white rounded-3xl overflow-hidden z-[160] shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-sunset-orange hover:text-white transition-all z-[170] shadow-lg active:scale-90"
            >
              <X size={24} />
            </button>

            {/* Image Gallery Side */}
            <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative overflow-hidden group">
              <img 
                src={product.image} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt={product.name} 
              />
              <div className="absolute bottom-6 left-6 flex space-x-3">
                <div className="w-16 h-16 rounded-xl border-2 border-white overflow-hidden shadow-xl cursor-pointer">
                   <img src={product.image} className="w-full h-full object-cover" alt="Thumb" />
                </div>
                <div className="w-16 h-16 rounded-xl border-2 border-white/40 overflow-hidden shadow-xl cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                   <img src="https://images.unsplash.com/photo-1518128910761-3a569f48db6a?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Detail" />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-between bg-soft-cream/30">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-sunset-orange font-bold text-xs uppercase tracking-widest">
                  <span className="bg-sunset-orange/10 px-3 py-1 rounded-full">{product.category}</span>
                  <span className="flex items-center space-x-1">
                    <Star size={14} className="fill-sunset-orange" />
                    <span>{product.rating} / 5.0 Rating</span>
                  </span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-black text-deep-navy leading-tight">{product.name}</h2>
                <p className="text-lg font-bold text-gray-400 uppercase tracking-[0.2em]">{product.brand} Signature Edition</p>
                
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-black text-deep-navy tracking-tight">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through font-medium">₹{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                <div className="h-[1px] w-full bg-gray-200 my-8" />

                <div className="space-y-4">
                  <p className="text-deep-navy/70 leading-relaxed text-lg">
                    Exquisitely crafted for those who value the art of writing. This piece represents the perfect harmony between traditional craftsmanship and modern elegance.
                  </p>
                  
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                    {['Premium Materials', 'Hand-finished', 'Limited Availability', 'Eco-friendly'].map((feat) => (
                      <li key={feat} className="flex items-center space-x-2 text-sm font-bold text-deep-navy">
                        <div className="bg-soft-mint rounded-full p-1 text-deep-navy">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 flex space-x-4">
                <button 
                  onClick={() => { onAddToCart(product); onClose(); }}
                  className="flex-1 bg-deep-navy text-white text-lg font-black py-5 rounded-2xl flex items-center justify-center space-x-3 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-deep-navy/30"
                >
                  <ShoppingCart size={22} />
                  <span>Reserve Now</span>
                </button>
                <button className="p-5 border-2 border-deep-navy text-deep-navy rounded-2xl hover:bg-deep-navy hover:text-white transition-all active:scale-95">
                  <Heart size={24} />
                </button>
                <button className="p-5 border-2 border-gray-200 text-gray-400 rounded-2xl hover:border-deep-navy hover:text-deep-navy transition-all active:scale-95">
                  <Share2 size={22} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
