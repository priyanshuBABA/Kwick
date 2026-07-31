import React from 'react';
import MobileFrame from '../../components/MobileFrame';
import TopBar from '../../components/TopBar';
import { useCart } from '../../CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const CustomerCart = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const { placeOrder } = useAppContext();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Add request to both Vendor and Rider portals
    placeOrder({
      items: cart,
      total: cartTotal,
      storeName: cart[0]?.store || 'Munger Shop'
    });

    // Clear cart and navigate
    clearCart();
    navigate('/customer/orders');
  };

  return (
    <MobileFrame>
      <TopBar title="Shopping Cart" />
      <div className="p-4 flex flex-col min-h-[calc(100vh-64px)] pb-32">
        {cart.length === 0 ? (
           <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 relative z-10 w-full h-full my-auto mt-24">
              <ShoppingBag className="w-24 h-24 text-slate-300 mb-6 drop-shadow-sm" />
              <h2 className="text-2xl font-black text-navy mb-2">Cart is empty</h2>
              <p className="font-semibold text-slate-500 mb-8 max-w-[200px]">Add some items from the fresh mandi or food sections.</p>
              <button 
                onClick={() => navigate('/customer/home')}
                className="bg-primary hover:bg-yellow-400 text-navy font-bold px-8 py-3 rounded-full shadow-sm transition-colors active:scale-95"
              >
                Browse Items
              </button>
           </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-navy">{cart.length} Items Selected</h2>
              <button onClick={clearCart} className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 flex items-center gap-1.5 transition-colors">
                 <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto hide-scrollbar">
              {cart.map((item, idx) => (
                 <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex justify-between items-center group hover:border-slate-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-3xl font-bold border border-slate-100 shadow-inner group-hover:scale-105 transition-transform">{item.emoji}</div>
                      <div>
                         <h3 className="font-bold text-navy text-sm mb-1 leading-tight">{item.name}</h3>
                         <p className="text-primary font-black">₹{item.price} <span className="text-slate-400 text-xs font-semibold">x {item.quantity}</span></p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
              ))}
            </div>

            {/* Billing summary */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 mt-6 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
               
               <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-4">Bill Summary</h3>
               
               <div className="flex justify-between items-center mb-2 font-semibold">
                 <span className="text-slate-300 text-sm">Item Total</span>
                 <span>₹{cartTotal}</span>
               </div>
               <div className="flex justify-between items-center mb-4 font-semibold pb-4 border-b border-white/10">
                 <span className="text-slate-300 text-sm flex items-center gap-1">Delivery Fee <span className="bg-green-500/20 text-green-400 px-1.5 py-px rounded text-[10px] uppercase font-black tracking-wider ml-1">Offer</span></span>
                 <span className="text-green-400 line-through decoration-red-500/50 mr-2 opacity-70">₹40</span> <span>Free</span>
               </div>
               
               <div className="flex justify-between items-end mb-6">
                 <span className="font-bold text-slate-300">Grand Total</span>
                 <span className="font-black text-3xl text-primary leading-none">₹{cartTotal}</span>
               </div>

               <button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-yellow-400 text-navy font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-colors uppercase tracking-widest text-sm shadow-md active:scale-[0.98]">
                 Proceed to Pay <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          </>
        )}
      </div>
    </MobileFrame>
  );
};
export default CustomerCart;
