import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ShoppingCart, User, Menu, Mic, Heart, X, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';
import { useCart } from '../CartContext';
import LocationPicker from './LocationPicker';
import { useAuth } from '../context/AuthContext';
import { offers } from '../data/mockData';
import { normalizeService, searchProducts, searchServices } from '../services/catalogApi';

const SEARCH_SERVICES = [
  { title: 'Doctor Appointment', icon: '⚕️', category: 'Health', path: '/customer/doctor', desc: 'Book doctor appointments & consultations' },
  { title: 'Ambulance Support', icon: '🚑', category: 'Quick Help', path: '/customer/ambulance', desc: '24/7 Emergency ambulance service' },
  { title: 'Medicines & Wellness', icon: '💊', category: 'Health', path: '/customer/medicines', desc: 'Order medicines & health products' },
  { title: 'Fresh Mandi (Veggies & Fruits)', icon: '🥬', category: 'Shopping', path: '/customer/fresh-mandi', desc: 'Fresh organic vegetables & daily fruits' },
  { title: 'Mishra Ji Cakes & Bakery', icon: '🎂', category: 'Shopping', path: '/customer/mishra-ji-cakes', desc: 'Cakes, pastries, sweets & bakery treats' },
  { title: 'Stationery & Gifts', icon: '🎁', category: 'Shopping', path: '/customer/stationery-gift', desc: 'Books, notebooks, office & gift items' },
  { title: 'Kwick Laundry', icon: '👔', category: 'Home Services', path: '/customer/laundry', desc: 'Doorstep wash, iron & dry cleaning' },
  { title: 'Electric Shop', icon: '⚡', category: 'Home', path: '/customer/electric-shop', desc: 'Electronics, bulbs, wires & gadgets' },
  { title: 'Home Repair & Electrician', icon: '🔧', category: 'Home Services', path: '/customer/home-services', desc: 'Plumbing, electrical & appliance repair' },
  { title: 'RideGo Taxi & Bike', icon: '🚖', category: 'Transport', path: '/ride-booking', desc: 'Instant bike taxi & car cab booking' },
  { title: 'Pick & Drop Courier', icon: '📦', category: 'Delivery', path: '/customer/pick-drop', desc: 'Send parcels & local delivery' },
  { title: 'Household Essentials', icon: '🛍️', category: 'Shopping', path: '/customer/household-items', desc: 'Detergents, soaps & cleaning supplies' },
  { title: 'KwickBook Store', icon: '📚', category: 'Learning', path: '/customer/kwickbook', desc: 'Buy, rent or sell secondhand books' },
  { title: 'Kwick Print Hub', icon: '🖨️', category: 'Delivery', path: '/customer/kwick-print', desc: 'Document printing & Xerox delivery' },
  { title: 'Pandi Ji Chai & Snacks', icon: '☕', category: 'Food', path: '/customer/pandi-ji-chai', desc: 'Hot tea, coffee & fresh snacks' },
];

const SEARCH_OFFERS = [
  { title: 'KWICK50 — 50% OFF', icon: '🏷️', category: 'Offer', path: '/customer/offers', desc: 'Use code KWICK50 on first order' },
  { title: 'Morning Mandi Deals @ ₹9', icon: '🥕', category: 'Offer', path: '/customer/offers', desc: '8 AM - 11 AM Super Veggie Savings' },
  { title: '20% Wallet Cashback', icon: '💰', category: 'Offer', path: '/customer/offers', desc: 'Up to ₹80 cashback in Kwick Wallet' },
  ...(offers || []).map(o => ({ title: `${o.code} — ${o.title}`, icon: '🎁', category: 'Offer', path: '/customer/offers', desc: o.description }))
];

const SERVICE_ROUTES = {
  'Home Services': '/customer/home-services',
  Doctor: '/customer/doctor',
  Ambulance: '/customer/ambulance',
  'Pick & Drop': '/customer/pick-drop',
  Laundry: '/customer/laundry',
};

const CustomerTopNav = ({ onMenuClick, searchQuery, onSearchQueryChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formattedAddress } = useLocationContext();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuth();

  const [internalQuery, setInternalQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [catalogServices, setCatalogServices] = useState([]);
  const [catalogSearchError, setCatalogSearchError] = useState('');
  const searchRef = useRef(null);

  const query = searchQuery !== undefined ? searchQuery : internalQuery;
  const setQuery = (val) => {
    if (onSearchQueryChange) onSearchQueryChange(val);
    setInternalQuery(val);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return 'U';
    const parts = nameOrEmail.split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const navItems = [
    { label: 'Home', path: '/customer/home' },
    { label: 'Categories', path: '/customer/services' },
    { label: 'Orders', path: '/customer/orders' },
    { label: 'Offer', path: '/customer/offers' },
    { label: 'Wallet', path: '/customer/wallet' },
  ];

  const isActive = (path) => location.pathname === path;

  const trimmedQuery = query.trim().toLowerCase();

  useEffect(() => {
    let cancelled = false;
    if (!trimmedQuery) {
      setCatalogProducts([]);
      setCatalogServices([]);
      setCatalogSearchError('');
      return undefined;
    }

    Promise.all([
      searchProducts(trimmedQuery, { limit: 10 }),
      searchServices(trimmedQuery, { limit: 10 }),
    ])
      .then(([productResponse, serviceResponse]) => {
        if (cancelled) return;
        setCatalogProducts(productResponse.data);
        setCatalogServices(serviceResponse.data.map(normalizeService));
        setCatalogSearchError('');
      })
      .catch((error) => {
        if (cancelled) return;
        setCatalogProducts([]);
        setCatalogServices([]);
        setCatalogSearchError(error.message || 'Unable to search the catalog.');
      });

    return () => {
      cancelled = true;
    };
  }, [trimmedQuery]);

  const staticMatchingServices = trimmedQuery
    ? SEARCH_SERVICES.filter(s => `${s.title} ${s.category} ${s.desc}`.toLowerCase().includes(trimmedQuery))
    : [];
  const matchingServices = [
    ...staticMatchingServices,
    ...catalogServices.map((service) => ({
      title: service.name,
      icon: service.emoji,
      category: service.category,
      path: SERVICE_ROUTES[service.category] || '/customer/services',
      desc: service.description || service.providerName || service.category,
    })),
  ];
  const matchingProducts = catalogProducts.map((product) => ({
    title: product.name,
    icon: product.emoji,
    category: product.category,
    path: product.category === 'Medicines' ? '/customer/medicines' : product.category === 'Fresh Mandi' ? '/customer/fresh-mandi' : '/customer/household-items',
    price: `₹${product.price}`,
  }));
  const matchingOffers = trimmedQuery
    ? SEARCH_OFFERS.filter(o => `${o.title} ${o.category} ${o.desc || ''}`.toLowerCase().includes(trimmedQuery))
    : [];

  const totalMatches = matchingServices.length + matchingProducts.length + matchingOffers.length;

  const handleSelectResult = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      if (matchingServices.length > 0) {
        navigate(matchingServices[0].path);
      } else {
        navigate(`/customer/services?search=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100/80 bg-gradient-to-r from-orange-50 via-white to-orange-50/80 shadow-[0_10px_30px_rgba(249,115,22,0.08)] backdrop-blur-xl transition-all duration-200">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-3 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="rounded-xl p-2 text-slate-700 transition-colors hover:bg-orange-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div
              onClick={() => navigate('/customer/home')}
              className="flex cursor-pointer select-none items-center gap-2 whitespace-nowrap text-2xl font-extrabold text-orange-500"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-lg text-white shadow-lg shadow-orange-500/25">K</span>
              <span className="tracking-tight">Kwick</span>
            </div>
            <button
              onClick={() => setIsLocationOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm transition-colors hover:bg-orange-50 sm:flex"
            >
              <span className="text-orange-500">📍</span>
              <span className="max-w-[150px] truncate font-semibold">{formattedAddress || 'Use current location'}</span>
              <span className="text-slate-400">▾</span>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden lg:block relative flex-1 max-w-[530px] ml-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 bg-slate-100/80 border border-slate-200/80 focus-within:border-orange-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10 rounded-full px-4 py-2.5 transition-all shadow-inner">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Search products, shops, services..."
                className="bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 flex-1 font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); setIsOpen(false); }}
                  className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Live Search Overlay Dropdown */}
            {isOpen && trimmedQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden z-[100] max-h-[75vh] overflow-y-auto animate-fadeIn">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Search Results ({totalMatches})</span>
                  <span className="text-orange-500 lowercase font-medium">Press Enter for all</span>
                </div>

                {catalogSearchError ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    <p className="font-bold text-slate-700">Unable to search the catalog</p>
                    <p className="text-xs text-slate-400 mt-1">{catalogSearchError}</p>
                  </div>
                ) : totalMatches === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    <p className="font-bold text-slate-700">No matching services or items found for &quot;{query}&quot;</p>
                    <p className="text-xs text-slate-400 mt-1">Try searching &quot;Doctor&quot;, &quot;Medicines&quot;, &quot;Mandi&quot;, or &quot;Cake&quot;</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {/* Services Section */}
                    {matchingServices.length > 0 && (
                      <div className="p-2">
                        <div className="px-3 py-1 text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Services & Hubs
                        </div>
                        {matchingServices.map((service, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectResult(service.path)}
                            className="flex items-center gap-3 p-3 hover:bg-orange-50/70 rounded-xl cursor-pointer transition-colors group"
                          >
                            <span className="text-2xl p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                              {service.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                                {service.title}
                              </h4>
                              <p className="text-xs text-slate-500 truncate">{service.desc}</p>
                            </div>
                            <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md shrink-0">
                              {service.category}
                            </span>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Products Section */}
                    {matchingProducts.length > 0 && (
                      <div className="p-2">
                        <div className="px-3 py-1 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                          Products & Grocery
                        </div>
                        {matchingProducts.map((product, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectResult(product.path)}
                            className="flex items-center justify-between p-3 hover:bg-orange-50/70 rounded-xl cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl p-1.5 bg-white rounded-lg shadow-sm border border-slate-100">
                                {product.icon}
                              </span>
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm group-hover:text-orange-600">
                                  {product.title}
                                </h4>
                                <span className="text-xs text-slate-400">{product.category}</span>
                              </div>
                            </div>
                            <span className="font-extrabold text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                              {product.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Offers Section */}
                    {matchingOffers.length > 0 && (
                      <div className="p-2">
                        <div className="px-3 py-1 text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-green-500" /> Offers & Coupons
                        </div>
                        {matchingOffers.map((offer, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectResult(offer.path)}
                            className="flex items-center gap-3 p-3 hover:bg-green-50/70 rounded-xl cursor-pointer transition-colors group"
                          >
                            <span className="text-xl p-2 bg-green-100 text-green-700 rounded-xl">
                              {offer.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 text-sm group-hover:text-green-700">
                                {offer.title}
                              </h4>
                              <p className="text-xs text-slate-500 truncate">{offer.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <nav className="hidden items-center gap-7 xl:flex">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${isActive(item.path) ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'text-slate-600 hover:bg-white hover:text-orange-500'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <button className="hidden rounded-xl p-2 text-orange-500 transition-colors hover:bg-orange-100 md:block" title="Voice Search" aria-label="Voice Search">
              <Mic className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/customer/notifications')}
              className={`relative rounded-xl p-2 transition-colors ${isActive('/customer/notifications') ? 'bg-orange-50 text-orange-500' : 'text-slate-700 hover:bg-white'}`}
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <button
              onClick={() => navigate('/customer/cart')}
              className="relative rounded-xl p-2 text-slate-700 transition-colors hover:bg-white"
              title="Cart"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/customer/wishlist')}
              className={`relative rounded-xl p-2 transition-colors ${isActive('/customer/wishlist') ? 'bg-orange-50 text-orange-500' : 'text-slate-700 hover:bg-white'}`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" fill={isActive('/customer/wishlist') ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => navigate('/customer/profile')}
              className="h-9 w-9 overflow-hidden rounded-2xl border-2 border-white bg-gradient-to-br from-orange-500 to-orange-600 font-bold text-white shadow-md transition-shadow hover:shadow-lg lg:h-10 lg:w-10"
            >
              {user?.photo || user?.avatar || user?.picture ? (
                <img src={user.photo || user.avatar || user.picture} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="inline-block h-full w-full text-center text-sm leading-8 lg:leading-9">
                  {getInitials(user?.name || user?.email)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-2.5 relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-2 focus-within:border-orange-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search products, shops, services..."
              className="bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 flex-1 font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setIsOpen(false); }}
                className="p-0.5 hover:bg-slate-200 rounded-full text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Mobile Live Search Dropdown */}
          {isOpen && trimmedQuery.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-[100] max-h-[60vh] overflow-y-auto">
              {totalMatches === 0 ? (
                <div className="p-4 text-center text-slate-500 text-xs">
                  No matching services or items found for &quot;{query}&quot;
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {matchingServices.map((service, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectResult(service.path)}
                      className="flex items-center gap-3 p-3 hover:bg-orange-50 transition-colors"
                    >
                      <span className="text-xl">{service.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs">{service.title}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                  {matchingProducts.map((product, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectResult(product.path)}
                      className="flex items-center justify-between p-3 hover:bg-orange-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{product.icon}</span>
                        <h4 className="font-bold text-slate-900 text-xs">{product.title}</h4>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{product.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <LocationPicker isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
    </header>
  );
};

export default CustomerTopNav;

