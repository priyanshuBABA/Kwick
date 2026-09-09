import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

export const QuantitySelector = ({ productId, quantity }) => {
  const { increaseQty, decreaseQty } = useCart();
  return (
    <div className="flex items-center gap-3 bg-[#FFD700] rounded-full px-2 py-1 shadow-sm">
      <button 
        onClick={(e) => { e.stopPropagation(); decreaseQty(productId); }}
        className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors"
      >
        <Minus className="w-4 h-4 text-black" />
      </button>
      <span className="text-sm font-bold text-black min-w-[12px] text-center">{quantity}</span>
      <button 
        onClick={(e) => { e.stopPropagation(); increaseQty(productId); }}
        className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors"
      >
        <Plus className="w-4 h-4 text-black" />
      </button>
    </div>
  );
};

export const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useCart();
  const cartItem = cartItems.find(item => item.id === product.id);

  return (
    <div className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:scale-[1.02] transition-transform flex flex-col h-full border border-gray-100">
      <div className="h-[160px] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-[#111111] line-clamp-2 h-10 mb-1 font-['Nunito']">
          {product.name}
        </h3>
        <p className="text-[10px] text-[#888888] font-bold uppercase tracking-wider mb-2">
          {product.unit}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-black text-[#111111]">
            ₹{product.price}
          </span>
          {cartItem ? (
            <QuantitySelector productId={product.id} quantity={cartItem.quantity} />
          ) : (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                addToCart(product);
                // Animation logic would go here
              }}
              className="w-9 h-9 bg-[#FFD700] rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all hover:bg-[#e6c200]"
            >
              <Plus className="w-6 h-6 text-black" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
