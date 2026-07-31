import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Store,
  Upload,
  Zap,
} from "lucide-react";
import KwickVendorDashboard from "./KwickVendorDashboard.jsx";
import KwickBooksVendorApp from "./KwickBooksVendor.jsx";
import DocBookBiharDashboard from "./DocBookBiharDashboard.jsx";
import AmbulanceDriverApp from "./AmbulanceDriverApp.jsx";
import { useAuth } from "../context/AuthContext";
import "./vendor.css";

const categories = [
  { name: "Doctor", tag: "Consultation", emoji: "🩺" },
  { name: "Medicine Store", tag: "Health Care", emoji: "💊" },
  { name: "Ambulance", tag: "Emergency", emoji: "🚑" },
  { name: "Kwick Laundry", tag: "Laundry", emoji: "🧺", featured: true },
  { name: "Fresh Mandi", tag: "Fruits & Veg", emoji: "🥦" },
  { name: "Pick & Drop", tag: "Logistics", emoji: "🛵" },
  { name: "Mishra Ji Cake", tag: "Cakes & Bakes", emoji: "🎂" },
  { name: "Household", tag: "Daily Needs", emoji: "🛍️" },
  { name: "Kwick.Books Vendor", tag: "Books & Rentals", emoji: "📚", featured: true },
  { name: "Stationary Shop", tag: "Books & Pens", emoji: "📝" },
  { name: "Electric Shop", tag: "Home Gear", emoji: "⚡", featured: true },
  { name: "Pandit Ji Chai", tag: "Tea & Snacks", emoji: "☕" },
  { name: "Home Services", tag: "Maintenance", emoji: "🔧" },
];

const initialBusinesses = [
  { name: "Mishra Ji Cake", owner: "Ravi Mishra", city: "Munger" },
  { name: "Electric Shop", owner: "Aman Kumar", city: "Jamalpur" },
  { name: "Doctor", owner: "Dr. Nisha", city: "Munger" },
];

function Field({ label, children, error }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}

function Landing({ onSelect, onOpenPortal }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const value = query.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(value));
  }, [query]);

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="top-bar">
          <div className="brand">
            <div className="brand-mark">
              <Store size={20} />
            </div>
            Kwick<span>.</span>Partner
          </div>
          <div className="nav-links">
            <button onClick={() => onOpenPortal(categories[0])}>Portal</button>
            <button onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}>Categories</button>
            <button onClick={() => window.scrollTo({ top: 1350, behavior: "smooth" })}>Benefits</button>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={14} /> Local businesses, now online
            </span>
            <h1>
              Grow your shop in Munger and Jamalpur with <span>KwickPartner</span>.
            </h1>
            <p>
              Register your business in minutes, show your store to local customers, and manage your portal from one simple dashboard.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => onOpenPortal(categories[0])}>
                Start Registration
              </button>
              <button className="secondary-btn" onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}>
                Explore Categories
              </button>
            </div>
          </div>

          <div className="hero-panel">
            <h3>Why small shops love it</h3>
            <p style={{ color: "#cbd5e1", margin: 0 }}>
              A fast onboarding experience designed for owners who want to reach nearby customers without complicated tools.
            </p>
            <div className="stats-grid">
              <div className="stat-card">
                <strong>11+</strong>
                <span>Local categories</span>
              </div>
              <div className="stat-card">
                <strong>24/7</strong>
                <span>Easy portal access</span>
              </div>
              <div className="stat-card">
                <strong>100%</strong>
                <span>Mobile ready</span>
              </div>
              <div className="stat-card">
                <strong>3 min</strong>
                <span>Fast signup flow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="content">
        <section className="section-card">
          <div className="section-heading">
            <div>
              <h2>Choose your business category</h2>
              <p>Search and select the category that matches your store.</p>
            </div>
          </div>

          <div className="search-box">
            <Search size={18} color="#64748b" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for your category"
            />
          </div>

          <div className="category-grid">
            {filtered.map((c) => (
              <button key={c.name} className="category-card" onClick={() => onSelect(c)}>
                <div className="category-icon">{c.emoji}</div>
                <h4>{c.name}</h4>
                <p>{c.tag}</p>
              </button>
            ))}

            <button className="add-card" onClick={() => onSelect({ name: "New Business", tag: "Other Business", emoji: "➕" })}>
              <div className="category-icon" style={{ background: "rgba(255,255,255,0.16)", color: "white" }}>
                <Plus size={24} />
              </div>
              <h4>Add New</h4>
              <p>Other business category</p>
            </button>
          </div>
        </section>

        <section className="info-grid">
          <div className="section-card">
            <div className="section-heading">
              <div>
                <h3>Why this works for local sellers</h3>
                <p>Everything is built for fast onboarding and easy discovery.</p>
              </div>
            </div>
            <div className="feature-stack">
              <div className="feature-item">
                <div className="feature-icon">
                  <Zap size={20} />
                </div>
                <div>
                  <strong>Quick setup</strong>
                  <p>Create a complete profile in a few taps without a long form.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <strong>Local visibility</strong>
                  <p>Help nearby customers find your shop with location-based details.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <strong>Trusted onboarding</strong>
                  <p>Simple verification and a clean portal experience for every merchant.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="section-card business-list">
            <div className="section-heading">
              <div>
                <h3>Featured local businesses</h3>
                <p>Popular registrations already live on the platform.</p>
              </div>
            </div>
            {initialBusinesses.length > 0 ? (
              <ul>
                {initialBusinesses.map((business) => (
                  <li key={business.name}>
                    <span>{business.name}</span>
                    <span style={{ color: "#64748b", fontSize: "0.9rem" }}>{business.city}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">No businesses yet. Be the first to register.</div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 KwickPartner. Built for local growth.</span>
        <span>Fast • Friendly • Mobile ready</span>
      </footer>
    </div>
  );
}

function Portal({ category, onBack, onLogin }) {
  const [mode, setMode] = useState("login");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    store: "",
    owner: "",
    mobile: "",
    whatsapp: "",
    location: false,
    category: category?.name || "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const nextErrors = {};
    if (!formData.store.trim()) nextErrors.store = "Store name is required";
    if (!formData.owner.trim()) nextErrors.owner = "Owner name is required";
    if (!/^\d{10}$/.test(formData.mobile)) nextErrors.mobile = "Enter a valid 10-digit mobile";
    if (!formData.whatsapp.trim()) nextErrors.whatsapp = "WhatsApp number is required";
    if (!formData.location) nextErrors.location = "Please set your store location";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  return (
    <div className="portal-shell">
      <div className="portal-card">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={16} /> Back to home
        </button>

        <div className="portal-top">
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div className="portal-badge">{category?.emoji || "🏪"}</div>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.45rem" }}>{category?.name || "Business"} Portal</h2>
              <p style={{ margin: "4px 0 0", color: "#64748b" }}>
                Manage your store profile and onboarding in one place.
              </p>
            </div>
          </div>

          <div className="toggle-row">
            <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
              Login
            </button>
            <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
              Register
            </button>
          </div>
        </div>

        {submitted ? (
          <div className="success-card">
            <h3>Registration complete</h3>
            <p>Your store profile has been saved and is ready for review.</p>
            <div className="flex gap-2">
              <button className="ghost-btn" onClick={() => onLogin && onLogin(category)}>
                Go to dashboard
              </button>
              <button className="ghost-btn" onClick={onBack}>
                Explore more categories
              </button>
            </div>
          </div>
        ) : mode === "login" ? (
          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            <div className="form-card">
              <h3>Welcome back</h3>
              <Field label="Mobile or Email">
                <input className="input" placeholder="Enter your ID" />
              </Field>
              <Field label="Password">
                <input type="password" className="input" placeholder="Enter your password" />
              </Field>
              <button
                className="inline-link"
                style={{ paddingLeft: 0, color: "#0f172a" }}
                type="button"
                onClick={() => onLogin && onLogin(category)}
              >
                Log in to portal <ArrowRight size={16} />
              </button>
            </div>
          </form>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-card">
              <h3>Basic business details</h3>
              <div className="info-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                <Field label="Store Name" error={errors.store}>
                  <input className="input" name="store" value={formData.store} onChange={handleChange} placeholder="e.g. Pandit Ji Chai" />
                </Field>
                <Field label="Owner Name" error={errors.owner}>
                  <input className="input" name="owner" value={formData.owner} onChange={handleChange} placeholder="Owner Name" />
                </Field>
              </div>
              <Field label="Business Category">
                <div className="inline-pill">
                  <Zap size={16} /> {category?.name || "Selected category"} (selected)
                </div>
              </Field>
              <div className="upload-card">
                <Upload size={20} />
                <p style={{ margin: "8px 0 0" }}>Upload store photo</p>
              </div>
            </div>

            <div className="form-card">
              <h3>Contact & location</h3>
              <div className="info-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                <Field label="Mobile" error={errors.mobile}>
                  <input className="input" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" />
                </Field>
                <Field label="WhatsApp" error={errors.whatsapp}>
                  <input className="input" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp number" />
                </Field>
              </div>
              <Field label="Location">
                <button
                  type="button"
                  className={`location-btn ${formData.location ? "active" : ""}`}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, location: !prev.location }));
                    setErrors((prev) => ({ ...prev, location: "" }));
                  }}
                >
                  <MapPin size={18} style={{ display: "inline", marginRight: 6 }} />
                  {formData.location ? "Location set ✓" : "Set store location"}
                </button>
              </Field>
              {errors.location ? <span className="field-error">{errors.location}</span> : null}
            </div>

            <button type="submit" className="submit-btn">
              Complete Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function KwickPartnerApp() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [category, setCategory] = useState(null);
  const [showPortal, setShowPortal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("kwick_loggedIn"));
  const [loggedCategory, setLoggedCategory] = useState(() => {
    try {
      const v = localStorage.getItem("kwick_loggedCategory");
      return v ? JSON.parse(v) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (loggedIn) {
        localStorage.setItem("kwick_loggedIn", "1");
        if (loggedCategory) localStorage.setItem("kwick_loggedCategory", JSON.stringify(loggedCategory));
      } else {
        localStorage.removeItem("kwick_loggedIn");
        localStorage.removeItem("kwick_loggedCategory");
      }
    } catch (e) {
      /* ignore */
    }
  }, [loggedIn, loggedCategory]);

  function handleSelect(selectedCategory) {
    setCategory(selectedCategory);
    setShowPortal(true);
  }

  function handleBack() {
    setShowPortal(false);
    setCategory(null);
  }

  function handleLogin(selectedCategory) {
    setLoggedCategory(selectedCategory);
    setLoggedIn(true);
  }

  function handleLogout() {
    logout();
    setLoggedIn(false);
    setLoggedCategory(null);
    navigate('/auth', { replace: true });
  }
  if (loggedIn) {
    const selected = loggedCategory?.name || "";
    const normalized = selected.toLowerCase();
    if (normalized.includes("book") || normalized.includes("books") || normalized.includes("stationary")) {
      return <KwickBooksVendorApp onLogout={handleLogout} />;
    }
    if (normalized.includes("ambulance")) {
      return <AmbulanceDriverApp onLogout={handleLogout} />;
    }
    if (normalized.includes("doctor") || normalized.includes("medicine")) {
      return <DocBookBiharDashboard onLogout={handleLogout} />;
    }
    return <KwickVendorDashboard onLogout={handleLogout} />;
  }

  return showPortal ? <Portal category={category} onBack={handleBack} onLogin={handleLogin} /> : <Landing onSelect={handleSelect} onOpenPortal={handleSelect} />;
}
