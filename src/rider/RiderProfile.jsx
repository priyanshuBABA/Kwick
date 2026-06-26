import React, { useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { Home, IndianRupee, List, User, FileText, Banknote, ShieldQuestion, LogOut, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RiderProfile = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const navItems = [
    { icon: Home, label: 'Home', path: '/rider/home' },
    { icon: IndianRupee, label: 'Earnings', path: '/rider/earnings' },
    { icon: List, label: 'Orders', path: '/rider/orders' },
    { icon: User, label: 'Profile', path: '/rider/profile' }
  ];

  return (
    <MobileFrame>
      <TopBar title="My Profile" bgColor="bg-slate-50" />
      <div className="p-4 bg-slate-50 min-h-screen pb-24">
         
         <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center p-6 relative overflow-hidden mb-6">
            <div className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-2xl transition-colors ${isOnline ? 'bg-green-brand/10' : 'bg-slate-400/10'}`}></div>
            
            <div className="relative mb-4 z-10">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl shrink-0 shadow-inner border border-green-200">
                👨🏽‍🚀
              </div>
              <div className={`absolute bottom-0 right-2 w-6 h-6 rounded-full border-4 border-white shadow-sm ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            
            <div className="text-center z-10 w-full mb-6">
               <h2 className="text-2xl font-black text-navy leading-tight mb-1">Aman Kumar</h2>
               <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500">
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full border border-yellow-200">⭐ 4.8</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 uppercase tracking-wider">ID: RID-001</span>
               </div>
            </div>

            <div className="w-full bg-slate-50 rounded-2xl p-4 flex justify-between items-center shadow-inner border border-slate-200 z-10">
                <span className="font-black text-navy flex items-center gap-2"><Activity className="w-5 h-5 text-slate-400" /> Duty Status</span>
                {/* Toggle Switch */}
                <div 
                  onClick={() => setIsOnline(!isOnline)}
                  className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors shadow-inner flex items-center border ${isOnline ? 'bg-green-400 border-green-500' : 'bg-slate-300 border-slate-400'}`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isOnline ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">📦</div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
                  <p className="text-xl font-black text-navy leading-none">1,245</p>
               </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3">
               <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center shrink-0">₹</div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Earned</p>
                  <p className="text-xl font-black text-navy leading-none">42.5k</p>
               </div>
            </div>
         </div>

         <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative">
            <div className="flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all text-slate-500">
                   <FileText className="w-5 h-5" />
                 </div>
                 <span className="font-semibold text-navy text-sm">Documents (DL/RC)</span>
               </div>
               <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider border border-green-200">Verified</span>
            </div>
            
            <div className="flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all text-slate-500">
                   <Banknote className="w-5 h-5" />
                 </div>
                 <span className="font-semibold text-navy text-sm">Bank Details</span>
               </div>
               <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-500 transition-colors" />
            </div>

            <div className="flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all text-slate-500">
                   <ShieldQuestion className="w-5 h-5" />
                 </div>
                 <span className="font-semibold text-navy text-sm">Help & Training</span>
               </div>
               <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-500 transition-colors" />
            </div>

            <div 
               onClick={() => { localStorage.clear(); navigate('/'); }}
               className="flex items-center justify-between p-5 hover:bg-red-50 transition-colors cursor-pointer group"
            >
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-red-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                   <LogOut className="w-5 h-5 text-red-500" />
                 </div>
                 <span className="font-bold text-red-500 text-sm">Logout</span>
               </div>
               <ChevronRight className="w-4 h-4 text-red-300 group-hover:text-red-500 transition-colors" />
            </div>
         </div>
      </div>
      <BottomNav items={navItems} highlightColor="#22C55E" />
    </MobileFrame>
  );
};
export default RiderProfile;
