import React from 'react';
import MobileFrame from '../components/MobileFrame';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { Home, ShoppingBag, Grid, User, MapPin, Wallet, RefreshCw, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  const menuItems = [
    { icon: <MapPin className="w-5 h-5 text-slate-500" />, label: "Saved Addresses" },
    { icon: <Wallet className="w-5 h-5 text-slate-500" />, label: "My Wallet", badge: "₹120" },
    { icon: <RefreshCw className="w-5 h-5 text-slate-500" />, label: "Subscriptions" },
    { icon: <HelpCircle className="w-5 h-5 text-slate-500" />, label: "Help & Support" },
  ];

  return (
    <MobileFrame>
      <TopBar title="My Profile" bgColor="bg-slate-50" />
      <div className="p-4 bg-slate-50 min-h-screen">
         {/* Profile Card */}
         <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center gap-4 mb-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            
            <div className="w-20 h-20 rounded-full bg-primary/20 flex flex-col items-center justify-center border-4 border-white shadow-md z-10 relative">
              <span className="text-3xl">👨🏽</span>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="z-10">
              <h2 className="text-2xl font-black text-navy leading-tight">Rajesh<br/>Kumar</h2>
              <p className="text-slate-500 font-medium text-sm mt-1 bg-slate-100 px-3 py-1 rounded-full w-max">+91 9976543210</p>
            </div>
         </div>

         {/* Menu List */}
         <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden pb-20">
            {menuItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group active:bg-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">{item.icon}</div>
                  <span className="font-semibold text-navy text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {item.badge && <span className="bg-green-100 text-green-700 font-bold text-xs px-2 py-1 rounded-md">{item.badge}</span>}
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
            
            <div 
              onClick={() => { localStorage.clear(); navigate('/'); }}
              className="flex items-center justify-between p-5 hover:bg-red-50 transition-colors cursor-pointer group active:bg-red-100"
            >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                    <LogOut className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="font-bold text-red-500 text-sm">Logout</span>
                </div>
                <ChevronRight className="w-5 h-5 text-red-300 group-hover:text-red-500 transition-colors" />
            </div>
         </div>
      </div>
      <BottomNav items={navItems} highlightColor="#FFC107" />
    </MobileFrame>
  );
};
export default CustomerProfile;
