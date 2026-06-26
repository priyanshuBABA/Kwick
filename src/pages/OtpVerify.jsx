import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

const OtpVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '9876543210';

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto-focus next
      if (value !== '' && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = () => {
    if (otp.join('').length === 4) {
      navigate('/ride-booking/home');
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
        <div className="text-2xl font-black font-heading text-slate-900 scale-110 drop-shadow-sm">RideGo ⚡</div>
        <div className="w-12 h-12" />
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify();
        }}
        className="flex-1 w-full"
      >
        <h1 className="text-4xl font-black text-slate-900 font-heading mb-4 tracking-tighter leading-none">Verify OTP</h1>
        <p className="text-slate-400 text-lg mb-12 leading-relaxed font-bold uppercase tracking-tight opacity-80 flex items-center gap-3">
          Sent to +91 {phone} <CheckCircle2 size={16} className="text-green-500" />
        </p>
 
        <div className="flex justify-between gap-4 mb-16 animate-slideUp">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="tel"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-16 h-20 bg-white border border-slate-200 rounded-[1.5rem] text-slate-900 text-3xl font-black text-center focus:border-[#FFD60A] outline-none shadow-[0_15px_40px_-5px_rgba(0,0,0,0.05)] focus:ring-8 focus:ring-[#FFD60A]/10 transition-all"
            />
          ))}
        </div>
 
        <button 
          type="submit"
          disabled={otp.join('').length !== 4}
          className="btn-primary mb-12 shadow-[0_20px_50px_-10px_rgba(255,214,10,0.4)] disabled:opacity-30 disabled:grayscale transition-all transform active:scale-95 flex items-center justify-center gap-4 text-xl py-6 w-full"
        >
          Verify & Proceed
        </button>
 
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-slate-400 font-black text-sm uppercase tracking-widest opacity-80">Resend code in <span className="text-slate-900 font-black">{timer}s</span></p>
          ) : (
            <button type="button" className="flex items-center gap-3 mx-auto text-[#F59E0B] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              <RefreshCw size={18} />
              Resend OTP
            </button>
          )}
        </div>
 
        <p className="mt-24 text-center text-[10px] text-slate-300 font-bold leading-relaxed px-12 uppercase tracking-widest opacity-60">
          Didn't receive code? Please check your signal strength or contact support.
        </p>
      </form>
    </div>
  );
};

export default OtpVerify;
