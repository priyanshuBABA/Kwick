import React, { useState } from 'react';
import MobileFrame from '../../components/MobileFrame';
import CustomerTopNav from '../../components/CustomerTopNav';
import BottomNav from '../../components/BottomNav';
import { ChevronRight } from 'lucide-react';
import { DAILY_CATS, SERVICE_CATS } from '../../data/htmlDesignData';
import { useNavigate } from 'react-router-dom';

const ServiceListEnhanced = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const categories = activeTab === 'daily' ? DAILY_CATS : SERVICE_CATS;

  const handleCategoryClick = (category) => {
    showToast(`📂 Opening ${category.n}...`);
    navigate('/customer/home');
  };

  const curatedDeals = [
    {
      title: 'Breakfast Essentials',
      subtitle: 'Flat 20% off',
      icon: '🍳',
      color: 'from-amber-400 to-orange-500',
      action: () => showToast('🍳 Opening breakfast deals...')
    },
    {
      title: 'Late Night Snacks Store',
      subtitle: 'Delivered in 15 min',
      icon: '🍟',
      color: 'from-purple-500 to-indigo-600',
      action: () => showToast('🍟 Opening late night snacks...')
    },
    {
      title: 'Emergency Pharmacy',
      subtitle: '24x7 open near you',
      icon: '🚨',
      color: 'from-rose-500 to-red-600',
      action: () => showToast('🚨 Connecting to emergency pharmacy...')
    },
  ];

  return (
    <MobileFrame>
      <CustomerTopNav />

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg z-50 animate-fade-in-down">
          {toast}
        </div>
      )}

      <div className="pb-24">
        {/* Header */}
        <div className="px-6 pt-6 pb-6">
          <h1 className="text-3xl font-black text-slate-900 mb-2">All Categories</h1>
          <p className="text-sm text-gray-600">Everything Kwick delivers, organised in one place.</p>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 mb-6">
          <div className="flex gap-2 bg-white border border-gray-200 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab('daily')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                activeTab === 'daily'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Daily Essentials
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Services & Logistics
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="p-4 rounded-2xl transition-all transform hover:scale-110 active:scale-95 hover:shadow-lg group"
                style={{ backgroundColor: category.c }}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{category.e}</div>
                <p className="font-bold text-xs text-slate-900 text-left line-clamp-2">{category.n}</p>
                <p className="text-[10px] text-gray-700 mt-1 text-left">{category.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Curated Section */}
        <div className="mb-8">
          <div className="px-6 mb-4">
            <h3 className="font-black text-lg text-slate-900">Curated For You</h3>
          </div>
          <div className="px-6">
            <div className="space-y-3">
              {curatedDeals.map((deal, idx) => (
                <button
                  key={idx}
                  onClick={deal.action}
                  className={`w-full bg-gradient-to-r ${deal.color} rounded-2xl p-6 text-white text-left hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 relative overflow-hidden group`}
                >
                  {/* Decorative background */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-black text-lg">{deal.title}</h4>
                        <p className="text-white/90 text-sm mt-1">{deal.subtitle}</p>
                      </div>
                      <span className="text-3xl">{deal.icon}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold mt-4">
                      Open <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="px-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-4">
            <h4 className="font-black text-sm text-blue-900 mb-2">💡 Pro Tip</h4>
            <p className="text-xs text-blue-800">Sign up for Kwick Pro to get free delivery on most orders + exclusive deals!</p>
            <button 
              onClick={() => showToast('✨ Kwick Pro details opened...')}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all text-xs transform hover:scale-105 active:scale-95"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Featured Partner */}
        <div className="px-6 mb-8">
          <h3 className="font-black text-lg text-slate-900 mb-4">Featured Partner</h3>
          <button 
            onClick={() => showToast('🎂 Opening Mishra Cake & Bakery...')}
            className="w-full bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 border-2 border-pink-300 rounded-2xl p-6 text-left transition-all transform hover:scale-105 active:scale-95 group"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎂</div>
              <div className="flex-1">
                <h4 className="font-black text-lg text-slate-900">Mishra Cake & Bakery</h4>
                <p className="text-sm text-gray-700 mt-1">Fresh cakes & pastries for every occasion</p>
                <div className="flex items-center gap-2 mt-3 text-xs font-bold text-pink-700">
                  ⭐ 4.7 · Verified Partner
                </div>
                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast('🛒 Opening menu...');
                    }}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition-all text-xs"
                  >
                    Browse Menu
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast('⭐ Rating submitted...');
                    }}
                    className="flex-1 bg-white hover:bg-gray-50 text-pink-600 font-bold py-2 rounded-lg transition-all text-xs border border-pink-300"
                  >
                    ⭐ Rate
                  </button>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Download App Banner */}
        <div className="px-6 mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
            <p className="text-3xl mb-2">📱</p>
            <h4 className="font-black text-lg mb-2">Download Kwick App</h4>
            <p className="text-sm text-white/90 mb-4">Get exclusive app-only deals & faster checkout</p>
            <button 
              onClick={() => showToast('📥 App download started...')}
              className="w-full bg-white text-purple-600 font-black py-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              Download Now
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
};

export default ServiceListEnhanced;
