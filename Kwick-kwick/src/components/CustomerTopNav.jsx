import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ShoppingCart, User, Menu, Mic, Heart } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { useCart } from '../CartContext';
import LocationPicker from './LocationPicker';
import { useAuth } from '../context/AuthContext';

const CustomerTopNav = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLocation, isLocationOpen, setIsLocationOpen } = useAppContext();
  const { cartCount } = useCart();
  const { user } = useAuth();

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return 'U';
    const parts = nameOrEmail.split(' ');
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const navItems = [
    { label: 'Home', path: '/customer/home' },
    { label: 'Categories', path: '/customer/services' },
    { label: 'Orders', path: '/customer/orders' },
    { label: 'Offers', path: '/customer/offers' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white sticky top-0 z-40 border-b border-slate-100">
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-2xl font-extrabold text-orange-500 whitespace-nowrap"><span className="grid place-items-center w-10 h-10 rounded-2xl bg-orange-500 text-white text-lg">K</span>Kwick</div>
            <button
              onClick={() => setIsLocationOpen(true)}
              className="hidden sm:flex items-center gap-2 text-sm text-slate-600 bg-orange-50/70 border border-orange-100 px-3 py-2 rounded-full hover:bg-orange-100 transition-colors"
            >
              <span className="text-orange-500">📍</span>
              <span className="font-semibold truncate max-w-[150px]">{userLocation || 'Sector 21, Noida'}</span>
              <span className="text-slate-400">▾</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-[530px] items-center gap-3 bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 ml-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search products, shops, services..."
              className="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 flex-1"
            />
          </div>

          {/* Right Actions */}
          <nav className="hidden xl:flex items-center gap-7">
            {navItems.map((item) => (
              <button key={item.path} onClick={() => navigate(item.path)} className={`text-sm font-semibold transition-colors ${isActive(item.path) ? 'text-orange-500 bg-orange-50 px-4 py-2 rounded-xl' : 'text-slate-600 hover:text-orange-500'}`}>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2 lg:gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-lg hidden md:block" title="Voice Search">
              <Mic className="w-5 h-5 text-orange-500" />
            </button>
            <button
              onClick={() => navigate('/customer/notifications')}
              className={`p-2 rounded-lg relative transition-colors ${isActive('/customer/notifications') ? 'bg-orange-50 text-orange-500' : 'hover:bg-slate-100'}`}
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => navigate('/customer/cart')}
              className="p-2 hover:bg-slate-100 rounded-lg relative"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/customer/wishlist')}
              className={`p-2 rounded-lg relative transition-colors ${isActive('/customer/wishlist') ? 'bg-orange-50 text-orange-500' : 'hover:bg-slate-100 text-slate-700'}`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" fill={isActive('/customer/wishlist') ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => navigate('/customer/profile')}
              className="w-9 h-9 lg:w-11 lg:h-10 rounded-2xl bg-orange-500 text-white font-bold overflow-hidden border-2 border-white shadow-md hover:shadow-lg transition-shadow"
            >
              {user?.photo || user?.avatar || user?.picture ? (
                <img src={user.photo || user.avatar || user.picture} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="inline-block w-full h-full leading-8 lg:leading-10 text-center text-sm">
                  {getInitials(user?.name || user?.email)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden flex items-center gap-2 bg-slate-100 rounded-full px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 flex-1"
          />
        </div>
      </div>

      <LocationPicker isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
    </header>
  );
};

export default CustomerTopNav;
