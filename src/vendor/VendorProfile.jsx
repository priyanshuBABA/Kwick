import React, { useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { Store, ShoppingBag, IndianRupee, Menu as MenuIcon, Edit3, Settings, HelpCircle, LogOut } from 'lucide-react';

const VendorProfile = () => {
  const [isOpen] = useState(true);

  const navItems = [
    { icon: ShoppingBag, label: 'Orders', path: '/vendor/orders' },
    { icon: MenuIcon, label: 'Menu', path: '/vendor/menu' },
    { icon: IndianRupee, label: 'Earnings', path: '/vendor/earnings' },
    { icon: Store, label: 'Store', path: '/vendor/store' }
  ];

  return (
    <MobileFrame>
      <TopBar title="My Store" bgColor="bg-slate-50" />
      <div className="p-4 bg-slate-50 min-h-screen pb-24">
         
         <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center p-6 relative overflow-hidden mb-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-brand/10 rounded-full blur-2xl"></div>
            
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-5xl shrink-0 shadow-inner border border-purple-200 mb-4 z-10">
              🧁
            </div>
            
            <div className="text-center z-10">
               <h2 className="text-2xl font-black text-navy leading-tight mb-1">Gupta Bakery</h2>
               <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">ID: VND-0824</p>
               <div className="flex items-center justify-center gap-2">
                 <span className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></span>
                 <span className="font-semibold text-sm text-slate-700">{isOpen ? 'Open for Orders' : 'Store is Closed'}</span>
               </div>
            </div>

            <button className="absolute top-4 right-4 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-purple-brand hover:bg-purple-50 transition-colors shadow-sm active:scale-95 shrink-0 z-10">
              <Edit3 className="w-4 h-4" />
            </button>
         </div>

         <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative">
            <div className="flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                   <Settings className="w-5 h-5 text-slate-500" />
                 </div>
                 <span className="font-semibold text-navy text-sm">Store Settings</span>
               </div>
               <span className="text-slate-300 group-hover:text-purple-brand transition-colors">➔</span>
            </div>
            <div className="flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                   <HelpCircle className="w-5 h-5 text-slate-500" />
                 </div>
                 <span className="font-semibold text-navy text-sm">Vendor Support</span>
               </div>
               <span className="text-slate-300 group-hover:text-purple-brand transition-colors">➔</span>
            </div>
            <div className="flex items-center justify-between p-5 hover:bg-red-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-red-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                   <LogOut className="w-5 h-5 text-red-500" />
                 </div>
                 <span className="font-bold text-red-500 text-sm">Logout</span>
               </div>
               <span className="text-red-300 group-hover:text-red-500 transition-colors">➔</span>
            </div>
         </div>
      </div>
      <BottomNav items={navItems} highlightColor="#7C3AED" />
    </MobileFrame>
  );
};
export default VendorProfile;
