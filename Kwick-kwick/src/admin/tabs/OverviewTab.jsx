import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Store, Users, Car, AlertTriangle, ShieldCheck, DollarSign, ArrowUpRight, Plus, Activity } from 'lucide-react';

const OverviewTab = () => {
  const { vendors, customers, riders, setActiveTab } = useAdmin();

  const activeVendors = vendors.filter(v => v.status === 'Active').length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const onlineRiders = riders.filter(r => r.dutyStatus === 'Online' || r.dutyStatus === 'On Trip').length;
  const totalWalletPool = customers.reduce((sum, c) => sum + c.walletBalance, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-white rounded-xl shadow-md">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-base text-amber-950">Emergency Control System Active</h3>
            <p className="text-xs text-amber-800 font-medium">All ambulance dispatches and vendor availability are operating under live Super Admin monitoring.</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <p className="mt-2 text-xs text-slate-500">Ambulance providers, stores & clinics</p>
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
          <p className="mt-2 text-xs text-slate-500">Total User Base Across Munger/Bihar</p>
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
          <p className="mt-2 text-xs text-slate-500">Combined balance in customer wallets</p>
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
              <p className="mt-1 text-xs text-blue-100">Control catalog items, override status, manage commissions & onboarding.</p>
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

              <div className="flex gap-3 items-start text-xs">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-800">Vendor Mishra Ji Bakery status set to SUSPENDED</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <span className="text-xs font-semibold text-slate-400">System Version 2.4 — All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
