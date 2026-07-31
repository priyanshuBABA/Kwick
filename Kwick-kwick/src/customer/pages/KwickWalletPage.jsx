import React, { useMemo, useState } from 'react';
import {
  ArrowDownLeft, ArrowUpRight, ChevronRight, Clock, Coins, Crown, Gift, Grid, Home,
  Info, Plus, RefreshCw, Send, ShoppingBag, Sparkles, Tag, Ticket, TrendingUp,
  User, Wallet, X,
} from 'lucide-react';
import CustomerTopNav from '../../components/CustomerTopNav';
import BottomNav from '../../components/BottomNav';

const ADD_MONEY_PRESETS = [{ amount: 200, bonus: 0 }, { amount: 500, bonus: 25 }, { amount: 1000, bonus: 50 }];
const TIERS = [
  { name: 'Bronze', min: 0, max: 1000, rate: '10 pts / Rs. 100', perk: 'Standard earning rate' },
  { name: 'Silver', min: 1000, max: 3000, rate: '12.5 pts / Rs. 100', perk: '+ Birthday special discount' },
  { name: 'Gold', min: 3000, max: Infinity, rate: '15 pts / Rs. 100', perk: '+ Zero delivery fee above Rs. 199' },
];
const VOUCHERS = [
  { id: 'v1', title: 'Free Delivery Pass', cost: 500, icon: '🚚', detail: 'Valid on your next 1 order' },
  { id: 'v2', title: 'Free Milk & Bread Voucher', cost: 800, icon: '🥛', detail: 'Redeemable at checkout' },
  { id: 'v3', title: 'Rs. 150 Kwick Pro Discount', cost: 1200, icon: '👑', detail: 'One month subscription off' },
];
const FILTERS = ['All', 'Added', 'Spent', 'Cashback', 'Points'];
const INITIAL_TRANSACTIONS = [
  { id: 't1', type: 'credit', category: 'Added', label: 'Added via UPI', amount: 500, points: null, time: '31 Jul 2026, 10:15 PM' },
  { id: 't2', type: 'debit', category: 'Spent', label: 'Order #KWK89231 (Fresh Basket)', amount: 187, points: null, time: '31 Jul 2026, 9:40 PM' },
  { id: 't3', type: 'credit', category: 'Cashback', label: 'Cashback from code KWICKCASH', amount: 20, points: null, time: '30 Jul 2026, 6:05 PM' },
  { id: 't4', type: 'credit', category: 'Points', label: 'Points earned - Order #KWK89231', amount: 0, points: 50, time: '30 Jul 2026, 6:05 PM' },
];
const navItems = [
  { icon: Home, label: 'Home', path: '/customer/home' },
  { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
  { icon: Grid, label: 'Services', path: '/customer/services' },
  { icon: User, label: 'Profile', path: '/customer/profile' },
];
const fmt = (value) => value.toLocaleString('en-IN');
const getTier = (points) => TIERS.find((tier) => points >= tier.min && points < tier.max) || TIERS[TIERS.length - 1];

function Toast({ message, onDone }) {
  React.useEffect(() => { const timer = setTimeout(onDone, 2400); return () => clearTimeout(timer); }, [onDone]);
  return <div className="fixed bottom-20 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">{message}</div>;
}
function Modal({ title, onClose, children }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"><div className="w-full max-w-md rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">{title}</h3><button type="button" onClick={onClose} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"><X size={18} /></button></div><div className="mt-4">{children}</div></div></div>;
}
function AddMoneyModal({ onClose, onConfirm }) {
  const [selected, setSelected] = useState(ADD_MONEY_PRESETS[1]);
  const [custom, setCustom] = useState('');
  const amount = custom ? Number(custom) : selected.amount;
  const bonus = custom ? 0 : selected.bonus;
  return <Modal title="Add Money to Wallet" onClose={onClose}><div className="grid grid-cols-3 gap-2">{ADD_MONEY_PRESETS.map((preset) => <button type="button" key={preset.amount} onClick={() => { setSelected(preset); setCustom(''); }} className={`rounded-xl border-2 px-2 py-3 text-center ${!custom && selected.amount === preset.amount ? 'border-[#FF6B00] bg-orange-50' : 'border-gray-100'}`}><p className="text-lg font-extrabold">Rs. {preset.amount}</p>{preset.bonus > 0 && <p className="text-[11px] font-semibold text-green-600">+Rs. {preset.bonus} bonus</p>}</button>)}</div><label className="mt-4 block text-xs font-semibold text-gray-500">Or enter a custom amount<input type="number" min="1" value={custom} onChange={(event) => setCustom(event.target.value)} placeholder="Rs. Amount" className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#FF8A00]" /></label><button type="button" disabled={amount <= 0} onClick={() => onConfirm(amount, bonus)} className="mt-5 w-full rounded-xl bg-[#FF6B00] py-3 text-sm font-bold text-white disabled:opacity-40">Add Rs. {amount || 0}{bonus ? ` (+Rs. ${bonus} bonus)` : ''}</button></Modal>;
}
function TransferModal({ maxAmount, onClose, onConfirm }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const value = Number(amount) || 0;
  const valid = recipient.trim().length > 2 && value > 0 && value <= maxAmount;
  return <Modal title="Transfer to Friend / Bank" onClose={onClose}><label className="block text-xs font-semibold text-gray-500">Recipient<input value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="Name, phone or UPI ID" className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#FF8A00]" /></label><label className="mt-3 block text-xs font-semibold text-gray-500">Amount (Real balance: Rs. {fmt(maxAmount)})<input type="number" min="1" max={maxAmount} value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Rs. Amount" className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#FF8A00]" /></label>{value > maxAmount && <p className="mt-1 flex items-center gap-1 text-xs text-red-500"><Info size={12} /> Amount exceeds real balance</p>}<button type="button" disabled={!valid} onClick={() => onConfirm(recipient.trim(), value)} className="mt-5 w-full rounded-xl bg-[#FF6B00] py-3 text-sm font-bold text-white disabled:opacity-40">Send Rs. {value || 0}</button><p className="mt-2 text-center text-[11px] text-gray-400">Only Real Balance is transferable.</p></Modal>;
}
function ConvertModal({ points, onClose, onConfirm }) {
  const [value, setValue] = useState(Math.min(500, points));
  const cash = Math.round(value * 0.1);
  return <Modal title="Convert Points to Cash" onClose={onClose}>{points < 500 ? <p className="rounded-xl bg-orange-50 p-4 text-sm text-gray-600">You need at least 500 points. You currently have {fmt(points)} pts.</p> : <><p className="text-sm text-gray-500">Available: <b className="text-gray-800">{fmt(points)} pts</b></p><input type="range" min="500" max={points} step="100" value={value} onChange={(event) => setValue(Number(event.target.value))} className="mt-4 w-full accent-[#FF6B00]" /><div className="mt-2 flex justify-between text-sm"><b>{fmt(value)} pts</b><b className="text-green-600">Rs. {cash} Bonus Cash</b></div><button type="button" onClick={() => onConfirm(value)} className="mt-5 w-full rounded-xl bg-[#FF6B00] py-3 text-sm font-bold text-white">Convert {fmt(value)} pts</button></>}</Modal>;
}
function VoucherModal({ points, onClose, onRedeem }) {
  return <Modal title="Redeem Points for Vouchers" onClose={onClose}><p className="text-sm text-gray-500">Available: <b className="text-gray-800">{fmt(points)} pts</b></p><div className="mt-3 space-y-2">{VOUCHERS.map((voucher) => <div key={voucher.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3"><div className="flex items-center gap-3"><span className="text-2xl">{voucher.icon}</span><div><p className="text-sm font-bold">{voucher.title}</p><p className="text-xs text-gray-400">{voucher.detail}</p><p className="text-xs font-semibold text-[#FF6B00]">{fmt(voucher.cost)} pts</p></div></div><button type="button" disabled={points < voucher.cost} onClick={() => onRedeem(voucher)} className={`flex items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-bold ${points >= voucher.cost ? 'bg-[#FF6B00] text-white' : 'cursor-not-allowed bg-gray-100 text-gray-400'}`}>Redeem <ChevronRight size={13} /></button></div>)}</div><p className="mt-3 flex items-center gap-1 text-[11px] text-gray-400"><Sparkles size={12} /> Fresh Mandi orders earn bonus points.</p></Modal>;
}

export default function KwickWalletPage() {
  const [realBalance, setRealBalance] = useState(1000);
  const [promoBalance, setPromoBalance] = useState(240);
  const [promoExpiry, setPromoExpiry] = useState('14 Sep 2026');
  const [points, setPoints] = useState(2480);
  const [isPro, setIsPro] = useState(false);
  const [autoRecharge, setAutoRecharge] = useState(false);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const totalBalance = realBalance + promoBalance;
  const tier = getTier(points);
  const nextTier = TIERS[TIERS.indexOf(tier) + 1];
  const progress = nextTier ? Math.min(100, ((points - tier.min) / (nextTier.min - tier.min)) * 100) : 100;
  const filteredTransactions = useMemo(() => filter === 'All' ? transactions : transactions.filter((transaction) => transaction.category === filter), [transactions, filter]);
  const addTransaction = (transaction) => setTransactions((current) => [{ id: `t${Date.now()}`, time: 'Just now', ...transaction }, ...current]);
  const handleAddMoney = (amount, bonus) => { setRealBalance((value) => value + amount); addTransaction({ type: 'credit', category: 'Added', label: 'Added via UPI', amount }); if (bonus) { setPromoBalance((value) => value + bonus); addTransaction({ type: 'credit', category: 'Cashback', label: `Bonus cashback on Rs. ${amount} add-money`, amount: bonus }); } setModal(null); setToast(`Rs. ${amount} added${bonus ? ` + Rs. ${bonus} bonus` : ''} to your wallet`); };
  const handleTransfer = (recipient, amount) => { setRealBalance((value) => value - amount); addTransaction({ type: 'debit', category: 'Spent', label: `Transferred to ${recipient}`, amount }); setModal(null); setToast(`Rs. ${amount} sent to ${recipient}`); };
  const handleConvert = (value) => { const cash = Math.round(value * 0.1); setPoints((current) => current - value); setPromoBalance((current) => current + cash); setPromoExpiry('14 Sep 2026'); addTransaction({ type: 'debit', category: 'Points', label: `${fmt(value)} pts converted to Bonus Cash`, amount: 0, points: -value }); addTransaction({ type: 'credit', category: 'Cashback', label: 'Bonus Cash from Points conversion', amount: cash }); setModal(null); setToast(`Converted ${fmt(value)} pts to Rs. ${cash} Bonus Cash`); };
  const redeemVoucher = (voucher) => { if (points < voucher.cost) { setToast(`Need ${fmt(voucher.cost - points)} more points`); return; } setPoints((value) => value - voucher.cost); addTransaction({ type: 'debit', category: 'Points', label: `Redeemed ${voucher.title}`, amount: 0, points: -voucher.cost }); setModal(null); setToast(`${voucher.title} redeemed`); };

  return <div className="min-h-screen bg-[#FFF3E9] pb-24"><CustomerTopNav />{toast && <Toast message={toast} onDone={() => setToast(null)} />}<main className="mx-auto max-w-6xl space-y-6 px-4 pb-8 pt-6 sm:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B00]">Money & rewards</p><h1 className="flex items-center gap-2 text-2xl font-extrabold text-gray-900 sm:text-3xl"><Wallet className="text-[#FF6B00]" /> Kwick Wallet</h1></div><section className="rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] p-5 text-white shadow-lg sm:p-6"><p className="text-sm text-blue-100">Total Balance</p><p className="mt-1 text-4xl font-extrabold">Rs. {fmt(totalBalance)}</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Real Balance: Rs. {fmt(realBalance)}</span><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Promo Bonus: Rs. {fmt(promoBalance)}</span></div>{promoBalance > 0 && <p className="mt-2 flex items-center gap-1 text-xs text-blue-100"><Clock size={12} /> Bonus cash expires {promoExpiry} - usable up to 10% of order value</p>}<div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={() => setModal('add')} className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-700"><Plus size={16} /> Add Money</button><button type="button" onClick={() => setModal('transfer')} className="flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold"><Send size={16} /> Transfer</button><button type="button" onClick={() => { setAutoRecharge((value) => !value); setToast(`Auto-Recharge ${autoRecharge ? 'disabled' : 'enabled'}`); }} className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold"><RefreshCw size={16} /> Auto-Recharge <span className={`relative h-5 w-9 rounded-full ${autoRecharge ? 'bg-green-400' : 'bg-white/30'}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${autoRecharge ? 'translate-x-4' : 'translate-x-0.5'}`} /></span></button></div></section><section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between"><div><p className="flex items-center gap-1.5 text-sm text-gray-500"><Coins size={14} className="text-[#FF8A00]" /> Kwick Reward Points</p><p className="mt-1 text-3xl font-extrabold text-gray-900">{fmt(points)} <span className="text-sm font-medium text-gray-400">pts</span></p><p className="text-xs text-gray-400">Worth approx Rs. {Math.round(points * 0.1)}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${tier.name === 'Gold' ? 'bg-yellow-100 text-yellow-700' : tier.name === 'Silver' ? 'bg-gray-200 text-gray-600' : 'bg-orange-100 text-orange-700'}`}>{tier.name === 'Gold' ? '🥇' : tier.name === 'Silver' ? '🥈' : '🥉'} {tier.name}{isPro && <Crown size={12} className="ml-1 inline" />}</span></div><div className="mt-4 h-2.5 w-full rounded-full bg-orange-100"><div className="h-2.5 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FF6B00]" style={{ width: `${progress}%` }} /></div><p className="mt-2 text-xs text-gray-500">{nextTier ? `${fmt(nextTier.min - points)} pts away from ${nextTier.name} Tier` : "You're at the top tier - max earning rate unlocked!"}</p><div className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#FFF3E9] px-3 py-2 text-xs text-gray-600"><TrendingUp size={13} className="text-[#FF6B00]" /> Earning {tier.rate}{isPro ? ' x 2 (Pro)' : ''} - {tier.perk}</div><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setModal('convert')} className="rounded-xl bg-[#FF6B00] px-4 py-2 text-sm font-bold text-white">Convert Points to Cash</button><button type="button" onClick={() => setModal('voucher')} className="flex items-center gap-1.5 rounded-xl border border-orange-200 px-4 py-2 text-sm font-bold text-[#FF6B00]"><Ticket size={15} /> Redeem Voucher</button></div></section>{!isPro && <section className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] p-5 text-white shadow-md sm:flex-row sm:items-center"><div className="flex items-center gap-3"><Crown size={28} /><div><p className="font-extrabold">Save Rs. 150/month with Kwick Pro</p><p className="text-sm text-white/90">Zero delivery fees + 2x reward points on every order</p></div></div><button type="button" onClick={() => { setIsPro(true); setToast('Welcome to Kwick Pro! 2x points now active.'); }} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#FF6B00]">Upgrade</button></section>}<section><h2 className="mb-3 text-lg font-bold text-gray-900">Transaction History</h2><div className="flex flex-wrap gap-2">{FILTERS.map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${filter === item ? 'bg-[#FF6B00] text-white' : 'bg-white text-gray-600'}`}>{item}</button>)}</div><div className="mt-4 space-y-2">{filteredTransactions.length ? filteredTransactions.map((transaction) => <article key={transaction.id} className="flex items-center justify-between rounded-xl bg-white p-3.5 shadow-sm"><div className="flex min-w-0 items-center gap-3"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${transaction.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>{transaction.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-gray-800">{transaction.label}</p><p className="text-xs text-gray-400">{transaction.time}</p></div></div><div className="shrink-0 text-right">{transaction.amount !== 0 && <p className={`text-sm font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>{transaction.type === 'credit' ? '+' : '-'}Rs. {fmt(transaction.amount)}</p>}{transaction.points != null && transaction.points !== 0 && <p className="text-xs font-semibold text-yellow-600">{transaction.points > 0 ? '+' : ''}{fmt(transaction.points)} pts</p>}</div></article>) : <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">No transactions in this category yet.</p>}</div></section></main>{modal === 'add' && <AddMoneyModal onClose={() => setModal(null)} onConfirm={handleAddMoney} />}{modal === 'transfer' && <TransferModal maxAmount={realBalance} onClose={() => setModal(null)} onConfirm={handleTransfer} />}{modal === 'convert' && <ConvertModal points={points} onClose={() => setModal(null)} onConfirm={handleConvert} />}{modal === 'voucher' && <VoucherModal points={points} onClose={() => setModal(null)} onRedeem={redeemVoucher} />}<BottomNav items={navItems} highlightColor="#FF6B00" /></div>;
}
