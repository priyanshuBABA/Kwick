import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, History, Search, Bookmark } from 'lucide-react';
import MapPlaceholder from '../components/MapPlaceholder';
import { geocodeAddress } from '../services/locationApi';
import { useLocationContext } from '../context/LocationContext';

const suggestions = [
  { name: 'Jamalpur Market', address: 'Munger-Jamalpur Rd, Bihar', type: 'recent' },
  { name: 'Railway Station', address: 'Railway Colony, Munger', type: 'recent' },
  { name: 'City Hospital', address: 'Kacheri Road, Munger', type: 'recent' },
  { name: 'Munger Fort', address: 'Fort Area, Munger', type: 'nearby' },
  { name: 'Bus Stand', address: 'Purabsarai, Munger', type: 'nearby' },
];

const BookRide = () => {
  const [destination, setDestination] = useState('');
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { currentLocation, formattedAddress, loading, error, getCurrentLocation } = useLocationContext();

  React.useEffect(() => {
    if (!currentLocation) getCurrentLocation();
  }, [currentLocation, getCurrentLocation]);

  const handleSelect = async (sug) => {
    setLocationError('');
    try {
      const location = await geocodeAddress(sug.address);
      setDestinationLocation({ ...location, accuracy: null, source: 'manual', updatedAt: new Date().toISOString() });
      setDestination(sug.name);
    } catch (lookupError) {
      setLocationError(lookupError.message);
    }
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative flex flex-col pt-4 animate-fadeIn">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 h-2/3 z-0">
        <MapPlaceholder height="h-full" showRoute={destination !== ''} />
      </div>

      <div className="absolute top-8 left-6 right-6 flex items-center justify-between z-10 animate-slideDown">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-[#1A1A1A] rounded-2xl text-white transition-opacity active:opacity-60 border border-[#2E2E2E] shadow-2xl backdrop-blur-md bg-opacity-80"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="bg-[#1A1A1A]/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#2E2E2E] shadow-2xl">
          <span className="font-bold font-heading text-lg">Book a RideGo ⚡</span>
        </div>
        <div className="w-12 h-12" />
      </div>

      {/* Suggestion List Overlay */}
      {isSearching && (
        <div className="fixed inset-0 bg-[#0A0A0A] z-40 p-6 pt-24 animate-fadeIn">
          <div className="flex items-center gap-4 bg-[#1A1A1A] rounded-[2rem] p-4 border-2 border-[#FFD60A] shadow-2xl mb-10 shadow-[#FFD60A]/10">
            <Search className="text-[#FFD60A] ml-2" size={24} />
            <input 
              type="text"
              autoFocus
              className="bg-transparent border-none outline-none w-full text-xl font-bold py-2 placeholder:text-gray-600"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="space-y-4 animate-slideUp">
            <h3 className="text-gray-500 font-bold uppercase tracking-widest text-[10px] ml-4 mb-6">Recent Destiantions</h3>
            {suggestions.map((sug, idx) => (
              <div 
                key={idx} 
                onClick={() => handleSelect(sug)}
                className="flex items-center gap-6 p-6 bg-[#1A1A1A] rounded-[2.5rem] border border-[#2E2E2E] hover:border-[#FFD60A]/40 transition-all cursor-pointer group shadow-lg"
              >
                <div className="w-14 h-14 bg-[#242424] rounded-2xl flex items-center justify-center group-hover:bg-[#FFD60A] transition-colors">
                  {sug.type === 'recent' ? <History size={24} className="group-hover:text-black transition-colors" /> : <MapPin size={24} className="group-hover:text-black transition-colors" />}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-lg font-heading group-hover:text-[#FFD60A] transition-colors">{sug.name}</div>
                  <div className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-tight">{sug.address}</div>
                </div>
                <Bookmark className="text-gray-700 group-hover:text-white" size={18} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Sheet */}
      <div className="mt-auto relative z-10 bg-[#0A0A0A] rounded-t-[3.5rem] p-8 pb-10 shadow-2xl border-t border-[#2E2E2E] animate-slideUp">
        <div className="w-16 h-1.5 bg-[#2E2E2E] rounded-full mx-auto mb-10 shadow-inner" />
        
        <div className="space-y-6">
          <div className="flex items-center gap-6 p-6 bg-[#1A1A1A] rounded-[2.5rem] border border-[#2E2E2E] shadow-xl group hover:border-[#FFD60A]/40 transition-colors">
            <div className="flex flex-col items-center gap-1 relative overflow-hidden">
               <div className="w-8 h-8 rounded-full bg-green-500 shadow-lg shadow-green-500/20 flex items-center justify-center animate-pulse z-10">
                 <div className="w-2 h-2 bg-white rounded-full" />
               </div>
               <div className="w-px h-12 bg-gradient-to-b from-green-500 to-[#2E2E2E] -mt-1" />
            </div>
            <div>
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Pick up point</div>
              <div className="text-white font-bold text-xl font-heading tracking-tight leading-none">{loading ? 'Detecting location...' : formattedAddress || 'Location unavailable'}</div>
              {error && <div className="mt-2 text-xs text-red-400">{error}</div>}
            </div>
          </div>

          <div 
            onClick={() => setIsSearching(true)}
            className={`flex items-center gap-6 p-6 bg-[#1A1A1A] rounded-[2.5rem] border transition-all cursor-pointer shadow-xl relative overflow-hidden ${destination ? 'border-red-500/20' : 'border-[#FFD60A]/40 ring-4 ring-[#FFD60A]/5'}`}
          >
            <div className="flex flex-col items-center gap-1">
               <div className="w-8 h-8 rounded-full bg-red-500 shadow-lg shadow-red-500/20 flex items-center justify-center z-10">
                 <div className="w-2 h-2 bg-white rounded-full" />
               </div>
            </div>
            <div className="flex-1">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Drop off point</div>
              <div className={`text-xl font-bold font-heading tracking-tight leading-none ${destination ? 'text-white' : 'text-gray-600'}`}>
                {destination || 'Where to?'}
              </div>
            </div>
            <div className="bg-[#242424] p-3 rounded-2xl shadow-inner border border-[#2E2E2E]">
              <Search size={20} className="text-[#FFD60A]" />
            </div>
          </div>
        </div>

        {locationError && <p className="mt-4 text-center text-sm text-red-400">{locationError}</p>}

        {destination && destinationLocation && currentLocation && (
          <div className="mt-10 animate-fadeIn">
            <div className="flex items-center justify-between mb-8 px-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFD60A]/10 rounded-2xl flex items-center justify-center">
                  <Navigation size={22} className="text-[#FFD60A]" />
                </div>
                <div>
                  <div className="text-white font-bold font-heading text-lg">4.2 km</div>
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Estimated distance</div>
                </div>
              </div>
              <div className="text-right">
                 <div className="text-[#FFD60A] font-bold font-heading text-lg">~12 min</div>
                 <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Travel time</div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/ride-booking/choose', { state: { destination, pickupLocation: currentLocation, destinationLocation } })}
              className="btn-primary flex items-center justify-center gap-4 shadow-xl shadow-[#FFD60A]/20 transform active:scale-95 group"
            >
              See Ride Options
              <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRide;
