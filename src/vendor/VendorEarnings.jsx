import React from 'react';
import MobileFrame from '../components/MobileFrame';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { Store, ShoppingBag, IndianRupee, Menu as MenuIcon, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

const VendorEarnings = () => {
  const navItems = [
    { icon: ShoppingBag, label: 'Orders', path: '/vendor/orders' },
    { icon: MenuIcon, label: 'Menu', path: '/vendor/menu' },
    { icon: IndianRupee, label: 'Earnings', path: '/vendor/earnings' },
    { icon: Store, label: 'Store', path: '/vendor/store' }
  ];

  return (
    <MobileFrame>
      <TopBar title="Earnings" bgColor="bg-slate-50" />
      <div className="p-4 bg-slate-50 min-h-screen pb-24">
         
         <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-[2rem] p-6 text-white shadow-xl shadow-purple-900/20 mb-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <p className="text-purple-200 text-sm font-semibold mb-1 relative z-10 flex items-center gap-2">
              Today's Revenue <TrendingUp className="w-4 h-4 text-green-400" />
            </p>
            <h2 className="text-5xl font-black tracking-tight relative z-10 mb-6 drop-shadow-md">₹2,340<span className="text-xl text-purple-300">.00</span></h2>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
               <div>
                  <p className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">Orders</p>
                  <p className="text-2xl font-bold">12</p>
               </div>
               <div>
                  <p className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">Rating</p>
                  <p className="text-2xl font-bold text-yellow-400">4.8 <span className="text-sm">★</span></p>
               </div>
            </div>
         </div>

         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-navy text-lg">Weekly Summary</h3>
            <button className="flex items-center gap-1 text-slate-400 text-sm font-semibold hover:text-purple-600 transition-colors">
               <Calendar className="w-4 h-4" /> This Week
            </button>
         </div>

         <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-end justify-between h-48 mb-8 relative">
             <div className="absolute inset-x-6 top-8 border-t border-dashed border-slate-200 z-0"></div>
             <div className="absolute inset-x-6 top-20 border-t border-dashed border-slate-200 z-0"></div>
             <div className="absolute inset-x-6 top-32 border-t border-dashed border-slate-200 z-0"></div>
             
             {[
               { day: 'Mon', h: 'h-[40%]', color: 'bg-purple-200' },
               { day: 'Tue', h: 'h-[60%]', color: 'bg-purple-300' },
               { day: 'Wed', h: 'h-[45%]', color: 'bg-purple-200' },
               { day: 'Thu', h: 'h-[80%]', color: 'bg-purple-400' },
               { day: 'Fri', h: 'h-[55%]', color: 'bg-purple-300' },
               { day: 'Sat', h: 'h-[90%]', color: 'bg-purple-brand shadow-[0_4px_10px_rgba(124,58,237,0.4)]' },
               { day: 'Sun', h: 'h-[75%]', color: 'bg-purple-400' },
             ].map((col, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 z-10 w-8">
                   <div className={`w-full ${col.h} ${col.color} rounded-t-lg transition-all duration-500 hover:brightness-110 cursor-pointer`}></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">{col.day}</span>
                </div>
             ))}
         </div>

         <h3 className="font-bold text-navy text-lg mb-4">Recent Payouts</h3>
         <div className="flex flex-col gap-3">
             {[
               { date: 'Oct 24, 2026', amount: '₹14,500', status: 'Completed', color: 'text-green-600 bg-green-50 border-green-200' },
               { date: 'Oct 17, 2026', amount: '₹12,200', status: 'Completed', color: 'text-green-600 bg-green-50 border-green-200' },
               { date: 'Oct 10, 2026', amount: '₹15,800', status: 'Processing', color: 'text-orange-600 bg-orange-50 border-orange-200' }
             ].map((payout, idx) => (
               <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group hover:border-purple-200 transition-colors cursor-pointer">
                  <div>
                    <p className="font-bold text-navy text-sm mb-1">{payout.date}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${payout.color}`}>{payout.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-black text-navy">{payout.amount}</p>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-brand transition-colors" />
                  </div>
               </div>
             ))}
         </div>
      </div>
      <BottomNav items={navItems} highlightColor="#7C3AED" />
    </MobileFrame>
  );
};
export default VendorEarnings;
