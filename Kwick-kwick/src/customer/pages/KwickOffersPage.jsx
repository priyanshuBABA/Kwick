import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Gift,
  Search,
  Sparkles,
  Tag,
  Truck,
  Wallet,
  PartyPopper,
  Home,
  ShoppingBag,
  Grid,
  User,
} from 'lucide-react';
import BottomNav from '../../components/BottomNav';

const HERO_BANNERS = [
  {
    id: 'b1',
    tag: 'NEW USER',
    title: '50% OFF on Your First Order',
    sub: 'Use code KWICK50 at checkout - limited time offer for new users.',
    cta: 'Shop Now',
  },
  {
    id: 'b2',
    tag: 'FLASH DEAL',
    title: 'Fresh Mandi Starting @ Rs. 9',
    sub: "Morning Super Deals, 8 AM - 11 AM only. Today's veggies are calling.",
    cta: 'Grab Deal',
  },
  {
    id: 'b3',
    tag: 'WALLET BOOST',
    title: '20% Cashback in Kwick Wallet',
    sub: 'Up to Rs. 80 back on every order above Rs. 399. Spend it on your next cart.',
    cta: 'Activate',
  },
];

const CATEGORIES = ['All', 'Grocery', 'Medicines', 'Fresh Mandi', 'Bakery'];

const COUPONS = [
  { code: 'KWICKSAVE100', title: 'Flat Rs. 100 OFF', detail: 'On orders above Rs. 499', category: 'Grocery', icon: '🏷️' },
  { code: 'KWICKCASH', title: '20% Cashback (up to Rs. 80)', detail: 'Credited directly to your Kwick Wallet', category: 'All', icon: '💰' },
  { code: 'MEDIFIRST', title: 'Flat 15% OFF', detail: 'On all Medicines & Wellness essentials', category: 'Medicines', icon: '💊' },
  { code: 'MANDIFRESH', title: 'Buy 3kg Veggies, Get 1kg Onions @ Rs. 1', detail: 'Fresh Mandi combo, while stocks last', category: 'Fresh Mandi', icon: '🥕' },
  { code: 'MORNINGBAKE', title: 'Bread + Butter + Milk @ Rs. 119', detail: 'Save Rs. 30 on your breakfast basket', category: 'Bakery', icon: '🥐' },
];

const COMBOS = [
  { id: 'c1', title: 'Breakfast Combo', price: 119, was: 149, icon: '🥐' },
  { id: 'c2', title: 'Medicine Super Saver', detail: '20% OFF', icon: '💊' },
  { id: 'c3', title: 'Mandi Family Pack', price: 249, was: 320, icon: '🍎' },
];

const BANK_OFFERS = [
  { id: 'hdfc', name: 'HDFC Bank Cards', detail: 'Extra 10% Cashback, up to Rs. 150' },
  { id: 'paytm', name: 'Paytm UPI', detail: 'Flat Rs. 25 OFF on first UPI payment' },
];

const TIERS = [
  { threshold: 299, label: 'Free Delivery', icon: Truck },
  { threshold: 599, label: 'Flat 15% OFF', icon: Tag },
  { threshold: 999, label: 'Rs. 200 OFF + Free Gift', icon: Gift },
];

function useCountdown(targetHour = 11) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(targetHour, 0, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      setRemaining(Math.max(0, target - now));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetHour]);

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-orange-50 text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white'}`}
    >
      {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
    </button>
  );
}

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setIndex((current) => (current + 1) % HERO_BANNERS.length), 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (direction) => {
    clearInterval(timerRef.current);
    setIndex((current) => (current + direction + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  const banner = HERO_BANNERS[index];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF8A00] p-6 text-white shadow-lg sm:p-8">
      <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wide backdrop-blur-sm">{banner.tag}</span>
      <h2 className="mt-3 max-w-md text-3xl font-extrabold leading-tight">{banner.title}</h2>
      <p className="mt-2 max-w-sm text-sm text-white/90">{banner.sub}</p>
      <button type="button" className="mt-5 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#FF6B00] shadow-md transition-transform hover:scale-105">{banner.cta} →</button>
      <button type="button" onClick={() => go(-1)} aria-label="Previous offer" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/25 p-1.5 backdrop-blur-sm hover:bg-white/40"><ChevronLeft size={18} /></button>
      <button type="button" onClick={() => go(1)} aria-label="Next offer" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/25 p-1.5 backdrop-blur-sm hover:bg-white/40"><ChevronRight size={18} /></button>
      <div className="mt-6 flex justify-center gap-1.5">{HERO_BANNERS.map((item, itemIndex) => <span key={item.id} className={`h-1.5 rounded-full transition-all ${itemIndex === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />)}</div>
    </section>
  );
}

function TierProgress() {
  const [cartValue, setCartValue] = useState(320);
  const maxThreshold = TIERS[TIERS.length - 1].threshold;
  const percentage = Math.min(100, (cartValue / maxThreshold) * 100);
  const nextTier = TIERS.find((tier) => cartValue < tier.threshold);
  const currentTier = [...TIERS].reverse().find((tier) => cartValue >= tier.threshold)?.label;

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Build Your Basket, Unlock More</h3><Sparkles size={18} className="text-[#FF8A00]" /></div>
      <p className="mt-1 text-sm text-gray-500">Drag to preview your cart value and see what you unlock.</p>
      <input type="range" min="0" max={maxThreshold} step="10" value={cartValue} onChange={(event) => setCartValue(Number(event.target.value))} className="mt-5 w-full accent-[#FF6B00]" />
      <div className="relative mt-3 h-2.5 w-full rounded-full bg-orange-100"><div className="h-2.5 rounded-full transition-all" style={{ width: `${percentage}%`, background: 'linear-gradient(90deg, #FF8A00, #FF6B00)' }} />{TIERS.map((tier) => <div key={tier.threshold} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${(tier.threshold / maxThreshold) * 100}%` }}><div className={`h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white shadow ${cartValue >= tier.threshold ? 'bg-[#FF6B00]' : 'bg-gray-300'}`} /></div>)}</div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">{TIERS.map((tier) => { const unlocked = cartValue >= tier.threshold; const Icon = tier.icon; return <div key={tier.threshold} className={`rounded-xl border p-3 text-center transition-colors ${unlocked ? 'border-[#FF6B00] bg-orange-50' : 'border-gray-100 bg-gray-50'}`}><Icon size={18} className={`mx-auto ${unlocked ? 'text-[#FF6B00]' : 'text-gray-400'}`} /><p className={`mt-1 text-xs font-bold ${unlocked ? 'text-gray-900' : 'text-gray-400'}`}>Rs. {tier.threshold}+</p><p className={`text-[11px] ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>{tier.label}</p></div>; })}</div>
      <div className="mt-4 rounded-xl bg-[#FFF3E9] p-3 text-sm">{nextTier ? <span className="text-gray-700">Add <span className="font-bold text-[#FF6B00]">Rs. {nextTier.threshold - cartValue}</span> more to unlock <span className="font-bold">{nextTier.label}</span></span> : <span className="flex items-center gap-1.5 font-semibold text-green-600"><PartyPopper size={16} /> All tiers unlocked - max savings applied!</span>}{currentTier && <div className="mt-1 text-xs text-gray-400">Currently active: <span className="font-semibold text-gray-600">{currentTier}</span></div>}</div>
    </section>
  );
}

function CouponCard({ coupon }) {
  return <article className="flex flex-col gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">{coupon.icon}</div><div><span className="rounded-md border border-dashed border-[#FF6B00] px-2 py-0.5 text-xs font-bold text-[#FF6B00]">{coupon.code}</span><p className="mt-1 text-sm font-bold text-gray-900">{coupon.title}</p><p className="text-xs text-gray-500">{coupon.detail}</p></div></div><CopyButton code={coupon.code} /></article>;
}

import { getOffersByDomain } from '../../utils/offersService';

export default function KwickOffersPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [adminOffers, setAdminOffers] = useState(() => getOffersByDomain('customer'));
  const countdown = useCountdown(11);

  useEffect(() => {
    const handleUpdate = () => setAdminOffers(getOffersByDomain('customer'));
    window.addEventListener('kwick_offers_updated', handleUpdate);
    return () => window.removeEventListener('kwick_offers_updated', handleUpdate);
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' },
  ];

  const allCoupons = useMemo(() => {
    const dynamicCoupons = adminOffers.map(o => ({
      code: o.code,
      title: o.title,
      detail: `${o.description} (${o.discount}) • Expires ${o.expiry}`,
      category: 'All',
      icon: '🏷️'
    }));
    return [...dynamicCoupons, ...COUPONS];
  }, [adminOffers]);

  const filteredCoupons = useMemo(() => allCoupons.filter((coupon) => {
    const matchesCategory = category === 'All' || coupon.category === category || coupon.category === 'All';
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${coupon.code} ${coupon.title} ${coupon.detail}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }), [search, category, allCoupons]);

  return (
    <div className="min-h-screen bg-[#FFF3E9] pb-24">
      <main className="mx-auto max-w-6xl space-y-8 px-4 pt-6 sm:px-8"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B00]">Kwick savings</p><h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Offers <span className="text-[#FF6B00]">&amp; Coupons</span></h1></div><div className="relative hidden w-72 sm:block"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search offers, coupon codes..." className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-orange-100" /></div></div><div className="relative sm:hidden"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search offers, coupon codes..." className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-orange-100" /></div><HeroCarousel /><div className="flex flex-col justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] px-5 py-4 text-white shadow-md sm:flex-row sm:items-center sm:px-6"><div><p className="text-xs font-bold uppercase tracking-wide text-white/90">Daily Morning Super Deal</p><p className="text-lg font-extrabold">Fresh Vegetables &amp; Grocery, 8-11 AM</p></div><div className="flex w-fit items-center gap-2 rounded-xl bg-black/20 px-4 py-2 font-mono text-xl font-bold"><Clock size={20} />{countdown}</div></div><TierProgress /><section><h3 className="mb-3 text-lg font-bold text-gray-900">Apply Coupons &amp; Save</h3><div className="flex flex-wrap gap-2">{CATEGORIES.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${category === item ? 'bg-[#FF6B00] text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-orange-50'}`}>{item}</button>)}</div><div className="mt-4 space-y-3">{filteredCoupons.length ? filteredCoupons.map((coupon) => <CouponCard key={coupon.code} coupon={coupon} />) : <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">No offers match &quot;{search}&quot; in {category}.</p>}</div></section><section><h3 className="mb-3 text-lg font-bold text-gray-900">🎁 Bundle &amp; Save</h3><div className="flex gap-4 overflow-x-auto pb-2">{COMBOS.map((combo) => <article key={combo.id} className="min-w-[220px] rounded-2xl bg-white p-4 shadow-sm"><div className="mb-2 text-2xl">{combo.icon}</div><p className="font-bold text-gray-900">{combo.title}</p>{combo.price ? <p className="mt-1 text-sm"><span className="font-extrabold text-[#FF6B00]">Rs. {combo.price}</span> <span className="text-gray-400 line-through">Rs. {combo.was}</span></p> : <p className="mt-1 text-sm font-bold text-[#FF6B00]">{combo.detail}</p>}</article>)}</div></section><section><h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900"><CreditCard size={18} className="text-blue-600" />Bank &amp; Wallet Partner Offers</h3><div className="grid gap-3 sm:grid-cols-2">{BANK_OFFERS.map((offer) => <article key={offer.id} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"><p className="font-bold text-gray-900">{offer.name}</p><p className="text-sm text-gray-500">{offer.detail}</p></article>)}</div></section></main>
      <BottomNav items={navItems} highlightColor="#FF6B00" />
    </div>
  );
}
