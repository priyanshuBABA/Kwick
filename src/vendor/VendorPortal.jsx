import React, { useState } from 'react';
import './VendorPortal.css';
import { 
  ShoppingBag, 
  Utensils, 
  Package, 
  Stethoscope,
  Lightbulb,
  Coffee,
  Cake,
  PenTool,
  ArrowRight,
  MapPin,
  Upload,
  ShieldCheck,
  Zap,
  Phone,
  Store as StoreIcon,
  Search,
  ArrowLeft,
  Ambulance,
  Wrench,
  Bike,
  Heart
} from 'lucide-react';
import { useAppContext } from '../AppContext';

const VendorPortal = () => {
  const [view, setView] = useState('selection'); // 'selection', 'auth', 'dashboard'
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [activeStep, setActiveStep] = useState(1);
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [activeOrderTab, setActiveOrderTab] = useState('New');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { vendorOrders, acceptAsVendor } = useAppContext();
  
  // Registration State
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    businessType: '',
    storeImage: null,
    mobile: '',
    whatsapp: '',
    address: '',
    gpsLocation: '',
    fssai: '',
    gst: '',
    bankAccount: '',
    ifsc: '',
    upiId: ''
  });

  const categories = [
    { id: 'doctor', label: 'Doctor', icon: '🩺', lucide: Stethoscope, info: 'Consultation' },
    { id: 'medicine', label: 'Medicine Store', icon: '💊', lucide: Heart, info: 'Health Care' },
    { id: 'ambulance', label: 'Ambulance', icon: '🚑', lucide: Ambulance, info: 'Emergency' },
    { id: 'mandi', label: 'Fresh Mandi', icon: '🥬', lucide: Utensils, info: 'Fruits & Veg' },
    { id: 'pick-drop', label: 'Pick & Drop', icon: '🛵', lucide: Bike, info: 'Logistics' },
    { id: 'bakery', label: 'Mishra Ji Cake', icon: '🎂', lucide: Cake, info: 'Cakes & Bakes' },
    { id: 'general', label: 'Household', icon: '🛍️', lucide: ShoppingBag, info: 'Daily Needs' },
    { id: 'stationary', label: 'Stationary Shop', icon: '📝', lucide: PenTool, info: 'Books & Pens' },
    { id: 'electric', label: 'Electric Shop', icon: '⚡', lucide: Lightbulb, info: 'Home Gear' },
    { id: 'chai', label: 'Pandit Ji Chai', icon: '☕', lucide: Coffee, info: 'Tea & Snacks' },
    { id: 'home-services', label: 'Home Services', icon: '🛠️', lucide: Wrench, info: 'Maintenance' },
  ];

  const businessTypes = ['Doctor', 'Medicine Store', 'Ambulance', 'Fresh Mandi', 'Pick & Drop', 'Bakery', 'General Store', 'Stationary', 'Electric', 'Cafe/Chai', 'Home Services'];

  const combinedVendorOrders = [
    ...vendorOrders,
    { id: 'S101', customer: 'Aryan Singh', location: 'Gandhi Nagar', items: [{ name: 'Aloo', qty: '2kg', emoji: '🥔' }], type: 'mandi', status: 'New', time: '2m ago' },
    { id: 'S102', customer: 'Priya Verma', location: 'Qasim Bazaar', items: [{ name: 'Kulhad Chai', qty: '2', emoji: '☕' }], type: 'chai', status: 'New', time: '5m ago', prep: '5 min' },
  ];

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setFormData(prev => ({...prev, businessType: cat.label}));
    setView('auth');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    setView('dashboard');
  };

  // 1. SELECTION VIEW
  if (view === 'selection') {
    return (
      <div className="vendor-portal-container selection-screen">
          <div className="selection-hero relative overflow-hidden bg-navy text-white p-10 text-center pb-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 animate-slideDown">
                  <h1 className="text-4xl font-black mb-4 tracking-tighter">
                      Kwick<span className="text-orange">.</span> Partner
                  </h1>
                  <p className="text-slate-400 font-bold max-w-sm mx-auto tracking-widest text-xs uppercase mb-8">Sabko Munger-Jamalpur Mein Sell Krne Do!</p>
                  
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-md mx-auto border border-white/20 shadow-2xl">
                    <Search className="text-orange w-5 h-5" />
                    <input type="text" className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-slate-400 font-bold" placeholder="Apni Dukan Ki Category Search Krein..." />
                  </div>
              </div>
          </div>

          <div className="selection-grid-container px-6 -mt-10 relative z-20 pb-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                  {categories.map((cat) => (
                      <div 
                        key={cat.id} 
                        className="selection-card group bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-105 active:scale-95 hover:border-orange-500/50"
                        onClick={() => handleCategorySelect(cat)}
                      >
                          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-4 group-hover:bg-orange-50 transition-colors shadow-inner">
                              {cat.icon}
                          </div>
                          <h3 className="font-black text-navy text-lg group-hover:text-orange-600 mb-1">{cat.label}</h3>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{cat.info}</p>
                      </div>
                  ))}
                  <div className="selection-card bg-orange-600 p-6 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center text-center text-white cursor-pointer hover:bg-orange-700">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4 border-2 border-white/50 backdrop-blur-sm">➕</div>
                      <h3 className="font-black text-lg mb-1">Add New</h3>
                      <p className="text-[10px] uppercase font-bold text-orange-200 tracking-widest">Other Business</p>
                  </div>
              </div>
          </div>
      </div>
    );
  }

  // 2. AUTH VIEW
  if (view === 'auth') {
    return (
      <div className="vendor-portal-container">
        <div className="auth-wrapper animate-slideUp">
          <button className="back-btn flex items-center gap-2 text-slate-400 font-bold mb-6 hover:text-orange transition-colors" onClick={() => setView('selection')}>
              <ArrowLeft className="w-4 h-4" /> Sab Category Dekhein
          </button>

          <div className="auth-header">
            <div className="w-16 h-16 bg-orange-50 text-4xl flex items-center justify-center rounded-2xl mx-auto mb-4 border border-orange-100">
                {selectedCategory?.icon || '🏪'}
            </div>
            <h1 className="flex items-center justify-center gap-2">
                {selectedCategory?.label || 'Vendor'} <span className="text-navy text-sm font-medium border-l-2 border-slate-200 pl-2">Portal</span>
            </h1>
            <p className="text-text-muted text-sm font-medium">Log in to manage your {selectedCategory?.label} store</p>
          </div>

          <div className="toggle-container">
            <button className={`toggle-btn ${authMode === 'login' ? 'active' : ''}`} onClick={() => setAuthMode('login')}>Login</button>
            <button className={`toggle-btn ${authMode === 'register' ? 'active' : ''}`} onClick={() => setAuthMode('register')}>New Registration</button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={() => setView('dashboard')}>
              <div className="input-block mb-4">
                <label>Mobile or Email</label>
                <input type="text" placeholder="Enter your ID" required />
              </div>
              <div className="input-block mb-4">
                <label>Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button type="submit" className="submit-btn flex items-center justify-center gap-2">
                Log In to Portal <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleOnboardingSubmit} className="onboarding-form">
              {/* ONBOARDING FORM SECTIONS (REUSED FROM PREVIOUS STEP) */}
              <div className={`onboarding-section ${activeStep === 1 ? 'active' : ''}`} onClick={() => setActiveStep(1)}>
                <div className="section-head"><div className="section-num">1</div><h3>Basic Business Details (Pechaan)</h3></div>
                <div className="onboarding-grid">
                  <div className="input-block"><label>Store Name</label><input name="storeName" value={formData.storeName} onChange={handleInputChange} placeholder="e.g. Pandit Ji Chai" required /></div>
                  <div className="input-block"><label>Owner Name</label><input name="ownerName" value={formData.ownerName} onChange={handleInputChange} placeholder="Owner Name" required /></div>
                  <div className="input-block input-full">
                    <label>Business Category</label>
                    <div className="bg-orange-50 border border-orange-100 text-orange-700 font-bold p-3 rounded-xl flex items-center gap-2">
                        <span>{selectedCategory?.icon}</span> {selectedCategory?.label} (Selected)
                    </div>
                  </div>
                  <div className="input-block input-full file-upload-mock">
                    <Upload className="w-8 h-8 text-slate-300 mb-2" /><span className="text-xs font-bold text-slate-400">Upload Store Photo</span>
                  </div>
                </div>
              </div>

              {/* ... (Other sections 2, 3, 4 simplified for brevity or reused) */}
              <div className={`onboarding-section ${activeStep === 2 ? 'active' : ''}`} onClick={() => setActiveStep(2)}>
                  <div className="section-head"><div className="section-num">2</div><h3>Contact & Location</h3></div>
                  <div className="onboarding-grid">
                      <div className="input-block"><label>Mobile</label><input name="mobile" required /></div>
                      <div className="input-block"><label>WhatsApp</label><input name="whatsapp" /></div>
                      <button type="button" className="location-btn input-full" onClick={() => setFormData(p => ({...p, gpsLocation: 'Marked (25.3° N, 86.4° E)'}))}>
                        <MapPin className="w-4 h-4" /> {formData.gpsLocation || 'Set Store Location'}
                    </button>
                  </div>
              </div>

              <button type="submit" className="submit-btn !bg-orange-600 hover:!bg-orange-700 py-4">
                COMPLETE REGISTRATION
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // 3. DASHBOARD VIEW
  const filteredOrders = combinedVendorOrders.filter(o => o.status === activeOrderTab);

  return (
    <div className="vendor-portal-container">
      <nav className="dashboard-nav shadow-lg">
        <div className="welcome-info flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">
               {selectedCategory?.icon || '🏪'}
            </div>
          <div>
            <h2 className="text-orange-500 font-black tracking-tighter text-xl italic">Kwick<span className="text-white">.</span></h2>
            <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Dashboard</p>
          </div>
        </div>

        <div className="store-status-toggle">
          <span className={`status-label ${isStoreOpen ? 'text-green-400' : 'text-red-400'}`}>
            {isStoreOpen ? 'Online' : 'Offline'}
          </span>
          <label className="toggle-switch">
            <input type="checkbox" checked={isStoreOpen} onChange={() => setIsStoreOpen(!isStoreOpen)} />
            <span className="slider"></span>
          </label>
        </div>
      </nav>

      <div className="dashboard-content">
          <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-navy capitalize">Welcome, <span className="text-orange-600">{formData.storeName || selectedCategory?.label}</span></h1>
                <p className="text-sm font-semibold text-slate-400">Munger Area • Partner Portal</p>
              </div>
              <button 
                className="p-3 bg-white border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                onClick={() => setView('selection')}
              >
                  <ArrowLeft className="w-5 h-5 text-slate-400" />
              </button>
          </div>

        <div className="order-tabs">
          {['New', 'Preparing', 'Out for Delivery'].map(tab => (
            <button key={tab} className={`order-tab ${activeOrderTab === tab ? 'active' : ''}`} onClick={() => setActiveOrderTab(tab)}>
              {tab} ({combinedVendorOrders.filter(o => o.status === tab).length})
            </button>
          ))}
        </div>

        <div className="order-grid">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card p-6">
                <div className="order-header mb-4">
                  <div className="customer-info">
                    <h4 className="font-black text-lg">{order.customer}</h4>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest"><MapPin className="w-3 h-3 text-orange" /> {order.location}</p>
                  </div>
                  <div className="order-time bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-black">{order.time}</div>
                </div>
                <div className="order-items border-y-2 border-slate-50 py-4 my-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="item-row flex justify-between font-bold">
                      <span className="text-navy">{item.name}</span>
                      <span className="text-orange">x{item.quantity || item.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="order-actions flex gap-3">
                  <button className="flex-1 bg-slate-100 text-slate-500 font-black py-3 rounded-xl text-sm">Reject</button>
                  <button className="flex-[2] bg-navy text-white font-black py-3 rounded-xl text-sm shadow-lg shadow-navy/20" onClick={() => acceptAsVendor(order.id)}>
                    {order.isAcceptedByVendor ? '✓ Accepted' : 'Accept Order'}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VendorPortal;
