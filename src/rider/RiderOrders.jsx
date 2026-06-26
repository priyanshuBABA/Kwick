import React, { useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import StatusBadge from '../components/StatusBadge';
import { Home, IndianRupee, List, User, MapPin, Search } from 'lucide-react';

const RiderOrders = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const tabs = ['All', 'Active', 'Completed'];

  const navItems = [
    { icon: Home, label: 'Home', path: '/rider/home' },
    { icon: IndianRupee, label: 'Earnings', path: '/rider/earnings' },
    { icon: List, label: 'Orders', path: '/rider/orders' },
    { icon: User, label: 'Profile', path: '/rider/profile' }
  ];

  return (
    <MobileFrame>
      <TopBar title="Trip History" bgColor="bg-slate-50" />
      <div className="p-4 bg-slate-50 min-h-screen pb-24">
        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-brand/50 sm:text-sm shadow-sm"
            placeholder="Search by Order ID..."
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6 shadow-inner">
           {tabs.map(tab => (
             <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  activeTab === tab ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500 hover:text-navy'
                }`}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 w-1.5 h-full bg-yellow-400 rounded-r-2xl"></div>

             <div className="flex justify-between items-start mb-3 border-b border-slate-50 pb-3">
               <div>
                  <h3 className="font-bold text-navy text-sm uppercase tracking-wider mb-1">#MS1231</h3>
                  <div className="text-xs text-slate-500 font-medium">Food & Cakes • <span className="text-navy font-bold">₹550</span></div>
               </div>
               <StatusBadge status="In-Progress" />
             </div>
             
             <div className="flex flex-col gap-2 pt-2">
               <div className="flex gap-2 items-center">
                 <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><div className="w-2 h-2 rounded-full bg-blue-500"></div></div>
                 <p className="text-xs font-semibold text-navy truncate">Gupta Bakery, Munger</p>
               </div>
               <div className="w-0.5 h-3 bg-slate-200 ml-3 border-l border-dashed border-slate-300"></div>
               <div className="flex gap-2 items-center">
                 <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0"><MapPin className="w-3 h-3 text-red-500" /></div>
                 <p className="text-xs font-semibold text-navy truncate">Rajesh Kumar, Jamalpur</p>
               </div>
             </div>

             <div className="mt-4 flex justify-between items-center border-t border-slate-100 pt-3">
               <p className="font-bold text-green-600 text-sm">Earnings: ₹65</p>
               <p className="font-medium text-slate-400 text-xs">2.5 km</p>
             </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1.5 h-full bg-green-500 rounded-r-2xl"></div>

             <div className="flex justify-between items-start mb-3 border-b border-slate-50 pb-3">
               <div>
                  <h3 className="font-bold text-navy text-sm uppercase tracking-wider mb-1">#MS1228</h3>
                  <div className="text-xs text-slate-500 font-medium">Medicines • <span className="text-navy font-bold">₹120</span></div>
               </div>
               <StatusBadge status="Delivered" />
             </div>

             <div className="mt-2 flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
               <p className="font-black text-green-600 text-sm flex items-center gap-1">Earnings: ₹40 <span className="w-4 h-4 rounded-full bg-green-100 text-[10px] flex items-center justify-center">✓</span></p>
               <p className="font-bold text-slate-500 text-xs">30 mins ago</p>
             </div>
          </div>
        </div>

      </div>
      <BottomNav items={navItems} highlightColor="#22C55E" />
    </MobileFrame>
  );
};
export default RiderOrders;
