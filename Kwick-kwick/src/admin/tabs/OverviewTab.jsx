import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  Store, Users, Car, AlertTriangle, ShieldCheck, DollarSign, ArrowUpRight, Plus, Activity, 
  Tag, Gift, Percent, Calendar, Edit, Trash2, Power, X, Sparkles, CheckCircle2 
} from 'lucide-react';

const OverviewTab = () => {
  const { 
    vendors, 
    customers, 
    riders, 
    offers, 
    setActiveTab, 
    addOffer, 
    updateOffer, 
    deleteOffer, 
    toggleOfferStatus 
  } = useAdmin();

  // Modals for Offers CRUD
  const [isAddOfferModalOpen, setIsAddOfferModalOpen] = useState(false);
  const [isEditOfferModalOpen, setIsEditOfferModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Offer Form
  const [offerForm, setOfferForm] = useState({
    code: '',
    title: '',
    description: '',
    discount: '20% OFF',
    category: 'All Services',
    expiry: '31 Dec 2026'
  });

  const activeVendors = vendors.filter(v => v.status === 'Active').length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const onlineRiders = riders.filter(r => r.dutyStatus === 'Online' || r.dutyStatus === 'On Trip').length;
  const totalWalletPool = customers.reduce((sum, c) => sum + c.walletBalance, 0);
  const activeOffersCount = offers.filter(o => o.status === 'Active').length;

  const handleOpenAddOffer = () => {
    setOfferForm({
      code: '',
      title: '',
      description: '',
      discount: '20% OFF',
      category: 'All Services',
      expiry: '31 Dec 2026'
    });
    setIsAddOfferModalOpen(true);
  };

  const handleOpenEditOffer = (offer) => {
    setSelectedOffer(offer);
    setOfferForm({
      code: offer.code,
      title: offer.title,
      description: offer.description,
      discount: offer.discount,
      category: offer.category,
      expiry: offer.expiry
    });
    setIsEditOfferModalOpen(true);
  };

  const handleAddOfferSubmit = (e) => {
    e.preventDefault();
    addOffer(offerForm);
    setIsAddOfferModalOpen(false);
  };

  const handleEditOfferSubmit = (e) => {
    e.preventDefault();
    if (selectedOffer) {
      updateOffer(selectedOffer.id, offerForm);
      setIsEditOfferModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-white rounded-xl shadow-md">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-base text-amber-950">Emergency Control & Promotional Center Active</h3>
            <p className="text-xs text-amber-800 font-medium">All ambulance dispatches, vendor availability, and customer promotional offers are operating under live Super Admin monitoring.</p>
          </div>
        </div>
        <div className="mt-3 md:mt-0 flex gap-2">
          <button 
            onClick={() => setActiveTab('riders')}
            className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition shadow"
          >
            Manage Ambulances & Riders
          </button>
        </div>
      </div>

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Active Offers Metric */}
        <div className="p-5 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-100 uppercase">Live Ongoing Offers</span>
            <div className="p-2.5 bg-white/20 text-white rounded-xl backdrop-blur-md">
              <Gift size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black">{activeOffersCount}</span>
            <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
              Active Promo Codes
            </span>
          </div>
          <p className="mt-2 text-xs text-amber-100 font-medium">Discounts & Cashback Live</p>
        </div>

        {/* Vendors Metric */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Vendor Partners</span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Store size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{vendors.length}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight size={12} /> {activeVendors} Active
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Ambulances, stores & clinics</p>
        </div>

        {/* Customers Metric */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Registered Customers</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{customers.length}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {activeCustomers} Verified
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Total User Base Across Munger</p>
        </div>

        {/* Riders Metric */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Riders & Drivers</span>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <Car size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{riders.length}</span>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              {onlineRiders} On Duty
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Emergency & Delivery Fleet</p>
        </div>

        {/* Wallet Pool Metric */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Customer Wallet Balance</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">₹{totalWalletPool.toLocaleString()}</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Combined customer wallet pool</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ONGOING OFFERS & PROMOTIONAL DISCOUNTS PANEL                               */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Tag size={20} className="text-amber-500" /> Ongoing Offers & Customer Promotions
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Manage live coupon codes, discount banners, expiry dates, and module targets across Kwick.</p>
          </div>
          <button
            onClick={handleOpenAddOffer}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
          >
            <Plus size={16} /> Create New Offer Code
          </button>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                offer.status === 'Active'
                  ? 'bg-gradient-to-b from-amber-50/50 to-white border-amber-200/80 shadow-sm hover:shadow-md'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded-lg tracking-wider">
                    {offer.code}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    offer.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {offer.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-1">{offer.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{offer.description}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>Discount Value:</span>
                  <span className="font-extrabold text-amber-600">{offer.discount}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Target Module:</span>
                  <span className="font-bold text-slate-700">{offer.category}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1"><Calendar size={11} /> Expires:</span>
                  <span className="font-semibold text-slate-600">{offer.expiry}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400">
                  {offer.usageCount} Redeemed
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleOfferStatus(offer.id)}
                    title="Toggle Active/Inactive"
                    className={`p-1.5 rounded-lg text-xs font-bold transition ${
                      offer.status === 'Active' ? 'hover:bg-amber-100 text-amber-600' : 'hover:bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    <Power size={14} />
                  </button>
                  <button
                    onClick={() => handleOpenEditOffer(offer)}
                    title="Edit Offer Details"
                    className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete promo code "${offer.code}"?`)) {
                        deleteOffer(offer.id);
                      }
                    }}
                    title="Delete Offer"
                    className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Section Shortcuts & Live Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Management Shortcuts */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Activity size={20} className="text-amber-500" /> Executive Section Control
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Vendor Card */}
            <div 
              onClick={() => setActiveTab('vendors')}
              className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <Store size={28} className="opacity-90" />
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Module 1</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">Vendor Management</h3>
              <p className="mt-1 text-xs text-blue-100">Control catalog items, business categories, commissions & onboarding.</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-200 hover:text-white">
                Open Vendor Console &rarr;
              </div>
            </div>

            {/* Customer Card */}
            <div 
              onClick={() => setActiveTab('customers')}
              className="p-5 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <Users size={28} className="opacity-90" />
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Module 2</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">Customer Management</h3>
              <p className="mt-1 text-xs text-emerald-100">Manage user accounts, adjust wallet balances, view bookings & handle bans.</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-200 hover:text-white">
                Open Customer Console &rarr;
              </div>
            </div>

            {/* Rider Card */}
            <div 
              onClick={() => setActiveTab('riders')}
              className="p-5 bg-gradient-to-br from-purple-600 to-pink-700 text-white rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <Car size={28} className="opacity-90" />
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Module 3</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">Rider & Ambulance Control</h3>
              <p className="mt-1 text-xs text-purple-100">Track live GPS, toggle online duty status, re-assign emergency dispatch calls.</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-200 hover:text-white">
                Open Rider Console &rarr;
              </div>
            </div>
          </div>
        </div>

        {/* Live System Activity Log */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" /> Live Admin Audit Log
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time</span>
            </div>

            <div className="space-y-3.5">
              <div className="flex gap-3 items-start text-xs">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-800">Super Admin launched promo code "SAVE20" (20% OFF)</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Just now</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-800">Super Admin updated Vendor #VND-101 Commission to 10%</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">2 minutes ago</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-800">New Customer Priyanshu Kumar added (Wallet: ₹450)</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">15 minutes ago</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-800">Driver Arjun Sharma toggled status to ONLINE (ALS Ambulance)</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">34 minutes ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <span className="text-xs font-semibold text-slate-400">System Version 2.5 — All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* CREATE NEW OFFER MODAL */}
      {isAddOfferModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <Tag size={18} className="text-amber-600" /> Create New Promo Code
              </h3>
              <button onClick={() => setIsAddOfferModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddOfferSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Promo Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KWICK50"
                    value={offerForm.code}
                    onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Tag</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 20% OFF / ₹50 OFF"
                    value={offerForm.discount}
                    onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Offer Headline Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50% Off On First Ambulance Request"
                  value={offerForm.title}
                  onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Offer Description</label>
                <textarea
                  required
                  rows="2"
                  placeholder="Short terms or description for customer view..."
                  value={offerForm.description}
                  onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Service</label>
                  <input
                    type="text"
                    required
                    placeholder="Ambulance / Grocery / All"
                    value={offerForm.category}
                    onChange={(e) => setOfferForm({ ...offerForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="31 Dec 2026"
                    value={offerForm.expiry}
                    onChange={(e) => setOfferForm({ ...offerForm, expiry: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOfferModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition shadow"
                >
                  Publish Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT OFFER MODAL */}
      {isEditOfferModalOpen && selectedOffer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <Edit size={18} className="text-amber-600" /> Edit Promo Code Details
              </h3>
              <button onClick={() => setIsEditOfferModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditOfferSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Promo Code</label>
                  <input
                    type="text"
                    required
                    value={offerForm.code}
                    onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Tag</label>
                  <input
                    type="text"
                    required
                    value={offerForm.discount}
                    onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Offer Headline</label>
                <input
                  type="text"
                  required
                  value={offerForm.title}
                  onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  required
                  rows="2"
                  value={offerForm.description}
                  onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Service</label>
                  <input
                    type="text"
                    required
                    value={offerForm.category}
                    onChange={(e) => setOfferForm({ ...offerForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={offerForm.expiry}
                    onChange={(e) => setOfferForm({ ...offerForm, expiry: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditOfferModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
