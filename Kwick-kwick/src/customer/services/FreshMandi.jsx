import React from 'react';
import MobileFrame from '../../components/MobileFrame';
import TopBar from '../../components/TopBar';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/mockData';
import { useCart } from '../../CartContext';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const FreshMandi = () => {
  const { addToCart } = useCart();

  return (
    <MobileFrame>
      <TopBar title="Fresh Mandi" bgColor="bg-white" />
      
      {/* Top Banner */}
      <div className="bg-green-50 py-3 flex items-center justify-between px-4 border-b border-green-100 sticky top-[64px] z-30">
         <ChevronLeft className="w-4 h-4 text-green-600 cursor-pointer hover:bg-green-100 rounded-full" />
         <span className="text-green-800 font-extrabold text-sm uppercase tracking-wide flex items-center gap-2">
           🌿 Fresh Today Delivery 🌿
         </span>
         <ChevronRight className="w-4 h-4 text-green-600 cursor-pointer hover:bg-green-100 rounded-full" />
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 py-2 border-b border-gray-100 hide-scrollbar scroll-smooth">
         <button className="bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm shadow-green-500/30">All Fresh</button>
         <button className="bg-white border border-slate-200 text-slate-500 hover:text-navy hover:border-slate-300 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors">Vegetables</button>
         <button className="bg-white border border-slate-200 text-slate-500 hover:text-navy hover:border-slate-300 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors">Fruits</button>
         <button className="bg-white border border-slate-200 text-slate-500 hover:text-navy hover:border-slate-300 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors">Dairy</button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 pb-24">
        {products.freshMandi.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard product={product} onAdd={addToCart} />
          </div>
        ))}
        {/* DUPLICATE FOR ILLUSION OF MORE ITEMS */}
        {products.freshMandi.map((product) => (
          <div key={`dup-${product.id}`} className="w-full">
            <ProductCard product={{...product, id: product.id + 100}} onAdd={addToCart} />
          </div>
        ))}
      </div>

      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-green-600 active:scale-95 transition-all z-40 flex items-center justify-center transform hover:rotate-12 duration-300"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </MobileFrame>
  );
};
export default FreshMandi;
