import React from 'react';

const MapPlaceholder = ({ showRoute = false, showMovingDot = false, height = 'h-[50vh]' }) => {
  return (
    <div className={`relative w-full ${height} bg-[#111111] overflow-hidden`}>
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#2E2E2E 1px, transparent 1px), linear-gradient(90deg, #2E2E2E 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Fake Road System */}
        <path d="M0,100 L400,100" stroke="#2E2E2E" strokeWidth="8" fill="none" />
        <path d="M100,0 L100,400" stroke="#2E2E2E" strokeWidth="8" fill="none" />
        <path d="M0,250 L400,250" stroke="#2E2E2E" strokeWidth="8" fill="none" />
        <path d="M300,0 L300,400" stroke="#2E2E2E" strokeWidth="8" fill="none" />
        
        {/* Route Path (Yellow Dotted Line) */}
        {showRoute && (
          <path 
            d="M100,250 L300,100" 
            stroke="#FFD60A" 
            strokeWidth="4" 
            strokeDasharray="8,8" 
            fill="none" 
            className="animate-pulse"
          />
        )}

        {/* Destination Pin (Green) */}
        {showRoute && (
          <circle cx="300" cy="100" r="6" fill="#22C55E" />
        )}
      </svg>

      {/* Road Labels */}
      <div className="absolute top-24 left-4 text-[8px] text-gray-600 font-bold uppercase tracking-widest">MG Road</div>
      <div className="absolute top-4 left-24 text-[8px] text-gray-600 font-bold uppercase tracking-widest rotate-90">Station Rd</div>
      <div className="absolute bottom-36 right-4 text-[8px] text-gray-600 font-bold uppercase tracking-widest">Fort Area</div>

      {/* User Location Pulse (Yellow) */}
      <div className="absolute top-[250px] left-[100px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute w-4 h-4 bg-[#FFD60A] rounded-full z-10 border-2 border-white" />
        <div className="absolute w-12 h-12 bg-[#FFD60A] rounded-full animate-pulse-ring opacity-40 -ml-4 -mt-4" />
      </div>

      {/* Moving Dot (simulating ride progress) */}
      {showMovingDot && (
        <div 
          className="absolute w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#FFD60A] transition-all duration-[5000ms] linear"
          style={{
            animation: 'ride-progress 10s linear infinite',
            left: '100px',
            top: '250px'
          }}
        >
          <span className="text-xs">🏍️</span>
        </div>
      )}

      {/* CSS for moving dot */}
      <style>{`
        @keyframes ride-progress {
          0% { left: 100px; top: 250px; }
          100% { left: 300px; top: 100px; }
        }
      `}</style>
    </div>
  );
};

export default MapPlaceholder;
