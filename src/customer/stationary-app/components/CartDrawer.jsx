import React from 'react';
import { X, ShoppingBag, Trash2, ChevronRight, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, onPlaceOrder }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-navy/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-soft-mint p-3 rounded-2xl text-deep-navy">
                  <ShoppingBag size={24} />
                </div>
                <h2 className="text-2xl font-black text-deep-navy tracking-tight uppercase">Your Portfolio</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-soft-cream rounded-full hover:bg-sunset-orange hover:text-white transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={80} strokeWidth={1} className="mb-6 animate-bounce" />
                  <p className="text-xl font-bold uppercase tracking-widest text-deep-navy">Your collection is empty</p>
                  <p className="text-sm mt-2">Curate your workspace with premium tools</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="group flex space-x-5 bg-white/40 p-4 border border-gray-100 rounded-2xl relative"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-deep-navy leading-tight line-clamp-1">{item.name}</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{item.brand}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4 bg-soft-cream rounded-full px-3 py-1.5 border border-gray-100">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-deep-navy transition-colors active:scale-75"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-black text-deep-navy w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-deep-navy transition-colors active:scale-75"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-xl font-black text-deep-navy tracking-tight">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="absolute -top-2 -right-2 p-2 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-soft-cream/80 backdrop-blur-xl border-t border-gray-200">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Investment Total</span>
                  <span className="text-3xl font-black text-deep-navy tracking-tighter">₹{total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    alert('Order Placed Successfully! Thank you for shopping with Stationary Hub.');
                    onPlaceOrder();
                  }}
                  className="w-full bg-deep-navy text-white py-5 rounded-2xl text-lg font-black flex items-center justify-center space-x-3 hover:translate-y-[-4px] active:scale-95 transition-all shadow-2xl shadow-deep-navy/20 group"
                >
                  <span>Confirm Acquisition & Place Order</span>
                  <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <div className="mt-4 flex items-center justify-center space-x-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
                  <div className="h-4 w-8 bg-gray-400 rounded-sm" />
                  <div className="h-4 w-8 bg-gray-400 rounded-sm" />
                  <div className="h-4 w-8 bg-gray-400 rounded-sm" />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
