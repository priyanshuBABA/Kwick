import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-[85vh] sm:h-[80vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=2000&auto=format&fit=crop"
          alt="Premium Stationery"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/40 to-transparent"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center space-x-2 text-sunset-orange bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit mb-6 animate-pulse">
            <Sparkles size={18} />
            <span className="text-xs font-bold uppercase tracking-widest leading-none">The Artisan Collection 2024</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
            Where Every <span className="text-sunset-orange italic">Word</span> Tells a Story.
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed drop-shadow-md">
            Discover our curated collection of artisan leather journals, luxury fountain pens, and premium art supplies. Elevate your creative workspace.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-sunset-orange px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center transition-all duration-300 hover:shadow-2xl shadow-sunset-orange/30 overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center">
                Shop the Collection
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-deep-navy scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/20 transition-all duration-300"
            >
              View Lookbook
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 hidden lg:block"
      >
        <div className="w-32 h-32 rounded-full border-2 border-white/20 flex items-center justify-center p-4 backdrop-blur-sm">
          <img 
            src="https://images.unsplash.com/photo-1571167530847-ec49bb036495?q=80&w=200&auto=format&fit=crop" 
            className="w-full h-full object-cover rounded-full shadow-2xl" 
            alt="Product Preview"
          />
        </div>
      </motion.div>
    </section>
  );
};
