import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    emoji: '🏍️',
    title: 'Book a Bike in 30 Seconds',
    body: 'Fastest rides at the lowest price — no waiting, no hassle.',
    bg: 'bg-yellow-50',
    color: 'text-yellow-600',
    border: 'border-yellow-200'
  },
  {
    emoji: '🚗',
    title: 'Comfortable Car Rides',
    body: 'AC cars with top-rated drivers, always on time.',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    border: 'border-blue-200'
  },
  {
    emoji: '💛',
    title: 'Safe & Transparent',
    body: 'Live tracking, verified drivers, fare shown upfront.',
    bg: 'bg-primary/20',
    color: 'text-black',
    border: 'border-primary/20'
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1);
    } else {
      navigate('/ride-booking/login');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] px-8 text-center animate-fadeIn relative overflow-hidden">
      <div className={`absolute top-[-20%] left-[-20%] w-[150%] h-[150%] transition-colors duration-700 ${slides[currentSlide].bg} rounded-full blur-[150px] opacity-30`} />
      
      <button 
        onClick={() => navigate('/ride-booking/login')}
        className="absolute top-10 right-8 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-colors z-20"
      >
        Skip
      </button>

      <div className="flex-1 flex flex-col justify-center items-center relative z-10">
        <div key={currentSlide} className="flex flex-col items-center animate-slideIn">
          <div className={`w-64 h-64 rounded-[4rem] bg-white flex items-center justify-center mb-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border ${slides[currentSlide].border} transform -rotate-12 group hover:rotate-0 transition-transform duration-700`}>
            <span className="text-8xl drop-shadow-xl">{slides[currentSlide].emoji}</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 font-heading mb-6 tracking-tighter leading-none px-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-slate-400 text-xl leading-relaxed max-w-xs font-bold px-4">
            {slides[currentSlide].body}
          </p>
        </div>
      </div>

      <div className="mb-16 relative z-10 px-4">
        <div className="flex justify-center gap-4 mb-16">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-3 rounded-full transition-all duration-500 shadow-sm ${i === currentSlide ? 'w-16 bg-[#FFD60A]' : 'w-3 bg-slate-200'}`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="btn-primary flex items-center justify-center gap-4 group text-xl py-6 shadow-[0_25px_50px_-15px_rgba(255,214,10,0.4)]"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
