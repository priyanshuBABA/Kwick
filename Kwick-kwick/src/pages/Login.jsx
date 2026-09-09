import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (phone.length === 10) {
      navigate('/ride-booking/otp', { state: { phone } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] px-8 py-10 animate-fadeIn overflow-x-hidden">
      <div className="flex items-center justify-between mb-24">
        <button 
          onClick={() => navigate(-1)}
          className="p-4 bg-white rounded-full text-slate-900 transition-all active:scale-90 border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)]"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-2xl font-black font-heading text-slate-900 drop-shadow-sm scale-110">RideGo ⚡</div>
        <div className="w-12 h-12" />
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}
        className="flex-1 w-full"
      >
        <h1 className="text-4xl font-black text-slate-900 font-heading mb-4 tracking-tighter leading-none">Enter your mobile number</h1>
        <p className="text-slate-400 text-lg mb-12 leading-relaxed font-bold uppercase tracking-tight opacity-80">We'll send an OTP to verify your number</p>
        
        <div className="flex gap-4 mb-12 animate-slideUp">
          <div className="bg-white border border-slate-200 rounded-2xl px-6 py-6 text-slate-900 font-black flex items-center shadow-sm">
            <span className="text-2xl tracking-tighter">+91</span>
          </div>
          <div className="flex-1 relative">
            <input 
              type="tel" 
              maxLength="10"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="98765 43210"
              className="w-full bg-white border border-slate-200 rounded-2xl px-8 py-6 text-slate-900 text-2xl font-black focus:border-[#FFD60A] outline-none shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] placeholder:text-slate-300 transition-all focus:ring-8 focus:ring-[#FFD60A]/10"
              autoFocus
            />
            <Phone size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300" />
          </div>
        </div>

        <button 
          type="submit"
          disabled={phone.length !== 10}
          className="btn-primary mb-12 shadow-[0_20px_50px_-10px_rgba(255,214,10,0.4)] disabled:opacity-30 disabled:grayscale transition-all transform active:scale-95 flex items-center justify-center gap-4 text-xl py-6 w-full"
        >
          Continue
          <ArrowLeft className="rotate-180" size={24} />
        </button>

        <div className="flex items-center gap-6 mb-12 opacity-30">
          <div className="flex-1 h-px bg-slate-300" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">or continue with</span>
          <div className="flex-1 h-px bg-slate-300" />
        </div>

        <button type="button" className="w-full bg-white text-slate-900 font-black rounded-full py-6 flex items-center justify-center gap-4 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.08)] hover:bg-slate-50 transition-all transform active:scale-95 border border-slate-100 uppercase tracking-widest text-sm">
          <Mail size={24} />
          Continue with Google
        </button>
      </form>

      <p className="mt-16 text-center text-[11px] text-slate-400 font-bold leading-relaxed px-8 uppercase tracking-tight opacity-70">
        By continuing, you agree to our <span className="text-slate-900 border-b-2 border-slate-200">Terms of Service</span> & <span className="text-slate-900 border-b-2 border-slate-200">Privacy Policy</span>
      </p>
    </div>
  );
};

export default Login;
