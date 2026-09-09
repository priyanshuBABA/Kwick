import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  BookMarked,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Loader2,
  Plus,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  Wallet,
  Library,
  Home as HomeIcon,
  PackageCheck,
  IndianRupee,
} from 'lucide-react';
import MobileFrame from '../../components/MobileFrame';

const STORAGE_KEY = 'kwickbook-service-listings-v1';
const amberGrad = 'linear-gradient(135deg,#FFD54A,#F5A623)';

const conditionFactor = {
  New: 0.2,
  'Used - Good': 0.15,
  'Used - Fair': 0.1,
};

const baseCatalog = [
  { id: 1, title: 'NCERT Maths Class 8', author: 'NCERT', category: 'School', sub: 'Class 8', mrp: 60, condition: 'New', cover: '📗', rating: 4.9, listingType: 'New', seller: 'Kwick Store', query: 'NCERT Maths Class 8' },
  { id: 2, title: 'NCERT Science Class 8', author: 'NCERT', category: 'School', sub: 'Class 8', mrp: 65, condition: 'New', cover: '📙', rating: 4.8, listingType: 'New', seller: 'Kwick Store', query: 'NCERT Science Class 8' },
  { id: 3, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Novels', sub: 'Fiction', mrp: 299, condition: 'Used - Good', cover: '📕', rating: 4.8, listingType: 'Used', seller: 'Aman T.', query: 'The Alchemist' },
  { id: 4, title: 'Data Structures Using C', author: 'Reema Thareja', category: 'Engineering', sub: 'Computer Science', mrp: 450, condition: 'Used - Fair', cover: '📓', rating: 4.5, listingType: 'Used', seller: 'Kavya N.', query: 'Data Structures Using C' },
  { id: 5, title: 'Concepts of Physics', author: 'H.C. Verma', category: 'Competitive', sub: 'JEE', mrp: 350, condition: 'New', cover: '📔', rating: 4.7, listingType: 'New', seller: 'Kwick Store', query: 'Concepts of Physics' },
  { id: 6, title: 'Indian Polity', author: 'M. Laxmikanth', category: 'Competitive', sub: 'UPSC', mrp: 700, condition: 'Used - Good', cover: '📒', rating: 4.5, listingType: 'Used', seller: 'Priya S.', query: 'Indian Polity' },
  { id: 7, title: 'Engineering Thermodynamics', author: 'P.K. Nag', category: 'Engineering', sub: 'Mechanical', mrp: 700, condition: 'Used - Good', cover: '📖', rating: 4.7, listingType: 'Used', seller: 'Isha M.', query: 'Engineering Thermodynamics' },
  { id: 8, title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Novels', sub: 'Biography', mrp: 275, condition: 'New', cover: '📘', rating: 4.9, listingType: 'New', seller: 'Kwick Store', query: 'Wings of Fire' },
  { id: 9, title: 'Objective Biology', author: 'Dinesh', category: 'Competitive', sub: 'NEET', mrp: 600, condition: 'Used - Good', cover: '📗', rating: 4.8, listingType: 'Used', seller: 'Rohit J.', query: 'Objective Biology' },
  { id: 10, title: 'NCERT English Flamingo', author: 'NCERT', category: 'School', sub: 'Class 12', mrp: 55, condition: 'New', cover: '📙', rating: 4.6, listingType: 'New', seller: 'Kwick Store', query: 'NCERT English Flamingo' },
];

const categories = ['All', 'School', 'Engineering', 'Competitive', 'Novels'];
const subCategoriesMap = {
  All: ['All'],
  School: ['All', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
  Engineering: ['All', 'Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Electronics'],
  Competitive: ['All', 'JEE', 'NEET', 'UPSC', 'GATE', 'SSC / Banking'],
  Novels: ['All', 'Fiction', 'Biography', 'Fantasy', 'Non-fiction'],
};

const durations = [7, 15, 30];

function calculateRentalPrice(mrp, days, condition) {
  const factor = conditionFactor[condition] || 0.12;
  const base = mrp * factor;
  const perDay = base / 30;
  let total = Math.round(perDay * days);
  const cap = Math.round(mrp * 0.4);
  total = Math.min(total, cap);
  return Math.max(total, 10);
}

const BackBar = ({ title, onBack }) => (
  <div className="flex items-center gap-3 px-4 py-4 sticky top-0 z-20 bg-[#FFF9EB]/95 backdrop-blur">
    <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-100 bg-white text-slate-700 shadow-sm">
      <ArrowLeft size={18} />
    </button>
    <h1 className="text-lg font-black text-slate-900">{title}</h1>
  </div>
);

const PrimaryButton = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full rounded-2xl py-3.5 font-black text-slate-900 shadow-lg shadow-amber-400/30 transition active:scale-[0.98] disabled:opacity-40 disabled:shadow-none ${className}`}
    style={{ background: disabled ? '#e2e8f0' : amberGrad }}
  >
    {children}
  </button>
);

const inputClass = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400';

function Discovery({ onOpenBook, onSell }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [subCategory, setSubCategory] = useState('All');
  const [mode, setMode] = useState('All');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setListings(parsed);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    setSubCategory('All');
  }, [category]);

  const allBooks = useMemo(() => [...listings, ...baseCatalog], [listings]);

  const filtered = useMemo(() => {
    return allBooks.filter((book) => {
      const matchQuery = `${book.title} ${book.author} ${book.sub}`.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === 'All' || book.category === category;
      const matchSub = subCategory === 'All' || book.sub === subCategory;
      const matchMode = mode === 'All' || book.listingType === mode;
      return matchQuery && matchCategory && matchSub && matchMode;
    });
  }, [allBooks, category, mode, query, subCategory]);

  const subOptions = subCategoriesMap[category] || ['All'];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FFF9EB] text-slate-900">
      <div className="px-4 pb-4 pt-4">
        <div className="rounded-[2rem] bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: amberGrad }}>
                  <BookMarked size={18} />
                </div>
                KwickBook
              </div>
              <p className="mt-2 text-sm text-slate-500">Buy, rent, or sell books in one place.</p>
            </div>
            <button onClick={onSell} className="rounded-full px-3 py-2 text-xs font-black text-slate-900" style={{ background: amberGrad }}>
              <span className="flex items-center gap-1"><Plus size={13} /> Sell</span>
            </button>
          </div>

          <div className="mt-4 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books, author, class..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-3 py-2 text-sm font-bold whitespace-nowrap ${category === item ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {subOptions.map((item) => (
            <button key={item} onClick={() => setSubCategory(item)} className={`rounded-full border px-3 py-1.5 text-xs font-bold whitespace-nowrap ${subCategory === item ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-200 bg-white text-slate-500'}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 rounded-2xl border border-amber-100 bg-white p-1 shadow-sm">
        <div className="grid grid-cols-3 gap-1">
          {['All', 'New', 'Used'].map((item) => (
            <button key={item} onClick={() => setMode(item)} className={`rounded-xl px-2 py-2 text-xs font-black ${mode === item ? 'bg-amber-400 text-slate-900' : 'text-slate-500'}`}>
              {item === 'All' ? 'All' : item === 'New' ? 'New' : 'Used'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 pb-4 pt-3">
        <div className="mb-2 flex items-center justify-between px-1">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{filtered.length} Books</p>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
            <Sparkles size={13} /> Fresh picks
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {filtered.map((book) => (
            <button key={book.id} onClick={() => onOpenBook(book)} className="rounded-[1.5rem] border border-amber-100 bg-white p-3 text-left shadow-sm">
              <div className="mb-3 flex h-24 items-center justify-center rounded-2xl bg-[#FFF3D6] text-4xl">
                {book.cover}
              </div>
              <p className="line-clamp-2 text-sm font-black text-slate-900">{book.title}</p>
              <p className="mt-1 text-[11px] font-semibold text-slate-400">{book.author}</p>
              <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-amber-500">
                <Star size={11} fill="currentColor" /> {book.rating}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-black text-slate-900">₹{book.mrp}</p>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            No books matched. Try a new search or sell a listing.
          </div>
        )}
      </div>
    </div>
  );
}

function BookDetail({ book, onBack, onBuy, onRent }) {
  const [days, setDays] = useState(15);
  const rentPrice = calculateRentalPrice(book.mrp, days, book.condition);
  const deposit = Math.round(book.mrp * 0.5);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FFF9EB] text-slate-900">
      <BackBar title="Book Details" onBack={onBack} />
      <div className="flex-1 px-4 pb-8">
        <div className="rounded-[2rem] border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex h-28 items-center justify-center rounded-2xl bg-[#FFF3D6] text-6xl">
            {book.cover}
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-900">{book.title}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">by {book.author}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">{book.condition}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{book.sub}</span>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">Buy now</span>
              <span className="text-xl font-black text-slate-900">₹{book.mrp}</span>
            </div>
            <div className="mt-3">
              <PrimaryButton onClick={() => onBuy(book.mrp)}>Buy now · ₹{book.mrp}</PrimaryButton>
            </div>
          </div>
        </div>

        {book.listingType !== 'New' && (
          <div className="mt-4 rounded-[2rem] border-2 border-amber-300 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-lg font-black text-slate-900">
              <BookOpen size={18} className="text-amber-600" /> Rent this book
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-400">Flexible rental pricing based on condition.</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {durations.map((item) => (
                <button key={item} onClick={() => setDays(item)} className={`rounded-xl border px-2 py-2 text-sm font-black ${days === item ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                  {item}d
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-amber-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-500">Rental</span>
                <span className="font-black text-slate-900">₹{rentPrice}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-500">Deposit</span>
                <span className="font-black text-slate-900">₹{deposit}</span>
              </div>
              <div className="mt-3 border-t border-amber-200 pt-3 flex items-center justify-between">
                <span className="font-black text-slate-900">Pay now</span>
                <span className="font-black text-slate-900">₹{rentPrice + deposit}</span>
              </div>
            </div>
            <div className="mt-4">
              <PrimaryButton onClick={() => onRent({ days, rentPrice, deposit, total: rentPrice + deposit })}>Rent for {days} days · ₹{rentPrice + deposit}</PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SellForm({ onBack, onSubmitted }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [mrp, setMrp] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Used - Good');

  const canSubmit = title && author && mrp && price;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FFF9EB] text-slate-900">
      <BackBar title="Sell a Book" onBack={onBack} />
      <div className="flex-1 px-4 pb-28">
        <div className="rounded-[2rem] border border-amber-100 bg-white p-4 shadow-sm">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Book Name</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="e.g. Concepts of Physics" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Author</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} placeholder="e.g. H.C. Verma" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">MRP</label>
                <input value={mrp} onChange={(e) => setMrp(e.target.value.replace(/\D/g, ''))} className={inputClass} placeholder="450" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Your Price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))} className={inputClass} placeholder="200" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Condition</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(conditionFactor).map((item) => (
                  <button key={item} onClick={() => setCondition(item)} className={`rounded-xl border px-2 py-2 text-xs font-black ${condition === item ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 px-2 text-center text-xs font-semibold text-slate-500">Your listing will be reviewed and approved within 24 hours.</p>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-amber-100 bg-white px-4 py-4">
        <PrimaryButton disabled={!canSubmit} onClick={() => {
          const newEntry = {
            id: Date.now(),
            title,
            author,
            category: 'School',
            sub: 'Custom',
            mrp: Number(mrp),
            condition,
            cover: '📚',
            rating: 4.6,
            listingType: 'Used',
            seller: 'You',
            query: `${title} ${author}`,
          };
          const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
          const next = [newEntry, ...saved];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          onSubmitted(next);
        }}>Submit for approval</PrimaryButton>
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
    { id: 'upi', label: 'UPI', desc: 'Google Pay / PhonePe', Icon: Smartphone },
    { id: 'card', label: 'Card', desc: 'Visa / Mastercard', Icon: CreditCard },
    { id: 'cod', label: 'Cash on delivery', desc: 'Pay at doorstep', Icon: Wallet },
  ];

  const upiValid = /^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim());
  const cardValid = cardNum.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCvv.length === 3;
  const canPay = method === 'cod' || (method === 'upi' && upiValid) || (method === 'card' && cardValid);

  const formatCard = (value) => value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const handlePay = () => {
    setError('');
    if (!canPay) {
      setError(method === 'upi' ? 'Enter a valid UPI ID.' : method === 'card' ? 'Check card details.' : '');
      return;
    }
    setStatus('processing');
    setTimeout(() => setStatus('success'), 1400);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FFF9EB] text-slate-900">
      <BackBar title="Payment" onBack={onBack} />
      <div className="flex-1 px-4 pb-28">
        <div className="rounded-[2rem] border border-amber-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <span className="text-sm font-bold text-slate-500">Amount</span>
            <span className="text-2xl font-black text-slate-900">₹{total}</span>
          </div>

          <div className="mt-4 space-y-2">
            {methods.map((item) => {
              const Icon = item.Icon;
              return (
                <button key={item.id} onClick={() => setMethod(item.id)} className={`w-full rounded-2xl border p-3 text-left ${method === item.id ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900">{item.label}</p>
                        <p className="text-xs font-semibold text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 ${method === item.id ? 'border-amber-500' : 'border-slate-300'}`}>
                      {method === item.id && <div className="mx-auto mt-[2px] h-2.5 w-2.5 rounded-full bg-amber-500" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {method === 'upi' && (
            <div className="mt-3 rounded-2xl border border-amber-100 bg-white p-3">
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">UPI ID</label>
              <input value={upiId} onChange={(e) => setUpiId(e.target.value)} className={inputClass} placeholder="yourname@okhdfcbank" />
            </div>
          )}

          {method === 'card' && (
            <div className="mt-3 space-y-3 rounded-2xl border border-amber-100 bg-white p-3">
              <input value={cardNum} onChange={(e) => setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" className={inputClass} />
              <div className="grid grid-cols-2 gap-3">
                <input value={cardExpiry} onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" className={inputClass} />
                <input value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} placeholder="123" className={inputClass} />
              </div>
            </div>
          )}

          {error && <p className="mt-3 text-center text-sm font-bold text-red-500">{error}</p>}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
            <ShieldCheck size={14} className="text-emerald-500" /> Secure payments
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-amber-100 bg-white px-4 py-4">
        <PrimaryButton onClick={handlePay} disabled={status === 'processing'}>{status === 'processing' ? 'Processing...' : `Pay ₹${total}`}</PrimaryButton>
      </div>

      {status === 'processing' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl">
            <Loader2 size={38} className="mx-auto animate-spin text-amber-500" />
            <p className="mt-3 text-sm font-black text-slate-700">Processing your payment...</p>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-[2rem] bg-white p-6 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
              <CheckCircle2 size={34} className="text-white" />
            </div>
            <h3 className="mt-4 text-xl font-black text-slate-900">Payment successful</h3>
            <p className="mt-1 text-sm font-semibold text-slate-500">Your order is being prepared for pickup.</p>
            <button onClick={onPaid} className="mt-5 w-full rounded-2xl py-3 font-black text-slate-900" style={{ background: amberGrad }}>
              Track order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Tracking({ book, onBack }) {
  const steps = [
    { key: 'Pending', label: 'Order confirmed', Icon: PackageCheck },
    { key: 'PickedUp', label: 'Picked from seller', Icon: Truck },
    { key: 'Delivered', label: 'Delivered', Icon: HomeIcon },
  ];
  const [idx, setIdx] = useState(0);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FFF9EB] text-slate-900">
      <BackBar title="Track order" onBack={onBack} />
      <div className="flex-1 px-4 pb-8">
        <div className="rounded-[2rem] border border-amber-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Order #KWB-1001</p>
              <p className="mt-1 text-sm font-black text-slate-900">{book?.title || 'Your book'}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-2 text-amber-700">
              <BookMarked size={18} />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {steps.map((step, index) => {
              const Icon = step.Icon;
              const done = index <= idx;
              return (
                <div key={step.key} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${done ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-400'}`}>
                      <Icon size={18} />
                    </div>
                    {index < steps.length - 1 && <div className={`mt-1 h-8 w-0.5 ${done ? 'bg-amber-400' : 'bg-slate-200'}`} />}
                  </div>
                  <div className="pt-1">
                    <p className={`text-sm font-black ${done ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                    {done && index === idx && <p className="text-xs font-semibold text-amber-600">Current status</p>}
                  </div>
                </div>
              );
            })}
          </div>
          {idx < steps.length - 1 && (
            <button onClick={() => setIdx((value) => Math.min(value + 1, steps.length - 1))} className="mt-4 w-full rounded-2xl border border-amber-200 bg-amber-50 py-3 text-sm font-black text-amber-700">
              Advance demo status
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function KwickBookService() {
  const [screen, setScreen] = useState('discovery');
  const [book, setBook] = useState(null);
  const [payTotal, setPayTotal] = useState(0);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setListings(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSellSubmitted = (nextListings) => {
    setListings(nextListings);
    setScreen('discovery');
  };

  return (
    <MobileFrame>
      <div className="min-h-screen w-full bg-[#FFF9EB]">
        {screen === 'discovery' && (
          <Discovery
            onOpenBook={(selectedBook) => {
              setBook(selectedBook);
              setScreen('detail');
            }}
            onSell={() => setScreen('sell')}
          />
        )}
        {screen === 'detail' && book && (
          <BookDetail
            book={book}
            onBack={() => setScreen('discovery')}
            onBuy={(amount) => {
              setPayTotal(amount);
              setScreen('payment');
            }}
            onRent={(payload) => {
              setPayTotal(payload.total);
              setScreen('payment');
            }}
          />
        )}
        {screen === 'sell' && (
          <SellForm onBack={() => setScreen('discovery')} onSubmitted={handleSellSubmitted} />
        )}
        {screen === 'payment' && (
          <Payment total={payTotal} onBack={() => setScreen('detail')} onPaid={() => setScreen('tracking')} />
        )}
        {screen === 'tracking' && (
          <Tracking book={book} onBack={() => navigate('/customer/home')} />
        )}
      </div>
    </MobileFrame>
  );
}
