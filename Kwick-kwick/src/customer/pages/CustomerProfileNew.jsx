import React, { useState } from 'react';
import MobileFrame from '../../components/MobileFrame';
import BottomNav from '../../components/BottomNav';
import { SETTINGS } from '../../data/htmlDesignData';
import { LogOut, ChevronRight, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userInfo] = useState({
    name: 'Rahul Mehta',
    phone: '+91 98765 43210',
    email: 'rahul.mehta@email.com',
    isPro: true,
    avatar: 'R',
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  const handleSettingClick = (setting) => {
    alert(`Opening ${setting.t}...`);
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

        {/* Settings List */}
        <div className="px-6 flex flex-col gap-2 mb-8">
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
