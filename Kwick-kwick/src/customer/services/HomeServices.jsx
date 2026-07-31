import React, { useState, useEffect } from 'react';
import MobileFrame from '../../components/MobileFrame';
import { 
  Zap, Droplet, Wind, SprayCan as Brush, Shield, MapPin, Search, 
  User, ShoppingCart, ChevronRight, Star, Clock, AlertTriangle, 
  CheckCircle, Navigation, X, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  { id: 1, name: 'Electrician', icon: Zap, price: 199, rating: 4.8, bg: 'bg-yellow-100', color: 'text-yellow-600', subServices: ['Switchboard Repair', 'Wiring & Setup', 'Fan Installation'] },
  { id: 2, name: 'Plumber', icon: Droplet, price: 149, rating: 4.7, bg: 'bg-blue-100', color: 'text-blue-600', subServices: ['Leak Fix', 'Tap Replacement', 'Pipe Blockage'] },
  { id: 3, name: 'AC Repair', icon: Wind, price: 299, rating: 4.9, bg: 'bg-teal-100', color: 'text-teal-600', subServices: ['Gas Refill', 'Deep Cleaning', 'Installation'] },
  { id: 4, name: 'Cleaning', icon: Brush, price: 399, rating: 4.6, bg: 'bg-purple-100', color: 'text-purple-600', subServices: ['Bathroom Cleaning', 'Kitchen Deep Clean', 'Sofa Cleaning'] },
  { id: 5, name: 'RO Service', icon: Shield, price: 249, rating: 4.8, bg: 'bg-indigo-100', color: 'text-indigo-600', subServices: ['Filter Change', 'Machine Repair', 'Installation'] }
];

const HomeServices = () => {
  const navigate = useNavigate();
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [bookingState, setBookingState] = useState({
    isOpen: false,
    step: 1,
    service: null,
    subService: null,
    timeSlot: null,
  });

  const openBooking = (service) => {
    setBookingState({
      isOpen: true,
      step: 1,
      service,
      subService: null,
      timeSlot: null,
    });
  };

  const closeBooking = () => {
    setBookingState(prev => ({ ...prev, isOpen: false }));
    setTimeout(() => {
      setBookingState({ isOpen: false, step: 1, service: null, subService: null, timeSlot: null });
    }, 300);
  };

  const handleNextStep = () => {
    if (bookingState.step < 4) {
      setBookingState(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  // Theme classes based on emergency mode
  const bgClass = isEmergencyMode ? 'bg-[#121212]' : 'bg-slate-50';
  const textClass = isEmergencyMode ? 'text-white' : 'text-slate-900';
  const cardBgClass = isEmergencyMode ? 'bg-[#1E1E1E] border-[#333]' : 'bg-white border-purple-100';
  const mutedTextClass = isEmergencyMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <MobileFrame>
      <div className={`min-h-screen pb-20 transition-colors duration-500 ${bgClass} ${textClass} overflow-x-hidden font-sans`}>
        {/* Header */}
        <div className={`sticky top-0 z-40 px-4 py-3 ${isEmergencyMode ? 'bg-[#1A1A1A]/90' : 'bg-white/90'} backdrop-blur-md shadow-sm border-b ${isEmergencyMode ? 'border-gray-800' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-indigo-600">
                <MapPin size={12} className={isEmergencyMode ? 'text-red-500' : 'text-indigo-600'} />
                Home
              </div>
              <div className={`text-sm font-bold ${textClass} truncate max-w-[200px] flex items-center gap-1`}>
                Munger, Bihar <span className="text-[10px] mt-1">▼</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isEmergencyMode ? 'bg-gray-800 text-gray-300' : 'bg-indigo-50 text-indigo-900'}`}>
                <Search size={18} />
              </div>
              <div className={`p-2 rounded-full ${isEmergencyMode ? 'bg-gray-800 text-gray-300' : 'bg-indigo-50 text-indigo-900'} relative`}>
                <ShoppingCart size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">2</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-200 overflow-hidden border border-indigo-300 flex items-center justify-center text-indigo-700 font-bold">
                <User size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-6">
          {/* Hero Section */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-black leading-tight tracking-tight">
                Professional<br/>
                Services in <span className="text-indigo-600 relative inline-block">
                  30 Mins
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-300 -z-10 opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15 L 100 20 L 0 20 Z" fill="currentColor" />
                  </svg>
                </span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <ShieldCheck size={16} className="text-green-500" />
                <span className={`text-sm font-medium ${mutedTextClass}`}>100% Verified Partners</span>
              </div>
            </div>
            {/* Night Emergency Toggle */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 relative ${isEmergencyMode ? 'bg-red-500' : 'bg-slate-300'}`}
                onClick={() => setIsEmergencyMode(!isEmergencyMode)}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isEmergencyMode ? 'translate-x-6' : 'translate-x-0'}`}>
                  {isEmergencyMode ? <AlertTriangle size={12} className="text-red-500" /> : <Clock size={12} className="text-slate-400" />}
                </div>
              </div>
              <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${isEmergencyMode ? 'text-red-500' : 'text-slate-400'}`}>
                Emergency
              </span>
            </div>
          </div>

          {/* Quick Urgency Banners */}
          <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
             <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border whitespace-nowrap ${isEmergencyMode ? 'bg-red-900/40 border-red-800/50 text-red-200' : 'bg-green-50 border-green-200 text-green-700'}`}>
               <Clock size={14} className={isEmergencyMode ? 'text-red-400' : 'text-green-500'} />
               <span className="text-xs font-bold">Arriving in 20 mins</span>
             </div>
             <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border whitespace-nowrap ${isEmergencyMode ? 'bg-indigo-900/40 border-indigo-800/50 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}>
               <ShieldCheck size={14} className="text-indigo-500" />
               <span className="text-xs font-bold">Verified Pro Guarantee</span>
             </div>
          </div>

          {/* Service Grid */}
          <h2 className="text-lg font-black mb-4">Top Services</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`rounded-3xl p-4 border shadow-sm flex flex-col gap-3 relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cardBgClass} ${service.id === 5 ? 'col-span-2 flex-row items-center justify-between' : ''}`}
              >
                {/* Rating Badge */}
                <div className={`absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isEmergencyMode ? 'bg-gray-800 text-gray-300' : 'bg-slate-100 text-slate-700'}`}>
                  <Star size={10} className="fill-yellow-400 text-yellow-400" /> {service.rating}
                </div>

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.bg} ${service.color}`}>
                  <service.icon size={28} strokeWidth={2.5} />
                </div>
                
                <div className={service.id === 5 ? 'flex-1 ml-2' : ''}>
                  <h3 className="font-bold text-lg leading-tight">{service.name}</h3>
                  <p className={`text-xs font-semibold ${mutedTextClass} mt-0.5`}>Starts at ₹{service.price}</p>
                </div>

                <button 
                  onClick={() => openBooking(service)}
                  className={`py-2 px-4 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 ${
                    isEmergencyMode 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>

          {/* Emergency Service Banner */}
          <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-indigo-950 p-6 mb-8 text-white relative overflow-hidden shadow-xl">
             <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
               <AlertTriangle size={120} />
             </div>
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                 <span className="text-xs font-black uppercase tracking-widest text-red-400">10 PM - 6 AM Support</span>
               </div>
               <h3 className="text-2xl font-black mb-1">Night Emergency?</h3>
               <p className="text-slate-300 text-sm mb-4">Electrician, Plumber & AC Repair available 24/7</p>
               <button className="bg-white text-indigo-950 font-bold px-5 py-2.5 rounded-full text-sm hover:scale-105 transition-transform">
                 Call Now
               </button>
             </div>
          </div>

          {/* Combo Packs */}
          <div className="mb-8">
            <h2 className="text-lg font-black mb-4 flex items-center gap-2">
              Value Combo Packs <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">SAVE UPTO 40%</span>
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {/* Combo 1 */}
              <div className={`min-w-[280px] rounded-3xl p-5 border ${cardBgClass} flex flex-col justify-between shadow-sm`}>
                <div>
                  <h3 className="font-bold text-lg mb-1">Full Home Checkup</h3>
                  <p className={`text-xs ${mutedTextClass} mb-3`}>Electrical + Plumbing Safety Check</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-black text-xl">₹499</span>
                    <span className="text-sm line-through text-slate-400">₹999</span>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl font-bold text-sm bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                  Add to Cart
                </button>
              </div>
              {/* Combo 2 */}
              <div className={`min-w-[280px] rounded-3xl p-5 border ${cardBgClass} flex flex-col justify-between shadow-sm`}>
                <div>
                  <h3 className="font-bold text-lg mb-1">Monsoon Package</h3>
                  <p className={`text-xs ${mutedTextClass} mb-3`}>AC Service + Room Cleaning</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-black text-xl">₹899</span>
                    <span className="text-sm line-through text-slate-400">₹1499</span>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl font-bold text-sm bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Subscription Banner */}
          <div className="bg-gradient-to-r from-amber-200 to-yellow-400 rounded-3xl p-1 mb-8 shadow-lg transform rotate-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-[1.4rem] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                   <Zap size={20} className="fill-amber-500" />
                 </div>
                 <div>
                   <h4 className="font-black text-slate-900 text-sm">Swift Plus</h4>
                   <p className="text-xs font-bold text-slate-600">Get 0 Convenience Fees</p>
                 </div>
              </div>
              <ChevronRight className="text-slate-400" />
            </div>
          </div>

        </div>
      </div>

      {/* Booking Workflow Bottom Sheet / Modal */}
      {/* Overlay */}
      {bookingState.isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 transition-opacity backdrop-blur-sm"
          onClick={closeBooking}
        />
      )}
      
      {/* Sheet Content */}
      <div 
        className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto ${isEmergencyMode ? 'bg-[#1A1A1A] text-white' : 'bg-white'} rounded-t-[2.5rem] z-50 transform transition-transform duration-500 ease-in-out ${bookingState.isOpen ? 'translate-y-0' : 'translate-y-full'} shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)]`}
        style={{ height: '80vh' }}
      >
        {/* Handle */}
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className={`w-12 h-1.5 rounded-full ${isEmergencyMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
        </div>

        {/* Header */}
        {bookingState.step < 4 && bookingState.service && (
          <div className={`px-6 pb-4 border-b ${isEmergencyMode ? 'border-gray-800' : 'border-gray-100'} flex justify-between items-center`}>
            <div>
              <h3 className="font-black text-xl">{bookingState.service.name}</h3>
              <p className={`text-xs font-bold ${mutedTextClass}`}>Step {bookingState.step} of 3</p>
            </div>
            <button onClick={closeBooking} className={`p-2 rounded-full ${isEmergencyMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <X size={18} />
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="px-6 py-4 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
          {bookingState.service && (
            <>
              {/* Step 1: Sub-service Selection */}
              {bookingState.step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="font-bold text-lg mb-4">What do you need help with?</h4>
                  <div className="space-y-3">
                    {bookingState.service.subServices.map((sub, idx) => (
                      <label key={idx} className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-colors ${bookingState.subService === sub ? (isEmergencyMode ? 'border-red-500 bg-red-500/10' : 'border-indigo-600 bg-indigo-50') : (isEmergencyMode ? 'border-gray-800 bg-gray-800/50' : 'border-slate-100 bg-white')}`}>
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="subservice" 
                            className={`w-5 h-5 accent-indigo-600`}
                            checked={bookingState.subService === sub}
                            onChange={() => setBookingState(prev => ({ ...prev, subService: sub }))}
                          />
                          <span className="font-semibold">{sub}</span>
                        </div>
                        <span className="font-bold">₹{bookingState.service.price + (idx * 50)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Time Slot Picker */}
              {bookingState.step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="font-bold text-lg mb-4">When do you need the service?</h4>
                  
                  <div className="mb-4">
                    <h5 className={`text-xs font-bold uppercase tracking-wider mb-2 ${mutedTextClass}`}>Date</h5>
                    <div className="flex gap-3">
                      <div className={`flex-1 py-3 text-center rounded-xl border-2 cursor-pointer ${isEmergencyMode ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-indigo-600 bg-indigo-50 text-indigo-700'} font-bold`}>
                        Today
                      </div>
                      <div className={`flex-1 py-3 text-center rounded-xl border-2 cursor-pointer ${isEmergencyMode ? 'border-gray-800 text-gray-400' : 'border-slate-100 text-slate-500'} font-semibold`}>
                        Tomorrow
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className={`text-xs font-bold uppercase tracking-wider mb-2 ${mutedTextClass}`}>Time</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map((time, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setBookingState(prev => ({ ...prev, timeSlot: time }))}
                          className={`py-3 text-center rounded-xl border-2 cursor-pointer transition-colors ${bookingState.timeSlot === time ? (isEmergencyMode ? 'border-red-500 bg-red-500/10 text-white' : 'border-indigo-600 bg-indigo-50 text-indigo-700') : (isEmergencyMode ? 'border-gray-800 bg-gray-800/50' : 'border-slate-100 bg-white')} font-semibold`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>

                  {isEmergencyMode && (
                     <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                       <AlertTriangle className="text-red-500 mt-0.5 shrink-0" size={18} />
                       <div className="text-xs">
                         <strong className="text-red-500 block mb-1">Emergency Rate Applied</strong>
                         <p className="text-gray-300">An additional ₹150 night charge is added for services between 10 PM and 6 AM.</p>
                       </div>
                     </div>
                  )}
                </div>
              )}

              {/* Step 3: Fixed Pricing Summary */}
              {bookingState.step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className={`p-4 rounded-2xl mb-6 ${isEmergencyMode ? 'bg-gray-800' : 'bg-slate-50 border border-slate-100'}`}>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-dashed border-gray-300">
                      <div>
                        <h4 className="font-bold">{bookingState.service.name}</h4>
                        <p className={`text-xs mt-1 ${mutedTextClass}`}>{bookingState.subService || 'Standard Service'}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bookingState.service.bg} ${bookingState.service.color}`}>
                        <bookingState.service.icon size={20} />
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm font-medium">
                      <div className="flex justify-between">
                        <span className={mutedTextClass}>Base Price</span>
                        <span>₹{bookingState.service.price}</span>
                      </div>
                      {isEmergencyMode && (
                        <div className="flex justify-between">
                          <span className={mutedTextClass}>Night Charge</span>
                          <span>₹150</span>
                        </div>
                      )}
                      <div className="flex justify-between text-green-500">
                        <span>Taxes & Fees</span>
                        <span>₹32</span>
                      </div>
                      <div className={`flex justify-between pt-3 border-t mt-3 font-black text-lg ${isEmergencyMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <span>Total Pay</span>
                        <span>₹{bookingState.service.price + (isEmergencyMode ? 150 : 0) + 32}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-xl border ${isEmergencyMode ? 'bg-[#291717] border-red-900/50 text-red-100' : 'bg-green-50 border-green-200 text-green-800'}`}>
                     <CheckCircle size={20} className={isEmergencyMode ? 'text-red-400' : 'text-green-500'} />
                     <div>
                       <strong className="block text-sm">Fixed Pricing Guarantee</strong>
                       <span className="text-[10px] opacity-80">No bargaining. What you see is what you pay.</span>
                     </div>
                  </div>
                </div>
              )}

              {/* Step 4: Tracking & Assignment */}
              {bookingState.step === 4 && (
                <div className="h-full flex flex-col items-center justify-center animate-in zoom-in duration-500">
                  <div className="relative w-full aspect-square max-h-[250px] mb-8">
                     {/* Simulated Map View */}
                     <div className={`absolute inset-0 rounded-full ${isEmergencyMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-indigo-100'} border-[10px] overflow-hidden flex items-center justify-center relative`}>
                        {/* Map Lines */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%), repeating-linear-gradient(45deg, #ccc 0, #ccc 1px, transparent 1px, transparent 20px)'}} />
                        
                        {/* Pulse effect */}
                        <div className={`absolute w-12 h-12 rounded-full animate-ping ${isEmergencyMode ? 'bg-red-500/40' : 'bg-indigo-500/40'}`} />
                        
                        {/* Center Pin */}
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${isEmergencyMode ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'}`}>
                          <Navigation size={20} className="transform -rotate-45 -ml-1 mt-1" />
                        </div>
                     </div>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-2 text-center">Assigning Nearby Pro...</h3>
                  <p className={`text-center ${mutedTextClass} font-medium`}>Finding the best {bookingState.service.name.toLowerCase()} in your area.</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-8 overflow-hidden">
                    <div className={`h-1.5 rounded-full w-2/3 ${isEmergencyMode ? 'bg-red-500' : 'bg-indigo-600'} animate-[pulse_2s_ease-in-out_infinite]`} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {bookingState.step < 4 && (
          <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isEmergencyMode ? 'border-gray-800 bg-[#1A1A1A]' : 'border-gray-100 bg-white'}`}>
            <button 
              onClick={handleNextStep}
              disabled={
                (bookingState.step === 1 && !bookingState.subService) ||
                (bookingState.step === 2 && !bookingState.timeSlot)
              }
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isEmergencyMode ? 'bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-700 disabled:text-gray-400' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400'
              }`}
            >
              {bookingState.step === 3 ? 'Confirm Booking' : 'Continue'}
              {bookingState.step < 3 && <ChevronRight size={20} />}
            </button>
          </div>
        )}
      </div>

    </MobileFrame>
  );
};

export default HomeServices;
