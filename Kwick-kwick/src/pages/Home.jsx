import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, MapPin, Bike, Car, Shield, Navigation, HelpCircle, Star, ChevronRight } from 'lucide-react';
import { rideHistory, notifications } from '../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 overflow-x-hidden">
      {/* Top Section */}
      <div className="bg-[#FFD60A] pt-12 pb-20 px-6 rounded-b-[3.5rem] relative shadow-[0_30px_60px_-15px_rgba(255,214,10,0.3)]">
        <div className="flex items-center justify-between mb-10 transition-transform hover:scale-105">
          <button className="p-3 bg-white/40 rounded-2xl backdrop-blur-md shadow-sm border border-white/40">
            <Menu size={20} className="text-black" />
          </button>
          <div className="text-2xl font-bold font-heading text-black tracking-tight scale-110 drop-shadow-sm">RideGo ⚡</div>
          <button 
            onClick={() => navigate('/ride-booking/notifications')}
            className="p-3 bg-white/40 rounded-2xl backdrop-blur-md relative shadow-sm border border-white/40"
          >
            <Bell size={20} className="text-black" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-[#FFD60A] text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-md">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-10 animate-slideIn">
          <div className="flex items-center gap-2 bg-white/40 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/40 shadow-sm">
            <MapPin size={18} className="text-black" />
            <span className="text-sm font-bold text-black font-heading">📍 Munger, Bihar</span>
            <span className="text-black/60 text-xs">▼</span>
          </div>
        </div>

        <div 
          onClick={() => navigate('/ride-booking/book')}
          className="bg-white rounded-3xl p-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] flex items-center border-4 border-white/60 ring-8 ring-[#FFD60A]/10 transition-all hover:scale-[1.02] cursor-pointer group"
        >
          <div className="bg-[#FFD60A]/10 p-4 rounded-2xl mr-4 shadow-inner group-hover:bg-[#FFD60A]/20 transition-colors">
            <Search size={22} className="text-black" />
          </div>
          <span className="text-slate-400 font-bold text-lg">Where are you going?</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-10 mb-12 flex gap-4 overflow-x-auto no-scrollbar pb-4 animate-slideUp">
        <div 
          onClick={() => navigate('/ride-booking/book', { state: { presetType: 'bike' } })}
          className="min-w-[150px] bg-white rounded-[2.5rem] p-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)] border border-slate-50 transform transition-all hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏍️</div>
          <div className="text-slate-900 font-bold font-heading text-xl tracking-tight">Bike Ride</div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Faster & Cheaper</div>
        </div>
        <div 
          onClick={() => navigate('/ride-booking/book', { state: { presetType: 'car' } })}
          className="min-w-[150px] bg-white rounded-[2.5rem] p-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)] border border-slate-50 transform transition-all hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚗</div>
          <div className="text-slate-900 font-bold font-heading text-xl tracking-tight">Car Ride</div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">High Comfort AC</div>
        </div>
        <div className="min-w-[150px] bg-white rounded-[2.5rem] p-6 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.1)] border border-green-50 transform transition-all hover:scale-105 active:scale-95 cursor-pointer group">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎁</div>
          <div className="text-green-600 font-bold font-heading text-xl tracking-tight">Referral</div>
          <div className="text-green-600/60 text-[10px] font-black uppercase tracking-widest mt-2">Get ₹50 Free</div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-6 mb-12 flex gap-4 overflow-x-auto no-scrollbar pb-2">
        <div className="min-w-[320px] h-40 bg-gradient-to-r from-[#FFD60A] to-[#F59E0B] rounded-[3rem] p-8 text-black flex items-center gap-8 shadow-[0_20px_50px_-10px_rgba(255,214,10,0.4)] relative overflow-hidden group border-4 border-white/40">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full translate-x-12 -translate-y-12 blur-2xl group-hover:translate-x-0 transition-transform" />
          <div className="text-7xl group-hover:scale-110 transition-transform drop-shadow-lg">🎉</div>
          <div>
            <h3 className="text-3xl font-black font-heading leading-none mb-2">SAVE20</h3>
            <p className="text-sm font-bold opacity-80 uppercase tracking-tighter">20% off on all bike rides in Munger!</p>
          </div>
        </div>
      </div>

      {/* Recent Rides */}
      <div className="px-6 mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-900 font-heading tracking-tight flex items-center gap-4">
            <span className="w-1.5 h-8 bg-[#FFD60A] rounded-full inline-block" />
            Recent Rides
          </h2>
          <button 
            onClick={() => navigate('/ride-booking/history')}
            className="text-[#F59E0B] text-[10px] font-black uppercase tracking-widest bg-[#FFD60A]/10 px-5 py-2.5 rounded-full hover:bg-[#FFD60A]/20 transition-all border border-[#FFD60A]/20"
          >
            See All →
          </button>
        </div>

        <div className="space-y-6">
          {rideHistory.slice(0, 2).map((ride, idx) => (
            <div key={idx} className="bg-white border border-slate-50 rounded-[2.5rem] p-8 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] relative group overflow-hidden hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] transition-all transform hover:scale-[1.01]">
              <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-full group-hover:scale-150 transition-transform duration-500 opacity-50" />
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner border border-white/50 ${ride.type === 'bike' ? 'bg-[#FFD60A]/20' : 'bg-blue-500/10'}`}>
                    {ride.type === 'bike' ? '🏍️' : '🚗'}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-xl font-heading text-slate-900 tracking-tight">{ride.from}</span>
                      <span className="text-slate-300">→</span>
                      <span className="font-extrabold text-xl font-heading text-slate-900 tracking-tight">{ride.to}</span>
                    </div>
                    <div className="text-slate-400 text-[10px] font-black mt-2 uppercase tracking-widest">{ride.date}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-slate-900 font-heading tracking-tighter">{ride.fare}</span>
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${ride.status === 'completed' ? 'text-green-600 bg-green-50 border-green-100' : 'text-red-500 bg-red-50 border-red-100'}`}>
                    {ride.status}
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/ride-booking/book')}
                  className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl border border-white/10"
                >
                  Rebook
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Section */}
      <div className="px-6 mb-12">
        <h2 className="text-2xl font-black text-slate-900 font-heading mb-8 flex items-center gap-3 tracking-tight">
          <span className="w-1.5 h-8 bg-green-500 rounded-full inline-block" />
          Ride Safe with RideGo
        </h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {[
            { icon: Shield, label: 'Verified Drivers', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
            { icon: Navigation, label: 'Live Tracking', bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100' },
            { icon: HelpCircle, label: 'SOS Button', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
            { icon: Star, label: 'Top Rated', bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' }
          ].map((item, idx) => (
            <div key={idx} className="min-w-[130px] bg-white border border-slate-50 p-6 rounded-[2.5rem] flex flex-col items-center text-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] transition-all hover:scale-105 active:scale-95 cursor-pointer">
              <div className={`p-5 ${item.bg} rounded-2xl mb-4 shadow-inner border ${item.border} group-hover:scale-110 transition-transform`}>
                <item.icon className={item.text} size={28} />
              </div>
              <span className="text-slate-900 font-black text-[10px] uppercase tracking-widest leading-none">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
