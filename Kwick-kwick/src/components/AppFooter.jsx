import React from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', to: '/customer/home' },
  { label: 'Offer', to: '/customer/offers' },
  { label: 'Orders', to: '/customer/orders' },
  { label: 'Wallet', to: '/customer/wallet' },
];

const serviceLinks = [
  { label: 'Fresh Mandi', to: '/customer/fresh-mandi' },
  { label: 'Medicines', to: '/customer/medicines' },
  { label: 'Home Services', to: '/customer/home-services' },
  { label: 'RideGo', to: '/ride-booking' },
];

const supportLinks = [
  { label: 'Help Center', to: '/customer/profile/help' },
  { label: 'Address Book', to: '/customer/profile/addresses' },
  { label: 'Privacy', to: '/customer/profile' },
  { label: 'Contact', to: '/customer/notifications' },
];

const AppFooter = () => {
  return (
    <footer className="mt-8 border-t border-orange-100 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-5 shadow-2xl shadow-slate-950/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-lg font-black text-white shadow-lg shadow-orange-500/30">
                K
              </div>
              <div>
                <p className="text-xl font-black tracking-tight text-white">Kwick</p>
                <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Fast. Local. Trustworthy.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-2 text-xs font-bold text-orange-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live delivery support
            </div>
          </div>

          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <p className="text-sm leading-6 text-slate-300">
                Quick delivery, local essentials, and trusted services — all in one premium app experience.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Quick Links</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="transition-colors hover:text-orange-300">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Services</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="transition-colors hover:text-orange-300">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Support</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="transition-colors hover:text-orange-300">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 Kwick. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
