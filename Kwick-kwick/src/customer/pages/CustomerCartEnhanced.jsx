import React from 'react';
import MobileFrame from '../../components/MobileFrame';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';
import { useCart } from '../../CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Enhanced Cart Page based on HTML Design
 * Displays shopping cart with billing summary and checkout
 */
const CustomerCartEnhanced = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    navigate('/customer/payment');
  };

  // HTML Design styled empty state
  if (cart.length === 0) {
    return (
      <MobileFrame>
        <TopBar title="Your Cart" />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6 text-center pb-20">
          <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
          <h2 className="text-2xl font-black text-slate-900 mb-2">Your Cart</h2>
          <p className="text-base text-gray-600 text-slate-900 mb-8">0 items ready for checkout.</p>
          <button 
            onClick={() => navigate('/customer/home')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-xl transition-colors uppercase tracking-wider text-sm font-bold"
          >
            Browse Products
          </button>
        </div>
        <BottomNav />
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <TopBar title="Your Cart" />
      <div className="pb-24">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-900">{cart.length} Items</h2>
            <button 
              onClick={clearCart} 
              className="text-xs font-bold text-red-600 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Clear Cart
            </button>
          </div>

          {/* Cart Items */}
          <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-200 mb-6">
            {cart.map((item, idx) => (
              <div key={idx} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {item.emoji || '📦'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{item.name}</h3>
                    <p className="text-orange-600 font-black text-base">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name}`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"><Minus className="h-4 w-4" /></button>
                  <span className="w-5 text-center text-sm font-black">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name}`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200"><Plus className="h-4 w-4" /></button>
                  <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`} className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="h-5 w-5" /></button>
                </div>
              </div>
            ))}
          </div>

          {/* Billing Summary - HTML Design Style */}
          <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-4">Bill Summary</h3>
            
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Delivery Fee</span>
                <span className="text-green-400 font-semibold">FREE</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-6">
              <span className="font-bold text-gray-300">Grand Total</span>
              <span className="font-black text-3xl text-orange-500">₹{cartTotal}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-colors uppercase tracking-wider text-sm"
            >
              Proceed to Pay <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Security Note */}
          <div className="text-center mt-4 text-xs text-gray-600">
            <p>🔒 Your payment is secure and encrypted</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
};

export default CustomerCartEnhanced;
