import React from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const isHome = location.pathname === '/customer/household-items' || location.pathname === '/customer/household-items/';

  return (
    <header className="sticky top-0 z-50 h-[60px] bg-[#FFD700] px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        {!isHome && (
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
        )}
        <h1 className="text-xl font-bold text-black font-['Poppins'] truncate max-w-[200px]">
          {title || "QuickMart"}
        </h1>
      </div>

      <button onClick={() => navigate('/customer/household-items/cart')} className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
        <ShoppingCart className="w-6 h-6 text-black" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-[#FFD700] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FFD700] animate-pulse">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
