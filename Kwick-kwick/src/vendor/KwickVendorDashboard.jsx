import { useState } from "react";
import {
  Zap, Store, Package, Wallet, User, ChevronRight, Check, X,
  Clock, IndianRupee, LogOut, Camera, Bell, TrendingUp,
  CreditCard, Edit3, ListChecks, Power,
} from "lucide-react";
import { useAppContext } from "../AppContext";

const amberGrad = "linear-gradient(135deg,#FFD54A,#F5A623)";

const Logo = ({ size = 28 }) => (
  <div className="flex items-center gap-2">
    <div
      className="flex items-center justify-center rounded-2xl shadow-sm"
      style={{ width: size, height: size, background: amberGrad }}
    >
      <Zap className="text-slate-900" style={{ width: size * 0.55, height: size * 0.55 }} fill="currentColor" />
    </div>
    <span className="font-black tracking-tight text-slate-900" style={{ fontSize: size * 0.62 }}>
      Kwick<span className="text-amber-400">.</span>
      <span className="text-slate-400" style={{ fontSize: size * 0.42 }}> Partner</span>
    </span>
  </div>
);

const initialNew = [
  { id: "KW-9931", items: ["2x Shirt", "1x Trouser"], amount: 90, mins: 0 },
  { id: "KW-9928", items: ["1x Blanket"], amount: 180, mins: 2 },
];

const initialActive = [
  { id: "KW-9910", items: ["3x Kurta", "2x Saree"], amount: 260, status: "Preparing" },
];

const history = [
  { id: "KW-9880", items: ["2x Shirt"], amount: 60, status: "Delivered", time: "Today, 11:20 AM" },
  { id: "KW-9871", items: ["1x Blanket", "1x Curtain"], amount: 330, status: "Delivered", time: "Today, 9:05 AM" },
  { id: "KW-9862", items: ["4x T-Shirt"], amount: 100, status: "Cancelled", time: "Yesterday" },
];

const weekEarnings = [
  { d: "Mon", v: 620 }, { d: "Tue", v: 810 }, { d: "Wed", v: 540 },
  { d: "Thu", v: 920 }, { d: "Fri", v: 1080 }, { d: "Sat", v: 1240 }, { d: "Sun", v: 760 },
];

const BigButton = ({ children, onClick, color = "amber", className = "" }) => {
  const styles = {
    amber: { background: amberGrad, color: "#0f172a" },
    green: { background: "linear-gradient(135deg,#4ADE80,#16A34A)", color: "#fff" },
    red: { background: "#fee2e2", color: "#dc2626" },
    dark: { background: "#0f172a", color: "#fff" },
  };
  return (
    <button
      onClick={onClick}
      style={styles[color]}
      className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-4 font-black text-base shadow-sm active:scale-[0.97] transition-transform ${className}`}
    >
      {children}
    </button>
  );
};

const SectionTitle = ({ children }) => (
  <h2 className="text-lg font-black text-slate-900 mb-3">{children}</h2>
);

function DashboardHome({ storeOpen, setStoreOpen, newOrders, onGoOrders }) {
  const todayEarning = 2480;
  const todayOrders = 18;
  const pending = newOrders.length;

  return (
    <div className="px-5 pt-6 pb-6 space-y-6">
      <div className="flex items-center justify-between">
        <Logo size={28} />
        <button className="h-10 w-10 rounded-full bg-white border border-amber-100 flex items-center justify-center shadow-sm relative">
          <Bell size={18} className="text-slate-500" />
          {pending > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {pending}
            </span>
          )}
        </button>
      </div>

      <div
        className="rounded-3xl p-6 text-white flex items-center justify-between shadow-lg"
        style={{ background: storeOpen ? "linear-gradient(135deg,#1A1F2E,#232A3D)" : "linear-gradient(135deg,#4b5563,#374151)" }}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Store Status</p>
          <p className={`text-2xl font-black ${storeOpen ? "text-emerald-400" : "text-slate-300"}`}>
            {storeOpen ? "OPEN" : "CLOSED"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {storeOpen ? "You're receiving new orders" : "Turn on to start receiving orders"}
          </p>
        </div>
        <button
          onClick={() => setStoreOpen(!storeOpen)}
          className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: storeOpen ? "#22C55E" : "#6B7280" }}
        >
          <Power size={28} className="text-white" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-sm text-center">
          <IndianRupee className="mx-auto text-amber-500 mb-1" size={20} />
          <p className="text-lg font-black text-slate-900">₹{todayEarning}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Aaj ki Kamai</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-sm text-center">
          <Package className="mx-auto text-amber-500 mb-1" size={20} />
          <p className="text-lg font-black text-slate-900">{todayOrders}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Aaj ke Orders</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-sm text-center">
          <Clock className="mx-auto text-red-500 mb-1" size={20} />
          <p className="text-lg font-black text-slate-900">{pending}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Pending</p>
        </div>
      </div>

      {pending > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <SectionTitle>New Orders</SectionTitle>
            <button onClick={onGoOrders} className="text-amber-600 font-bold text-sm flex items-center gap-1">
              See all <ChevronRight size={15} />
            </button>
          </div>
          <div className="bg-white rounded-2xl p-4 border-2 border-amber-300 shadow-sm">
            <p className="font-black text-slate-900">Order #{newOrders[0].id}</p>
            <p className="text-sm text-slate-500 font-semibold mt-0.5">{newOrders[0].items.join(", ")}</p>
            <p className="font-black text-amber-600 mt-1">₹{newOrders[0].amount}</p>
            <button
              onClick={onGoOrders}
              className="w-full mt-3 rounded-xl py-3 font-black text-slate-900"
              style={{ background: amberGrad }}
            >
              View & Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function OrdersPage({ newOrders, setNewOrders, active, setActive, onAcceptLive, onRejectLive }) {
  const [tab, setTab] = useState("New");

  const accept = (order) => {
    if (order.sourceId && onAcceptLive) {
      onAcceptLive(order.sourceId);
      return;
    }
    setNewOrders((o) => o.filter((x) => x.id !== order.id));
    setActive((a) => [...a, { ...order, status: "Preparing" }]);
  };
  const reject = (order) => {
    if (order.sourceId && onRejectLive) {
      onRejectLive(order.sourceId);
      return;
    }
    setNewOrders((o) => o.filter((x) => x.id !== order.id));
  };
  const markReady = (order) => {
    setActive((a) => a.map((x) => (x.id === order.id ? { ...x, status: "Ready for Pickup" } : x)));
  };

  return (
    <div className="px-5 pt-6 pb-6">
      <SectionTitle>Orders</SectionTitle>

      <div className="flex bg-white rounded-2xl p-1 border border-amber-100 mb-5 shadow-sm">
        { ["New", "Active", "History"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-colors relative ${
              tab === t ? "bg-slate-900 text-white" : "text-slate-400"
            }`}
          >
            {t}
            {t === "New" && newOrders.length > 0 && (
              <span className="absolute -top-1.5 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {newOrders.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "New" && (
        <div className="space-y-3">
          {newOrders.length === 0 && <EmptyState text="No new orders right now." />}
          {newOrders.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl p-5 border-2 border-amber-300 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="font-black text-slate-900">#{o.id}</p>
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">New</span>
              </div>
              <p className="text-sm text-slate-600 font-semibold">{o.items.join(", ")}</p>
              <p className="font-black text-amber-600 text-lg mt-1">₹{o.amount}</p>
              <div className="flex gap-3 mt-4">
                <BigButton color="green" onClick={() => accept(o)}>
                  <Check size={20} /> Accept
                </BigButton>
                <BigButton color="red" onClick={() => reject(o)}>
                  <X size={20} /> Reject
                </BigButton>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Active" && (
        <div className="space-y-3">
          {active.length === 0 && <EmptyState text="No active orders being prepared." />}
          {active.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="font-black text-slate-900">#{o.id}</p>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    o.status === "Ready for Pickup" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {o.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 font-semibold">{o.items.join(", ")}</p>
              <p className="font-black text-slate-900 text-lg mt-1">₹{o.amount}</p>
              {o.status !== "Ready for Pickup" && (
                <button
                  onClick={() => markReady(o)}
                  className="w-full mt-4 rounded-2xl py-4 font-black text-white shadow-sm"
                  style={{ background: "#0f172a" }}
                >
                  Mark Ready for Pickup
                </button>
              )}
              {o.status === "Ready for Pickup" && (
                <p className="text-center text-emerald-600 font-bold text-sm mt-4">
                  ✓ Waiting for rider pickup
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "History" && (
        <div className="space-y-3">
          {history.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="font-black text-slate-900 text-sm">#{o.id}</p>
                <p className="text-xs text-slate-400 font-semibold">{o.items.join(", ")}</p>
                <p className="text-[11px] text-slate-300 font-semibold mt-0.5">{o.time}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900">₹{o.amount}</p>
                <span className={`text-xs font-bold ${o.status === "Delivered" ? "text-emerald-500" : "text-red-400"}`}>
                  {o.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const EmptyState = ({ text }) => (
  <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center">
    <p className="text-slate-400 font-semibold text-sm">{text}</p>
  </div>
);

function EarningsPage() {
  const max = Math.max(...weekEarnings.map((w) => w.v));
  const weekTotal = weekEarnings.reduce((s, w) => s + w.v, 0);

  return (
    <div className="px-5 pt-6 pb-6">
      <SectionTitle>Earnings & Payouts</SectionTitle>

      <div className="rounded-3xl p-6 text-white mb-4" style={{ background: "linear-gradient(135deg,#1A1F2E,#2A3145)" }}>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">This week</p>
        <p className="text-3xl font-black mt-1">₹{weekTotal}</p>
        <div className="flex items-center gap-2 mt-3 text-emerald-400 text-sm font-bold">
          <TrendingUp size={16} /> 12% higher than last week
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm mb-4">
        <p className="text-sm font-bold text-slate-700 mb-4">Daily earnings</p>
        <div className="flex items-end justify-between gap-2 h-32">
          {weekEarnings.map((w) => (
            <div key={w.d} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md"
                style={{ height: `${(w.v / max) * 100}%`, background: amberGrad }}
              />
              <span className="text-[10px] font-bold text-slate-400">{w.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CreditCard size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Last payout</p>
            <p className="text-xs text-slate-400 font-semibold">Transferred to bank ••4821</p>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Done</span>
      </div>
    </div>
  );
}

function ProfilePage({ onLogout }) {
  const rows = [
    { icon: Edit3, label: "Edit Store Details", desc: "Name, photo, timings" },
    { icon: ListChecks, label: "Product / Service List", desc: "Update items & prices" },
    { icon: CreditCard, label: "Bank & UPI Details", desc: "Secure payout info" },
  ];

  return (
    <div className="px-5 pt-6 pb-6">
      <SectionTitle>Profile</SectionTitle>

      <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm flex items-center gap-4 mb-5">
        <button className="relative h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <Camera size={22} className="text-slate-400" />
        </button>
        <div>
          <p className="font-black text-slate-900">Sparkle Laundry Co.</p>
          <p className="text-sm text-slate-400 font-semibold">Munger, Bihar</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-amber-100 shadow-sm divide-y divide-slate-100 mb-5">
        {rows.map((r) => (
          <button key={r.label} className="w-full flex items-center gap-4 px-5 py-4 text-left">
            <div className="h-11 w-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <r.icon size={19} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-800 text-sm">{r.label}</p>
              <p className="text-xs text-slate-400">{r.desc}</p>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
        ))}
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-black text-red-500 bg-red-50"
        onClick={() => onLogout && onLogout()}
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}

export default function KwickVendorDashboard({ onLogout, serviceName = "" }) {
  const [tab, setTab] = useState("Home");
  const [storeOpen, setStoreOpen] = useState(true);
  const [newOrders, setNewOrders] = useState(initialNew);
  const [active, setActive] = useState(initialActive);
  const { vendorOrders, acceptAsVendor, rejectAsVendor } = useAppContext();
  const normalizedService = serviceName.toLowerCase().trim();
  const matchingOrders = vendorOrders.filter((order) => {
    if (!normalizedService || normalizedService === "general") return true;
    const orderService = String(order.service || "").toLowerCase().trim();
    return orderService === normalizedService || orderService.includes(normalizedService) || normalizedService.includes(orderService);
  });
  const liveNewOrders = matchingOrders
    .filter((order) => order.status === "pending")
    .map((order) => ({
      sourceId: order.id,
      id: order.id,
      items: order.items.map((item) => `${item.quantity || 1}x ${item.name || item.title || "Item"}`),
      amount: order.total,
    }));
  const liveActiveOrders = matchingOrders
    .filter((order) => order.status !== "pending" && order.status !== "Cancelled")
    .map((order) => ({
      sourceId: order.id,
      id: order.id,
      items: order.items.map((item) => `${item.quantity || 1}x ${item.name || item.title || "Item"}`),
      amount: order.total,
      status: order.status,
    }));
  const displayedNewOrders = [...liveNewOrders, ...newOrders];
  const displayedActiveOrders = [...liveActiveOrders, ...active];

  const navItems = [
    { name: "Home", Icon: Store },
    { name: "Orders", Icon: Package },
    { name: "Earnings", Icon: Wallet },
    { name: "Profile", Icon: User },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: "#FFFBF2" }}>
      <div className="flex-1 overflow-y-auto pb-28 w-full">
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 py-4">
        {tab === "Home" && (
          <DashboardHome
            storeOpen={storeOpen}
            setStoreOpen={setStoreOpen}
            newOrders={displayedNewOrders}
            onGoOrders={() => setTab("Orders")}
          />
        )}
        {tab === "Orders" && (
          <OrdersPage
            newOrders={displayedNewOrders}
            setNewOrders={setNewOrders}
            active={displayedActiveOrders}
            setActive={setActive}
            onAcceptLive={acceptAsVendor}
            onRejectLive={rejectAsVendor}
          />
        )}
        {tab === "Earnings" && <EarningsPage />}
        {tab === "Profile" && <ProfilePage onLogout={onLogout} />}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur border-t border-amber-100 flex justify-around py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navItems.map(({ name, Icon }) => (
          <button key={name} onClick={() => setTab(name)} className="flex flex-col items-center gap-1 px-3 py-1.5 sm:px-6">
            <Icon size={22} className={tab === name ? "text-amber-500" : "text-slate-400"} />
            <span className={`text-[11px] font-bold ${tab === name ? "text-amber-500" : "text-slate-400"}`}>
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
