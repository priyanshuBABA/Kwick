import React, { useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import BottomNav from '../components/BottomNav';
import { Store, ShoppingBag, IndianRupee, Menu as MenuIcon, Bell } from 'lucide-react';

const VendorOrders = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('new');

  const navItems = [
    { icon: ShoppingBag, label: 'Orders', path: '/vendor/orders' },
    { icon: MenuIcon, label: 'Menu', path: '/vendor/menu' },
    { icon: IndianRupee, label: 'Earnings', path: '/vendor/earnings' },
    { icon: Store, label: 'Store', path: '/vendor/store' }
  ];

  return (
    <MobileFrame>
      {/* Header */}
      <div className="bg-purple-brand text-white p-4 pt-12 rounded-b-3xl shadow-md z-10 relative">
        <div className="flex justify-between items-center z-10 relative">
          <div>
            <h1 className="text-xl font-extrabold flex items-center gap-2">
              <span className="text-2xl bg-white/20 p-1.5 rounded-xl backdrop-blur-sm">🧁</span> Gupta Bakery
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <button className="bg-white/20 p-2 rounded-full backdrop-blur-sm relative hover:bg-white/30 transition-colors">
                <Bell className="w-5 h-5 fill-current" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-purple-brand text-[8px] flex items-center justify-center font-bold">3</span>
             </button>
             {/* Toggle */}
             <div 
               onClick={() => setIsOpen(!isOpen)}
               className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors shadow-inner flex items-center ${isOpen ? 'bg-green-400' : 'bg-slate-400/50'}`}
             >
               <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isOpen ? 'translate-x-6' : 'translate-x-0'}`}></div>
             </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center mt-6 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
           <div>
             <p className="text-purple-200 text-xs font-semibold uppercase tracking-wider mb-0.5">Today's Earnings</p>
             <p className="text-2xl font-black leading-none">₹1,200</p>
           </div>
           <div className="h-8 w-px bg-white/20"></div>
           <div>
             <p className="text-purple-200 text-xs font-semibold uppercase tracking-wider mb-0.5 text-right">Orders Done</p>
             <p className="text-2xl font-black leading-none text-right">8</p>
           </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 min-h-screen">
         {/* Tabs */}
         <div className="flex gap-2 p-1 bg-white rounded-xl mb-6 shadow-sm border border-slate-100">
           {['new', 'preparing', 'ready'].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 py-1.5 text-sm font-bold rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-purple-100 text-purple-700 shadow-sm' : 'text-slate-500 hover:text-navy'} relative`}
             >
               {tab} {tab === 'new' && <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
             </button>
           ))}
         </div>

         {/* Order List (Only New for now as per requirements) */}
         {activeTab === 'new' && (
           <div className="flex flex-col gap-4 pb-20">
             
             {/* Order 1 */}
             <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden relative">
               <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] uppercase font-black px-3 py-1 rounded-bl-xl tracking-wider shadow-sm">New</div>
               
               <div className="flex justify-between items-start mb-3 border-b border-slate-50 pb-3">
                 <div>
                   <h3 className="font-bold text-navy text-sm uppercase tracking-wider">#S678 <span className="text-slate-400 mx-1">•</span> <span className="text-xs text-slate-500 normal-case font-medium">10 mins ago</span></h3>
                   <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-slate-700">
                     <span className="text-xl">👨🏽</span> Rajesh Kumar • <span className="text-slate-500 font-normal">Jamalpur</span>
                   </div>
                 </div>
               </div>

               <div className="flex flex-col gap-2 mb-4">
                 <div className="flex justify-between items-center text-sm font-medium">
                   <div className="flex items-center gap-2"><span className="text-lg">🎂</span> Chocolate Cake <span className="text-slate-400">x1</span></div>
                   <span>₹500</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-medium">
                   <div className="flex items-center gap-2"><span className="text-lg">🧁</span> Cupcakes <span className="text-slate-400">x6</span></div>
                   <span>₹180</span>
                 </div>
                 <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-100 font-black text-navy text-base">
                   <span>Total Bill</span>
                   <span>₹680</span>
                 </div>
               </div>

               <div className="flex gap-2">
                 <button className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-sm border border-slate-200 hover:bg-slate-200 transition-colors uppercase tracking-wide">✗ Reject</button>
                 <button className="flex-[2] bg-purple-brand text-white font-bold py-2.5 rounded-xl text-sm shadow-md hover:bg-purple-700 transition-colors shadow-purple-500/30 uppercase tracking-wide">✓ Accept Order</button>
               </div>
             </div>

             {/* Order 2 */}
             <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden relative">
               <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] uppercase font-black px-3 py-1 rounded-bl-xl tracking-wider shadow-sm">New</div>
               
               <div className="flex justify-between items-start mb-3 border-b border-slate-50 pb-3">
                 <div>
                   <h3 className="font-bold text-navy text-sm uppercase tracking-wider">#S677 <span className="text-slate-400 mx-1">•</span> <span className="text-xs text-slate-500 normal-case font-medium">25 mins ago</span></h3>
                   <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-slate-700">
                     <span className="text-xl">👩🏽</span> Priya Singh • <span className="text-slate-500 font-normal">Munger</span>
                   </div>
                 </div>
               </div>

               <div className="flex flex-col gap-2 mb-4">
                 <div className="flex justify-between items-center text-sm font-medium">
                   <div className="flex items-center gap-2"><span className="text-lg">🍰</span> Pineapple Pastry <span className="text-slate-400">x2</span></div>
                   <span>₹120</span>
                 </div>
                 <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-100 font-black text-navy text-base">
                   <span>Total Bill</span>
                   <span>₹120</span>
                 </div>
               </div>

               <div className="flex gap-2">
                 <button className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-sm border border-slate-200 hover:bg-slate-200 transition-colors uppercase tracking-wide">✗ Reject</button>
                 <button className="flex-[2] bg-purple-brand text-white font-bold py-2.5 rounded-xl text-sm shadow-md hover:bg-purple-700 transition-colors shadow-purple-500/30 uppercase tracking-wide">✓ Accept Order</button>
               </div>
             </div>

           </div>
         )}
      </div>

      <BottomNav items={navItems} highlightColor="#7C3AED" />
    </MobileFrame>
  );
};
export default VendorOrders;
