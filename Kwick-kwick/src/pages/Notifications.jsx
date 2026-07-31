import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCircle, Gift, Bike, Car, Wallet, ArrowLeft, Trash2, ShieldCheck, Mail, Info, Calendar, BellOff } from 'lucide-react';
import { notifications } from '../data/mockData';
import TopBar from '../components/TopBar';

const Notifications = () => {
  const [notifs, setNotifs] = useState(notifications);
  const navigate = useNavigate();

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifs([]);
  };

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-32 text-white animate-fadeIn overflow-hidden">
      <TopBar 
        title="Notifications" 
        rightElement={
          <div className="flex gap-2">
             <button 
               onClick={markAllRead}
               className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner group active:scale-95 transition-all flex items-center gap-2 hover:bg-white/10"
             >
                <ShieldCheck size={18} className="text-green-500 group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none hidden sm:inline">Mark read</span>
             </button>
             <button 
               onClick={clearAll}
               className="p-3 bg-red-500/5 rounded-2xl border border-red-500/10 shadow-inner group active:scale-95 transition-all flex items-center gap-2 hover:bg-red-500/10"
             >
                <Trash2 size={18} className="text-red-500 group-hover:rotate-12 transition-transform" />
             </button>
          </div>
        }
      />

      <div className="p-8">
        {/* Count Pill */}
        <div className="flex items-center justify-between mb-12 animate-slideIn">
           <div className="flex items-center gap-4 bg-[#1A1A1A] px-8 py-4 rounded-[2.5rem] border border-[#2E2E2E] shadow-2xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#FFD60A]/5 rounded-bl-[2rem] group-hover:scale-150 transition-all" />
              <div className="w-12 h-12 bg-[#FFD60A]/10 rounded-2xl flex items-center justify-center border-2 border-[#FFD60A]/20 shadow-inner ring-4 ring-[#FFD60A]/5">
                 <Bell size={24} className="text-[#FFD60A] animate-swing" />
              </div>
              <div>
                 <h2 className="text-2xl font-bold font-heading text-white tracking-tight leading-none mb-1">{unreadCount} Unread</h2>
                 <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest opacity-60">Staying updated with RideGo</p>
              </div>
           </div>
           {notifs.length > 0 && (
             <button 
               onClick={markAllRead}
               className="text-[#FFD60A] text-[10px] font-bold uppercase tracking-widest bg-[#FFD60A]/10 px-6 py-4 rounded-full hover:bg-[#FFD60A]/20 transition-all active:scale-95 shadow-xl shadow-[#FFD60A]/5 border border-[#FFD60A]/20"
             >
                Check All ✓
             </button>
           )}
        </div>

        <div className="space-y-12">
          {notifs.length > 0 ? (
            <>
              {/* Unread Section */}
              {notifs.some(n => !n.read) && (
                <div className="relative animate-slideUp">
                  <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-10 mb-8 flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-[#FFD60A] shadow-lg shadow-[#FFD60A]/20 animate-pulse" />
                     Recent Notifications
                  </h3>
                  <div className="space-y-6">
                    {notifs.filter(n => !n.read).map((notif, idx) => (
                      <div key={idx} className="bg-[#1A1A1A] border-l-8 border-[#FFD60A] rounded-[3rem] p-8 shadow-2xl relative group overflow-hidden transition-all hover:scale-[1.02] transform">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD60A]/5 rounded-bl-[4rem] group-hover:scale-150 transition-all" />
                        <div className="flex items-center gap-6">
                           <div className="w-18 h-18 bg-[#242424] rounded-2xl flex items-center justify-center border-2 border-[#FFD60A]/20 shadow-2xl shadow-[#FFD60A]/5 group-hover:scale-110 transition-transform text-4xl">
                              {notif.icon}
                           </div>
                           <div className="flex-1 pr-6 relative">
                              <h4 className="text-xl font-bold font-heading text-white mb-2 leading-tight tracking-tight">{notif.title}</h4>
                              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4 max-w-xs">{notif.body}</p>
                              <div className="flex items-center gap-6 opacity-60">
                                 <span className="text-[10px] font-bold uppercase tracking-widest bg-[#242424] px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/5">
                                    <Calendar size={12} />
                                    {notif.time}
                                 </span>
                                 <div className="w-3 h-3 bg-[#FFD60A] rounded-full shadow-lg shadow-[#FFD60A]/20 animate-pulse border border-white/20" />
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Earlier Section */}
              {notifs.some(n => n.read) && (
                <div className="relative animate-slideUp">
                  <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-10 mb-8 flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-gray-600 shadow-lg" />
                     Earlier Notifications
                  </h3>
                  <div className="space-y-6">
                    {notifs.filter(n => n.read).map((notif, idx) => (
                      <div key={idx} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-[3.5rem] p-10 shadow-2xl relative group overflow-hidden opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all hover:scale-[1.02] transform">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-[4rem] group-hover:scale-150 transition-all duration-700" />
                        <div className="flex items-center gap-8">
                           <div className="w-16 h-16 bg-[#242424] rounded-[2rem] flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform text-3xl">
                              {notif.icon}
                           </div>
                           <div className="flex-1 relative">
                              <h4 className="text-xl font-bold font-heading text-white mb-2 leading-none tracking-tight">{notif.title}</h4>
                              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm mb-4">{notif.body}</p>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700 flex items-center gap-2">
                                 <Mail size={12} />
                                 Marked as Read • {notif.time}
                              </span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-slideUp mt-10">
               <div className="relative mb-12 transform hover:scale-110 transition-transform">
                  <div className="absolute inset-0 bg-[#FFD60A]/5 rounded-full blur-[60px]" />
                  <div className="w-48 h-48 bg-[#1A1A1A] rounded-[4rem] flex items-center justify-center border-4 border-[#2E2E2E] shadow-2xl relative z-10 animate-bounce">
                    <BellOff size={80} className="text-gray-800" />
                  </div>
               </div>
               <h3 className="text-4xl font-bold font-heading mb-4 text-[#FFD60A] tracking-tighter">No notifications</h3>
               <p className="text-gray-500 text-lg mb-12 font-medium leading-relaxed max-w-xs px-6">We'll alert you for ride updates, offers and cashback here.</p>
               <button 
                 onClick={() => navigate('/ride-booking/home')}
                 className="btn-primary py-6 px-12 text-xl shadow-2xl shadow-[#FFD60A]/20 transform active:scale-95 flex items-center justify-center gap-4 border-2 border-white/20 uppercase tracking-widest"
               >
                 Back to Home
                 <CheckCircle size={24} />
               </button>
            </div>
          )}
        </div>

        {/* Clear All Float Button */}
        {notifs.length > 0 && (
           <button 
            onClick={clearAll}
            className="fixed bottom-24 right-8 p-6 bg-red-500 text-white rounded-full shadow-[0_10px_40px_rgba(239,68,68,0.4)] border-4 border-white active:scale-90 transition-all hover:rotate-12 group z-50 transform"
           >
              <Trash2 size={28} className="group-hover:scale-110 transition-transform" />
           </button>
        )}
      </div>

      <style>{`
        @keyframes swing {
           0% { transform: rotate(0deg); }
           20% { transform: rotate(15deg); }
           40% { transform: rotate(-10deg); }
           60% { transform: rotate(5deg); }
           80% { transform: rotate(-5deg); }
           100% { transform: rotate(0deg); }
        }
        .animate-swing {
           animation: swing 2s ease-in-out infinite;
           transform-origin: top center;
        }
      `}</style>
    </div>
  );
};

export default Notifications;
