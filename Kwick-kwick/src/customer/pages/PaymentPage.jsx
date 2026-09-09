import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CreditCard, LockKeyhole, Smartphone, WalletCards } from 'lucide-react';
import MobileFrame from '../../components/MobileFrame';
import BottomNav from '../../components/BottomNav';
import { useCart } from '../../CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../services/orderApi';
import { useLocationContext } from '../../context/LocationContext';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', detail: 'Google Pay, PhonePe, Paytm', icon: Smartphone },
  { id: 'card', label: 'Credit / Debit Card', detail: 'Visa, Mastercard, RuPay', icon: CreditCard },
  { id: 'wallet', label: 'Kwick Wallet', detail: 'Use your wallet balance', icon: WalletCards },
  { id: 'cod', label: 'Cash on Delivery', detail: 'Pay when your order arrives', icon: CheckCircle2 },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { token } = useAuth();
  const { currentLocation, formattedAddress } = useLocationContext();
  const [method, setMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    if (!cart.length || isProcessing) return;
    setIsProcessing(true);
    setError('');
    try {
      const shippingAddress = currentLocation
        ? {
          formattedAddress,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }
        : undefined;
      const order = await createOrder({ paymentMethod: method, shippingAddress }, token);
      await clearCart();
      navigate('/customer/orders', { state: { orderId: order._id } });
    } catch (requestError) {
      setError(requestError.message || 'Unable to create your order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!cart.length) {
    return (
      <MobileFrame>
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <CreditCard className="mb-5 h-16 w-16 text-slate-300" />
          <h1 className="text-2xl font-black text-slate-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-slate-500">Add an item before opening payment.</p>
          <button onClick={() => navigate('/customer/services')} className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-sm font-black text-white">Browse categories</button>
        </div>
        <BottomNav />
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="min-h-screen bg-slate-50 pb-28">
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-5 py-4">
          <button onClick={() => navigate('/customer/cart')} aria-label="Back to cart" className="rounded-full p-2 hover:bg-slate-100"><ArrowLeft className="h-5 w-5" /></button>
          <div><p className="text-xs font-bold uppercase tracking-widest text-orange-500">Secure checkout</p><h1 className="text-xl font-black text-slate-900">Choose payment</h1></div>
        </header>

        <main className="space-y-5 p-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between"><h2 className="font-black text-slate-900">Order summary</h2><span className="text-sm font-bold text-slate-500">{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span></div>
            <div className="space-y-2">{cart.map(item => <div key={item.id} className="flex justify-between text-sm"><span className="text-slate-600">{item.name} x {item.quantity}</span><span className="font-bold">₹{Number(item.price) * item.quantity}</span></div>)}</div>
            <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 font-black"><span>Total</span><span className="text-orange-600">₹{cartTotal}</span></div>
          </section>

          <section><h2 className="mb-3 font-black text-slate-900">Payment method</h2><div className="space-y-3">{PAYMENT_METHODS.map(({ id, label, detail, icon }) => <button key={id} onClick={() => setMethod(id)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${method === id ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-100' : 'border-slate-200 bg-white'}`}>{React.createElement(icon, { className: `h-5 w-5 ${method === id ? 'text-orange-600' : 'text-slate-500'}` })}<span className="flex-1"><span className="block font-bold text-slate-900">{label}</span><span className="text-xs text-slate-500">{detail}</span></span><span className={`h-5 w-5 rounded-full border-2 ${method === id ? 'border-orange-500 bg-orange-500 shadow-[inset_0_0_0_3px_white]' : 'border-slate-300'}`} /></button>)}</div></section>

          {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
          <button onClick={handlePayment} disabled={isProcessing} className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-4 font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700 disabled:cursor-wait disabled:opacity-70">{isProcessing ? 'Creating order...' : `Place order · ₹${cartTotal}`} <LockKeyhole className="h-4 w-4" /></button>
          <p className="text-center text-xs text-slate-500">Your payment details are protected by secure checkout.</p>
        </main>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
