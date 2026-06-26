import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../components/MobileFrame';
import { ChevronLeft, Phone, MapPin, Search, Clock, ShieldCheck, Heart, Activity, Ambulance, Hospital, Info, CheckCircle2, Copy, Check } from 'lucide-react';

const COLORS = {
  primary: '#FFD60A',
  accent: '#E53935',
  bg: '#f5f5f5',
  card: '#ffffff',
  text: '#1A1A1A',
  muted: '#666',
  success: '#4CAF50'
};

const AMBULANCE_TYPES = [
  { id: 'bls', type: 'BLS', name: 'Basic Life Support', icon: '🚑', desc: 'Accidents, fever, general emergencies', price: 299, tag: 'Most Booked', tagColor: '#E8F5E9', tagText: '#2E7D32' },
  { id: 'als', type: 'ALS', name: 'Advanced Life Support', icon: '🏥', desc: 'ICU on wheels — Ventilator & Oxygen', price: 599, tag: 'ICU Ready', tagColor: '#E3F2FD', tagText: '#1565C0' },
  { id: 'pt', type: 'PT', name: 'Patient Transport', icon: '🛻', desc: 'Non-emergency hospital transfer', price: 199, tag: 'Affordable', tagColor: '#F3E5F5', tagText: '#7B1FA2' }
];

const HOSPITALS = [
  { id: 'h1', name: 'AIIMS Bhopal', dist: '1.2 km', rating: '4.8' },
  { id: 'h2', name: 'Hamidia Hospital', dist: '2.5 km', rating: '4.5' },
  { id: 'h3', name: 'Apollo Hospital', dist: '3.8 km', rating: '4.7' },
  { id: 'h4', name: 'Bansal Hospital', dist: '4.1 km', rating: '4.6' }
];

const MEDICAL_CONDITIONS = ['Heart Attack', 'Road Accident', 'Stroke', 'Difficulty Breathing', 'Unconscious', 'Fracture', 'Burn', 'Other'];

const Header = ({ title, subtitle, showBack, onBack }) => (
  <div className="sticky top-0 z-50 bg-[#FFD60A] p-4 flex items-center gap-3 shadow-md">
    {showBack && (
      <button onClick={onBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </button>
    )}
    <div>
      <h1 className="text-xl font-black tracking-tight">{title}</h1>
      <p className="text-[11px] font-bold opacity-70 uppercase tracking-widest">{subtitle}</p>
    </div>
  </div>
);

const AmbulanceService = () => {
  const navigate = useNavigate();
  const [flow, setFlow] = useState('select'); // select | location | tracking
  const [selectedService, setSelectedService] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  // Page B States
  const [dropMode, setDropMode] = useState('nearest');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [condition, setCondition] = useState('');
  const [notes, setNotes] = useState('');

  // Page C States
  const [eta, setEta] = useState(7);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (flow === 'tracking') {
      const interval = setInterval(() => {
        setEta(prev => prev > 1 ? prev - 1 : 1);
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [flow]);

  const handleConfirmBooking = () => {
    const id = Math.floor(10000 + Math.random() * 90000);
    setBookingId(id);
    setFlow('tracking');
  };

  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSelect = () => (
    <div className="p-4 pb-24">
      {/* Emergency Banner */}
      <div className="bg-[#E53935] rounded-2xl p-4 flex items-center justify-between mb-6 text-white shadow-lg shadow-red-500/20">
        <div className="flex items-center gap-3">
          <div className="animate-pulse bg-white/20 p-2 rounded-full">🚨</div>
          <div>
            <p className="font-black text-sm uppercase tracking-wider">Emergency?</p>
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Available 24/7</p>
          </div>
        </div>
        <a href="tel:108" className="bg-white text-[#E53935] px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm">CALL 108</a>
      </div>

      <h2 className="text-lg font-black mb-4 px-1 text-slate-800">Choose Ambulance Type</h2>

      <div className="flex flex-col gap-4">
        {AMBULANCE_TYPES.map((service, idx) => (
          <div 
            key={service.id}
            onClick={() => { setSelectedService(service); setFlow('location'); }}
            className="bg-white rounded-3xl p-4 flex gap-4 shadow-sm border border-slate-100 hover:border-[#FFD60A] transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-12 h-12 bg-slate-50 rounded-bl-full group-hover:scale-150 transition-transform" />
             <div className="w-16 h-16 bg-[#FFD60A] rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0 relative z-10">
               {service.icon}
             </div>
             <div className="flex-1 relative z-10">
               <div className="flex items-center gap-2 mb-1">
                 <h3 className="font-black text-slate-800 uppercase tracking-tight">{service.type}</h3>
                 <span style={{ backgroundColor: service.tagColor, color: service.tagText }} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                   {service.tag}
                 </span>
               </div>
               <p className="text-[11px] font-bold text-slate-400 mb-2 leading-tight">{service.desc}</p>
               <div className="flex items-center justify-between">
                 <span className="text-xl font-black text-[#E53935]">₹{service.price}</span>
                 <span className="bg-[#FFD60A] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-sm">Book ➔</span>
               </div>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 mt-8 border border-slate-100">
        <h4 className="font-black text-slate-800 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#FFD60A]" /> Why Kwick Ambulance?
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Clock className="w-4 h-4" />, text: 'Under 8 min response' },
            { icon: <Activity className="w-4 h-4" />, text: 'Pay Later at Hospital' },
            { icon: <MapPin className="w-4 h-4" />, text: 'Live GPS tracking' },
            { icon: <Heart className="w-4 h-4" />, text: 'Trained paramedic' }
          ].map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="bg-slate-50 p-2 rounded-lg text-[#FFD60A]">{item.icon}</div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLocation = () => (
    <div className="p-4 pb-48">
      {/* Pickup Card */}
      <div className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-[#FFD60A]" />
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Pickup Location</h4>
        </div>
        <div className="bg-yellow-50/50 p-4 rounded-2xl border border-yellow-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">📍</div>
          <span className="text-sm font-black text-slate-800">Munger Fort, Bhopal (Current)</span>
        </div>
        <button className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 hover:text-black transition-colors">
          <Search className="w-3 h-3" /> Change Pickup Location
        </button>
      </div>

      {/* Hospital Selection */}
      <div className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <Hospital className="w-4 h-4 text-[#FFD60A]" />
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Hospital / Drop Location</h4>
        </div>
        
        <div className="flex gap-3 mb-4">
          <button 
            onClick={() => setDropMode('nearest')}
            className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${dropMode === 'nearest' ? 'bg-yellow-50 border-[#FFD60A] text-black shadow-inner' : 'bg-white border-slate-100 text-slate-400'}`}
          >🎯 Nearest</button>
          <button 
            onClick={() => setDropMode('choose')}
            className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${dropMode === 'choose' ? 'bg-yellow-50 border-[#FFD60A] text-black shadow-inner' : 'bg-white border-slate-100 text-slate-400'}`}
          >🔍 I'll Choose</button>
        </div>

        {dropMode === 'nearest' ? (
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-xs font-black text-green-700 uppercase tracking-tight">Auto-selecting nearest hospital</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {HOSPITALS.map(h => (
              <div 
                key={h.id}
                onClick={() => setSelectedHospital(h)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${selectedHospital?.id === h.id ? 'bg-yellow-50 border-[#FFD60A] shadow-inner' : 'bg-white border-slate-100'}`}
              >
                <div>
                  <p className="font-black text-sm text-slate-800 uppercase tracking-tight">{h.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.dist} • ⭐ {h.rating}</p>
                </div>
                {selectedHospital?.id === h.id && <CheckCircle2 className="w-5 h-5 text-[#FFD60A]" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medical Conditions */}
      <div className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#FFD60A]" /> Medical Condition
          </h4>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">(Optional)</span>
        </div>
        <p className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest opacity-60">Helps paramedic prepare in advance</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {MEDICAL_CONDITIONS.map(c => (
            <button 
              key={c}
              onClick={() => setCondition(condition === c ? '' : c)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${condition === c ? 'bg-red-50 border-red-500 text-red-600' : 'bg-white border-slate-100 text-slate-400'}`}
            >{c}</button>
          ))}
        </div>
        <textarea 
          placeholder="Add any extra notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-100 w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-[#FFD60A] transition-all resize-none h-24"
        />
      </div>

      {/* Fare Summary */}
      <div className="bg-[#FFD60A] rounded-3xl p-6 shadow-xl shadow-yellow-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full" />
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Estimated Fare</p>
            <p className="text-lg font-black text-slate-800">Total Price</p>
          </div>
          <span className="text-4xl font-black text-[#E53935]">₹{selectedService.price}</span>
        </div>
        <div className="bg-white/40 p-3 rounded-2xl flex items-center gap-3 border border-white/40 backdrop-blur-md relative z-10">
          <Activity className="w-5 h-5 text-green-700" />
          <p className="text-[10px] font-black text-green-800 uppercase tracking-tight leading-tight">Pay at Hospital — No advance payment needed</p>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-slate-100 z-50">
        <div className="max-w-md mx-auto">
          <button 
            disabled={dropMode === 'choose' && !selectedHospital}
            onClick={handleConfirmBooking}
            className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-tighter shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${ (dropMode === 'choose' && !selectedHospital) ? 'bg-slate-200 text-slate-400' : 'bg-[#E53935] text-white shadow-red-500/20'}`}
          >
            <Ambulance className="w-6 h-6" /> Confirm Booking
          </button>
          <a href="tel:108" className="mt-4 flex items-center justify-center gap-2 text-xs font-black text-[#E53935] uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">
            <Phone className="w-4 h-4" /> Call Help Desk Instead
          </a>
        </div>
      </div>
    </div>
  );

  const renderTracking = () => (
    <div className="pb-24">
      {/* ETA Header */}
      <div className="bg-[#E53935] pt-12 pb-8 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full animate-pulse" />
        <div className="relative z-10">
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-6xl font-black tracking-tighter">{eta}</span>
            <span className="text-xl font-black tracking-widest opacity-60">MIN</span>
          </div>
          <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Ambulance arriving soon</p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Mock Map */}
        <div className="h-48 bg-blue-50 rounded-3xl border border-blue-100 relative overflow-hidden flex items-center justify-center group">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2 relative z-10 animate-bounce">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Ambulance Approaching</span>
          </div>
          <div className="absolute bottom-6 left-12 text-4xl animate-pulse">🚑</div>
          <div className="absolute top-6 right-12 text-2xl">📍</div>
        </div>

        {/* Driver Card */}
        <div className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-slate-100">
          <div className="w-14 h-14 bg-[#FFD60A] rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0">👨‍⚕️</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-black text-slate-800 tracking-tight">Ramesh Kumar</p>
              <span className="bg-green-100 text-green-700 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">Verified</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MP04 AA 1234 • BLS</p>
          </div>
          <a href="tel:123" className="w-12 h-12 bg-[#FFD60A] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-yellow-500/20 active:scale-90 transition-all">
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          {[
            { label: 'Booking Confirmed', status: 'done' },
            { label: 'Nearest Ambulance Found', status: 'done' },
            { label: 'Driver Dispatched', status: 'done' },
            { label: 'Driver En Route to You', status: 'active' },
            { label: 'Arrived at Pickup', status: 'pending' }
          ].map((step, i) => (
            <div key={i} className="flex gap-4 relative">
              {i < 4 && <div className={`absolute left-[13px] top-[24px] w-0.5 h-6 ${step.status === 'done' ? 'bg-green-500' : 'bg-slate-100'}`} />}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center z-10 shadow-sm shrink-0 ${step.status === 'done' ? 'bg-green-500 text-white' : step.status === 'active' ? 'bg-[#FFD60A] text-black ring-4 ring-yellow-100' : 'bg-slate-50 text-slate-300'}`}>
                {step.status === 'done' ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
              </div>
              <div className="pb-6">
                <p className={`text-xs font-black uppercase tracking-widest ${step.status === 'pending' ? 'text-slate-300' : 'text-slate-800'}`}>{step.label}</p>
                {step.status === 'active' && <p className="text-[9px] font-bold text-[#E53935] uppercase mt-1 animate-pulse">Expected in 7 mins</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Booking ID */}
        <div className="bg-slate-50 rounded-3xl p-5 border-2 border-dashed border-slate-200 flex justify-between items-center">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Booking ID</p>
            <p className="text-lg font-black text-slate-800 tracking-tighter">KW-AMB-{bookingId}</p>
          </div>
          <button 
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-slate-800 shadow-sm'}`}
          >
            {copied ? <div className="flex items-center gap-1"><Check className="w-3 h-3" /> Copied</div> : <div className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</div>}
          </button>
        </div>

        {/* Pay Notice */}
        <div className="bg-green-50 rounded-3xl p-5 border border-green-100 flex gap-4 items-center mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">💳</div>
          <div>
            <p className="font-black text-green-800 text-sm uppercase tracking-tight">Pay at Hospital</p>
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest opacity-80">No payment needed now. Focus on the patient.</p>
          </div>
        </div>

        <button 
          onClick={() => { setFlow('select'); setSelectedService(null); }}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-black transition-colors"
        >➔ Back to Home</button>
      </div>
    </div>
  );

  return (
    <MobileFrame>
      <div className="min-h-screen bg-[#F8FAFC]">
        {flow === 'select' && <Header title="Ambulance" subtitle="Emergency Services" showBack onBack={() => navigate(-1)} />}
        {flow === 'location' && <Header title={selectedService.type} subtitle="Select Location" showBack onBack={() => setFlow('select')} />}
        {flow === 'tracking' && <Header title="Tracking" subtitle="Live Status" />}
        
        {flow === 'select' && renderSelect()}
        {flow === 'location' && renderLocation()}
        {flow === 'tracking' && renderTracking()}
      </div>
    </MobileFrame>
  );
};

export default AmbulanceService;
