import React, { useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { Store, ShoppingBag, IndianRupee, Menu as MenuIcon, Plus, Edit2 } from 'lucide-react';

const VendorMenu = () => {
  const navItems = [
    { icon: ShoppingBag, label: 'Orders', path: '/vendor/orders' },
    { icon: MenuIcon, label: 'Menu', path: '/vendor/menu' },
    { icon: IndianRupee, label: 'Earnings', path: '/vendor/earnings' },
    { icon: Store, label: 'Store', path: '/vendor/store' }
  ];

  const menuItems = [
    { id: 1, name: 'Chocolate Cake', price: 450, emoji: '🎂', category: 'Cakes' },
    { id: 2, name: 'Bread Loaf', price: 40, emoji: '🍞', category: 'Bakery' },
    { id: 3, name: 'Pani Puri Combo', price: 120, emoji: '🥣', category: 'Snacks' },
    { id: 4, name: 'Pineapple Pastry', price: 180, emoji: '🍰', category: 'Pastries' }
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <MobileFrame>
      <TopBar title="Manage Menu" bgColor="bg-slate-50" />
      
      <div className="p-4 bg-slate-50 min-h-screen pb-24">
         {/* Categories */}
         <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
            {['All', 'Cakes', 'Bakery', 'Snacks', 'Pastries'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat ? 'bg-purple-brand text-white shadow-md shadow-purple-900/20' : 'bg-white text-slate-500 border border-slate-200 hover:border-purple-300'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>

         {/* Menu List */}
         <div className="space-y-4 relative">
            {menuItems.filter(item => activeCategory === 'All' || item.category === activeCategory).map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-all group relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-brand opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="flex items-center gap-4 relative z-10 w-full">
                    <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-3xl shrink-0 shadow-inner border border-slate-100">
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-navy text-sm mb-1">{item.name}</h3>
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-2">{item.category}</p>
                      <p className="font-black text-purple-700 text-lg leading-none">₹{item.price}</p>
                    </div>
                    <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-purple-brand hover:bg-purple-50 transition-colors shadow-sm active:scale-95 shrink-0">
                      <Edit2 className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-purple-brand text-white rounded-full flex items-center justify-center shadow-lg shadow-purple-900/30 hover:scale-105 active:scale-95 transition-all z-50">
         <Plus className="w-6 h-6" />
      </button>

      <BottomNav items={navItems} highlightColor="#7C3AED" />
    </MobileFrame>
  );
};
export default VendorMenu;
