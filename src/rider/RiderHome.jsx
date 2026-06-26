import React, { useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import BottomNav from '../components/BottomNav';
import './RiderPortal.css';
import { 
  Home, 
  IndianRupee, 
  List, 
  User, 
  Bell, 
  Phone, 
  MapPin, 
  Package, 
  UserCircle, 
  Bike as BikeIcon, 
  CreditCard,
  ArrowRight,
  Upload,
  ChevronRight,
  Clock,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAppContext } from '../AppContext';

const RiderHome = () => {
  const [view, setView] = useState('auth'); // 'auth' or 'dashboard'
  const [step, setStep] = useState(1);
  const [isOnline, setIsOnline] = useState(false);
  const [walletBalance, setWalletBalance] = useState(450);
  const { rideRequests, orderRequests, acceptTask, rejectTask, riderAcceptedTask } = useAppContext();

  // Onboarding Form State
  const [riderData, setRiderData] = useState({
    fullName: '',
    aadhar: '',
    address: 'Munger Area',
    emergencyContact: '',
    vehicleType: 'Bike',
    dlNumber: '',
    vehiclePlate: '',
    upiId: '',
    bankAccount: '',
    ifsc: '',
    shift: 'Full-time',
    os: 'Android'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRiderData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  
  const finishOnboarding = () => {
    setView('dashboard');
    setIsOnline(true);
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/rider/home' },
    { icon: IndianRupee, label: 'Earnings', path: '/rider/earnings' },
    { icon: List, label: 'Orders', path: '/rider/orders' },
    { icon: User, label: 'Profile', path: '/rider/profile' }
  ];

  // -------------------- AUTH / ONBOARDING VIEW --------------------
  if (view === 'auth') {
    return (
      <MobileFrame className="rider-app-container">
        <div className="p-8 pt-12">
            <div className="flex justify-between items-center mb-10">
                <div className="w-12 h-12 bg-rider-orange rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <span className="text-white text-3xl font-black">M</span>
                </div>
                <div className="text-right">
                    <h1 className="text-3xl font-black text-white italic tracking-tighter">Kwick<span className="text-rider-orange">.</span></h1>
                    <p className="text-[10px] text-rider-muted uppercase font-bold tracking-widest">Rider Program</p>
                </div>
            </div>

            <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>

            <div className="rider-form-section">
                {step === 1 && (
                    <div className="animate-slideIn">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-rider-card rounded-xl text-rider-orange"><UserCircle /></div>
                            <h2 className="text-xl font-bold text-white">Personal Identity</h2>
                        </div>
                        <div className="rider-input-group">
                            <label>Full Name</label>
                            <input name="fullName" value={riderData.fullName} onChange={handleInputChange} className="rider-input" placeholder="Aman Kumar" />
                        </div>
                        <div className="rider-input-group">
                            <label>Aadhar Card Number</label>
                            <input name="aadhar" value={riderData.aadhar} onChange={handleInputChange} className="rider-input" placeholder="XXXX-XXXX-XXXX" />
                        </div>
                        <div className="rider-input-group">
                            <label>Aadhar Photo</label>
                            <div className="rider-upload-btn">
                                <Upload className="mx-auto text-rider-orange mb-2" />
                                <span className="text-[10px] uppercase font-black text-rider-muted">Upload Photo</span>
                            </div>
                        </div>
                        <div className="rider-input-group">
                            <label>Emergency Contact</label>
                            <input name="emergencyContact" value={riderData.emergencyContact} onChange={handleInputChange} className="rider-input" placeholder="Parent/Spouse Name & No." />
                        </div>
                        <div className="rider-input-group">
                            <label>Shift Preference</label>
                            <select name="shift" value={riderData.shift} onChange={handleInputChange} className="rider-input rider-select">
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Weekend only</option>
                            </select>
                        </div>
                        <button className="rider-primary-btn flex items-center justify-center gap-2" onClick={nextStep}>
                            Continue <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-slideIn">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-rider-card rounded-xl text-rider-orange"><BikeIcon /></div>
                            <h2 className="text-xl font-bold text-white">Vehicle Details</h2>
                        </div>
                        <div className="rider-input-group">
                            <label>Vehicle Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Bicycle', 'Bike', 'Scooty'].map(type => (
                                    <div 
                                        key={type}
                                        onClick={() => setRiderData(p => ({...p, vehicleType: type}))}
                                        className={`p-4 rounded-xl text-center cursor-pointer border-2 transition-all ${riderData.vehicleType === type ? 'bg-rider-orange border-rider-orange text-white' : 'bg-rider-card border-transparent text-rider-muted'}`}
                                    >
                                        <div className="mb-1 text-xs font-black">{type}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rider-input-group">
                            <label>Driving License (DL)</label>
                            <input name="dlNumber" value={riderData.dlNumber} onChange={handleInputChange} className="rider-input" placeholder="BR-08..." />
                        </div>
                        <div className="rider-input-group">
                            <label>Vehicle Number Plate</label>
                            <input name="vehiclePlate" value={riderData.vehiclePlate} onChange={handleInputChange} className="rider-input" placeholder="BR 08 XXXXX" />
                        </div>
                        <div className="rider-input-group">
                            <label>RC (Registration Certificate)</label>
                            <div className="rider-upload-btn">
                                <Upload className="mx-auto text-rider-orange mb-2" />
                                <span className="text-[10px] uppercase font-black text-rider-muted">Upload RC Copy</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 bg-rider-card text-rider-muted py-4 rounded-xl font-bold" onClick={prevStep}>Back</button>
                            <button className="flex-2 rider-primary-btn" onClick={nextStep}>Continue</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-slideIn">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-rider-card rounded-xl text-rider-orange"><CreditCard /></div>
                            <h2 className="text-xl font-bold text-white">Financial Details</h2>
                        </div>
                        <div className="rider-input-group">
                            <label>UPI ID (GPay / PhonePe)</label>
                            <input name="upiId" value={riderData.upiId} onChange={handleInputChange} className="rider-input" placeholder="8888@ybl" />
                        </div>
                        <div className="rider-input-group">
                            <label>Bank Account & IFSC (Backup)</label>
                            <div className="flex flex-col gap-2">
                                <input name="bankAccount" value={riderData.bankAccount} onChange={handleInputChange} className="rider-input" placeholder="Account No." />
                                <input name="ifsc" value={riderData.ifsc} onChange={handleInputChange} className="rider-input" placeholder="IFSC" />
                            </div>
                        </div>
                        <div className="rider-input-group">
                            <label>Personal Live Selfie</label>
                            <div className="rider-upload-btn">
                                <Smartphone className="mx-auto text-rider-orange mb-2" />
                                <span className="text-[10px] uppercase font-black text-rider-muted">Take Profile Selfie</span>
                            </div>
                        </div>
                        <div className="bg-rider-card p-4 rounded-xl border-l-4 border-rider-orange text-xs text-rider-muted leading-relaxed mb-6">
                            By finishing, you agree to become a Kwick delivery partner and follow all safety protocols in Munger.
                        </div>
                        <button className="rider-primary-btn shadow-orange-500/40" onClick={finishOnboarding}>
                            Finish Onboarding & Start
                        </button>
                    </div>
                )}
            </div>
        </div>
      </MobileFrame>
    );
  }

  // -------------------- DASHBOARD VIEW --------------------
  return (
    <MobileFrame className="rider-dashboard-dark">
      <div className="p-6 pt-12 pb-8 bg-rider-dark/50 border-b border-white/5">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-rider-orange rounded-2xl flex items-center justify-center text-white border-2 border-orange-500/20 shadow-lg shadow-orange-500/20">
                    <User size={28} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white">{riderData.fullName || 'Aman Kumar'}</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-rider-orange uppercase tracking-widest">{riderData.shift}</span>
                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                        <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-bold uppercase tracking-widest">
                            < IndianRupee size={10} /> {walletBalance} Earned
                        </div>
                    </div>
                </div>
            </div>
            {/* Online Toggle */}
            <div 
                onClick={() => setIsOnline(!isOnline)}
                className={`w-16 h-9 rounded-full p-1 cursor-pointer transition-all flex items-center ${isOnline ? 'bg-green-500' : 'bg-rider-card border border-white/10'}`}
            >
                <div className={`w-7 h-7 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${isOnline ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </div>
         </div>
      </div>

      <div className="px-6 py-6 pb-32">
        {!isOnline ? (
            <div className="bg-rider-card p-10 rounded-[3rem] border border-white/5 text-center mt-10">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">🛰️</div>
                <h3 className="text-2xl font-black text-white mb-2">You are Offline</h3>
                <p className="text-rider-muted font-semibold text-sm max-w-[200px] mx-auto leading-relaxed">Go online to see live orders from Munger & Jamalpur.</p>
                <button 
                  onClick={() => setIsOnline(true)}
                  className="mt-8 bg-rider-orange text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  GO ONLINE
                </button>
            </div>
        ) : (
            <div className="space-y-6">
                {/* Active Ride/Order */}
                {riderAcceptedTask && (
                    <div className="bg-rider-card p-6 rounded-[2.5rem] border-2 border-rider-orange/30 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rider-orange/5 rounded-bl-[80px]"></div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="bg-rider-orange/10 text-rider-orange text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ring-1 ring-rider-orange/30 animate-pulse">
                                Task in Progress
                            </span>
                            <span className="text-white/20 font-black text-xs">#{riderAcceptedTask.id}</span>
                        </div>
                        
                        <div className="mb-6 flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-3xl">👨🏻‍💼</div>
                            <div>
                                <p className="text-[10px] font-black text-rider-muted uppercase tracking-widest">Customer</p>
                                <h4 className="text-xl font-black text-white">{riderAcceptedTask.customer}</h4>
                            </div>
                        </div>

                        <div className="p-4 bg-black/20 rounded-2xl border border-white/5 space-y-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-rider-orange rounded-full"></div>
                                <p className="text-xs font-bold text-white/80 truncate">Pick: {riderAcceptedTask.pickup}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <p className="text-xs font-bold text-white/80 truncate">Drop: {riderAcceptedTask.drop}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-[3] bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-2">
                                <MapPin size={18} /> OPEN MAPS
                            </button>
                            <button className="flex-1 bg-green-500 text-white rounded-xl flex items-center justify-center">
                                <CheckCircle2 size={24} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Incoming Requests */}
                {!riderAcceptedTask && [...rideRequests, ...orderRequests].length > 0 ? (
                    [...rideRequests, ...orderRequests].map(req => (
                        <div key={req.id} className="bg-rider-card p-6 rounded-[2.5rem] border border-white/5 shadow-xl animate-slideIn">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`w-2 h-2 rounded-full ${req.type === 'ride' ? 'bg-blue-400' : 'bg-rider-orange'} animate-ping`}></div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-wider">New {req.type} Request</h3>
                                    </div>
                                    <p className="text-[10px] font-bold text-rider-muted uppercase">{req.subType || 'Delivery'} • {req.timestamp}</p>
                                </div>
                                <div className="text-xl font-black text-green-500">₹{req.fare || req.total}</div>
                            </div>
                            
                            <div className="space-y-3 mb-6 relative py-2">
                                <div className="absolute left-1.5 top-5 bottom-5 w-0.5 bg-white/10"></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 bg-white/20 rounded-full relative z-10"></div>
                                    <p className="text-xs font-bold text-white/60 truncate">{req.pickup}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 bg-rider-orange rounded-full relative z-10"></div>
                                    <p className="text-xs font-bold text-white/60 truncate">{req.drop}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 border border-white/10 hover:bg-red-500/10 hover:border-red-500 transition-all font-black text-xs text-rider-muted hover:text-red-500 py-3 rounded-xl uppercase tracking-widest" onClick={() => rejectTask(req.id, req.type)}>Reject</button>
                                <button className="flex-[2] bg-rider-orange text-white font-black py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-orange-500/20" onClick={() => acceptTask(req)}>Accept Now</button>
                            </div>
                        </div>
                    ))
                ) : !riderAcceptedTask && (
                    <div className="text-center py-20 opacity-30">
                        <div className="text-6xl mb-4">📡</div>
                        <p className="font-black text-white uppercase tracking-[0.2em] text-xs">Scanning for orders...</p>
                    </div>
                )}
            </div>
        )}
      </div>

      <BottomNav items={navItems} highlightColor="#FF5E00" />
    </MobileFrame>
  );
};

export default RiderHome;
