import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Check, Grid, Heart, Home, PackageSearch, Search, ShoppingBag, ShoppingCart, Trash2, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomerTopNav from '../../components/CustomerTopNav';
import BottomNav from '../../components/BottomNav';

const CATEGORIES = ['All', 'Grocery', 'Medicines', 'Fresh Mandi', 'Bakery', 'Fruits'];
const SORT_OPTIONS = [
  { key: 'recent', label: 'Recently Added' },
  { key: 'priceLow', label: 'Price: Low to High' },
  { key: 'priceHigh', label: 'Price: High to Low' },
];
const INITIAL_WISHLIST = [
  { id: 'w1', name: 'Amul Butter, 500g', category: 'Grocery', price: 265, mrp: 290, icon: '🧈', inStock: true, addedOn: '2026-07-28' },
  { id: 'w2', name: 'Vitamin D3 Tablets, 60ct', category: 'Medicines', price: 349, mrp: 420, icon: '💊', inStock: true, addedOn: '2026-07-25' },
  { id: 'w3', name: 'Fresh Alphonso Mangoes, 1kg', category: 'Fruits', price: 199, mrp: 249, icon: '🥭', inStock: true, addedOn: '2026-07-30' },
  { id: 'w4', name: 'Whole Wheat Sourdough Loaf', category: 'Bakery', price: 89, mrp: 110, icon: '🍞', inStock: false, addedOn: '2026-07-20' },
  { id: 'w5', name: 'Organic Spinach Bunch', category: 'Fresh Mandi', price: 32, mrp: 40, icon: '🥬', inStock: true, addedOn: '2026-07-29' },
  { id: 'w6', name: 'Cold Pressed Coconut Oil, 1L', category: 'Grocery', price: 315, mrp: 360, icon: '🥥', inStock: true, addedOn: '2026-07-18' },
];

const navItems = [
  { icon: Home, label: 'Home', path: '/customer/home' },
  { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
  { icon: Grid, label: 'Services', path: '/customer/services' },
  { icon: User, label: 'Profile', path: '/customer/profile' },
];

function Toast({ message, onDone }) {
  React.useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);
  return <div className="fixed bottom-20 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg"><Check size={15} className="text-green-400" />{message}</div>;
}

function WishlistCard({ item, onRemove, onMoveToCart }) {
  const [leaving, setLeaving] = useState(false);
  const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  const remove = () => {
    setLeaving(true);
    setTimeout(() => onRemove(item.id), 180);
  };
  return <article className={`flex flex-col gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition-all duration-200 sm:flex-row sm:items-center ${leaving ? 'scale-95 opacity-0' : 'opacity-100'}`}>
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-3xl">{item.icon}</div>
    <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="truncate font-bold text-gray-900">{item.name}</p>{!item.inStock && <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">OUT OF STOCK</span>}</div><p className="text-xs text-gray-400">{item.category}</p><div className="mt-1 flex items-center gap-2"><span className="font-extrabold text-gray-900">Rs. {item.price}</span><span className="text-xs text-gray-400 line-through">Rs. {item.mrp}</span><span className="text-xs font-bold text-green-600">{discount}% OFF</span></div></div>
    <div className="flex shrink-0 items-center gap-2"><button type="button" onClick={() => onMoveToCart(item)} disabled={!item.inStock} className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-colors sm:flex-none ${item.inStock ? 'bg-[#FF6B00] text-white hover:bg-[#e35f00]' : 'cursor-not-allowed bg-gray-100 text-gray-400'}`}><ShoppingCart size={15} /><span>Move to Cart</span></button><button type="button" onClick={remove} aria-label={`Remove ${item.name}`} className="rounded-xl border border-gray-200 p-2 text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"><Trash2 size={16} /></button></div>
  </article>;
}

function EmptyState({ onBrowse }) {
  return <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50"><Heart size={32} className="fill-[#FF6B00] text-[#FF6B00]" /></div><h3 className="mt-4 text-lg font-bold text-gray-900">Your wishlist is empty</h3><p className="mt-1 max-w-xs text-sm text-gray-400">Tap the heart on any product to save it here for later.</p><button type="button" onClick={onBrowse} className="mt-5 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#e35f00]">Browse Products</button></div>;
}

export default function KwickWishlistPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL_WISHLIST);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [sortOpen, setSortOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = items.filter((item) => (category === 'All' || item.category === category) && (!query || item.name.toLowerCase().includes(query)));
    if (sortBy === 'priceLow') return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'priceHigh') return [...list].sort((a, b) => b.price - a.price);
    return [...list].sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
  }, [items, search, category, sortBy]);

  const removeItem = (id) => {
    const removed = items.find((item) => item.id === id);
    setItems((current) => current.filter((item) => item.id !== id));
    if (removed) setToast(`Removed "${removed.name}" from wishlist`);
  };
  const moveToCart = (item) => {
    setItems((current) => current.filter((saved) => saved.id !== item.id));
    setToast(`"${item.name}" moved to cart`);
  };
  const clearFilters = () => { setSearch(''); setCategory('All'); };
  const inStockItems = filteredItems.filter((item) => item.inStock);

  return <div className="min-h-screen bg-[#FFF3E9] pb-24"><CustomerTopNav />{toast && <Toast message={toast} onDone={() => setToast(null)} />}<main className="mx-auto max-w-6xl space-y-5 px-4 pb-8 pt-6 sm:px-8"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B00]">Saved for later</p><h1 className="flex items-center gap-2 text-2xl font-extrabold text-gray-900 sm:text-3xl"><Heart size={25} className="fill-[#FF6B00] text-[#FF6B00]" /> Wishlist</h1></div><span className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-bold text-[#FF6B00]">{items.length} saved</span></div><div className="relative"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your saved items..." className="w-full rounded-full border border-gray-200 bg-white py-3 pl-9 pr-3 text-sm outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-orange-100" /></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{CATEGORIES.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${category === item ? 'bg-[#FF6B00] text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-orange-50'}`}>{item}</button>)}</div><div className="flex items-center gap-2"><div className="relative"><button type="button" onClick={() => setSortOpen((open) => !open)} className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-orange-50"><ArrowUpDown size={14} />{SORT_OPTIONS.find((option) => option.key === sortBy)?.label}</button>{sortOpen && <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">{SORT_OPTIONS.map((option) => <button type="button" key={option.key} onClick={() => { setSortBy(option.key); setSortOpen(false); }} className={`block w-full px-4 py-2 text-left text-sm hover:bg-orange-50 ${sortBy === option.key ? 'font-bold text-[#FF6B00]' : 'text-gray-600'}`}>{option.label}</button>)}</div>}</div>{items.length > 0 && <button type="button" onClick={() => { setItems([]); setToast('Wishlist cleared'); }} className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-500 hover:border-red-200 hover:text-red-500"><X size={14} /> Clear all</button>}</div></div>{items.length === 0 ? <EmptyState onBrowse={() => navigate('/customer/services')} /> : filteredItems.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-14 text-center shadow-sm"><PackageSearch size={32} className="text-gray-300" /><p className="mt-3 text-sm text-gray-500">No saved items match <span className="font-semibold text-gray-700">&quot;{search || category}&quot;</span></p><button type="button" onClick={clearFilters} className="mt-3 text-sm font-semibold text-[#FF6B00] hover:underline">Clear filters</button></div> : <div className="space-y-3">{filteredItems.map((item) => <WishlistCard key={item.id} item={item} onRemove={removeItem} onMoveToCart={moveToCart} />)}</div>}{inStockItems.length > 0 && <div className="flex flex-col items-start justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"><p className="text-sm text-gray-500">{inStockItems.length} item(s) ready to buy</p><button type="button" onClick={() => { setItems((current) => current.filter((item) => !inStockItems.some((saved) => saved.id === item.id))); setToast(`${inStockItems.length} item(s) moved to cart`); }} className="flex items-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-2 text-sm font-bold text-white hover:bg-[#e35f00]"><ShoppingCart size={15} /> Move All to Cart</button></div>}</main><BottomNav items={navItems} highlightColor="#FF6B00" /></div>;
}
