import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap, MapPin, Clock, Phone, MessageCircle, ChevronRight, ChevronLeft, Star,
  ShieldAlert, TrendingUp, Navigation2, CheckCircle2, XCircle,
  Calendar, FileText, LogOut, Sun, Moon, Award, ArrowUpRight,
  Home as HomeIcon, Wallet, Package, User, Filter, X, Bike,
  BadgeCheck, Sparkles, Upload, Loader2, Smartphone, Car, Search,
  CreditCard, LifeBuoy, MessageSquare, ScrollText, UserCog
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getOffersByDomain } from '../utils/offersService';

/* ------------------------------------------------------------------ */
/*  Design tokens — LIGHT THEME                                        */
/* ------------------------------------------------------------------ */
const C = {
  bg: '#F7F5F0',
  surface: '#FFFFFF',
  surface2: '#FBF9F5',
  surface3: '#F1EEE6',
  border: 'rgba(24,27,35,0.09)',
  gold: '#F5A623',
  gold2: '#E08E14',
  goldSoft: 'rgba(245,166,35,0.12)',
  text: '#1C1E27',
  textMid: '#5B6172',
  textDim: '#9297A6',
  green: '#1FAE6E',
  green2: 'rgba(31,174,110,0.12)',
  red: '#E1435A',
  red2: 'rgba(225,67,90,0.10)',
  blue: '#2F7BE0',
};

const SERVICES = [
  { id: 'doctor', name: 'Doctor', icon: '🩺', cat: 'Health' },
  { id: 'ambulance', name: 'Ambulance', icon: '🚑', cat: 'Quick Help' },
  { id: 'medicines', name: 'Medicines', icon: '💊', cat: 'Health' },
  { id: 'gift', name: 'Stationery & Gift', icon: '🎁', cat: 'Shopping' },
  { id: 'kwickbook', name: 'KwickBook', icon: '📚', cat: 'Learning' },
  { id: 'kwickprint', name: 'Kwick Print', icon: '🖨️', cat: 'Delivery' },
  { id: 'pickdrop', name: 'Pick & Drop', icon: '📦', cat: 'Delivery' },
  { id: 'mandi', name: 'Fresh Mandi', icon: '🥬', cat: 'Shopping' },
  { id: 'cakes', name: 'Mishra Ji Cakes', icon: '🎂', cat: 'Shopping' },
  { id: 'household', name: 'Household', icon: '🧺', cat: 'Home' },
  { id: 'stationary', name: 'Stationary', icon: '📓', cat: 'Learning' },
  { id: 'chai', name: 'Pandi Ji Chai', icon: '☕', cat: 'Shopping' },
  { id: 'electric', name: 'Electric Shop', icon: '🔌', cat: 'Home' },
  { id: 'homeservices', name: 'Home Services', icon: '🛠️', cat: 'Home' },
  { id: 'laundry', name: 'Laundry', icon: '👕', cat: 'Home' },
];

const AREAS = [
  'Arera Colony', 'MP Nagar Zone 2', 'New Market', 'Kolar Road',
  'Bittan Market', 'Habibganj', 'Shahpura', 'Bawadiya Kalan',
  'Hoshangabad Road', 'TT Nagar', '10 No. Market', 'Chunabhatti',
];

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[rand(0, arr.length - 1)];

function genOrder() {
  const service = pick(SERVICES);
  let pickup = pick(AREAS);
  let drop = pick(AREAS);
  while (drop === pickup) drop = pick(AREAS);
  const distance = (rand(15, 82) / 10).toFixed(1);
  const payout = rand(35, 135);
  const otp = String(rand(1000, 9999));
  return { id: 'KW' + rand(100000, 999999), service, pickup, drop, distance, payout, otp, step: 'requested' };
}

function useDeviceLocation() {
  const [state, setState] = useState({ status: 'idle', label: '' });

  const detect = () => {
    if (!navigator.geolocation) {
      setState({ status: 'denied', label: 'Location unavailable' });
      return;
    }
    setState({ status: 'loading', label: 'Detecting…' });
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();
          const city = data.city || data.locality || data.principalSubdivision || 'Your area';
          const region = data.principalSubdivision || '';
          setState({ status: 'granted', label: region ? `${city}, ${region}` : city });
        } catch {
          setState({ status: 'granted', label: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` });
        }
      },
      () => setState({ status: 'denied', label: 'Location off' }),
      { timeout: 8000 }
    );
  };

  useEffect(() => { detect(); }, []);
  return { ...state, detect };
}

function Card({ children, style, className = '' }) {
  return (
    <div className={`rounded-[1.5rem] ${className}`} style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: '0 1px 2px rgba(24,27,35,0.04)', ...style }}>
      {children}
    </div>
  );
}

function Badge({ children, tone = 'gold' }) {
  const map = {
    gold: { bg: C.goldSoft, color: C.gold2 },
    green: { bg: C.green2, color: C.green },
    red: { bg: C.red2, color: C.red },
    dim: { bg: C.surface3, color: C.textMid },
  };
  const s = map[tone];
  return <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: s.bg, color: s.color }}>{children}</span>;
}

function Button({ children, onClick, variant = 'primary', className = '', disabled, type = 'button' }) {
  const base = 'px-4 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] flex items-center justify-center gap-2';
  const styles = {
    primary: { background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: '#241A05' },
    ghost: { background: C.surface3, color: C.text, border: `1px solid ${C.border}` },
    danger: { background: C.red2, color: C.red },
    success: { background: C.green2, color: C.green },
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${className}`} style={{ ...styles[variant], opacity: disabled ? 0.5 : 1 }}>
      {children}
    </button>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <p className="text-xs tracking-widest font-semibold mb-1.5" style={{ color: C.textMid }}>{label}</p>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl outline-none text-sm"
        style={{ background: C.surface3, border: `1px solid ${C.border}`, color: C.text }}
      />
    </div>
  );
}

function UploadBox({ label, filename, onPick }) {
  const ref = useRef(null);
  return (
    <div>
      <p className="text-xs tracking-widest font-semibold mb-1.5" style={{ color: C.textMid }}>{label}</p>
      <button
        type="button"
        onClick={() => ref.current.click()}
        className="w-full flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold"
        style={{ background: C.surface3, border: `1.5px dashed ${C.border}`, color: filename ? C.green : C.text }}
      >
        {filename ? <CheckCircle2 size={16} /> : <Upload size={16} />}
        {filename ? filename : `Upload ${label.toLowerCase()}`}
      </button>
      <input ref={ref} type="file" className="hidden" onChange={(e) => onPick(e.target.files?.[0]?.name || 'file.jpg')} />
    </div>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 h-1.5 rounded-full" style={{ background: i < step ? `linear-gradient(90deg, ${C.gold}, ${C.gold2})` : C.surface3 }} />
      ))}
    </div>
  );
}

function TopBar({ badge }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})` }}>
          <Zap size={20} color="#241A05" fill="#241A05" />
        </div>
        <p className="font-extrabold text-xl" style={{ color: C.text }}>KwickRider<span style={{ color: C.gold }}>.</span></p>
      </div>
      {badge}
    </div>
  );
}

function SubPage({ title, onBack, children }) {
  return (
    <div className="px-4 pt-5 pb-28 space-y-4 w-full">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.surface3 }}>
          <ChevronLeft size={17} color={C.text} />
        </button>
        <h1 className="text-xl font-extrabold" style={{ color: C.text }}>{title}</h1>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${C.border}` }}>
      <span className="text-sm" style={{ color: C.textMid }}>{label}</span>
      <span className="text-sm font-semibold text-right" style={{ color: C.text }}>{value || '—'}</span>
    </div>
  );
}

function AuthScreen({ onAuthed }) {
  const [mode, setMode] = useState('login');
  const [stage, setStage] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (completed) return null;

  const sendOtp = () => {
    if (phone.replace(/\D/g, '').length < 10) { setError('Enter a valid 10-digit number'); return; }
    setError('');
    setSending(true);
    setTimeout(() => { setSending(false); setStage('otp'); }, 900);
  };

  const verify = () => {
    if (otp.length < 4) { setError('Enter the 4-digit OTP'); return; }
    setError('');
    setCompleted(true);
    onAuthed(mode === 'signup');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: C.bg }}>
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})` }}>
            <Zap size={22} color="#241A05" fill="#241A05" />
          </div>
          <p className="font-extrabold text-2xl" style={{ color: C.text }}>KwickRider<span style={{ color: C.gold }}>.</span></p>
        </div>

        <Card style={{ padding: 28 }}>
          <div className="flex rounded-xl p-1 mb-6" style={{ background: C.surface3 }}>
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setStage('phone'); setError(''); }}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{ background: mode === m ? C.surface : 'transparent', color: mode === m ? C.text : C.textDim, boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}
              >
                {m === 'login' ? 'Log In' : 'New Partner'}
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ color: C.text }}>
            {mode === 'login' ? 'Welcome back' : 'Join as a rider'}
          </h1>
          <p className="text-sm mb-6" style={{ color: C.textMid }}>
            {stage === 'phone' ? "We'll send you a one-time code to verify." : `Enter the code sent to +91 ${phone}`}
          </p>

          {stage === 'phone' ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs tracking-widest font-semibold mb-1.5" style={{ color: C.textMid }}>PHONE NUMBER</p>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: C.surface3, border: `1px solid ${C.border}` }}>
                  <Smartphone size={16} color={C.textDim} />
                  <span className="text-sm font-medium" style={{ color: C.textMid }}>+91</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98765 43210"
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: C.text }}
                  />
                </div>
              </div>
              {error && <p className="text-xs" style={{ color: C.red }}>{error}</p>}
              <Button variant="primary" className="w-full" onClick={sendOtp} disabled={sending}>
                {sending ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : 'Send OTP'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(''); }}
                placeholder="• • • •"
                className="w-full px-4 py-3.5 rounded-xl text-center tracking-[0.6em] font-bold text-xl outline-none"
                style={{ background: C.surface3, border: `1px solid ${C.border}`, color: C.text }}
              />
              <p className="text-xs text-center" style={{ color: C.textDim }}>Demo mode — enter any 4 digits</p>
              {error && <p className="text-xs" style={{ color: C.red }}>{error}</p>}
              <Button variant="primary" className="w-full" onClick={verify}>
                {mode === 'login' ? 'Log In' : 'Verify & Continue'}
              </Button>
              <button onClick={() => setStage('phone')} className="w-full text-xs font-medium py-1" style={{ color: C.textMid }}>
                Change phone number
              </button>
            </div>
          )}
        </Card>
        <p className="text-center text-xs mt-6" style={{ color: C.textDim }}>By continuing you agree to KwickRider's Terms & Privacy Policy</p>
      </div>
    </div>
  );
}

function Onboarding({ onDone }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    fullName: '', emergencyContact: '', aadhaar: '', aadhaarPhoto: '',
    shift: 'Full-time', vehicleType: 'Bike', dlNumber: '', plateNumber: '', rcPhoto: '',
    upi: '', bankAccount: '', ifsc: '', selfie: '',
  });
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const vehicleOptions = [
    { id: 'Cycle', icon: '🚲' }, { id: 'Bike', icon: '🏍️' }, { id: 'Scooty', icon: '🛵' },
  ];

  return (
    <div className="min-h-screen w-full p-4 sm:p-8" style={{ background: C.bg }}>
      <div className="w-full">
        <TopBar badge={<Badge tone="gold">Onboarding</Badge>} />
        <ProgressBar step={step} total={3} />
        <p className="text-xs tracking-widest font-semibold mt-4 mb-1" style={{ color: C.gold2 }}>
          STEP {step} OF 3 · {step === 1 ? 'PERSONAL IDENTITY' : step === 2 ? 'VEHICLE DETAILS' : 'FINANCIAL DETAILS'}
        </p>

        {step === 1 && (
          <div>
            <h1 className="text-3xl font-bold mt-2" style={{ color: C.text }}>Who are you?</h1>
            <p className="text-sm mb-6" style={{ color: C.textMid }}>We verify every rider for everyone's safety.</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="FULL NAME" placeholder="e.g. Ramesh Kumar" value={data.fullName} onChange={(e) => set('fullName', e.target.value)} />
              <Field label="AADHAAR NUMBER" placeholder="12-digit Aadhaar number" value={data.aadhaar} onChange={(e) => set('aadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))} />
              <Field label="EMERGENCY CONTACT" placeholder="Phone number" value={data.emergencyContact} onChange={(e) => set('emergencyContact', e.target.value.replace(/\D/g, '').slice(0, 10))} />
              <UploadBox label="Aadhaar Photo" filename={data.aadhaarPhoto} onPick={(f) => set('aadhaarPhoto', f)} />
            </div>
            <div className="mt-5">
              <p className="text-xs tracking-widest font-semibold mb-2" style={{ color: C.textMid }}>SHIFT PREFERENCE</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {['Full-time', 'Part-time'].map((s) => (
                  <button key={s} onClick={() => set('shift', s)} className="py-4 rounded-xl font-bold text-sm"
                    style={{ background: data.shift === s ? C.goldSoft : C.surface3, border: `1.5px solid ${data.shift === s ? C.gold : C.border}`, color: data.shift === s ? C.gold2 : C.text }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button variant="primary" onClick={next}>Continue</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-3xl font-bold mt-2" style={{ color: C.text }}>Your ride</h1>
            <p className="text-sm mb-6" style={{ color: C.textMid }}>Tell us what you'll be delivering on.</p>
            <p className="text-xs tracking-widest font-semibold mb-2" style={{ color: C.textMid }}>VEHICLE TYPE</p>
            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              {vehicleOptions.map((v) => (
                <button key={v.id} onClick={() => set('vehicleType', v.id)} className="py-6 rounded-xl font-bold text-sm flex flex-col items-center gap-2"
                  style={{ background: data.vehicleType === v.id ? C.goldSoft : C.surface3, border: `1.5px solid ${data.vehicleType === v.id ? C.gold : C.border}`, color: data.vehicleType === v.id ? C.gold2 : C.text }}>
                  <span className="text-2xl">{v.icon}</span> {v.id}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="DRIVING LICENSE NUMBER" placeholder="DL number" value={data.dlNumber} onChange={(e) => set('dlNumber', e.target.value)} />
              <Field label="VEHICLE PLATE NUMBER" placeholder="e.g. MP04AB1234" value={data.plateNumber} onChange={(e) => set('plateNumber', e.target.value.toUpperCase())} />
            </div>
            <div className="mt-5">
              <UploadBox label="RC Copy (or insurance copy)" filename={data.rcPhoto} onPick={(f) => set('rcPhoto', f)} />
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={prev}><ChevronLeft size={16} /> Previous</Button>
              <Button variant="primary" onClick={next}>Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-3xl font-bold mt-2" style={{ color: C.text }}>Get paid</h1>
            <p className="text-sm mb-6" style={{ color: C.textMid }}>Where should your earnings land?</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="UPI ID" placeholder="name@upi" value={data.upi} onChange={(e) => set('upi', e.target.value)} />
              <Field label="BANK ACCOUNT NUMBER" placeholder="Account number" value={data.bankAccount} onChange={(e) => set('bankAccount', e.target.value.replace(/\D/g, ''))} />
              <Field label="IFSC CODE" placeholder="IFSC code" value={data.ifsc} onChange={(e) => set('ifsc', e.target.value.toUpperCase())} />
              <UploadBox label="Profile Selfie" filename={data.selfie} onPick={(f) => set('selfie', f)} />
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={prev}><ChevronLeft size={16} /> Previous</Button>
              <Button variant="primary" onClick={() => onDone(data)}>Finish Onboarding &amp; Start</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VerifyingScreen() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6" style={{ background: C.bg }}>
      <Card style={{ padding: 32 }} className="max-w-sm w-full text-center">
        <Loader2 size={34} className="animate-spin mx-auto mb-4" color={C.gold} />
        <p className="font-bold text-lg" style={{ color: C.text }}>Documents under review</p>
        <p className="text-sm mt-2" style={{ color: C.textMid }}>Approval usually takes up to 24 hours. For this demo, you're in!</p>
      </Card>
    </div>
  );
}

function OrderRequestPopup({ order, onAccept, onReject }) {
  const [secs, setSecs] = useState(30);
  useEffect(() => {
    if (secs <= 0) { onReject(); return; }
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);
  const pct = (secs / 30) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3" style={{ background: 'rgba(28,30,39,0.45)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full sm:max-w-sm rounded-3xl overflow-hidden" style={{ background: C.surface, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div className="h-1.5 w-full" style={{ background: C.surface3 }}>
          <div className="h-full transition-all" style={{ width: `${pct}%`, background: pct > 33 ? C.green : C.red }} />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl leading-none">{order.service.icon}</span>
              <div>
                <p className="font-bold text-base" style={{ color: C.text }}>{order.service.name}</p>
                <p className="text-xs" style={{ color: C.textDim }}>{order.service.cat} · #{order.id}</p>
              </div>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: C.surface3, color: pct > 33 ? C.green : C.red }}>{secs}</div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center pt-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: C.gold }} />
                <div className="w-px flex-1 my-1" style={{ background: C.border, minHeight: 20 }} />
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: C.blue }} />
              </div>
              <div className="flex-1 space-y-3">
                <div><p className="text-xs" style={{ color: C.textDim }}>Pickup</p><p className="text-sm font-medium" style={{ color: C.text }}>{order.pickup}</p></div>
                <div><p className="text-xs" style={{ color: C.textDim }}>Drop</p><p className="text-sm font-medium" style={{ color: C.text }}>{order.drop}</p></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-5 rounded-xl p-3" style={{ background: C.surface3 }}>
            <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMid }}><Navigation2 size={14} /> {order.distance} km</div>
            <div className="text-lg font-extrabold" style={{ color: C.gold2 }}>₹{order.payout}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="danger" onClick={onReject}><XCircle size={16} /> Reject</Button>
            <Button variant="primary" onClick={onAccept}><CheckCircle2 size={16} /> Accept</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiderLiveOffersCard() {
  const [offers, setOffers] = useState(() => getOffersByDomain('rider'));

  useEffect(() => {
    const handleUpdate = () => setOffers(getOffersByDomain('rider'));
    window.addEventListener('kwick_offers_updated', handleUpdate);
    return () => window.removeEventListener('kwick_offers_updated', handleUpdate);
  }, []);

  if (offers.length === 0) return null;

  return (
    <Card style={{ padding: 16, background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', borderColor: '#FDE68A' }}>
      <div className="flex items-center justify-between mb-2">
        <p className="font-extrabold text-sm flex items-center gap-1.5" style={{ color: '#92400E' }}>
          🎁 Live Rider Promos & Demand Surge Boosts
        </p>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#78350F', color: '#FFF' }}>
          ADMIN LIVE
        </span>
      </div>
      <div className="space-y-2 mt-2">
        {offers.map(o => (
          <div key={o.id} className="p-2.5 rounded-xl border bg-white flex items-center justify-between shadow-sm" style={{ borderColor: '#FEF3C7' }}>
            <div>
              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded" style={{ background: '#FEF3C7', color: '#B45309' }}>
                {o.code}
              </span>
              <p className="font-bold text-xs mt-1" style={{ color: '#1E293B' }}>{o.title}</p>
              <p className="text-[11px]" style={{ color: '#64748B' }}>{o.description}</p>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-xs block" style={{ color: '#D97706' }}>{o.discount}</span>
              <span className="text-[10px]" style={{ color: '#94A3B8' }}>Exp: {o.expiry}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Home({ online, setOnline, stats, setPendingOrder, activeOrder, goToOrders, rider, loc }) {
  const spawnTimer = useRef(null);
  useEffect(() => {
    if (online && !activeOrder) spawnTimer.current = setTimeout(() => setPendingOrder(genOrder()), 2600);
    return () => clearTimeout(spawnTimer.current);
  }, [online, activeOrder]);

  const initials = (rider.fullName || 'Rider').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="px-4 pt-5 pb-28 space-y-5 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})` }}>
            <Zap size={20} color="#241A05" fill="#241A05" />
          </div>
          <div>
            <p className="font-extrabold text-lg leading-tight" style={{ color: C.text }}>KwickRider</p>
            <button onClick={loc.detect} className="flex items-center gap-1 text-xs" style={{ color: C.textDim }}>
              <MapPin size={11} />
              {loc.status === 'loading' ? 'Detecting…' : loc.label || 'Enable location'}
            </button>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: C.goldSoft, color: C.gold2 }}>{initials}</div>
      </div>

      <div>
        <p className="text-xs tracking-widest font-semibold mb-1" style={{ color: C.textDim }}>WELCOME BACK</p>
        <h1 className="text-2xl font-bold leading-snug" style={{ color: C.text }}>
          {online ? 'Orders are coming your way.' : 'Your city is waiting for premium deliveries.'}
        </h1>
        <p className="text-sm mt-1" style={{ color: C.textMid }}>Stay online, pick smart routes, and earn more with every trip.</p>
      </div>

      <Card style={{ padding: 20 }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest font-semibold mb-2" style={{ color: C.textDim }}>DUTY STATUS</p>
            <p className="font-bold text-lg" style={{ color: online ? C.green : C.textMid }}>{online ? "You're online" : "You're offline"}</p>
            <p className="text-xs mt-1" style={{ color: C.textDim }}>{online ? 'Searching for nearby orders…' : 'Go online to start receiving orders'}</p>
          </div>
          <button onClick={() => setOnline((v) => !v)} className="w-14 h-8 rounded-full flex items-center px-1 transition-all" style={{ background: online ? C.green : C.surface3, justifyContent: online ? 'flex-end' : 'flex-start' }}>
            <span className="w-6 h-6 rounded-full block" style={{ background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }} />
          </button>
        </div>
      </Card>

      {online && (
        <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: C.green2 }}>
          <Sparkles size={16} color={C.green} />
          <p className="text-sm font-medium" style={{ color: C.green }}>15 services live near you — stay sharp!</p>
        </div>
      )}

      {/* Live Admin Rider Incentive & Promo Offers */}
      <RiderLiveOffersCard />

      {activeOrder && (
        <Card style={{ padding: 16, borderColor: C.gold }}>
          <div onClick={goToOrders} className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeOrder.service.icon}</span>
              <div><p className="font-semibold text-sm" style={{ color: C.text }}>Ongoing: {activeOrder.service.name}</p><p className="text-xs" style={{ color: C.textDim }}>Tap to continue trip</p></div>
            </div>
            <ChevronRight size={18} color={C.gold} />
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Card style={{ padding: 16 }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: C.surface3 }}><Bike size={16} color={C.gold2} /></div>
          <p className="text-xs" style={{ color: C.textDim }}>Today's rides</p>
          <p className="text-2xl font-extrabold" style={{ color: C.text }}>{stats.todayRides}</p>
          <p className="text-xs font-medium mt-1" style={{ color: C.green }}>+{stats.vsYesterday} vs yesterday</p>
        </Card>
        <Card style={{ padding: 16 }}>
          <div className="mb-3"><Badge tone="green">Great</Badge></div>
          <p className="text-xs" style={{ color: C.textDim }}>Route efficiency</p>
          <p className="text-2xl font-extrabold" style={{ color: C.text }}>{stats.efficiency}%</p>
          <div className="w-full h-1.5 rounded-full mt-2" style={{ background: C.surface3 }}><div className="h-full rounded-full" style={{ width: `${stats.efficiency}%`, background: C.gold }} /></div>
        </Card>
        <Card style={{ padding: 16 }} className="col-span-2">
          <div className="flex items-center justify-between">
            <div><p className="text-xs" style={{ color: C.textDim }}>Lifetime orders</p><p className="text-xl font-extrabold" style={{ color: C.text }}>{stats.lifetimeOrders.toLocaleString('en-IN')}</p></div>
            <div className="w-px h-10" style={{ background: C.border }} />
            <div><p className="text-xs" style={{ color: C.textDim }}>Lifetime earnings</p><p className="text-xl font-extrabold" style={{ color: C.gold2 }}>₹{stats.lifetimeEarnings.toLocaleString('en-IN')}</p></div>
          </div>
        </Card>
        <Card style={{ padding: 16 }} className="col-span-2">
          <div className="flex items-center justify-between mb-2"><p className="text-sm font-semibold" style={{ color: C.text }}>Smart picks</p><MapPin size={16} color={C.gold2} /></div>
          <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: C.surface3 }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.goldSoft }}><MapPin size={16} color={C.gold2} /></div>
            <div className="flex-1"><p className="text-sm font-medium" style={{ color: C.text }}>High demand zone: {loc.label ? loc.label.split(',')[0] : 'Bhopal'}</p><p className="text-xs" style={{ color: C.textDim }}>8 min away · avg payout ₹68</p></div>
            <ArrowUpRight size={16} color={C.textDim} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Earnings() {
  const [range, setRange] = useState('Weekly');
  const [paidOut, setPaidOut] = useState(false);
  const weekData = [{ d: 'Mon', v: 420 }, { d: 'Tue', v: 610 }, { d: 'Wed', v: 380 }, { d: 'Thu', v: 720 }, { d: 'Fri', v: 890 }, { d: 'Sat', v: 1040 }, { d: 'Sun', v: 690 }];
  const max = Math.max(...weekData.map((w) => w.v));
  const breakdown = [
    { label: 'Trip earnings', value: 3210, color: C.gold },
    { label: 'Peak hour bonus', value: 860, color: C.green },
    { label: 'Customer tips', value: 410, color: C.blue },
    { label: 'Referral earnings', value: 250, color: '#9B6BD8' },
  ];
  const totalBreak = breakdown.reduce((a, b) => a + b.value, 0);
  const history = [
    { id: 'TXN48213', date: '27 Jul', amount: 1240, status: 'Success' },
    { id: 'TXN48190', date: '26 Jul', amount: 980, status: 'Success' },
    { id: 'TXN48155', date: '25 Jul', amount: 760, status: 'Processing' },
    { id: 'TXN48102', date: '24 Jul', amount: 1105, status: 'Success' },
  ];

  return (
    <div className="px-4 pt-5 pb-28 space-y-5 w-full">
      <h1 className="text-xl font-extrabold" style={{ color: C.text }}>Earnings</h1>
      <Card style={{ padding: 20, background: `linear-gradient(135deg, ${C.surface}, ${C.goldSoft})` }}>
        <p className="text-xs" style={{ color: C.textDim }}>Available for withdrawal</p>
        <p className="text-3xl font-extrabold mt-1" style={{ color: C.gold2 }}>₹4,730</p>
        <Button variant="primary" className="w-full mt-4" onClick={() => { setPaidOut(true); setTimeout(() => setPaidOut(false), 2200); }}>
          <Wallet size={16} /> {paidOut ? 'Payout Initiated ✓' : 'Instant Payout'}
        </Button>
      </Card>
      <div className="flex gap-2">
        {['Daily', 'Weekly', 'Monthly'].map((r) => (
          <button key={r} onClick={() => setRange(r)} className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: range === r ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})` : C.surface3, color: range === r ? '#241A05' : C.textMid }}>{r}</button>
        ))}
      </div>
      <Card style={{ padding: 20 }}>
        <p className="text-sm font-semibold mb-4" style={{ color: C.text }}>Performance ({range.toLowerCase()})</p>
        <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
          {weekData.map((w) => (
            <div key={w.d} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-md transition-all" style={{ height: `${(w.v / max) * 90}px`, background: `linear-gradient(180deg, ${C.gold}, ${C.gold2})` }} />
              <span className="text-[10px]" style={{ color: C.textDim }}>{w.d}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ padding: 20 }}>
        <p className="text-sm font-semibold mb-4" style={{ color: C.text }}>Payout breakdown</p>
        <div className="space-y-3">
          {breakdown.map((b) => (
            <div key={b.label}>
              <div className="flex items-center justify-between text-sm mb-1"><span style={{ color: C.textMid }}>{b.label}</span><span className="font-semibold" style={{ color: C.text }}>₹{b.value}</span></div>
              <div className="w-full h-1.5 rounded-full" style={{ background: C.surface3 }}><div className="h-full rounded-full" style={{ width: `${(b.value / totalBreak) * 100}%`, background: b.color }} /></div>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ padding: 20 }}>
        <div className="flex items-center justify-between mb-3"><p className="text-sm font-semibold" style={{ color: C.text }}>Payout history</p><Filter size={14} color={C.textDim} /></div>
        <div className="space-y-1">
          {history.map((h) => (
            <div key={h.id} className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${C.border}` }}>
              <div><p className="text-sm font-medium" style={{ color: C.text }}>{h.id}</p><p className="text-xs" style={{ color: C.textDim }}>{h.date}</p></div>
              <div className="text-right"><p className="text-sm font-bold" style={{ color: C.text }}>₹{h.amount}</p><Badge tone={h.status === 'Success' ? 'green' : 'gold'}>{h.status}</Badge></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const STEP_FLOW = ['to_pickup', 'picked_up', 'to_drop', 'delivered'];
const STEP_LABEL = { to_pickup: 'Arrived at Pickup', picked_up: 'Order Picked Up', to_drop: 'Arrived at Drop Location', delivered: 'Mark as Delivered' };

const SEED_ORDERS = [
  { id: 'KW-2296', service: SERVICES[6], pickup: 'Burger Barn', drop: 'Satellite', distance: '2.1', payout: 55, status: 'Active' },
  { id: 'KW-2291', service: SERVICES[7], pickup: 'Spice Villa', drop: 'Bopal', distance: '5.4', payout: 92, status: 'Completed' },
  { id: 'KW-2288', service: SERVICES[6], pickup: 'Burger Barn', drop: 'Thaltej', distance: '1.8', payout: 55, status: 'Completed' },
  { id: 'KW-2284', service: SERVICES[9], pickup: 'Green Bowl', drop: 'Navrangpura', distance: '4.0', payout: 62, status: 'Cancelled' },
];

function OrderListCard({ o, onClick }) {
  const tone = o.status === 'Active' ? 'gold' : o.status === 'Completed' ? 'green' : 'red';
  return (
    <Card style={{ padding: 16 }} className="cursor-pointer active:scale-[0.98] transition-transform" >
      <div onClick={onClick}>
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-sm" style={{ color: C.text }}>{o.id}</p>
          <Badge tone={tone}>{o.status}</Badge>
        </div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <MapPin size={14} color={C.gold2} />
            <span className="text-sm font-medium" style={{ color: C.text }}>{o.pickup}</span>
          </div>
          <ChevronRight size={16} color={C.textDim} />
        </div>
        <div className="flex items-center justify-between text-xs" style={{ color: C.textDim }}>
          <span>{o.distance} km</span>
          <span className="text-sm font-bold" style={{ color: C.gold2 }}>₹{o.payout}</span>
        </div>
      </div>
    </Card>
  );
}

function OrderDetailSub({ o, onBack }) {
  return (
    <SubPage title={`Order ${o.id}`} onBack={onBack}>
      <Card style={{ padding: 16 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><span className="text-xl">{o.service.icon}</span><p className="font-semibold text-sm" style={{ color: C.text }}>{o.service.name}</p></div>
          <Badge tone={o.status === 'Completed' ? 'green' : o.status === 'Cancelled' ? 'red' : 'gold'}>{o.status}</Badge>
        </div>
        <InfoRow label="Pickup" value={o.pickup} />
        <InfoRow label="Drop" value={o.drop} />
        <InfoRow label="Distance" value={`${o.distance} km`} />
        <InfoRow label="Payout" value={`₹${o.payout}`} />
      </Card>
    </SubPage>
  );
}

function Orders({ activeOrder, setActiveOrder, history, setHistory }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [openOrder, setOpenOrder] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState(false);

  const advance = () => {
    const idx = STEP_FLOW.indexOf(activeOrder.step);
    if (idx === -1) { setActiveOrder({ ...activeOrder, step: 'to_pickup' }); return; }
    if (STEP_FLOW[idx] === 'delivered') return;
    setActiveOrder({ ...activeOrder, step: STEP_FLOW[idx + 1] || STEP_FLOW[idx] });
  };

  const completeDelivery = () => {
    if (otpInput !== activeOrder.otp) { setOtpError(true); return; }
    setHistory((h) => [{ ...activeOrder, date: 'Today', fare: activeOrder.payout, tip: rand(0, 20), status: 'Completed' }, ...h]);
    setActiveOrder(null); setOtpInput(''); setOtpError(false);
  };

  const currentIdx = activeOrder ? STEP_FLOW.indexOf(activeOrder.step) : -1;

  const combined = [
    ...(activeOrder ? [{ id: activeOrder.id, service: activeOrder.service, pickup: activeOrder.pickup, drop: activeOrder.drop, distance: activeOrder.distance, payout: activeOrder.payout, status: 'Active', live: true }] : []),
    ...history.map((h) => ({ id: h.id, service: h.service, pickup: h.pickup, drop: h.drop, distance: h.distance, payout: h.fare, status: 'Completed' })),
    ...SEED_ORDERS,
  ];

  const filtered = combined.filter((o) => {
    const matchesFilter = filter === 'All' || o.status === filter;
    const matchesQuery = !query || o.id.toLowerCase().includes(query.toLowerCase()) || o.pickup.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  if (openOrder === '__live__' && activeOrder) {
    return (
      <div className="px-4 pt-5 pb-28 space-y-4 w-full">
        <div className="flex items-center gap-3">
          <button onClick={() => setOpenOrder(null)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.surface3 }}>
            <ChevronLeft size={17} color={C.text} />
          </button>
          <h1 className="text-xl font-extrabold" style={{ color: C.text }}>Live Trip · #{activeOrder.id}</h1>
        </div>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div className="h-36 w-full flex items-center justify-center relative" style={{ background: `repeating-linear-gradient(45deg, ${C.surface3}, ${C.surface3} 10px, ${C.surface2} 10px, ${C.surface2} 20px)` }}>
            <Navigation2 size={28} color={C.gold2} style={{ transform: 'rotate(35deg)' }} />
            <span className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.85)', color: C.textMid }}>Live route preview</span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><span className="text-xl">{activeOrder.service.icon}</span><p className="font-semibold text-sm" style={{ color: C.text }}>{activeOrder.service.name} · #{activeOrder.id}</p></div>
              <span className="font-extrabold" style={{ color: C.gold2 }}>₹{activeOrder.payout}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl p-3 mb-2" style={{ background: C.surface3 }}>
              <div><p className="text-xs" style={{ color: C.textDim }}>Pickup</p><p className="text-sm font-medium" style={{ color: C.text }}>{activeOrder.pickup}</p></div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.surface }}><Phone size={14} color={C.gold2} /></button>
                <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.surface }}><MessageCircle size={14} color={C.gold2} /></button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl p-3" style={{ background: C.surface3 }}>
              <div><p className="text-xs" style={{ color: C.textDim }}>Drop</p><p className="text-sm font-medium" style={{ color: C.text }}>{activeOrder.drop}</p><p className="text-xs mt-0.5" style={{ color: C.textDim }}>"Leave at door, thank you!"</p></div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.surface }}><Phone size={14} color={C.gold2} /></button>
                <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.surface }}><MessageCircle size={14} color={C.gold2} /></button>
              </div>
            </div>
          </div>
        </Card>

        <Card style={{ padding: 16 }}>
          <div className="flex justify-between mb-4">
            {STEP_FLOW.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: i <= currentIdx ? C.gold : C.surface3, color: i <= currentIdx ? '#241A05' : C.textDim }}>
                  {i < currentIdx ? '✓' : i + 1}
                </div>
                {i < STEP_FLOW.length - 1 && <div className="h-0.5 w-full mt-3.5" style={{ background: i < currentIdx ? C.gold : C.border, position: 'relative', top: '-14px' }} />}
              </div>
            ))}
          </div>
          {activeOrder.step !== 'delivered' ? (
            <Button variant="primary" className="w-full" onClick={advance}>{STEP_LABEL[STEP_FLOW[currentIdx + 1] || STEP_FLOW[currentIdx]]}</Button>
          ) : (
            <div className="space-y-3">
              <p className="text-xs" style={{ color: C.textDim }}>Ask customer for their 4-digit delivery OTP</p>
              <input value={otpInput} onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 4)); setOtpError(false); }} placeholder="Enter OTP"
                className="w-full px-4 py-3 rounded-xl text-center tracking-[0.5em] font-bold text-lg outline-none" style={{ background: C.surface3, color: C.text, border: `1px solid ${otpError ? C.red : C.border}` }} />
              {otpError && <p className="text-xs" style={{ color: C.red }}>Incorrect OTP, please check with customer</p>}
              <Button variant="success" className="w-full" onClick={() => { completeDelivery(); setOpenOrder(null); }}><CheckCircle2 size={16} /> Confirm Delivery</Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  if (openOrder && openOrder !== '__live__') {
    return <OrderDetailSub o={openOrder} onBack={() => setOpenOrder(null)} />;
  }

  return (
    <div className="px-4 pt-5 pb-28 space-y-4 w-full">
      <div>
        <p className="text-xs tracking-widest font-semibold" style={{ color: C.gold2 }}>LIVE QUEUE</p>
        <h1 className="text-2xl font-extrabold" style={{ color: C.text }}>Orders</h1>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: C.surface3, border: `1px solid ${C.border}` }}>
        <Search size={16} color={C.textDim} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Order ID"
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: C.text }}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {['All', 'Active', 'Completed', 'Cancelled'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all"
            style={{ background: filter === f ? `linear-gradient(135deg, ${C.gold}, ${C.gold2})` : C.surface3, color: filter === f ? '#241A05' : C.textMid, border: `1px solid ${filter === f ? 'transparent' : C.border}` }}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <Card style={{ padding: 30 }} className="text-center">
            <Package size={32} color={C.textDim} className="mx-auto mb-3" />
            <p className="text-sm font-medium" style={{ color: C.text }}>No orders found</p>
            <p className="text-xs mt-1" style={{ color: C.textDim }}>Try a different search or filter.</p>
          </Card>
        )}
        {filtered.map((o, i) => (
          <OrderListCard key={o.id + i} o={o} onClick={() => setOpenOrder(o.live ? '__live__' : o)} />
        ))}
      </div>
    </div>
  );
}

function PersonalDetailsSub({ rider, onBack }) {
  return (
    <SubPage title="Personal Details" onBack={onBack}>
      <Card style={{ padding: 20 }}>
        <InfoRow label="Full Name" value={rider.fullName} />
        <InfoRow label="Emergency Contact" value={rider.emergencyContact} />
        <InfoRow label="Aadhaar Number" value={rider.aadhaar} />
        <InfoRow label="Shift Preference" value={rider.shift} />
      </Card>
    </SubPage>
  );
}

function VehicleDocumentsSub({ rider, onBack }) {
  const docs = [
    { name: 'Driving License', status: rider.dlNumber ? 'Verified' : 'Pending' },
    { name: 'RC / Insurance', status: rider.rcPhoto ? 'Verified' : 'Pending' },
    { name: 'Aadhaar Card', status: rider.aadhaarPhoto ? 'Verified' : 'Pending' },
    { name: 'Profile Selfie', status: rider.selfie ? 'Verified' : 'Pending' },
  ];
  return (
    <SubPage title="Vehicle Documents" onBack={onBack}>
      <Card style={{ padding: 20 }}>
        <InfoRow label="Vehicle Type" value={rider.vehicleType} />
        <InfoRow label="Plate Number" value={rider.plateNumber} />
        <InfoRow label="Driving License No." value={rider.dlNumber} />
      </Card>
      <Card style={{ padding: 20 }}>
        <p className="text-sm font-semibold mb-3" style={{ color: C.text }}>Document status</p>
        <div className="space-y-2.5">
          {docs.map((d) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2"><FileText size={14} color={C.textDim} /><span className="text-sm" style={{ color: C.textMid }}>{d.name}</span></div>
              <Badge tone={d.status === 'Verified' ? 'green' : 'gold'}>{d.status === 'Verified' ? <span className="flex items-center gap-1"><BadgeCheck size={12} /> Verified</span> : d.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </SubPage>
  );
}

function BankUpiSub({ rider, onBack }) {
  return (
    <SubPage title="Bank & UPI" onBack={onBack}>
      <Card style={{ padding: 20 }}>
        <InfoRow label="UPI ID" value={rider.upi} />
        <InfoRow label="Bank Account Number" value={rider.bankAccount} />
        <InfoRow label="IFSC Code" value={rider.ifsc} />
      </Card>
      <p className="text-xs px-1" style={{ color: C.textDim }}>Payouts are sent to this account. Contact support to update these details.</p>
    </SubPage>
  );
}

function SupportSub({ onBack, onSos }) {
  return (
    <SubPage title="Support" onBack={onBack}>
      <Card style={{ padding: 4 }}>
        <button onClick={onSos} className="w-full flex items-center justify-between px-4 py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
          <span className="text-sm flex items-center gap-2" style={{ color: C.red }}><ShieldAlert size={16} /> SOS Emergency</span><ChevronRight size={14} color={C.textDim} />
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
          <span className="text-sm flex items-center gap-2" style={{ color: C.textMid }}><LifeBuoy size={16} color={C.gold2} /> Help Center / Raise a Ticket</span><ChevronRight size={14} color={C.textDim} />
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3.5">
          <span className="text-sm flex items-center gap-2" style={{ color: C.textMid }}><ScrollText size={16} color={C.gold2} /> Terms & Privacy Policy</span><ChevronRight size={14} color={C.textDim} />
        </button>
      </Card>
    </SubPage>
  );
}

function Profile({ rider, onLogout, loc }) {
  const [sosOpen, setSosOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [subpage, setSubpage] = useState(null);
  const docs = [
    { name: 'Driving License', status: rider.dlNumber ? 'Verified' : 'Pending' },
    { name: 'RC / Insurance', status: rider.rcPhoto ? 'Verified' : 'Pending' },
    { name: 'Aadhaar Card', status: rider.aadhaarPhoto ? 'Verified' : 'Pending' },
    { name: 'Profile Selfie', status: rider.selfie ? 'Verified' : 'Pending' },
  ];
  const initials = (rider.fullName || 'Rider').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  if (subpage === 'personal') return <PersonalDetailsSub rider={rider} onBack={() => setSubpage(null)} />;
  if (subpage === 'vehicle') return <VehicleDocumentsSub rider={rider} onBack={() => setSubpage(null)} />;
  if (subpage === 'bank') return <BankUpiSub rider={rider} onBack={() => setSubpage(null)} />;
  if (subpage === 'support') return <SupportSub onBack={() => setSubpage(null)} onSos={() => setSosOpen(true)} />;

  const navItems = [
    { key: 'personal', label: 'Personal Details', icon: UserCog },
    { key: 'vehicle', label: 'Vehicle Documents', icon: Bike },
    { key: 'bank', label: 'Bank & UPI', icon: CreditCard },
    { key: 'support', label: 'Support', icon: LifeBuoy },
  ];

  return (
    <div className="px-4 pt-5 pb-28 space-y-4 w-full">
      <h1 className="text-xl font-extrabold" style={{ color: C.text }}>Profile</h1>
      <Card style={{ padding: 20 }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-xl" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`, color: '#241A05' }}>{initials}</div>
          <div>
            <p className="font-bold text-lg" style={{ color: C.text }}>{rider.fullName || 'New Rider'}</p>
            <p className="text-xs" style={{ color: C.textDim }}>Rider ID · KWR-88421</p>
            <div className="flex items-center gap-1 mt-1"><Star size={13} fill={C.gold} color={C.gold} /><span className="text-sm font-semibold" style={{ color: C.text }}>4.8</span><span className="text-xs" style={{ color: C.textDim }}>(1,284 deliveries)</span></div>
            <p className="text-xs mt-1 flex items-center gap-1" style={{ color: C.textDim }}><MapPin size={11} /> {loc.label || 'Location off'}</p>
          </div>
        </div>
      </Card>

      <Card style={{ padding: 4 }}>
        {navItems.map((n, i) => {
          const Icon = n.icon;
          return (
            <button key={n.key} onClick={() => setSubpage(n.key)} className="w-full flex items-center justify-between px-4 py-3.5"
              style={{ borderBottom: i < navItems.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <span className="text-sm flex items-center gap-2.5" style={{ color: C.text }}><Icon size={16} color={C.gold2} /> {n.label}</span>
              <ChevronRight size={14} color={C.textDim} />
            </button>
          );
        })}
      </Card>

      <Card style={{ padding: 20 }}>
        <p className="text-sm font-semibold mb-3" style={{ color: C.text }}>My Vehicle</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: C.surface3 }}><Bike size={18} color={C.gold2} /></div>
            <div><p className="text-sm font-medium" style={{ color: C.text }}>{rider.vehicleType || 'Bike'}</p><p className="text-xs" style={{ color: C.textDim }}>{rider.plateNumber || 'Not added yet'}</p></div>
          </div>
          <ChevronRight size={16} color={C.textDim} />
        </div>
      </Card>
      <Card style={{ padding: 20 }}>
        <p className="text-sm font-semibold mb-3" style={{ color: C.text }}>Documents & KYC Vault</p>
        <div className="space-y-2.5">
          {docs.map((d) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2"><FileText size={14} color={C.textDim} /><span className="text-sm" style={{ color: C.textMid }}>{d.name}</span></div>
              <Badge tone={d.status === 'Verified' ? 'green' : 'gold'}>{d.status === 'Verified' ? <span className="flex items-center gap-1"><BadgeCheck size={12} /> Verified</span> : d.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ padding: 20 }}>
        <p className="text-sm font-semibold mb-3" style={{ color: C.text }}>Shift Preferences</p>
        <div className="flex items-center justify-between mb-3"><span className="text-sm" style={{ color: C.textMid }}>Preference</span><span className="text-sm font-medium" style={{ color: C.text }}>{rider.shift || 'Full-time'}</span></div>
        <div className="flex items-center justify-between"><span className="text-sm" style={{ color: C.textMid }}>This week's hours</span><span className="text-sm font-medium" style={{ color: C.text }}>34.5 hrs</span></div>
      </Card>
      <Card style={{ padding: 20 }}>
        <p className="text-sm font-semibold mb-3" style={{ color: C.text }}>Support & Safety</p>
        <div className="space-y-1">
          <button onClick={() => setSosOpen(true)} className="w-full flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${C.border}` }}>
            <span className="text-sm flex items-center gap-2" style={{ color: C.red }}><ShieldAlert size={16} /> SOS Emergency</span><ChevronRight size={14} color={C.textDim} />
          </button>
          <button className="w-full flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${C.border}` }}>
            <span className="text-sm" style={{ color: C.textMid }}>Help Center / Raise a Ticket</span><ChevronRight size={14} color={C.textDim} />
          </button>
          <button className="w-full flex items-center justify-between py-2.5"><span className="text-sm" style={{ color: C.textMid }}>Terms & Privacy Policy</span><ChevronRight size={14} color={C.textDim} /></button>
        </div>
      </Card>

      <Button variant="ghost" className="w-full" onClick={() => setLogoutOpen(true)}><LogOut size={16} /> Logout</Button>

      {sosOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(28,30,39,0.45)' }}>
          <Card style={{ padding: 24 }} className="max-w-xs w-full text-center">
            <ShieldAlert size={36} color={C.red} className="mx-auto mb-3" />
            <p className="font-bold text-base mb-1" style={{ color: C.text }}>Send SOS alert?</p>
            <p className="text-xs mb-5" style={{ color: C.textDim }}>This will notify emergency contacts and KwickRider support with your live location.</p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="ghost" onClick={() => setSosOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setSosOpen(false)}>Send Alert</Button>
            </div>
          </Card>
        </div>
      )}

      {logoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(28,30,39,0.45)' }}>
          <Card style={{ padding: 24 }} className="max-w-xs w-full text-center">
            <LogOut size={32} color={C.gold2} className="mx-auto mb-3" />
            <p className="font-bold text-base mb-1" style={{ color: C.text }}>Log out of KwickRider?</p>
            <p className="text-xs mb-5" style={{ color: C.textDim }}>You'll need to verify your phone number again to sign back in.</p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="ghost" onClick={() => setLogoutOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => { setLogoutOpen(false); onLogout(); }}>Log Out</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function KwickRiderPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [stage, setStage] = useState('auth');
  const [tab, setTab] = useState('home');
  const [online, setOnline] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [history, setHistory] = useState([]);
  const [rider, setRider] = useState({});
  const loc = useDeviceLocation();

  const stats = { todayRides: 24, vsYesterday: 6, efficiency: 92, lifetimeOrders: 1284, lifetimeEarnings: 184320 };

  const handleAuthed = (isNewUser) => {
    if (isNewUser) setStage('onboarding');
    else {
      setRider({ fullName: 'Rahul Kushwaha', vehicleType: 'Bike', plateNumber: 'MP 04 AB 1234', shift: 'Full-time', dlNumber: 'MP0420230001234', rcPhoto: 'rc.jpg', aadhaarPhoto: 'aadhaar.jpg', selfie: 'selfie.jpg' });
      setStage('app');
    }
  };

  const finishOnboarding = (data) => { setRider(data); setStage('verifying'); setTimeout(() => setStage('app'), 1800); };

  const handleLogout = () => {
    logout();
    setStage('auth'); setTab('home'); setOnline(false); setPendingOrder(null);
    setActiveOrder(null); setHistory([]); setRider({});
    navigate('/role-selection', { replace: true });
  };

  if (stage === 'auth') return <AuthScreen onAuthed={handleAuthed} />;
  if (stage === 'onboarding') return <Onboarding onDone={finishOnboarding} />;
  if (stage === 'verifying') return <VerifyingScreen />;

  const NAV = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'earnings', label: 'Earnings', icon: Wallet },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen w-full" style={{ background: C.bg, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ width: '100%', minHeight: '100vh', position: 'relative', paddingBottom: '80px' }}>
        {tab === 'home' && <Home online={online} setOnline={setOnline} stats={stats} setPendingOrder={setPendingOrder} activeOrder={activeOrder} goToOrders={() => setTab('orders')} rider={rider} loc={loc} />}
        {tab === 'earnings' && <Earnings />}
        {tab === 'orders' && <Orders activeOrder={activeOrder} setActiveOrder={setActiveOrder} history={history} setHistory={setHistory} />}
        {tab === 'profile' && <Profile rider={rider} onLogout={handleLogout} loc={loc} />}

        <div className="fixed bottom-0 left-0 right-0 flex items-stretch" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${C.border}` }}>
          {NAV.map((n) => {
            const Icon = n.icon; const active = tab === n.id;
            return (
              <button key={n.id} onClick={() => setTab(n.id)} className="flex-1 flex flex-col items-center justify-center gap-1 py-3 relative">
                {active && <span className="absolute top-0 h-0.5 w-8 rounded-full" style={{ background: C.gold }} />}
                <Icon size={20} color={active ? C.gold2 : C.textDim} />
                <span className="text-[11px] font-medium" style={{ color: active ? C.gold2 : C.textDim }}>{n.label}</span>
              </button>
            );
          })}
        </div>

        {pendingOrder && (
          <OrderRequestPopup order={pendingOrder} onAccept={() => { setActiveOrder(pendingOrder); setPendingOrder(null); setTab('orders'); }} onReject={() => setPendingOrder(null)} />
        )}
      </div>
    </div>
  );
}
