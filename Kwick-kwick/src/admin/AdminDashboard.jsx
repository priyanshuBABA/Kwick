import React from 'react';
import { useAdmin, AdminProvider } from './context/AdminContext';
import OverviewTab from './tabs/OverviewTab';
import VendorManagementTab from './tabs/VendorManagementTab';
import CustomerManagementTab from './tabs/CustomerManagementTab';
import RiderManagementTab from './tabs/RiderManagementTab';
import { LayoutDashboard, Store, Users, Car, ShieldAlert, LogOut, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardContent = () => {
  const { activeTab, setActiveTab } = useAdmin();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased pb-12">
      {/* Top Fixed Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg shadow">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight">KWICK</h1>
                <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-widest">
                  Super Admin
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Full Ecosystem Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Dispatch Core Online
            </div>
            
            <button
              onClick={() => navigate('/role-selection')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition border border-slate-700"
            >
              <LogOut size={14} /> Switch Role
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard size={16} /> Master Overview
          </button>

          <button
            onClick={() => setActiveTab('vendors')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'vendors'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Store size={16} /> Vendors Module
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'customers'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users size={16} /> Customers Module
          </button>

          <button
            onClick={() => setActiveTab('riders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'riders'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Car size={16} /> Riders & Ambulances Module
          </button>
        </div>

        {/* Tab Views */}
        <div>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'vendors' && <VendorManagementTab />}
          {activeTab === 'customers' && <CustomerManagementTab />}
          {activeTab === 'riders' && <RiderManagementTab />}
        </div>
      </main>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <AdminProvider>
      <AdminDashboardContent />
    </AdminProvider>
  );
};

export default AdminDashboard;
