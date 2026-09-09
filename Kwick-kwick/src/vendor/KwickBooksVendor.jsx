import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  IndianRupee,
  LayoutGrid,
  ListChecks,
  Loader2,
  LogOut,
  Package,
  Plus,
  Trash2,
  Upload,
  User,
  Wallet,
  WifiOff,
  Zap,
} from "lucide-react";

const STORAGE_KEY = "kwick-books-vendor-listings";
const amberGrad = "linear-gradient(135deg, #FFD54A 0%, #F59E0B 100%)";
const softBg = "linear-gradient(135deg, #FFF9E8 0%, #FFF7ED 100%)";

const categories = ["JEE", "NEET", "CLAT", "Fiction", "Academic", "School", "Engineering"];
const conditions = ["Excellent", "Good", "Fair"];

const initialInventory = [
  {
    id: 1,
    title: "Concepts of Physics Vol 1",
    author: "H.C. Verma",
    seller: "Aman T.",
    category: "Engineering",
    condition: "Used - Excellent",
    type: "Rent",
    status: "Rented",
    mrp: 450,
    price: 45,
    rentPrice: 45,
    sellPrice: 0,
    due: "20-07-2026",
    renter: "Aman T.",
    cover: "📘",
    rating: 4.8,
  },
  {
    id: 2,
    title: "NCERT Chemistry Class 12",
    author: "NCERT",
    seller: "Riya K.",
    category: "School",
    condition: "Used - Good",
    type: "Sell",
    status: "Available",
    mrp: 300,
    price: 180,
    rentPrice: 0,
    sellPrice: 180,
    cover: "📗",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Objective Mathematics",
    author: "R.D. Sharma",
    seller: "Vikram",
    category: "JEE",
    condition: "Used - Fair",
    type: "Both",
    status: "Sold",
    mrp: 650,
    price: 320,
    rentPrice: 60,
    sellPrice: 320,
    cover: "📙",
    rating: 4.2,
  },
];

function Logo({ size = 28 }) {
  return (
    <div className="books-logo">
      <div className="books-logo-mark" style={{ width: size, height: size }}>
        <Zap size={size * 0.6} />
      </div>
      <span className="books-logo-text" style={{ fontSize: size * 0.6 }}>
        Kwick<span>.</span>
        <span>Books Vendor</span>
      </span>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <label className="books-field">
      <span className="books-field-label">{label}</span>
      {children}
      {error ? <span className="books-field-error">{error}</span> : null}
    </label>
  );
}

function PrimaryButton({ children, onClick, disabled, className = "" }) {
  return (
    <button
      className={`books-primary-btn ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      {children}
    </button>
  );
}

function ListingForm({ onSubmit, onCancel, initialValues = null }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState(initialValues?.title || "");
  const [author, setAuthor] = useState(initialValues?.author || "");
  const [sellerName, setSellerName] = useState(initialValues?.seller || "");
  const [category, setCategory] = useState(initialValues?.category || categories[0]);
  const [conditionIndex, setConditionIndex] = useState(initialValues?.condition ? conditions.indexOf(initialValues.condition.replace("Used - ", "")) : 1);
  const [service, setService] = useState(initialValues?.type || "Sell");
  const [mrp, setMrp] = useState(initialValues?.mrp?.toString() || "");
  const [sellPrice, setSellPrice] = useState(initialValues?.sellPrice?.toString() || "");
  const [rentPrice, setRentPrice] = useState(initialValues?.rentPrice?.toString() || "");
  const steps = ["Book Info", "Pricing", "Verification"];

  useEffect(() => {
    if (!initialValues) {
      setTitle("");
      setAuthor("");
      setSellerName("");
      setCategory(categories[0]);
      setConditionIndex(1);
      setService("Sell");
      setMrp("");
      setSellPrice("");
      setRentPrice("");
      setStep(0);
      return;
    }

    setTitle(initialValues.title || "");
    setAuthor(initialValues.author || "");
    setSellerName(initialValues.seller || "");
    setCategory(initialValues.category || categories[0]);
    setConditionIndex(initialValues.condition ? conditions.indexOf(initialValues.condition.replace("Used - ", "")) : 1);
    setService(initialValues.type || "Sell");
    setMrp(initialValues.mrp?.toString() || "");
    setSellPrice(initialValues.sellPrice?.toString() || "");
    setRentPrice(initialValues.rentPrice?.toString() || "");
    setStep(0);
  }, [initialValues]);

  const suggestedRent = mrp ? Math.round(Number(mrp) * 0.15) : null;
  const canNext =
    step === 0
      ? Boolean(title && author && sellerName)
      : step === 1
        ? (service !== "Sell" ? Boolean(rentPrice || suggestedRent) : true) && (service !== "Rent" ? Boolean(sellPrice) : true)
        : true;

  const handleSubmit = () => {
    const normalizedBook = {
      title,
      author,
      seller: sellerName,
      category,
      condition: `Used - ${conditions[conditionIndex]}`,
      type: service,
      mrp: Number(mrp || sellPrice || rentPrice || 0),
      price: service === "Rent" ? Number(rentPrice || suggestedRent || 0) : Number(sellPrice || 0),
      rentPrice: Number(rentPrice || suggestedRent || 0),
      sellPrice: Number(sellPrice || 0),
      cover: "📗",
      rating: 4.5,
      listingType: "Used",
      status: initialValues?.status || "Available",
      due: initialValues?.due || "",
      renter: initialValues?.renter || "",
      id: initialValues?.id || Date.now(),
    };

    onSubmit(normalizedBook);
  };

  return (
    <div className="books-form-shell">
      <div className="books-form-card">
        <div className="books-form-top">
          <button className="books-icon-btn" onClick={onCancel}>
            <ArrowLeft size={18} />
          </button>
          <Logo size={22} />
        </div>

        <div className="books-stepper">
          {steps.map((item, index) => (
            <div key={item} className={`books-step ${index <= step ? "active" : ""}`} />
          ))}
        </div>
        <p className="books-step-label">Step {step + 1} of 3 · {steps[step]}</p>

        <div className="books-form-body">
          {step === 0 && (
            <>
              <h2>What are you listing?</h2>
              <p>Share the book details so students discover it quickly.</p>
              <Field label="Book Title">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="books-input" placeholder="e.g. Concepts of Physics" />
              </Field>
              <Field label="Author / Publisher">
                <input value={author} onChange={(e) => setAuthor(e.target.value)} className="books-input" placeholder="e.g. H.C. Verma" />
              </Field>
              <Field label="Your Name (shown to buyers)">
                <input value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="books-input" placeholder="e.g. Ravi K." />
              </Field>
              <Field label="Category">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="books-input">
                  {categories.map((entry) => (
                    <option key={entry}>{entry}</option>
                  ))}
                </select>
              </Field>
              <Field label={`Book Condition — ${conditions[conditionIndex]}`}>
                <input type="range" min="0" max="2" value={conditionIndex} onChange={(e) => setConditionIndex(Number(e.target.value))} className="books-slider" />
                <div className="books-slider-labels">
                  {conditions.map((entry) => (
                    <span key={entry}>{entry}</span>
                  ))}
                </div>
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <h2>Set your price</h2>
              <p>Choose the way students can access this book.</p>

              <Field label="Service Type">
                <div className="books-toggle-row">
                  {['Sell', 'Rent', 'Both'].map((entry) => (
                    <button key={entry} className={`books-toggle-chip ${service === entry ? 'active' : ''}`} onClick={() => setService(entry)}>
                      {entry}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Book MRP (₹)">
                <input value={mrp} onChange={(e) => setMrp(e.target.value.replace(/\D/g, ""))} className="books-input" placeholder="e.g. 450" />
              </Field>

              {service !== 'Rent' && (
                <Field label="Selling Price (₹)">
                  <input value={sellPrice} onChange={(e) => setSellPrice(e.target.value.replace(/\D/g, ""))} className="books-input" placeholder="e.g. 180" />
                </Field>
              )}

              {service !== 'Sell' && (
                <Field label="Rental Price / Month (₹)">
                  <input value={rentPrice} onChange={(e) => setRentPrice(e.target.value.replace(/\D/g, ""))} className="books-input" placeholder={suggestedRent ? `Suggested: ₹${suggestedRent}` : 'e.g. 60'} />
                  {suggestedRent ? (
                    <button type="button" className="books-suggested-btn" onClick={() => setRentPrice(String(suggestedRent))}>
                      ✨ Suggested rental: ₹{suggestedRent} / month
                    </button>
                  ) : null}
                </Field>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2>Verify with photos</h2>
              <p>Students trust listings with clear images.</p>
              <div className="books-photo-grid">
                {['Cover', 'Spine', 'Inside Pages'].map((label) => (
                  <button key={label} className="books-photo-card">
                    <Upload size={20} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <div className="books-summary-card">
                <p className="books-summary-label">Listing Summary</p>
                <h3>{title || 'Untitled Book'}</h3>
                <p>{author || 'Unknown author'} · {category}</p>
                <strong>
                  {service === 'Sell' && `Sell — ₹${sellPrice || 0}`}
                  {service === 'Rent' && `Rent — ₹${rentPrice || suggestedRent || 0}/month`}
                  {service === 'Both' && `Sell ₹${sellPrice || 0} · Rent ₹${rentPrice || suggestedRent || 0}/month`}
                </strong>
              </div>
            </>
          )}
        </div>

        <div className="books-form-actions">
          {step > 0 ? (
            <button className="books-icon-btn" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={18} />
            </button>
          ) : null}
          <PrimaryButton disabled={!canNext} onClick={() => (step < 2 ? setStep(step + 1) : handleSubmit())}>
            {step < 2 ? 'Continue' : initialValues ? 'Save Changes' : 'List Book on Kwick'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function KwickBooksVendorApp({ onLogout }) {
  const [screen, setScreen] = useState("dashboard");
  const [inventory, setInventory] = useState(initialInventory);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setInventory(JSON.parse(saved));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialInventory));
      }
    } catch (error) {
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const persistInventory = (nextInventory) => {
    setInventory(nextInventory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextInventory));
    } catch (error) {
      setOffline(true);
    }
  };

  const totalListed = inventory.length;
  const activeRentals = inventory.filter((book) => book.status === "Rented").length;
  const earnings = inventory.reduce((sum, book) => (book.status === "Sold" || book.status === "Rented" ? sum + book.price : sum), 0);

  const markSold = (id) => {
    const nextInventory = inventory.map((book) => (book.id === id ? { ...book, status: "Sold" } : book));
    persistInventory(nextInventory);
  };

  const remove = (id) => {
    const nextInventory = inventory.filter((book) => book.id !== id);
    persistInventory(nextInventory);
  };

  const createOrUpdate = (book) => {
    if (editingBook) {
      const nextInventory = inventory.map((item) => (item.id === editingBook.id ? { ...item, ...book } : item));
      persistInventory(nextInventory);
    } else {
      const nextInventory = [{ ...book, id: Date.now(), status: "Available" }, ...inventory];
      persistInventory(nextInventory);
    }
    setScreen("dashboard");
    setEditingBook(null);
  };

  const openCreate = () => {
    setEditingBook(null);
    setScreen("list");
  };

  const openEdit = (book) => {
    setEditingBook(book);
    setScreen("list");
  };

  if (loading) {
    return (
      <div className="books-loading-shell">
        <Loader2 className="animate-spin" size={28} />
      </div>
    );
  }

  if (screen === "list") {
    return (
      <ListingForm
        initialValues={editingBook}
        onSubmit={createOrUpdate}
        onCancel={() => {
          setScreen("dashboard");
          setEditingBook(null);
        }}
      />
    );
  }

  return (
    <div className="books-app-shell">
      {offline ? (
        <div className="books-offline-banner">
          <WifiOff size={14} /> Working offline — changes will stay on this device.
        </div>
      ) : null}

      <header className="books-header">
        <div className="books-header-top">
          <Logo size={24} />
          <button className="books-logout-btn" onClick={onLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="books-hero-card">
          <div>
            <p className="books-eyebrow">Student-first book marketplace</p>
            <h1>Sell, rent, and manage your books in one calm dashboard.</h1>
            <p>List textbooks, manage availability, and track earnings without juggling multiple tools.</p>
          </div>
          <button className="books-hero-btn" onClick={openCreate}>
            <Plus size={16} /> List a Book
          </button>
        </div>
      </header>

      <main className="books-main">
        <section className="books-metrics-grid">
          <article className="books-metric-card">
            <Package size={18} />
            <strong>{totalListed}</strong>
            <span>Books Listed</span>
          </article>
          <article className="books-metric-card">
            <BookOpen size={18} />
            <strong>{activeRentals}</strong>
            <span>Active Rentals</span>
          </article>
          <article className="books-metric-card">
            <IndianRupee size={18} />
            <strong>₹{earnings}</strong>
            <span>Earnings</span>
          </article>
        </section>

        <section className="books-section-card">
          <div className="books-section-heading">
            <div>
              <p className="books-eyebrow">Inventory</p>
              <h2>My Books</h2>
            </div>
            <button className="books-secondary-btn" onClick={openCreate}>
              <Plus size={16} /> Add New
            </button>
          </div>

          {inventory.length === 0 ? (
            <div className="books-empty-card">
              <p>No books listed yet. Start with your first textbook.</p>
            </div>
          ) : (
            <div className="books-list-grid">
              {inventory.map((book) => (
                <article key={book.id} className="books-list-card">
                  <div className="books-card-top">
                    <div className="books-card-badge">{book.cover}</div>
                    <div className="books-title-block">
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                    </div>
                    <div className="books-pill-row">
                      <span className="books-type-pill">{book.type}</span>
                      <span className={`books-status-pill ${book.status.toLowerCase()}`}>{book.status}</span>
                    </div>
                  </div>

                  <div className="books-pricing-block">
                    <strong>₹{book.price}</strong>
                    <span>{book.category}</span>
                  </div>

                  {book.status === "Rented" ? (
                    <div className="books-activity-card">
                      <User size={14} />
                      <span>With {book.renter} · Due {book.due}</span>
                    </div>
                  ) : null}

                  {book.status === "Available" ? (
                    <button className="books-sold-btn" onClick={() => markSold(book.id)}>
                      <CheckCircle2 size={15} /> Mark as Sold
                    </button>
                  ) : null}

                  <div className="books-card-actions">
                    <button className="books-action-btn" onClick={() => openEdit(book)}>
                      <Edit3 size={15} /> Edit
                    </button>
                    <button className="books-action-btn danger" onClick={() => remove(book.id)}>
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
