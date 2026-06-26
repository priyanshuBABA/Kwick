import React, { useState, useRef, useEffect } from 'react';
import MobileFrame from '../components/MobileFrame';
import BottomNav from '../components/BottomNav';
import { Home, ShoppingBag, List, User, Zap, ArrowRight, Plus, Minus, CheckCircle2 } from 'lucide-react';

/**
 * MediScript — Healthcare at your fingertips
 * A premium prescription upload and medicine ordering application.
 */

// Injection of DM Sans and keyframes
if (typeof document !== 'undefined') {
  const styleInjection = document.createElement('style');
  styleInjection.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
    
    .mediscript-container {
      font-family: 'DM Sans', sans-serif;
      background-color: #f8fafc;
      min-height: 100vh;
      color: #1e293b;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fadeIn {
      animation: fadeIn 0.4s ease-out forwards;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .animate-spin-fast {
      animation: spin 0.6s linear infinite;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(styleInjection);
}

const MEDICINES = [
  { id: 1, name: 'Paracetamol 500mg', brand: 'Calpol', price: 32, qty: 'Strip of 15', category: 'Painkiller', img: '💊', inStock: true },
  { id: 2, name: 'Amoxicillin 250mg', brand: 'Mox', price: 85, qty: 'Strip of 10', category: 'Antibiotic', img: '💊', inStock: true },
  { id: 3, name: 'Azithromycin 500mg', brand: 'Azee', price: 120, qty: 'Strip of 3', category: 'Antibiotic', img: '💊', inStock: true },
  { id: 4, name: 'Cetirizine 10mg', brand: 'Zyrtec', price: 28, qty: 'Strip of 10', category: 'Antiallergic', img: '💊', inStock: true },
  { id: 5, name: 'Omeprazole 20mg', brand: 'Omez', price: 55, qty: 'Strip of 15', category: 'Antacid', img: '💊', inStock: true },
  { id: 6, name: 'Metformin 500mg', brand: 'Glycomet', price: 45, qty: 'Strip of 15', category: 'Diabetes', img: '💊', inStock: true },
  { id: 7, name: 'Atorvastatin 10mg', brand: 'Lipitor', price: 98, qty: 'Strip of 10', category: 'Cholesterol', img: '💊', inStock: true },
  { id: 8, name: 'Vitamin D3 1000IU', brand: 'Calcirol', price: 210, qty: 'Bottle of 60', category: 'Supplement', img: '🧴', inStock: true },
];

const Medicines = () => {
  const [step, setStep] = useState(0);           // 0: Upload, 1: Review, 2: Checkout
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [cart, setCart] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const fileRef = useRef();

  const cartItems = MEDICINES.filter(m => cart[m.id]);
  const subtotal = cartItems.reduce((acc, m) => acc + (m.price * cart[m.id]), 0);

  const handleFile = (f) => {
    if (f) {
      setFile(f);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(f);
    }
  };

  const analyzePrescription = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setStep(1);
    }, 2500);
  };

  const toggleCart = (id) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id]) delete newCart[id];
      else newCart[id] = 1;
      return newCart;
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const newVal = current + delta;
      const newCart = { ...prev };
      if (newVal <= 0) delete newCart[id];
      else newCart[id] = newVal;
      return newCart;
    });
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Cart', path: '/customer/cart' },
    { icon: List, label: 'Orders', path: '/customer/orders' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  if (orderPlaced) {
    return (
      <MobileFrame>
        <div className="mediscript-container flex flex-col items-center justify-center p-8 text-center bg-teal-50 h-full">
            <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-white text-5xl mb-6 shadow-xl shadow-teal-200 animate-bounce">
                <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-black text-teal-800 mb-2">Order Placed!</h2>
            <p className="text-teal-600 font-semibold mb-8">Dawaiyan 2-4 ghante mein aapke ghar pahunch jayengi.</p>
            
            <div className="bg-white border-2 border-teal-100 rounded-3xl p-6 w-full shadow-sm mb-10 text-left">
                <p className="text-[10px] uppercase font-black text-teal-400 tracking-widest mb-4">Receipt Summary</p>
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center mb-3">
                        <span className="font-bold text-slate-700">{item.name} <span className="text-teal-500">x{cart[item.id]}</span></span>
                        <span className="font-black text-slate-900">₹{item.price * cart[item.id]}</span>
                    </div>
                ))}
                <div className="h-px bg-teal-50 my-4"></div>
                <div className="flex justify-between items-center text-lg">
                    <span className="font-black text-slate-400">Total Paid</span>
                    <span className="font-black text-teal-600">₹{subtotal}</span>
                </div>
            </div>

            <button 
                className="w-full bg-teal-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-teal-200 active:scale-95 transition-transform"
                onClick={() => { setOrderPlaced(false); setStep(0); setCart({}); setFile(null); setPreview(null); }}
            >
                Order Again
            </button>
        </div>
        <BottomNav items={navItems} />
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="mediscript-container relative pb-24 overflow-y-auto hide-scrollbar">
        {/* Premium Header */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-teal-200">💊</div>
                <div>
                    <h1 className="text-xl font-black text-teal-800 tracking-tighter">MediScript</h1>
                    <p className="text-[10px] uppercase font-black text-teal-400 tracking-widest">Pharmacy</p>
                </div>
            </div>
            {Object.keys(cart).length > 0 && step === 1 && (
                <button 
                    onClick={() => setStep(2)}
                    className="bg-teal-600 text-white px-5 py-2.5 rounded-full font-black text-xs shadow-lg shadow-teal-200 flex items-center gap-2"
                >
                    Checkout <Zap size={14} />
                </button>
            )}
        </div>

        {/* Step Progress */}
        <div className="px-8 py-8 flex items-center justify-between relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-0.5 bg-slate-100 -z-10"></div>
            {[0, 1, 2].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-500 ${step >= s ? 'bg-teal-600 text-white shadow-lg shadow-teal-200 ring-4 ring-teal-50' : 'bg-white text-slate-300 border-2 border-slate-100'}`}>
                        {step > s ? '✓' : s + 1}
                    </div>
                </div>
            ))}
        </div>

        <main className="px-6 animate-fadeIn">
          {/* STEP 0: UPLOAD */}
          {step === 0 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-slate-800">Prescription Upload</h2>
                <p className="text-slate-400 font-semibold px-4">Upload karein, hum sahi dawaiyan dhundh lenge.</p>
              </div>

              <div 
                onClick={() => fileRef.current.click()}
                className={`relative group h-64 border-4 border-dashed rounded-[3rem] transition-all flex flex-col items-center justify-center bg-white ${file ? 'border-teal-500 bg-teal-50/30' : 'border-slate-100 hover:border-teal-400'}`}
              >
                <input type="file" ref={fileRef} className="hidden" onChange={(e) => handleFile(e.target.files[0])} accept="image/*" />
                
                {!file ? (
                    <>
                        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">📋</div>
                        <p className="font-black text-slate-400">Click to Upload</p>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">JPG, PNG or PDF</p>
                    </>
                ) : (
                    <div className="text-center p-4">
                        {preview ? (
                            <img src={preview} className="max-h-40 rounded-2xl shadow-xl mb-4" alt="Prescription" />
                        ) : (
                            <div className="text-5xl mb-2">📄</div>
                        )}
                        <p className="text-xs font-black text-teal-600 truncate max-w-[200px]">{file.name}</p>
                        <button className="mt-4 text-[10px] font-black text-red-500 uppercase tracking-widest" onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}>Remove</button>
                    </div>
                )}
              </div>

              {file && !analyzing && (
                <button 
                    onClick={analyzePrescription}
                    className="w-full bg-teal-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-teal-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                    Analyze Prescription <ArrowRight size={20} />
                </button>
              )}

              {analyzing && (
                <div className="bg-white border-2 border-teal-500 p-8 rounded-[2rem] text-center shadow-xl shadow-teal-100 flex flex-col items-center gap-4">
                   <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin-fast"></div>
                   <p className="font-black text-teal-700 tracking-tight">Prescription analysis in progress...</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mt-12 bg-teal-50/50 p-6 rounded-[2rem]">
                <div className="text-center">
                    <div className="text-2xl mb-1">🔒</div>
                    <p className="text-[8px] font-black uppercase text-teal-700">100% Secure</p>
                </div>
                <div className="text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <p className="text-[8px] font-black uppercase text-teal-700">Express Delivery</p>
                </div>
                <div className="text-center">
                    <div className="text-2xl mb-1">✅</div>
                    <p className="text-[8px] font-black uppercase text-teal-700">Verified</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: REVIEW */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800">Medicines Found 💊</h2>
                    <p className="text-slate-400 font-bold text-xs">Based on your prescription</p>
                  </div>
                  <div className="text-teal-600 font-black text-sm bg-teal-50 px-3 py-1 rounded-full">{MEDICINES.length} Items</div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {MEDICINES.map((med) => {
                  const inCart = !!cart[med.id];
                  return (
                    <div key={med.id} className={`group bg-white p-5 rounded-3xl border-2 transition-all flex justify-between items-center ${inCart ? 'border-teal-500 shadow-lg shadow-teal-50' : 'border-slate-50'}`}>
                      <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">{med.img}</div>
                          <div>
                              <h3 className="font-black text-slate-800 text-sm leading-tight mb-1">{med.name}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{med.brand}</span>
                                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest">{med.qty}</span>
                              </div>
                          </div>
                      </div>
                      
                      <div className="text-right">
                          <p className="font-black text-slate-900 mb-2">₹{med.price}</p>
                          {!inCart ? (
                              <button 
                                onClick={() => toggleCart(med.id)}
                                className="bg-teal-50 text-teal-600 font-black px-4 py-2 rounded-full text-xs border border-teal-100 hover:bg-teal-600 hover:text-white transition-all shadow-sm"
                              >
                                + Add
                              </button>
                          ) : (
                              <div className="bg-teal-600 rounded-full p-1 flex items-center gap-3 text-white shadow-lg shadow-teal-200">
                                  <button onClick={() => updateQty(med.id, -1)} className="w-6 h-6 flex items-center justify-center"><Minus size={14} /></button>
                                  <span className="font-black text-sm">{cart[med.id]}</span>
                                  <button onClick={() => updateQty(med.id, 1)} className="w-6 h-6 flex items-center justify-center"><Plus size={14} /></button>
                              </div>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: CHECKOUT */}
          {step === 2 && (
            <div className="space-y-6">
                 <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-8 shadow-sm">
                    <h2 className="text-2xl font-black text-teal-800 mb-6">Final Order</h2>
                    
                    <div className="space-y-4 mb-8">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm font-bold">
                                <span className="text-slate-500">{item.name} <span className="text-teal-500">x{cart[item.id]}</span></span>
                                <span className="text-slate-800">₹{item.price * cart[item.id]}</span>
                            </div>
                        ))}
                        <div className="h-px bg-slate-50"></div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-black text-slate-400">Total</span>
                            <span className="font-black text-teal-600">₹{subtotal}</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Delivery Address</label>
                             <textarea 
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold outline-none focus:border-teal-500 transition-colors placeholder:text-slate-300" 
                                placeholder="Ghar ka address yahan likhein... (Enter toggle order)"
                                rows="3"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey && address && phone.length === 10) {
                                        e.preventDefault();
                                        setOrderPlaced(true);
                                    }
                                }}
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Phone Number</label>
                             <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">+91</span>
                                <input 
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 pl-14 text-sm font-black outline-none focus:border-teal-500 transition-colors" 
                                    placeholder="8888 888 888"
                                    maxLength="10"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && address && phone.length === 10) {
                                            setOrderPlaced(true);
                                        }
                                    }}
                                />
                             </div>
                        </div>
                    </div>

                    <div className="mt-10 space-y-4">
                        <button 
                            disabled={!address || phone.length !== 10}
                            onClick={() => setOrderPlaced(true)}
                            className="w-full bg-teal-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-teal-200 flex items-center justify-center gap-3 disabled:opacity-30 disabled:shadow-none transition-all active:scale-95"
                        >
                            Place Order Now <Zap size={20} />
                        </button>
                        <button 
                            onClick={() => setStep(1)}
                            className="w-full text-slate-400 font-black text-xs uppercase tracking-widest py-2"
                        >
                            Edit Medicines
                        </button>
                    </div>
                 </div>
            </div>
          )}
        </main>
      </div>
      <BottomNav items={navItems} />
    </MobileFrame>
  );
}

export default Medicines;
