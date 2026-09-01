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

  return (
    <MobileFrame>
      <CustomerTopNav />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg z-50 animate-fade-in-down">
          {toast}
        </div>
      )}

      <div className="pb-24">
        {/* Greeting Section */}
        <div className="px-6 pt-6 pb-4">
          <p className="text-sm text-gray-600 mb-1">Good morning 👋</p>
          <h1 className="text-3xl font-black text-slate-900">Welcome back, <span className="text-orange-600">Rahul</span></h1>
          <p className="text-sm text-gray-600 mt-1">What do you want to get delivered today?</p>
        </div>

        {/* Hero Banner with Navigation */}
        <div className="px-6 mb-6">
          <div className={`bg-gradient-to-r ${banners[currentBanner].colors} rounded-2xl p-8 text-white min-h-[200px] flex items-center justify-between relative overflow-hidden`}>
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur">EVENING PICK</span>
              <h2 className="text-2xl font-black mb-2">{banners[currentBanner].title}</h2>
              <p className="text-white/90 mb-4 text-sm">{banners[currentBanner].subtitle}</p>
              <button 
                onClick={() => navigate('/customer/services')}
                className="bg-white text-orange-600 font-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-6xl opacity-50 relative z-10">{banners[currentBanner].emoji}</div>

            {/* Banner Navigation */}
            <button 
              onClick={() => setCurrentBanner((prev) => (prev - 1 + 3) % 3)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur transition-all z-20"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => setCurrentBanner((prev) => (prev + 1) % 3)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur transition-all z-20"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentBanner ? 'bg-white w-6' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 mb-6 flex gap-3">
          <button 
            onClick={() => navigate('/customer/offers')}
            className="flex-1 bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 text-orange-600 py-3 rounded-xl font-black text-sm transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Flame className="w-5 h-5" /> Flash Deals
          </button>
          <button 
            onClick={() => navigate('/customer/services')}
            className="flex-1 bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 text-blue-600 py-3 rounded-xl font-black text-sm transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" /> 10-Min Del...
          </button>
        </div>

        {/* Mega Deals */}
        <div className="px-6 mb-8">
          <h3 className="font-black text-lg mb-4 text-slate-900">🎁 Mega Deals</h3>
          <div className="grid grid-cols-1 gap-3">
            {heroDeals.map((deal, idx) => (
              <div 
                key={idx}
                className={`bg-gradient-to-r ${deal.color} rounded-xl p-6 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all transform hover:scale-105`}
                onClick={() => navigate('/customer/offers')}
              >
                <span className="text-3xl opacity-20 absolute right-4 top-2">{deal.icon}</span>
                <h4 className="font-black text-xl mb-1">{deal.title}</h4>
                <p className="text-white/90 text-sm mb-3">{deal.subtitle}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold backdrop-blur">{deal.time}</span>
                  <span className="text-white font-black">Shop Now →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buy Again Section */}
        <div className="mb-8">
          <div className="px-6 flex justify-between items-center mb-4">
            <h3 className="font-black text-lg text-slate-900">Buy Again</h3>
            <button 
              onClick={() => navigate('/customer/orders')}
              className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto px-6 pb-4">
            <div className="flex gap-4 w-fit">
              {BUY_AGAIN.map((product) => (
                <div 
                  key={product.id}
                  className="w-40 bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:border-orange-200 transition-all transform hover:scale-105"
                >
                  <div className="text-4xl text-center mb-3">{product.e}</div>
                  <h4 className="font-bold text-sm text-slate-900 mb-2 line-clamp-2">{product.n}</h4>
                  <div className="flex justify-between items-center">
                    <span className="font-black text-lg text-orange-600">₹{product.p}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
                      title="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-8">
          <div className="px-6 flex justify-between items-center mb-4">
            <h3 className="font-black text-lg text-slate-900">🔥 Trending in Jhagriya</h3>
            <button 
              onClick={() => navigate('/customer/services')}
              className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto px-6 pb-4">
            <div className="flex gap-4 w-fit">
              {TRENDING.map((product) => (
                <div 
                  key={product.id}
                  className="w-40 bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:border-orange-200 transition-all transform hover:scale-105 relative"
                >
                  {product.tag && (
                    <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.tag}
                    </div>
                  )}
                  <div className="text-4xl text-center mb-3">{product.e}</div>
                  <h4 className="font-bold text-sm text-slate-900 mb-2 line-clamp-2">{product.n}</h4>
                  <div className="flex justify-between items-center">
                    <span className="font-black text-lg text-orange-600">₹{product.p}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Brands */}
        <div className="mb-8">
          <div className="px-6 mb-4">
            <h3 className="font-black text-lg text-slate-900">⭐ Featured Brands</h3>
          </div>
          <div className="px-6">
            <div className="grid grid-cols-3 gap-3">
              {BRANDS.map((brand, idx) => (
                <button 
                  key={idx}
                  onClick={() => showToast(`Opening ${brand.name}...`)}
                  className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-orange-300 hover:shadow-md transition-all transform hover:scale-105 active:scale-95"
                >
                  <div className="text-3xl mb-2">{brand.e}</div>
                  <p className="font-bold text-xs text-slate-900 line-clamp-2">{brand.n}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <div className="px-6 mb-4">
            <h3 className="font-black text-lg text-slate-900">Browse Categories</h3>
          </div>
          <div className="px-6">
            <div className="grid grid-cols-3 gap-3">
              {DAILY_CATS.slice(0, 6).map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => navigate('/customer/services')}
                  className="p-4 rounded-2xl hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: cat.c }}
                >
                  <div className="text-2xl mb-2">{cat.e}</div>
                  <p className="font-bold text-xs text-slate-900">{cat.n}</p>
                  <p className="text-[10px] text-gray-700 mt-1">{cat.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Stores */}
        <div className="mb-8">
          <div className="px-6 flex justify-between items-center mb-4">
            <h3 className="font-black text-lg text-slate-900">Popular Stores in Jhagriya</h3>
            <button 
              onClick={() => navigate('/customer/services')}
              className="text-orange-600 font-bold text-sm flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto px-6 pb-4">
            <div className="flex gap-4 w-fit">
              {STORES.map((store) => (
                <div 
                  key={store.id}
                  onClick={() => showToast(`Opening ${store.n}...`)}
                  className="w-52 bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:border-orange-200 transition-all transform hover:scale-105 cursor-pointer flex gap-3 items-start"
                >
                  <div className="text-3xl">{store.e}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-slate-900 mb-1">{store.n}</h4>
                    <span className="inline-block bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full mb-2">
                      {store.tag}
                    </span>
                    <div className="text-xs text-gray-600">⭐ {store.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-8">
          <div className="px-6 mb-4">
            <h3 className="font-black text-lg text-slate-900">What Users Say</h3>
          </div>
          <div className="px-6">
            <div className="grid grid-cols-1 gap-3">
              {REVIEWS.map((review) => (
                <div 
                  key={review.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-3 italic">"{review.t}"</p>
                  <p className="font-bold text-xs text-slate-900">{review.n}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
};

export default CustomerHomeEnhanced;
