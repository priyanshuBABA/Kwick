import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { CategoryGrid } from './components/CategoryGrid.jsx';
import { ProductCard } from './components/ProductCard.jsx';
import { FilterSidebar } from './components/FilterSidebar.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { ProductModal } from './components/ProductModal.jsx';
import { Footer } from './components/Footer.jsx';
import { categories, products } from './data/mockData.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronRight, Home, ShoppingBag as ShoppingBagIcon, Grid, User } from 'lucide-react';
import MobileFrame from '../../components/MobileFrame';
import BottomNav from '../../components/BottomNav';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('popularity');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBagIcon, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    switch (activeSort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return result;
  }, [activeSort, activeCategory]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const openProductView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handlePlaceOrder = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <MobileFrame>
    <div className="min-h-screen flex flex-col bg-soft-cream pb-16">
      <Navbar cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} openCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        <Hero />
        <CategoryGrid categories={categories} />

        {/* Product Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar 
                activeSort={activeSort} 
                setSort={setActiveSort} 
                activeCategory={activeCategory}
                setCategory={setActiveCategory}
                categories={categories}
              />
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
               <button 
                onClick={() => setIsFilterMobileOpen(true)}
                className="flex items-center space-x-2 bg-deep-navy text-white px-5 py-3 rounded-xl font-bold active:scale-95 transition-transform"
               >
                 <Filter size={18} />
                 <span>Filter & Sort</span>
               </button>
               <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{filteredProducts.length} MASTERPIECES</p>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart}
                      onQuickView={openProductView} 
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="py-20 text-center opacity-30">
                  <div className="h-32 w-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ChevronRight size={48} className="text-gray-400 rotate-90" />
                  </div>
                  <h3 className="text-2xl font-bold italic text-deep-navy">No Treasures Found</h3>
                  <p className="mt-2">Try adjusting your filters for more exquisite options.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Aesthetic Banner */}
        <section className="py-24 bg-white overflow-hidden relative">
           <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
              <span className="text-sunset-orange font-black text-sm uppercase tracking-[0.5em] mb-4">Craftsmanship Beyond Boundaries</span>
              <h2 className="text-4xl md:text-6xl font-black text-deep-navy max-w-4xl leading-tight mb-10">
                We believe in the power of a single stroke, the texture of fine paper, and the soul of hand-written dreams.
              </h2>
              <button className="btn-secondary group">
                <span className="flex items-center">
                  Learn About Our Artisans
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
           </div>
           <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <img src="https://www.transparenttextures.com/patterns/paper-fibers.png" alt="Overlay Texture" className="w-full h-full object-repeat" />
           </div>
        </section>
      </main>

      <Footer />

      {/* Overlays & Modals */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onPlaceOrder={handlePlaceOrder}
      />

      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
      />

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterMobileOpen(false)}
              className="fixed inset-0 bg-deep-navy/40 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-x-0 bottom-0 bg-white z-[210] rounded-t-[40px] p-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-deep-navy">REFINE SEARCH</h3>
                <button 
                  onClick={() => setIsFilterMobileOpen(false)}
                  className="p-3 bg-soft-cream rounded-full active:scale-75 transition-transform"
                >
                  <X />
                </button>
              </div>
              <FilterSidebar 
                activeSort={activeSort} 
                setSort={(s) => { setActiveSort(s); setIsFilterMobileOpen(false); }} 
                activeCategory={activeCategory}
                setCategory={(c) => { setActiveCategory(c); setIsFilterMobileOpen(false); }}
                categories={categories}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    <BottomNav items={navItems} highlightColor="#1A2E44" />
    </MobileFrame>
  );
}

export default App;
