import { useEffect, useMemo, useRef, useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; }
  .vd-root, .vd-root * { font-family: 'DM Sans', sans-serif; }

  :root {
    --teal: #0a6e6e; --teal-light: #0e9090; --teal-dark: #054545;
    --gold: #c8972a; --gold-light: #e8b84b;
    --cream: #fdf8f0; --white: #ffffff;
    --gray-50: #f8fafb; --gray-100: #eef2f5; --gray-200: #dde4ea;
    --gray-400: #8fa0ad; --gray-600: #4a6070; --gray-800: #1a2e3a;
    --red: #e05252; --red-bg: #fdeaea;
    --green: #2e9e6a; --green-bg: #e8f6ef;
    --blue: #2b7fd6; --blue-bg: #e8f1fc;
    --amber: #c8972a; --amber-bg: #fbf2df;
    --purple: #7a5ec2; --purple-bg: #f0ecfa;
    --shadow-sm: 0 2px 8px rgba(10,110,110,0.08);
    --shadow-md: 0 6px 24px rgba(10,110,110,0.12);
    --shadow-lg: 0 16px 48px rgba(10,110,110,0.18);
    --radius: 16px; --radius-sm: 10px;
  }

  .vd-root { background: var(--cream); min-height: 100vh; color: var(--gray-800); }
  .vd-topbar { background: var(--teal-dark); padding: 0 1.5rem; height: 68px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 200; box-shadow: 0 2px 20px rgba(0,0,0,0.3); flex-wrap: wrap; gap: 0.5rem; }
  .vd-logo { display: flex; align-items: center; gap: 10px; }
  .vd-logo-icon { width: 38px; height: 38px; background: var(--gold); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .vd-logo-text strong { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: white; display: block; }
  .vd-logo-text span { font-size: 0.68rem; color: rgba(255,255,255,0.6); letter-spacing: 1px; text-transform: uppercase; }
  .vd-top-right { display: flex; align-items: center; gap: 0.8rem; }
  .vd-vendor-select { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 8px 14px; font-size: 0.85rem; cursor: pointer; outline: none; }
  .vd-vendor-select option { color: var(--gray-800); }
  .vd-bell { position: relative; width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; cursor: pointer; flex-shrink: 0; }
  .vd-bell-dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 50%; background: var(--red); border: 2px solid var(--teal-dark); }
  .vd-logout-btn { margin-left: 4px; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.1); color: white; padding: 8px 12px; border-radius: 10px; font-size: 0.82rem; font-weight: 700; cursor: pointer; }

  .vd-ticker-wrap { background: linear-gradient(90deg, var(--teal-dark), var(--teal)); overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .vd-ticker { display: flex; align-items: center; gap: 10px; padding: 9px 1.5rem; color: white; font-size: 0.85rem; }
  .vd-live-dot { width: 8px; height: 8px; border-radius: 50%; background: #ff5b5b; flex-shrink: 0; box-shadow: 0 0 0 0 rgba(255,91,91,0.7); animation: vd-pulse 1.5s infinite; }
  @keyframes vd-pulse { 0% { box-shadow: 0 0 0 0 rgba(255,91,91,0.6); } 70% { box-shadow: 0 0 0 8px rgba(255,91,91,0); } 100% { box-shadow: 0 0 0 0 rgba(255,91,91,0); } }
  .vd-ticker-msg { font-weight: 500; }
  .vd-ticker-msg b { color: var(--gold-light); }
  .vd-ticker.vd-flash { animation: vd-flash 0.6s ease; }
  @keyframes vd-flash { 0% { background: rgba(232,184,75,0.35); } 100% { background: transparent; } }

  .vd-body { max-width: 1280px; margin: 0 auto; padding: 1.6rem 1.5rem 3rem; }
  .vd-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.6rem; }
  .vd-stat { background: white; border-radius: var(--radius); padding: 1.1rem 1.3rem; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 12px; }
  .vd-stat-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
  .vd-stat-num { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; line-height: 1.1; color: var(--gray-800); }
  .vd-stat-label { font-size: 0.75rem; color: var(--gray-400); margin-top: 2px; }

  .vd-section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.8rem; }
  .vd-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--teal-dark); }
  .vd-title span { color: var(--gold); }
  .vd-search { display: flex; align-items: center; gap: 8px; background: white; border: 1px solid var(--gray-200); border-radius: 10px; padding: 8px 12px; min-width: 220px; }
  .vd-search input { border: none; outline: none; font-size: 0.85rem; width: 100%; background: transparent; }

  .vd-tabs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 1.2rem; scrollbar-width: none; }
  .vd-tab { flex-shrink: 0; padding: 8px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 600; cursor: pointer; border: 1.5px solid var(--gray-200); background: white; color: var(--gray-600); transition: all 0.15s; white-space: nowrap; }
  .vd-tab.active { background: var(--teal); border-color: var(--teal); color: white; }
  .vd-tab-count { opacity: 0.7; margin-left: 4px; }

  .vd-table-wrap { background: white; border-radius: var(--radius); box-shadow: var(--shadow-sm); overflow: hidden; }
  .vd-table { width: 100%; border-collapse: collapse; }
  .vd-table thead th { text-align: left; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-400); background: var(--gray-50); padding: 12px 16px; font-weight: 700; border-bottom: 1px solid var(--gray-200); }
  .vd-table tbody tr { border-bottom: 1px solid var(--gray-100); transition: background 0.15s; }
  .vd-table tbody tr:last-child { border-bottom: none; }
  .vd-table tbody tr:hover { background: var(--gray-50); }
  .vd-table tbody tr.vd-new-row { animation: vd-highlight 2.4s ease; }
  @keyframes vd-highlight { 0% { background: #fff6df; } 100% { background: transparent; } }
  .vd-table td { padding: 13px 16px; font-size: 0.85rem; vertical-align: middle; }
  .vd-patient-name { font-weight: 600; color: var(--gray-800); }
  .vd-patient-sub { font-size: 0.75rem; color: var(--gray-400); margin-top: 1px; }
  .vd-ref { font-family: 'DM Sans', sans-serif; font-weight: 600; color: var(--teal); font-size: 0.8rem; background: var(--green-bg); padding: 3px 9px; border-radius: 6px; letter-spacing: 0.3px; }
  .vd-type-chip { font-size: 0.7rem; padding: 2px 8px; border-radius: 6px; font-weight: 600; }
  .vd-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 0.74rem; font-weight: 700; padding: 5px 11px; border-radius: 20px; white-space: nowrap; }
  .vd-badge.Pending { background: var(--amber-bg); color: var(--amber); }
  .vd-badge.Confirmed { background: var(--blue-bg); color: var(--blue); }
  .vd-badge.SampleCollected { background: var(--purple-bg); color: var(--purple); }
  .vd-badge.ReportReady { background: #e0f2ff; color: #1073c4; }
  .vd-badge.Completed { background: var(--green-bg); color: var(--green); }
  .vd-badge.Cancelled { background: var(--red-bg); color: var(--red); }
  .vd-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  .vd-actions { display: flex; gap: 6px; flex-wrap: wrap; }
  .vd-btn { border: none; border-radius: 8px; padding: 7px 12px; font-size: 0.76rem; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
  .vd-btn.primary { background: var(--teal); color: white; }
  .vd-btn.primary:hover { background: var(--teal-light); }
  .vd-btn.gold { background: var(--gold); color: var(--teal-dark); }
  .vd-btn.gold:hover { background: var(--gold-light); }
  .vd-btn.ghost { background: var(--gray-100); color: var(--gray-600); }
  .vd-btn.ghost:hover { background: var(--gray-200); }
  .vd-btn.danger { background: var(--red-bg); color: var(--red); }
  .vd-btn.danger:hover { background: #fadada; }
  .vd-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .vd-empty { text-align: center; padding: 3.5rem 1rem; color: var(--gray-400); }
  .vd-empty-icon { font-size: 2.6rem; margin-bottom: 0.8rem; }

  .vd-cards { display: none; flex-direction: column; gap: 12px; }
  .vd-card { background: white; border-radius: var(--radius); padding: 1rem; box-shadow: var(--shadow-sm); }
  .vd-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; gap: 8px; }
  .vd-card-meta { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 0.78rem; color: var(--gray-600); margin-bottom: 10px; }
  .vd-card-meta b { color: var(--gray-800); }

  @media (max-width: 860px) {
    .vd-stats { grid-template-columns: repeat(2, 1fr); }
    .vd-table-wrap { display: none; }
    .vd-cards { display: flex; }
  }
  @media (max-width: 480px) {
    .vd-stats { grid-template-columns: 1fr 1fr; }
    .vd-search { min-width: 0; flex: 1; }
    .vd-section-head { flex-direction: column; align-items: stretch; }
    .vd-topbar { padding: 0 1rem; height: auto; padding-top: 0.8rem; padding-bottom: 0.8rem; }
    .vd-top-right { width: 100%; justify-content: space-between; }
  }

  .vd-overlay { position: fixed; inset: 0; background: rgba(5,20,20,0.55); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 999; padding: 1rem; }
  .vd-modal { background: white; border-radius: var(--radius); width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg); }
  .vd-modal-head { background: linear-gradient(120deg, var(--teal-dark), var(--teal)); padding: 1.3rem 1.4rem; display: flex; justify-content: space-between; align-items: flex-start; color: white; }
  .vd-modal-head h3 { font-family: 'Playfair Display', serif; font-size: 1.2rem; }
  .vd-modal-close { background: rgba(255,255,255,0.15); border: none; color: white; width: 28px; height: 28px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; flex-shrink: 0; }
  .vd-modal-body { padding: 1.4rem; }
  .vd-info-row { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid var(--gray-100); font-size: 0.86rem; }
  .vd-info-row span:first-child { color: var(--gray-400); }
  .vd-info-row span:last-child { font-weight: 600; color: var(--gray-800); text-align: right; }
  .vd-timeline { margin: 1.2rem 0; display: flex; flex-direction: column; gap: 0; }
  .vd-tl-item { display: flex; gap: 12px; }
  .vd-tl-dot-wrap { display: flex; flex-direction: column; align-items: center; }
  .vd-tl-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--gray-200); flex-shrink: 0; margin-top: 2px; }
  .vd-tl-line { width: 2px; flex: 1; background: var(--gray-200); min-height: 22px; }
  .vd-tl-line.done { background: var(--green); }
  .vd-tl-text { padding-bottom: 18px; font-size: 0.82rem; }
  .vd-tl-text strong { display: block; color: var(--gray-800); font-size: 0.85rem; }
  .vd-tl-text span { color: var(--gray-400); font-size: 0.74rem; }
  .vd-upload-box { border: 2px dashed var(--gray-200); border-radius: var(--radius-sm); padding: 1.4rem; text-align: center; cursor: pointer; transition: all 0.15s; margin-top: 0.6rem; }
  .vd-upload-box:hover { border-color: var(--teal); background: #f2fbfb; }
  .vd-upload-box.uploaded { border-color: var(--green); background: var(--green-bg); border-style: solid; }
  .vd-upload-box input { display: none; }
  .vd-modal-foot { padding: 1rem 1.4rem 1.4rem; display: flex; gap: 8px; }
  .vd-modal-foot .vd-btn { flex: 1; padding: 11px; font-size: 0.85rem; }

  .vd-toast-wrap { position: fixed; top: 84px; right: 20px; z-index: 1100; display: flex; flex-direction: column; gap: 10px; }
  .vd-toast { background: var(--teal-dark); color: white; padding: 12px 16px; border-radius: 10px; font-size: 0.83rem; box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 10px; min-width: 240px; animation: vd-toast-in 0.25s ease; }
  @keyframes vd-toast-in { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  .vd-toast b { color: var(--gold-light); }
`;

const VENDORS = [
  { id: "D-001", name: "Dr. Rajesh Kumar Sinha", type: "doctor" },
  { id: "D-003", name: "Dr. Priya Sharma", type: "doctor" },
  { id: "L-001", name: "DocBook Diagnostic Lab, Munger", type: "lab" },
];

const STATUS_FLOW_DOCTOR = ["Pending", "Confirmed", "Completed"];
const STATUS_FLOW_LAB = ["Pending", "Confirmed", "SampleCollected", "ReportReady", "Completed"];
const STATUS_LABEL = {
  Pending: "Pending",
  Confirmed: "Confirmed",
  SampleCollected: "Sample Collected",
  ReportReady: "Report Ready",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

const FIRST_NAMES = ["Rahul", "Anjali", "Suresh", "Kavita", "Manoj", "Priyanka", "Deepak", "Neha", "Ravi", "Sunita", "Ajay", "Pooja"];
const LAST_NAMES = ["Kumar", "Sharma", "Singh", "Devi", "Prasad", "Verma", "Yadav", "Gupta"];
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const genRef = () => "MJ" + Math.floor(100000 + Math.random() * 900000);
const genPhone = () => "9" + Math.floor(100000000 + Math.random() * 900000000);

function makeBooking(vendor, statusOverride) {
  const isLab = vendor.type === "lab";
  const slots = isLab ? ["6:00-7:00 AM", "7:00-8:00 AM", "8:00-9:00 AM"] : ["09:00 AM", "10:00 AM", "02:00 PM", "04:00 PM"];
  return {
    bookingId: genRef(),
    vendorId: vendor.id,
    type: vendor.type,
    patient: { name: `${rand(FIRST_NAMES)} ${rand(LAST_NAMES)}`, phone: genPhone(), age: String(18 + Math.floor(Math.random() * 55)) },
    slot: rand(slots),
    date: new Date().toISOString().slice(0, 10),
    status: statusOverride || "Pending",
    fee: isLab ? rand([499, 999, 1499]) : rand([300, 400, 500]),
    paymentStatus: rand(["Paid", "Paid", "Pending"]),
    reportUrl: null,
    createdAt: Date.now(),
  };
}

function seedBookings(vendor) {
  const statuses = ["Pending", "Pending", "Confirmed", vendor.type === "lab" ? "SampleCollected" : "Completed", "Completed", "Cancelled", vendor.type === "lab" ? "ReportReady" : "Completed"];
  return statuses.map((s) => makeBooking(vendor, s)).sort((a, b) => b.createdAt - a.createdAt);
}

function getInitialBookings() {
  try {
    const saved = localStorage.getItem("docbookbihar-bookings");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // ignore
  }

  const map = {};
  VENDORS.forEach((vendor) => {
    map[vendor.id] = seedBookings(vendor);
  });
  return map;
}

export default function DocBookBiharDashboard({ onLogout }) {
  const [vendorId, setVendorId] = useState(() => {
    try {
      return localStorage.getItem("docbookbihar-vendor") || VENDORS[0].id;
    } catch {
      return VENDORS[0].id;
    }
  });
  const vendor = VENDORS.find((item) => item.id === vendorId) || VENDORS[0];
  const [allBookings, setAllBookings] = useState(getInitialBookings);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [tickerMsg, setTickerMsg] = useState("Naye bookings ka real-time update yahin milega.");
  const [flash, setFlash] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [newRowId, setNewRowId] = useState(null);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem("docbookbihar-bookings", JSON.stringify(allBookings));
      localStorage.setItem("docbookbihar-vendor", vendorId);
    } catch (e) {
      // ignore
    }
  }, [allBookings, vendorId]);

  const bookings = allBookings[vendorId] || [];

  const pushToast = (msg) => {
    const id = ++toastId.current;
    setToasts((items) => [...items, { id, msg }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3200);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      const targetVendor = rand(VENDORS);
      const nextBooking = makeBooking(targetVendor);
      setAllBookings((prev) => ({ ...prev, [targetVendor.id]: [nextBooking, ...(prev[targetVendor.id] || [])] }));
      setTickerMsg(`Nayi booking aayi — ${nextBooking.patient.name} ne ${targetVendor.name} ke saath slot book kiya.`);
      setFlash(true);
      window.setTimeout(() => setFlash(false), 650);
      if (targetVendor.id === vendorId) {
        setNewRowId(nextBooking.bookingId);
        pushToast(`🔔 Nayi Booking: ${nextBooking.patient.name} (${nextBooking.bookingId})`);
        window.setTimeout(() => setNewRowId(null), 2400);
      }
    }, 14000);

    return () => window.clearInterval(interval);
  }, [vendorId]);

  const flow = vendor.type === "lab" ? STATUS_FLOW_LAB : STATUS_FLOW_DOCTOR;

  const updateStatus = (bookingId, newStatus) => {
    setAllBookings((prev) => ({
      ...prev,
      [vendorId]: (prev[vendorId] || []).map((booking) => (booking.bookingId === bookingId ? { ...booking, status: newStatus } : booking)),
    }));
    pushToast(`✅ ${bookingId} → ${STATUS_LABEL[newStatus]}`);
    if (selected?.bookingId === bookingId) {
      setSelected((current) => (current ? { ...current, status: newStatus } : current));
    }
  };

  const cancelBooking = (bookingId) => updateStatus(bookingId, "Cancelled");

  const uploadReport = (bookingId) => {
    setAllBookings((prev) => ({
      ...prev,
      [vendorId]: (prev[vendorId] || []).map((booking) => (booking.bookingId === bookingId ? { ...booking, status: "ReportReady", reportUrl: "report.pdf" } : booking)),
    }));
    pushToast(`📎 Report upload ho gaya — patient ko WhatsApp link bhej diya gaya`);
    if (selected?.bookingId === bookingId) {
      setSelected((current) => (current ? { ...current, status: "ReportReady", reportUrl: "report.pdf" } : current));
    }
  };

  const nextAction = (booking) => {
    const index = flow.indexOf(booking.status);
    if (index === -1 || index === flow.length - 1) return null;
    return flow[index + 1];
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (bookings || []).filter((booking) => {
      const tabOk = tab === "All" || booking.status === tab;
      const searchOk = !query || booking.patient.name.toLowerCase().includes(query) || booking.bookingId.toLowerCase().includes(query) || booking.patient.phone.includes(query);
      return tabOk && searchOk;
    });
  }, [bookings, search, tab]);

  const today = (bookings || []).filter((booking) => booking.date === new Date().toISOString().slice(0, 10));
  const stats = {
    total: today.length,
    pending: (bookings || []).filter((booking) => booking.status === "Pending").length,
    completed: (bookings || []).filter((booking) => booking.status === "Completed").length,
    revenue: (bookings || []).filter((booking) => booking.paymentStatus === "Paid" && booking.status !== "Cancelled").reduce((sum, booking) => sum + booking.fee, 0),
  };

  const tabCounts = {}; 
  ["All", ...flow, "Cancelled"].forEach((status) => {
    tabCounts[status] = status === "All" ? (bookings || []).length : (bookings || []).filter((booking) => booking.status === status).length;
  });
  const tabList = [...new Set(["All", ...flow, "Cancelled"])];

  const actionLabel = { Confirmed: "Accept Booking", SampleCollected: "Mark Sample Collected", ReportReady: "Upload Report", Completed: "Mark Completed" };

  return (
    <div className="vd-root">
      <style>{style}</style>

      <div className="vd-toast-wrap">
        {toasts.map((toast) => (
          <div className="vd-toast" key={toast.id}>{toast.msg}</div>
        ))}
      </div>

      <div className="vd-topbar">
        <div className="vd-logo">
          <div className="vd-logo-icon">🩺</div>
          <div className="vd-logo-text">
            <strong>DocBookBihar</strong>
            <span>Vendor Panel</span>
          </div>
        </div>
        <div className="vd-top-right">
          <select className="vd-vendor-select" value={vendorId} onChange={(event) => { setVendorId(event.target.value); setTab("All"); }}>
            {VENDORS.map((entry) => (
              <option key={entry.id} value={entry.id}>{entry.name}</option>
            ))}
          </select>
          <div className="vd-bell">🔔<span className="vd-bell-dot" /></div>
          {onLogout ? <button className="vd-logout-btn" onClick={onLogout}>Logout</button> : null}
        </div>
      </div>

      <div className="vd-ticker-wrap">
        <div className={`vd-ticker ${flash ? "vd-flash" : ""}`}>
          <span className="vd-live-dot" />
          <span className="vd-ticker-msg">LIVE — <b dangerouslySetInnerHTML={{ __html: tickerMsg }} /></span>
        </div>
      </div>

      <div className="vd-body">
        <div className="vd-stats">
          <div className="vd-stat">
            <div className="vd-stat-icon" style={{ background: "var(--blue-bg)", color: "var(--blue)" }}>📅</div>
            <div><div className="vd-stat-num">{stats.total}</div><div className="vd-stat-label">Aaj Ki Bookings</div></div>
          </div>
          <div className="vd-stat">
            <div className="vd-stat-icon" style={{ background: "var(--amber-bg)", color: "var(--amber)" }}>⏳</div>
            <div><div className="vd-stat-num">{stats.pending}</div><div className="vd-stat-label">Pending Action</div></div>
          </div>
          <div className="vd-stat">
            <div className="vd-stat-icon" style={{ background: "var(--green-bg)", color: "var(--green)" }}>✅</div>
            <div><div className="vd-stat-num">{stats.completed}</div><div className="vd-stat-label">Completed</div></div>
          </div>
          <div className="vd-stat">
            <div className="vd-stat-icon" style={{ background: "var(--purple-bg)", color: "var(--purple)" }}>₹</div>
            <div><div className="vd-stat-num">₹{stats.revenue}</div><div className="vd-stat-label">Total Revenue</div></div>
          </div>
        </div>

        <div className="vd-section-head">
          <div className="vd-title">Bookings <span>Manage Karen</span></div>
          <div className="vd-search">🔍 <input placeholder="Naam, phone ya ref se dhundhein..." value={search} onChange={(event) => setSearch(event.target.value)} /></div>
        </div>

        <div className="vd-tabs">
          {tabList.map((status) => (
            <div key={status} className={`vd-tab ${tab === status ? "active" : ""}`} onClick={() => setTab(status)}>
              {status === "All" ? "All" : STATUS_LABEL[status]} <span className="vd-tab-count">({tabCounts[status] || 0})</span>
            </div>
          ))}
        </div>

        <div className="vd-table-wrap">
          {filtered.length === 0 ? (
            <div className="vd-empty"><div className="vd-empty-icon">📭</div>Koi booking is filter mein nahi mili.</div>
          ) : (
            <table className="vd-table">
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Patient</th>
                  <th>Slot</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.bookingId} className={b.bookingId === newRowId ? 'vd-new-row' : ''}>
                    <td className="vd-ref">{b.bookingId}</td>
                    <td>
                      <div className="vd-patient-name">{b.patient.name}</div>
                      <div className="vd-patient-sub">{b.patient.phone} · {b.patient.age} yrs</div>
                    </td>
                    <td>{b.slot}</td>
                    <td><span className={`vd-badge ${b.status}`}>{STATUS_LABEL[b.status] || b.status}</span></td>
                    <td>₹{b.fee}</td>
                    <td>
                      <div className="vd-actions">
                        {nextAction(b) ? <button className="vd-btn primary" onClick={() => updateStatus(b.bookingId, nextAction(b))}>{actionLabel[nextAction(b)] || 'Next'}</button> : null}
                        <button className="vd-btn ghost" onClick={() => { setSelected(b); }}>{'Details'}</button>
                        <button className="vd-btn danger" onClick={() => cancelBooking(b.bookingId)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
