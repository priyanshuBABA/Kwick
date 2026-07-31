import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, CreditCard, ShoppingCart, User } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { useCart } from '../CartContext';
import LocationPicker from './LocationPicker';
import { useAuth } from '../context/AuthContext';

const CustomerTopNav = () => {
  const navigate = useNavigate();
  const { userLocation, isLocationOpen, setIsLocationOpen } = useAppContext();
  const { cartCount } = useCart();
  const { user } = useAuth();

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return 'U';
    const parts = nameOrEmail.split(' ');
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <header className="w-full bg-white px-6 py-3 shadow-sm sticky top-0 z-40">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-extrabold text-orange-500">Kwick</div>
          <button onClick={() => setIsLocationOpen(true)} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-full">
            <span className="text-orange-500">📍</span>
            <span className="font-semibold">{userLocation || 'Sector 21, Noida'}</span>
            <span className="text-slate-400">▾</span>
          </button>
        </div>

        
          <div className="hidden lg:flex items-center gap-6 bg-slate-50 rounded-full px-3 py-2 border border-slate-200">
            <Search className="text-slate-400" />
            <input
              type="search"
              placeholder="Search products, shops, services..."
              className="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 w-64"
            />
          </div>
          <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-white shadow-sm"><Bell /></button>
          <button className="p-2 rounded-full bg-white shadow-sm"><CreditCard /></button>
          <button onClick={() => navigate('/customer/cart')} className="relative p-2 rounded-full bg-white shadow-sm">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className={"absolute -top-1 -right-1 text-white rounded-full flex items-center justify-center text-[10px] font-bold " + (cartCount > 99 ? 'bg-red-500 px-1.5 h-5 min-w-[24px] rounded-full animate-pulse' : 'bg-red-500 w-5 h-5')}>{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </button>
          <button onClick={() => navigate('/customer/profile')} className="w-9 h-9 rounded-full bg-orange-500 text-white font-bold overflow-hidden">
            {user?.photo || user?.avatar || user?.picture ? (
              <img src={user.photo || user.avatar || user.picture} alt="avatar" className="w-9 h-9 object-cover" />
            ) : (
              <span className="inline-block w-9 h-9 leading-9 text-center">{getInitials(user?.name || user?.email)}</span>
            )}
          </button>
        </div>
      <LocationPicker isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
      </div>
    </header>
  );
};

export default CustomerTopNav;
