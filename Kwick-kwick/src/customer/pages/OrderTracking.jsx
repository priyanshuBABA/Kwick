import React from 'react';
import MobileFrame from '../../components/MobileFrame';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import { orders } from '../../data/mockData';
import { Phone, MapPin, Navigation } from 'lucide-react';

const OrderTracking = () => {
  return (
    <MobileFrame>
      <TopBar title="Order Tracking" />
      
      {/* Map Placeholder */}
      <div className="relative h-48 bg-slate-200 rounded-2xl m-4 overflow-hidden border-2 border-slate-300 flex items-center justify-center">
         <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIiBmaWxsPSIjY2JjYmNiIi8+Cjwvc3ZnPg==')] pointer-events-none"></div>
         <div className="flex flex-col items-center gap-2 z-10 text-slate-500 font-bold bg-white/80 p-2 rounded-xl backdrop-blur-sm shadow-sm">
           <span className="text-3xl">🗺️</span>
           Live Map
         </div>
         {/* Fake Route SVG */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M10,80 Q30,40 50,60 T90,20" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" />
           <circle cx="10" cy="80" r="4" fill="#3B82F6" />
           <circle cx="90" cy="20" r="4" fill="#EF4444" />
           <circle cx="50" cy="60" r="3" fill="#22C55E" />
         </svg>
      </div>

      <div className="px-4 pb-12 flex flex-col gap-4">
        {/* Rider Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="relative">
               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl shadow-inner border mx-auto">👨🏽‍p</div>
               <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
             </div>
             <div>
               <h3 className="font-bold text-navy text-lg leading-tight">Aman Kumar</h3>
               <div className="flex items-center gap-1 text-sm text-yellow-500">
                 <span>⭐</span><span className="font-bold">4.9</span> <span className="text-slate-400 font-normal ml-1">(120+ trips)</span>
               </div>
             </div>
          </div>
          <button className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors shadow-sm active:scale-95">
             <Phone className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-2">
           <div className="relative">
             {/* Vertical Line */}
             <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 rounded-full -z-10"></div>
             <div className="absolute left-4 top-4 h-1/2 w-0.5 bg-green-500 rounded-full -z-10 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>

             {/* Steps */}
             <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm shadow-md font-bold z-10">✓</div>
                  <div className="pt-1">
                    <h4 className="font-bold text-navy text-sm">Order Accepted</h4>
                    <span className="text-xs text-slate-400 font-medium">12:30 PM</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm shadow-md font-bold z-10">✓</div>
                  <div className="pt-1">
                    <h4 className="font-bold text-navy text-sm">Picked Up</h4>
                    <span className="text-xs text-slate-400 font-medium">12:45 PM</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm shadow-md font-bold z-10 animate-pulse">✓</div>
                  <div className="pt-1">
                    <h4 className="font-bold text-navy text-sm">On the Way</h4>
                    <span className="text-xs text-slate-400 font-medium">Arriving in 15 mins</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-400 text-sm shadow-sm font-bold z-10">✓</div>
                  <div className="pt-1">
                    <h4 className="font-bold text-slate-400 text-sm">Delivered</h4>
                  </div>
                </div>
             </div>
           </div>
        </div>

        {/* Promo */}
        <div className="bg-gradient-to-r from-yellow-400 to-primary rounded-2xl p-4 shadow-md text-navy relative overflow-hidden flex items-center justify-between">
           <h3 className="font-bold text-sm relative z-10">🌟 Subscribe Weekly Tokri — ₹299/month</h3>
           <button className="bg-white text-primary font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm hover:bg-slate-50 transition-colors z-10">Subscribe</button>
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/20 transform skew-x-12 -z-0"></div>
        </div>
      </div>
    </MobileFrame>
  );
};
export default OrderTracking;
