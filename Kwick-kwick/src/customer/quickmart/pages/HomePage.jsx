import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { categories } from '../data/categories';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Header title="QuickMart" />
      
      {/* Promo Banner */}
      <div className="p-4">
        <div className="bg-[#00897B] rounded-[20px] p-6 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black font-['Poppins'] mb-1">Daily Essentials</h2>
            <p className="text-sm font-bold opacity-90 uppercase tracking-widest">Delivered in 15 mins</p>
          </div>
          <div className="text-6xl opacity-20 transform -rotate-12">🛵</div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full translate-x-10 -translate-y-10"></div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 pb-20 space-y-6">
        {categories.map((category, idx) => (
          <div 
            key={category.id} 
            className="bg-white rounded-[20px] p-5 shadow-sm border-l-[6px] border-[#FFD700] animate-fadeIn"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-[#111111] font-['Poppins']">
                {category.name}
              </h3>
              <Link 
                to={`/customer/household-items/category/${category.id}`}
                className="text-xs font-black text-[#FFD700] uppercase tracking-widest bg-black px-3 py-1 rounded-full"
              >
                See All
              </Link>
            </div>
            
            <div className="grid grid-cols-4 gap-y-6 gap-x-2">
              {category.subcategories.slice(0, 8).map((sub) => (
                <Link 
                  key={sub.id} 
                  to={`/customer/household-items/subcategory/${sub.id}`}
                  className="flex flex-col items-center gap-2 group no-underline"
                >
                  <div className="w-[72px] h-[72px] bg-[#E0F7FA] rounded-2xl flex items-center justify-center p-2 shadow-sm transition-all group-hover:scale-105 group-active:scale-95">
                    <span className="text-3xl drop-shadow-sm">{sub.emoji}</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-center text-[#111111] leading-tight line-clamp-2 h-8 font-['Nunito'] uppercase tracking-tighter">
                    {sub.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
