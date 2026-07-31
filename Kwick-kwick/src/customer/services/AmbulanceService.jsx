import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../../components/MobileFrame';
import {
  Activity,
  Ambulance,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Copy,
  Heart,
  Hospital,
  Home,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  User,
  Zap,
} from 'lucide-react';

const COLORS = {
  primary: '#FFD700',
  accent: '#E53935',
  bg: '#f5f5f5',
  card: '#ffffff',
  text: '#1A1A1A',
  muted: '#666',
  success: '#4CAF50',
};

const AMBULANCE_TYPES = [
  { id: 'bls', type: 'BLS', name: 'Basic Life Support', icon: '🚑', desc: 'Accidents, fever, general emergencies', price: 299, tag: 'Most Booked', tagColor: '#E8F5E9', tagText: '#2E7D32' },
  { id: 'als', type: 'ALS', name: 'Advanced Life Support', icon: '🏥', desc: 'ICU on wheels — Ventilator & Oxygen', price: 599, tag: 'ICU Ready', tagColor: '#E3F2FD', tagText: '#1565C0' },
  { id: 'pt', type: 'PT', name: 'Patient Transport', icon: '🛻', desc: 'Non-emergency hospital transfer', price: 199, tag: 'Affordable', tagColor: '#F3E5F5', tagText: '#7B1FA2' },
];

const HOSPITALS = [
  { id: 'h1', name: 'AIIMS Bhopal', dist: '1.2 km', rating: '4.8' },
  { id: 'h2', name: 'Hamidia Hospital', dist: '2.5 km', rating: '4.5' },
  { id: 'h3', name: 'Apollo Hospital', dist: '3.8 km', rating: '4.7' },
  { id: 'h4', name: 'Bansal Hospital', dist: '4.1 km', rating: '4.6' },
];

const MEDICAL_CONDITIONS = ['Heart Attack', 'Road Accident', 'Stroke', 'Difficulty Breathing', 'Unconscious', 'Fracture', 'Burn', 'Other'];

const Header = ({ title, subtitle, showBack, onBack }) => (
  <div style={{ position: 'sticky', top: 0, zIndex: 60, background: COLORS.primary, padding: '16px 16px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
    {showBack && (
      <button onClick={onBack} style={{ border: 'none', background: 'rgba(255,255,255,0.25)', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <ChevronLeft size={20} />
      </button>
    )}
    <div>
      <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: COLORS.text }}>{title}</h1>
      <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4d4d4d' }}>{subtitle}</p>
    </div>
  </div>
);

const BottomNav = ({ activeTab }) => {
  const tabs = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'orders', label: 'ORDERS', icon: ShoppingBag },
    { id: 'services', label: 'SERVICES', icon: Zap },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '10px 0 12px' }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <div key={tab.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? COLORS.primary : '#999', fontWeight: 800, fontSize: 10, letterSpacing: '0.12em' }}>
            <Icon size={20} />
            <span>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
};

const SOSButton = () => (
  <a href="tel:108" style={{ position: 'fixed', bottom: 88, right: 18, zIndex: 999, width: 64, height: 64, borderRadius: '50%', background: COLORS.accent, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxShadow: '0 14px 36px rgba(229,57,53,0.28)', fontWeight: 800, fontSize: 11, animation: 'pulse 1.8s infinite' }}>
    <span style={{ fontSize: 24 }}>🆘</span>
    <span style={{ lineHeight: 1 }}>SOS</span>
  </a>
);

const AmbulanceService = () => {
  const navigate = useNavigate();
  const [flow, setFlow] = useState('select');
  const [selectedService, setSelectedService] = useState(null);
  const [bookingId, setBookingId] = useState('');
  const [eta, setEta] = useState(7);
  const [copied, setCopied] = useState(false);
  const [dropMode, setDropMode] = useState('nearest');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [condition, setCondition] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingData, setBookingData] = useState({ service: null, pickup: 'Munger Fort, Bhopal (Current Location)', dropMode: 'nearest', hospital: null, medInfo: '', condition: '' });

  useEffect(() => {
    if (flow === 'tracking') {
      const interval = window.setInterval(() => {
        setEta((prev) => (prev > 1 ? prev - 1 : 1));
      }, 20000);
      return () => window.clearInterval(interval);
    }
  }, [flow]);

  useEffect(() => {
    setBookingData((prev) => ({ ...prev, dropMode, hospital: dropMode === 'nearest' ? { id: 'nearest', name: 'Nearest Available Hospital' } : selectedHospital, condition, medInfo: notes }));
  }, [dropMode, selectedHospital, condition, notes]);

  useEffect(() => {
    setBookingId(String(Math.floor(10000 + Math.random() * 90000)));
  }, []);

  const selectedPrice = useMemo(() => selectedService?.price || 299, [selectedService]);

  const chooseService = (service) => {
    setSelectedService(service);
    setBookingData((prev) => ({ ...prev, service }));
    setFlow('location');
  };

  const handleConfirmBooking = () => {
    if (dropMode === 'choose' && !selectedHospital) return;
    setFlow('tracking');
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(`KW-AMB-${bookingId}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const resetFlow = () => {
    setFlow('select');
    setSelectedService(null);
    setDropMode('nearest');
    setSelectedHospital(null);
    setCondition('');
    setNotes('');
    setEta(7);
    setCopied(false);
    setBookingData({ service: null, pickup: 'Munger Fort, Bhopal (Current Location)', dropMode: 'nearest', hospital: null, medInfo: '', condition: '' });
  };

  const renderSelect = () => (
    <div style={{ padding: '18px 16px 100px', background: COLORS.bg }}>
      <div style={{ background: COLORS.accent, borderRadius: 20, padding: '16px 16px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 8px 28px rgba(229,57,53,0.24)', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ animation: 'blink 1s infinite', fontSize: 24 }}>🚨</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Emergency?</div>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8 }}>Call 108 for urgent help</div>
          </div>
        </div>
        <a href="tel:108" style={{ background: '#fff', color: COLORS.accent, padding: '8px 12px', borderRadius: 12, fontWeight: 900, fontSize: 11, textDecoration: 'none', letterSpacing: '0.12em' }}>CALL 108</a>
      </div>

      <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 12, color: COLORS.text }}>Choose Ambulance Type</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {AMBULANCE_TYPES.map((service, index) => (
          <div key={service.id} onClick={() => chooseService(service)} style={{ background: COLORS.card, borderRadius: 18, padding: 14, display: 'flex', gap: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.06)', cursor: 'pointer', border: '1px solid #f3f3f3', animation: 'fadeUp 0.35s ease forwards', animationDelay: `${index * 80}ms`, opacity: 0 }}>
            <div style={{ width: 58, height: 58, borderRadius: 16, background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
              {service.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 900 }}>{service.type}</div>
                <span style={{ background: service.tagColor, color: service.tagText, padding: '3px 8px', borderRadius: 999, fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{service.tag}</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.4, marginBottom: 10 }}>{service.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: COLORS.accent, fontSize: 20, fontWeight: 900 }}>₹{service.price}</div>
                <div style={{ background: COLORS.primary, color: COLORS.text, padding: '8px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Book →</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: COLORS.card, borderRadius: 20, padding: 16, marginTop: 18, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 900, fontSize: 14, marginBottom: 12 }}>
          <ShieldCheck size={16} color={COLORS.primary} /> Why Kwick Ambulance?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: <Clock size={13} />, text: 'Under 8 min avg. response time' },
            { icon: <Activity size={13} />, text: 'Pay later / pay at hospital' },
            { icon: <MapPin size={13} />, text: 'Live GPS tracking' },
            { icon: <Heart size={13} />, text: 'Trained paramedic onboard' },
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: '#fafafa', padding: 10, borderRadius: 12 }}>
              <div style={{ color: COLORS.primary, marginTop: 1 }}>{item.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, lineHeight: 1.3 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLocation = () => (
    <div style={{ padding: '16px 16px 120px', background: COLORS.bg }}>
      <div style={{ background: COLORS.card, borderRadius: 20, padding: 16, marginBottom: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <MapPin size={16} color={COLORS.primary} />
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: COLORS.muted }}>Pickup Location</div>
        </div>
        <div style={{ background: 'rgba(255,215,0,0.14)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📍</div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{bookingData.pickup}</div>
        </div>
        <button style={{ marginTop: 10, background: 'transparent', border: 'none', color: COLORS.muted, fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: 0 }}>
          <Search size={13} /> Change Pickup Location
        </button>
      </div>

      <div style={{ background: COLORS.card, borderRadius: 20, padding: 16, marginBottom: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Hospital size={16} color={COLORS.primary} />
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: COLORS.muted }}>Drop Location</div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <button onClick={() => setDropMode('nearest')} style={{ flex: 1, borderRadius: 14, padding: '10px 8px', border: dropMode === 'nearest' ? `2px solid ${COLORS.primary}` : '2px solid #ececec', background: dropMode === 'nearest' ? 'rgba(255,215,0,0.16)' : '#fff', fontWeight: 800, fontSize: 11, cursor: 'pointer', color: dropMode === 'nearest' ? COLORS.text : COLORS.muted }}>🎯 Nearest Hospital</button>
          <button onClick={() => setDropMode('choose')} style={{ flex: 1, borderRadius: 14, padding: '10px 8px', border: dropMode === 'choose' ? `2px solid ${COLORS.primary}` : '2px solid #ececec', background: dropMode === 'choose' ? 'rgba(255,215,0,0.16)' : '#fff', fontWeight: 800, fontSize: 11, cursor: 'pointer', color: dropMode === 'choose' ? COLORS.text : COLORS.muted }}>🔍 I&apos;ll Choose</button>
        </div>
        {dropMode === 'nearest' ? (
          <div style={{ background: 'rgba(76,175,80,0.12)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={17} color={COLORS.success} />
            <div style={{ fontSize: 12, fontWeight: 800, color: '#2e7d32' }}>✅ Will auto-select nearest available hospital</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {HOSPITALS.map((hospital) => {
              const active = selectedHospital?.id === hospital.id;
              return (
                <div key={hospital.id} onClick={() => setSelectedHospital(hospital)} style={{ border: active ? `2px solid ${COLORS.primary}` : '1px solid #ececec', background: active ? 'rgba(255,215,0,0.14)' : '#fff', borderRadius: 14, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>{hospital.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{hospital.dist} • ⭐ {hospital.rating}</div>
                  </div>
                  {active ? <CheckCircle2 size={18} color={COLORS.primary} /> : null}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ background: COLORS.card, borderRadius: 20, padding: 16, marginBottom: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 900, fontSize: 13 }}>
            <Activity size={15} color={COLORS.primary} /> Medical Condition
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted }}>(Optional)</div>
        </div>
        <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, lineHeight: 1.4 }}>Helps driver & paramedic prepare in advance</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {MEDICAL_CONDITIONS.map((chip) => {
            const active = condition === chip;
            return (
              <button key={chip} onClick={() => setCondition(active ? '' : chip)} style={{ border: active ? `1px solid ${COLORS.accent}` : '1px solid #ececec', background: active ? 'rgba(229,57,53,0.09)' : '#fff', color: active ? COLORS.accent : COLORS.muted, padding: '7px 10px', borderRadius: 999, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>{chip}</button>
            );
          })}
        </div>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add any extra notes..." style={{ width: '100%', minHeight: 84, border: '1px solid #ececec', borderRadius: 14, padding: '10px 12px', resize: 'none', fontSize: 12, color: COLORS.text, background: '#fafafa', outline: 'none' }} />
      </div>

      <div style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #ffe066)`, borderRadius: 20, padding: 16, boxShadow: '0 10px 30px rgba(255,215,0,0.2)', border: `1px solid rgba(0,0,0,0.04)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.7 }}>Estimated Fare</div>
            <div style={{ fontSize: 16, fontWeight: 900 }}>Base + distance charges</div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.accent }}>₹{selectedPrice}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={16} color={COLORS.success} />
          <div style={{ fontSize: 11, fontWeight: 800, color: '#206534' }}>💳 Pay Later / Pay at Hospital — No advance payment needed</div>
        </div>
      </div>

      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: '#fff', borderTop: '1px solid #eee', padding: '14px 16px 18px', zIndex: 90 }}>
        <button onClick={handleConfirmBooking} disabled={dropMode === 'choose' && !selectedHospital} style={{ width: '100%', border: 'none', borderRadius: 16, background: dropMode === 'choose' && !selectedHospital ? '#d3d3d3' : COLORS.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 16px', fontSize: 15, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: dropMode === 'choose' && !selectedHospital ? 'not-allowed' : 'pointer' }}>
          <Ambulance size={18} /> Confirm & Book Ambulance
        </button>
        <a href="tel:108" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 10, color: COLORS.accent, fontSize: 11, fontWeight: 800, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}><Phone size={13} /> Call Help Desk Instead</a>
      </div>
    </div>
  );

  const renderTracking = () => (
    <div style={{ padding: '0 16px 100px', background: COLORS.bg }}>
      <div style={{ background: COLORS.accent, padding: '24px 16px 22px', marginTop: 0, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 28%)' }} />
        <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, zIndex: 1 }}>{eta} min</div>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.9, marginTop: 4, zIndex: 1 }}>Estimated arrival time</div>
        <div style={{ fontSize: 32, marginTop: 8, zIndex: 1, animation: 'pulse 1.8s infinite' }}>🚑</div>
      </div>

      <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ height: 180, background: 'linear-gradient(135deg, #e9f4ff 0%, #f7fbff 100%)', borderRadius: 20, border: '1px solid #dceefc', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#91c8ff 1px, transparent 1px)', backgroundSize: '18px 18px', opacity: 0.3 }} />
          <div style={{ background: '#fff', padding: '8px 12px', borderRadius: 999, boxShadow: '0 8px 22px rgba(0,0,0,0.08)', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={13} color={COLORS.accent} /> 🗺️ Live Map — Ambulance Approaching
          </div>
          <div style={{ position: 'absolute', bottom: 18, left: 20, fontSize: 34, animation: 'pulse 1.8s infinite' }}>🚑</div>
          <div style={{ position: 'absolute', top: 14, right: 18, fontSize: 22 }}>📍</div>
        </div>

        <div style={{ background: COLORS.card, borderRadius: 20, padding: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: `2px solid rgba(255,215,0,0.35)` }}>👨‍⚕️</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 900 }}>Ramesh Kumar</div>
              <span style={{ background: 'rgba(76,175,80,0.12)', color: '#2e7d32', padding: '3px 7px', borderRadius: 999, fontSize: 8, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Verified Paramedic</span>
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 3, fontWeight: 700 }}>MP04 AA 1234</div>
          </div>
          <a href="tel:1234567890" style={{ width: 44, height: 44, borderRadius: 14, background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.text, boxShadow: '0 8px 20px rgba(255,215,0,0.2)' }}><Phone size={18} /></a>
        </div>

        <div style={{ background: COLORS.card, borderRadius: 20, padding: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          {[
            { label: 'Booking Confirmed', status: 'done' },
            { label: 'Finding Nearest Ambulance', status: 'done' },
            { label: 'Ambulance Dispatched', status: 'done' },
            { label: 'Driver En Route to You', status: 'active' },
            { label: 'Arrived at Pickup', status: 'pending' },
          ].map((step, index) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: index < 4 ? 12 : 0 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: step.status === 'done' ? COLORS.success : step.status === 'active' ? COLORS.primary : '#ececec', color: step.status === 'done' ? '#fff' : step.status === 'active' ? COLORS.text : '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {step.status === 'done' ? <Check size={14} /> : <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'block' }} />}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: step.status === 'active' ? 900 : 700, color: step.status === 'pending' ? '#b0b0b0' : COLORS.text }}>{step.label}</div>
                {step.status === 'active' ? <div style={{ fontSize: 10, color: COLORS.accent, fontWeight: 800, marginTop: 2 }}>Expected in 7 mins</div> : null}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,215,0,0.16)', border: '1px dashed rgba(255,215,0,0.45)', borderRadius: 18, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 3 }}>Booking ID</div>
            <div style={{ fontSize: 16, fontWeight: 900 }}>KW-AMB-{bookingId}</div>
          </div>
          <button onClick={copyToClipboard} style={{ border: 'none', background: copied ? COLORS.success : '#fff', color: copied ? '#fff' : COLORS.text, padding: '8px 12px', borderRadius: 999, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>{copied ? '✅ Copied' : '📋 Copy'}</button>
        </div>

        <div style={{ background: 'rgba(76,175,80,0.12)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: 18, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 24 }}>💳</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#2e7d32' }}>Pay at Hospital</div>
            <div style={{ fontSize: 11, color: '#4d8c4d', fontWeight: 700 }}>No payment needed right now. Focus on the patient.</div>
          </div>
        </div>

        <button onClick={resetFlow} style={{ border: '1px solid #e2e2e2', background: '#fff', color: COLORS.muted, padding: '12px 14px', borderRadius: 999, fontSize: 11, fontWeight: 800, cursor: 'pointer', alignSelf: 'center', marginTop: 2 }}>← Back to Home</button>
      </div>
    </div>
  );

  return (
    <MobileFrame>
      <div style={{ minHeight: '100vh', background: COLORS.bg, paddingBottom: 90, fontFamily: 'Nunito, sans-serif' }}>
        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
          body { font-family: 'Nunito', sans-serif; }
          button, a { -webkit-tap-highlight-color: transparent; }
        `}</style>
        <Header title={flow === 'select' ? '🚑 Ambulance' : flow === 'location' ? (selectedService?.type || 'Ambulance') : '🚑 Ambulance Tracking'} subtitle={flow === 'select' ? 'Select service type' : flow === 'location' ? 'Enter pickup & drop details' : 'Live status updates'} showBack={flow !== 'select'} onBack={() => (flow === 'location' ? setFlow('select') : navigate('/customer/home'))} />
        {flow === 'select' ? renderSelect() : flow === 'location' ? renderLocation() : renderTracking()}
        <SOSButton />
        <BottomNav activeTab="services" />
      </div>
    </MobileFrame>
  );
};

export default AmbulanceService;
