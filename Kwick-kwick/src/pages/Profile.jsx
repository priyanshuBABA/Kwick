import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, History, Wallet, Gift, HelpCircle, Shield, Star, LogOut, ChevronRight, Edit3, Settings, Moon, Bell } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth', { replace: true });
  };

  const menuSections = [
    {
      title: 'Account Settings',
      items: [
        { icon: User, label: 'Edit Profile', color: 'text-blue-500' },
        { icon: MapPin, label: 'Saved Addresses', color: 'text-red-500' },
        { icon: CreditCard, label: 'Payment Methods', color: 'text-[#FFD60A]' },
      ]
    },
    {
      title: 'Rides & Finance',
      items: [
        { icon: History, label: 'Ride History', path: '/ride-booking/history', color: 'text-green-500' },
        { icon: Wallet, label: 'RideGo Wallet', path: '/ride-booking/wallet', color: 'text-yellow-500' },
        { icon: Gift, label: 'Refer & Earn', color: 'text-purple-500' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Moon, label: 'Dark Mode', color: 'text-gray-400', toggle: true },
        { icon: Bell, label: 'Notifications', path: '/ride-booking/notifications', color: 'text-orange-500' },
        { icon: Settings, label: 'Advanced Settings', color: 'text-gray-300' },
      ]
    },
    {
      title: 'Support & Legal',
      items: [
        { icon: HelpCircle, label: 'Help & Support', color: 'text-blue-400' },
        { icon: Shield, label: 'Safety Center', color: 'text-green-400' },
        { icon: Star, label: 'Rate the App', color: 'text-[#FFD60A]' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-32 text-white animate-fadeIn overflow-hidden">
      <TopBar title="Your Profile" />

      <div className="p-8">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#2E2E2E] rounded-[3.5rem] p-10 shadow-2xl mb-12 relative overflow-hidden animate-slideIn">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD60A]/5 rounded-bl-[4rem] group-hover:scale-150 transition-all duration-1000" />
          <div className="flex flex-col items-center mb-10 relative">
             <div className="relative mb-6 transform hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-[#FFD60A]/10 rounded-full blur-[40px] animate-pulse" />
                <div className="w-32 h-32 bg-[#FFD60A] rounded-[3rem] border-4 border-white/20 shadow-2xl flex items-center justify-center font-bold text-black text-5xl font-heading tracking-tighter shadow-[#FFD60A]/10">
                   RK
                </div>
                <button className="absolute bottom-1 right-1 p-3 bg-white text-black rounded-2xl shadow-xl transition-all active:scale-90 hover:bg-[#FFD60A]">
                   <Edit3 size={18} />
                </button>
             </div>
             <h2 className="text-4xl font-bold font-heading mb-2 tracking-tight">Rahul Kumar</h2>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">+91 98765 43210</p>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12 animate-slideUp">
          {menuSections.map((section, idx) => (
            <div key={idx} className="relative">
              <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-10 mb-6 flex items-center gap-3">
                 <span className="w-2 h-2 rounded-full bg-[#FFD60A]" />
                 {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => item.path && navigate(item.path)}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-[2.5rem] p-6 flex items-center gap-6 shadow-xl transition-all hover:scale-[1.02] active:scale-95 transform cursor-pointer group hover:border-[#FFD60A]/40"
                  >
                    <div className="w-14 h-14 bg-[#242424] rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                      <item.icon className={item.color} size={24} />
                    </div>
                    <span className="text-lg font-bold font-heading text-white tracking-tight flex-1 group-hover:text-[#FFD60A] transition-colors">{item.label}</span>
                    {item.toggle ? (
                      <div className="w-14 h-7 bg-green-500 rounded-full flex items-center px-1 shadow-inner relative transition-colors duration-500">
                         <div className="w-5 h-5 bg-white rounded-full shadow-lg absolute right-1" />
                      </div>
                    ) : (
                      <ChevronRight className="text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button 
             onClick={handleLogout}
             className="w-full bg-red-500/5 border-2 border-red-500/20 rounded-[2.5rem] p-6 flex items-center justify-center gap-4 text-red-500 text-lg font-bold font-heading uppercase tracking-widest transition-all hover:bg-red-500/10 active:scale-95 shadow-xl mt-12 group mb-20"
          >
             <LogOut size={24} className="group-hover:-translate-x-1 transition-transform" />
             Log Out Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
