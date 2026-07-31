import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Tag, Wallet, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import MapPlaceholder from '../components/MapPlaceholder';
import RideCard from '../components/RideCard';
import { rideOptions } from '../data/mockData';

const ChooseRide = () => {
  const [selectedRide, setSelectedRide] = useState('bike');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.destination || 'Destination';

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      setPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative flex flex-col pt-4 animate-fadeIn">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 h-1/2 z-0 opacity-40">
        <MapPlaceholder height="h-full" showRoute={true} />
      </div>

      <div className="absolute top-8 left-6 right-6 flex items-center justify-between z-10 animate-slideDown">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-[#1A1A1A] rounded-2xl text-white transition-opacity active:opacity-60 border border-[#2E2E2E] shadow-2xl backdrop-blur-md bg-opacity-80"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 mx-4 bg-[#1A1A1A]/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#2E2E2E] shadow-2xl text-center">
          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Ride to</span>
          <span className="font-bold font-heading text-lg truncate block">{destination}</span>
        </div>
        <div className="w-12 h-12" />
      </div>

      {/* Bottom Sheet */}
      <div className="mt-auto relative z-10 bg-[#0A0A0A] rounded-t-[3.5rem] p-8 pb-10 shadow-2xl border-t border-[#2E2E2E] animate-slideUp">
        <div className="w-16 h-1.5 bg-[#2E2E2E] rounded-full mx-auto mb-10 shadow-inner" />
        
        <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
          <span className="w-1 h-8 bg-[#FFD60A] rounded-full inline-block animate-pulse" />
          Choose your ride
        </h2>

        {/* Promo Code */}
        <div className={`flex items-center gap-4 bg-[#1A1A1A] rounded-[2.5rem] p-3 border transition-all mb-8 shadow-xl ${promoApplied ? 'border-green-500/40 bg-green-500/5' : 'border-[#2E2E2E] focus-within:border-[#FFD60A]/40 focus-within:ring-4 focus-within:ring-[#FFD60A]/5'}`}>
          <div className="bg-[#242424] p-3 rounded-2xl shadow-inner border border-[#2E2E2E]">
            <Tag size={20} className={promoApplied ? 'text-green-500' : 'text-gray-500'} />
          </div>
          <input 
            type="text"
            className="bg-transparent border-none outline-none flex-1 text-sm font-bold placeholder:text-gray-600 uppercase tracking-widest"
            placeholder={promoApplied ? "SAVE20 Applied!" : "Promo Code (SAVE20)"}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoApplied}
          />
          {!promoApplied ? (
            <button 
              onClick={handleApplyPromo}
              className="bg-[#2E2E2E] text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-[#FFD60A] hover:text-black transition-all active:scale-95 shadow-md uppercase tracking-tight"
            >
              Apply
            </button>
          ) : (
            <div className="text-green-500 font-bold px-4 flex items-center gap-2">
              <ShieldCheck size={18} />
              <span className="text-xs">Done</span>
            </div>
          )}
        </div>

        {/* Ride Options */}
        <div className="space-y-2 mb-10">
          {rideOptions.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              selected={selectedRide === ride.id}
              onSelect={setSelectedRide}
              promoApplied={promoApplied}
            />
          ))}
        </div>

        {/* Payment Methods */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-10 mb-2">
          {[
            { id: 'cash', icon: Banknote, label: 'Cash' },
            { id: 'upi', icon: CreditCard, label: 'UPI' },
            { id: 'wallet', icon: Wallet, label: 'Wallet (₹150)' },
          ].map((pay) => (
            <button
              key={pay.id}
              onClick={() => setSelectedPayment(pay.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-full border transition-all whitespace-nowrap shadow-lg active:scale-95 ${
                selectedPayment === pay.id
                  ? 'bg-[#FFD60A] border-[#FFD60A] text-black font-bold shadow-[#FFD60A]/20'
                  : 'bg-[#1A1A1A] border-[#2E2E2E] text-gray-500 font-bold'
              }`}
            >
              <pay.icon size={18} className={selectedPayment === pay.id ? 'text-black' : 'text-gray-600'} />
              <span className="text-sm font-heading">{pay.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => navigate('/ride-booking/finding', { state: { type: selectedRide } })}
          className="btn-primary group flex items-center justify-center gap-4 shadow-2xl shadow-[#FFD60A]/20 transform active:scale-95 py-5 text-xl"
        >
          Book {selectedRide === 'bike' ? 'Bike' : 'Car'} Ride
          <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChooseRide;
