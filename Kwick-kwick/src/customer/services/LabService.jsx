import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../../components/MobileFrame';

const style = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --teal: #0a6e6e;
    --teal-dark: #054545;
    --teal-light: #0e9090;
    --gold: #c8972a;
    --gold-light: #e8b84b;
    --cream: #fdf8f0;
    --white: #ffffff;
    --gray-50: #f8fafb;
    --gray-100: #eef2f5;
    --gray-200: #dde4ea;
    --gray-400: #8fa0ad;
    --gray-600: #4a6070;
    --gray-800: #1a2e3a;
    --green: #2e9e6a;
    --shadow-sm: 0 2px 8px rgba(10,110,110,0.08);
    --shadow-md: 0 6px 24px rgba(10,110,110,0.12);
    --radius: 16px;
    --radius-sm: 10px;
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--gray-800); }
  .app { min-height: 100vh; padding-bottom: 2rem; }
  .nav { background: var(--teal-dark); padding: 0 1rem; display: flex; align-items: center; justify-content: space-between; height: 68px; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(0,0,0,0.3); }
  .nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .nav-logo-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .nav-logo-text { color: white; }
  .nav-logo-text strong { display: block; font-size: 1rem; font-weight: 700; }
  .nav-logo-text span { font-size: 0.68rem; opacity: 0.7; letter-spacing: 0.8px; text-transform: uppercase; }
  .nav-links { display: flex; gap: 1rem; }
  .nav-link { color: rgba(255,255,255,0.75); font-size: 0.85rem; cursor: pointer; }
  .nav-link.active { color: var(--gold-light); font-weight: 600; }
  .hero { background: linear-gradient(135deg, var(--teal-dark), var(--teal) 60%, #0d8080); padding: 3rem 1rem 2.5rem; }
  .hero-inner { max-width: 900px; margin: 0 auto; text-align: center; color: white; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(200,151,42,0.2); border: 1px solid rgba(200,151,42,0.4); border-radius: 999px; padding: 6px 14px; font-size: 0.78rem; font-weight: 600; margin-bottom: 1rem; }
  .hero h1 { font-size: clamp(1.8rem, 4.5vw, 2.8rem); font-weight: 800; line-height: 1.2; margin-bottom: 0.8rem; }
  .hero h1 span { color: var(--gold-light); }
  .hero p { color: rgba(255,255,255,0.8); max-width: 650px; margin: 0 auto 1.3rem; line-height: 1.6; font-size: 0.96rem; }
  .hero-cta { display: inline-block; background: var(--gold); color: var(--teal-dark); border: none; border-radius: 999px; padding: 10px 16px; font-weight: 700; cursor: pointer; }
  .section { padding: 1.4rem 1rem 0; max-width: 1100px; margin: 0 auto; }
  .section-title { font-size: 1.3rem; font-weight: 800; color: var(--teal-dark); margin-bottom: 0.3rem; }
  .section-sub { color: var(--gray-400); font-size: 0.86rem; margin-bottom: 1rem; }
  .steps-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.8rem; }
  .step-card { background: white; border-radius: 14px; padding: 0.9rem; box-shadow: var(--shadow-sm); }
  .step-num { width: 30px; height: 30px; border-radius: 50%; background: var(--teal); color: white; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; margin-bottom: 0.5rem; }
  .step-card h3 { font-size: 0.9rem; font-weight: 700; margin-bottom: 0.3rem; }
  .step-card p { font-size: 0.76rem; color: var(--gray-400); line-height: 1.4; }
  .pkg-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
  .pkg-card { background: white; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); border: 1.5px solid transparent; display: flex; flex-direction: column; }
  .pkg-card.popular { border-color: var(--gold); }
  .pkg-ribbon { background: var(--gold); color: var(--teal-dark); text-align: center; font-size: 0.72rem; font-weight: 700; padding: 5px; letter-spacing: 0.5px; }
  .pkg-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.8rem; flex: 1; }
  .pkg-name { font-size: 1rem; font-weight: 800; color: var(--teal-dark); }
  .pkg-tag { display: inline-block; background: #e6f5f5; color: var(--teal); border-radius: 999px; padding: 2px 8px; width: fit-content; font-size: 0.72rem; font-weight: 700; }
  .pkg-tests { color: var(--gray-600); font-size: 0.82rem; line-height: 1.5; }
  .pkg-price-row { display: flex; align-items: baseline; gap: 8px; }
  .pkg-old { color: var(--gray-400); text-decoration: line-through; font-size: 0.92rem; }
  .pkg-new { font-size: 1.25rem; font-weight: 800; color: var(--teal-dark); }
  .pkg-btns { display: flex; gap: 0.6rem; margin-top: auto; }
  .pkg-btn { flex: 1; border: none; border-radius: 10px; padding: 10px; font-weight: 700; cursor: pointer; }
  .pkg-btn.primary { background: var(--teal); color: white; }
  .pkg-btn.secondary { background: #f0f7f7; color: var(--teal); }
  .pkg-tests-list { list-style: none; display: flex; flex-direction: column; gap: 0.45rem; padding: 0.75rem; background: var(--gray-50); border-radius: 10px; border: 1px solid var(--gray-100); }
  .pkg-tests-list li { font-size: 0.78rem; color: var(--gray-600); display: flex; gap: 6px; }
  .pkg-tests-list li::before { content: '✓'; color: var(--green); font-weight: 700; }
  .builder-banner { margin-top: 1.2rem; background: linear-gradient(120deg, var(--gold-light), var(--gold)); border-radius: 16px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  .builder-text h3 { font-size: 1rem; font-weight: 800; color: var(--teal-dark); margin-bottom: 0.25rem; }
  .builder-text p { font-size: 0.8rem; color: var(--teal-dark); opacity: 0.85; }
  .builder-btn { background: var(--teal-dark); color: white; border: none; border-radius: 10px; padding: 10px 14px; font-weight: 700; cursor: pointer; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.54); z-index: 200; display: flex; align-items: flex-start; justify-content: center; padding: 1rem; overflow-y: auto; }
  .modal { background: white; border-radius: 20px; width: 100%; max-width: 640px; box-shadow: 0 24px 80px rgba(0,0,0,0.3); }
  .modal-header { background: linear-gradient(135deg, var(--teal-dark), var(--teal)); color: white; padding: 1rem 1.2rem; border-radius: 20px 20px 0 0; display: flex; align-items: center; justify-content: space-between; }
  .modal-header h2 { font-size: 1.1rem; font-weight: 800; }
  .modal-close { background: rgba(255,255,255,0.15); color: white; border: none; border-radius: 50%; width: 34px; height: 34px; cursor: pointer; }
  .modal-body { padding: 1rem; }
  .steps { display: flex; align-items: center; gap: 0; margin-bottom: 1rem; }
  .step { display: flex; align-items: center; gap: 6px; flex: 1; }
  .step-circle { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; border: 2px solid var(--gray-200); color: var(--gray-400); }
  .step-circle.done { background: var(--teal); border-color: var(--teal); color: white; }
  .step-circle.active { border-color: var(--teal); color: var(--teal); }
  .step-label { font-size: 0.68rem; color: var(--gray-400); }
  .step-label.active { color: var(--teal); font-weight: 700; }
  .step-line { flex: 1; height: 2px; background: var(--gray-200); margin: 0 4px; }
  .step-line.done { background: var(--teal); }
  .doctor-info-strip { display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: var(--gray-50); border-radius: var(--radius-sm); margin-bottom: 1rem; border: 1px solid var(--gray-100); }
  .doc-ava-sm { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--teal-dark), var(--teal)); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
  .doc-info-sm h3 { font-size: 0.95rem; font-weight: 700; color: var(--gray-800); }
  .doc-info-sm p { font-size: 0.78rem; color: var(--gray-400); margin-top: 2px; }
  .doc-fee-sm { margin-left: auto; text-align: right; }
  .doc-fee-sm .fee-val { font-size: 1.02rem; font-weight: 800; color: var(--teal-dark); }
  .doc-fee-sm .fee-lbl { font-size: 0.68rem; color: var(--gray-400); }
  .form-section { margin-bottom: 1rem; }
  .form-label { display: block; font-size: 0.78rem; font-weight: 700; color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.6rem; }
  .form-input { width: 100%; border: 1.5px solid var(--gray-200); border-radius: 10px; padding: 10px 12px; font-size: 0.92rem; color: var(--gray-800); outline: none; background: white; }
  .form-input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(10,110,110,0.1); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
  .form-row-3 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.8rem; }
  .dates-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
  .date-btn { border: 1.5px solid var(--gray-200); background: white; border-radius: 10px; padding: 7px 4px; text-align: center; cursor: pointer; }
  .date-btn.active { background: var(--teal); border-color: var(--teal); color: white; }
  .date-day { font-size: 0.62rem; opacity: 0.7; }
  .date-num { font-size: 0.9rem; font-weight: 700; }
  .slots-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  .slot-btn { border: 1.5px solid var(--gray-200); background: white; border-radius: 8px; padding: 8px 6px; cursor: pointer; font-size: 0.76rem; text-align: center; color: var(--gray-600); }
  .slot-btn.active { background: var(--teal); border-color: var(--teal); color: white; font-weight: 700; }
  .toggle-row { display: flex; align-items: center; justify-content: space-between; border: 1.5px solid var(--gray-200); border-radius: 10px; padding: 10px 12px; cursor: pointer; }
  .toggle-row.active { border-color: var(--gold); background: #fef9ef; }
  .toggle-row-text strong { display: block; font-size: 0.86rem; color: var(--gray-800); }
  .toggle-row-text span { font-size: 0.74rem; color: var(--gray-400); }
  .toggle-switch { width: 42px; height: 24px; border-radius: 999px; background: var(--gray-200); position: relative; }
  .toggle-switch.on { background: var(--gold); }
  .toggle-knob { width: 18px; height: 18px; border-radius: 50%; background: white; position: absolute; top: 3px; left: 3px; transition: left 0.2s; }
  .toggle-switch.on .toggle-knob { left: 21px; }
  .payment-box { border: 1.5px solid var(--gray-200); border-radius: 12px; overflow: hidden; }
  .payment-methods { display: flex; gap: 6px; padding: 0.8rem; }
  .pay-method { flex: 1; border: 1.5px solid var(--gray-200); border-radius: 8px; padding: 8px 6px; text-align: center; cursor: pointer; }
  .pay-method.active { border-color: var(--teal); background: #e6f5f5; }
  .pay-method-icon { font-size: 1.15rem; display: block; }
  .pay-method-label { font-size: 0.7rem; color: var(--gray-600); margin-top: 4px; }
  .pay-detail { padding: 0.8rem; border-top: 1px solid var(--gray-100); }
  .fee-summary { background: var(--gray-50); border-radius: 10px; padding: 0.9rem; margin: 0.9rem 0; }
  .fee-row { display: flex; justify-content: space-between; font-size: 0.82rem; padding: 3px 0; }
  .fee-row.total { font-weight: 700; font-size: 0.95rem; color: var(--teal-dark); border-top: 1px solid var(--gray-200); padding-top: 8px; margin-top: 4px; }
  .confirm-btn { width: 100%; background: linear-gradient(135deg, var(--teal-dark), var(--teal)); color: white; border: none; border-radius: 12px; padding: 12px; font-size: 0.95rem; font-weight: 700; cursor: pointer; }
  .confirm-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .ghost-btn { width: auto; background: var(--gray-200); color: var(--gray-600); }
  .success-screen { text-align: center; padding: 2rem 1rem; }
  .success-icon { width: 78px; height: 78px; border-radius: 50%; background: linear-gradient(135deg, var(--green), #3dc47a); display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 0.9rem; color: white; }
  .success-screen h2 { font-size: 1.4rem; font-weight: 800; color: var(--teal-dark); margin-bottom: 0.35rem; }
  .success-screen p { color: var(--gray-400); font-size: 0.9rem; margin-bottom: 1.1rem; }
  .booking-ref { background: var(--gray-50); border: 1.5px dashed var(--teal); padding: 0.8rem 1rem; border-radius: 12px; display: inline-block; margin-bottom: 1rem; }
  .booking-ref p { font-size: 0.76rem; color: var(--gray-400); margin-bottom: 4px; }
  .booking-ref strong { font-size: 1.1rem; color: var(--teal-dark); font-weight: 800; letter-spacing: 1px; }
  .empty-state { text-align: center; padding: 3rem 1rem; color: var(--gray-400); }
  .empty-state .icon { font-size: 2.8rem; margin-bottom: 0.8rem; }
  @media (max-width: 700px) {
    .steps-grid { grid-template-columns: 1fr 1fr; }
    .form-row, .form-row-3 { grid-template-columns: 1fr; }
    .dates-grid { grid-template-columns: repeat(4, 1fr); }
    .nav-links { display: none; }
  }
`;

const PACKAGES = [
  { id: 1, name: 'Basic Health Package', icon: '🟢', tagline: 'Routine Checkup', count: 24, oldPrice: 999, price: 499, popular: false, included: ['CBC', 'Blood Sugar', 'Kidney Function Test', 'Lipid Profile'] },
  { id: 2, name: 'Comprehensive Advanced Package', icon: '🟡', tagline: 'Most Popular', count: 50, oldPrice: 1999, price: 999, popular: true, included: ['All Basic Tests', 'LFT', 'Thyroid Profile', 'Urine Routine'] },
  { id: 3, name: 'Premium Full Body Care', icon: '🔴', tagline: 'Senior Citizen Special', count: 70, oldPrice: 2999, price: 1499, popular: false, included: ['Advanced Package Tests', 'Vitamin D3', 'Vitamin B12', 'Iron Profile'] },
];

const INDIVIDUAL_TESTS = [
  { id: 't1', category: 'Diabetes & Metabolism', name: 'Blood Glucose (Fasting / PP)', price: 60 },
  { id: 't2', category: 'Diabetes & Metabolism', name: 'HbA1c (Glycated Haemoglobin)', price: 280 },
  { id: 't3', category: 'Monsoon & Seasonal Fevers', name: 'Widal Test (Typhoid)', price: 180 },
  { id: 't4', category: 'Monsoon & Seasonal Fevers', name: 'Dengue NS1 / IgM / IgG', price: 550 },
  { id: 't5', category: 'Monsoon & Seasonal Fevers', name: 'Malaria Smear (MP)', price: 120 },
  { id: 't6', category: 'Vital Organs & Bone Health', name: 'Lipid Profile (Complete Heart Risk)', price: 350 },
  { id: 't7', category: 'Vital Organs & Bone Health', name: 'Liver Function Test (LFT)', price: 350 },
  { id: 't8', category: 'Vital Organs & Bone Health', name: 'Kidney Function Test (KFT/KRE)', price: 350 },
  { id: 't9', category: 'Vital Organs & Bone Health', name: 'Thyroid Profile (T3, T4, TSH)', price: 300 },
];

const getDates = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({ day: days[d.getDay()], num: d.getDate(), full: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) });
  }
  return dates;
};

const TIME_SLOTS = ['6:00-7:00 AM', '7:00-8:00 AM', '8:00-9:00 AM', '9:00-10:00 AM'];

export default function LabService() {
  const navigate = useNavigate();
  const [expandedPkg, setExpandedPkg] = useState(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [customSelected, setCustomSelected] = useState([]);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [ckStep, setCkStep] = useState(1);
  const [ckForm, setCkForm] = useState({ name: '', age: '', gender: 'Male', address: '', city: 'Munger' });
  const [ckDate, setCkDate] = useState(null);
  const [ckSlot, setCkSlot] = useState(null);
  const [hardCopy, setHardCopy] = useState(false);
  const [ckPayMethod, setCkPayMethod] = useState('upi');
  const [ckConfirmed, setCkConfirmed] = useState(false);
  const [ckRef, setCkRef] = useState('');
  const [ckProcessing, setCkProcessing] = useState(false);
  const dates = getDates();

  const customTotal = customSelected.reduce((sum, t) => sum + t.price, 0);
  const openCheckupBooking = (pkg) => {
    setSelectedPkg(pkg);
    setCkStep(1);
    setCkDate(null);
    setCkSlot(null);
    setHardCopy(false);
    setCkConfirmed(false);
    setCkForm({ name: '', age: '', gender: 'Male', address: '', city: 'Munger' });
  };
  const closeCkModal = () => setSelectedPkg(null);
  const toggleCustomTest = (test) => {
    setCustomSelected((prev) => (prev.find((t) => t.id === test.id) ? prev.filter((t) => t.id !== test.id) : [...prev, test]));
  };
  const proceedWithCustom = () => {
    if (customSelected.length === 0) return;
    setBuilderOpen(false);
    openCheckupBooking({ name: 'Custom Test Selection', price: customTotal, icon: '📝', included: customSelected.map((t) => `${t.name} (₹${t.price})`) });
  };
  const ckTotal = (selectedPkg && selectedPkg.price ? selectedPkg.price : 0) + (hardCopy ? 35 : 0);
  const handleCkConfirm = () => {
    if (!ckForm.name || !ckForm.age || !ckForm.address || !ckDate || !ckSlot) return;
    setCkProcessing(true);
    window.setTimeout(() => {
      setCkRef(`LAB${Math.floor(100000 + Math.random() * 900000)}`);
      setCkConfirmed(true);
      setCkProcessing(false);
    }, 1500);
  };

  return (
    <MobileFrame>
      <style>{style}</style>
      <div className="app">
        <nav className="nav">
          <div className="nav-logo" onClick={() => navigate('/customer/home')}>
            <div className="nav-logo-icon">🧪</div>
            <div className="nav-logo-text">
              <strong>Lab Tests</strong>
              <span>Home Collection</span>
            </div>
          </div>
          <div className="nav-links">
            <span className="nav-link" onClick={() => navigate('/customer/doctor')}>Doctors</span>
            <span className="nav-link active">Labs</span>
            <span className="nav-link" onClick={() => navigate('/customer/home')}>Home</span>
          </div>
        </nav>

        <div className="hero">
          <div className="hero-inner">
            <div className="hero-badge">⭐ Verified phlebotomist • Doorstep sample collection</div>
            <h1>Ghar baithe <span>lab test</span> karwayen</h1>
            <p>Trusted technicians aapke ghar aakar sample collect karenge. Reports WhatsApp aur app mein aapke paas honge.</p>
            <button className="hero-cta" onClick={() => document.getElementById('pkg-section')?.scrollIntoView({ behavior: 'smooth' })}>📦 Book Home Test Now</button>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Kaise kaam karta hai</div>
          <div className="section-sub">4 simple steps mein apna test book karen</div>
          <div className="steps-grid">
            {[
              { n: 1, title: 'Package Chunen', desc: 'Apni zaroorat ke anusaar package ya individual tests select karen.' },
              { n: 2, title: 'Slot Book Karen', desc: 'Subah ke khali pet test ke liye time slot chunen.' },
              { n: 3, title: 'Sample Collection', desc: 'Verified technician ghar aakar sample collect karega.' },
              { n: 4, title: 'Report Milegi', desc: 'PDF report WhatsApp aur dashboard par share ki jayegi.' },
            ].map((s) => (
              <div className="step-card" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section" id="pkg-section">
          <div className="section-title">Health Checkup Packages</div>
          <div className="section-sub">Discounted prices, doorstep collection and instant confirmation</div>
          <div className="pkg-grid">
            {PACKAGES.map((p) => (
              <div className={`pkg-card ${p.popular ? 'popular' : ''}`} key={p.id}>
                {p.popular && <div className="pkg-ribbon">⭐ MOST POPULAR</div>}
                <div className="pkg-body">
                  <div style={{ fontSize: '1.6rem' }}>{p.icon}</div>
                  <div className="pkg-name">{p.name}</div>
                  <span className="pkg-tag">{p.tagline} • {p.count}+ Tests</span>
                  {expandedPkg === p.id && (
                    <ul className="pkg-tests-list">
                      {p.included.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}
                  <div className="pkg-price-row">
                    <span className="pkg-old">₹{p.oldPrice}</span>
                    <span className="pkg-new">₹{p.price}</span>
                  </div>
                  <div className="pkg-tests">Doorstep phlebotomist, verified technician, fast report delivery.</div>
                  <div className="pkg-btns">
                    <button className="pkg-btn secondary" onClick={() => setExpandedPkg(expandedPkg === p.id ? null : p.id)}>{expandedPkg === p.id ? 'Chupayen ▲' : 'Tests Dekhein ▼'}</button>
                    <button className="pkg-btn primary" onClick={() => openCheckupBooking({ name: p.name, price: p.price, icon: p.icon, included: p.included })}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="builder-banner">
            <div className="builder-text">
              <h3>🧪 Apna Test Khud Chunen</h3>
              <p>Doctor ne specific test likha hai? Individual tests select karen aur sirf unhi ka payment karen.</p>
            </div>
            <button className="builder-btn" onClick={() => setBuilderOpen(true)}>+ Tests Select Karen</button>
          </div>
        </div>

        {selectedPkg && (
          <div className="modal-overlay" onClick={closeCkModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              {ckConfirmed ? (
                <div className="success-screen">
                  <div className="success-icon">✓</div>
                  <h2>Test Book Ho Gaya!</h2>
                  <p>Verified technician ki details SMS/WhatsApp par bheji ja rahi hain.</p>
                  <div className="booking-ref"><p>Booking Reference</p><strong>{ckRef}</strong></div>
                  <div className="success-screen" style={{ padding: 0 }}>
                    <div className="success-details" style={{ textAlign: 'left', background: 'var(--gray-50)', borderRadius: 12, padding: '0.8rem' }}>
                      <div className="fee-row"><span>Package</span><span>{selectedPkg.name}</span></div>
                      <div className="fee-row"><span>Patient</span><span>{ckForm.name}, {ckForm.age} yrs</span></div>
                      <div className="fee-row"><span>Address</span><span>{ckForm.address}, {ckForm.city}</span></div>
                      <div className="fee-row"><span>Date & Slot</span><span>{ckDate}, {ckSlot}</span></div>
                      <div className="fee-row"><span>Amount Paid</span><span style={{ color: 'var(--green)' }}>₹{ckTotal} ✓</span></div>
                    </div>
                  </div>
                  <button className="confirm-btn" onClick={closeCkModal}>Theek Hai, Done!</button>
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <div>
                      <h2>Lab Test Book Karen</h2>
                      <div style={{ fontSize: '0.76rem', opacity: 0.7, marginTop: '2px' }}>Step {ckStep} of 3</div>
                    </div>
                    <button className="modal-close" onClick={closeCkModal}>✕</button>
                  </div>
                  <div className="modal-body">
                    <div className="steps">
                      {['Patient & Slot', 'Address', 'Payment'].map((s, i) => (
                        <span key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                          <span className="step">
                            <span className={`step-circle ${ckStep > i + 1 ? 'done' : ckStep === i + 1 ? 'active' : ''}`}>{ckStep > i + 1 ? '✓' : i + 1}</span>
                            <span className={`step-label ${ckStep === i + 1 ? 'active' : ''}`}>{s}</span>
                          </span>
                          {i < 2 && <span className={`step-line ${ckStep > i + 1 ? 'done' : ''}`} />}
                        </span>
                      ))}
                    </div>

                    <div className="doctor-info-strip" style={{ flexWrap: 'wrap' }}>
                      <div className="doc-ava-sm">{selectedPkg.icon}</div>
                      <div className="doc-info-sm">
                        <h3>{selectedPkg.name}</h3>
                        <p>{selectedPkg.included ? selectedPkg.included.length : 0} Tests • Home Collection</p>
                      </div>
                      <div className="doc-fee-sm">
                        <div className="fee-val">₹{selectedPkg.price}</div>
                        <div className="fee-lbl">Total Fee</div>
                      </div>
                      {selectedPkg.included && (
                        <ul className="pkg-tests-list" style={{ width: '100%', marginTop: '10px' }}>
                          {selectedPkg.included.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      )}
                    </div>

                    {ckStep === 1 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">👤 Patient Ki Jaankari</label>
                          <div className="form-row-3">
                            <input className="form-input" placeholder="Poora Naam *" value={ckForm.name} onChange={(e) => setCkForm({ ...ckForm, name: e.target.value })} />
                            <input className="form-input" placeholder="Umar *" type="number" value={ckForm.age} onChange={(e) => setCkForm({ ...ckForm, age: e.target.value })} />
                            <select className="form-input" value={ckForm.gender} onChange={(e) => setCkForm({ ...ckForm, gender: e.target.value })}>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-section">
                          <label className="form-label">📅 Date Chunen</label>
                          <div className="dates-grid">
                            {dates.map((d) => (
                              <div key={d.num} className={`date-btn ${ckDate === d.full ? 'active' : ''}`} onClick={() => setCkDate(d.full)}>
                                <div className="date-day">{d.day}</div>
                                <div className="date-num">{d.num}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="form-section">
                          <label className="form-label">⏰ Subah Ka Time Slot</label>
                          <div className="slots-grid">
                            {TIME_SLOTS.map((s) => (
                              <div key={s} className={`slot-btn ${ckSlot === s ? 'active' : ''}`} onClick={() => setCkSlot(s)}>{s}</div>
                            ))}
                          </div>
                        </div>
                        <button className="confirm-btn" disabled={!ckForm.name || !ckForm.age || !ckDate || !ckSlot} onClick={() => setCkStep(2)}>Aage Badhein →</button>
                      </>
                    )}

                    {ckStep === 2 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">🏠 Sample Collection Address</label>
                          <select className="form-input" style={{ marginBottom: '10px' }} value={ckForm.city} onChange={(e) => setCkForm({ ...ckForm, city: e.target.value })}>
                            <option>Munger</option>
                            <option>Jamalpur</option>
                            <option>Bhagalpur</option>
                          </select>
                          <textarea className="form-input" style={{ resize: 'vertical', minHeight: '80px' }} placeholder="Poora address likhen (ghar number, mohalla, landmark) *" value={ckForm.address} onChange={(e) => setCkForm({ ...ckForm, address: e.target.value })} />
                        </div>
                        <div className="form-section">
                          <label className="form-label">📄 Report Delivery</label>
                          <div className={`toggle-row ${hardCopy ? 'active' : ''}`} onClick={() => setHardCopy(!hardCopy)}>
                            <div className="toggle-row-text">
                              <strong>Printed hard copy ghar par chahiye?</strong>
                              <span>{hardCopy ? '₹35 delivery charge add hoga' : 'Virtual PDF free hai — WhatsApp aur dashboard par'}</span>
                            </div>
                            <div className={`toggle-switch ${hardCopy ? 'on' : ''}`}><div className="toggle-knob" /></div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button className="confirm-btn ghost-btn" onClick={() => setCkStep(1)}>← Wapas</button>
                          <button className="confirm-btn" disabled={!ckForm.address} onClick={() => setCkStep(3)}>Payment Karen →</button>
                        </div>
                      </>
                    )}

                    {ckStep === 3 && (
                      <>
                        <div className="form-section">
                          <label className="form-label">💳 Payment Tarika Chunen</label>
                          <div className="payment-box">
                            <div className="payment-methods">
                              {[{ id: 'upi', icon: '📱', label: 'UPI' }, { id: 'card', icon: '💳', label: 'Card' }, { id: 'cash', icon: '💵', label: 'Cash' }].map((m) => (
                                <div key={m.id} className={`pay-method ${ckPayMethod === m.id ? 'active' : ''}`} onClick={() => setCkPayMethod(m.id)}>
                                  <span className="pay-method-icon">{m.icon}</span>
                                  <div className="pay-method-label">{m.label}</div>
                                </div>
                              ))}
                            </div>
                            <div className="pay-detail">
                              {ckPayMethod === 'upi' && <input className="form-input" placeholder="UPI ID dalein (jaise: name@upi)" />} 
                              {ckPayMethod === 'card' && <input className="form-input" placeholder="Card Number" />}
                              {ckPayMethod === 'cash' && <div style={{ fontSize: '0.84rem', color: 'var(--gray-600)', padding: '8px 0' }}>✅ Booking confirm hogi, payment technician ko sample dete waqt denge.</div>}
                            </div>
                          </div>
                        </div>
                        <div className="fee-summary">
                          <div className="fee-row"><span>Package Fee</span><span>₹{selectedPkg.price || 0}</span></div>
                          <div className="fee-row"><span>Home Collection</span><span style={{ color: 'var(--green)' }}>Free</span></div>
                          <div className="fee-row"><span>Hard Copy Delivery</span><span>{hardCopy ? '₹35' : '₹0'}</span></div>
                          <div className="fee-row total"><span>Kul Rakam</span><span>₹{ckTotal}</span></div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button className="confirm-btn ghost-btn" onClick={() => setCkStep(2)}>← Wapas</button>
                          <button className="confirm-btn" onClick={handleCkConfirm} disabled={ckProcessing}>{ckProcessing ? '⏳ Processing...' : `₹${ckTotal} Pay Karke Confirm Karen ✓`}</button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {builderOpen && (
          <div className="modal-overlay" onClick={() => setBuilderOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2>🧪 Apne Test Chunen</h2>
                  <div style={{ fontSize: '0.76rem', opacity: 0.7, marginTop: '2px' }}>Jo zaroorat ho wahi select karen</div>
                </div>
                <button className="modal-close" onClick={() => setBuilderOpen(false)}>✕</button>
              </div>
              <div className="modal-body">
                {[...new Set(INDIVIDUAL_TESTS.map((t) => t.category))].map((cat) => (
                  <div key={cat} style={{ marginBottom: '0.9rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--teal-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.6rem', paddingBottom: '0.25rem', borderBottom: '1px solid var(--gray-100)' }}>{cat}</div>
                    {INDIVIDUAL_TESTS.filter((t) => t.category === cat).map((t) => {
                      const checked = !!customSelected.find((c) => c.id === t.id);
                      return (
                        <div key={t.id} className={`toggle-row ${checked ? 'active' : ''}`} onClick={() => toggleCustomTest(t)} style={{ marginBottom: '0.45rem' }}>
                          <div className="toggle-row-text">
                            <strong>{t.name}</strong>
                            <span>{t.category}</span>
                          </div>
                          <div style={{ fontWeight: 800, color: 'var(--teal-dark)' }}>₹{t.price}</div>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div className="fee-summary">
                  <div className="fee-row"><span><strong>{customSelected.length}</strong> tests select kiye</span><span>₹{customTotal}</span></div>
                </div>
                <button className="confirm-btn" disabled={customSelected.length === 0} onClick={proceedWithCustom}>Continue → Slot Book Karen</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}
