import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  ChevronRight,
  CircleCheckBig,
  CreditCard,
  Download,
  EllipsisVertical,
  Grid,
  HelpCircle,
  Home,
  Landmark,
  MapPin,
  MessageCircle,
  Mic,
  Moon,
  PackageCheck,
  Phone,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trash2,
  User,
  Wallet,
  X,
  Zap,
  Lock,
  Check,
  Mail,
  Shield,
  LogOut,
  Crown,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';

const navItems = [
  { icon: Home, label: 'Home', path: '/customer/home' },
  { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
  { icon: Grid, label: 'Services', path: '/customer/services' },
  { icon: User, label: 'Profile', path: '/customer/profile' },
];

const addressList = [
  {
    id: 1,
    type: 'HOME',
    label: 'Home',
    name: 'Rahul Mehta',
    phone: '+91 98765 43210',
    address: 'B-204, Green Valley Apartments, Sector 21',
    landmark: 'Near City Mart',
    pincode: '201301',
    default: true,
  },
  {
    id: 2,
    type: 'WORK',
    label: 'Work',
    name: 'Rahul Mehta',
    phone: '+91 98765 43210',
    address: '12th Floor, Kwick Office, Noida Sector 62',
    landmark: 'Near Metro Station',
    pincode: '201309',
    default: false,
  },
  {
    id: 3,
    type: 'OTHER',
    label: 'Parents',
    name: 'Neha Mehta',
    phone: '+91 99887 66554',
    address: 'H-17, Ashok Vihar, Haldwani',
    landmark: 'Opposite Government School',
    pincode: '263139',
    default: false,
  },
];

const upiOptions = [
  { id: 'upi-1', handle: 'rahul@okaxis', bank: 'OKAxis', verified: true },
  { id: 'upi-2', handle: '9876543210@paytm', bank: 'Paytm', verified: true },
];

const cardOptions = [
  { id: 'card-1', bank: 'HDFC Bank', last4: '4821', expiry: '12/27', network: 'Visa', default: true },
  { id: 'card-2', bank: 'SBI Card', last4: '9042', expiry: '08/28', network: 'Mastercard', default: false },
];

const faqItems = [
  { question: 'How do I track my order?', answer: 'Go to Orders, tap the order card, and use Live Tracking to follow delivery updates in real time.' },
  { question: 'When will my wallet refund appear?', answer: 'Refunds generally reflect in your wallet within 24-72 hours after successful processing by the merchant.' },
  { question: 'How do I renew Kwick Pro?', answer: 'Visit Kwick Pro from your profile and choose a plan to renew or upgrade instantly with auto-pay.' },
  { question: 'What delivery areas do you cover?', answer: 'Kwick currently serves all major city zones and nearby suburbs. Check by entering your pin code in the delivery box.' },
];

const languages = [
  { id: 'en', name: 'English', native: 'English', selected: true },
  { id: 'hi', name: 'Hindi', native: 'हिंदी', selected: false },
  { id: 'hing', name: 'Hinglish', native: 'Hinglish', selected: false },
  { id: 'mr', name: 'Marathi', native: 'मराठी', selected: false },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', selected: false },
];

function ToggleRow({ label, sublabel, checked, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {sublabel && <p className="mt-1 text-xs text-slate-500">{sublabel}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative h-7 w-12 rounded-full transition-colors ${checked ? 'bg-orange-500' : 'bg-slate-200'}`}
        aria-label={label}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}

export default function ProfileOptionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [walletDefault, setWalletDefault] = useState(true);
  const [upiVisible, setUpiVisible] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [promotionalAlerts, setPromotionalAlerts] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState('light');
  const [twoFactor, setTwoFactor] = useState(true);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState(true);
  const [usageAnalytics, setUsageAnalytics] = useState(false);
  const key = useLocation().pathname.split('/').pop();
  const isProfilePage = ['addresses', 'payments', 'kwick-pro', 'preferences', 'security', 'support', 'logout', 'subscriptions', 'help'].includes(key);

  const pageTitle = useMemo(() => ({
    addresses: 'Saved Addresses',
    payments: 'Payment Methods',
    'kwick-pro': 'Kwick Pro Subscription',
    preferences: 'Language & Preferences',
    security: 'Security & Privacy',
    support: 'Help & Support',
    logout: 'Logging out of Kwick?',
    subscriptions: 'Subscriptions',
    help: 'Help & Support',
  })[key] || 'Profile Settings', [key]);

  const renderHeader = (subtitle) => (
    <div className="mb-5 flex items-center justify-between gap-3">
      <button type="button" onClick={() => navigate('/customer/profile')} className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
        <ArrowLeft size={16} /> Back
      </button>
      <div className="flex-1 text-right">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-500">Profile</p>
        <h1 className="text-xl font-black text-slate-900">{pageTitle}</h1>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate('/role-selection', { replace: true });
  };

  if (key === 'logout') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <LogOut size={28} />
          </div>
          <h2 className="text-center text-2xl font-black text-slate-900">Logging out of Kwick?</h2>
          <p className="mt-3 text-center text-sm text-slate-500">You will miss out on live order tracking and active Kwick Pro savings.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => navigate('/customer/profile')} className="rounded-xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-300">Cancel / Stay Logged In</button>
            <button type="button" onClick={handleLogout} className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100">Yes, Logout</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-28">
      <main className="mx-auto max-w-5xl px-4 pt-5 sm:px-6">
        {isProfilePage && renderHeader()}

        {key === 'addresses' && (
          <>
            <div className="mb-5 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">Delivery details</p>
                <h2 className="mt-1 text-lg font-black text-slate-900">Saved Addresses</h2>
              </div>
              <button type="button" onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#e65d00]">
                <Plus size={16} /> Add New Address
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {addressList.map((item) => (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-orange-700">{item.type}</span>
                      <span className="text-sm font-bold text-slate-900">{item.label}</span>
                    </div>
                    <button type="button" className="rounded-full p-2 text-slate-400 hover:bg-slate-100">
                      <EllipsisVertical size={16} />
                    </button>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="text-xs text-slate-400">{item.phone}</span>
                    </div>
                    <p>{item.address}</p>
                    <p>Landmark: {item.landmark}</p>
                    <p>PIN: {item.pincode}</p>
                  </div>

                  {item.default && (
                    <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
                      <CircleCheckBig size={12} /> Default Address
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <button type="button" className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-semibold text-slate-700">Edit</button>
                    <button type="button" className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-semibold text-slate-700">Delete</button>
                    {!item.default && <button type="button" className="rounded-lg bg-orange-50 px-2.5 py-1.5 font-semibold text-orange-700">Set as Default</button>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {key === 'payments' && (
          <div className="space-y-5">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Kwick Pay</p>
                  <h3 className="mt-1 text-lg font-black text-slate-900">Wallet as default payment</h3>
                </div>
                <button type="button" onClick={() => setWalletDefault(v => !v)} className={`relative h-7 w-12 rounded-full transition-colors ${walletDefault ? 'bg-orange-500' : 'bg-slate-200'}`}>
                  <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${walletDefault ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Saved UPI</p>
                  <h3 className="mt-1 text-lg font-black text-slate-900">UPI IDs</h3>
                </div>
                <button type="button" onClick={() => setUpiVisible(v => !v)} className="inline-flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-bold text-orange-600">
                  <Plus size={16} /> Add New UPI ID
                </button>
              </div>
              <div className="space-y-3">
                {upiOptions.map((upi) => (
                  <div key={upi.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-orange-600 shadow-sm">{upi.bank.slice(0, 2)}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{upi.handle}</p>
                        <p className="text-xs text-slate-500">{upi.bank}</p>
                      </div>
                    </div>
                    <button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              {upiVisible && (
                <div className="mt-4 rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-3">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">Verify New UPI</label>
                  <div className="mt-2 flex gap-2">
                    <input className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500" placeholder="name@upi" />
                    <button type="button" className="rounded-xl bg-[#FF6B00] px-4 py-2 text-sm font-bold text-white">Verify</button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Cards</p>
                  <h3 className="mt-1 text-lg font-black text-slate-900">Debit & Credit Cards</h3>
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-bold text-orange-600">
                  <Plus size={16} /> Add New Card
                </button>
              </div>
              <div className="space-y-3">
                {cardOptions.map((card) => (
                  <div key={card.id} className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-4 text-white shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{card.bank}</p>
                        <p className="mt-3 text-xl font-black tracking-[0.2em]">•••• {card.last4}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">{card.network}</span>
                        {card.default && <div className="mt-2 text-[10px] font-bold uppercase tracking-wide text-yellow-300">Default Card</div>}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                      <span>Valid thru {card.expiry}</span>
                      <button type="button" className="rounded-lg bg-white/10 px-2 py-1 text-white">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Preferences</p>
              <div className="mt-4 space-y-3">
                <ToggleRow label="Preferred Net Banking" sublabel="ICICI, HDFC, SBI" checked={true} onChange={() => {}} />
                <ToggleRow label="Cash on Delivery" sublabel="Enable for eligible orders" checked={true} onChange={() => {}} />
              </div>
            </div>

            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <div className="flex items-center gap-2"><ShieldCheck size={16} /> PCI-DSS 256-Bit Encrypted</div>
            </div>
          </div>
        )}

        {key === 'kwick-pro' && (
          <div className="space-y-5">
            <div className="rounded-3xl bg-gradient-to-r from-[#0A192F] via-[#142E4A] to-[#FF6B00] p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="rounded-full bg-yellow-400 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-900">Pro</span>
                  <p className="mt-3 text-2xl font-black">3 Months Plan</p>
                </div>
                <Crown className="h-10 w-10 text-yellow-300" />
              </div>
              <p className="mt-3 text-sm text-slate-200">Renews on 12 Oct 2026</p>
              <div className="mt-4 rounded-2xl bg-white/10 p-3 text-sm font-semibold text-yellow-100">You saved ₹1,240 on delivery fees this month! 🎉</div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Choose a plan</p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  { name: '1 Month Pass', price: '₹99/month', highlight: false },
                  { name: '3 Month Saver', price: '₹199 (Save 33%)', highlight: true },
                  { name: '1 Year VIP Pass', price: '₹599/year', highlight: false },
                ].map((plan) => (
                  <div key={plan.name} className={`rounded-2xl border p-4 ${plan.highlight ? 'border-orange-500 bg-orange-50 shadow-sm' : 'border-slate-200 bg-slate-50'}`}>
                    <p className="text-sm font-bold text-slate-900">{plan.name}</p>
                    <p className="mt-2 text-xl font-black text-slate-900">{plan.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Pro benefits</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {[
                  '🚀 Unlimited Free Delivery on orders above ₹149',
                  '⚡ Priority Dispatch during peak hours',
                  '💸 Extra 5% Cashback on Fresh Mandi & Medicines',
                  '📞 VIP Priority Customer Support',
                ].map((benefit) => (
                  <div key={benefit} className="rounded-2xl bg-slate-50 p-3 text-sm font-medium text-slate-700">{benefit}</div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-black text-slate-900">Upgrade / Renew Kwick Pro</p>
                  <p className="text-xs text-slate-500">Auto-pay enabled</p>
                </div>
                <button type="button" className="rounded-xl bg-[#FF6B00] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#e65d00]">Upgrade / Renew</button>
              </div>
            </div>
          </div>
        )}

        {key === 'preferences' && (
          <div className="space-y-5 pb-24">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">App language</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {languages.map((language) => (
                  <button
                    key={language.id}
                    type="button"
                    onClick={() => setDarkMode(language.id)}
                    className={`rounded-2xl border p-4 text-left transition ${language.selected ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' : 'border-slate-200 bg-slate-50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">{language.native}</span>
                      {language.selected && <Check size={18} className="text-green-600" />}
                    </div>
                    <span className="mt-2 block text-xs text-slate-500">{language.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Voice & AI</p>
                  <h3 className="mt-1 text-lg font-black text-slate-900">Voice Commands</h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600"><Mic size={20} /></div>
              </div>
              <div className="mt-4">
                <ToggleRow label="Enable Voice Commands (Hindi & English)" sublabel="Use natural voice search on the home screen" checked={voiceEnabled} onChange={() => setVoiceEnabled(v => !v)} />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Notifications</p>
              <div className="mt-4 space-y-3">
                <ToggleRow label="WhatsApp Order Updates & Invoices" checked={whatsappUpdates} onChange={() => setWhatsappUpdates(v => !v)} />
                <ToggleRow label="Promotional Offers & Flash Sale Alerts" checked={promotionalAlerts} onChange={() => setPromotionalAlerts(v => !v)} />
                <ToggleRow label="SMS Notifications" checked={smsEnabled} onChange={() => setSmsEnabled(v => !v)} />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Theme</p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  { id: 'light', name: 'Light Mode', icon: <SunIcon /> },
                  { id: 'dark', name: 'Dark Mode', icon: <Moon size={18} /> },
                  { id: 'system', name: 'System Default', icon: <MonitorIcon /> },
                ].map((theme) => (
                  <button key={theme.id} type="button" onClick={() => setDarkMode(theme.id)} className={`flex items-center justify-between rounded-2xl border p-3 text-left ${darkMode === theme.id ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-slate-50'}`}>
                    <span className="text-sm font-semibold text-slate-800">{theme.name}</span>
                    {darkMode === theme.id && <Check size={16} className="text-green-600" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {key === 'security' && (
          <div className="space-y-5">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Account security</p>
              <div className="mt-4 space-y-3">
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="Current Password" />
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="New Password" />
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" placeholder="Confirm Password" />
              </div>
              <div className="mt-4">
                <ToggleRow label="Two-Factor Authentication (2FA)" sublabel="SMS OTP on login" checked={twoFactor} onChange={() => setTwoFactor(v => !v)} />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Logged in devices</p>
                  <h3 className="mt-1 text-lg font-black text-slate-900">Active sessions</h3>
                </div>
                <button type="button" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600">Log out of all devices</button>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  'Chrome on Windows - Noida, Active Now',
                  'Kwick Android App - Bhopal',
                ].map((device) => (
                  <div key={device} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                    <span>{device}</span>
                    <ShieldCheck size={16} className="text-green-600" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Privacy & data controls</p>
              <div className="mt-4 space-y-3">
                <ToggleRow label="Personalized Product Recommendations" checked={personalizedRecommendations} onChange={() => setPersonalizedRecommendations(v => !v)} />
                <ToggleRow label="Share Usage Analytics" checked={usageAnalytics} onChange={() => setUsageAnalytics(v => !v)} />
              </div>
              <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700">
                <Download size={16} /> Download My Data
              </button>
            </div>

            <div className="rounded-3xl border border-red-200 bg-red-50 p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Danger zone</p>
              <div className="mt-4 space-y-3">
                <button type="button" className="w-full rounded-xl border border-red-200 bg-white px-3 py-3 text-left text-sm font-bold text-red-600">Deactivate Account</button>
                <button type="button" className="w-full rounded-xl border border-red-200 bg-white px-3 py-3 text-left text-sm font-bold text-red-600">Permanently Delete Kwick Account</button>
              </div>
            </div>
          </div>
        )}

        {key === 'support' && (
          <div className="space-y-5">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Quick help</p>
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">MediPlus</p>
                    <p className="text-xs text-slate-500">₹349</p>
                  </div>
                  <PackageCheck className="text-orange-500" size={20} />
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {['Issue with items', 'Delivery delayed', 'Payment/Refund status'].map((option) => (
                    <button key={option} type="button" className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">{option}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: '24x7 Live AI Chatbot', desc: 'Get instant help in under 1 minute', icon: MessageCircle, tone: 'bg-orange-50 text-orange-600' },
                { title: 'Call Support', desc: 'Talk to a customer executive (8 AM - 11 PM)', icon: Phone, tone: 'bg-blue-50 text-blue-600' },
                { title: 'Email Support', desc: 'Support ticket creation system', icon: Mail, tone: 'bg-violet-50 text-violet-600' },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${item.tone}`}><item.icon size={20} /></div>
                  <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">FAQ</p>
              <div className="mt-4 space-y-3">
                {faqItems.map((item, idx) => (
                  <div key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50">
                    <button type="button" onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-bold text-slate-800">
                      <span>{item.question}</span>
                      <ChevronDown className={`transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} size={16} />
                    </button>
                    {expandedFaq === idx && <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600">{item.answer}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {key === 'subscriptions' && (
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Membership</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">Kwick Pro</h3>
            <div className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm text-orange-700 font-semibold">Free delivery and 2x reward points are active.</div>
          </div>
        )}

        {key === 'help' && (
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Support centre</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">Chat with support</h3>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">We’re here to help with orders, payments, and services.</div>
          </div>
        )}

        {['addresses', 'payments', 'kwick-pro', 'preferences', 'security', 'support', 'subscriptions', 'help'].includes(key) && (
          <div className="fixed inset-x-0 bottom-20 z-40 px-4 sm:px-6">
            {key === 'preferences' && (
              <div className="mx-auto max-w-5xl rounded-2xl bg-slate-900 px-4 py-3 shadow-2xl">
                <button type="button" className="w-full rounded-xl bg-[#FF6B00] px-4 py-3 text-sm font-bold text-white">Save Preferences</button>
              </div>
            )}
          </div>
        )}
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 p-4 backdrop-blur-sm">
          <div className="mx-auto max-w-xl rounded-3xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Add New Address</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-500"><X size={16} /></button>
            </div>
            <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="mb-3 h-24 rounded-xl bg-gradient-to-r from-slate-200 via-slate-100 to-orange-100" />
              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-3 py-2 text-xs font-bold text-white">
                <MapPin size={14} /> Use Current Location
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="Flat / House No." />
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="Floor" />
              <input className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="Building Name" />
              <input className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="Nearby Landmark" />
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-600">Address Type</p>
                <div className="flex gap-2">
                  {['Home', 'Work', 'Other'].map((type) => (
                    <button key={type} type="button" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">{type}</button>
                  ))}
                </div>
              </div>
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="Receiver Name" />
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="Phone" />
            </div>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => setModalOpen(false)} className="flex-1 rounded-xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-700">Cancel</button>
              <button type="button" onClick={() => { setModalOpen(false); setNotice('Address saved'); }} className="flex-1 rounded-xl bg-[#FF6B00] px-4 py-3 text-sm font-bold text-white">Save Address</button>
            </div>
          </div>
        </div>
      )}

      {notice && <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">{notice}</div>}
      <BottomNav items={navItems} highlightColor="#FF6B00" />
    </div>
  );
}

function SunIcon() {
  return <Star size={18} className="text-yellow-500" />;
}

function MonitorIcon() {
  return <Bell size={18} className="text-slate-600" />;
}

