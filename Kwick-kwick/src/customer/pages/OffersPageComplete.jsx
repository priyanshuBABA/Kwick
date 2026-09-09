import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check, ChevronLeft, ChevronRight, Clock, Copy, CreditCard, Gift, Search, Sparkles,
  Tag, Truck, Wallet, PartyPopper, Home, ShoppingBag, Grid, User, Zap, Percent
} from 'lucide-react';
import BottomNav from '../../components/BottomNav';

// ==================== DATA & BUSINESS LOGIC ====================

const COUPONS_DATA = [
  {
    id: 'kw100',
    code: 'KWICKSAVE100',
    title: 'Flat ₹100 OFF',
    description: 'On orders above ₹499',
    type: 'flatDiscount',
    flatDiscount: 100,
    minOrderValue: 499,
    categories: ['Grocery', 'Bakery', 'Medicines'],
    vendor: 'kwick-funded',
    expiry: '2026-12-31',
    icon: '🏷️'
  },
  {
    id: 'kw20',
    code: 'KWICKCASH',
    title: '20% Cashback',
    description: 'Max ₹80 credited to Kwick Wallet',
    type: 'cashback',
    percentDiscount: 20,
    maxCashback: 80,
    minOrderValue: 0,
    categories: ['All'],
    vendor: 'kwick-funded',
    expiry: '2026-12-31',
    walletType: 'PromoBonus',
    expiryDays: 60,
    icon: '💰'
  },
  {
    id: 'mandi3',
    code: 'MANDI3PLUS1',
    title: 'Buy 3kg Veggies, Get 1kg Onions',
    description: 'Fresh Mandi only - Onions at ₹1',
    type: 'combo',
    minOrderValue: 150,
    categories: ['Fresh Mandi'],
    vendor: 'kwick-funded',
    expiry: '2026-12-25',
    icon: '🥕'
  },
  {
    id: 'med20',
    code: 'PROMED20',
    title: 'Flat 20% OFF',
    description: 'All medicines, max ₹150 discount',
    type: 'percentDiscount',
    percentDiscount: 20,
    maxDiscount: 150,
    minOrderValue: 0,
    categories: ['Medicines'],
    vendor: 'vendor-sponsored',
    expiry: '2026-12-28',
    icon: '💊'
  },
  {
    id: 'breakfast',
    code: 'BREAKFAST119',
    title: 'Breakfast Bundle ₹119',
    description: 'Bread + Butter + Milk, save ₹30',
    type: 'combo',
    minOrderValue: 0,
    categories: ['Grocery', 'Bakery'],
    vendor: 'kwick-funded',
    expiry: '2026-12-24',
    icon: '🥐'
  }
];

const BUNDLES = [
  {
    id: 'b1',
    title: 'Breakfast Combo',
    description: 'Bread + Butter + Milk',
    price: 119,
    originalPrice: 149,
    savings: 30,
    icon: '🥐',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'b2',
    title: 'Medicine Super Saver',
    description: '20% OFF on 3+ items',
    price: null,
    originalPrice: null,
    savings: 'Variable',
    icon: '💊',
    color: 'from-rose-400 to-red-500'
  },
  {
    id: 'b3',
    title: 'Evening Chai Kit',
    description: 'Chai + Biscuits + Sugar',
    price: 149,
    originalPrice: 171,
    savings: 22,
    icon: '☕',
    color: 'from-amber-600 to-yellow-500'
  }
];

const BANK_OFFERS = [
  {
    id: 'hdfc',
    name: 'HDFC Bank Cards',
    offer: 'Extra 10% cashback up to ₹100',
    icon: '🏦'
  },
  {
    id: 'paytm',
    name: 'Paytm UPI',
    offer: 'Flat ₹30 cashback above ₹299',
    icon: '📱'
  },
  {
    id: 'icici',
    name: 'ICICI Amazon Pay',
    offer: '5% cashback up to ₹75',
    icon: '🛍️'
  }
];

const HERO_BANNERS = [
  {
    id: 'b1',
    tag: 'NEW USER',
    title: '50% OFF on Your First Order',
    subtitle: 'Use code KWICK50 at checkout',
    cta: 'Shop Now',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 'b2',
    tag: 'FLASH DEAL',
    title: 'Fresh Mandi ₹9 Specials',
    subtitle: 'Morning 8-11 AM only - vegetables & produce',
    cta: 'Grab Now',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'b3',
    tag: 'WALLET BOOST',
    title: '₹80 Cashback in Wallet',
    subtitle: '20% back on orders above ₹399',
    cta: 'Activate',
    gradient: 'from-emerald-400 to-teal-500'
  }
];

const TIERS = [
  { threshold: 299, label: 'Free Delivery', icon: Truck },
  { threshold: 599, label: 'Flat 15% OFF', icon: Tag },
  { threshold: 999, label: '₹200 OFF + Free Gift', icon: Gift }
];

// ==================== COMPONENTS ====================

function CouponCard({ coupon, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = coupon.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
    setCopied(true);
    onCopy?.(coupon.code);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-orange-300 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-2xl mt-1">{coupon.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="font-mono font-bold text-orange-600 text-lg">{coupon.code}</div>
            <p className="font-semibold text-slate-900 text-sm mt-1">{coupon.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{coupon.description}</p>
            <div className="flex items-center gap-1 mt-2">
              {coupon.categories?.map((cat, i) => (
                <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`shrink-0 px-3 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white'
          }`}
        >
          {copied ? <><Check size={14} className="inline mr-1" />Copied</> : <><Copy size={14} className="inline mr-1" />Copy</>}
        </button>
      </div>
    </div>
  );
}

function ComboCard({ combo }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${combo.color} p-5 text-white shadow-lg overflow-hidden relative`}>
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div className="relative z-10">
        <div className="text-3xl mb-2">{combo.icon}</div>
        <h3 className="font-bold text-lg leading-tight">{combo.title}</h3>
        <p className="text-sm text-white/80 mt-1">{combo.description}</p>
        {combo.price && (
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-bold text-2xl">₹{combo.price}</span>
            <span className="text-sm text-white/70 line-through">₹{combo.originalPrice}</span>
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-md">Save ₹{combo.savings}</span>
          </div>
        )}
        <button className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-lg transition-all backdrop-blur-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % HERO_BANNERS.length),
      5000
    );
    return () => clearInterval(timerRef.current);
  }, []);

  const banner = HERO_BANNERS[index];
  const go = (d) => {
    clearInterval(timerRef.current);
    setIndex((i) => (i + d + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  return (
    <div className={`relative rounded-3xl bg-gradient-to-br ${banner.gradient} p-6 text-white overflow-hidden shadow-xl`}>
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] pointer-events-none"></div>
      <div className="relative z-10">
        <span className="inline-block bg-white/25 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold tracking-wide">
          {banner.tag}
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-black leading-tight">{banner.title}</h2>
        <p className="mt-2 text-white/90 max-w-sm">{banner.subtitle}</p>
        <button className="mt-6 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all">
          {banner.cta} →
        </button>
      </div>

      {/* Navigation */}
      <button
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

function TierProgressBar({ cartValue = 0 }) {
  const maxThreshold = TIERS[TIERS.length - 1].threshold;
  const percentage = Math.min(100, (cartValue / maxThreshold) * 100);
  const nextTier = TIERS.find((t) => cartValue < t.threshold);
  const activeTier = [...TIERS].reverse().find((t) => cartValue >= t.threshold);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-slate-900">Build Your Basket, Unlock More</h3>
        <Sparkles className="text-orange-500" size={20} />
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="relative h-3 bg-orange-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
          {TIERS.map((tier) => (
            <div
              key={tier.threshold}
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${(tier.threshold / maxThreshold) * 100}%` }}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 border-white shadow-md transition-colors ${
                  cartValue >= tier.threshold ? 'bg-orange-600' : 'bg-slate-300'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tier Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {TIERS.map((tier) => {
          const TierIcon = tier.icon;
          const unlocked = cartValue >= tier.threshold;
          return (
            <div
              key={tier.threshold}
              className={`rounded-2xl p-4 text-center transition-all border-2 ${
                unlocked
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <TierIcon
                size={24}
                className={`mx-auto ${unlocked ? 'text-orange-600' : 'text-slate-400'}`}
              />
              <p className={`mt-2 font-bold text-sm ${unlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                ₹{tier.threshold}+
              </p>
              <p className={`text-xs mt-1 ${unlocked ? 'text-slate-700' : 'text-slate-400'}`}>
                {tier.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Status Message */}
      <div className="mt-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 p-4 border border-orange-200">
        {nextTier ? (
          <p className="text-sm text-slate-700">
            Add <span className="font-bold text-orange-600">₹{nextTier.threshold - cartValue}</span> more to unlock{' '}
            <span className="font-semibold">{nextTier.label}</span>
          </p>
        ) : (
          <p className="text-sm font-bold text-green-600 flex items-center gap-2">
            <PartyPopper size={16} /> All tiers unlocked - max savings applied!
          </p>
        )}
      </div>
    </div>
  );
}

function WalletBalanceStrip({ walletBalance = 1500, rewardPoints = 2480 }) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 mb-6">
      <button
        onClick={() => navigate('/customer/wallet')}
        className="flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"
      >
        <div className="text-xs opacity-80 font-medium">Wallet Balance</div>
        <div className="text-2xl font-bold mt-1">₹{walletBalance}</div>
      </button>
      <button
        onClick={() => navigate('/customer/wallet')}
        className="flex-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"
      >
        <div className="text-xs opacity-80 font-medium">Reward Points</div>
        <div className="text-2xl font-bold mt-1">{rewardPoints} pts</div>
      </button>
    </div>
  );
}

// ==================== MAIN PAGE ====================

export default function KwickOffersPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState('');
  const [cartValue, setCartValue] = useState(350);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  const categories = ['All', 'Grocery', 'Medicines', 'Fresh Mandi', 'Bakery'];

  const filteredCoupons = useMemo(() => {
    return COUPONS_DATA.filter((coupon) => {
      const categoryMatch =
        selectedCategory === 'All' ||
        coupon.categories.includes(selectedCategory) ||
        coupon.categories.includes('All');
      const searchMatch =
        searchQuery === '' ||
        coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.title.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <main className="w-full px-4 sm:px-6 py-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Kwick Savings</p>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
              Offers <span className="text-orange-600">&amp; Coupons</span>
            </h1>
          </div>
          <div className="w-full md:w-80 relative hidden md:block">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coupons, offers..."
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coupons, offers..."
            className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
          />
        </div>

        {/* Wallet Shortcut */}
        <WalletBalanceStrip walletBalance={1500} rewardPoints={2480} />

        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Tier Progress */}
        <TierProgressBar cartValue={cartValue} />

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-orange-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Coupons Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Apply Coupons & Save</h2>
          <div className="grid grid-cols-1 gap-3">
            {filteredCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onCopy={(code) => {
                  setCopied(code);
                  setTimeout(() => setCopied(''), 2000);
                }}
              />
            ))}
          </div>
        </section>

        {/* Bundles Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Bundle & Save</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BUNDLES.map((bundle) => (
              <ComboCard key={bundle.id} combo={bundle} />
            ))}
          </div>
        </section>

        {/* Bank Offers */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Bank & Payment Partner Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BANK_OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="rounded-2xl bg-white p-5 border-2 border-slate-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{offer.icon}</div>
                <h3 className="font-bold text-slate-900">{offer.name}</h3>
                <p className="text-sm text-slate-600 mt-2">{offer.offer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav items={navItems} highlightColor="#FF6B00" />
    </div>
  );
}
