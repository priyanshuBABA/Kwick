import { Pen, Book, Palette, Briefcase, Gift, Scissors, Folder, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  Pen: Pen,
  Book: Book,
  Palette: Palette,
  Briefcase: Briefcase,
  Gift: Gift,
  Scissors: Scissors,
  Folder: Folder,
  Ruler: Ruler
};

export const CategoryGrid = ({ categories }) => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-deep-navy mb-4 tracking-tight">Browse by Category</h2>
        <div className="h-1 w-24 bg-sunset-orange/30 rounded-full relative">
          <div className="absolute left-0 h-1 w-12 bg-sunset-orange rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-10">
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.icon];
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full ${category.color} flex items-center justify-center mb-5 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:scale-110 overflow-hidden relative`}>
                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"></div>
                <IconComponent 
                  className="w-10 h-10 sm:w-12 sm:h-12 text-deep-navy group-hover:text-sunset-orange transition-colors duration-300" 
                />
              </div>
              <p className="text-lg font-bold text-deep-navy mb-1 group-hover:text-sunset-orange transition-colors">{category.name}</p>
              <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">Explorer Now</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
