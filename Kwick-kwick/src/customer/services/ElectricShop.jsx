import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, Menu, X, Star, Zap, Truck, ShieldCheck, 
  PhoneCall, ArrowRight, Lightbulb, 
  Workflow, Power, Hammer, Home as HomeIcon
} from 'lucide-react';

const productsData = [
  { id: 1, name: '9W Smart LED Bulb', brand: 'Philips', price: 299, originalPrice: 400, discount: 25, rating: 4.8, img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400', category: 'Lighting' },
  { id: 2, name: 'Industrial Copper Wire 2.5 mm', brand: 'Havells', price: 1450, originalPrice: 1600, discount: 9, rating: 4.5, img: 'https://plus.unsplash.com/premium_photo-1673356302067-aac3b545a331?auto=format&fit=crop&q=80&w=400', category: 'Wires & Cables' },
  { id: 3, name: 'Roma Modular Switch 10A', brand: 'Anchor', price: 65, originalPrice: 85, discount: 23, rating: 4.6, img: 'https://images.unsplash.com/photo-1558455122-eb1fe6cb2eee?auto=format&fit=crop&q=80&w=400', category: 'Switches' },
  { id: 4, name: '32A Double Pole MCB', brand: 'Legrand', price: 420, originalPrice: 550, discount: 23, rating: 4.9, img: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&q=80&w=400', category: 'Industrial Gear' },
  { id: 5, name: 'Ceiling Fan 1200mm', brand: 'Crompton', price: 1850, originalPrice: 2200, discount: 15, rating: 4.4, img: 'https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78?auto=format&fit=crop&q=80&w=400', category: 'Home Appliances' },
  { id: 6, name: 'Professional Multimeter', brand: 'Fluke', price: 2500, originalPrice: 3000, discount: 16, rating: 4.7, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400', category: 'Tools' },
];

const categoriesData = [
  { id: 1, name: 'Lighting & Fans', icon: Lightbulb },
  { id: 2, name: 'Wires & Cables', icon: Workflow },
  { id: 3, name: 'Switches & Sockets', icon: Power },
  { id: 4, name: 'Industrial Gear', icon: Hammer },
  { id: 5, name: 'Home Appliances', icon: HomeIcon },
];

const ElectricShop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const navLinks = [
    { name: 'Home', path: '/customer/home' },
    { name: 'Products', path: '#' },
    { name: 'Categories', path: '#' },
    { name: 'About Us', path: '#' },
  ];

  return (
    <div className="font-sans bg-slate-50 min-h-screen text-slate-800">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/customer/home')}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Zap size={24} fill="currentColor" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">VoltMart</h1>
                <p className="text-[10px] uppercase font-bold text-blue-600 tracking-widest">Electric Shop</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, idx) => (
                <a key={idx} onClick={() => link.name === 'Home' && navigate(link.path)} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer">
                  {link.name}
                </a>
              ))}
            </div>

            {/* Search and Cart */}
            <div className="hidden md:flex items-center gap-6">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Switches, wires, bulbs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-100 border-transparent rounded-full py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all w-64"
                />
              </div>
              <div className="relative cursor-pointer hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <div className="relative cursor-pointer">
                <ShoppingCart className="w-6 h-6 text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-slate-100 p-4 absolute w-full shadow-lg"
          >
            <div className="relative mb-4">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
               <input 
                 type="text" 
                 placeholder="Search products..." 
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
               />
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <a key={idx} onClick={() => { if(link.name === 'Home') navigate(link.path); setIsMenuOpen(false); }} className="text-base font-bold text-slate-700 pb-2 border-b border-slate-50 cursor-pointer">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 lg:py-20">
        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col lg:flex-row items-center min-h-[450px]">
          <div className="absolute inset-0 bg-blue-600/20 z-0"></div>
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 lg:w-1/2 p-10 lg:p-16 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block py-1.5 px-4 bg-white/10 backdrop-blur-md rounded-full text-blue-300 font-bold text-xs uppercase tracking-widest mb-6 border border-white/10">100% Genuine Products</span>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                Premium <span className="text-blue-500">Electrical</span><br/> Solutions
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                Upgrade your home and business with high-quality, certified electrical components at unmatchable prices.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto lg:mx-0 shadow-lg shadow-blue-600/30">
                Shop Now <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
          
          <div className="relative z-10 lg:w-1/2 p-8 lg:p-0 h-full flex items-center justify-center">
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              src="https://images.unsplash.com/photo-1544716187-56783c1ce714?auto=format&fit=crop&q=80&w=800" 
              alt="Electrical Tools" 
              className="w-full max-w-md lg:max-w-none rounded-3xl lg:rounded-none lg:rounded-l-3xl shadow-2xl transform lg:translate-x-10 border-4 border-white/10"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Top Categories</h3>
            <div className="w-16 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesData.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 hover:shadow-xl transition-all group overflow-hidden border border-slate-100"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <category.icon size={28} />
                </div>
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-700">{category.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Best Sellers</h3>
            <p className="text-slate-500 mt-2 font-medium">Quality products for your everyday needs</p>
          </div>
          <a href="#" className="hidden md:flex text-blue-600 font-bold hover:underline items-center gap-1 text-sm">
            View All <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productsData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all group relative flex flex-col"
            >
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm">
                  {product.discount}% OFF
                </div>
              )}
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100 flex items-center justify-center">
                 <img src={product.img} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{product.brand}</span>
                <h4 className="font-bold text-slate-800 text-base mb-2 line-clamp-2 leading-snug">{product.name}</h4>
                <div className="flex items-center gap-1 mb-4">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-600">{product.rating}</span>
                </div>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-lg font-black text-slate-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-2">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors active:scale-90"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-6">
                <Truck size={36} className="text-blue-400" />
              </div>
              <h4 className="text-xl font-bold mb-3">Fast Delivery</h4>
              <p className="text-slate-400 text-sm">Same day electrical supplies delivery within city limits.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border-y md:border-y-0 md:border-x border-slate-800">
              <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={36} className="text-teal-400" />
              </div>
              <h4 className="text-xl font-bold mb-3">Certified Products</h4>
              <p className="text-slate-400 text-sm">All products pass strict ISI and ISO safety standards.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
                <PhoneCall size={36} className="text-indigo-400" />
              </div>
              <h4 className="text-xl font-bold mb-3">Expert Support</h4>
              <p className="text-slate-400 text-sm">24/7 technical assistance from certified electricians.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Zap size={18} fill="currentColor" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">VoltMart</h2>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Your trusted digital electric shop for premium cables, smart switches, and reliable appliances.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors font-bold">FB</button>
                <button className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors font-bold">X</button>
                <button className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors font-bold">IG</button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Shop Products</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Track Order</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Customer Service</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Return Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
              <p className="text-slate-500 text-sm mb-4">Subscribe for special offers, updates and electrical tips.</p>
              <div className="flex bg-slate-50 rounded-full p-1 border border-slate-200">
                <input type="email" placeholder="Email address" className="bg-transparent border-none outline-none w-full px-4 text-sm text-slate-700" />
                <button className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-bold hover:bg-blue-700 transition-colors whitespace-nowrap">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">© 2026 VoltMart Electric Shop. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="text-slate-400 text-xl">💳</span>
              <span className="text-slate-400 text-xl">💵</span>
              <span className="text-slate-400 text-xl">🏦</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElectricShop;
