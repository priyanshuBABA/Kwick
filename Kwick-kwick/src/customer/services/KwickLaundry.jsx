import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Plus,
  Minus,
  ShoppingBag,
  Calendar,
  Clock,
  CheckCircle2,
  Truck,
  Sparkles,
  PackageCheck,
  Home,
  Search,
  Zap,
  ChevronRight,
  Wallet,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import MobileFrame from '../../components/MobileFrame';

const amberGrad = 'linear-gradient(135deg,#FFD54A,#F5A623)';

const Logo = ({ size = 30 }) => (
  <div className="flex items-center gap-2">
    <div
      className="flex items-center justify-center rounded-2xl shadow-sm"
      style={{
        width: size,
        height: size,
        background: amberGrad,
      }}
    >
      <Zap className="text-slate-900" style={{ width: size * 0.55, height: size * 0.55 }} fill="currentColor" />
    </div>
    <span className="font-black tracking-tight text-slate-900" style={{ fontSize: size * 0.62 }}>
      Kwick<span className="text-amber-400">.</span>
      <span className="text-slate-400" style={{ fontSize: size * 0.42 }}>
        {' '}Laundry
      </span>
    </span>
  </div>
);

const vendors = [
  { id: 1, name: 'Sparkle Laundry Co.', rating: 4.7, reviews: 320, distance: '0.8 km', price: '₹ · ₹₹', eta: 'Same day' },
  { id: 2, name: 'Fresh Fold Dry Cleaners', rating: 4.5, reviews: 210, distance: '1.4 km', price: '₹₹', eta: 'Next day' },
  { id: 3, name: 'QuickClean Laundromat', rating: 4.8, reviews: 540, distance: '2.1 km', price: '₹', eta: 'Same day' },
  { id: 4, name: 'Royal Press & Wash', rating: 4.3, reviews: 98, distance: '2.6 km', price: '₹₹₹', eta: 'Next day' },
];

const catalog = {
  Men: [
    { id: 'm1', name: 'Shirt', icon: '👔', price: 30 },
    { id: 'm2', name: 'T-Shirt', icon: '👕', price: 25 },
    { id: 'm3', name: 'Trousers', icon: '👖', price: 35 },
    { id: 'm4', name: 'Kurta', icon: '🥻', price: 40 },
    { id: 'm5', name: 'Suit (2pc)', icon: '🧥', price: 150 },
  ],
  Women: [
    { id: 'w1', name: 'Saree', icon: '🥻', price: 80 },
    { id: 'w2', name: 'Dress', icon: '👗', price: 60 },
    { id: 'w3', name: 'Blouse', icon: '👚', price: 30 },
    { id: 'w4', name: 'Suit Set', icon: '🧵', price: 90 },
    { id: 'w5', name: 'Saree (Silk)', icon: '🪡', price: 120 },
  ],
  Household: [
    { id: 'h1', name: 'Blanket', icon: '🛏️', price: 180 },
    { id: 'h2', name: 'Curtain (pair)', icon: '🪟', price: 150 },
    { id: 'h3', name: 'Bedspread', icon: '🛌', price: 120 },
    { id: 'h4', name: 'Pillow Cover', icon: '🧺', price: 20 },
    { id: 'h5', name: 'Carpet (sq.ft)', icon: '🧶', price: 15 },
  ],
};

const slots = ['8–10 AM', '10–12 PM', '12–2 PM', '2–4 PM', '4–6 PM', '6–8 PM'];
const dates = ['Today', 'Tomorrow', 'Wed, 9 Jul', 'Thu, 10 Jul'];

const statusSteps = [
  { key: 'Pending', Icon: PackageCheck, label: 'Order Placed' },
  { key: 'Picked Up', Icon: Truck, label: 'Picked Up' },
  { key: 'In Laundry', Icon: Sparkles, label: 'In Laundry' },
  { key: 'Ready', Icon: ShoppingBag, label: 'Ready for Delivery' },
  { key: 'Delivered', Icon: CheckCircle2, label: 'Delivered' },
];

const BackBar = ({ title, onBack }) => (
  <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#FFFBF2]/90 px-4 py-4 backdrop-blur sm:px-6">
    <button
      type="button"
      onClick={onBack}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-100 bg-white text-slate-500 shadow-sm"
    >
      <ArrowLeft size={17} />
    </button>
    <h1 className="truncate text-lg font-black text-slate-900">{title}</h1>
  </div>
);

const PrimaryButton = ({ children, onClick, disabled, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`w-full rounded-xl py-3.5 font-bold text-slate-900 shadow-lg shadow-amber-400/30 transition-transform active:scale-[0.98] disabled:opacity-40 disabled:shadow-none ${className}`}
    style={{ background: disabled ? '#e2e8f0' : amberGrad }}
  >
    {children}
  </button>
);

function VendorList({ onSelect }) {
  const [query, setQuery] = useState('');
  const filtered = vendors.filter((vendor) => vendor.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      <div className="relative overflow-hidden px-4 pb-8 pt-6 sm:px-6 sm:pt-8">
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <Logo size={30} />
          <div className="mt-5 flex items-center gap-2">
            <span className="rounded-full border border-amber-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 shadow-sm">
              Munger&apos;s #1
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
            Fresh clothes,
            <br />
            zero hassle.
          </h1>
          <p className="mt-2 text-sm text-slate-500">Trusted laundry & dry-cleaning, picked up from your door.</p>

          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search laundry shops near you"
              className="w-full rounded-2xl border border-amber-100 bg-white py-3.5 pl-11 pr-4 text-slate-800 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-3 px-4 pb-10 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          {filtered.length} shops near you
        </p>
        {filtered.map((vendor) => (
          <button
            key={vendor.id}
            type="button"
            onClick={() => onSelect(vendor)}
            className="flex w-full items-center gap-4 rounded-2xl border border-amber-100/70 bg-white p-4 text-left shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: 'linear-gradient(135deg,#FFF3D6,#FFE8B8)' }}>
              🧺
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-black text-slate-900">{vendor.name}</p>
              <div className="mt-0.5 flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star size={13} fill="currentColor" /> {vendor.rating}
                <span className="font-normal text-slate-300">({vendor.reviews})</span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1"><MapPin size={11} /> {vendor.distance}</span>
                <span>{vendor.price}</span>
                <span className="text-emerald-500">{vendor.eta}</span>
              </div>
            </div>
            <ChevronRight className="shrink-0 text-slate-300" size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Catalog({ vendor, onBack, onNext }) {
  const [tab, setTab] = useState('Men');
  const [service, setService] = useState('Wash & Iron');
  const [qty, setQty] = useState({});

  const change = (id, delta) => {
    setQty((currentQty) => {
      const next = Math.max(0, (currentQty[id] || 0) + delta);
      return { ...currentQty, [id]: next };
    });
  };

  const priceMultiplier = service === 'Dry Clean' ? 1.6 : 1;

  const items = useMemo(() => {
    const out = [];
    Object.entries(qty).forEach(([id, count]) => {
      if (count > 0) {
        const found = Object.values(catalog).flat().find((item) => item.id === id);
        if (found) {
          out.push({ ...found, price: Math.round(found.price * priceMultiplier), count });
        }
      }
    });
    return out;
  }, [priceMultiplier, qty]);

  const total = items.reduce((sum, item) => sum + item.price * item.count, 0);
  const count = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-28">
      <BackBar title={vendor.name} onBack={onBack} />

      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Service Type</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { name: 'Wash & Iron', desc: 'Everyday wash + press', emoji: '🧼' },
            { name: 'Dry Clean', desc: 'Delicate fabric care', emoji: '✨' },
          ].map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setService(item.name)}
              className={`rounded-2xl border-2 p-4 text-left transition-colors ${service === item.name ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white'}`}
            >
              <span className="text-xl">{item.emoji}</span>
              <p className="mt-1 text-sm font-black text-slate-900">{item.name}</p>
              <p className="text-[11px] font-semibold text-slate-400">{item.desc}</p>
            </button>
          ))}
        </div>
        {service === 'Dry Clean' && (
          <p className="mt-2 text-[11px] font-bold text-amber-600">
            ✨ Dry clean pricing includes premium fabric-safe solvents (+60%).
          </p>
        )}
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.keys(catalog).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setTab(category)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${tab === category ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-500'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {catalog[tab].map((item) => {
            const displayPrice = Math.round(item.price * priceMultiplier);
            return (
              <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-amber-100/70 bg-white p-4 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: 'linear-gradient(135deg,#FFF3D6,#FFE8B8)' }}>
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-sm font-semibold text-slate-400">₹{displayPrice} / item</p>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => change(item.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <Minus size={14} />
                  </button>
                  <span className="w-5 text-center font-black text-slate-900">{qty[item.id] || 0}</span>
                  <button type="button" onClick={() => change(item.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-900" style={{ background: amberGrad }}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-5xl border-t border-amber-100 bg-white px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-400">{count} items · {service}</p>
              <p className="text-lg font-black text-slate-900">₹{total}</p>
            </div>
            <button
              type="button"
              onClick={() => onNext({ items, service, total, count })}
              className="flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-slate-900 shadow-lg shadow-amber-400/30"
              style={{ background: amberGrad }}
            >
              Schedule <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Scheduling({ vendor, order, onBack, onNext }) {
  const [pickupDate, setPickupDate] = useState(dates[0]);
  const [pickupSlot, setPickupSlot] = useState(null);
  const [dropDate, setDropDate] = useState(dates[1]);
  const [dropSlot, setDropSlot] = useState(null);

  const canContinue = pickupSlot && dropSlot;

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-28">
      <BackBar title="Schedule Pick-up & Delivery" onBack={onBack} />

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-5 sm:px-6">
        <div className="rounded-2xl border border-amber-100/70 bg-white p-5 shadow-sm">
          <p className="mb-3 flex items-center gap-2 font-black text-slate-900">
            <Calendar size={16} className="text-amber-500" /> Pick-up
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {dates.map((dateOption) => (
              <button
                key={dateOption}
                type="button"
                onClick={() => setPickupDate(dateOption)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${pickupDate === dateOption ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                {dateOption}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setPickupSlot(slot)}
                className={`flex items-center justify-center gap-1 rounded-xl border-2 py-2.5 text-xs font-bold ${pickupSlot === slot ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}
              >
                <Clock size={12} /> {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100/70 bg-white p-5 shadow-sm">
          <p className="mb-3 flex items-center gap-2 font-black text-slate-900">
            <Truck size={16} className="text-emerald-600" /> Delivery
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {dates.map((dateOption) => (
              <button
                key={dateOption}
                type="button"
                onClick={() => setDropDate(dateOption)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${dropDate === dateOption ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                {dateOption}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setDropSlot(slot)}
                className={`flex items-center justify-center gap-1 rounded-xl border-2 py-2.5 text-xs font-bold ${dropSlot === slot ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'}`}
              >
                <Clock size={12} /> {slot}
              </button>
            ))}
          </div>
        </div>

        {!order && (
          <div className="rounded-2xl border border-amber-100/70 bg-amber-50 p-4 text-sm font-semibold text-amber-700">
            Add a few items first to continue with scheduling.
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-5xl border-t border-amber-100 bg-white px-4 py-4 sm:px-6">
        <PrimaryButton
          disabled={!canContinue}
          onClick={() => onNext({ pickup: `${pickupDate}, ${pickupSlot}`, drop: `${dropDate}, ${dropSlot}` })}
        >
          Review Order
        </PrimaryButton>
      </div>
    </div>
  );
}

function Summary({ vendor, order, schedule, onBack, onConfirm }) {
  const deliveryFee = 25;
  const total = order.total + deliveryFee;

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-28">
      <BackBar title="Order Summary" onBack={onBack} />

      <div className="mx-auto max-w-5xl space-y-4 px-4 py-5 sm:px-6">
        <div className="rounded-2xl border border-amber-100/70 bg-white p-5 shadow-sm">
          <p className="mb-3 font-black text-slate-900">{vendor.name}</p>
          <div className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 text-sm">
                <span className="font-semibold text-slate-600">{item.name} × {item.count}</span>
                <span className="font-bold text-slate-900">₹{item.price * item.count}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs font-bold text-amber-600">{order.service}</p>
        </div>

        <div className="space-y-2 rounded-2xl border border-amber-100/70 bg-white p-5 text-sm shadow-sm">
          <div className="flex justify-between"><span className="text-slate-500">Item total</span><span className="font-bold text-slate-900">₹{order.total}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Pick-up & delivery fee</span><span className="font-bold text-slate-900">₹{deliveryFee}</span></div>
          <div className="flex justify-between border-t border-slate-100 pt-2 text-base">
            <span className="font-black text-slate-900">Total</span>
            <span className="font-black text-slate-900">₹{total}</span>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-amber-100/70 bg-white p-5 text-sm shadow-sm">
          <div className="flex items-center gap-3">
            <Truck size={16} className="shrink-0 text-amber-500" />
            <div><p className="text-xs font-bold text-slate-400">Pick-up</p><p className="font-bold text-slate-900">{schedule.pickup}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <Home size={16} className="shrink-0 text-emerald-600" />
            <div><p className="text-xs font-bold text-slate-400">Delivery</p><p className="font-bold text-slate-900">{schedule.drop}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="shrink-0 text-slate-400" />
            <div><p className="text-xs font-bold text-slate-400">Address</p><p className="font-bold text-slate-900">Home — 12, Shastri Nagar</p></div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-5xl border-t border-amber-100 bg-white px-4 py-4 sm:px-6">
        <PrimaryButton onClick={() => onConfirm(total)}>Proceed to Pay · ₹{total}</PrimaryButton>
      </div>
    </div>
  );
}

function Payment({ total, onBack, onPaid }) {
  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const methods = [
    { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, Paytm', Icon: Smartphone },
    { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', Icon: CreditCard },
    { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when order is delivered', Icon: Wallet },
  ];

  const upiValid = /^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim());
  const cardValid = cardNum.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCvv.length === 3;
  const canPay = method === 'cod' || (method === 'upi' && upiValid) || (method === 'card' && cardValid);

  const handlePay = () => {
    setError('');
    if (!canPay) {
      if (method === 'upi') setError('Enter a valid UPI ID, e.g. name@okhdfcbank');
      if (method === 'card') setError('Check your card number, expiry and CVV');
      return;
    }

    setStatus('processing');
    window.setTimeout(() => {
      if (method === 'upi' && /fake|fail/i.test(upiId)) {
        setStatus('failed');
        setError('Payment could not be completed. Try again or use a different method.');
        return;
      }
      setStatus('success');
    }, 1800);
  };

  const formatCard = (value) => value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-32">
      <BackBar title="Payment" onBack={onBack} />

      <div className="mx-auto max-w-5xl space-y-4 px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between rounded-2xl border border-amber-100/70 bg-white p-5 shadow-sm">
          <span className="text-sm font-bold text-slate-500">Amount to pay</span>
          <span className="text-2xl font-black text-slate-900">₹{total}</span>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Choose payment method</p>

        <div className="space-y-3">
          {methods.map((methodOption) => (
            <div key={methodOption.id}>
              <button
                type="button"
                onClick={() => {
                  setMethod(methodOption.id);
                  setError('');
                }}
                className={`flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 transition-colors ${method === methodOption.id ? 'border-amber-400 bg-amber-50' : 'border-slate-200'}`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-white">
                  <methodOption.Icon size={20} className="text-amber-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-900">{methodOption.label}</p>
                  <p className="text-xs font-semibold text-slate-400">{methodOption.desc}</p>
                </div>
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${method === methodOption.id ? 'border-amber-500' : 'border-slate-300'}`}>
                  {method === methodOption.id && <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />}
                </div>
              </button>

              {method === 'upi' && methodOption.id === 'upi' && (
                <div className="mt-2 space-y-2 rounded-2xl border border-amber-100 bg-white p-4">
                  <label className="mb-1 block text-xs font-bold text-slate-500">Enter UPI ID</label>
                  <input
                    value={upiId}
                    onChange={(event) => {
                      setUpiId(event.target.value);
                      setError('');
                    }}
                    placeholder="yourname@okhdfcbank"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-amber-400"
                  />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['@okhdfcbank', '@paytm', '@ybl', '@oksbi'].map((suffix) => (
                      <button
                        key={suffix}
                        type="button"
                        onClick={() => {
                          const namePart = upiId.split('@')[0] || 'yourname';
                          setUpiId(namePart + suffix);
                        }}
                        className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"
                      >
                        {suffix}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {method === 'card' && methodOption.id === 'card' && (
                <div className="mt-2 space-y-3 rounded-2xl border border-amber-100 bg-white p-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-500">Card Number</label>
                    <input
                      value={cardNum}
                      onChange={(event) => setCardNum(formatCard(event.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-amber-400"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-bold text-slate-500">Expiry</label>
                      <input
                        value={cardExpiry}
                        onChange={(event) => setCardExpiry(formatExpiry(event.target.value))}
                        placeholder="MM/YY"
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-amber-400"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-bold text-slate-500">CVV</label>
                      <input
                        value={cardCvv}
                        onChange={(event) => setCardCvv(event.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="123"
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {error && <p className="text-center text-sm font-bold text-red-500">{error}</p>}

        <div className="flex items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-400">
          <ShieldCheck size={14} className="text-emerald-500" /> 100% secure payments
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-5xl border-t border-amber-100 bg-white px-4 py-4 sm:px-6">
        <PrimaryButton onClick={handlePay} disabled={status === 'processing'}>
          {status === 'processing' ? 'Processing...' : method === 'cod' ? 'Place Order' : `Pay ₹${total}`}
        </PrimaryButton>
      </div>

      {status === 'processing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm">
          <div className="mx-6 flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-xl">
            <Loader2 size={40} className="animate-spin text-amber-500" />
            <p className="text-center font-bold text-slate-700">
              {method === 'upi' ? 'Approve the request on your UPI app...' : 'Processing your payment...'}
            </p>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg,#4ADE80,#16A34A)' }}>
              <CheckCircle2 size={44} className="text-white" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Payment Successful!</h3>
            <p className="mt-1 text-sm text-slate-500">
              ₹{total} paid {method === 'upi' ? `via UPI (${upiId})` : method === 'card' ? 'via Card' : '— Cash on Delivery confirmed'}
            </p>
            <button
              type="button"
              onClick={onPaid}
              className="mt-6 w-full rounded-xl py-3.5 font-black text-slate-900"
              style={{ background: amberGrad }}
            >
              Track My Order
            </button>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
              <ShieldCheck size={32} className="text-rose-500" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Payment Failed</h3>
            <p className="mt-1 text-sm text-slate-500">{error}</p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 w-full rounded-xl bg-slate-900 py-3.5 font-black text-white"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Tracking({ vendor, onBack }) {
  const [statusIdx, setStatusIdx] = useState(0);

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-10">
      <BackBar title="Track Your Order" onBack={onBack} />

      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        <div className="mb-5 flex items-center justify-between rounded-2xl border border-amber-100/70 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Order #KWL-4821</p>
            <p className="mt-0.5 font-black text-slate-900">{vendor.name}</p>
          </div>
          <Logo size={26} />
        </div>

        <div className="rounded-2xl border border-amber-100/70 bg-white p-6 shadow-sm">
          {statusSteps.map((step, index) => {
            const done = index <= statusIdx;
            const isLast = index === statusSteps.length - 1;
            return (
              <div key={step.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: done ? amberGrad : '#f1f5f9', color: done ? '#0f172a' : '#cbd5e1' }}>
                    <step.Icon size={18} />
                  </div>
                  {!isLast && <div className="my-1 w-0.5 flex-1" style={{ minHeight: 28, background: index < statusIdx ? '#F5A623' : '#f1f5f9' }} />}
                </div>
                <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                  <p className={`font-bold ${done ? 'text-slate-900' : 'text-slate-300'}`}>{step.label}</p>
                  {done && index === statusIdx && <p className="mt-0.5 text-xs font-semibold text-amber-600">Current status</p>}
                </div>
              </div>
            );
          })}
        </div>

        {statusIdx < statusSteps.length - 1 && (
          <button type="button" onClick={() => setStatusIdx((value) => Math.min(statusSteps.length - 1, value + 1))} className="mt-5 w-full rounded-xl border border-amber-100 bg-amber-50 py-3 font-bold text-amber-700">
            (Vendor demo) Advance to next status →
          </button>
        )}
      </div>
    </div>
  );
}

export default function KwickLaundryPage() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('vendors');
  const [vendor, setVendor] = useState(null);
  const [order, setOrder] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [payTotal, setPayTotal] = useState(0);

  return (
    <MobileFrame>
      <div className="w-full bg-[#FFFBF2]">
        {screen === 'vendors' && (
          <VendorList
            onSelect={(selectedVendor) => {
              setVendor(selectedVendor);
              setScreen('catalog');
            }}
          />
        )}

        {screen === 'catalog' && vendor && (
          <Catalog
            vendor={vendor}
            onBack={() => {
              setVendor(null);
              setScreen('vendors');
            }}
            onNext={(nextOrder) => {
              setOrder(nextOrder);
              setScreen('schedule');
            }}
          />
        )}

        {screen === 'schedule' && vendor && order && (
          <Scheduling
            vendor={vendor}
            order={order}
            onBack={() => setScreen('catalog')}
            onNext={(nextSchedule) => {
              setSchedule(nextSchedule);
              setScreen('summary');
            }}
          />
        )}

        {screen === 'summary' && vendor && order && schedule && (
          <Summary
            vendor={vendor}
            order={order}
            schedule={schedule}
            onBack={() => setScreen('schedule')}
            onConfirm={(total) => {
              setPayTotal(total);
              setScreen('payment');
            }}
          />
        )}

        {screen === 'payment' && (
          <Payment
            total={payTotal}
            onBack={() => setScreen('summary')}
            onPaid={() => setScreen('tracking')}
          />
        )}

        {screen === 'tracking' && vendor && (
          <Tracking vendor={vendor} onBack={() => navigate('/customer/home')} />
        )}
      </div>
    </MobileFrame>
  );
}
