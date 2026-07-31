import React from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product, onAdd, onRemove, quantity = 0, darkTheme = false }) => {
  const { name, price, weight, emoji, id } = product;

  return (
    <div className={`group ${darkTheme ? 'bg-[#1A1A1A] border-[#2E2E2E]' : 'bg-white border-slate-100'} border rounded-[2.5rem] p-6 transition-all duration-300 transform hover:scale-[1.02] flex flex-col gap-4 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden`}>
      {/* Badge for weight */}
      <div className={`absolute top-4 right-4 ${darkTheme ? 'bg-white/10 text-gray-400' : 'bg-slate-50 text-slate-500'} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-current opacity-30`}>
        {weight}
      </div>

      {/* Image/Emoji area */}
      <div className={`h-32 w-full rounded-[2rem] ${darkTheme ? 'bg-[#242424]' : 'bg-slate-50'} flex items-center justify-center transition-transform group-hover:scale-105 duration-500 relative overflow-hidden border ${darkTheme ? 'border-[#2E2E2E]' : 'border-slate-100'}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${darkTheme ? 'from-white/5 to-transparent' : 'from-black/5 to-transparent'} opacity-50`} />
        {product.image ? (
          <img src={product.image} alt={name} className="w-full h-full object-cover relative z-10" />
        ) : (
          <span className="text-6xl drop-shadow-2xl relative z-10 transform group-hover:rotate-6 transition-transform">{emoji}</span>
        )}
      </div>

      {/* Info area */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className={`font-extrabold text-lg ${darkTheme ? 'text-white' : 'text-slate-900'} font-heading tracking-tight leading-tight truncate`}>{name}</h3>
        <div className="flex justify-between items-end mt-2">
          <div>
             <span className={`text-2xl font-black ${darkTheme ? 'text-[#FFD60A]' : 'text-[#F59E0B]'} font-heading tracking-tighter`}>₹{price}</span>
             <span className={`text-[10px] ml-1 font-bold ${darkTheme ? 'text-gray-500' : 'text-slate-400'} uppercase tracking-widest`}>/ {weight}</span>
          </div>
          
          {quantity === 0 ? (
            <button 
              onClick={() => onAdd(product)}
              className={`p-3 rounded-2xl ${darkTheme ? 'bg-[#FFD60A] text-black' : 'bg-[#FFD60A] text-black'} shadow-xl ${darkTheme ? 'shadow-[#FFD60A]/20' : 'shadow-[#FFD60A]/30'} hover:scale-110 active:scale-95 transition-all group/btn border-2 border-white/20`}
            >
              <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" />
            </button>
          ) : (
            <div className={`flex items-center gap-4 ${darkTheme ? 'bg-[#242424]' : 'bg-slate-100'} p-1 rounded-2xl border ${darkTheme ? 'border-[#2E2E2E]' : 'border-slate-200'} shadow-inner`}>
              <button 
                onClick={() => onRemove(id)}
                className={`w-8 h-8 rounded-xl ${darkTheme ? 'bg-white/5 text-gray-400' : 'bg-white text-slate-500'} flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className={`font-black text-sm ${darkTheme ? 'text-white' : 'text-slate-900'} w-4 text-center`}>{quantity}</span>
              <button 
                onClick={() => onAdd(product)}
                className={`w-8 h-8 rounded-xl ${darkTheme ? 'bg-white/5 text-gray-400' : 'bg-white text-[#F59E0B]'} flex items-center justify-center hover:bg-[#FFD60A] hover:text-black transition-all shadow-sm`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
