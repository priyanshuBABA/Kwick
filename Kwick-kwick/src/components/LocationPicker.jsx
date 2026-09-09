import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, X, Search, Navigation } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';

const LocationPicker = ({ isOpen, onClose }) => {
  const { currentLocation, formattedAddress, loading, error, getCurrentLocation, selectAddress } = useLocationContext();
  const [search, setSearch] = useState('');
  const requestCurrentLocation = useCallback(() => getCurrentLocation(), [getCurrentLocation]);

  // Prevent background scrolling while the picker is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    const prevTouch = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    const prevent = (e) => { e.preventDefault(); };
    // prevent wheel and touchmove
    document.addEventListener('wheel', prevent, { passive: false });
    document.addEventListener('touchmove', prevent, { passive: false });
    return () => {
      document.body.style.overflow = prev || '';
      document.body.style.touchAction = prevTouch || '';
      document.removeEventListener('wheel', prevent);
      document.removeEventListener('touchmove', prevent);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    requestCurrentLocation();
  }, [isOpen, requestCurrentLocation]);

  useEffect(() => {
    if (isOpen && formattedAddress) setSearch(formattedAddress);
  }, [isOpen, formattedAddress]);

  const handleUseLocation = async () => {
    if (!search.trim()) return;
    const location = await selectAddress(search);
    if (location) onClose();
  };

  if (!isOpen) return null;

  const overlay = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-t-[3rem] p-8 animate-slideUp shadow-2xl relative z-[10000] max-h-[90vh] overflow-y-auto">
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

        <button
          onClick={requestCurrentLocation}
          disabled={loading}
          className="w-full flex items-center gap-4 bg-yellow-400/10 p-5 rounded-2xl mb-8 group active:scale-95 transition-all text-yellow-600 border-2 border-yellow-400/20"
        >
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Navigation size={20} />
          </div>
          <div className="text-left">
            <p className="font-black text-sm uppercase tracking-widest">Current Location</p>
            <p className="text-xs font-bold opacity-70">{loading ? 'Detecting your GPS location...' : error || (currentLocation ? 'Device location selected' : 'Use GPS to find you')}</p>
          </div>
        </button>

        <div className="flex gap-3 mb-6">
          <button
            onClick={handleUseLocation}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-bold shadow-md"
          >
            Use this location
          </button>

          {error && (
            <button
              onClick={requestCurrentLocation}
              className="px-4 py-3 rounded-xl border font-semibold text-sm bg-white"
            >
              Retry
            </button>
          )}
        </div>

        {/* Saved locations removed; rely on real-time GPS or manual search */}
        {currentLocation && (
          <div className="mb-4 text-xs text-slate-500">
            <span className="font-bold">Selected coordinates:</span>{' '}
            {currentLocation.latitude.toFixed(5)}, {currentLocation.longitude.toFixed(5)}
            {currentLocation.accuracy ? ` (accuracy ${Math.round(currentLocation.accuracy)} m)` : ''}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

export default LocationPicker;
