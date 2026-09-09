import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, AlertCircle, ShieldCheck, ChevronRight, MapPin, Navigation, Star } from 'lucide-react';
import MapPlaceholder from '../components/MapPlaceholder';
import { drivers } from '../data/mockData';

const RideLive = () => {
  const [rideStatus, setRideStatus] = useState('arriving'); // arriving, riding, done
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const rideType = location.state?.type || 'bike';
  const driver = drivers.find(d => d.type === rideType) || drivers[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setRideStatus('riding');
    }, 5000);

    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 1000);

    const doneTimer = setTimeout(() => {
      setRideStatus('done');
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative flex flex-col pt-4 animate-fadeIn overflow-hidden">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 h-[65%] z-0">
        <MapPlaceholder height="h-full" showRoute={true} showMovingDot={rideStatus === 'riding'} />
      </div>

      <div className="absolute top-8 left-6 right-6 z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <div className="p-3 bg-[#FFD60A] rounded-2xl text-black font-bold font-heading shadow-2xl animate-bounce flex items-center gap-2 border-2 border-white/20">
            <Navigation size={18} />
            Arriving in 2 min
          </div>
          <button className="p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-2xl border border-white/20 hover:bg-white/30 transition-colors">
            <ShieldCheck size={24} className="text-white" />
          </button>
        </div>
        <div className="bg-[#1A1A1A]/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-[#2E2E2E] shadow-2xl flex items-center gap-6 group">
          <div className="w-14 h-14 bg-[#FFD60A] rounded-2xl flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 transition-transform">
            {rideType === 'bike' ? '🏍️' : '🚗'}
          </div>
          <div>
            <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Destination</div>
            <div className="text-white font-bold font-heading text-lg truncate w-48 leading-none">Jamalpur Market</div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="mt-auto relative z-10 bg-[#0A0A0A] rounded-t-[4rem] p-10 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-[#2E2E2E] animate-slideUp">
        <div className="w-16 h-2 bg-[#2E2E2E] rounded-full mx-auto mb-10 shadow-inner" />
        
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className={`text-4xl font-bold font-heading mb-2 leading-tight ${rideStatus === 'arriving' ? 'text-[#FFD60A]' : rideStatus === 'riding' ? 'text-blue-500' : 'text-green-500'} transition-colors duration-500`}>
              {rideStatus === 'arriving' ? 'Driver on the way' : rideStatus === 'riding' ? 'Ride in Progress' : 'Dropped Off'}
            </h2>
            <p className="text-gray-500 text-lg font-bold uppercase tracking-tight opacity-60">Arriving in <span className="text-white">2 mins</span> at Munger Fort</p>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-3xl border border-[#2E2E2E] shadow-xl group">
             <Star className="text-[#FFD60A] group-hover:rotate-12 transition-transform" size={24} />
          </div>
        </div>

        {/* Driver Info Card */}
        <div className="flex items-center gap-6 p-10 bg-[#1A1A1A] rounded-[3.5rem] border border-[#2E2E2E] mb-12 shadow-2xl transform transition-all hover:scale-[1.02] relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD60A]/5 rounded-bl-[4rem] group-hover:scale-150 transition-transform duration-700" />
          <div className="w-20 h-20 bg-[#FFD60A] rounded-[2rem] flex items-center justify-center font-bold text-black text-3xl font-heading shadow-xl ring-4 ring-[#FFD60A]/10">
            {driver.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold font-heading text-white mb-2">{driver.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#242424] px-4 py-1.5 rounded-full text-xs font-bold text-[#FFD60A] border border-[#FFD60A]/20 shadow-sm flex items-center gap-2">
                ⭐ {driver.rating}
              </span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{driver.trips} trips completed</span>
            </div>
            <p className="text-gray-400 font-bold tracking-tight text-lg mb-1 leading-none">{driver.vehicle}</p>
            <p className="text-white font-bold leading-none text-xl lowercase bg-[#FFD60A]/10 px-4 py-2 rounded-xl border border-[#FFD60A]/20 inline-block uppercase mt-3">{driver.plate}</p>
          </div>
        </div>

        {/* Ride Progress Bar */}
        <div className="mb-14 px-4">
           <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Progress</span>
              <span className="text-white font-bold text-sm tracking-tight">{rideStatus === 'arriving' ? 'Pickup in 1.2km' : `Dropped in ${100-progress}m`}</span>
           </div>
           <div className="h-4 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#2E2E2E] shadow-inner p-1">
             <div 
               className={`h-full rounded-full transition-all duration-1000 linear shadow-xl min-w-[20px] ${rideStatus === 'arriving' ? 'bg-[#FFD60A]' : rideStatus === 'riding' ? 'bg-blue-500' : 'bg-green-500'}`}
               style={{ width: `${progress}%` }}
             >
               <div className="w-full h-full bg-white/20 animate-pulse" />
             </div>
           </div>
           <div className="flex justify-between mt-4">
             <div className="flex flex-col items-center gap-2 group">
               <div className={`w-3 h-3 rounded-full shadow-lg ${progress >= 0 ? 'bg-[#FFD60A] animate-pulse ring-4 ring-[#FFD60A]/20' : 'bg-[#2E2E2E]'}`} />
               <span className={`text-[10px] font-bold uppercase tracking-tight ${progress >= 0 ? 'text-white' : 'text-gray-600'}`}>Munger Fort</span>
             </div>
             <div className="flex flex-col items-center gap-2 group">
               <div className={`w-3 h-3 rounded-full shadow-lg ${progress >= 50 ? 'bg-blue-500 animate-pulse ring-4 ring-blue-500/20' : 'bg-[#2E2E2E]'}`} />
               <span className={`text-[10px] font-bold uppercase tracking-tight ${progress >= 50 ? 'text-white' : 'text-gray-600'}`}>On Route</span>
             </div>
             <div className="flex flex-col items-center gap-2 group">
               <div className={`w-3 h-3 rounded-full shadow-lg ${progress >= 100 ? 'bg-green-500 animate-pulse ring-4 ring-green-500/20' : 'bg-[#2E2E2E]'}`} />
               <span className={`text-[10px] font-bold uppercase tracking-tight ${progress >= 100 ? 'text-white' : 'text-gray-600'}`}>Jamalpur</span>
             </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 mb-14">
          <button className="flex-1 btn-secondary py-6 flex flex-col items-center gap-3 bg-[#1A1A1A] border-2 border-[#2E2E2E] shadow-xl transform active:scale-95 group hover:border-[#FFD60A]/40 transition-all">
            <div className="w-14 h-14 bg-[#242424] rounded-2xl flex items-center justify-center group-hover:bg-[#FFD60A] transition-colors">
              <Phone size={24} className="group-hover:text-black transition-colors text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white">Call Driver</span>
          </button>
          <button className="flex-1 btn-secondary py-6 flex flex-col items-center gap-3 bg-[#1A1A1A] border-2 border-[#2E2E2E] shadow-xl transform active:scale-95 group hover:border-[#FFD60A]/40 transition-all">
            <div className="w-14 h-14 bg-[#242424] rounded-2xl flex items-center justify-center group-hover:bg-[#FFD60A] transition-colors">
              <MessageCircle size={24} className="group-hover:text-black transition-colors text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white">Chat Now</span>
          </button>
          <button className="w-24 h-full btn-secondary py-6 flex flex-col items-center gap-3 bg-red-500/5 border-2 border-red-500/20 shadow-xl transform active:scale-95 group hover:bg-red-500/20 transition-all">
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <AlertCircle size={24} className="group-hover:text-white transition-colors text-red-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">SOS</span>
          </button>
        </div>

        {rideStatus === 'done' && (
          <button 
            onClick={() => navigate('/ride-booking/complete', { state: { type: rideType } })}
            className="btn-primary group py-6 text-xl shadow-2xl shadow-[#FFD60A]/20 animate-slideUp flex items-center justify-center gap-4 border-2 border-white/20"
          >
            End Ride & View Summary
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RideLive;
