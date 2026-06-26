import React from 'react';
import MobileFrame from '../components/MobileFrame';
import TopBar from '../components/TopBar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import { useCart } from '../CartContext';
import { Utensils } from 'lucide-react';

const FoodCakes = () => {
  const { addToCart } = useCart();
  
  return (
    <MobileFrame>
      <TopBar title="Food & Cakes" bgColor="bg-orange-500" textColor="text-white" rightIcon={<Utensils className="text-white opacity-80" />} />
      <div className="bg-orange-500 px-4 pb-12 pt-4 relative rounded-b-[40px] z-10 overflow-hidden">
        <h1 className="text-3xl font-black text-white mb-2 leading-tight">Craving<br/>Something<br/>Sweet?</h1>
        <p className="text-orange-100 font-medium">🎂 Freshly baked cakes & hot food!</p>
        
        {/* Decorative background element */}
        <div className="absolute -bottom-8 -right-8 opacity-20 text-[12rem] transform rotate-12">🍔</div>
      </div>

      <div className="bg-white rounded-t-3xl -mt-6 relative z-20 pt-6 px-4 min-h-[60vh] pb-24 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <h2 className="font-bold text-navy mb-4 text-lg">Delicious Treats</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.foodCakes.map((product) => (
             <div key={product.id} className="w-full">
              <ProductCard product={product} onAdd={addToCart} />
             </div>
          ))}
          {products.foodCakes.map((product) => (
             <div key={`m-dup-${product.id}`} className="w-full">
              <ProductCard product={{...product, id: product.id + 100}} onAdd={addToCart} />
             </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
};
export default FoodCakes;
