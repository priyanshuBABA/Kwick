import React, { useState } from 'react';
import MobileFrame from '../../components/MobileFrame';
import BottomNav from '../../components/BottomNav';
import { SETTINGS } from '../../data/htmlDesignData';
import { LogOut, ChevronRight, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const { roles, activeRole, switchRole } = useAuth();
  const navigate = useNavigate();
  const rolePath = (role) => role === 'customer' ? '/customer/home' : role === 'vendor' ? '/service-provider' : `/${role}`;
  const [userInfo] = useState({
    name: 'Rahul Mehta',
    phone: '+91 98765 43210',
    email: 'rahul.mehta@email.com',
    isPro: true,
    avatar: 'R',
  });

  const handleLogout = () => {
    navigate('/customer/profile/logout');
  };

  const handleSettingClick = (setting) => {
    if (setting.path) {
      navigate(setting.path);
      return;
    }
    if (setting.id === 'st6') navigate('/customer/profile/support');
  };

  return (
    <MobileFrame>
      <div className="pb-20">
        {/* Profile Header */}
        <div className="mx-6 mt-6 mb-8 bg-white border border-gray-200 rounded-2xl p-6 flex gap-4">
          <div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-black text-2xl flex-shrink-0"
          >
            {userInfo.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-black text-lg text-slate-900">{userInfo.name}</h2>
              {userInfo.isPro && (
                <span className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3" /> Pro Member
                </span>
              )}
            </div>
            <div className="text-xs text-gray-600">
              {userInfo.phone} · {userInfo.email}
            </div>
          </div>
        </div>

        {/* Kwick Pro quick access */}
        <div className="px-6 mb-4">
          <div
            onClick={() => navigate('/customer/profile/kwick-pro')}
            className="cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#FF6B00] p-5 text-white shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-yellow-300">Kwick Pro</p>
                <h3 className="mt-2 text-xl font-black">3 Months Plan</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Crown className="h-6 w-6 text-yellow-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-3 py-2">
              <span className="text-sm font-medium text-slate-200">Renews on 12 Oct 2026</span>
              <span className="rounded-full bg-yellow-300 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-900">Manage</span>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="px-6 flex flex-col gap-2 mb-8">
          {roles.length > 1 && (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <b className="text-sm text-slate-900">Switch role</b>
                <span className="text-xs font-semibold uppercase tracking-wide text-orange-700">Current: {activeRole}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <button key={role} type="button" onClick={() => { switchRole(role); navigate(rolePath(role)); }} className={`rounded-full px-3 py-2 text-xs font-bold ${activeRole === role ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}>
                    {role === 'vendor' ? 'Service Provider' : role}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!roles.includes('rider') && (
            <button type="button" onClick={() => navigate('/customer/profile/become-rider')} className="flex items-center gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-left transition-colors hover:bg-orange-100">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-lg">🚴</span>
              <span className="flex-1"><b className="block text-sm text-slate-900">Become a Rider</b><span className="text-xs text-gray-600">Add the rider role to this account</span></span>
              <ChevronRight className="h-5 w-5 text-orange-400" />
            </button>
          )}
          {!roles.includes('vendor') && (
            <button type="button" onClick={() => navigate('/customer/profile/become-vendor')} className="flex items-center gap-4 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-left transition-colors hover:bg-sky-100">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-lg">🏪</span>
              <span className="flex-1"><b className="block text-sm text-slate-900">Become a Service Provider</b><span className="text-xs text-gray-600">Add the vendor role to this account</span></span>
              <ChevronRight className="h-5 w-5 text-sky-400" />
            </button>
          )}
          {SETTINGS.map((setting) => (
            <div
              key={setting.id}
              onClick={() => handleSettingClick(setting)}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:border-gray-300 cursor-pointer transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                {setting.ic}
              </div>
              <div className="flex-1">
                <b className="block text-sm text-slate-900">{setting.t}</b>
                <span className="text-xs text-gray-600">{setting.s}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          ))}

          {/* Logout Button */}
          <div
            onClick={handleLogout}
            className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4 hover:bg-red-100 cursor-pointer transition-colors group"
          >
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-red-200 transition-colors">
              🚪
            </div>
            <div className="flex-1">
              <b className="block text-sm text-red-600">Logout</b>
              <span className="text-xs text-gray-600">Sign out of your Kwick account</span>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400 flex-shrink-0" />
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center text-xs text-gray-500 pb-4">
          <p>Kwick v1.0.0</p>
          <p>© 2026 Kwick. All rights reserved.</p>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
};

export default CustomerProfile;
