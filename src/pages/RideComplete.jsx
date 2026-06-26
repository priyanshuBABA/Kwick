import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Star, Users, MapPin, Receipt, Navigation, ChevronRight, MessageSquare } from 'lucide-react';
import { drivers } from '../data/mockData';

const RideComplete = () => {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const rideType = location.state?.type || 'bike';
  const driver = drivers.find(d => d.type === rideType) || drivers[0];

  const tags = ["Clean ride", "On time", "Friendly driver", "Safe driving", "Great route"];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] p-8 text-white relative animate-fadeIn">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#22C55E]/5 rounded-full blur-[100px] -translate-y-24 translate-x-12" />
      <div className="absolute top-[20%] left-[-5%] w-48 h-48 bg-[#FFD60A]/5 rounded-full blur-[80px]" />

      <div className="flex-1 flex flex-col items-center justify-center pt-10 relative z-10">
        <div className="relative mb-14 drop-shadow-2xl">
          <div className="absolute inset-0 bg-[#22C55E]/10 rounded-full blur-3xl animate-pulse" />
          <div className="w-32 h-32 bg-[#1A1A1A] rounded-[2.5rem] flex items-center justify-center border-4 border-[#22C55E] shadow-2xl relative z-10 animate-bounce">
            <CheckCircle className="text-[#22C55E]" size={64} />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold font-heading mb-4 text-[#FFD60A] tracking-tight leading-tight transition-transform hover:scale-110">Ride Complete!</h1>
        <p className="text-gray-400 text-lg mb-12 font-medium leading-relaxed max-w-xs text-center">You've reached <span className="text-white">Jamalpur Market</span></p>

        {/* Fare Summary Card */}
        <div className="w-full bg-[#1A1A1A] rounded-[3.5rem] p-10 border border-[#2E2E2E] shadow-2xl mb-12 transform transition-all hover:scale-[1.02] relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD60A]/5 rounded-bl-[4rem] group-hover:scale-150 transition-transform duration-700" />
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
              <Receipt size={24} className="text-[#FFD60A]" />
            </div>
            <h2 className="text-2xl font-bold font-heading">Fare Summary</h2>
          </div>
          
          <div className="space-y-6 pt-4 border-t border-white/5">
            <div className="flex justify-between items-center px-2">
               <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Distance</span>
               <span className="text-white font-bold text-lg tracking-tight">4.2 km</span>
            </div>
            <div className="flex justify-between items-center px-2">
               <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Base Fare</span>
               <span className="text-white font-bold text-lg tracking-tight">₹20.00</span>
            </div>
            <div className="flex justify-between items-center px-2">
               <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Distance Fare</span>
               <span className="text-white font-bold text-lg tracking-tight">₹33.60</span>
            </div>
            <div className="flex justify-between items-center px-2 text-green-500">
               <span className="text-[10px] font-bold uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">Promo Applied</span>
               <span className="font-bold text-lg tracking-tight">-₹11.20</span>
            </div>
            <div className="pt-8 border-t border-white/10 flex justify-between items-end">
               <div>
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Paid</div>
                  <div className="text-5xl font-bold text-[#FFD60A] font-heading tracking-tight leading-none">₹56</div>
               </div>
               <div className="text-right">
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Payment via</div>
                  <div className="text-white font-bold text-lg font-heading leading-none">Cash ✓</div>
               </div>
            </div>
          </div>
        </div>

        {/* Rate Your Ride */}
        <div className="w-full bg-[#1A1A1A] rounded-[3.5rem] p-10 border border-[#2E2E2E] shadow-2xl relative overflow-hidden animate-slideUp">
          <h2 className="text-2xl font-bold font-heading mb-10 text-center tracking-tight">How was your ride?</h2>
          
          <div className="flex items-center justify-center gap-6 mb-12">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => setRating(star)}
                className={`p-1 transform transition-all duration-300 hover:scale-125 ${rating >= star ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,214,10,0.4)]' : 'opacity-40 grayscale'}`}
              >
                <Star 
                  size={48} 
                  fill={rating >= star ? '#FFD60A' : 'none'} 
                  className={rating >= star ? 'text-[#FFD60A]' : 'text-gray-400'} 
                />
              </button>
            ))}
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-10 mb-2">
            {tags.map((tag, idx) => (
              <button 
                key={idx} 
                onClick={() => toggleTag(tag)}
                className={`px-8 py-4 rounded-[2rem] border transition-all text-sm font-bold whitespace-nowrap shadow-xl transform active:scale-95 ${selectedTags.includes(tag) ? 'bg-[#FFD60A] border-[#FFD60A] text-black font-bold' : 'bg-[#242424] border-[#2E2E2E] text-gray-500 font-bold hover:border-[#FFD60A]/40 transition-colors'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="relative mb-12">
            <textarea 
               className="w-full bg-[#242424] border border-[#2E2E2E] rounded-[2.5rem] px-8 py-6 text-white text-lg font-medium focus:border-[#FFD60A]/40 outline-none transition-all placeholder:text-gray-600 shadow-inner" 
               placeholder="Add a comment (optional)..."
               rows="3"
            />
            <MessageSquare className="absolute right-8 bottom-6 text-gray-700" size={24} />
          </div>

          <div className="flex items-center gap-4">
             <button 
                onClick={() => navigate('/ride-booking/home')}
                className="btn-primary group py-6 text-xl shadow-2xl shadow-[#FFD60A]/20 transform active:scale-95 flex items-center justify-center gap-4"
             >
                Submit Rating
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        <button 
           onClick={() => navigate('/ride-booking/home')}
           className="mt-12 text-gray-500 font-bold text-sm tracking-widest uppercase mb-10 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default RideComplete;
