import React, { useState } from 'react';
import { MapPin, X, Check, Search, Navigation } from 'lucide-react';
import { useAppContext } from '../AppContext';

const LocationPicker = ({ isOpen, onClose }) => {
  const { userLocation, setUserLocation } = useAppContext();
  const [search, setSearch] = useState('');

  const locations = [
    'Munger Fort',
    'Jamalpur Station',
    'Bari Bazaar',
    'Kashtaharni Ghat',
    'Purabsarai',
    'Safiasarai',
    'Lallupokhar',
    'Basudeopur',
    'Shakti Nagar',
    'Gandhi Nagar'
  ];

  const filtered = locations.filter(l => l.toLowerCase().includes(search.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-t-[3rem] p-8 animate-slideUp shadow-2xl relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 font-heading">Select Location</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative mb-8 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search for area, street name..."
            className="w-full bg-slate-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white rounded-2xl py-5 pl-16 pr-6 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="w-full flex items-center gap-4 bg-yellow-400/10 p-5 rounded-2xl mb-8 group active:scale-95 transition-all text-yellow-600 border-2 border-yellow-400/20">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Navigation size={20} />
          </div>
          <div className="text-left">
            <p className="font-black text-sm uppercase tracking-widest">Current Location</p>
            <p className="text-xs font-bold opacity-70">Using GPS to find you...</p>
          </div>
        </button>

        <div className="mb-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Saved Locations</h3>
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto no-scrollbar pb-10">
            {filtered.map(loc => (
              <button
                key={loc}
                onClick={() => {
                  setUserLocation(loc);
                  onClose();
                }}
                className={`flex items-center justify-between p-5 rounded-2xl transition-all border-2 ${
                  userLocation === loc 
                    ? 'bg-yellow-400 border-yellow-400 text-black shadow-xl shadow-yellow-400/20' 
                    : 'bg-white border-slate-50 hover:border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-4">
                  <MapPin size={20} className={userLocation === loc ? 'text-black' : 'text-slate-400'} />
                  <span className="font-bold tracking-tight">{loc}</span>
                </div>
                {userLocation === loc && <Check size={20} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
