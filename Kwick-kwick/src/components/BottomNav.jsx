import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Car, Wallet, User, ShoppingBag, Grid } from 'lucide-react';

const BottomNav = ({ items, highlightColor = "#FFD60A" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // If items are provided (Customer/Admin/Rider flow), use them
  if (items && items.length > 0) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 flex justify-around items-center z-50">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? '' : 'text-slate-400'}`}
              style={isActive ? { color: highlightColor } : {}}
            >
              <Icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // RideGo Specific Bottom Nav (Fallback)
  const isRideGo = location.pathname.startsWith('/ride-booking');
  const rideGoRoutes = [
    '/ride-booking/home', 
    '/ride-booking/history', 
    '/ride-booking/wallet', 
    '/ride-booking/profile'
  ];

  if (!isRideGo || !rideGoRoutes.includes(location.pathname)) return null;

  const rideGoItems = [
    { icon: Home, label: 'Home', path: '/ride-booking/home' },
    { icon: Car, label: 'Rides', path: '/ride-booking/history' },
    { icon: Wallet, label: 'Wallet', path: '/ride-booking/wallet' },
    { icon: User, label: 'Profile', path: '/ride-booking/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#0A0A0A] border-t border-[#2E2E2E] flex justify-around items-center z-50 pb-4">
      {rideGoItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={idx}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#FFD60A] scale-110' : 'text-gray-500'}`}
          >
            <item.icon size={22} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            {isActive && <div className="w-1 h-1 bg-[#FFD60A] rounded-full mt-1 animate-pulse" />}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
