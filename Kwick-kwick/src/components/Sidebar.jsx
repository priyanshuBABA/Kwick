import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, Heart, Wallet, Zap, User, X } from 'lucide-react';
import { useCart } from '../CartContext';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: Grid, label: 'All Categories', path: '/customer/services' },
    { icon: ShoppingBag, label: 'My Orders', path: '/customer/orders', badge: cartCount > 0 ? cartCount : null },
    { icon: Heart, label: 'Wishlist', path: '/customer/wishlist' },
    { icon: Wallet, label: 'Wallet', path: '/customer/wallet' },
    { icon: Zap, label: 'Offer', path: '/customer/offers' },
    { icon: User, label: 'Profile', path: '/customer/profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-[#f6f8fb] z-40 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:top-auto lg:h-auto lg:border-r lg:border-slate-100 overflow-y-auto`}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 pt-16 lg:pt-10 lg:px-5">
          {/* Menu Items */}
          <nav className="space-y-1 mb-12">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                    active
                      ? 'bg-[#fff5e9] text-orange-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-orange-500' : ''}`} />
                    <span className={`font-medium text-[15px] ${active ? 'font-bold' : ''}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ml-auto bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Kwick Pro Section */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-slate-900">Kwick Pro</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4 font-medium">
              Free delivery + exclusive deals
            </p>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors">
              Upgrade ⚡
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
