import React, { useState } from 'react';
import MobileFrame from '../../components/MobileFrame';
import BottomNav from '../../components/BottomNav';
import { DAILY_CATS, SERVICE_CATS } from '../../data/htmlDesignData';
import { useNavigate } from 'react-router-dom';

const ServiceList = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const navigate = useNavigate();
  const categories = activeTab === 'daily' ? DAILY_CATS : SERVICE_CATS;

  return (
    <MobileFrame>
      <div className="pb-20">
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          <h1 className="text-2xl font-black text-slate-900 mb-2">All Categories</h1>
          <p className="text-sm text-gray-600">Everything Kwick delivers, organised in one place.</p>
        </div>

        {/* Tab Bar */}
        <div className="px-6 mb-6">
          <div className="flex gap-3 w-full border border-gray-200 bg-white rounded-2xl p-1">
            <button
              onClick={() => setActiveTab('daily')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-colors ${
                activeTab === 'daily'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Daily Essentials
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-colors ${
                activeTab === 'services'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Services
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  alert(`Opening ${cat.n}...`);
                  navigate(`/customer/home?category=${cat.n}`);
                }}
                className="rounded-2xl p-4 flex flex-col items-center gap-2 text-center cursor-pointer hover:shadow-md transition-all transform hover:scale-105"
                style={{ backgroundColor: cat.c }}
              >
                <span className="text-2xl">{cat.e}</span>
                <span className="font-bold text-xs text-slate-900">{cat.n}</span>
                <span className="text-[10px] text-gray-600">{cat.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Section */}
        <div className="px-6 mb-8">
          <h3 className="font-black text-lg text-slate-900 mb-4">Curated For You</h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-6 text-white">
              <span className="text-2xl block mb-2">🔍</span>
              <h4 className="font-black text-lg mb-1">Breakfast Essentials</h4>
              <p className="text-sm text-white/90">Flat 20% off</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <span className="text-2xl block mb-2">🍟</span>
              <h4 className="font-black text-lg mb-1">Late Night Snacks</h4>
              <p className="text-sm text-white/90">Delivered in 15 min</p>
            </div>
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl p-6 text-white">
              <span className="text-2xl block mb-2">🚨</span>
              <h4 className="font-black text-lg mb-1">Emergency Pharmacy</h4>
              <p className="text-sm text-white/90">24x7 open near you</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
};

export default ServiceList;
