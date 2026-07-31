import React from 'react';
import { Package, Smartphone, Store, ArrowRight, Zap, Target, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoleCard = ({ title, subtitle, icon, delay, color, onClick }) => (
  <button 
    onClick={onClick}
    style={{ animationDelay: `${delay}ms` }}
    className={`group relative w-full bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-white transition-all duration-500 overflow-hidden flex items-center justify-between hover:scale-[1.02] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)] active:scale-95 animate-slideUp`}
  >
    <div className={`absolute top-0 left-0 w-2 h-full ${color}`}></div>
    <div className="flex items-center gap-6 relative z-10">
      <div className={`w-16 h-16 rounded-3xl ${color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
        <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="text-left">
        <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">{title}</h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
      <ArrowRight className="w-5 h-5" />
    </div>
  </button>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (rolePath) => {
    localStorage.setItem('userRole', rolePath);
    navigate(rolePath);
  };

  const goToAuth = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center p-8 relative overflow-hidden font-sans">
      {/* Premium Decorative elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-orange-400/20 rounded-full blur-[100px] opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#ffffff00_0%,_#f8fafc_100%)] opacity-80 pointer-events-none"></div>

      {/* Floating Elements (Pure CSS) */}
      <div className="hidden md:block absolute top-[20%] left-[15%] animate-bounce duration-[4s]">
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-50 rotate-12">
            <Zap className="text-yellow-400 fill-current" />
        </div>
      </div>
      <div className="hidden md:block absolute bottom-[25%] right-[15%] animate-bounce duration-[5s]">
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-50 -rotate-12">
            <Star className="text-orange-400 fill-current" />
        </div>
      </div>

      <div className="w-full max-w-lg z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block relative mb-8">
                <div className="w-32 h-32 bg-yellow-400 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(255,214,10,0.5)] flex items-center justify-center transform hover:rotate-12 transition-transform duration-700 cursor-pointer group">
                    <span className="text-7xl group-hover:scale-110 transition-transform">⚡</span>
                </div>
                <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-50 font-black text-[10px] uppercase tracking-widest text-slate-800 animate-pulse">
                    Munger's #1
                </div>
            </div>
            
            <h1 className="text-8xl font-black text-slate-900 tracking-tighter mb-4 italic leading-tight">
              Kwick<span className="text-yellow-500">.</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-1 bg-yellow-400 rounded-full"></span>
                <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">Extreme LOCAL Delivery</p>
                <span className="w-8 h-1 bg-yellow-400 rounded-full"></span>
            </div>
        </div>

        <button onClick={goToAuth} className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
          Sign in or create an account
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Buttons Grid (Attractive Stacking Layout) */}
        <div className="w-full flex flex-col gap-6 px-4">
          <RoleCard 
            title="I'm a Customer"
            subtitle="Order Food, Groceries & Rides"
            icon={<Smartphone />}
            color="bg-yellow-400"
            delay={100}
            onClick={() => handleRoleSelect('/customer/home')}
          />

          <RoleCard 
            title="I'm a Rider"
            subtitle="Start Earning & Deliver Joy"
            icon={<Package />}
            color="bg-green-500"
            delay={300}
            onClick={() => handleRoleSelect('/rider')}
          />

          <RoleCard 
            title="I'm a Vendor"
            subtitle="Grow Your Business Online"
            icon={<Store />}
            color="bg-orange-500"
            delay={500}
            onClick={() => handleRoleSelect('/vendor')}
          />
        </div>

        {/* Bottom Tagline */}
        <div className="mt-20 flex flex-col items-center animate-fadeIn delay-700">
            <div className="flex items-center gap-3 bg-slate-100/50 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-slate-100 transition-colors cursor-help group">
                <Target className="w-4 h-4 text-slate-400 group-hover:text-yellow-500 transition-colors" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available in Munger & Jamalpur</span>
            </div>
            <p className="mt-8 text-slate-300 font-bold text-[8px] uppercase tracking-widest">
                v1.2.0 • 2026 • Kwick Technologies
            </p>
        </div>
      </div>

      {/* Global CSS for animations */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
