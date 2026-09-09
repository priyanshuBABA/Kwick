import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { XCircle, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../AppContext';

const FindingDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addRideRequest } = useAppContext();
  const rideType = location.state?.type || 'bike';
  const destination = location.state?.destination;
  const pickupLocation = location.state?.pickupLocation;
  const destinationLocation = location.state?.destinationLocation;

  useEffect(() => {
    // Send request to riders via context
    addRideRequest({ type: rideType, destination, pickupLocation, destinationLocation });

    const timer = setTimeout(() => {
      navigate('/ride-booking/live', { state: { type: rideType } });
    }, 3500);
    return () => clearTimeout(timer);
  }, [addRideRequest, destination, destinationLocation, navigate, pickupLocation, rideType]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] px-10 text-center animate-fadeIn relative overflow-hidden">
      {/* Background Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-[#FFD60A]/10 rounded-full animate-ping opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#FFD60A]/5 rounded-full animate-ping opacity-10" />

      <div className="relative mb-14 transition-transform hover:scale-110">
        <div className="absolute inset-0 bg-[#FFD60A]/10 rounded-full blur-3xl animate-pulse" />
        <div className="w-48 h-48 bg-[#1A1A1A] rounded-full flex items-center justify-center border-4 border-[#FFD60A]/20 shadow-2xl relative z-10 z-[1]">
          <span className="text-8xl animate-bounce duration-700">{rideType === 'bike' ? '🏍️' : '🚗'}</span>
        </div>
      </div>

      <div className="relative z-10 animate-slideUp">
        <div className="flex items-center gap-3 justify-center mb-6">
          <ShieldCheck className="text-green-500 animate-pulse" size={24} />
          <h1 className="text-4xl font-bold text-white font-heading tracking-tight leading-tight">Finding your driver...</h1>
        </div>
        <p className="text-gray-400 text-lg mb-12 max-w-xs font-medium leading-relaxed opacity-60">
          Looking for nearby {rideType === 'bike' ? 'bikers' : 'cars'} in Munger Area. Please wait.
        </p>

        <div className="flex justify-center gap-4 mb-20">
          <div className="w-3 h-3 bg-[#FFD60A] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-[#FFD60A] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-[#FFD60A] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      <button 
        onClick={() => navigate(-1)}
        className="fixed bottom-12 flex items-center gap-3 text-red-500 font-bold bg-red-500/10 px-8 py-4 rounded-full border border-red-500/20 hover:bg-red-500/20 transition-all active:scale-95 shadow-xl uppercase tracking-widest text-sm"
      >
        <XCircle size={20} />
        Cancel Search
      </button>
    </div>
  );
};

export default FindingDriver;
