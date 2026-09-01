import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../AppContext';
import {
  Search, MapPin, Bell, ShoppingCart, Heart, Mic, ChevronRight,
  ChevronLeft, Menu, Home, Grid, Package, Wallet, Zap, User,
  Truck, Clock, Gift, Sparkles, ChevronDown, X, MessageCircle,
  CheckCircle2, Circle, Star, Plus, Minus, Crown, Flame, Rocket,
  Target, Shield, TrendingUp, Send
} from "lucide-react";

/* ================================================================== */
/* MOCK DATA — swap for your real API responses                       */
/* ================================================================== */

const ACTIVE_ORDER = { name: "MediPlus", eta: 12 };

const TRACKING_STEPS = [
  { label: "Order Placed", time: "10:02 AM" },
  { label: "Packed", time: "10:11 AM" },
  { label: "Out for Delivery", time: "10:22 AM" },
  { label: "Arriving", time: "ETA 10:34 AM" },
];
const CURRENT_TRACKING_STEP = 2;

const PRODUCTS = [
  { id: "r1", name: "Milk 1L", price: 58, emoji: "🥛", section: "reorder", badge: "15 MINS" },
  { id: "r2", name: "Bread", price: 45, emoji: "🍞", section: "reorder" },
  { id: "r3", name: "Chai Patti", price: 120, emoji: "🍵", section: "reorder", badge: "15 MINS" },
  { id: "r4", name: "Eggs (12)", price: 84, emoji: "🥚", section: "reorder" },
  { id: "r5", name: "Sugar 1kg", price: 48, emoji: "🍚", section: "reorder" },
  { id: "t1", name: "Amul Butter 500g", price: 265, emoji: "🧈", tag: "Top Seller", section: "trending", badge: "BESTSELLER" },
  { id: "t2", name: "Maggi 4-Pack", price: 56, emoji: "🍜", tag: "Under ₹99", section: "trending", badge: "20% OFF" },
  { id: "t3", name: "Britannia Bread", price: 45, emoji: "🍞", tag: "Under ₹99", section: "trending" },
  { id: "t4", name: "Tata Tea Gold 250g", price: 138, emoji: "🍵", tag: "Top Seller", section: "trending", badge: "BESTSELLER" },
  { id: "t5", name: "Fresh Paneer 200g", price: 89, emoji: "🧀", tag: "Under ₹99", section: "trending", badge: "15 MINS" },
  { id: "t6", name: "Colgate Strong 150g", price: 92, emoji: "🪥", tag: "Under ₹99", section: "trending" },
];

const SHOPPING_CATEGORIES = [
  { name: "Grocery", emoji: "🛒", from: "from-emerald-100", to: "to-emerald-50" },
  { name: "Medicines", emoji: "💊", from: "from-rose-100", to: "to-rose-50" },
  { name: "Fresh Mandi", emoji: "🥦", from: "from-lime-100", to: "to-lime-50" },
  { name: "Fruits", emoji: "🍎", from: "from-red-100", to: "to-red-50" },
  { name: "Vegetables", emoji: "🥕", from: "from-orange-100", to: "to-orange-50" },
  { name: "Cakes", emoji: "🎂", from: "from-pink-100", to: "to-pink-50" },
  { name: "Stationery", emoji: "📋", from: "from-indigo-100", to: "to-indigo-50" },
  { name: "Laundry", emoji: "🧥", from: "from-sky-100", to: "to-sky-50" },
  { name: "Electric", emoji: "⚡", from: "from-amber-100", to: "to-amber-50" },
  { name: "Flowers", emoji: "🌷", from: "from-fuchsia-100", to: "to-fuchsia-50" },
];

const SERVICE_CATEGORIES = [
  { name: "Home Services", emoji: "🔧", from: "from-slate-100", to: "to-slate-50" },
  { name: "Doctor", emoji: "🩺", from: "from-blue-100", to: "to-blue-50" },
  { name: "Ambulance", emoji: "🚑", from: "from-red-100", to: "to-red-50" },
  { name: "Taxi", emoji: "🚕", from: "from-yellow-100", to: "to-yellow-50" },
  { name: "Bike Ride", emoji: "🏍️", from: "from-cyan-100", to: "to-cyan-50" },
  { name: "Pick & Drop", emoji: "📦", from: "from-orange-100", to: "to-orange-50" },
  { name: "Kwick Print", emoji: "🖨️", from: "from-violet-100", to: "to-violet-50" },
];

const CURATED_BANNERS = [
  { title: "Breakfast Essentials", subtitle: "Flat 20% off", emoji: "🍳", from: "from-amber-400", to: "to-orange-500" },
  { title: "Late Night Snacks Store", subtitle: "Delivered in 15 min", emoji: "🍟", from: "from-purple-500", to: "to-indigo-600" },
  { title: "Emergency Pharmacy", subtitle: "24x7 open near you", emoji: "🚨", from: "from-rose-500", to: "to-red-600" },
];

const LOCAL_PARTNERS = [
  { name: "Mishra Cake & Bakery", tag: "Verified Partner", rating: 4.7, emoji: "🎂" },
  { name: "Jhagriya Fresh Mart", tag: "Local Favourite", rating: 4.4, emoji: "🥬" },
  { name: "Apna Medical Store", tag: "Verified Partner", rating: 4.8, emoji: "💊" },
  { name: "City Flower Studio", tag: "New on Kwick", rating: 4.5, emoji: "🌸" },
];

const MEGA_DEALS = [
  { id: "deal1", title: "Flat ₹500 Off", subtitle: "On orders above ₹999", emoji: "🎁", badge: "4h left", from: "from-pink-500", to: "to-rose-600" },
  { id: "deal2", title: "Buy 1 Get 1", subtitle: "On selected groceries", emoji: "🛒", badge: "12h left", from: "from-emerald-500", to: "to-teal-600" },
  { id: "deal3", title: "Free Shipping", subtitle: "All medicines & pharma", emoji: "🚚", badge: "2d left", from: "from-blue-500", to: "to-cyan-600" },
];

const TESTIMONIALS = [
  { name: "Ananya P.", rating: 5, text: "Super fast delivery! Got my groceries in 12 mins. Best app ever!", avatar: "👩" },
  { name: "Rohit S.", rating: 5, text: "The customer support is amazing. They solved my issue instantly!", avatar: "👨" },
  { name: "Priya M.", rating: 5, text: "Love the Kwick Pro membership. Saves me ₹400-500 every month!", avatar: "👩" },
  { name: "Akshay K.", rating: 5, text: "Never had to worry about quality. Everything arrives fresh & on time.", avatar: "👨" },
];

const BRANDS = [
  { name: "Amul", emoji: "🥛" },
  { name: "ITC", emoji: "🍞" },
  { name: "Colgate", emoji: "🪥" },
  { name: "Boroplus", emoji: "🧴" },
  { name: "Haldiram's", emoji: "🍪" },
  { name: "Britannia", emoji: "🍕" },
];

const FLASH_SALES = [
  { id: "flash1", name: "Maggi Noodles Bundle", price: 120, discount: "40%", emoji: "🍜", badge: "50 left" },
  { id: "flash2", name: "Amul Milk 1L", price: 45, discount: "15%", emoji: "🥛", badge: "100 left" },
  { id: "flash3", name: "Tea Powder 250g", price: 95, discount: "30%", emoji: "🍵", badge: "75 left" },
  { id: "flash4", name: "Bread Pack", price: 35, discount: "20%", emoji: "🍞", badge: "200 left" },
];

const APP_FEATURES = [
  { icon: Rocket, title: "Lightning Fast", desc: "15-minute delivery guaranteed" },
  { icon: Target, title: "Always Accurate", desc: "Real-time tracking for every order" },
  { icon: Shield, title: "100% Safe", desc: "Quality checked & secure payments" },
];

const SEARCH_PILLS = ["Milk", "Amul Butter", "Paracetamol", "Cake", "Bread"];

const SIDEBAR_LINKS = [
  { icon: Home, label: "Home" },
  { icon: Grid, label: "All Categories" },
  { icon: Package, label: "My Orders" },
  { icon: Heart, label: "Wishlist" },
  { icon: Wallet, label: "Wallet" },
  { icon: Zap, label: "Offers" },
  { icon: User, label: "Profile" },
];

const ACTIVITY_MESSAGES = [
  "Rahul from Jhagriya just ordered Amul Milk — 1m ago",
  "Priya near you just booked a Home Service — 3m ago",
  "Someone in Bhopal just used code KWICK50 — 2m ago",
  "Aman from Jhagriya reordered Groceries — 4m ago",
];

const STORIES = [
  { label: "Flash Deals", emoji: "🔥", ring: "from-orange-500 to-rose-500" },
  { label: "10-Min Delivery", emoji: "⚡", ring: "from-amber-400 to-orange-500" },
  { label: "Local Bakeries", emoji: "🍰", ring: "from-pink-400 to-fuchsia-500" },
  { label: "24x7 Pharmacy", emoji: "💊", ring: "from-sky-400 to-blue-500" },
  { label: "Daily Spin", emoji: "🎁", ring: "from-emerald-400 to-teal-500" },
];

function getHeroTheme() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 11) {
    return {
      slot: "Morning",
      heading: "Fresh milk, mandi veggies & breakfast picks",
      sub: "Start the day right — delivered before your chai gets cold.",
      from: "from-amber-400 via-orange-400",
      to: "to-yellow-400",
      emoji: "🥛",
    };
  }
  if (hour >= 17 && hour < 21) {
    return {
      slot: "Evening",
      heading: "Chai, evening snacks & street food",
      sub: "The 5 o'clock craving, sorted in minutes.",
      from: "from-orange-500 via-red-400",
      to: "to-rose-500",
      emoji: "☕",
    };
  }
  if (hour >= 22 || hour < 5) {
    return {
      slot: "Late Night",
      heading: "Late night munchies & emergency medicines",
      sub: "Wide awake at this hour? So are we.",
      from: "from-indigo-700 via-blue-700",
      to: "to-slate-800",
      emoji: "🌙",
    };
  }
  return {
    slot: "Today",
    heading: "50% off on your first order",
    sub: "Use code KWICK50 at checkout — limited time offer for new users.",
    from: "from-orange-500 via-orange-500",
    to: "to-amber-400",
    emoji: "🛍️",
  };
}

const SPIN_REWARDS = [
  { id: "off20", label: "₹20 Off", detail: "On orders above ₹199", emoji: "💸", probability: 35, color: "#ea580c" },
  { id: "freedel", label: "Free Delivery", detail: "On orders above ₹149", emoji: "🚚", probability: 25, color: "#111827" },
  { id: "points50", label: "50 Points", detail: "Added to your wallet", emoji: "⭐", probability: 20, color: "#ea580c" },
  { id: "services10", label: "10% Off Services", detail: "Taxi, Bike Ride & Print", emoji: "🛎️", probability: 10, color: "#111827" },
  { id: "off50", label: "Flat ₹50 Off", detail: "On orders above ₹399", emoji: "🎉", probability: 7, color: "#ea580c" },
  { id: "retry", label: "Better Luck Tomorrow", detail: "+10 points as a consolation gift", emoji: "🍀", probability: 3, color: "#111827" },
];

const WHEEL_SEGMENTS = ["off20", "freedel", "points50", "off20", "services10", "freedel", "off50", "retry"];

function pickWeightedReward() {
  const total = SPIN_REWARDS.reduce((s, r) => s + r.probability, 0);
  let roll = Math.random() * total;
  for (const r of SPIN_REWARDS) {
    if (roll < r.probability) return r.id;
    roll -= r.probability;
  }
  return SPIN_REWARDS[0].id;
}

const PLANS = [
  {
    id: "lite",
    name: "Kwick Lite",
    price: "₹49",
    period: "/month",
    perks: ["Free delivery on orders > ₹149", "2% cashback as Wallet Coins"],
  },
  {
    id: "max",
    name: "Kwick Max",
    price: "₹119",
    period: "/3 months",
    note: "₹39/mo",
    perks: ["0 delivery fee on orders > ₹99", "Extra 5% off on groceries", "Priority 15-min dispatch"],
  },
  {
    id: "vip",
    name: "Kwick VIP",
    price: "₹399",
    period: "/year",
    best: true,
    perks: ["Unlimited free delivery", "1 free Pick & Drop / month", "2x reward points", "Zero surge pricing"],
  },
];

/* ================================================================== */
/* HELPERS                                                             */
/* ================================================================== */

function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return { h, m, s };
}

function HorizontalScroller({ children }) {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  return (
    <div className="relative group">
      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className="hidden group-hover:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:text-orange-600"
      >
        <ChevronLeft size={16} />
      </button>
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className="hidden group-hover:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:text-orange-600"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function StoryRow({ onOpen }) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {STORIES.map((s) => (
        <button
          key={s.label}
          onClick={() => onOpen(s.label)}
          className="flex flex-col items-center gap-1.5 shrink-0"
        >
          <span className={`story-ring w-16 h-16 rounded-full bg-gradient-to-br ${s.ring} p-[2.5px]`}>
            <span className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
              {s.emoji}
            </span>
          </span>
          <span className="text-[11px] font-medium text-gray-600 text-center w-16 truncate">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

function ProductCard({ product, qty, onAdd, onInc, onDec, wished, onToggleWish, size = "md" }) {
  const [pop, setPop] = useState(false);
  const width = size === "sm" ? "w-32" : "w-40";

  const triggerPop = () => {
    setPop(true);
    setTimeout(() => setPop(false), 280);
    onToggleWish(product.id);
  };

  return (
    <div className={`relative shrink-0 ${width} bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}>
      {product.badge && (
        <span
          className="absolute -top-2 -left-2 z-10 text-[9px] font-bold text-white px-2 py-1 rounded-full shadow-md"
          style={{ background: "linear-gradient(135deg,#fb923c,#ea580c)" }}
        >
          {product.badge === "15 MINS" ? "⚡ 15 MINS" : product.badge === "BESTSELLER" ? "🔥 BESTSELLER" : `🏷️ ${product.badge}`}
        </span>
      )}
      <button
        onClick={triggerPop}
        aria-label="Toggle wishlist"
        className="absolute top-2.5 right-2.5 z-10"
      >
        <Heart
          size={16}
          className={`transition-colors ${wished ? "fill-rose-500 text-rose-500" : "text-gray-300"} ${pop ? "heart-pop" : ""}`}
        />
      </button>

      <div className="flex items-center justify-between pr-4">
        <span className="text-3xl">{product.emoji}</span>
        {product.tag && (
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            {product.tag}
          </span>
        )}
      </div>
      <p className="text-sm font-medium mt-3 leading-tight truncate">{product.name}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="font-semibold">₹{product.price}</span>
        {qty > 0 ? (
          <div className="flex items-center gap-2 bg-orange-500 rounded-full px-1.5 py-1 cart-pop">
            <button onClick={() => onDec(product.id)} className="text-white w-5 h-5 flex items-center justify-center">
              <Minus size={12} />
            </button>
            <span className="text-white text-xs font-semibold w-4 text-center">{qty}</span>
            <button onClick={() => onInc(product.id)} className="text-white w-5 h-5 flex items-center justify-center">
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(product)}
            className="text-xs font-semibold text-white bg-orange-500 rounded-full px-3 py-1 hover:bg-orange-600 transition-colors"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}

function TrackingModal({ onClose }) {
  const { m, s } = useCountdown(12 * 60);
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X size={18} />
        </button>
        <p className="text-sm text-gray-400">Live Tracking</p>
        <h3 className="text-xl font-bold mt-0.5">MediPlus Order</h3>
        <p className="text-orange-500 font-semibold mt-1">
          Arriving in {m}:{s}
        </p>

        <div className="mt-6 space-y-0">
          {TRACKING_STEPS.map((step, i) => {
            const done = i <= CURRENT_TRACKING_STEP;
            const isLast = i === TRACKING_STEPS.length - 1;
            return (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {done ? (
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  ) : (
                    <Circle size={20} className="text-gray-300" />
                  )}
                  {!isLast && <div className={`w-0.5 flex-1 min-h-[28px] ${done ? "bg-emerald-300" : "bg-gray-200"}`} />}
                </div>
                <div className="pb-6">
                  <p className={`text-sm font-medium ${done ? "text-gray-900" : "text-gray-400"}`}>{step.label}</p>
                  <p className="text-xs text-gray-400">{step.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3 text-sm">
          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">🛵</div>
          <div>
            <p className="font-medium">Vikram is on the way</p>
            <p className="text-xs text-gray-400">Delivery partner · 4.8 ★</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentModal({ plan, onClose, onSuccess }) {
  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    if (field === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    }
    if (field === "expiry") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
    }
    if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }

    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setError("");

    if (!cardDetails.cardName.trim()) {
      setError("Cardholder name required");
      return;
    }
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Valid 16-digit card number required");
      return;
    }
    if (!cardDetails.expiry || cardDetails.expiry.length !== 5) {
      setError("Valid expiry (MM/YY) required");
      return;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      setError("Valid 3-digit CVV required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(plan.id);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X size={18} />
        </button>

        <div>
          <h3 className="text-xl font-bold">Complete Payment</h3>
          <p className="text-gray-500 text-sm mt-1">Subscribe to {plan.name}</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Plan:</span>
            <span className="font-semibold">{plan.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Period:</span>
            <span className="font-semibold">{plan.period}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold text-orange-500">{plan.price}</span>
          </div>
        </div>

        <div className="space-y-3 mt-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Cardholder Name</label>
            <input
              type="text"
              value={cardDetails.cardName}
              onChange={(e) => handleInputChange("cardName", e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-300 outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry</label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) => handleInputChange("expiry", e.target.value)}
                placeholder="MM/YY"
                maxLength="5"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">CVV</label>
              <input
                type="password"
                value={cardDetails.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                placeholder="123"
                maxLength="3"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-300 outline-none"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
          💳 Test card: 4111 1111 1111 1111 | Any future date | Any CVV
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-5 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>Pay {plan.price}</>
          )}
        </button>

        <p className="text-[11px] text-gray-400 text-center mt-3">
          🔒 Secure payment. Your card details are encrypted.
        </p>
      </div>
    </div>
  );
}

function MembershipModal({ onClose, onSelectPlan, currentPlan }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4 py-8 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-3xl p-6 sm:p-8 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
          <X size={18} />
        </button>

        <div className="flex items-center gap-2">
          <Crown size={20} className="text-orange-500" />
          <h3 className="text-xl font-bold">Kwick Pro Membership</h3>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Free delivery, faster dispatch, and more rewards — pick the plan that fits how often you order.
        </p>

        <div className="mt-4 bg-orange-50 border border-orange-100 rounded-2xl p-3 text-sm text-orange-700 flex items-center gap-2">
          <Sparkles size={15} /> New users get a 7-day free trial of Kwick Lite — cancel anytime.
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-5 flex flex-col ${
                plan.best ? "border-orange-400 shadow-md" : "border-gray-100"
              }`}
            >
              {plan.best && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-semibold px-3 py-1 rounded-full">
                  BEST VALUE
                </span>
              )}
              <p className="font-semibold">{plan.name}</p>
              <p className="mt-1">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </p>
              {plan.note && <p className="text-xs text-emerald-600 font-medium">{plan.note}</p>}
              <ul className="mt-4 space-y-2 flex-1">
                {plan.perks.map((perk) => (
                  <li key={perk} className="text-xs text-gray-600 flex items-start gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {perk}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectPlan(plan.id)}
                className={`mt-4 w-full py-2 rounded-xl text-sm font-semibold transition-colors ${
                  currentPlan === plan.id
                    ? "bg-emerald-50 text-emerald-600"
                    : plan.best
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {currentPlan === plan.id ? "Current Plan" : "Join"}
              </button>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 mt-5 leading-relaxed">
          Members who order 3–4 times a month typically recover their subscription cost within the first
          couple of orders through waived delivery fees and cashback.
        </p>
      </div>
    </div>
  );
}

function SpinWheelModal({ onClose, isPro, spinsUsed, onSpinUsed }) {
  const spinsAllowed = isPro ? 2 : 1;
  const spinsLeft = Math.max(0, spinsAllowed - spinsUsed);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [coupon, setCoupon] = useState(null);

  const segAngle = 360 / WHEEL_SEGMENTS.length;

  const beep = (freq = 440, dur = 0.05) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch (e) {}
  };

  const spin = () => {
    if (spinning || spinsLeft <= 0) return;
    setResult(null);
    setSpinning(true);
    beep(300, 0.08);

    const rewardId = pickWeightedReward();
    const candidateIndices = WHEEL_SEGMENTS.map((id, i) => (id === rewardId ? i : -1)).filter((i) => i >= 0);
    const segmentIndex = candidateIndices[Math.floor(Math.random() * candidateIndices.length)];

    const targetAngleWithinCircle = 360 - (segmentIndex * segAngle + segAngle / 2);
    const extraSpins = 5 * 360;
    const newRotation = rotation - (rotation % 360) + extraSpins + targetAngleWithinCircle;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const reward = SPIN_REWARDS.find((r) => r.id === rewardId);
      setResult(reward);
      if (reward.id !== "retry") {
        const code = `KWICK${reward.id.toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;
        const expiry = new Date(Date.now() + 6 * 60 * 60 * 1000);
        setCoupon({ code, expiryLabel: expiry.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
        beep(880, 0.12);
        if (navigator.vibrate) navigator.vibrate([40, 30, 60]);
      } else {
        beep(200, 0.15);
      }
      onSpinUsed();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="rounded-3xl w-full max-w-sm p-6 relative overflow-hidden text-white"
        style={{ background: "linear-gradient(180deg, #1c1917, #0c0a09)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white z-20">
          <X size={18} />
        </button>

        {!result && (
          <>
            <p className="text-center text-xs text-orange-400 font-semibold tracking-wide">DAILY SPIN</p>
            <h3 className="text-center text-xl font-bold mt-1">Spin & Win Instant Rewards</h3>
            <p className="text-center text-xs text-white/50 mt-1">
              {spinsLeft > 0 ? `${spinsLeft} spin${spinsLeft > 1 ? "s" : ""} left today` : "Come back tomorrow for more spins"}
              {isPro && <span className="text-orange-400"> · Kwick Pro: 2 spins/day</span>}
            </p>

            <div className="relative w-64 h-64 mx-auto mt-6">
              <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-20 text-2xl drop-shadow">🔻</div>
              <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 0 6px #d97706, 0 0 20px rgba(217,119,6,0.5)" }} />
              <div
                className="absolute inset-1.5 rounded-full overflow-hidden"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
                  background: `conic-gradient(${WHEEL_SEGMENTS.map((id, i) => {
                    const r = SPIN_REWARDS.find((x) => x.id === id);
                    return `${r.color} ${i * segAngle}deg ${(i + 1) * segAngle}deg`;
                  }).join(", ")})`,
                }}
              >
                {WHEEL_SEGMENTS.map((id, i) => {
                  const r = SPIN_REWARDS.find((x) => x.id === id);
                  const midAngle = i * segAngle + segAngle / 2;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 flex justify-center"
                      style={{ transform: `rotate(${midAngle}deg)` }}
                    >
                      <span className="mt-3 text-lg drop-shadow" style={{ transform: `rotate(${-midAngle}deg)` }}>
                        {r.emoji}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-gray-900 border-4 border-amber-500 flex items-center justify-center text-lg z-10">
                🎯
              </div>
            </div>

            <button
              onClick={spin}
              disabled={spinning || spinsLeft <= 0}
              className={`mt-6 w-full py-3 rounded-full font-semibold text-sm transition-colors ${
                spinning || spinsLeft <= 0
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {spinsLeft <= 0 ? "No spins left today" : spinning ? "Spinning..." : "Spin Now"}
            </button>
          </>
        )}

        {result && (
          <div className="text-center py-4 relative">
            {result.id !== "retry" && (
              <div className="pointer-events-none absolute inset-0 confetti-wrap">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="confetti-piece"
                    style={{
                      left: `${(i * 37) % 100}%`,
                      background: i % 2 ? "#f97316" : "#facc15",
                      animationDelay: `${(i % 6) * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            )}
            <span className="text-5xl">{result.emoji}</span>
            <h3 className="text-xl font-bold mt-3">{result.label}</h3>
            <p className="text-sm text-white/60 mt-1">{result.detail}</p>

            {coupon ? (
              <>
                <div className="mt-5 bg-white/5 border border-dashed border-orange-400 rounded-2xl py-3 px-4">
                  <p className="text-lg font-mono font-bold tracking-wider text-orange-400">{coupon.code}</p>
                  <p className="text-[11px] text-white/50 mt-1">Valid till {coupon.expiryLabel} today</p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-5 w-full py-3 rounded-full font-semibold text-sm bg-orange-500 hover:bg-orange-600 transition-colors"
                >
                  Apply Coupon & Shop Now
                </button>
              </>
            ) : (
              <button onClick={onClose} className="mt-5 w-full py-3 rounded-full font-semibold text-sm bg-white/10 hover:bg-white/15 transition-colors">
                Okay, got it
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CustomerHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userLocation, setUserLocation } = useAppContext();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("shopping");
  const [orderVisible, setOrderVisible] = useState(true);
  const [showTracking, setShowTracking] = useState(false);
  const [showMembership, setShowMembership] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState(null);
  const [proPlan, setProPlan] = useState(null);
  const [planExpiry, setPlanExpiry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const [wished, setWished] = useState({});
  const [toastIndex, setToastIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [showSpin, setShowSpin] = useState(false);
  const [spinsUsed, setSpinsUsed] = useState(0);
  const [highlightedPartner, setHighlightedPartner] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const searchRef = useRef(null);
  const partnersRef = useRef(null);

  const { h, m, s } = useCountdown(2 * 3600 + 15 * 60);

  const addToCart = (product) => setCart((c) => ({ ...c, [product.id]: 1 }));
  const inc = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  const toggleWish = (id) => setWished((w) => ({ ...w, [id]: !w[id] }));

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const handlePillClick = (term) => {
    setSearchQuery(term);
    setTimeout(() => searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const handleStoryOpen = (label) => {
    if (label === "Daily Spin") {
      setShowSpin(true);
      return;
    }
    if (label === "Local Bakeries") {
      setHighlightedPartner("Mishra Cake & Bakery");
      setTimeout(() => partnersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      setTimeout(() => setHighlightedPartner(null), 4000);
      return;
    }
    setSearchQuery(label.split(" ")[0]);
    setTimeout(() => searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const heroTheme = useMemo(() => getHeroTheme(), []);

  const FREE_DELIVERY_THRESHOLD = 149;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);
  const freeDeliveryProgress = Math.min(100, Math.round((cartTotal / FREE_DELIVERY_THRESHOLD) * 100));

  useEffect(() => {
    const id = setInterval(() => {
      setToastVisible(false);
      setTimeout(() => {
        setToastIndex((i) => (i + 1) % ACTIVITY_MESSAGES.length);
        setToastVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const handleSelectPlan = (planId) => {
    const plan = PLANS.find((p) => p.id === planId);
    setSelectedPlanForPayment(plan);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (planId) => {
    setProPlan(planId);
    setShowPayment(false);
    setShowMembership(false);

    const expiryDate = new Date();
    if (planId === "lite") expiryDate.setMonth(expiryDate.getMonth() + 1);
    else if (planId === "max") expiryDate.setMonth(expiryDate.getMonth() + 3);
    else if (planId === "vip") expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    setPlanExpiry(expiryDate);

    setSuccessMessage(`✅ ${PLANS.find((p) => p.id === planId)?.name} activated successfully!`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const reorderProducts = PRODUCTS.filter((p) => p.section === "reorder");
  const trendingProducts = PRODUCTS.filter((p) => p.section === "trending");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <style>{`
        @keyframes heartPop { 0% { transform: scale(1); } 40% { transform: scale(1.5); } 100% { transform: scale(1); } }
        .heart-pop { animation: heartPop 0.28s ease-out; }
        @keyframes cartPop { 0% { transform: scale(0.85); opacity: 0.6; } 100% { transform: scale(1); opacity: 1; } }
        .cart-pop { animation: cartPop 0.18s ease-out; }
        @keyframes toastSlide { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .toast-in { animation: toastSlide 0.35s ease-out; }
        @keyframes ringPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(251,146,60,0.35); } 50% { box-shadow: 0 0 0 4px rgba(251,146,60,0.15); } }
        .story-ring { animation: ringPulse 2.2s ease-in-out infinite; }
        @keyframes sparkleBurst { 0% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.25) rotate(15deg); } 100% { transform: scale(1) rotate(0deg); } }
        .sparkle-burst { animation: sparkleBurst 0.4s ease-out; }
        @keyframes cartSlideIn { from { transform: translateY(16px) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        .cart-slide-in { animation: cartSlideIn 0.3s ease-out; }
        @keyframes confettiFall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(220px) rotate(360deg); opacity: 0; } }
        .confetti-wrap { overflow: hidden; }
        .confetti-piece { position: absolute; top: 0; width: 8px; height: 8px; border-radius: 2px; animation: confettiFall 1.4s ease-in forwards; }
        @keyframes partnerGlow { 0%, 100% { box-shadow: 0 0 0 0 rgba(234,88,12,0.4); } 50% { box-shadow: 0 0 0 6px rgba(234,88,12,0.15); } }
        .partner-highlight { animation: partnerGlow 1.2s ease-in-out 3; border-color: #ea580c !important; }
      `}</style>

      {orderVisible && (
        <div className="sticky top-0 z-50 bg-gray-900 text-white text-sm">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Truck size={15} className="text-orange-400 shrink-0" />
              <span className="truncate">
                <strong>{ACTIVE_ORDER.name}</strong> order arriving in <strong>{ACTIVE_ORDER.eta} mins</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowTracking(true)}
                className="text-orange-400 font-medium hover:text-orange-300 flex items-center gap-1"
              >
                Track Live <ChevronRight size={14} />
              </button>
              <button onClick={() => setOrderVisible(false)} aria-label="Dismiss" className="text-gray-400 hover:text-white">
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-gray-100 sticky z-40" style={{ top: orderVisible ? "34px" : 0 }}>
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen((o) => !o)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" aria-label="Toggle sidebar">
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold shadow-sm">K</div>
              <span className="text-xl font-bold text-orange-500">Kwick</span>
            </div>

            <div className="hidden md:flex items-center gap-1 border border-gray-200 rounded-full px-3 py-1.5 text-sm shrink-0">
              <MapPin size={14} className="text-orange-500" />
              <span className="font-medium">Jhagriya, Bhopal...</span>
              <ChevronDown size={14} className="text-gray-400" />
              <span className="ml-1 pl-2 border-l border-gray-200 text-emerald-600 font-semibold flex items-center gap-1">
                <Zap size={12} /> 15-20 min
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-orange-300">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, shops, services..."
                  className="bg-transparent outline-none text-sm flex-1 min-w-0"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                )}
                <Mic size={16} className="text-orange-500" />
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-5 text-sm font-medium shrink-0">
              <span className="text-orange-500">Home</span>
              <span className="text-gray-600 hover:text-orange-500 cursor-pointer">Categories</span>
              <span className="text-gray-600 hover:text-orange-500 cursor-pointer">Orders</span>
              <span className="text-gray-600 hover:text-orange-500 cursor-pointer">Offers</span>
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <button className="relative p-2 text-gray-600 hover:text-orange-500">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              <button className="relative p-2 text-gray-600 hover:text-orange-500">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-orange-500">
                <Heart size={18} />
              </button>
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">U</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 mt-2 overflow-x-auto [scrollbar-width:none]">
            <span className="text-xs text-gray-400 shrink-0">Popular:</span>
            {SEARCH_PILLS.map((p) => (
              <button
                key={p}
                onClick={() => handlePillClick(p)}
                className={`text-xs shrink-0 px-2.5 py-1 rounded-full border transition-colors ${
                  searchQuery === p
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-gray-50 border-gray-200 hover:border-orange-300 hover:text-orange-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-50">
            <StoryRow onOpen={handleStoryOpen} />
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto flex">
        <aside className={`hidden md:block shrink-0 border-r border-gray-100 bg-white transition-all duration-200 ${sidebarOpen ? "w-56 px-4" : "w-16 px-2"} py-6`}>
          <nav className="space-y-1">
            {SIDEBAR_LINKS.map((link, i) => (
              <button
                key={link.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  i === 0 ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"
                }`}
                title={link.label}
              >
                <link.icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{link.label}</span>}
              </button>
            ))}
          </nav>

          <div
            className="mt-8 rounded-2xl p-4 border border-orange-100"
            style={{ background: "linear-gradient(135deg, rgba(255,237,213,0.8), rgba(254,215,170,0.5))", backdropFilter: "blur(6px)" }}
          >
            <div className="flex items-center gap-1.5">
              <Crown size={15} className="text-orange-500" />
              {sidebarOpen && <p className="font-semibold text-sm">Kwick Pro</p>}
            </div>
            {sidebarOpen && <p className="text-xs text-gray-500 mt-1">Free delivery + exclusive deals</p>}
            <button
              onClick={() => setShowMembership(true)}
              className="mt-3 w-full bg-orange-500 text-white text-sm font-semibold py-2 rounded-xl hover:bg-orange-600 transition-colors"
            >
              {sidebarOpen ? (proPlan ? "Manage Plan" : "Upgrade") : "→"}
            </button>
          </div>
        </aside>

        <main className="flex-1 min-w-0 px-4 py-6 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 pb-28">
          <div className="min-w-0 space-y-8">
            <div>
              <p className="text-gray-400 text-sm">Good morning 👋</p>
              <h1 className="text-3xl font-bold mt-1">
                Welcome back, <span className="text-orange-500">Rahul</span>
              </h1>
              <p className="text-gray-500 mt-1">What do you want to get delivered today?</p>
            </div>

            {/* HERO */}
            <div className={`rounded-3xl bg-gradient-to-br ${heroTheme.from} ${heroTheme.to} text-white p-8 relative overflow-hidden transition-colors duration-500`}>
              <div className="absolute -right-6 -bottom-10 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute right-8 top-8 hidden sm:block select-none pointer-events-none">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-white/15 rounded-[2rem] rotate-6 shadow-xl" />
                  <div className="absolute inset-2 bg-white/25 rounded-[1.8rem] -rotate-3 flex items-center justify-center text-6xl">
                    {heroTheme.emoji}
                  </div>
                  <span className="absolute -top-3 -left-3 text-3xl drop-shadow">🥦</span>
                  <span className="absolute -bottom-2 -right-2 text-3xl drop-shadow">🍞</span>
                  <span className="absolute top-1/2 -right-6 text-3xl drop-shadow">🍎</span>
                </div>
              </div>

              <span className="inline-block text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-4 relative">
                {heroTheme.slot.toUpperCase()} PICK
              </span>
              <h2 className="text-3xl font-bold leading-snug max-w-md relative">{heroTheme.heading}</h2>
              <p className="text-sm text-white/90 mt-3 max-w-sm relative">{heroTheme.sub}</p>
              <button className="mt-5 bg-white text-orange-600 font-semibold px-5 py-2.5 rounded-full flex items-center gap-1 relative hover:bg-orange-50 transition-colors">
                Shop Now <ChevronRight size={16} />
              </button>

              <div className="mt-6 inline-flex items-center gap-2 bg-black/20 rounded-full px-4 py-2 text-sm relative">
                <Clock size={14} />
                <span>Flash sale ends in</span>
                <span className="font-mono font-semibold">{h}:{m}:{s}</span>
              </div>
            </div>

            {/* FLASH SALES */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame size={18} className="text-red-500" />
                  <h3 className="text-lg font-semibold">⚡ Flash Sales</h3>
                </div>
                <button className="text-orange-500 text-sm font-medium flex items-center gap-1">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FLASH_SALES.map((item) => (
                  <div key={item.id} className="bg-white border border-red-200 rounded-2xl p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-xs font-bold bg-red-500 text-white px-2 py-1 rounded-full">{item.discount}</span>
                    </div>
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <div className="flex items-end justify-between mt-3">
                      <p className="font-bold text-orange-600">₹{item.price}</p>
                      <span className="text-[10px] text-gray-500">{item.badge}</span>
                    </div>
                    <button className="mt-2 w-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold py-1.5 rounded-lg transition-colors">
                      Grab Deal
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* MEGA DEALS */}
            <section>
              <h3 className="text-lg font-semibold mb-3">🎁 Mega Deals</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {MEGA_DEALS.map((deal) => (
                  <div
                    key={deal.id}
                    className={`rounded-2xl bg-gradient-to-br ${deal.from} ${deal.to} text-white p-6 relative overflow-hidden cursor-pointer hover:shadow-lg transition-all min-h-[150px] flex flex-col justify-between`}
                  >
                    <div>
                      <div className="absolute -right-8 -top-8 text-6xl opacity-20">{deal.emoji}</div>
                      <p className="font-bold text-xl relative">{deal.title}</p>
                      <p className="text-xs text-white/80 mt-1">{deal.subtitle}</p>
                    </div>
                    <div className="flex items-center justify-between relative">
                      <button className="bg-white/20 hover:bg-white/30 border border-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                        Shop Now
                      </button>
                      <span className="text-[10px] bg-black/30 px-2 py-1 rounded-full">{deal.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SEARCH RESULTS */}
            <section ref={searchRef}>
              {filtered && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">
                      {filtered.length > 0 ? `Results for "${searchQuery}"` : `No results for "${searchQuery}"`}
                    </h3>
                    <button onClick={() => setSearchQuery("")} className="text-orange-500 text-sm font-medium">
                      Clear
                    </button>
                  </div>
                  {filtered.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {filtered.map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          qty={cart[p.id] || 0}
                          onAdd={addToCart}
                          onInc={inc}
                          onDec={dec}
                          wished={!!wished[p.id]}
                          onToggleWish={toggleWish}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </section>

            {!filtered && (
              <>
                {/* BUY AGAIN */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Buy Again</h3>
                    <button className="text-orange-500 text-sm font-medium flex items-center gap-1">
                      View All <ChevronRight size={14} />
                    </button>
                  </div>
                  <HorizontalScroller>
                    {reorderProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        size="sm"
                        qty={cart[p.id] || 0}
                        onAdd={addToCart}
                        onInc={inc}
                        onDec={dec}
                        wished={!!wished[p.id]}
                        onToggleWish={toggleWish}
                      />
                    ))}
                  </HorizontalScroller>
                </section>

                {/* TRENDING */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Trending in Jhagriya</h3>
                    <button className="text-orange-500 text-sm font-medium flex items-center gap-1">
                      View All <ChevronRight size={14} />
                    </button>
                  </div>
                  <HorizontalScroller>
                    {trendingProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        qty={cart[p.id] || 0}
                        onAdd={addToCart}
                        onInc={inc}
                        onDec={dec}
                        wished={!!wished[p.id]}
                        onToggleWish={toggleWish}
                      />
                    ))}
                  </HorizontalScroller>
                </section>

                {/* BRANDS */}
                <section>
                  <h3 className="text-lg font-semibold mb-3">⭐ Featured Brands</h3>
                  <HorizontalScroller>
                    {BRANDS.map((brand) => (
                      <div key={brand.name} className="shrink-0 w-32 bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer">
                        <span className="text-4xl">{brand.emoji}</span>
                        <p className="text-sm font-semibold text-center text-gray-700">{brand.name}</p>
                      </div>
                    ))}
                  </HorizontalScroller>
                </section>

                {/* CATEGORIES */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Browse Categories</h3>
                    <button className="text-orange-500 text-sm font-medium flex items-center gap-1">
                      View All <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="inline-flex bg-gray-100 rounded-full p-1 mb-4">
                    <button
                      onClick={() => setActiveTab("shopping")}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeTab === "shopping" ? "bg-white shadow-sm text-orange-600" : "text-gray-500"
                      }`}
                    >
                      Daily Essentials
                    </button>
                    <button
                      onClick={() => setActiveTab("services")}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeTab === "services" ? "bg-white shadow-sm text-orange-600" : "text-gray-500"
                      }`}
                    >
                      Services & Logistics
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {(activeTab === "shopping" ? SHOPPING_CATEGORIES : SERVICE_CATEGORIES).map((c) => (
                      <div
                        key={c.name}
                        className={`bg-gradient-to-b ${c.from} ${c.to} border border-white rounded-2xl py-5 flex flex-col items-center gap-2 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 cursor-pointer`}
                      >
                        <span className="text-3xl drop-shadow-sm">{c.emoji}</span>
                        <span className="text-xs font-semibold text-gray-700 text-center px-1">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* CURATED BANNERS */}
                <section>
                  <h3 className="text-lg font-semibold mb-3">Curated For You</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {CURATED_BANNERS.map((b) => (
                      <div
                        key={b.title}
                        className={`rounded-2xl bg-gradient-to-br ${b.from} ${b.to} text-white p-5 relative overflow-hidden cursor-pointer hover:brightness-105 transition-all min-h-[130px] flex flex-col justify-between`}
                      >
                        <span className="text-4xl">{b.emoji}</span>
                        <div>
                          <p className="font-semibold leading-tight">{b.title}</p>
                          <p className="text-xs text-white/80 mt-0.5">{b.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* LOCAL PARTNERS */}
                <section ref={partnersRef}>
                  <h3 className="text-lg font-semibold mb-3">Popular Stores in Jhagriya</h3>
                  <HorizontalScroller>
                    {LOCAL_PARTNERS.map((shop) => (
                      <div
                        key={shop.name}
                        className={`shrink-0 w-56 bg-white border rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow ${
                          highlightedPartner === shop.name ? "border-orange-400 partner-highlight" : "border-gray-100"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0">
                          {shop.emoji}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{shop.name}</p>
                          <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full inline-block mt-1">
                            {shop.tag}
                          </span>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <Star size={11} className="fill-amber-400 text-amber-400" /> {shop.rating}
                          </p>
                        </div>
                      </div>
                    ))}
                  </HorizontalScroller>
                </section>

                {/* TESTIMONIALS */}
                <section>
                  <h3 className="text-lg font-semibold mb-3">💬 What Users Say</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {TESTIMONIALS.map((review, idx) => (
                      <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all">
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 italic mb-3">"{review.text}"</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{review.avatar}</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                            <p className="text-xs text-gray-400">Verified Buyer</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* APP FEATURES */}
                <section>
                  <h3 className="text-lg font-semibold mb-3">Why Choose Kwick?</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {APP_FEATURES.map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <div key={idx} className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 text-center hover:shadow-md transition-all">
                          <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-3">
                            <Icon size={20} />
                          </div>
                          <p className="font-semibold text-gray-900">{feature.title}</p>
                          <p className="text-xs text-gray-600 mt-1.5">{feature.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* NEWSLETTER */}
                <section>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10 max-w-xl">
                      <h3 className="text-2xl font-bold">Get Exclusive Deals in Your Inbox</h3>
                      <p className="text-white/80 mt-2">Subscribe to our newsletter for special offers, tips, and early access to flash sales.</p>
                      <div className="flex gap-2 mt-4">
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="flex-1 px-4 py-2.5 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors">
                          <Send size={16} /> Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* HELP SECTION */}
                <section>
                  <h3 className="text-lg font-semibold mb-3">📞 Need Help?</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg">❓</div>
                        <div>
                          <p className="font-semibold text-gray-900">FAQs & Support</p>
                          <p className="text-xs text-gray-600 mt-1">Browse our complete help center</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 ml-auto shrink-0" />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">💬</div>
                        <div>
                          <p className="font-semibold text-gray-900">Live Chat Support</p>
                          <p className="text-xs text-gray-600 mt-1">Chat with our agents 24/7</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 ml-auto shrink-0" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* FOOTER */}
                <section className="pb-12">
                  <div className="bg-gray-900 text-white rounded-3xl p-8">
                    <div className="grid sm:grid-cols-3 gap-8 mb-8">
                      <div>
                        <p className="font-semibold mb-3 flex items-center gap-2">
                          <Rocket size={16} className="text-orange-500" /> Company
                        </p>
                        <ul className="space-y-2 text-xs text-white/70">
                          <li><a href="#" className="hover:text-white">About Us</a></li>
                          <li><a href="#" className="hover:text-white">Career</a></li>
                          <li><a href="#" className="hover:text-white">Blog</a></li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-3 flex items-center gap-2">
                          <Shield size={16} className="text-orange-500" /> Legal
                        </p>
                        <ul className="space-y-2 text-xs text-white/70">
                          <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                          <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                          <li><a href="#" className="hover:text-white">Refund Policy</a></li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp size={16} className="text-orange-500" /> Connect
                        </p>
                        <ul className="space-y-2 text-xs text-white/70">
                          <li><a href="#" className="hover:text-white">Instagram</a></li>
                          <li><a href="#" className="hover:text-white">Facebook</a></li>
                          <li><a href="#" className="hover:text-white">Twitter</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-6 text-xs text-white/50 text-center">
                      <p>© 2026 Kwick Delivery. All rights reserved. Made with ❤️ in India.</p>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">
            <div
              className="rounded-3xl text-white p-5 relative overflow-hidden border border-white/20"
              style={{
                background: "linear-gradient(135deg, rgba(56,132,255,0.95), rgba(30,64,175,0.95))",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
              <p className="text-sm text-white/80 relative">Kwick Wallet</p>
              <p className="text-3xl font-bold mt-1 relative">₹1,240</p>
              <p className="text-xs text-white/70 mt-0.5 relative">Available balance</p>
              <div className="flex gap-2 mt-4 relative">
                <button className="flex-1 bg-white/15 hover:bg-white/25 border border-white/20 transition-colors text-sm font-medium rounded-xl py-2">Add Money</button>
                <button className="flex-1 bg-white/15 hover:bg-white/25 border border-white/20 transition-colors text-sm font-medium rounded-xl py-2">Transfer</button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">Recent Orders</p>
                <span className="text-orange-500 text-sm font-medium cursor-pointer">All</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">🛒</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Fresh Basket</p>
                    <p className="text-xs text-gray-400 truncate">Milk, Eggs, Bread</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">₹187</p>
                    <p className="text-xs text-emerald-600">Delivered</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">💊</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">MediPlus</p>
                    <p className="text-xs text-gray-400 truncate">Vitamin D, Zinc</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">₹349</p>
                    <button onClick={() => setShowTracking(true)} className="text-xs text-orange-500 font-medium hover:underline">
                      In Transit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Reward Points</p>
                <Gift size={18} className="text-orange-500" />
              </div>
              <p className="text-2xl font-bold mt-2">2,480 <span className="text-sm font-normal text-gray-400">pts</span></p>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-700" style={{ width: "72%" }} />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">520 pts away from Gold tier 🏅</p>
              <button
                onClick={(e) => {
                  const el = e.currentTarget.querySelector(".sparkle-icon");
                  el?.classList.remove("sparkle-burst");
                  void el?.offsetWidth;
                  el?.classList.add("sparkle-burst");
                }}
                className="mt-4 w-full flex items-center justify-center gap-1.5 bg-orange-50 text-orange-600 font-semibold text-sm py-2.5 rounded-xl hover:bg-orange-100 transition-colors"
              >
                <Sparkles size={14} className="sparkle-icon" /> Redeem for Discount
              </button>
            </div>

            <div className="rounded-3xl p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
              {proPlan ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <Flame size={16} className="text-orange-400" />
                    <p className="font-semibold text-sm">Kwick Pro Savings</p>
                  </div>
                  <p className="text-2xl font-bold mt-2">₹480 saved</p>
                  <p className="text-xs text-white/60 mt-1">this month with your {PLANS.find((p) => p.id === proPlan)?.name} plan</p>
                  {planExpiry && (
                    <p className="text-xs text-orange-300 mt-2 font-medium">
                      ✓ Valid until {planExpiry.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <Crown size={16} className="text-orange-400" />
                    <p className="font-semibold text-sm">Join Kwick Pro</p>
                  </div>
                  <p className="text-xs text-white/70 mt-1.5">
                    Members save an average of ₹480/month on delivery fees and get priority dispatch.
                  </p>
                  <button
                    onClick={() => setShowMembership(true)}
                    className="mt-3 w-full bg-orange-500 hover:bg-orange-600 transition-colors text-sm font-semibold py-2 rounded-xl"
                  >
                    Start 7-day free trial
                  </button>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-24 z-40 w-[92%] sm:w-80 cart-slide-in">
          <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShoppingCart size={16} className="text-orange-400" />
                <span>{cartCount} Items | ₹{cartTotal}</span>
              </div>
              <button className="text-xs font-semibold bg-white text-gray-900 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1">
                View Cart & Pay <ChevronRight size={12} />
              </button>
            </div>

            {proPlan || cartTotal >= FREE_DELIVERY_THRESHOLD ? (
              <p className="text-xs text-emerald-400 font-medium mt-2.5">✓ Free delivery applied</p>
            ) : (
              <div className="mt-2.5">
                <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500" style={{ width: `${freeDeliveryProgress}%` }} />
                </div>
                <p className="text-[11px] text-white/70 mt-1.5">
                  Add ₹{amountToFreeDelivery} more to unlock <span className="text-orange-300 font-medium">FREE delivery</span>
                </p>
              </div>
            )}

            {!proPlan && (
              <button
                onClick={() => setShowMembership(true)}
                className="mt-2.5 w-full text-xs bg-orange-500 hover:bg-orange-600 transition-colors font-semibold py-1.5 rounded-full"
              >
                Or save it instantly — Join Kwick Pro ₹49
              </button>
            )}
          </div>
        </div>
      )}

      <div
        className={`fixed bottom-4 left-4 z-30 max-w-xs bg-white border border-gray-100 shadow-lg rounded-2xl px-4 py-3 text-xs text-gray-600 flex items-center gap-2 transition-opacity duration-300 ${
          toastVisible ? "opacity-100 toast-in" : "opacity-0"
        } hidden sm:flex`}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        {ACTIVITY_MESSAGES[toastIndex]}
      </div>

      <div className="fixed bottom-20 sm:bottom-6 right-4 z-40 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="w-72 bg-white border border-gray-100 rounded-2xl shadow-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-sm flex items-center gap-1.5">
                <Sparkles size={14} className="text-orange-500" /> Kwick AI
              </p>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600">
              Hi! I can help track an order, find a product, or connect you to support. What do you need?
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <button onClick={() => setShowTracking(true)} className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100">
                Track my order
              </button>
              <button className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100">Talk to support</button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen((o) => !o)}
          className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors text-white shadow-lg flex items-center justify-center"
          aria-label="Kwick AI help"
        >
          <MessageCircle size={22} />
        </button>
      </div>

      {showSpin && (
        <SpinWheelModal
          onClose={() => setShowSpin(false)}
          isPro={!!proPlan}
          spinsUsed={spinsUsed}
          onSpinUsed={() => setSpinsUsed((n) => n + 1)}
        />
      )}
      {showTracking && <TrackingModal onClose={() => setShowTracking(false)} />}
      {showPayment && selectedPlanForPayment && (
        <PaymentModal
          plan={selectedPlanForPayment}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {showMembership && (
        <MembershipModal
          onClose={() => setShowMembership(false)}
          onSelectPlan={handleSelectPlan}
          currentPlan={proPlan}
        />
      )}

      {successMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg font-medium animate-in fade-in slide-in-from-top">
          {successMessage}
        </div>
      )}
    </div>
  );
}
