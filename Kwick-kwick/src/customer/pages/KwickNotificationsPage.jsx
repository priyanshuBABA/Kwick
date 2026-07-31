import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, CheckCircle2, ChevronRight, Grid, Home, Package, PartyPopper, RefreshCw, ShoppingBag, Tag, Truck, User, Wallet, X, Zap, Gift, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomerTopNav from '../../components/CustomerTopNav';
import BottomNav from '../../components/BottomNav';

const TABS = [
  { key: 'All', label: 'All' },
  { key: 'Orders', label: 'Orders 📦' },
  { key: 'Offers', label: 'Offers & Rewards 🏷️' },
  { key: 'Wallet', label: 'System & Wallet 💳' },
];
const CATEGORY_STYLES = {
  Orders: { bg: 'bg-blue-50', text: 'text-blue-600' },
  Offers: { bg: 'bg-orange-50', text: 'text-[#FF6B00]' },
  Wallet: { bg: 'bg-purple-50', text: 'text-purple-600' },
};
const timestamp = Date.now();
const SEED_NOTIFICATIONS = [
  { id: 'n1', category: 'Orders', icon: Truck, title: 'Out for Delivery', body: 'Rahul is on the way with your Fresh Basket order. Reaching Sector 21 in ~12 mins.', timestamp: timestamp - 60000, unread: true, cta: 'Track Delivery' },
  { id: 'n2', category: 'Offers', icon: Zap, title: 'Weekend Mega Savings!', body: "Flat Rs. 100 OFF on Groceries. Use code KWICKSAVE100 before it's gone.", timestamp: timestamp - 900000, unread: true, cta: 'Apply & Shop', expiresAt: timestamp + 1740000 },
  { id: 'n3', category: 'Wallet', icon: RefreshCw, title: 'Cashback Credited', body: 'Rs. 50 Bonus Cash added to Kwick Wallet for Order #KWK89231.', timestamp: timestamp - 14400000, unread: false, cta: 'Check Balance' },
  { id: 'n4', category: 'Orders', icon: Package, title: 'Order Confirmed', body: 'Order #KWK89231 placed successfully! Fresh Basket items are being packed.', timestamp: timestamp - 18000000, unread: false, cta: 'View Details' },
  { id: 'n5', category: 'Offers', icon: Gift, title: "You're close to Gold Tier!", body: 'Just 520 pts away from Gold Tier. Order today to unlock Free Delivery.', timestamp: timestamp - 21600000, unread: false, cta: 'View Tier Status' },
  { id: 'n6', category: 'Wallet', icon: AlertTriangle, title: 'Low Wallet Balance', body: 'Your Wallet Balance is Rs. 40. Top up now for 1-click checkout!', timestamp: timestamp - 32400000, unread: false, cta: 'Add Money' },
  { id: 'n7', category: 'Orders', icon: CheckCircle2, title: 'Delivered', body: 'Order #KWK88210 delivered! How was your experience?', timestamp: timestamp - 97200000, unread: false, cta: 'Rate Order' },
  { id: 'n8', category: 'Offers', icon: Tag, title: 'We miss you!', body: 'Use code BACK100 & get Flat Rs. 100 OFF on orders above Rs. 399.', timestamp: timestamp - 108000000, unread: false, cta: 'Claim Coupon', expiresAt: timestamp + 18000000 },
];
const navItems = [
  { icon: Home, label: 'Home', path: '/customer/home' },
  { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
  { icon: Grid, label: 'Services', path: '/customer/services' },
  { icon: User, label: 'Profile', path: '/customer/profile' },
];

function timeAgo(value) {
  const minutes = Math.floor(Math.max(0, Date.now() - value) / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
function useCountdown(expiresAt) {
  const [label, setLabel] = useState(null);
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    if (!expiresAt) return undefined;
    const tick = () => {
      const remaining = expiresAt - Date.now();
      if (remaining <= 0) { setExpired(true); setLabel('Expired'); return; }
      const seconds = Math.floor(remaining / 1000);
      setLabel(`${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);
  return { label, expired };
}
function Toast({ message, onDone }) {
  useEffect(() => { const timer = setTimeout(onDone, 2200); return () => clearTimeout(timer); }, [onDone]);
  return <div className="fixed bottom-20 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">{message}</div>;
}
function NotificationCard({ notification, onMarkRead, onDelete, onCta }) {
  const Icon = notification.icon;
  const style = CATEGORY_STYLES[notification.category];
  const { label: countdown, expired } = useCountdown(notification.expiresAt);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const onTouchStart = (event) => { startX.current = event.touches[0].clientX; setDragging(true); };
  const onTouchMove = (event) => { if (dragging) setDragX(Math.max(-140, Math.min(140, event.touches[0].clientX - startX.current))); };
  const onTouchEnd = () => { setDragging(false); if (dragX < -90) onDelete(notification.id); else if (dragX > 90) { onMarkRead(notification.id); setDragX(0); } else setDragX(0); };
  return <div className="relative overflow-hidden rounded-2xl"><div className="absolute inset-0 flex items-center justify-between px-5 sm:hidden"><span className="text-xs font-bold text-green-600">✓ Mark read</span><span className="text-xs font-bold text-red-500">Delete ×</span></div><article onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={() => notification.unread && onMarkRead(notification.id)} style={{ transform: `translateX(${dragX}px)`, transition: dragging ? 'none' : 'transform 0.25s' }} className={`relative flex gap-3 rounded-2xl border bg-white p-4 shadow-sm ${notification.unread ? 'border-orange-100' : 'border-gray-100'}`}><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.bg} ${style.text}`}><Icon size={20} /></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><p className="text-sm font-bold text-gray-900">{notification.title}</p><div className="flex shrink-0 items-center gap-1.5">{notification.unread && <span className="h-2 w-2 rounded-full bg-red-500" />}<span className="whitespace-nowrap text-[11px] text-gray-400">{timeAgo(notification.timestamp)}</span><button type="button" onClick={(event) => { event.stopPropagation(); onDelete(notification.id); }} className="hidden rounded-full p-1 text-gray-300 hover:bg-gray-100 sm:block" aria-label="Delete notification"><X size={14} /></button></div></div><p className="mt-0.5 text-sm text-gray-500">{notification.body}</p><div className="mt-2.5 flex flex-wrap items-center gap-2"><button type="button" onClick={(event) => { event.stopPropagation(); onCta(notification); }} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white ${notification.category === 'Offers' ? 'bg-[#FF6B00]' : notification.category === 'Orders' ? 'bg-blue-600' : 'bg-purple-600'}`}>{notification.cta}<ChevronRight size={12} /></button>{countdown && !expired && <span className="rounded-md bg-red-50 px-2 py-1 text-[11px] font-bold text-red-500">Expires in {countdown}</span>}{expired && <span className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-400">Offer expired</span>}</div></div></article></div>;
}

export default function KwickNotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(SEED_NOTIFICATIONS);
  const [tab, setTab] = useState('All');
  const [toast, setToast] = useState(null);
  const filtered = useMemo(() => tab === 'All' ? notifications : notifications.filter((notification) => notification.category === tab), [notifications, tab]);
  const unread = filtered.filter((notification) => notification.unread).sort((a, b) => b.timestamp - a.timestamp);
  const earlier = filtered.filter((notification) => !notification.unread).sort((a, b) => b.timestamp - a.timestamp);
  const counts = useMemo(() => notifications.reduce((result, notification) => { if (notification.unread) { result.All += 1; result[notification.category] += 1; } return result; }, { All: 0, Orders: 0, Offers: 0, Wallet: 0 }), [notifications]);
  const markRead = (id) => setNotifications((current) => current.map((notification) => notification.id === id ? { ...notification, unread: false } : notification));
  const deleteOne = (id) => { setNotifications((current) => current.filter((notification) => notification.id !== id)); setToast('Notification deleted'); };
  const handleCta = (notification) => { markRead(notification.id); const routes = { Orders: '/customer/orders', Offers: '/customer/offers', Wallet: '/customer/wallet' }; navigate(routes[notification.category]); };
  return <div className="min-h-screen bg-[#FFF3E9] pb-24"><CustomerTopNav /><header className="border-b border-orange-100 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-8"><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3"><div className="flex items-center gap-2"><Bell size={20} className="text-[#FF6B00]" /><h1 className="text-lg font-extrabold text-gray-900">Notifications</h1></div>{counts.All > 0 && <button type="button" onClick={() => { setNotifications((current) => current.map((notification) => ({ ...notification, unread: false }))); setToast('All notifications marked as read'); }} className="text-sm font-semibold text-[#FF6B00]">Mark All as Read</button>}</div><div className="mx-auto mt-3 flex max-w-[1440px] gap-2 overflow-x-auto pb-1">{TABS.map((item) => <button type="button" key={item.key} onClick={() => setTab(item.key)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold ${tab === item.key ? 'bg-[#FF6B00] text-white' : 'bg-gray-50 text-gray-600'}`}>{item.label}{counts[item.key] > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF6B00] px-1 text-[10px] font-bold text-white">{counts[item.key]}</span>}</button>)}</div></header><main className="mx-auto max-w-[1440px] space-y-6 px-4 pb-8 pt-6 sm:px-8">{filtered.length === 0 ? <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50"><PartyPopper size={32} className="text-[#FF6B00]" /></div><h3 className="mt-4 text-lg font-bold text-gray-900">You're all caught up!</h3><p className="mt-1 max-w-xs text-sm text-gray-400">No notifications here right now. Check out today's top deals instead.</p><button type="button" onClick={() => navigate('/customer/offers')} className="mt-5 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-sm font-bold text-white">Explore Today's Deals</button></div> : <div className="grid gap-8 xl:grid-cols-2">{unread.length > 0 && <section><p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-red-500"><span className="h-2 w-2 rounded-full bg-red-500" /> Unread ({unread.length})</p><div className="space-y-2.5">{unread.map((notification) => <NotificationCard key={notification.id} notification={notification} onMarkRead={markRead} onDelete={deleteOne} onCta={handleCta} />)}</div></section>}{earlier.length > 0 && <section><p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-400"><span className="h-2 w-2 rounded-full bg-gray-300" /> Earlier</p><div className="space-y-2.5">{earlier.map((notification) => <NotificationCard key={notification.id} notification={notification} onMarkRead={markRead} onDelete={deleteOne} onCta={handleCta} />)}</div></section>}</div>}</main>{toast && <Toast message={toast} onDone={() => setToast(null)} />}<BottomNav items={navItems} highlightColor="#FF6B00" /></div>;
}
