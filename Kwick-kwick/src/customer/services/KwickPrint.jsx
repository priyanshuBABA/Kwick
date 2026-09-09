import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import {
  ArrowLeft, UploadCloud, FileText, X, Plus, Minus, Palette,
  RectangleHorizontal, RectangleVertical, MapPin, CheckCircle2,
  CreditCard, Smartphone, Wallet, ChevronRight, Printer,
  Loader2, Download, PlusCircle, AlertCircle, LocateFixed, Zap
} from "lucide-react";
import { useLocationContext } from '../../context/LocationContext';

/* ---------- pricing config ---------- */
const RATE_BW = 2;      // ₹ per B&W page
const RATE_COLOR = 8;   // ₹ per color page
const PLATFORM_FEE = 15;
const GST_RATE = 0.05;

/* ---------- helpers ---------- */
let idCounter = 1;
const nextId = () => idCounter++;

function estimatePages(bytes) {
  const est = Math.round(bytes / 45000);
  return Math.min(300, Math.max(1, est || 1));
}

function fileCost(f) {
  return f.copiesBW * f.pages * RATE_BW + f.copiesColor * f.pages * RATE_COLOR;
}
function fileTotalCopies(f) {
  return f.copiesBW + f.copiesColor;
}

function fmt(n) {
  return "\u20B9" + n.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}
function humanSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

/* ---------- small UI atoms ---------- */
function StepDots({ step }) {
  const labels = ["Upload", "Configure", "Review", "Payment"];
  return (
    <div className="flex items-center gap-1.5 px-5 pb-3">
      {labels.map((l, i) => (
        <div
          key={l}
          className={
            "h-1.5 rounded-full transition-all duration-300 " +
            (i <= step ? "w-6 bg-[#F5C531]" : "w-1.5 bg-white/20")
          }
        />
      ))}
    </div>
  );
}

function Header({ subtitle, subtitleStatus, onBack, step, onRedetect }) {
  return (
    <div className="bg-[#14161B] rounded-t-[1.75rem] sticky top-0 z-20">
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-8 h-8 -ml-1 flex items-center justify-center rounded-full text-white/90 hover:bg-white/10 active:scale-95 transition"
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <div className="w-8 h-8 -ml-1 flex items-center justify-center rounded-full bg-[#F5C531]">
            <Zap size={16} className="text-slate-900" fill="#14161B" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-white font-bold text-[17px] leading-tight tracking-tight">KwickPrint</div>
          <button
            onClick={onRedetect}
            className="flex items-center gap-1 text-[#F5C531] text-[11px] font-semibold tracking-wide mt-0.5 truncate max-w-full"
          >
            {subtitleStatus === "detecting" ? (
              <><Loader2 size={11} className="animate-spin" /> Detecting your location…</>
            ) : (
              <><MapPin size={11} className="shrink-0" /> <span className="truncate">{subtitle}</span></>
            )}
          </button>
        </div>
      </div>
      {step !== undefined && <StepDots step={step} />}
    </div>
  );
}

function Stepper({ value, onChange, min = 0, max = 50, accent = "slate" }) {
  const accentText = accent === "blue" ? "text-blue-600" : accent === "violet" ? "text-violet-600" : "text-slate-800";
  return (
    <div className="flex items-center gap-2 bg-slate-100 rounded-full px-1 py-1">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 active:scale-90 transition disabled:opacity-30"
        disabled={value <= min}
      >
        <Minus size={14} />
      </button>
      <span className={"w-6 text-center text-sm font-extrabold tabular-nums " + accentText}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 active:scale-90 transition disabled:opacity-30"
        disabled={value >= max}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

/* ================= MAIN APP ================= */
export default function KwickPrintApp() {
  const [step, setStep] = useState(0); // 0 upload,1 configure,2 review,3 payment,4 success
  const [files, setFiles] = useState([]);
  const [dropLocation, setDropLocation] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | detecting | done | error
  const [manualLocation, setManualLocation] = useState(false);
  const [payMethod, setPayMethod] = useState("card");
  const [paying, setPaying] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [formError, setFormError] = useState("");
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const { currentLocation, formattedAddress, loading: locationLoading, error: locationError, refreshLocation } = useLocationContext();

  const detectLocation = useCallback(async () => {
    setManualLocation(false);
    setLocationStatus("detecting");
    const location = await refreshLocation();
    if (location) setDropLocation(location.formattedAddress || `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`);
    setLocationStatus(location ? "done" : "error");
  }, [refreshLocation]);

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  useEffect(() => {
    if (currentLocation && formattedAddress && !manualLocation) setDropLocation(formattedAddress);
    if (locationError && !locationLoading) setLocationStatus("error");
  }, [currentLocation, formattedAddress, locationError, locationLoading, manualLocation]);

  const addFiles = useCallback((fileList) => {
    const accepted = Array.from(fileList).filter((f) => /\.(pdf|doc|docx)$/i.test(f.name));
    if (!accepted.length) return;
    setFiles((prev) => [
      ...prev,
      ...accepted.map((f) => ({
        id: nextId(),
        name: f.name,
        size: f.size,
        pages: estimatePages(f.size),
        copiesBW: 0,
        copiesColor: 0,
        orientation: "portrait",
      })),
    ]);
  }, []);

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));
  const updateFile = (id, patch) => setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const subtotal = useMemo(() => files.reduce((s, f) => s + fileCost(f), 0), [files]);
  const gst = useMemo(() => Math.round((subtotal + PLATFORM_FEE) * GST_RATE * 100) / 100, [subtotal]);
  const total = useMemo(() => Math.round((subtotal + PLATFORM_FEE + gst) * 100) / 100, [subtotal, gst]);

  const allHaveCopies = files.length > 0 && files.every((f) => fileTotalCopies(f) > 0);

  const back = () => step > 0 && setStep((s) => s - 1);

  const handlePay = () => {
    setFormError("");
    if (payMethod === "card") {
      const digits = card.number.replace(/\s/g, "");
      if (digits.length < 12 || !card.name.trim() || card.expiry.length < 4 || card.cvv.length < 3) {
        setFormError("Card details poori bharein.");
        return;
      }
    } else if (payMethod === "upi") {
      if (!/^[\w.-]{2,}@[\w]{2,}$/.test(upiId.trim())) {
        setFormError("Valid UPI ID daalein (e.g. name@bank).");
        return;
      }
    }
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setOrderId("KP" + Math.floor(100000 + Math.random() * 899999));
      setStep(4);
    }, 1400);
  };

  const resetAll = () => {
    setFiles([]);
    setCard({ number: "", name: "", expiry: "", cvv: "" });
    setUpiId("");
    setOrderId(null);
    setStep(0);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 p-0"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap');
        .font-display { font-family: 'Poppins', 'Inter', sans-serif; }
        @keyframes pop { 0% { transform: scale(0.6); opacity:0 } 60% { transform: scale(1.08); opacity:1 } 100% { transform: scale(1) } }
        .pop-in { animation: pop .5s cubic-bezier(.2,.9,.3,1.2); }
        @keyframes dash { from { stroke-dashoffset: 60 } to { stroke-dashoffset: 0 } }
        .draw-check { stroke-dasharray: 60; animation: dash .5s ease-out .2s forwards; }
      `}</style>

      <div className="w-full h-screen bg-white rounded-none shadow-none overflow-hidden flex flex-col relative">
        {step === 0 && (
          <>
            <Header
              subtitle={locationStatus === "error" ? "Location off — tap to enable" : dropLocation || "Detecting…"}
              subtitleStatus={locationStatus}
              step={0}
              onRedetect={detectLocation}
            />
            <div className="flex-1 overflow-y-auto px-5 pb-28 pt-2">
              <h1 className="font-display text-[22px] font-bold text-slate-900 leading-tight">
                Document print krna hai?
              </h1>
              <p className="text-slate-500 text-sm mt-1 mb-5">
                PDF/DOC upload karein — ek saath multiple files, hum print karke laa denge!
              </p>

              <label
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                className={
                  "block border-2 border-dashed rounded-2xl py-10 px-4 text-center cursor-pointer transition-colors " +
                  (dragOver ? "border-blue-400 bg-blue-50/60" : "border-slate-300 bg-slate-50/60 hover:bg-slate-50")
                }
              >
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
                />
                <div className="w-14 h-14 mx-auto rounded-full bg-white shadow-md flex items-center justify-center mb-3">
                  <UploadCloud size={24} className="text-blue-500" />
                </div>
                <div className="font-bold text-slate-800 text-[15px]">Tap to Upload Documents</div>
                <div className="text-slate-400 text-xs mt-1">PDF, DOC is allowed &middot; multiple files supported</div>
              </label>

              {files.length > 0 && (
                <div className="mt-5 space-y-2.5">
                  <div className="text-xs font-bold text-slate-400 tracking-wide uppercase">
                    {files.length} file{files.length > 1 ? "s" : ""} added
                  </div>
                  {files.map((f) => (
                    <div key={f.id} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                        <FileText size={17} className="text-rose-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-800 truncate">{f.name}</div>
                        <div className="text-[11px] text-slate-400">{humanSize(f.size)} &middot; ~{f.pages} pages</div>
                      </div>
                      <button
                        onClick={() => removeFile(f.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-rose-500 transition shrink-0"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold pt-1"
                  >
                    <PlusCircle size={15} /> Add more files
                  </button>
                </div>
              )}

              <div className="mt-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <MapPin size={17} className="text-rose-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Drop Location (Delivery To)</div>
                    {!manualLocation ? (
                      <div className="text-sm font-bold text-slate-800 truncate">
                        {locationStatus === "detecting" ? "Detecting your exact location…" : dropLocation || "Not detected"}
                      </div>
                    ) : (
                      <input
                        autoFocus
                        value={dropLocation}
                        onChange={(e) => setDropLocation(e.target.value)}
                        placeholder="Enter your location"
                        className="w-full text-sm font-bold text-slate-800 focus:outline-none border-b border-slate-200 pb-0.5"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => (manualLocation ? setManualLocation(false) : detectLocation())}
                    className="shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"
                    title="Detect current location"
                  >
                    <LocateFixed size={15} />
                  </button>
                </div>
                {!manualLocation && (
                  <button
                    onClick={() => setManualLocation(true)}
                    className="text-[11px] font-semibold text-blue-500 mt-2 ml-12"
                  >
                    Edit manually
                  </button>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-slate-100">
              <button
                onClick={() => files.length && setStep(1)}
                disabled={!files.length}
                className={
                  "w-full py-4 rounded-2xl font-bold text-[15px] tracking-wide flex items-center justify-center gap-2 transition " +
                  (files.length
                    ? "bg-[#F5C531] text-slate-900 active:scale-[0.98] shadow-lg shadow-yellow-200"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed")
                }
              >
                CONFIGURE PRINT <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* ================= CONFIGURE ================= */}
        {step === 1 && (
          <>
            <Header subtitle={dropLocation} subtitleStatus={locationStatus} onBack={back} step={1} onRedetect={detectLocation} />
            <div className="flex-1 overflow-y-auto px-5 pb-28 pt-3 space-y-4">
              {files.map((f) => {
                const zeroCopies = fileTotalCopies(f) === 0;
                return (
                  <div
                    key={f.id}
                    className={"border rounded-2xl p-4 shadow-sm transition " + (zeroCopies ? "border-amber-300 bg-amber-50/40" : "border-slate-200")}
                  >
                    <div className="flex items-center gap-3 mb-3.5">
                      <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                        <FileText size={17} className="text-rose-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-slate-800 truncate">{f.name}</div>
                        <div className="text-[11px] text-slate-400">{humanSize(f.size)}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500">Total pages</span>
                      <input
                        type="number"
                        min={1}
                        value={f.pages}
                        onChange={(e) => updateFile(f.id, { pages: Math.max(1, parseInt(e.target.value || "1", 10)) })}
                        className="w-16 text-right text-sm font-bold text-slate-800 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>

                    <div className="flex items-center justify-between mb-2.5 py-1">
                      <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> B&amp;W copies
                      </span>
                      <Stepper value={f.copiesBW} onChange={(v) => updateFile(f.id, { copiesBW: v })} accent="slate" />
                    </div>
                    <div className="flex items-center justify-between mb-3 py-1">
                      <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                        <Palette size={12} className="text-violet-500" /> Color copies
                      </span>
                      <Stepper value={f.copiesColor} onChange={(v) => updateFile(f.id, { copiesColor: v })} accent="violet" />
                    </div>

                    {zeroCopies && (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 bg-amber-100/70 rounded-lg px-2.5 py-1.5 mb-3">
                        <AlertCircle size={12} /> Kam se kam 1 copy (B&amp;W ya Color) select karein
                      </div>
                    )}

                    <div className="mb-1">
                      <div className="text-xs font-semibold text-slate-500 mb-1.5">Page orientation</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => updateFile(f.id, { orientation: "portrait" })}
                          className={
                            "flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold border transition " +
                            (f.orientation === "portrait" ? "bg-blue-50 text-blue-600 border-blue-300" : "bg-white text-slate-600 border-slate-200")
                          }
                        >
                          <RectangleVertical size={14} /> Portrait
                        </button>
                        <button
                          onClick={() => updateFile(f.id, { orientation: "landscape" })}
                          className={
                            "flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold border transition " +
                            (f.orientation === "landscape" ? "bg-blue-50 text-blue-600 border-blue-300" : "bg-white text-slate-600 border-slate-200")
                          }
                        >
                          <RectangleHorizontal size={14} /> Landscape
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                      <button onClick={() => removeFile(f.id)} className="text-[12px] font-semibold text-rose-500 flex items-center gap-1">
                        <X size={13} /> Remove
                      </button>
                      <div className="text-sm font-extrabold text-slate-900">{fmt(fileCost(f))}</div>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => { setStep(0); setTimeout(() => inputRef.current?.click(), 50); }}
                className="w-full flex items-center justify-center gap-1.5 text-blue-600 text-sm font-semibold py-2 border border-dashed border-blue-200 rounded-xl"
              >
                <PlusCircle size={15} /> Add another document
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-slate-100 flex items-center gap-3">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Subtotal</div>
                <div className="text-base font-extrabold text-slate-900">{fmt(subtotal)}</div>
              </div>
              <button
                onClick={() => allHaveCopies && setStep(2)}
                disabled={!allHaveCopies}
                className={
                  "flex-1 py-4 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 transition " +
                  (allHaveCopies ? "bg-[#F5C531] text-slate-900 active:scale-[0.98] shadow-lg shadow-yellow-200" : "bg-slate-100 text-slate-400 cursor-not-allowed")
                }
              >
                REVIEW ORDER <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* ================= REVIEW ================= */}
        {step === 2 && (
          <>
            <Header subtitle={dropLocation} subtitleStatus={locationStatus} onBack={back} step={2} onRedetect={detectLocation} />
            <div className="flex-1 overflow-y-auto px-5 pb-28 pt-3 space-y-3">
              {files.map((f) => (
                <div key={f.id} className="border border-slate-200 rounded-2xl p-3.5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                    <FileText size={17} className="text-rose-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-800 truncate">{f.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {f.pages}p &middot; {f.orientation === "portrait" ? "Portrait" : "Landscape"}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {f.copiesBW > 0 && `${f.copiesBW} B&W copy${f.copiesBW > 1 ? "s" : ""}`}
                      {f.copiesBW > 0 && f.copiesColor > 0 && " + "}
                      {f.copiesColor > 0 && `${f.copiesColor} Color copy${f.copiesColor > 1 ? "s" : ""}`}
                    </div>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 shrink-0">{fmt(fileCost(f))}</div>
                </div>
              ))}

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                  <MapPin size={17} className="text-rose-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Drop Location</div>
                  <div className="text-sm font-bold text-slate-800">{dropLocation}</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 space-y-2 mt-2">
                <div className="flex justify-between text-sm text-slate-500"><span>Printing subtotal</span><span className="font-semibold text-slate-700">{fmt(subtotal)}</span></div>
                <div className="flex justify-between text-sm text-slate-500"><span>Platform fee</span><span className="font-semibold text-slate-700">{fmt(PLATFORM_FEE)}</span></div>
                <div className="flex justify-between text-sm text-slate-500"><span>GST (5%)</span><span className="font-semibold text-slate-700">{fmt(gst)}</span></div>
                <div className="h-px bg-slate-200 my-1" />
                <div className="flex justify-between text-base font-extrabold text-slate-900"><span>Total payable</span><span>{fmt(total)}</span></div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-slate-100">
              <button
                onClick={() => setStep(3)}
                className="w-full py-4 rounded-2xl font-bold text-[15px] bg-[#F5C531] text-slate-900 active:scale-[0.98] shadow-lg shadow-yellow-200 flex items-center justify-center gap-2"
              >
                PROCEED TO PAY &middot; {fmt(total)} <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* ================= PAYMENT ================= */}
        {step === 3 && (
          <>
            <Header subtitle={dropLocation} subtitleStatus={locationStatus} onBack={back} step={3} onRedetect={detectLocation} />
            <div className="flex-1 overflow-y-auto px-5 pb-28 pt-3">
              <div className="bg-slate-900 rounded-2xl p-5 mb-5 text-white">
                <div className="text-[11px] text-white/50 font-semibold uppercase tracking-wide">Amount payable</div>
                <div className="text-3xl font-extrabold font-display mt-1">{fmt(total)}</div>
                <div className="text-[11px] text-white/40 mt-1">
                  {files.length} document{files.length > 1 ? "s" : ""} &middot; {files.reduce((s, f) => s + fileTotalCopies(f), 0)} total copies
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { id: "card", label: "Card", icon: CreditCard },
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "wallet", label: "Wallet", icon: Wallet },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => { setPayMethod(m.id); setFormError(""); }}
                      className={
                        "flex flex-col items-center gap-1.5 py-3 rounded-xl border font-semibold text-xs transition " +
                        (payMethod === m.id ? "bg-blue-50 border-blue-300 text-blue-600" : "bg-white border-slate-200 text-slate-500")
                      }
                    >
                      <Icon size={18} /> {m.label}
                    </button>
                  );
                })}
              </div>

              {payMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Card number</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={card.number}
                      maxLength={19}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                        setCard((c) => ({ ...c, number: digits.replace(/(.{4})/g, "$1 ").trim() }));
                      }}
                      className="w-full mt-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Cardholder name</label>
                    <input
                      type="text"
                      placeholder="As printed on card"
                      value={card.name}
                      onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                      className="w-full mt-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-slate-500">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={card.expiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
                          if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                          setCard((c) => ({ ...c, expiry: v }));
                        }}
                        className="w-full mt-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-slate-500">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="•••"
                        value={card.cvv}
                        onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                        className="w-full mt-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {payMethod === "upi" && (
                <div>
                  <label className="text-xs font-semibold text-slate-500">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full mt-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <p className="text-[11px] text-slate-400 mt-2">Payment request bhej denge aapke UPI app par.</p>
                </div>
              )}

              {payMethod === "wallet" && (
                <div className="text-center py-6">
                  <Wallet size={30} className="mx-auto text-blue-500 mb-2" />
                  <div className="text-sm font-semibold text-slate-700">Wallet balance: {fmt(500)}</div>
                  <p className="text-[11px] text-slate-400 mt-1">Sufficient balance available for this order.</p>
                </div>
              )}

              {formError && (
                <div className="mt-3 flex items-center gap-2 text-rose-600 text-xs font-semibold bg-rose-50 rounded-lg px-3 py-2">
                  <AlertCircle size={14} /> {formError}
                </div>
              )}
              <p className="text-[10px] text-slate-400 mt-4 text-center">Demo checkout — koi real charge nahi hoga.</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-slate-100">
              <button
                onClick={handlePay}
                disabled={paying}
                className="w-full py-4 rounded-2xl font-bold text-[15px] bg-[#F5C531] text-slate-900 active:scale-[0.98] shadow-lg shadow-yellow-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {paying ? (<><Loader2 size={18} className="animate-spin" /> Processing…</>) : (<>PAY {fmt(total)}</>)}
              </button>
            </div>
          </>
        )}

        {/* ================= SUCCESS ================= */}
        {step === 4 && (
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="bg-[#14161B] pt-10 pb-8 px-6 rounded-b-[2rem] text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-400/15 flex items-center justify-center pop-in">
                <svg width="46" height="46" viewBox="0 0 46 46">
                  <circle cx="23" cy="23" r="21" fill="none" stroke="#34D399" strokeWidth="2.5" opacity="0.35" />
                  <path d="M13 24l6 6 14-14" fill="none" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="draw-check" />
                </svg>
              </div>
              <h2 className="text-white font-display font-extrabold text-xl mt-4">Payment Successful!</h2>
              <p className="text-white/50 text-sm mt-1">Order placed — print ho raha hai</p>
              <div className="inline-block mt-4 bg-white/10 text-white text-xs font-bold tracking-wider px-4 py-1.5 rounded-full">ORDER #{orderId}</div>
            </div>

            <div className="flex-1 px-5 py-5 space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                  <span>Order summary</span><span>{files.length} file{files.length > 1 ? "s" : ""}</span>
                </div>
                {files.map((f) => (
                  <div key={f.id} className="flex justify-between text-sm py-1.5 border-b border-slate-200 last:border-0">
                    <span className="text-slate-600 truncate pr-3">{f.name} &times;{fileTotalCopies(f)}</span>
                    <span className="font-semibold text-slate-800 shrink-0">{fmt(fileCost(f))}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 mt-1"><span>Total paid</span><span>{fmt(total)}</span></div>
              </div>

              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-4">
                <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center shrink-0"><MapPin size={17} className="text-rose-500" /></div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Delivering printouts to</div>
                  <div className="text-sm font-bold text-slate-800">{dropLocation}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-blue-50 rounded-2xl p-4">
                <Printer size={20} className="text-blue-500 shrink-0" />
                <div className="text-xs text-blue-700 font-medium">
                  Estimated ready in <span className="font-bold">25–30 mins</span>. Aapko notify kar denge jab print ready ho jaayega.
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 text-slate-600 text-sm font-semibold">
                <Download size={15} /> Download Invoice
              </button>
            </div>

            <div className="p-4 border-t border-slate-100">
              <button onClick={resetAll} className="w-full py-4 rounded-2xl font-bold text-[15px] bg-[#F5C531] text-slate-900 active:scale-[0.98] shadow-lg shadow-yellow-200">
                START NEW ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
