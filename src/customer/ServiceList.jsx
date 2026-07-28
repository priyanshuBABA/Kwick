import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../components/MobileFrame';
import BottomNav from '../components/BottomNav';
import { Home, ShoppingBag, Grid, User, ChevronRight, Search } from 'lucide-react';

const serviceItems = [
  { title: 'Doctor', icon: '🏥', description: 'Book appointments with trusted doctors', path: '/customer/doctor' },
  { title: 'Ambulance', icon: '🚑', description: 'Request fast ambulance support', path: '/customer/ambulance' },
  { title: 'Medicines', icon: '💊', description: 'Shop medicines and healthcare essentials', path: '/customer/medicines' },
  { title: 'Stationery & Gift', icon: '🎁', description: 'Buy stationery and gift items', path: '/customer/stationery-gift' },
  { title: 'Kwick Books', icon: '📚', description: 'Buy, rent, or sell books online', path: '/customer/kwick-book-service' },
  { title: 'Kwick Print', icon: '🖨️', description: 'Print documents and flyers quickly', path: '/customer/kwick-print' },
  { title: 'Pick & Drop', icon: '🛵', description: 'Send small parcels and packages', path: '/customer/pick-drop' },
  { title: 'Fresh Mandi', icon: '🥬', description: 'Get fresh groceries delivered', path: '/customer/fresh-mandi' },
  { title: 'Mishra Ji Cakes', icon: '🎂', description: 'Order cakes and bakery treats', path: '/customer/mishra-ji-cakes' },
  { title: 'Household', icon: '🛍️', description: 'Shop household essentials and appliances', path: '/customer/household-items' },
  { title: 'Stationary', icon: '📒', description: 'Browse stationery collections', path: '/customer/stationary' },
  { title: 'Pandi Ji Chai', icon: '☕', description: 'Order chai and hot beverages', path: '/customer/pandi-ji-chai' },
  { title: 'Electric Shop', icon: '🔌', description: 'Shop electronics and home essentials', path: '/customer/electric-shop' },
  { title: 'Home Services', icon: '🛠️', description: 'Book trusted home service providers', path: '/customer/home-services' },
  { title: 'Laundry', icon: '🧺', description: 'Schedule laundry pickup and delivery', path: '/customer/laundry' },
];

const navItems = [
  { icon: Home, label: 'Home', path: '/customer/home' },
  { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
  { icon: Grid, label: 'Services', path: '/customer/services' },
  { icon: User, label: 'Profile', path: '/customer/profile' },
];

const ServiceCard = ({ title, icon, description, onClick }) => (
  <button
    onClick={onClick}
    className="group flex w-full flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-50 text-3xl transition group-hover:bg-amber-100">
      {icon}
    </div>
    <div>
      <h3 className="text-base font-black text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
    <div className="mt-auto flex items-center justify-between text-sm font-bold text-amber-600">
      <span>Open</span>
      <ChevronRight className="h-4 w-4" />
    </div>
  </button>
);

export default function ServiceList() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-screen bg-[#F8FAFC] pb-28">
        <div className="bg-[#FFD60A] px-6 pb-6 pt-10 text-slate-900">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800/80">Services</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight">Explore all available services</h1>
            </div>
            <div className="rounded-3xl bg-white/90 px-4 py-3 text-sm font-black text-slate-900 shadow-sm">Live</div>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                disabled
                placeholder="Search services..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              />
            </div>
            <p className="mt-3 text-sm text-slate-600">Tap any service to open the corresponding page.</p>
          </div>
        </div>

        <div className="-mt-10 px-4 pb-6">
          <div className="grid gap-4 md:grid-cols-2">
            {serviceItems.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                icon={service.icon}
                description={service.description}
                onClick={() => navigate(service.path)}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNav items={navItems} highlightColor="#0A6E6E" />
    </MobileFrame>
  );
}
