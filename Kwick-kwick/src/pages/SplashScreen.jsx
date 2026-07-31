import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/ride-booking/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFD60A] overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-white/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-[80px]" />
      
      <div className="z-10 flex flex-col items-center animate-fadeIn">
        <div className="w-40 h-40 bg-white rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] flex items-center justify-center mb-10 transform -rotate-12 hover:rotate-0 transition-transform duration-700 animate-bounce cursor-pointer border-4 border-white/50">
          <span className="text-8xl filter drop-shadow-md">⚡</span>
        </div>
        <h1 className="text-6xl font-black text-black font-heading tracking-tighter mb-4 drop-shadow-sm flex items-center gap-3">
          Ride<span className="text-white/80">Go</span>
        </h1>
        <p className="text-black/60 font-black text-xs uppercase tracking-[0.4em] translate-y-2 opacity-80 scale-110">Munger's Fastest Ride</p>
      </div>

      <div className="absolute bottom-20 w-80 h-3 bg-black/10 rounded-full overflow-hidden shadow-inner border border-white/20">
        <div className="h-full bg-black rounded-full animate-loading-bar shadow-[0_0_15px_rgba(0,0,0,0.2)]" />
      </div>

      <div className="absolute bottom-10 text-[10px] font-bold text-black/40 uppercase tracking-widest opacity-60">
        POWERED BY MUNGER SWIFT • 2026
      </div>
    </div>
  );
};

export default SplashScreen;
