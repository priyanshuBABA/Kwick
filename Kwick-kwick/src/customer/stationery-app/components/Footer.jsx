import React from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-deep-navy text-white py-24 sm:py-32 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sunset-orange/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-24">
          
          {/* Brand Info */}
          <div className="space-y-8">
            <div>
              <span className="text-3xl font-black tracking-tight">
                Stationary<span className="text-sunset-orange underline underline-offset-8 decoration-4">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              We curate the world's most exquisite writing tools and stationery for the modern creative. Crafting stories since 1994.
            </p>
            <div className="flex space-x-5 text-gray-500">
              <a href="#" className="hover:text-sunset-orange transition-colors"><Mail size={24} /></a>
              <a href="#" className="hover:text-sunset-orange transition-colors"><Phone size={24} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-sm font-black text-white uppercase tracking-[0.3em]">Collections</h4>
            <ul className="space-y-4 text-gray-400 font-bold">
              <li><a href="#" className="hover:text-sunset-orange hover:translate-x-2 transition-all block">Luxury Pens</a></li>
              <li><a href="#" className="hover:text-sunset-orange hover:translate-x-2 transition-all block">Artisan Notebooks</a></li>
              <li><a href="#" className="hover:text-sunset-orange hover:translate-x-2 transition-all block">Fine Art Supplies</a></li>
              <li><a href="#" className="hover:text-sunset-orange hover:translate-x-2 transition-all block">Bespoke Gifting</a></li>
            </ul>
          </div>

          {/* Legal / Support */}
          <div className="space-y-8">
            <h4 className="text-sm font-black text-white uppercase tracking-[0.3em]">Assistance</h4>
            <ul className="space-y-4 text-gray-400 font-bold">
              <li><a href="#" className="hover:text-sunset-orange hover:translate-x-2 transition-all block">Bespoke Concierge</a></li>
              <li><a href="#" className="hover:text-sunset-orange hover:translate-x-2 transition-all block">Shipping Aesthetics</a></li>
              <li><a href="#" className="hover:text-sunset-orange hover:translate-x-2 transition-all block">Return Policy</a></li>
              <li><a href="#" className="hover:text-sunset-orange hover:translate-x-2 transition-all block">Journaling Tips</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-sm font-black text-white uppercase tracking-[0.3em]">Join the Inner Circle</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Curated inspiration and early access to limited collections, delivered softly to your inbox.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Exquisite@email.com" 
                className="w-full bg-white/10 border-b-2 border-white/20 py-4 px-2 focus:outline-none focus:border-sunset-orange transition-colors text-white placeholder-gray-500 font-bold" 
              />
              <button className="absolute right-0 top-4 text-sunset-orange group-hover:translate-x-2 transition-transform">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-xs font-black text-gray-500 uppercase tracking-widest">
          <p>© 2024 Stationary Hub Global. All Rights Reserved.</p>
          <div className="flex space-x-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Paradigm</a>
            <a href="#" className="hover:text-white transition-colors">Global Logistics</a>
            <a href="#" className="hover:text-white transition-colors">Corporate Gifting</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
