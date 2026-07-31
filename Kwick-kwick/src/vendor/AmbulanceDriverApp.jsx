import { useEffect, useMemo, useRef, useState } from "react";

const C = {
  green900: "#04342C",
  green800: "#085041",
  green700: "#0F6E56",
  green500: "#1D9E75",
  green300: "#5DCAA5",
  green100: "#9FE1CB",
  green50: "#E1F5EE",
  red900: "#501313",
  red800: "#791F1F",
  red700: "#A32D2D",
  red500: "#E24B4A",
  red300: "#F09595",
  red100: "#F7C1C1",
  red50: "#FCEBEB",
  amber800: "#633806",
  amber700: "#854F0B",
  amber500: "#BA7517",
  amber300: "#EF9F27",
  amber100: "#FAC775",
  amber50: "#FAEEDA",
  blue800: "#0C447C",
  blue700: "#185FA5",
  blue500: "#378ADD",
  blue300: "#85B7EB",
  blue100: "#B5D4F4",
  blue50: "#E6F1FB",
  gray50: "#F1EFE8",
  gray100: "#D3D1C7",
  gray200: "#B4B2A9",
  gray400: "#888780",
  gray600: "#5F5E5A",
  white: "#FFFFFF",
  bg: "#F5F7FA",
};

const Icon = ({ name, size = 20, color = "currentColor", style = {} }) => (
  <i className={`ti ti-${name}`} aria-hidden="true" style={{ fontSize: size, color, lineHeight: 1, ...style }} />
);

const StatusBar = ({ light = false }) => (
  <div
    style={{
      background: light ? "rgba(255,255,255,0.1)" : "#111827",
      color: "#fff",
      fontSize: 11,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "7px 18px",
      flexShrink: 0,
    }}
  >
    <span style={{ fontWeight: 600 }}>9:41</span>
    <span style={{ opacity: 0.7, fontSize: 10, letterSpacing: 0.5 }}>EMERGENCYDRIVE</span>
    <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <Icon name="wifi" size={12} color="#fff" />
      <Icon name="battery-3" size={12} color="#fff" />
    </span>
  </div>
);

function Screen1({ onSimulate, onLogout }) {
  const [duty, setDuty] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, background: C.bg, overflowY: "auto" }}>
      <StatusBar light />
      <div
        style={{
          background: `linear-gradient(150deg, ${C.green900} 0%, ${C.green700} 60%, ${C.green500} 100%)`,
          padding: "20px 20px 32px",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -40, top: -40, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", right: -10, top: -10, width: 90, height: 90, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, position: "relative", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>RK</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Rajan Kumar</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>BLS · MH-01-AB-4521</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "5px 10px", fontSize: 12 }}>
            <Icon name="star-filled" size={12} color={C.amber300} />
            <span style={{ fontWeight: 600 }}>4.9</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Duty Status</div>
            <div onClick={() => setDuty((value) => !value)} style={{ width: 64, height: 32, borderRadius: 16, background: duty ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)", position: "relative", cursor: "pointer", transition: "background 0.3s", border: "1.5px solid rgba(255,255,255,0.4)" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: duty ? C.green700 : "rgba(255,255,255,0.6)", position: "absolute", top: 3, left: duty ? 34 : 3, transition: "left 0.3s, background 0.3s" }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 5 }}>{duty ? "🟢 Online" : "🔴 Offline"}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Shift started</div>
            <div style={{ fontSize: 17, fontWeight: 600 }}>06:00 AM</div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>Jamalpur Depot</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {duty && (
          <div style={{ background: C.green50, border: `1px solid ${C.green100}`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.green700, animation: "blink 1.5s ease-in-out infinite" }} />
            <span style={{ fontSize: 13, color: C.green800, fontWeight: 500 }}>Waiting for emergencies near Jamalpur…</span>
          </div>
        )}

        <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${C.gray100}`, height: 160, position: "relative", background: "#dceee8" }}>
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect x="0" y="68" width="100%" height="8" fill="white" opacity="0.7" rx="2" />
            <rect x="0" y="110" width="100%" height="5" fill="white" opacity="0.4" rx="2" />
            <rect x="120" y="0" width="8" height="100%" fill="white" opacity="0.7" />
            <rect x="220" y="0" width="5" height="100%" fill="white" opacity="0.4" />
            <circle cx="170" cy="72" r="18" fill="none" stroke={C.green500} strokeWidth="1.5" opacity="0.5">
              <animate attributeName="r" values="14;28;14" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="170" cy="72" r="8" fill={C.green700} />
            <circle cx="170" cy="72" r="4" fill="white" />
          </svg>
          <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(255,255,255,0.92)", borderRadius: 6, padding: "3px 9px", fontSize: 11, color: C.green800, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="map-pin" size={11} color={C.green700} />
            Jamalpur Station, Bihar
          </div>
          <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.9)", borderRadius: 6, padding: "3px 9px", fontSize: 10, color: C.gray600, display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green500 }} />
            Live GPS
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
          {[
            { icon: "ambulance", label: "Trips Today", value: "5", color: C.green700 },
            { icon: "currency-rupee", label: "Earnings", value: "₹2,400", color: C.amber500 },
            { icon: "clock", label: "Active", value: "6 hrs", color: C.blue700 },
          ].map((item) => (
            <div key={item.label} style={{ background: C.white, borderRadius: 12, padding: "12px 8px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
              <Icon name={item.icon} size={20} color={item.color} />
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginTop: 4 }}>{item.value}</div>
              <div style={{ fontSize: 10, color: C.gray400, marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { icon: "bell-ringing", label: "Simulate Alert", color: C.red700, action: onSimulate },
            { icon: "clipboard-list", label: "Trip History", color: C.blue700, action: null },
            { icon: "tool", label: "Vehicle Check", color: C.green700, action: null },
            { icon: "headset", label: "Support", color: "#533ab7", action: null },
          ].map((item) => (
            <button key={item.label} onClick={item.action} style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 12, padding: "13px 12px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13, color: "#1a1a2e", fontFamily: "inherit", textAlign: "left", transition: "background 0.15s" }}>
              <Icon name={item.icon} size={18} color={item.color} />
              {item.label}
            </button>
          ))}
        </div>

        <button onClick={onLogout} style={{ background: "#fff7ed", color: C.red700, border: `1px solid ${C.red100}`, borderRadius: 12, padding: "11px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}

function Screen2({ onAccept, onReject }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(30);
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(intervalRef.current);
          onReject();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(intervalRef.current);
  }, [onReject]);

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - timeLeft / 30);
  const ringColor = timeLeft <= 10 ? C.red700 : timeLeft <= 20 ? C.amber500 : C.red500;
  const flashBg = timeLeft % 2 === 0 ? "#fff" : "#fff8f8";

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, background: flashBg, transition: "background 0.4s" }}>
      <StatusBar light />
      <div style={{ background: `linear-gradient(135deg, ${C.red900} 0%, ${C.red700} 100%)`, padding: "18px 20px 22px", color: "#fff" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 12px", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
          <Icon name="alert-triangle" size={11} color="#fff" />
          Emergency Incoming
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>New Booking!</div>
        <div style={{ fontSize: 13, opacity: 0.85, display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="map-pin" size={13} color="#fff" />
          Patient is <strong>1.8 KM</strong> away from you
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "18px 0 8px", position: "relative" }}>
        <svg width="110" height="110" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="55" cy="55" r={radius} fill="none" stroke={C.red100} strokeWidth="7" />
          <circle cx="55" cy="55" r={radius} fill="none" stroke={ringColor} strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }} />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: ringColor, lineHeight: 1 }}>{timeLeft}</div>
          <div style={{ fontSize: 11, color: C.gray400, marginTop: 2 }}>seconds</div>
        </div>
      </div>

      <div style={{ padding: "0 20px", flex: 1 }}>
        {[
          { icon: "map-pin", label: "Pickup Location", value: "Kassim Bazar, Munger", color: C.red700 },
          { icon: "building-hospital", label: "Destination Hospital", value: "Sadar Hospital, Munger", color: C.red700 },
          { icon: "ambulance", label: "Ambulance Type", value: "BLS — Oxygen Required", color: C.red700 },
          { icon: "user", label: "Patient", value: "Arjun Sharma · 52 yrs · Male", color: C.red700 },
        ].map((detail, index, array) => (
          <div key={detail.label} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 0", borderBottom: index < array.length - 1 ? `1px solid ${C.gray50}` : "none" }}>
            <Icon name={detail.icon} size={18} color={detail.color} style={{ marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 11, color: C.gray400 }}>{detail.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", marginTop: 1 }}>{detail.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={() => { window.clearInterval(intervalRef.current); onAccept(); }} style={{ background: C.green700, color: "#fff", border: "none", borderRadius: 14, padding: "18px", fontSize: 17, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}>
          <Icon name="check" size={20} color="#fff" />
          Accept Booking
        </button>
        <button onClick={() => { window.clearInterval(intervalRef.current); onReject(); }} style={{ background: C.white, color: C.red700, border: `1px solid ${C.red300}`, borderRadius: 14, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}>
          <Icon name="x" size={16} color={C.red700} />
          Reject — Pass to Next Driver
        </button>
      </div>
    </div>
  );
}

function Screen3({ onArrived }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, background: C.bg }}>
      <StatusBar />
      <div style={{ background: C.blue50, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.blue100}` }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.blue800, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="navigation" size={14} color={C.blue700} />
          Navigating to Patient
        </div>
        <div style={{ fontSize: 12, color: C.blue700, background: "rgba(255,255,255,0.8)", padding: "3px 10px", borderRadius: 20 }}>ETA: 4 min</div>
      </div>

      <div style={{ flex: 1, background: "#d8eaf4", position: "relative", minHeight: 280 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="mapgrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapgrid)" />
          <rect x="0" y="55%" width="100%" height="10" fill="white" opacity="0.8" />
          <rect x="38%" y="0" width="10" height="100%" fill="white" opacity="0.8" />
          <rect x="0" y="75%" width="100%" height="6" fill="white" opacity="0.4" />
          <rect x="65%" y="0" width="6" height="100%" fill="white" opacity="0.4" />
          <rect x="5%" y="calc(55% + 3)" width="33%" height="4" fill={C.green500} opacity="0.9" />
          <rect x="calc(38% + 3)" y="20%" width="4" height="calc(55% - 20%)" fill={C.green500} opacity="0.9" />
          <circle cx="10%" cy="57%" r="3" fill={C.green700}>
            <animate attributeName="cx" values="10%;38%;38%" dur="3s" repeatCount="indefinite" />
            <animate attributeName="cy" values="57%;57%;22%" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div style={{ position: "absolute", left: "6%", top: "calc(55% - 14px)", fontSize: 24 }}>🚑</div>
        <div style={{ position: "absolute", left: "36%", top: "14%", fontSize: 24 }}>📍</div>
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.95)", borderRadius: 10, padding: "8px 12px", border: `1px solid ${C.blue100}` }}>
          <div style={{ fontSize: 10, color: C.blue700, marginBottom: 2 }}>Distance</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.blue800, lineHeight: 1 }}>1.8 km</div>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: "20px 20px 0 0", borderTop: `1px solid ${C.gray100}`, padding: "16px 20px 24px" }}>
        <div style={{ width: 36, height: 4, background: C.gray100, borderRadius: 2, margin: "0 auto 16px" }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.blue50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: C.blue800, flexShrink: 0 }}>AS</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>Arjun Sharma</div>
            <div style={{ fontSize: 12, color: C.gray400, marginTop: 2 }}>Near main road electric pole, Kassim Bazar</div>
          </div>
        </div>
        <div style={{ background: C.red50, borderRadius: 10, padding: "10px 12px", marginBottom: 14, fontSize: 12, color: C.red800, border: `1px solid ${C.red100}`, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <Icon name="medical-cross" size={13} color={C.red700} style={{ marginTop: 1, flexShrink: 0 }} />
          <span><strong>Condition:</strong> Chest pain, difficulty breathing. Oxygen required immediately.</span>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={{ background: C.green50, color: C.green800, border: `1px solid ${C.green100}`, borderRadius: 12, padding: "13px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", textAlign: "left", transition: "background 0.15s" }}>
            <Icon name="phone" size={16} color={C.green700} />
            Call Family
          </button>
          <button onClick={onArrived} style={{ flex: 1, minWidth: 180, background: C.amber500, color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}>
            <Icon name="map-pin-check" size={16} color="#fff" />
            Arrived at Pickup
          </button>
        </div>
      </div>
    </div>
  );
}

function Screen4({ onEndTrip }) {
  const [pulse, setPulse] = useState(118);
  const [spo2, setSpo2] = useState(94);
  const [bp, setBp] = useState("140/90");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPulse((value) => Math.min(140, Math.max(95, value + (Math.random() > 0.5 ? 1 : -1))));
      setSpo2((value) => Math.min(99, Math.max(90, value + (Math.random() > 0.5 ? 1 : -1))));
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, background: C.bg }}>
      <StatusBar />
      <div style={{ background: C.red50, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.red100}` }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.red800, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="ambulance" size={16} color={C.red700} />
          En Route to Sadar Hospital
        </div>
        <div style={{ fontSize: 12, color: C.red700, background: "rgba(255,255,255,0.9)", padding: "3px 10px", borderRadius: 20, border: `1px solid ${C.red100}` }}>7 min</div>
      </div>

      <div style={{ flex: 1, background: "#dce8f0", position: "relative", minHeight: 260 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="mapgrid2" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapgrid2)" />
          <rect x="0" y="60%" width="100%" height="10" fill="white" opacity="0.8" />
          <rect x="52%" y="0" width="10" height="100%" fill="white" opacity="0.8" />
          <rect x="0" y="35%" width="100%" height="6" fill="white" opacity="0.4" />
          <rect x="28%" y="0" width="6" height="100%" fill="white" opacity="0.4" />
          <rect x="28%" y="calc(60% + 3)" width="24%" height="4" fill={C.red500} opacity="0.85" />
          <rect x="calc(52% + 3)" y="20%" width="4" height="calc(60% - 20%)" fill={C.red500} opacity="0.85" />
          <circle cx="30%" cy="62%" r="3" fill={C.red700}>
            <animate attributeName="cx" values="30%;54%;54%" dur="4s" repeatCount="indefinite" />
            <animate attributeName="cy" values="62%;62%;22%" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div style={{ position: "absolute", left: "26%", top: "calc(60% - 14px)", fontSize: 22 }}>🚑</div>
        <div style={{ position: "absolute", left: "50%", top: "13%", fontSize: 22 }}>🏥</div>
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.95)", borderRadius: 10, padding: "8px 12px", border: `1px solid ${C.red100}` }}>
          <div style={{ fontSize: 10, color: C.red700, marginBottom: 2 }}>To Hospital</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.red800, lineHeight: 1 }}>2.4 km</div>
        </div>
        <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(255,255,255,0.9)", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: C.gray600, border: `1px solid ${C.gray100}` }}>
          <Icon name="speedboat" size={12} color={C.gray400} /> 42 km/h
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: "20px 20px 0 0", borderTop: `1px solid ${C.gray100}`, padding: "16px 20px 24px" }}>
        <div style={{ width: 36, height: 4, background: C.gray100, borderRadius: 2, margin: "0 auto 14px" }} />
        <div style={{ fontSize: 12, color: C.gray400, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Live Patient Vitals</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, marginBottom: 14 }}>
          {[
            { label: "Pulse", value: `${pulse}`, unit: "bpm", color: C.red700, icon: "heart-rate-monitor" },
            { label: "Blood Pressure", value: bp, unit: "mmHg", color: C.blue700, icon: "activity" },
            { label: "SpO₂", value: `${spo2}%`, unit: "", color: C.green700, icon: "lungs" },
          ].map((item) => (
            <div key={item.label} style={{ background: C.bg, borderRadius: 10, padding: "10px 8px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{item.value}</div>
              <div style={{ fontSize: 11, color: C.gray400 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onEndTrip} style={{ flex: 1, background: C.green700, color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>End Trip</button>
          <button style={{ background: C.white, color: C.red700, border: `1px solid ${C.red100}`, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 700 }}>Send Report</button>
        </div>
      </div>
    </div>
  );
}

export default function AmbulanceDriverApp({ onLogout }) {
  const [screen, setScreen] = useState(1);

  return (
    <div style={{ minHeight: '100vh' }}>
      {screen === 1 && <Screen1 onSimulate={() => setScreen(2)} onLogout={onLogout} />}
      {screen === 2 && <Screen2 onAccept={() => setScreen(3)} onReject={() => setScreen(1)} />}
      {screen === 3 && <Screen3 onArrived={() => setScreen(4)} />}
      {screen === 4 && <Screen4 onEndTrip={() => setScreen(1)} />}
    </div>
  );
}
