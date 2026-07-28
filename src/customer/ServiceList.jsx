import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../components/MobileFrame';
import BottomNav from '../components/BottomNav';
import { Home, ShoppingBag, Grid, User, ChevronRight, Search, Sparkles, ArrowRight } from 'lucide-react';

const serviceItems = [
  { title: 'Doctor', icon: '🏥', description: 'Book trusted doctor appointments in minutes.', path: '/customer/doctor', category: 'Health' },
  { title: 'Ambulance', icon: '🚑', description: 'Request urgent medical support instantly.', path: '/customer/ambulance', category: 'Quick Help' },
  { title: 'Medicines', icon: '💊', description: 'Order medicines and wellness essentials.', path: '/customer/medicines', category: 'Health' },
  { title: 'Stationery & Gift', icon: '🎁', description: 'Shop gifts, notebooks, and stationery.', path: '/customer/stationery-gift', category: 'Shopping' },
  { title: 'KwickBook', icon: '📚', description: 'Buy, rent, or sell books with a smooth flow.', path: '/customer/kwickbook', category: 'Learning' },
  { title: 'Kwick Print', icon: '🖨️', description: 'Print documents, flyers, and study material.', path: '/customer/kwick-print', category: 'Delivery' },
  { title: 'Pick & Drop', icon: '🛵', description: 'Send parcels and pickup requests quickly.', path: '/customer/pick-drop', category: 'Delivery' },
  { title: 'Fresh Mandi', icon: '🥬', description: 'Get fresh groceries and daily essentials.', path: '/customer/fresh-mandi', category: 'Shopping' },
  { title: 'Mishra Ji Cakes', icon: '🎂', description: 'Order cakes and sweet treats for every event.', path: '/customer/mishra-ji-cakes', category: 'Shopping' },
  { title: 'Household', icon: '🛍️', description: 'Browse household essentials and home items.', path: '/customer/household-items', category: 'Home' },
  { title: 'Stationary', icon: '📒', description: 'Explore study supplies and school stationery.', path: '/customer/stationary', category: 'Learning' },
  { title: 'Pandi Ji Chai', icon: '☕', description: 'Order chai, coffee, and hot refreshments.', path: '/customer/pandi-ji-chai', category: 'Shopping' },
  { title: 'Electric Shop', icon: '🔌', description: 'Shop electronics, gadgets, and smart essentials.', path: '/customer/electric-shop', category: 'Home' },
  { title: 'Home Services', icon: '🛠️', description: 'Book reliable home maintenance and support.', path: '/customer/home-services', category: 'Home' },
  { title: 'Laundry', icon: '🧺', description: 'Schedule laundry pickup and doorstep delivery.', path: '/customer/laundry', category: 'Home' },
];

const categories = ['All', 'Health', 'Quick Help', 'Learning', 'Shopping', 'Home', 'Delivery'];

const navItems = [
  { icon: Home, label: 'Home', path: '/customer/home' },
  { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
  { icon: Grid, label: 'Services', path: '/customer/services' },
  { icon: User, label: 'Profile', path: '/customer/profile' },
];

const ServiceCard = ({ title, icon, description, category, onClick }) => (
  <button
    onClick={onClick}
    className="group flex w-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="flex items-center justify-between">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-50 text-3xl transition group-hover:bg-amber-100">
        {icon}
      </div>
      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">
        Open
      </span>
    </div>

    <div className="mt-4">
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
        {category}
      </span>
      <h3 className="mt-3 text-base font-black text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>

    <div className="mt-5 flex items-center justify-between text-sm font-bold text-slate-700">
      <span>Explore service</span>
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </div>
  </button>
);

export default function ServiceList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredServices = useMemo(() => {
    return serviceItems.filter((service) => {
      const text = `${service.title} ${service.description} ${service.category}`.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  return (
    <MobileFrame>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff8e8_0%,_#f8fafc_60%,_#f1f5f9_100%)] pb-28">
        <div className="px-4 pb-6 pt-4 sm:px-6">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0a6e6e] via-[#0c7d7d] to-[#145b5b] p-5 text-white shadow-[0_24px_60px_-20px_rgba(10,110,110,0.55)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/80">Services Hub</p>
                <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Everything you need in one place</h1>
              </div>
              <div className="rounded-2xl bg-white/15 px-3 py-2 text-sm font-black backdrop-blur">
                {serviceItems.length} total
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-[1.25rem] border border-white/20 bg-white/15 px-3 py-2 backdrop-blur">
              <Search className="h-4 w-4 text-white/80" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Tap any card to jump directly to that service.</span>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3.5 py-2 text-sm font-bold transition ${selectedCategory === category ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 shadow-sm'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mb-5 rounded-[1.5rem] border border-slate-200 bg-white/90 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">Available now</p>
                <h2 className="text-lg font-black text-slate-900">{filteredServices.length} matching services</h2>
              </div>
              <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-black text-amber-700">
                Total {serviceItems.length}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                icon={service.icon}
                description={service.description}
                category={service.category}
                onClick={() => navigate(service.path)}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-6 text-center text-sm font-semibold text-slate-500">
              No services match your search yet. Try another keyword.
            </div>
          )}
        </div>
      </div>

      <BottomNav items={navItems} highlightColor="#0A6E6E" />
    </MobileFrame>
  );
}
