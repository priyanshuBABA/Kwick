import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, X, Check, Search, Navigation } from 'lucide-react';
import { useAppContext } from '../AppContext';

const LocationPicker = ({ isOpen, onClose }) => {
  const { userLocation, setUserLocation } = useAppContext();
  const [search, setSearch] = useState('');
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState(null);

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

  // No default saved locations — rely on real-time GPS
  const locations = [];
  const filtered = locations.filter(l => l.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (!isOpen) return;
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    setLocating(true);
    setError(null);

    const onSuccess = async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const coordsStr = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        setUserLocation(coordsStr);
        setSearch(coordsStr);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            const display = data.display_name;
            if (display) {
              setUserLocation(display);
              setSearch(display);
            }
          }
        } catch (err) {
          console.warn('Reverse geocode failed', err);
        }
      } catch (err) {
        console.error('Failed to set location', err);
      }
      setLocating(false);
    };

    const onError = (err) => {
      setError(err?.message || 'Unable to retrieve location');
      setLocating(false);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 10000 });
  }, [isOpen, setUserLocation]);

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
          onClick={() => {
            if (!navigator.geolocation) {
              setError('Geolocation not supported');
              return;
            }
            setLocating(true);
            setError(null);
            navigator.geolocation.getCurrentPosition(async (pos) => {
              const { latitude, longitude } = pos.coords;
                const coordsStr = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                setUserLocation(coordsStr);
                setSearch(coordsStr);
              try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                if (res.ok) {
                  const data = await res.json();
                  const display = data.display_name;
                    if (display) {
                      setUserLocation(display);
                      setSearch(display);
                    }
                }
              } catch (err) {
                console.warn('Reverse geocode failed', err);
              }
              setLocating(false);
            }, (err) => {
              setError(err?.message || 'Unable to retrieve location');
              setLocating(false);
            }, { enableHighAccuracy: true, timeout: 10000 });
          }}
          className="w-full flex items-center gap-4 bg-yellow-400/10 p-5 rounded-2xl mb-8 group active:scale-95 transition-all text-yellow-600 border-2 border-yellow-400/20"
        >
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Navigation size={20} />
          </div>
          <div className="text-left">
            <p className="font-black text-sm uppercase tracking-widest">Current Location</p>
            <p className="text-xs font-bold opacity-70">{locating ? 'Detecting your GPS location...' : error ? error : 'Using GPS to find you...'}</p>
          </div>
        </button>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              if (!search) return;
              setUserLocation(search);
              onClose();
            }}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-bold shadow-md"
          >
            Use this location
          </button>

          {error && (
            <button
              onClick={() => {
                // Retry explicit permission flow
                setError(null);
                setLocating(true);
                navigator.geolocation.getCurrentPosition((pos) => {
                  const { latitude, longitude } = pos.coords;
                  const coordsStr = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                  setUserLocation(coordsStr);
                  setSearch(coordsStr);
                  fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
                    .then(res => res.ok ? res.json() : null)
                    .then(data => {
                      if (data?.display_name) {
                        setUserLocation(data.display_name);
                        setSearch(data.display_name);
                      }
                    }).catch(() => {});
                  setLocating(false);
                }, (err) => {
                  setError(err?.message || 'Unable to retrieve location');
                  setLocating(false);
                }, { enableHighAccuracy: true, timeout: 10000 });
              }}
              className="px-4 py-3 rounded-xl border font-semibold text-sm bg-white"
            >
              Retry
            </button>
          )}
        </div>

        {/* Saved locations removed; rely on real-time GPS or manual search */}
        {locations.length === 0 && (
          <div className="mb-4 text-sm text-slate-500 font-bold">No saved locations. Use Current Location or search to set your address.</div>
        )}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

export default LocationPicker;
