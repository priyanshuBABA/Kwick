import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, Tag, CreditCard, Banknote, ShieldCheck, ChevronRight, History, Calendar, CheckCircle } from 'lucide-react';
import { walletTransactions } from '../data/mockData';
import TopBar from '../components/TopBar';

const Wallet = () => {
  const [selectedAmount, setSelectedAmount] = useState(200);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const navigate = useNavigate();

  const amounts = [50, 100, 200, 500];

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      setPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-32 text-white animate-fadeIn overflow-hidden">
      <TopBar 
        title="RideGo Wallet" 
        rightElement={
          <button className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner group active:scale-95 transition-all">
            <History size={20} className="text-[#FFD60A] group-hover:rotate-12 transition-transform" />
          </button>
        }
      />

      <div className="p-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#FFD60A] to-[#F59E0B] rounded-[4rem] p-12 text-black shadow-2xl mb-12 relative overflow-hidden group animate-slideIn">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-[4rem] group-hover:scale-150 transition-all duration-1000" />
          <div className="flex items-center gap-4 mb-4 opacity-60">
             <WalletIcon size={24} className="text-black" />
             <span className="font-bold uppercase tracking-widest text-[10px]">Total Balance</span>
          </div>
          <div className="flex items-end gap-3 mb-10 overflow-hidden drop-shadow-md">
             <span className="text-3xl font-bold font-heading mb-3 scale-90">₹</span>
             <h2 className="text-8xl font-bold font-heading tracking-tight scale-110 mb-[-12px] group-hover:scale-[1.15] transition-transform duration-700">150</h2>
          </div>
          <div className="flex gap-4">
             <button className="flex-1 bg-black text-white font-bold py-6 rounded-full shadow-2xl hover:bg-black/90 active:scale-95 transition-all flex items-center justify-center gap-3 group border-2 border-white/10 uppercase tracking-widest text-xs">
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                Add Money
             </button>
             <button className="flex-1 bg-white/20 backdrop-blur-md rounded-full font-bold flex items-center justify-center gap-3 shadow-inner active:scale-95 transition-all border border-white/20 uppercase tracking-widest text-xs">
                Pay Bills
             </button>
          </div>
        </div>

        {/* Quick Add Section */}
        <div className="mb-14">
          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-10 mb-8 flex items-center gap-3">
             <Plus className="text-[#FFD60A]" size={14} />
             Add Money Quick
          </h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 mb-8 animate-slideUp">
             {amounts.map((amount) => (
               <button
                 key={amount}
                 onClick={() => setSelectedAmount(amount)}
                 className={`min-w-[120px] py-10 rounded-[3rem] border transition-all active:scale-95 transform shadow-2xl relative group overflow-hidden ${
                   selectedAmount === amount
                     ? 'bg-[#FFD60A] border-[#FFD60A] text-black font-bold shadow-[#FFD60A]/20'
                     : 'bg-[#1A1A1A] border-[#2E2E2E] text-gray-500 font-bold'
                 }`}
               >
                 <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-bl-full group-hover:scale-150 transition-transform" />
                 <div className="text-lg opacity-60 mb-1">₹</div>
                 <div className="text-4xl font-bold font-heading leading-none animate-slideUp">{amount}</div>
               </button>
             ))}
          </div>
          <button className="w-full btn-primary group py-6 text-xl shadow-2xl shadow-[#FFD60A]/20 flex items-center justify-center gap-4 border-2 border-white/20 transform active:scale-95">
             Add ₹{selectedAmount} via UPI
             <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
          </button>
        </div>

        {/* Promo Code */}
        <div className="mb-14 animate-slideUp">
           <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-10 mb-8 flex items-center gap-3">
              <Tag className="text-green-500" size={14} />
              Wallet Promos
           </h3>
           <div className={`p-8 bg-[#1A1A1A] rounded-[3rem] border transition-all group overflow-hidden relative shadow-2xl ${promoApplied ? 'border-green-500/40' : 'border-[#2E2E2E] hover:border-[#FFD60A]/40'}`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD60A]/5 rounded-bl-[4rem] group-hover:scale-150 transition-transform" />
              <div className="flex items-center gap-4 mb-8">
                 <div className="p-4 bg-[#242424] rounded-2xl border border-white/5 shadow-inner">
                    <Tag size={24} className={promoApplied ? 'text-green-500' : 'text-gray-400'} />
                 </div>
                 <h4 className="text-lg font-bold font-heading text-white tracking-tight">Have a promo code?</h4>
              </div>
              <div className="flex gap-4">
                 <input 
                   type="text"
                   className="flex-1 bg-[#242424] border border-[#2E2E2E] rounded-full px-8 py-5 text-white font-bold focus:border-[#FFD60A]/40 outline-none transition-all placeholder:text-gray-600 shadow-inner"
                   placeholder={promoApplied ? "SAVE20 Applied" : "Enter code (SAVE20)"}
                   value={promoCode}
                   onChange={(e) => setPromoCode(e.target.value)}
                   disabled={promoApplied}
                 />
                 {!promoApplied ? (
                   <button 
                     onClick={handleApplyPromo}
                     className="bg-[#2E2E2E] text-white px-10 rounded-full font-bold hover:bg-[#FFD60A] hover:text-black transition-all active:scale-95 shadow-xl uppercase tracking-widest text-xs"
                   >
                     Apply
                   </button>
                 ) : (
                   <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 group">
                      <ShieldCheck className="text-white group-hover:rotate-12 transition-transform" size={28} />
                   </div>
                 )}
              </div>
              {promoApplied && (
                <div className="mt-6 flex items-center gap-2 text-green-500 text-xs font-bold font-heading bg-green-500/10 p-4 rounded-2xl border border-green-500/20 animate-fadeIn uppercase tracking-widest">
                  <CheckCircle size={16} />
                  SAVE20 applied! 20% off on your next bike ride
                </div>
              )}
           </div>
        </div>

        {/* Transaction History */}
        <div className="mb-20 animate-slideUp">
          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-10 mb-8 flex items-center gap-3">
             <Calendar className="text-blue-500" size={14} />
             Transaction History
          </h3>
          <div className="space-y-6">
            {walletTransactions.map((tx, idx) => (
              <div key={idx} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-[3rem] p-8 shadow-2xl relative group overflow-hidden transition-all hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-[4rem] group-hover:scale-150 transition-all duration-700" />
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-white/5 shadow-22xl ${tx.type === 'credit' ? 'bg-green-500/10 shadow-green-500/10 border-green-500/20' : 'bg-red-500/10 shadow-red-500/10 border-red-500/20'}`}>
                         {tx.type === 'credit' ? (
                           <ArrowDownLeft className="text-green-500" size={24} />
                         ) : (
                           <ArrowUpRight className="text-red-500" size={24} />
                         )}
                      </div>
                      <div>
                         <div className="text-white font-bold text-lg font-heading mb-1 tracking-tight pr-4 leading-none">{tx.label}</div>
                         <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                           <Calendar size={12} />
                           {tx.date}
                         </div>
                      </div>
                   </div>
                   <div className={`text-2xl font-bold font-heading ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'} tracking-tighter`}>
                      {tx.amount}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
