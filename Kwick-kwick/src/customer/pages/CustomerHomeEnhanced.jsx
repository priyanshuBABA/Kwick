import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext';
import {
  ChevronRight, ChevronLeft, Heart, ShoppingCart, MapPin, Bell, Flame,
  Star, ArrowRight, Search, Zap, Gift, Sparkles, Trophy
} from "lucide-react";
import MobileFrame from "../../components/MobileFrame";
import CustomerTopNav from "../../components/CustomerTopNav";
import BottomNav from "../../components/BottomNav";
import { PRODUCTS, BUY_AGAIN, TRENDING, BRANDS, DAILY_CATS, STORES, REVIEWS } from "../../data/htmlDesignData";

const CustomerHomeEnhanced = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [cartCount, setCartCount] = useState(3);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [toast, setToast] = useState(null);
  const [userLocation] = useState("Jhagriya, Bhopal");
  const [eta] = useState("15-20 min");

  // Auto-rotate banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setCartCount(cartCount + 1);
    showToast(`✅ ${product.name} added to cart`);
  };

  const banners = [
    {
      title: "Chai, evening snacks & street food",
      subtitle: "The 5 o'clock craving, sorted in minutes.",
      emoji: "☕",
      colors: "from-orange-400 to-red-500"
    },
    {
      title: "Fresh groceries delivered",
      subtitle: "Farm fresh items at your doorstep.",
      emoji: "🥦",
      colors: "from-green-400 to-emerald-500"
    },
    {
      title: "Medicines & wellness",
      subtitle: "24x7 pharmacy delivery.",
      emoji: "💊",
      colors: "from-blue-400 to-cyan-500"
    }
  ];

  const heroDeals = [
    { title: "Flat ₹500 Off", subtitle: "On orders above ₹999", icon: "🏷️", time: "4h left", color: "from-pink-500 to-rose-600" },
    { title: "Buy 1 Get 1", subtitle: "On selected groceries", icon: "🎁", time: "12h left", color: "from-emerald-500 to-teal-600" },
    { title: "Free Shipping", subtitle: "All medicines & pharma", icon: "🚚", time: "2d left", color: "from-blue-500 to-cyan-600" },
  ];

  const quickPills = [
    { label: 'Milk', emoji: '🥛' },
    { label: 'Amul Butter', emoji: '🧈' },
    { label: 'Paracetamol', emoji: '💊' },
    { label: 'Cake', emoji: '🎂' },
    { label: 'Bread', emoji: '🍞' },
  ];

  const sidebarItems = [
    { label: 'Home', icon: '🏠', active: true, path: '/customer/home' },
    { label: 'All Categories', icon: '🗂️', path: '/customer/services' },
    { label: 'My Orders', icon: '📦', path: '/customer/orders' },
    { label: 'Wishlist', icon: '♡', path: '/customer/wishlist' },
    { label: 'Wallet', icon: '💳', path: '/customer/wallet' },
    { label: 'Offers', icon: '🏷️', path: '/customer/offers' },
    { label: 'Profile', icon: '👤', path: '/customer/profile' },
  ];

  const rightOrderItems = [
    { id: 1, name: 'Fresh Basket', details: 'Milk, Eggs, Bread', price: '₹187', status: 'Delivered', tone: 'bg-emerald-50 text-emerald-700' },
    { id: 2, name: 'MediPlus', details: 'Vitamin D, Zinc', price: '₹349', status: 'In Transit', tone: 'bg-amber-50 text-amber-700' },
  ];

  const rewardPoints = [
    { label: 'Earned', value: '1,240' },
    { label: 'Voucher', value: '2x' },
    { label: 'Tier', value: 'Gold' },
  ];

  return (
    <MobileFrame>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-3 text-white shadow-xl">
          {toast}
        </div>
      )}

      <div className="min-h-screen bg-[#f2f3f5] pb-28 text-slate-800">
        <div className="bg-[#0c1c3c] px-4 py-2 text-white">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 text-sm font-medium">
            <div className="flex items-center gap-2 text-white/90">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 text-[10px] font-bold text-[#0c1c3c]">✓</span>
              <span>MediPlus order arriving in 12 mins</span>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/90 transition hover:bg-white/15">
              Track Live
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <main className="mx-auto max-w-[1440px] px-4 py-4 xl:px-5">
          <div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)_330px]">
            <aside className="hidden rounded-3xl border border-slate-200 bg-white xl:block">
              <div className="space-y-2 p-4">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-all ${item.active ? 'bg-[#f5f5f5] text-slate-900 shadow-inner' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-orange-50 to-amber-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Live</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-700">Aman from Jhagriya reordered Groceries</p>
                <p className="mt-1 text-xs text-slate-500">4 min ago</p>
              </div>
            </aside>

            <section className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {quickPills.map((item) => (
                  <button
                    key={item.label}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-600"
                  >
                    <span className="mr-1.5">{item.emoji}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mb-5">
                <p className="mb-2 text-sm text-slate-500">Good morning 👋</p>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 xl:text-[2.9rem]">
                  Welcome back, <span className="text-orange-500">Rahul</span>
                </h1>
                <p className="mt-2 text-sm text-slate-500">What do you want to get delivered today?</p>
              </div>

              <div className="overflow-hidden rounded-[30px] bg-gradient-to-r from-[#f76d46] via-[#f4734d] to-[#f56d5c] p-6 text-white shadow-[0_16px_35px_rgba(245,120,86,0.28)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                    Evening Pick
                  </span>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div className="max-w-[440px]">
                    <h2 className="text-3xl font-black leading-tight xl:text-[3rem]">Chai, evening snacks & street food</h2>
                    <p className="mt-4 text-sm text-white/85">The 5 o&apos;clock craving, sorted in minutes.</p>
                    <button
                      onClick={() => navigate('/customer/services')}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white px-5 py-2.5 text-sm font-black text-[#f36b43] shadow-md transition hover:scale-[1.02]"
                    >
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="relative hidden h-36 w-36 shrink-0 items-center justify-center rounded-[32px] bg-white/15 backdrop-blur-sm md:flex">
                    <div className="absolute inset-5 rounded-[28px] bg-[#f7d7d1]" />
                    <div className="absolute inset-x-8 bottom-5 h-10 rounded-full bg-[#f7d7d1]" />
                    <div className="relative z-10 text-6xl">☕</div>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-2 text-xs font-semibold text-white/90">
                    <Flame className="h-4 w-4" />
                    Flash sale ends in <span className="font-black">02:10:12</span>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((dot) => (
                      <button
                        key={dot}
                        onClick={() => setCurrentBanner(dot)}
                        className={`h-2 rounded-full transition-all ${dot === currentBanner ? 'w-7 bg-white' : 'w-2 bg-white/50'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {heroDeals.map((deal, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate('/customer/offers')}
                    className={`rounded-2xl bg-gradient-to-r ${deal.color} p-4 text-left text-white shadow-lg transition hover:-translate-y-0.5`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-2xl">{deal.icon}</span>
                      <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/90">
                        {deal.time}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-black">{deal.title}</h3>
                    <p className="mt-1 text-sm text-white/80">{deal.subtitle}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">Buy Again</h3>
                    <button onClick={() => navigate('/customer/orders')} className="text-sm font-bold text-orange-500">View All</button>
                  </div>
                  <div className="space-y-3">
                    {BUY_AGAIN.slice(0, 2).map((product) => (
                      <div key={product.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">{product.e}</div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-slate-800">{product.n}</p>
                          <p className="mt-1 text-xs text-slate-500">{product.sub || 'Fresh & healthy'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-black text-orange-500">₹{product.p}</p>
                          <button onClick={() => handleAddToCart(product)} className="mt-1 rounded-full bg-orange-500 p-2 text-white">
                            <ShoppingCart className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">Trending</h3>
                    <button onClick={() => navigate('/customer/services')} className="text-sm font-bold text-orange-500">View All</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {TRENDING.slice(0, 4).map((product) => (
                      <button key={product.id} onClick={() => handleAddToCart(product)} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-orange-200 hover:bg-orange-50">
                        <div className="text-2xl">{product.e}</div>
                        <p className="mt-2 text-sm font-bold text-slate-800">{product.n}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-base font-black text-orange-500">₹{product.p}</span>
                          <span className="rounded-full bg-orange-500 p-1.5 text-white">
                            <ShoppingCart className="h-3 w-3" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-[28px] bg-gradient-to-br from-[#3172eb] to-[#3d60d7] p-5 text-white shadow-[0_20px_30px_rgba(64,96,214,0.25)]">
                <h3 className="text-xl font-black">Kwick Wallet</h3>
                <p className="mt-6 text-4xl font-black tracking-tight">₹1,240</p>
                <p className="mt-2 text-sm text-blue-100">Available balance</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button onClick={() => navigate('/customer/wallet')} className="rounded-xl bg-white/15 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20">Add Money</button>
                  <button onClick={() => navigate('/customer/wallet')} className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Transfer</button>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Recent Orders</h3>
                  <button onClick={() => navigate('/customer/orders')} className="text-sm font-bold text-orange-500">All</button>
                </div>
                <div className="space-y-3">
                  {rightOrderItems.map((order) => (
                    <div key={order.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        {order.name === 'Fresh Basket' ? '🛒' : '💊'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-slate-800">{order.name}</p>
                        <p className="truncate text-xs text-slate-500">{order.details}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900">{order.price}</p>
                        <span className={`mt-1 inline-block rounded-full px-2 py-1 text-[10px] font-bold ${order.tone}`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Reward Points</h3>
                  <button onClick={() => navigate('/customer/wallet')} className="text-sm font-bold text-orange-500">Track</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {rewardPoints.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">{item.label}</p>
                      <p className="mt-2 text-lg font-black text-slate-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>

        <button className="fixed bottom-24 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-2xl text-white shadow-[0_18px_35px_rgba(249,115,22,0.4)] transition hover:scale-105">
          💬
        </button>
      </div>

      <BottomNav />
    </MobileFrame>
  );
};

export default CustomerHomeEnhanced;
