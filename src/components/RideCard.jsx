import React from 'react';

const RideCard = ({ ride, selected = false, onSelect, distance = 4.2, promoApplied = false }) => {
  const discountedPrice = Math.round((ride.basePrice + ride.perKm * distance) * 0.8);
  const originalPrice = Math.round(ride.basePrice + ride.perKm * distance);

  return (
    <div
      onClick={() => onSelect(ride.id)}
      className={`relative flex items-center p-4 transition-all duration-300 cursor-pointer card-base mb-3 ${
        selected ? 'border-[#FFD60A] scale-[1.02] shadow-lg bg-[#242424]' : 'bg-[#1A1A1A]'
      }`}
    >
      <div className="flex items-center justify-center w-16 h-16 mr-4 bg-gray-800 rounded-2xl">
        <span className="text-3xl">{ride.emoji}</span>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-white">{ride.name}</h3>
          {ride.id === 'bike' && (
            <span className="px-2 py-0.5 text-[10px] bg-green-500/10 text-green-500 rounded-full font-bold uppercase tracking-wider border border-green-500/20">
              Cheapest
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400">{ride.tagline}</p>
        <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
          <span>👤 {ride.capacity}</span>
          <span>🕐 {ride.eta} away</span>
        </div>
      </div>

      <div className="text-right">
        {promoApplied && ride.id === 'bike' ? (
          <div>
            <span className="text-xs text-gray-500 line-through">₹{originalPrice}</span>
            <div className="text-xl font-bold text-[#FFD60A]">₹{discountedPrice}</div>
          </div>
        ) : (
          <div className="text-xl font-bold text-white">₹{originalPrice}</div>
        )}
      </div>

      {selected && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-[#FFD60A] rounded-full" />
      )}
    </div>
  );
};

export default RideCard;
