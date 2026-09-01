import React, { useState } from 'react';
import { ChevronRight, Clock, Grid, HelpCircle, Home, MapPin, MessageCircle, Phone, RefreshCw, ShoppingBag, User, Wallet } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';

const navItems = [
  { icon: Home, label: 'Home', path: '/customer/home' },
  { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
  { icon: Grid, label: 'Services', path: '/customer/services' },
  { icon: User, label: 'Profile', path: '/customer/profile' },
];

const pageData = {
  addresses: {
    eyebrow: 'Delivery details', title: 'Saved Addresses', description: 'Manage the places where you want your Kwick orders delivered.', icon: MapPin,
    items: [{ title: 'Home', detail: 'Sector 21, Noida', icon: MapPin }, { title: 'Add a new address', detail: 'Save another delivery location', icon: ChevronRight }],
  },
  subscriptions: {
    eyebrow: 'Membership', title: 'Subscriptions', description: 'Get more value from every order with Kwick Pro.', icon: RefreshCw,
    items: [{ title: 'Kwick Pro', detail: 'Free delivery and 2x reward points', icon: Wallet }, { title: 'Manage renewal', detail: 'Subscription controls will appear here', icon: Clock }],
  },
  help: {
    eyebrow: 'Support centre', title: 'Help & Support', description: 'We are here to help with orders, payments, and services.', icon: HelpCircle,
    items: [{ title: 'Chat with support', detail: 'Get help from the Kwick team', icon: MessageCircle }, { title: 'Call support', detail: 'Available daily from 9 AM to 9 PM', icon: Phone }],
  },
};

export default function ProfileOptionPage() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const key = useLocation().pathname.split('/').pop();
  const data = pageData[key] || pageData.help;
  const PageIcon = data.icon;

  return <div className="min-h-screen bg-[#F6F8FB] pb-24"><main className="mx-auto max-w-3xl space-y-5 px-4 pb-8 pt-6 sm:px-8"><div className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500"><PageIcon size={28} /></div><p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">{data.eyebrow}</p><h1 className="mt-1 text-3xl font-extrabold text-slate-900">{data.title}</h1><p className="mt-2 text-sm text-slate-500">{data.description}</p></div><div className="overflow-hidden rounded-3xl bg-white shadow-sm">{data.items.map((item) => { const ItemIcon = item.icon; return <button type="button" key={item.title} onClick={() => setNotice(`${item.title} option selected`)} className="flex w-full items-center gap-4 border-b border-slate-100 p-5 text-left last:border-b-0 hover:bg-orange-50"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><ItemIcon size={20} /></span><span className="flex-1"><strong className="block text-sm text-slate-900">{item.title}</strong><small className="mt-1 block text-xs text-slate-500">{item.detail}</small></span><ChevronRight size={18} className="text-slate-300" /></button>; })}</div><button type="button" onClick={() => navigate('/customer/profile')} className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50">Back to Profile</button></main>{notice && <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">{notice}</div>}<BottomNav items={navItems} highlightColor="#FF6B00" /></div>;
}
