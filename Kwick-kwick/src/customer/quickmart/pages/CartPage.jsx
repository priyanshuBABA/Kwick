import React, { useState } from 'react';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { QuantitySelector } from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/customer/household-items');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-black" />
        </div>
        <h2 className="text-3xl font-black text-[#FFD700] mb-2 font-['Poppins']">Order Placed!</h2>
        <p className="text-white/60 font-bold">Your groceries are on the way. Arriving in 15 mins.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      <Header title="Your Cart" />
      
      <div className="p-4 pb-32">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-white rounded-[20px] overflow-hidden shadow-sm">
              {cartItems.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`p-4 flex items-center gap-4 ${idx !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-black truncate font-['Poppins']">{item.name}</h3>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">{item.unit}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-black">₹{item.price * item.quantity}</span>
                      <QuantitySelector productId={item.id} quantity={item.quantity} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-black mb-4 font-['Poppins'] uppercase tracking-tight">Bill Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>Item Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-black">FREE</span>
                </div>
                <div className="h-px bg-gray-100 my-2"></div>
                <div className="flex justify-between text-xl font-black text-black">
                  <span>Grand Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center text-white/30">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-black mb-2">Cart is empty</h2>
            <p className="text-sm font-bold mb-8">Add items to start your quick delivery!</p>
            <button 
              onClick={() => navigate('/customer/household-items')}
              className="bg-[#FFD700] text-black font-black px-8 py-3 rounded-full shadow-lg active:scale-95 transition-all"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>

      {/* Checkout Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-[#FFD700] text-black h-16 rounded-[20px] font-black text-lg shadow-lg active:scale-95 transition-all flex items-center justify-between px-6 group"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex items-center gap-2">
              PLACE ORDER
              <span className="bg-black/10 p-1 rounded-lg group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
