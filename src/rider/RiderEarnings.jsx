import React from 'react';
import MobileFrame from '../components/MobileFrame';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { Home, IndianRupee, List, User, TrendingUp, ChevronRight } from 'lucide-react';

const RiderEarnings = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/rider/home' },
    { icon: IndianRupee, label: 'Earnings', path: '/rider/earnings' },
    { icon: List, label: 'Orders', path: '/rider/orders' },
    { icon: User, label: 'Profile', path: '/rider/profile' }
  ];

  return (
    <MobileFrame>
      <TopBar title="My Earnings" bgColor="bg-slate-50" />
      <div className="p-4 bg-slate-50 min-h-screen pb-24">
         
         <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-[2rem] p-6 text-white shadow-xl shadow-green-900/20 mb-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <p className="text-green-200 text-sm font-semibold mb-1 relative z-10 flex items-center gap-2">
              This Week <TrendingUp className="w-4 h-4 text-green-300" />
            </p>
            <h2 className="text-5xl font-black tracking-tight relative z-10 mb-6 drop-shadow-md">₹2,340<span className="text-xl text-green-300">.00</span></h2>
            
            <div className="grid grid-cols-2 gap-4 relative z-10 p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
               <div>
                  <p className="text-green-200 text-[10px] font-bold uppercase tracking-wider mb-1">Total Trips</p>
                  <p className="text-xl font-bold">45</p>
               </div>
               <div>
                  <p className="text-green-200 text-[10px] font-bold uppercase tracking-wider mb-1">Online Time</p>
                  <p className="text-xl font-bold">32.5 <span className="text-sm">hrs</span></p>
               </div>
            </div>
         </div>

         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-navy text-lg">Weekly Graph</h3>
         </div>

         <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-end justify-between h-48 mb-8 relative">
             <div className="absolute inset-x-6 top-8 border-t border-dashed border-slate-200 z-0"></div>
             <div className="absolute inset-x-6 top-20 border-t border-dashed border-slate-200 z-0"></div>
             <div className="absolute inset-x-6 top-32 border-t border-dashed border-slate-200 z-0"></div>
             
             {[
               { day: 'Mon', h: 'h-[40%]', color: 'bg-green-200' },
               { day: 'Tue', h: 'h-[60%]', color: 'bg-green-300' },
               { day: 'Wed', h: 'h-[45%]', color: 'bg-green-200' },
               { day: 'Thu', h: 'h-[80%]', color: 'bg-green-400' },
               { day: 'Fri', h: 'h-[55%]', color: 'bg-green-300' },
               { day: 'Sat', h: 'h-[90%]', color: 'bg-green-brand shadow-[0_4px_10px_rgba(34,197,94,0.4)]' },
               { day: 'Sun', h: 'h-[75%]', color: 'bg-green-400' },
             ].map((col, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 z-10 w-8">
                   <div className={`w-full ${col.h} ${col.color} rounded-t-lg transition-all duration-500 hover:brightness-110 cursor-pointer`}></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">{col.day}</span>
                </div>
             ))}
         </div>

         <h3 className="font-bold text-navy text-lg mb-4">Recent Trips</h3>
         <div className="flex flex-col gap-3">
             <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group hover:border-green-200 transition-colors cursor-pointer">
                <div>
                  <p className="font-bold text-navy text-sm mb-1">Today, 2:30 PM</p>
                  <p className="text-xs text-slate-500 font-medium">Food & Cakes • 3.2 km</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-black text-green-600 text-lg">₹65</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Completed</span>
                </div>
             </div>
             <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group hover:border-green-200 transition-colors cursor-pointer">
                <div>
                  <p className="font-bold text-navy text-sm mb-1">Today, 1:15 PM</p>
                  <p className="text-xs text-slate-500 font-medium">Fresh Mandi • 1.5 km</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-black text-green-600 text-lg">₹40</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Completed</span>
                </div>
             </div>
             <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group hover:border-green-200 transition-colors cursor-pointer opacity-70">
                <div>
                  <p className="font-bold text-navy text-sm mb-1">Today, 11:00 AM</p>
                  <p className="text-xs text-slate-500 font-medium">Medicines • 4.0 km</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-black text-slate-500 text-lg">₹0</p>
                  <span className="text-[10px] font-bold text-red-400 uppercase">Cancelled</span>
                </div>
             </div>
         </div>
      </div>
      <BottomNav items={navItems} highlightColor="#22C55E" />
    </MobileFrame>
  );
};
export default RiderEarnings;
