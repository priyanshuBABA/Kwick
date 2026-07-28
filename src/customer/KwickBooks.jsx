import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Star,
  Upload,
  Zap,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Wallet,
  CheckCircle2,
  Loader2,
  Truck,
  PackageCheck,
  Home as HomeIcon,
  Plus,
  Sparkles,
  BadgeCheck,
  RefreshCcw,
} from 'lucide-react';
import MobileFrame from '../components/MobileFrame';
import BottomNav from '../components/BottomNav';
import { Home, ShoppingBag, Grid, User } from 'lucide-react';

const amberGrad = 'linear-gradient(135deg,#FFD54A,#F5A623)';

const Logo = ({ size = 28 }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center rounded-2xl shadow-sm" style={{ width: size, height: size, background: amberGrad }}>
      <Zap className="text-slate-900" style={{ width: size * 0.55, height: size * 0.55 }} fill="currentColor" />
    </div>
    <span className="font-black tracking-tight text-slate-900" style={{ fontSize: size * 0.62 }}>
      Kwick<span className="text-amber-400">.</span>
      <span className="text-slate-400" style={{ fontSize: size * 0.42 }}>
        Books
      </span>
    </span>
  </div>
);

const conditionFactor = { New: 0.2, 'Used - Good': 0.15, 'Used - Fair': 0.1 };

function calculateRentalPrice(mrp, days, factor) {
  const base = mrp * factor;
  const perDay = base / 30;
  let total = Math.round(perDay * days);
  const cap = Math.round(mrp * 0.4);
  total = Math.min(total, cap);
  return Math.max(total, 10);
}

const categories = ['All', 'School', 'Engineering', 'Novels', 'Competitive'];
const schoolBoards = ['All', 'CBSE', 'ICSE', 'State Board', 'NCERT'];
const classOptions = ['All', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const subjectOptions = ['All', 'Maths', 'Science', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography'];

const books = [
  { id: 1, title: 'NCERT Physics Class 12', author: 'NCERT', category: 'School', school: 'CBSE', class: 'Class 12', subject: 'Physics', subtopic: 'Electricity', mrp: 250, condition: 'Used - Good', cover: '📘', rating: 4.6, listingType: 'Used', seller: 'Ravi K.' },
  { id: 2, title: 'NCERT Maths Class 10', author: 'NCERT', category: 'School', school: 'CBSE', class: 'Class 10', subject: 'Maths', subtopic: 'Algebra', mrp: 220, condition: 'New', cover: '📗', rating: 4.8, listingType: 'New', seller: 'Kwick Store' },
  { id: 3, title: 'Concepts of Physics Vol 1', author: 'H.C. Verma', category: 'Competitive', school: 'JEE', class: 'Competitive', subject: 'Physics', subtopic: 'Mechanics', mrp: 450, condition: 'Used - Fair', cover: '📙', rating: 4.9, listingType: 'Used', seller: 'Priya S.' },
  { id: 4, title: 'Data Structures & Algorithms', author: 'Narasimha Karumanchi', category: 'Engineering', school: 'Engineering', class: 'Engineering', subject: 'Computer Science', subtopic: 'Arrays', mrp: 500, condition: 'New', cover: '📓', rating: 4.5, listingType: 'New', seller: 'Kwick Store' },
  { id: 5, title: 'Wren & Martin Grammar', author: 'P.C. Wren', category: 'School', school: 'ICSE', class: 'Class 8', subject: 'English', subtopic: 'Grammar', mrp: 220, condition: 'New', cover: '📔', rating: 4.6, listingType: 'New', seller: 'Kwick Store' },
  { id: 6, title: 'Objective Mathematics', author: 'R.D. Sharma', category: 'Competitive', school: 'SSC / Banking', class: 'Competitive', subject: 'Maths', subtopic: 'Quant', mrp: 550, condition: 'Used - Good', cover: '📘', rating: 4.7, listingType: 'Used', seller: 'Sneha R.' },
  { id: 7, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Novels', school: 'General', class: 'General', subject: 'Fiction', subtopic: 'Adventure', mrp: 299, condition: 'Used - Good', cover: '📕', rating: 4.8, listingType: 'Used', seller: 'Aman T.' },
  { id: 8, title: 'Let Us C', author: 'Yashavant Kanetkar', category: 'Engineering', school: 'Engineering', class: 'Engineering', subject: 'Programming', subtopic: 'C Basics', mrp: 350, condition: 'Used - Fair', cover: '📒', rating: 4.3, listingType: 'Used', seller: 'Vikas P.' },
];

const BackBar = ({ title, onBack }) => (
  <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#FFFBF2]/90 px-4 py-4 backdrop-blur sm:px-5 sm:pt-6">
    <button onClick={onBack} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-100 bg-white text-slate-500 shadow-sm">
      <ArrowLeft size={17} />
    </button>
    <h1 className="truncate text-lg font-black text-slate-900">{title}</h1>
  </div>
);

const PrimaryButton = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full rounded-xl py-3.5 font-bold text-slate-900 shadow-lg shadow-amber-400/30 transition-transform active:scale-[0.98] disabled:opacity-40 disabled:shadow-none ${className}`}
    style={{ background: disabled ? '#e2e8f0' : amberGrad }}
  >
    {children}
  </button>
);

const inputClass = 'w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-amber-400';

function Discovery({ onOpenBook, onSell }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [board, setBoard] = useState('All');
  const [classLevel, setClassLevel] = useState('All');
  const [subject, setSubject] = useState('All');
  const [subtopic, setSubtopic] = useState('All');
  const [mode, setMode] = useState('All');

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const haystack = `${b.title} ${b.author} ${b.school || ''} ${b.class || ''} ${b.subject || ''} ${b.subtopic || ''}`.toLowerCase();
      return (
        (cat === 'All' || b.category === cat) &&
        (board === 'All' || b.school === board) &&
        (classLevel === 'All' || b.class === classLevel) &&
        (subject === 'All' || b.subject === subject) &&
        (subtopic === 'All' || b.subtopic === subtopic) &&
        (mode === 'All' || b.listingType === mode) &&
        haystack.includes(query.toLowerCase())
      );
    });
  }, [board, cat, classLevel, mode, query, subject, subtopic]);

  const availableSubjects = useMemo(() => {
    const candidates = books.filter((b) => (cat === 'All' || b.category === cat) && (board === 'All' || b.school === board));
    return ['All', ...new Set(candidates.map((b) => b.subject).filter(Boolean))];
  }, [board, cat]);

  const availableSubtopics = useMemo(() => {
    const candidates = books.filter((b) => {
      return (cat === 'All' || b.category === cat) && (board === 'All' || b.school === board) && (classLevel === 'All' || b.class === classLevel) && (subject === 'All' || b.subject === subject);
    });
    return ['All', ...new Set(candidates.map((b) => b.subtopic).filter(Boolean))];
  }, [board, cat, classLevel, subject]);

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-24">
      <div className="relative overflow-hidden px-4 pb-6 pt-6 sm:px-5 sm:pt-8 lg:px-6">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: amberGrad }} />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Logo size={28} />
            <button onClick={onSell} className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black text-slate-900 shadow-sm" style={{ background: amberGrad }}>
              <Plus size={14} /> Sell a Book
            </button>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
                Buy less.
                <br />
                Rent smart. Save more.
              </h1>
              <p className="mt-2 text-sm text-slate-500">School books, classes, subjects and subtopics — all in one place.</p>

              <div className="relative mt-5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, school, class, topic"
                  className="w-full rounded-2xl border border-amber-100 bg-white py-3.5 pl-11 pr-4 text-slate-800 shadow-sm outline-none placeholder-slate-400 focus:border-amber-400"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-white/80 p-3 shadow-sm">
              <div className="rounded-xl bg-amber-50 p-3 text-sm font-black text-slate-900">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-amber-600" /> Find books by school, class, subject & subtopic
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-500">CBSE, ICSE, class 8 to 12, maths/science/english and chapter-wise topics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-5 lg:px-6">
        <div className="mb-3 flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors ${cat === c ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-500'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mb-2 flex flex-col gap-2 rounded-2xl border border-amber-100 bg-white p-1.5 sm:flex-row">
          {[
            { id: 'All', label: 'All Books' },
            { id: 'New', label: '🆕 New (Buy)' },
            { id: 'Used', label: '♻️ Pre-Owned (Buy/Rent)' },
          ].map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)} className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-colors sm:text-sm ${mode === m.id ? 'bg-amber-400 text-slate-900' : 'text-slate-400'}`}>
              {m.label}
            </button>
          ))}
        </div>

        <div className="mb-3 space-y-2 rounded-2xl border border-amber-100 bg-white p-3 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {schoolBoards.map((item) => (
              <button key={item} onClick={() => setBoard(item)} className={`rounded-full px-3 py-1.5 text-xs font-black ${board === item ? 'bg-slate-900 text-white' : 'bg-amber-50 text-slate-600'}`}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {classOptions.map((item) => (
              <button key={item} onClick={() => setClassLevel(item)} className={`rounded-full px-3 py-1.5 text-xs font-black ${classLevel === item ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-600'}`}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSubjects.map((item) => (
              <button key={item} onClick={() => setSubject(item)} className={`rounded-full px-3 py-1.5 text-xs font-black ${subject === item ? 'bg-amber-500 text-slate-900' : 'bg-white text-slate-600 border border-slate-200'}`}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSubtopics.map((item) => (
              <button key={item} onClick={() => setSubtopic(item)} className={`rounded-full px-3 py-1.5 text-xs font-black ${subtopic === item ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-600'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-4 text-[11px] font-semibold text-slate-400 sm:text-xs">
          {mode === 'New' && 'Brand new books from Kwick Store — buy only.'}
          {mode === 'Used' && 'Sold by fellow students — buy to own, or rent for a fraction of the price.'}
          {mode === 'All' && 'Mix of brand-new store books and student pre-owned listings.'}
        </p>

        <div className="grid gap-4 pb-10 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((b) => (
            <button key={b.id} onClick={() => onOpenBook(b)} className="rounded-2xl border border-amber-100/70 bg-white p-4 text-left shadow-sm transition-all hover:border-amber-300 hover:shadow-md">
              <div className="relative mb-3 flex h-24 items-center justify-center rounded-xl text-4xl" style={{ background: 'linear-gradient(135deg,#FFF3D6,#FFE8B8)' }}>
                {b.cover}
                <span className={`absolute right-1.5 top-1.5 rounded-full px-2 py-0.5 text-[9px] font-black ${b.listingType === 'New' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
                  {b.listingType === 'New' ? 'NEW' : 'PRE-OWNED'}
                </span>
              </div>
              <p className="line-clamp-2 text-sm font-black leading-tight text-slate-900">{b.title}</p>
              <p className="mt-0.5 text-xs font-semibold text-slate-400">{b.author}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-700">{b.school || 'General'}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-600">{b.class || 'All levels'}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-600">{b.subject || 'Topic'}</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star size={11} fill="currentColor" /> {b.rating}
                <span className="font-normal text-slate-300">· {b.condition}</span>
              </div>
              <p className="mt-2 font-black text-slate-900">
                ₹{b.mrp} <span className="text-xs font-semibold text-slate-400">MRP</span>
              </p>
              <p className="mt-1 text-[10px] font-bold">
                {b.listingType === 'New' ? <span className="text-emerald-600">Buy only</span> : <span className="text-sky-600">Buy or Rent · by {b.seller}</span>}
              </p>
            </button>
          ))}
          {filtered.length === 0 && <p className="col-span-full py-10 text-center text-sm text-slate-400">No books match your search.</p>}
        </div>
      </div>
    </div>
  );
}

const durations = [7, 15, 30];

function BookDetail({ book, onBack, onBuy, onRent }) {
  const [days, setDays] = useState(15);
  const factor = conditionFactor[book.condition];
  const rentPrice = calculateRentalPrice(book.mrp, days, factor);
  const deposit = Math.round(book.mrp * 0.5);

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-8">
      <BackBar title="Book Details" onBack={onBack} />

      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-5 lg:px-6 lg:py-6">
        <div className="mb-4 grid gap-4 rounded-2xl border border-amber-100/70 bg-white p-6 text-center shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:text-left">
          <div className="mx-auto flex h-32 w-24 items-center justify-center rounded-xl text-6xl lg:mx-0" style={{ background: 'linear-gradient(135deg,#FFF3D6,#FFE8B8)' }}>
            {book.cover}
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">{book.title}</h2>
            <p className="mt-0.5 text-sm font-semibold text-slate-400">by {book.author}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">{book.condition}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{book.school || 'General'}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{book.class || 'All levels'}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{book.subject || 'Topic'}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{book.subtopic || 'Chapter'}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                <Star size={12} className="text-amber-400" fill="currentColor" /> {book.rating}
              </span>
              <span className="text-xs font-bold text-slate-500">Seller: {book.seller}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-amber-100/70 bg-white p-5 shadow-sm">
            <p className="mb-1 text-sm font-bold text-slate-500">Buy Outright</p>
            <p className="mb-3 text-2xl font-black text-slate-900">
              ₹{book.mrp} <span className="text-sm font-semibold text-slate-400">MRP</span>
            </p>
            <PrimaryButton onClick={() => onBuy(book.mrp)}>Buy Now · ₹{book.mrp}</PrimaryButton>
          </div>

          <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm">
            <p className="mb-1 flex items-center gap-2 font-black text-slate-900">
              <BookOpen size={16} className="text-amber-600" /> Rent this Book
            </p>
            <p className="mb-4 text-xs font-semibold text-slate-400">Price auto-calculated from MRP & condition</p>

            <div className="mb-4 flex gap-2">
              {durations.map((d) => (
                <button key={d} onClick={() => setDays(d)} className={`flex-1 rounded-xl border-2 py-3 text-sm font-black transition-colors ${days === d ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                  {d} Days
                </button>
              ))}
            </div>

            <div className="mb-4 space-y-1.5 rounded-xl bg-amber-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-500">Rental fee ({days} days)</span>
                <span className="font-black text-slate-900">₹{rentPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-500">Security deposit (refundable)</span>
                <span className="font-black text-slate-900">₹{deposit}</span>
              </div>
              <div className="flex justify-between border-t border-amber-200 pt-1.5 text-base">
                <span className="font-black text-slate-900">Pay now</span>
                <span className="font-black text-slate-900">₹{rentPrice + deposit}</span>
              </div>
            </div>

            <PrimaryButton onClick={() => onRent({ days, rentPrice, deposit, total: rentPrice + deposit })}>Rent for {days} Days · ₹{rentPrice + deposit}</PrimaryButton>
          </div>
        </div>
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
  const [school, setSchool] = useState('CBSE');
  const [classLevel, setClassLevel] = useState('Class 8');
  const [subject, setSubject] = useState('Maths');
  const [subtopic, setSubtopic] = useState('Algebra');

  const canSubmit = title && author && mrp && price && school && classLevel && subject && subtopic;

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-28">
      <BackBar title="Sell / Exchange a Book" onBack={onBack} />
      <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-5 lg:px-6">
        <div className="space-y-4 rounded-2xl border border-amber-100/70 bg-white p-5 shadow-sm lg:p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-500">Book Name</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="e.g. Concepts of Physics" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-500">Author</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} placeholder="e.g. H.C. Verma" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-500">MRP (₹)</label>
              <input value={mrp} onChange={(e) => setMrp(e.target.value.replace(/\D/g, ''))} className={inputClass} placeholder="450" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-500">Your Price (₹)</label>
              <input value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))} className={inputClass} placeholder="200" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-500">School / Board</label>
              <select value={school} onChange={(e) => setSchool(e.target.value)} className={inputClass}>
                {schoolBoards.filter((item) => item !== 'All').map((item) => (<option key={item} value={item}>{item}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-500">Class</label>
              <select value={classLevel} onChange={(e) => setClassLevel(e.target.value)} className={inputClass}>
                {classOptions.filter((item) => item !== 'All').map((item) => (<option key={item} value={item}>{item}</option>))}
              </select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-500">Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass}>
                {subjectOptions.filter((item) => item !== 'All').map((item) => (<option key={item} value={item}>{item}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-500">Subtopic / Chapter</label>
              <input value={subtopic} onChange={(e) => setSubtopic(e.target.value)} className={inputClass} placeholder="e.g. Algebra, Motion, Grammar" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500">Condition</label>
            <div className="grid gap-2 sm:grid-cols-3">
              {Object.keys(conditionFactor).map((c) => (
                <button key={c} onClick={() => setCondition(c)} className={`rounded-xl border-2 py-2.5 text-xs font-bold transition-colors ${condition === c ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-500">Photos (3–4 recommended)</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <button key={i} className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 hover:border-amber-400 hover:text-amber-600">
                  <Upload size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="px-4 py-3 text-center text-xs text-slate-400">
          Aapki listing “Pending Approval” mein jayegi — hum condition verify karke 24hrs mein approve kar denge.
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md border-t border-amber-100 bg-white px-4 py-4 sm:px-5">
        <PrimaryButton disabled={!canSubmit} onClick={() => {
          const newEntry = {
            id: Date.now(),
            title,
            author,
            category: 'School',
            school,
            class: classLevel,
            subject,
            subtopic,
            mrp: Number(mrp),
            condition,
            cover: '📚',
            rating: 4.6,
            listingType: 'Used',
            seller: 'You',
          };
          const saved = JSON.parse(localStorage.getItem('kwickbook-service-listings-v1') || '[]');
          const next = [newEntry, ...saved];
          localStorage.setItem('kwickbook-service-listings-v1', JSON.stringify(next));
          onSubmitted(next);
        }}>
          Submit for Approval
        </PrimaryButton>
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
    { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when rider arrives', Icon: Wallet },
  ];

  const upiValid = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim());
  const cardValid = cardNum.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCvv.length === 3;
  const canPay = method === 'cod' || (method === 'upi' && upiValid) || (method === 'card' && cardValid);

  const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const handlePay = () => {
    setError('');
    if (!canPay) {
      if (method === 'upi') setError('Enter a valid UPI ID, e.g. name@okhdfcbank');
      if (method === 'card') setError('Check your card number, expiry and CVV');
      return;
    }
    setStatus('processing');
    setTimeout(() => setStatus('success'), 1800);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-32">
      <BackBar title="Payment" onBack={onBack} />

      <div className="mx-auto w-full max-w-5xl space-y-4 px-4 py-4 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between rounded-2xl border border-amber-100/70 bg-white p-5 shadow-sm">
          <span className="text-sm font-bold text-slate-500">Amount to pay</span>
          <span className="text-2xl font-black text-slate-900">₹{total}</span>
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Choose payment method</p>

        <div className="space-y-3">
          {methods.map((m) => (
            <div key={m.id}>
              <button onClick={() => { setMethod(m.id); setError(''); }} className={`flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 transition-colors ${method === m.id ? 'border-amber-400 bg-amber-50' : 'border-slate-200'}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-white">
                  <m.Icon size={20} className="text-amber-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-900">{m.label}</p>
                  <p className="text-xs font-semibold text-slate-400">{m.desc}</p>
                </div>
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${method === m.id ? 'border-amber-500' : 'border-slate-300'}`}>
                  {method === m.id && <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />}
                </div>
              </button>

              {method === 'upi' && m.id === 'upi' && (
                <div className="mt-2 space-y-2 rounded-2xl border border-amber-100 bg-white p-4">
                  <label className="mb-1 block text-xs font-bold text-slate-500">Enter UPI ID</label>
                  <input value={upiId} onChange={(e) => { setUpiId(e.target.value); setError(''); }} placeholder="yourname@okhdfcbank" className={inputClass} />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['@okhdfcbank', '@paytm', '@ybl', '@oksbi'].map((suf) => (
                      <button key={suf} onClick={() => setUpiId((upiId.split('@')[0] || 'yourname') + suf)} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                        {suf}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {method === 'card' && m.id === 'card' && (
                <div className="mt-2 space-y-3 rounded-2xl border border-amber-100 bg-white p-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-500">Card Number</label>
                    <input value={cardNum} onChange={(e) => setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-bold text-slate-500">Expiry</label>
                      <input value={cardExpiry} onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" className={inputClass} />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-bold text-slate-500">CVV</label>
                      <input value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} placeholder="123" className={inputClass} />
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

      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md border-t border-amber-100 bg-white px-4 py-4 sm:px-5">
        <PrimaryButton onClick={handlePay} disabled={status === 'processing'}>
          {status === 'processing' ? 'Processing...' : method === 'cod' ? 'Confirm Order' : `Pay ₹${total}`}
        </PrimaryButton>
      </div>

      {status === 'processing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-6 flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-xl">
            <Loader2 size={40} className="animate-spin text-amber-500" />
            <p className="font-bold text-slate-700">{method === 'upi' ? 'Approve the request on your UPI app...' : 'Processing your payment...'}</p>
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
            <p className="mt-1 text-sm text-slate-500">₹{total} paid {method === 'upi' ? `via UPI (${upiId})` : method === 'card' ? 'via Card' : '— Cash on Delivery confirmed'}</p>
            <button onClick={onPaid} className="mt-6 w-full rounded-xl py-3.5 font-black text-slate-900" style={{ background: amberGrad }}>
              Track My Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const statusSteps = [
  { key: 'Pending', Icon: PackageCheck, label: 'Order Confirmed' },
  { key: 'PickedUp', Icon: Truck, label: 'Picked up from Seller' },
  { key: 'OutForDelivery', Icon: PackageCheck, label: 'Out for Delivery' },
  { key: 'Delivered', Icon: HomeIcon, label: 'Delivered to You' },
];

function Tracking({ book, onBack }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-10">
      <BackBar title="Track Your Order" onBack={onBack} />
      <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-5 lg:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-100/70 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Order #KWB-3312</p>
            <p className="mt-0.5 font-black text-slate-900">{book?.title || 'Your Book'}</p>
          </div>
          <Logo size={24} />
        </div>

        <div className="rounded-2xl border border-amber-100/70 bg-white p-6 shadow-sm">
          {statusSteps.map((s, i) => {
            const done = i <= idx;
            const isLast = i === statusSteps.length - 1;
            return (
              <div key={s.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: done ? amberGrad : '#f1f5f9', color: done ? '#0f172a' : '#cbd5e1' }}>
                    <s.Icon size={18} />
                  </div>
                  {!isLast && <div className="my-1 w-0.5 flex-1" style={{ minHeight: 28, background: i < idx ? '#F5A623' : '#f1f5f9' }} />}
                </div>
                <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                  <p className={`font-bold ${done ? 'text-slate-900' : 'text-slate-300'}`}>{s.label}</p>
                  {done && i === idx && <p className="mt-0.5 text-xs font-semibold text-amber-600">Current status</p>}
                </div>
              </div>
            );
          })}
        </div>

        {idx < statusSteps.length - 1 && (
          <button onClick={() => setIdx((i) => Math.min(statusSteps.length - 1, i + 1))} className="mt-5 w-full rounded-xl border border-amber-100 bg-amber-50 py-3 font-bold text-amber-700">
            (Rider demo) Advance to next status →
          </button>
        )}
      </div>
    </div>
  );
}

export default function KwickBooks() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('discovery');
  const [book, setBook] = useState(null);
  const [payTotal, setPayTotal] = useState(0);

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' },
  ];

  return (
    <MobileFrame>
      <div className="min-h-screen bg-[#FFFBF2]">
        {screen === 'discovery' && <Discovery onOpenBook={(b) => { setBook(b); setScreen('detail'); }} onSell={() => setScreen('sell')} />}
        {screen === 'detail' && <BookDetail book={book} onBack={() => setScreen('discovery')} onBuy={(amt) => { setPayTotal(amt); setScreen('payment'); }} onRent={(r) => { setPayTotal(r.total); setScreen('payment'); }} />}
        {screen === 'sell' && <SellForm onBack={() => setScreen('discovery')} onSubmitted={() => setScreen('discovery')} />}
        {screen === 'payment' && <Payment total={payTotal} onBack={() => setScreen('detail')} onPaid={() => setScreen('tracking')} />}
        {screen === 'tracking' && <Tracking book={book} onBack={() => setScreen('discovery')} />}
      </div>
      <BottomNav items={navItems} highlightColor="#F59E0B" />
    </MobileFrame>
  );
}
