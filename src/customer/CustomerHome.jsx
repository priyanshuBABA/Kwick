import React from 'react';
import MobileFrame from '../components/MobileFrame';
import BottomNav from '../components/BottomNav';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { Home, ShoppingBag, Grid, User, Bell, MapPin, ChevronRight, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCart } from '../CartContext';
import { useAppContext } from '../AppContext';
import LocationPicker from '../components/LocationPicker';

const ServiceCard = ({ title, icon, bg, border, shadow, onClick }) => (
  <div 
    onClick={onClick}
    className={`${bg} ${border} ${shadow} border rounded-[2rem] p-4 flex flex-col items-center justify-center gap-3 cursor-pointer active:scale-95 transition-all transform hover:scale-105 h-32 group overflow-hidden relative`}
  >
    <div className="absolute top-0 right-0 w-8 h-8 bg-black/5 rounded-bl-full group-hover:scale-150 transition-transform" />
    <div className="text-4xl group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">{icon}</div>
    <span className="font-extrabold text-[10px] text-slate-500 uppercase tracking-widest text-center leading-tight group-hover:text-black transition-colors">{title}</span>
  </div>
);

const CustomerHome = () => {
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();
  const { userLocation } = useAppContext();
  const [isLocationOpen, setIsLocationOpen] = React.useState(false);
  const popularProducts = [...products.freshMandi, ...products.foodCakes].slice(0, 6);

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  return (
    <MobileFrame>
      <div className="min-h-screen bg-[#F8FAFC] pb-32">
        {/* Header Section */}
        <div className="bg-[#FFD60A] pt-12 pb-20 px-6 rounded-b-[3.5rem] relative shadow-[0_30px_60px_-15px_rgba(255,214,10,0.3)] overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10 transition-transform duration-500 hover:scale-[1.02]">
            <div>
              <div 
                onClick={() => setIsLocationOpen(true)}
                className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-full cursor-pointer backdrop-blur-md border border-white/40 shadow-sm group active:scale-95 transition-all"
              >
                <MapPin className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-black font-heading tracking-tight">📍 {userLocation} ▼</span>
              </div>
            </div>
<LocationPicker isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
            <button 
              onClick={() => navigate('/notifications')}
              className="bg-white/40 p-3 rounded-[1.2rem] backdrop-blur-md relative shadow-sm border border-white/40 group transform transition-all active:scale-95"
            >
              <Bell className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#FFD60A] shadow-md"></span>
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-8 scale-110 origin-left drop-shadow-sm">
            <span className="text-4xl filter drop-shadow-md">⚡</span>
            <h1 className="text-3xl font-extrabold text-black font-heading tracking-tighter leading-none">Kwick</h1>
          </div>

          <div className="relative group/search">
             <SearchBar placeholder="Search for food, groceries, cabs..." lightMode={true} />
          </div>
        </div>

        <div className="px-6 -mt-10 relative z-20">
          {/* Quick Ride Section (Prominent) */}
          <div 
            onClick={() => navigate('/ride-booking')}
            className="bg-white border-[#FFD60A] border-2 rounded-[2.5rem] p-6 mb-8 flex items-center justify-between shadow-[0_20px_40px_-5px_rgba(255,214,10,0.3)] cursor-pointer active:scale-95 transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD60A]/10 rounded-bl-full group-hover:scale-125 transition-transform" />
            <div className="flex items-center gap-6 relative z-10">
              <div className="text-5xl group-hover:rotate-12 transition-transform">🏍️</div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tighter leading-none mb-1">RideGo <span className="text-yellow-500">⚡</span></h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Instant Bike & Auto Rides</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-[#FFD60A] rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-black group-hover:text-white transition-all">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>

          {/* Service Grid (3x3 Ratio) */}
          <div className="grid grid-cols-3 gap-3 mb-10 animate-slideUp">
            <ServiceCard 
              title="Doctor" 
              icon="🏥" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/doctor')} 
            />
            <ServiceCard 
              title="Ambulance" 
              icon="🚑" 
              bg="bg-white" 
              border="border-[#FFD60A]/30"
              shadow="shadow-[0_10px_25px_-10px_rgba(255,214,10,0.35)]"
              onClick={() => navigate('/customer/ambulance')} 
            />
            <ServiceCard 
              title="Medicines" 
              icon="💊" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/medicines')} 
            />
            <ServiceCard 
              title="Stationery & Gift" 
              icon="🎁" 
              bg="bg-white" 
              border="border-yellow-100"
              shadow="shadow-md"
              onClick={() => navigate('/customer/stationery-gift')} 
            />
            <ServiceCard 
              title="KwickBook" 
              icon="📚" 
              bg="bg-white" 
              border="border-amber-100"
              shadow="shadow-[0_10px_25px_-10px_rgba(255,214,10,0.35)]"
              onClick={() => navigate('/customer/kwickbook')} 
            />
            <ServiceCard 
              title="Pick & Drop" 
              icon="🛵" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/pick-drop')} 
            />
            <ServiceCard 
              title="Fresh Mandi" 
              icon="🥬" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/fresh-mandi')} 
            />
            <ServiceCard 
              title="Mishra Ji Cakes" 
              icon="🎂" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/mishra-ji-cakes')} 
            />
            <ServiceCard 
              title="Household" 
              icon="🛍️" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/household-items')} 
            />
            <ServiceCard 
              title="Stationary" 
              icon="📚" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/stationary')} 
            />
            <ServiceCard 
              title="Pandi Ji Chai" 
              icon="☕" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/pandi-ji-chai')} 
            />
            <ServiceCard 
              title="Electric Shop" 
              icon="🔌" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/electric-shop')} 
            />
            <ServiceCard 
              title="Home Services" 
              icon="🛠️" 
              bg="bg-white" 
              border="border-slate-100"
              shadow="shadow-sm"
              onClick={() => navigate('/customer/home-services')} 
            />
            <ServiceCard 
              title="Laundry" 
              icon="🧺" 
              bg="bg-white" 
              border="border-amber-100"
              shadow="shadow-[0_10px_25px_-10px_rgba(255,214,10,0.35)]"
              onClick={() => navigate('/customer/laundry')} 
            />
          </div>

          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-[2.5rem] p-8 mb-12 shadow-[0_20px_50px_-10px_rgba(34,197,94,0.4)] relative overflow-hidden group hover:scale-[1.02] transition-transform animate-fadeIn text-white">
             <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform">🌿</div>
             <h3 className="font-extrabold text-2xl mb-2 relative z-10 flex items-center gap-3 font-heading">
               <span className="text-3xl">🌅</span> Aaj Subah Ka!
             </h3>
             <p className="text-white/80 relative z-10 font-bold text-sm tracking-tight opacity-90 uppercase">Farm-fresh local delivery <br /> before 8 AM everyday.</p>
          </div>

          {/* Popular Items Horizontal Scroll */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="font-extrabold text-2xl text-slate-900 font-heading tracking-tight flex items-center gap-3">
                 <span className="w-1.5 h-8 bg-[#FFD60A] rounded-full inline-block" />
                 Daily Needs
              </h2>
              <button className="text-xs font-extrabold text-[#F59E0B] uppercase tracking-widest bg-[#FFD60A]/10 px-4 py-2 rounded-full hover:bg-[#FFD60A]/20 transition-all border border-[#FFD60A]/20">View All →</button>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x px-1">
              {popularProducts.map((p, idx) => (
                <div key={idx} className="snap-start min-w-[200px] transform hover:scale-[1.02] transition-transform">
                 <ProductCard product={p} onAdd={addToCart} darkTheme={false} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Subscription Card */}
          <div className="bg-white rounded-[3rem] p-10 mb-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden text-slate-900 cursor-pointer group hover:scale-[1.02] transition-all border border-slate-50">
            <div className="absolute -right-8 -bottom-8 text-9xl opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform text-[#FFD60A]">🌟</div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="font-black text-3xl font-heading mb-1 leading-none text-slate-900">Weekly Tokri Sub.</h3>
                <p className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mt-2">₹299/month • Cancel anytime</p>
              </div>
              <div className="w-16 h-16 bg-[#FFD60A] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#FFD60A]/20 group-active:scale-90 transition-all border-2 border-white/40">
                <ChevronRight className="w-8 h-8 text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/919876543210" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-24 right-6 bg-[#25D366] text-white p-5 rounded-[1.8rem] shadow-[0_15px_40px_-5px_rgba(37,211,102,0.4)] hover:bg-green-600 active:scale-95 transition-all z-40 flex items-center justify-center transform hover:rotate-12 duration-300 border-2 border-white/40"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* Floating Cart Indicator */}
        {cartCount > 0 && (
          <div 
            onClick={() => navigate('/customer/cart')}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-[#0F172A] text-white px-8 py-5 rounded-full shadow-[0_20px_40px_rgba(15,23,42,0.3)] z-40 text-sm font-black flex items-center gap-4 cursor-pointer hover:bg-slate-800 transition-all active:scale-95 border-2 border-white/10"
          >
             <div className="bg-[#FFD60A] text-black w-7 h-7 rounded-full flex items-center justify-center shadow-inner font-extrabold">{cartCount}</div>
             <span className="uppercase tracking-widest text-[11px]">Items in Cart</span>
             <span className="opacity-20 font-light">|</span>
             <span className="text-lg">View ➔</span>
          </div>
        )}

        <BottomNav items={navItems} highlightColor="#F59E0B" />
      </div>
    </MobileFrame>
  );
};

export default CustomerHome;
