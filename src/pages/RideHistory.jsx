import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Filter, Bike, Car, ArrowRight, ArrowLeft, Star, HelpCircle, ShieldCheck } from 'lucide-react';
import { rideHistory } from '../data/mockData';
import TopBar from '../components/TopBar';

const RideHistory = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const filteredRides = rideHistory.filter(ride => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Bike') return ride.type === 'bike';
    if (activeFilter === 'Car') return ride.type === 'car';
    if (activeFilter === 'Cancelled') return ride.status === 'cancelled';
    return true;
  });

  const stats = [
    { label: 'Completed', value: rideHistory.filter(r => r.status === 'completed').length, icon: ShieldCheck, color: 'text-green-500' },
    { label: 'Cancelled', value: rideHistory.filter(r => r.status === 'cancelled').length, icon: HelpCircle, color: 'text-red-500' },
    { label: 'Total Fare', value: '₹430', icon: History, color: 'text-[#FFD60A]' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24 text-white animate-fadeIn overflow-hidden">
      <TopBar 
        title="Your Rides" 
        rightElement={
          <button className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner group active:scale-95 transition-all">
            <Filter size={20} className="text-[#FFD60A] group-hover:rotate-12 transition-transform" />
          </button>
        }
      />

      <div className="p-8">
        {/* Stats Row */}
        <div className="flex gap-4 mb-10 overflow-x-auto no-scrollbar pb-2 animate-slideIn">
          {stats.map((stat, idx) => (
            <div key={idx} className="min-w-[140px] bg-[#1A1A1A] border border-[#2E2E2E] rounded-[2.5rem] p-6 shadow-2xl transition-all hover:scale-105 active:scale-95 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-[2rem] group-hover:scale-150 transition-all duration-700" />
              <div className="bg-[#242424] w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/5">
                <stat.icon className={stat.color} size={24} />
              </div>
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-bold font-heading text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-10 bg-[#1A1A1A] p-2 rounded-[2.5rem] border border-[#2E2E2E] shadow-2xl relative animate-slideUp">
           {['All', 'Bike', 'Car', 'Cancelled'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveFilter(tab)}
               className={`flex-1 py-4 rounded-[2rem] text-sm font-bold font-heading transition-all active:scale-95 transform whitespace-nowrap px-4 border shadow-xl ${
                 activeFilter === tab
                   ? 'bg-[#FFD60A] border-[#FFD60A] text-black font-bold shadow-[#FFD60A]/20'
                   : 'bg-transparent border-transparent text-gray-500'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* Ride Cards */}
        <div className="space-y-6 animate-slideUp">
           {filteredRides.length > 0 ? (
             filteredRides.map((ride, idx) => (
               <div key={idx} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-[3rem] p-8 shadow-2xl relative group overflow-hidden transition-all hover:scale-[1.02]">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD60A]/5 rounded-bl-[4rem] group-hover:scale-150 transition-all duration-1000" />
                 
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                       <div className={`w-18 h-18 rounded-[2rem] flex items-center justify-center text-3xl shadow-2xl border-2 border-white/5 ${ride.type === 'bike' ? 'bg-[#FFD60A]/10' : 'bg-blue-500/10'}`}>
                         {ride.type === 'bike' ? '🏍️' : '🚗'}
                       </div>
                       <div>
                          <div className="text-white font-bold text-xl font-heading mb-1 tracking-tight leading-none">{ride.type === 'bike' ? 'Bike Ride' : 'Car Ride'}</div>
                          <div className="flex items-center gap-2">
                             <span className={`w-2 h-2 rounded-full ${ride.status === 'completed' ? 'bg-green-500 shadow-lg shadow-green-500/20' : 'bg-red-500 shadow-lg shadow-red-500/20'}`} />
                             <span className={`text-[10px] font-bold uppercase tracking-widest ${ride.status === 'completed' ? 'text-green-500/80' : 'text-red-500/80'}`}>{ride.status}</span>
                          </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{ride.date}</div>
                       <div className="text-2xl font-bold font-heading text-white">{ride.fare}</div>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 mb-10 pl-2">
                    <div className="flex flex-col items-center gap-1 relative">
                       <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg" />
                       <div className="w-px h-10 bg-gradient-to-b from-green-500 to-red-500" />
                       <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                    </div>
                    <div className="flex flex-col gap-6">
                       <div className="text-white font-bold text-lg font-heading leading-none tracking-tight">{ride.from}</div>
                       <div className="text-white font-bold text-lg font-heading leading-none tracking-tight">{ride.to}</div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-8 border-t border-white/5 transition-opacity group-hover:opacity-100">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-[#242424] rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                          <span className="text-white font-bold font-heading text-lg">RK</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Driver</span>
                          <span className="text-white font-bold text-sm tracking-tight">{ride.driver}</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => navigate('/book')}
                      className="flex items-center gap-2 bg-[#FFD60A] text-black font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-xl shadow-[#FFD60A]/10 active:scale-95 transition-all transform border-2 border-white/20"
                    >
                       Rebook
                       <ArrowRight size={14} />
                    </button>
                 </div>
               </div>
             ))
           ) : (
             <div className="flex flex-col items-center justify-center py-24 text-center animate-slideUp mt-10">
               <div className="relative mb-12 transform hover:scale-110 transition-transform">
                  <div className="absolute inset-0 bg-[#FFD60A]/5 rounded-full blur-3xl" />
                  <div className="w-32 h-32 bg-[#1A1A1A] rounded-[2.5rem] flex items-center justify-center border-2 border-[#2E2E2E] shadow-2xl relative z-10 animate-bounce">
                    <History size={64} className="text-gray-700" />
                  </div>
               </div>
               <h3 className="text-3xl font-bold font-heading mb-4 text-[#FFD60A] tracking-tight">No rides found</h3>
               <p className="text-gray-500 text-lg mb-12 font-medium leading-relaxed max-w-xs px-6">Book your first ride now and it will appear here.</p>
               <button 
                 onClick={() => navigate('/book')}
                 className="btn-primary py-5 px-10 text-xl shadow-2xl shadow-[#FFD60A]/20 transform active:scale-95 flex items-center justify-center gap-4 border-2 border-white/20"
               >
                 Book Your First Ride
                 <ArrowRight size={24} />
               </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default RideHistory;
