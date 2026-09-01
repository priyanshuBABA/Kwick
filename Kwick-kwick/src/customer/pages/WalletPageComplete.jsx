import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDownLeft, ArrowUpRight, ChevronRight, Clock, Coins, Crown, Gift, Grid, Home,
  Info, Plus, RefreshCw, Send, ShoppingBag, Sparkles, Tag, Ticket, TrendingUp,
  User, Wallet, X, Check
} from 'lucide-react';
import CustomerTopNav from '../../components/CustomerTopNav';
import BottomNav from '../../components/BottomNav';

// ==================== DATA & BUSINESS LOGIC ====================

const LOYALTY_TIERS = [
  {
    name: 'Bronze',
    minPoints: 0,
    maxPoints: 1000,
    earnRate: '10 pts / ₹100',
    perks: 'Standard earning rate',
    color: 'from-amber-600 to-yellow-700'
  },
  {
    name: 'Silver',
    minPoints: 1000,
    maxPoints: 3000,
    earnRate: '12.5 pts / ₹100',
    perks: 'Birthday special discount',
    color: 'from-slate-400 to-slate-600'
  },
  {
    name: 'Gold',
    minPoints: 3000,
    maxPoints: Infinity,
    earnRate: '15 pts / ₹100',
    perks: 'Free delivery (₹199+), Priority support',
    color: 'from-yellow-400 to-yellow-600'
  }
];

const VOUCHER_REDEMPTION = [
  {
    id: 'v1',
    title: 'Free Delivery Pass',
    cost: 500,
    icon: '🚚',
    detail: 'Valid on your next 1 order'
  },
  {
    id: 'v2',
    title: 'Free Milk & Bread Voucher',
    cost: 800,
    icon: '🥛',
    detail: 'Redeemable at checkout'
  },
  {
    id: 'v3',
    title: 'Rs. 150 Kwick Pro Discount',
    cost: 1200,
    icon: '👑',
    detail: 'One month subscription off'
  }
];

const ADD_MONEY_PRESETS = [
  { amount: 200, bonus: 0 },
  { amount: 500, bonus: 25 },
  { amount: 1000, bonus: 50 }
];

const TRANSACTION_HISTORY = [
  {
    id: 't1',
    type: 'credit',
    category: 'Added',
    label: 'Added via UPI',
    amount: 500,
    points: null,
    time: '31 Aug 2026, 10:15 PM',
    walletType: 'Real'
  },
  {
    id: 't2',
    type: 'debit',
    category: 'Spent',
    label: 'Order #KWK89231 (Fresh Basket)',
    amount: 187,
    points: null,
    time: '31 Aug 2026, 9:40 PM',
    walletType: 'Real'
  },
  {
    id: 't3',
    type: 'credit',
    category: 'Cashback',
    label: 'Cashback from code KWICKCASH',
    amount: 20,
    points: null,
    time: '30 Aug 2026, 6:05 PM',
    walletType: 'PromoBonus'
  },
  {
    id: 't4',
    type: 'credit',
    category: 'Points',
    label: 'Points earned - Order #KWK89231',
    amount: 0,
    points: 50,
    time: '30 Aug 2026, 6:05 PM',
    walletType: 'Points'
  },
  {
    id: 't5',
    type: 'credit',
    category: 'Added',
    label: 'Referral bonus from Aman Kumar',
    amount: 100,
    points: null,
    time: '28 Aug 2026, 3:20 PM',
    walletType: 'PromoBonus',
    source: 'referral'
  },
  {
    id: 't6',
    type: 'credit',
    category: 'Cashback',
    label: 'Refund for Order #KWK88912',
    amount: 250,
    points: null,
    time: '25 Aug 2026, 11:45 AM',
    walletType: 'Real'
  }
];

// ==================== COMPONENTS ====================

function BalanceCard({ realBalance, promoBalance, promoExpiry, isPro }) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 text-white p-6 md:p-8 shadow-xl overflow-hidden relative">
      {/* Background blur effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold opacity-90">Total Wallet Balance</span>
          {isPro && <span className="bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Crown size={12} /> Pro Member
          </span>}
        </div>

        <div className="text-5xl font-black mb-6">
          ₹{realBalance + promoBalance}
        </div>

        {/* Balance Breakdown */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-3">
            <div className="text-xs opacity-90 font-medium">Real Balance</div>
            <div className="text-2xl font-bold mt-1">₹{realBalance}</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-3">
            <div className="text-xs opacity-90 font-medium">Promo Bonus</div>
            <div className="text-2xl font-bold mt-1">₹{promoBalance}</div>
            {promoExpiry && <div className="text-[10px] opacity-75 mt-1">Expires {promoExpiry}</div>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 rounded-xl transition-all backdrop-blur-sm flex items-center justify-center gap-2">
            <Plus size={18} /> Add Money
          </button>
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 rounded-xl transition-all backdrop-blur-sm flex items-center justify-center gap-2">
            <Send size={18} /> Transfer
          </button>
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 rounded-xl transition-all backdrop-blur-sm flex items-center justify-center gap-2">
            <RefreshCw size={18} /> Auto-Recharge
          </button>
        </div>
      </div>
    </div>
  );
}

function RewardPointsCard({ currentPoints, nextTierPoints }) {
  const getTier = (points) => {
    return LOYALTY_TIERS.find(t => points >= t.minPoints && points < t.maxPoints) ||
           LOYALTY_TIERS[LOYALTY_TIERS.length - 1];
  };

  const tier = getTier(currentPoints);
  const nextTier = LOYALTY_TIERS[LOYALTY_TIERS.indexOf(tier) + 1];
  const pointsToNextTier = nextTier ? nextTier.minPoints - currentPoints : 0;
  const progressPercent = nextTier
    ? Math.min(100, ((currentPoints - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100)
    : 100;

  const pointsWorth = Math.round(currentPoints * 0.1); // 10 points = ₹1

  return (
    <div className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border-2 border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-semibold text-slate-600">Loyalty Points</span>
          <div className="text-4xl font-black text-slate-900 mt-1">{currentPoints} pts</div>
          <div className="text-sm text-slate-500 mt-2">Worth approximately ₹{pointsWorth}</div>
        </div>
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center text-white font-bold text-lg`}>
          {tier.name.charAt(0)}
        </div>
      </div>

      {/* Current Tier Info */}
      <div className="bg-slate-50 rounded-xl p-3 mb-4">
        <div className="text-xs font-bold text-slate-600 uppercase tracking-wide">Current Tier</div>
        <div className="text-lg font-bold text-slate-900 mt-1">{tier.name}</div>
        <div className="text-sm text-slate-600 mt-1">{tier.earnRate}</div>
        <div className="text-xs text-slate-500 mt-1">✓ {tier.perks}</div>
      </div>

      {/* Progress to Next Tier */}
      {nextTier && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">Progress to {nextTier.name}</span>
            <span className="text-xs font-bold text-orange-600">{pointsToNextTier} pts away</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Convert Points Button */}
      <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4">
        <TrendingUp size={18} /> Convert Points to Cash
      </button>
    </div>
  );
}

function AddMoneyModal({ isOpen, onClose, onConfirm }) {
  const [selected, setSelected] = useState(ADD_MONEY_PRESETS[1]);
  const [custom, setCustom] = useState('');

  if (!isOpen) return null;

  const amount = custom ? Number(custom) : selected.amount;
  const bonus = custom ? 0 : selected.bonus;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-slate-900">Add Money to Wallet</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Preset Amounts */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {ADD_MONEY_PRESETS.map((preset) => (
            <button
              key={preset.amount}
              onClick={() => { setSelected(preset); setCustom(''); }}
              className={`rounded-xl p-3 text-center transition-all border-2 ${
                !custom && selected.amount === preset.amount
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-slate-900">₹{preset.amount}</div>
              {preset.bonus > 0 && <div className="text-xs text-green-600 font-semibold mt-1">+₹{preset.bonus}</div>}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Or Enter Custom Amount</label>
          <input
            type="number"
            min="1"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="₹ Amount"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-lg font-semibold"
          />
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 mb-4 border-2 border-orange-200">
          <div className="flex justify-between mb-2">
            <span className="text-slate-600">Amount:</span>
            <span className="font-bold text-slate-900">₹{amount}</span>
          </div>
          {bonus > 0 && (
            <div className="flex justify-between mb-2">
              <span className="text-slate-600">Bonus:</span>
              <span className="font-bold text-green-600">+₹{bonus}</span>
            </div>
          )}
          <div className="border-t border-orange-200 pt-2 flex justify-between">
            <span className="font-bold text-slate-900">Total:</span>
            <span className="text-2xl font-black text-orange-600">₹{amount + bonus}</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-4 text-sm text-blue-700 flex items-start gap-2">
          <Info size={16} className="flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Safe & Secure</div>
            <div className="text-xs mt-1">Your payment info is encrypted. You can use UPI, Cards, or Net Banking.</div>
          </div>
        </div>

        <button
          onClick={() => onConfirm(amount + bonus)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
        >
          Proceed to Pay ₹{amount + bonus}
        </button>
      </div>
    </div>
  );
}

function TransactionRow({ transaction }) {
  const isCredit = transaction.type === 'credit';
  const isPoints = transaction.category === 'Points';

  let icon = isCredit ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />;
  let iconBg = isCredit ? 'bg-green-100 text-green-600' : isPoints ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600';

  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`p-2 rounded-full ${iconBg} flex-shrink-0`}>
          {isPoints ? <Coins size={18} /> : icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-slate-900 text-sm">{transaction.label}</div>
          <div className="text-xs text-slate-500 mt-0.5">{transaction.time}</div>
          <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide font-bold">
            {transaction.walletType}
            {transaction.source === 'referral' && ' • Referral'}
          </div>
        </div>
      </div>
      <div className="text-right flex-shrink-0 ml-3">
        {isPoints ? (
          <div className="font-bold text-orange-600">+{transaction.points} pts</div>
        ) : (
          <div className={`font-bold text-lg ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
            {isCredit ? '+' : '-'}₹{transaction.amount}
          </div>
        )}
      </div>
    </div>
  );
}

function VoucherCard({ voucher, points, onRedeem }) {
  const canRedeem = points >= voucher.cost;

  return (
    <div className="rounded-2xl bg-white border-2 border-slate-100 p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-3xl mb-2">{voucher.icon}</div>
          <h4 className="font-bold text-slate-900">{voucher.title}</h4>
          <p className="text-xs text-slate-500 mt-1">{voucher.detail}</p>
          <div className="mt-3 font-bold text-lg text-slate-900">{voucher.cost} pts</div>
        </div>
        <button
          onClick={() => onRedeem(voucher)}
          disabled={!canRedeem}
          className={`shrink-0 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            canRedeem
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Redeem
        </button>
      </div>
    </div>
  );
}

// ==================== MAIN PAGE ====================

export default function KwickWalletPage() {
  const navigate = useNavigate();
  const [realBalance, setRealBalance] = useState(1250);
  const [promoBalance, setPromoBalance] = useState(240);
  const [promoExpiry, setPromoExpiry] = useState('14 Sep 2026');
  const [currentPoints, setCurrentPoints] = useState(2480);
  const [isPro, setIsPro] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [transactions, setTransactions] = useState(TRANSACTION_HISTORY);

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  const filterOptions = ['All', 'Added', 'Spent', 'Cashback', 'Points'];

  const filteredTransactions = useMemo(() => {
    if (selectedFilter === 'All') return transactions;
    return transactions.filter(t => t.category === selectedFilter);
  }, [selectedFilter, transactions]);

  const handleAddMoney = (amount) => {
    setRealBalance(prev => prev + amount);
    setAddMoneyOpen(false);
    // Add transaction entry
    setTransactions([
      {
        id: `t_new_${Date.now()}`,
        type: 'credit',
        category: 'Added',
        label: `Added ₹${amount}`,
        amount: amount,
        points: null,
        time: new Date().toLocaleString(),
        walletType: 'Real'
      },
      ...transactions
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <CustomerTopNav />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Payment</p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
            My <span className="text-orange-600">Wallet</span>
          </h1>
        </div>

        {/* Balance & Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BalanceCard
            realBalance={realBalance}
            promoBalance={promoBalance}
            promoExpiry={promoExpiry}
            isPro={isPro}
          />
          <RewardPointsCard currentPoints={currentPoints} />
        </div>

        {/* Kwick Pro Banner */}
        {!isPro && (
          <div className="rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={20} className="text-yellow-400" />
                  <span className="font-bold text-lg">Kwick Pro</span>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Save ₹150/month on delivery fees + exclusive rewards
                </p>
                <button className="bg-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-300 transition-all">
                  Start 7-Day Free Trial
                </button>
              </div>
              <div className="text-4xl">👑</div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={() => setAddMoneyOpen(true)}
            className="rounded-2xl bg-white border-2 border-slate-100 p-4 hover:shadow-md transition-all flex flex-col items-center gap-2"
          >
            <Plus size={24} className="text-orange-600" />
            <span className="text-xs font-bold">Add Money</span>
          </button>
          <button className="rounded-2xl bg-white border-2 border-slate-100 p-4 hover:shadow-md transition-all flex flex-col items-center gap-2">
            <Send size={24} className="text-blue-600" />
            <span className="text-xs font-bold">Transfer</span>
          </button>
          <button className="rounded-2xl bg-white border-2 border-slate-100 p-4 hover:shadow-md transition-all flex flex-col items-center gap-2">
            <RefreshCw size={24} className="text-green-600" />
            <span className="text-xs font-bold">Auto-Recharge</span>
          </button>
        </div>

        {/* Voucher Redemption */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Redeem Points for Vouchers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {VOUCHER_REDEMPTION.map(voucher => (
              <VoucherCard
                key={voucher.id}
                voucher={voucher}
                points={currentPoints}
                onRedeem={(v) => {
                  if (currentPoints >= v.cost) {
                    setCurrentPoints(prev => prev - v.cost);
                  }
                }}
              />
            ))}
          </div>
        </section>

        {/* Transaction History */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Transaction History</h2>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
            {filterOptions.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  selectedFilter === filter
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-orange-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Transactions */}
          <div className="rounded-2xl bg-white border-2 border-slate-100 overflow-hidden shadow-sm">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Wallet size={40} className="mx-auto opacity-50 mb-3" />
                <p className="font-medium">No transactions found</p>
              </div>
            ) : (
              filteredTransactions.map(transaction => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))
            )}
          </div>
        </section>
      </main>

      {/* Add Money Modal */}
      <AddMoneyModal
        isOpen={addMoneyOpen}
        onClose={() => setAddMoneyOpen(false)}
        onConfirm={handleAddMoney}
      />

      <BottomNav items={navItems} highlightColor="#FF6B00" />
    </div>
  );
}
