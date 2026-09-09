import React, { useState, useRef, useEffect } from 'react';
import MobileFrame from '../../components/MobileFrame';
import TopBar from '../../components/TopBar';
import MapPlaceholder from '../../components/MapPlaceholder';
import { 
  Camera, 
  MapPin, 
  Navigation, 
  Package, 
  X, 
  CheckCircle, 
  ArrowRight, 
  Loader2, 
  IndianRupee, 
  FileText, 
  Printer, 
  UploadCloud,
  FileCheck
} from 'lucide-react';
import { useAppContext } from '../../AppContext';
import { useLocationContext } from '../../context/LocationContext';

const PickDrop = () => {
  const [serviceType, setServiceType] = useState('delivery'); // 'delivery' or 'printout'
  const [pickup, setPickup] = useState('');
  const { placeOrder } = useAppContext();
  const { currentLocation, formattedAddress } = useLocationContext();
  const [dropoff, setDropoff] = useState(formattedAddress);
  const [itemImage, setItemImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [printOptions, setPrintOptions] = useState({ type: 'B&W', copies: 1, sides: 'Single' });
  const [step, setStep] = useState('input'); // input, confirm, booking, success
  const [isBooking, setIsBooking] = useState(false);
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);

  useEffect(() => {
    if (formattedAddress) {
      setDropoff(formattedAddress);
    }
  }, [formattedAddress]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setItemImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const handleBooking = () => {
    setStep('booking');
    setIsBooking(true);
    
    // Add real request to context
    placeOrder({
      storeName: serviceType === 'printout' ? 'Munger Printing Hub' : 'Custom Pickup',
      items: [{ name: serviceType === 'printout' ? `Printout: ${documentFile?.name}` : 'Package Delivery', qty: 1 }],
      total: serviceType === 'printout' ? 20 : 45,
      drop: dropoff,
      dropLocation: currentLocation,
    });

    setTimeout(() => {
      setIsBooking(false);
      setStep('success');
    }, 2500);
  };

  const resetProcess = () => {
    setStep('input');
    setPickup('');
    setDropoff('');
    setItemImage(null);
    setDocumentFile(null);
  };

  return (
    <MobileFrame>
      <TopBar title="Pick & Drop" showLocation={true} />
      
      {step === 'input' && (
        <div className="p-4 flex flex-col gap-6 animate-in slide-in-from-right duration-300 pb-32">
          {/* Service Toggle */}
          <div className="flex bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200">
             <button 
                onClick={() => setServiceType('delivery')}
                className={`flex-1 py-3 rounded-full text-xs font-black transition-all flex items-center justify-center gap-2 ${serviceType === 'delivery' ? 'bg-white shadow-md text-navy' : 'text-slate-400'}`}
             >
                <Package className="w-4 h-4" /> Send Item
             </button>
             <button 
                onClick={() => setServiceType('printout')}
                className={`flex-1 py-3 rounded-full text-xs font-black transition-all flex items-center justify-center gap-2 ${serviceType === 'printout' ? 'bg-white shadow-md text-navy' : 'text-slate-400'}`}
             >
                <Printer className="w-4 h-4" /> Get Printout
             </button>
          </div>

          <div>
            <h2 className="text-2xl font-black text-navy leading-tight">
                {serviceType === 'delivery' ? 'Samaan bhejna hai?' : 'Document print krna hai?'}
            </h2>
            <p className="text-slate-500 font-medium">
                {serviceType === 'delivery' ? 'Capture karein ya gallery se pick karein!' : 'PDF upload krein, hum print lake denge!'}
            </p>
          </div>

          {/* Photo/Doc Upload Area */}
          {serviceType === 'delivery' ? (
            <div 
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed ${itemImage ? 'border-primary bg-primary/5' : 'border-slate-300 bg-slate-50'} rounded-2xl h-44 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-all relative overflow-hidden group`}
            >
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                {itemImage ? (
                    <div className="absolute inset-0 w-full h-full">
                        <img src={itemImage} alt="Item" className="w-full h-full object-cover" />
                        <button onClick={(e) => { e.stopPropagation(); setItemImage(null); }} className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-lg"><X className="w-5 h-5" /></button>
                    </div>
                ) : (
                    <>
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-primary"><Camera className="w-7 h-7" /></div>
                        <span className="text-sm font-black text-navy">Add Item Photo</span>
                    </>
                )}
            </div>
          ) : (
            <div 
                onClick={() => docInputRef.current.click()}
                className={`border-2 border-dashed ${documentFile ? 'border-primary bg-primary/5' : 'border-slate-300 bg-slate-50'} rounded-2xl h-44 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-all relative overflow-hidden group`}
            >
                <input type="file" ref={docInputRef} onChange={handleDocUpload} accept=".pdf,.doc,.docx" className="hidden" />
                {documentFile ? (
                    <div className="text-center p-6 bg-white/50 w-full h-full flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-2"><FileCheck className="w-8 h-8" /></div>
                        <span className="text-sm font-black text-navy truncate max-w-xs px-4">{documentFile.name}</span>
                        <button onClick={(e) => { e.stopPropagation(); setDocumentFile(null); }} className="mt-3 text-[10px] font-black text-red-500 uppercase tracking-widest px-4 py-2 bg-red-50 rounded-full">Remove File</button>
                    </div>
                ) : (
                    <>
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-blue-500"><UploadCloud className="w-7 h-7" /></div>
                        <span className="text-sm font-black text-navy">Tap to Upload Documents</span>
                        <span className="text-[10px] font-medium text-slate-400">PDF, DOC is allowed</span>
                    </>
                )}
            </div>
          )}

          {/* Print Options (Conditional) */}
          {serviceType === 'printout' && documentFile && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 animate-in zoom-in-95">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Print Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Color Type</label>
                          <select 
                            className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-bold"
                            value={printOptions.type}
                            onChange={(e) => setPrintOptions(p => ({...p, type: e.target.value}))}
                          >
                              <option>B&W (Sasta)</option>
                              <option>Color (Premium)</option>
                          </select>
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">No. of Copies</label>
                          <input 
                            type="number" 
                            min="1" 
                            className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-bold"
                            value={printOptions.copies}
                            onChange={(e) => setPrintOptions(p => ({...p, copies: e.target.value}))}
                          />
                      </div>
                  </div>
              </div>
          )}

          {/* Location Inputs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 relative">
            <div className="absolute left-8 top-12 bottom-12 w-0.5 border-l-2 border-dashed border-slate-200 -z-0"></div>
            
            {(serviceType === 'delivery') && (
            <div className="relative z-10 flex items-center gap-3 mb-6 bg-white">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ring-4 ring-blue-50">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              </div>
              <div className="flex-1 border-b border-slate-100 pb-2">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Pickup Location</label>
                <input 
                  type="text" 
                  placeholder="Kahan se lena hai?" 
                  value={pickup} 
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-navy outline-none"
                />
              </div>
            </div>
            )}

            <div className="relative z-10 flex items-center gap-3 bg-white">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center ring-4 ring-red-50">
                <MapPin className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1 pb-2">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Drop Location (Delivery To)</label>
                <input 
                  type="text" 
                  placeholder={serviceType === 'delivery' ? 'Kahan pahuchana hai?' : 'Print kahan chahiye (Apna Address)?'}
                  value={dropoff} 
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-navy outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            disabled={!dropoff || (serviceType === 'delivery' ? (!pickup || !itemImage) : !documentFile)}
            onClick={() => setStep('confirm')}
            className="mt-2 w-full bg-primary text-navy font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            Review Order <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === 'confirm' && (
        <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-300">
          <MapPlaceholder showRoute={true} height="h-48" />
          
          <div className="p-4 -mt-6 relative z-20">
            <div className="bg-white rounded-3xl shadow-xl p-5 border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-black text-navy">Confirm {serviceType === 'delivery' ? 'Delivery' : 'Printout'}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Order #MS-98234</p>
                </div>
                <div className="bg-primary/10 text-primary p-2 rounded-xl">
                  {serviceType === 'delivery' ? <Package className="w-6 h-6" /> : <Printer className="w-6 h-6" />}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                    {serviceType === 'delivery' ? <img src={itemImage} alt="Preview" className="w-full h-full object-cover" /> : <FileText className="w-8 h-8 text-blue-500" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Details</span>
                    <span className="text-sm font-bold text-navy block mt-1">
                        {serviceType === 'delivery' ? 'Physical Item' : `${documentFile?.name.slice(0, 15)}...`}
                    </span>
                    <span className="text-[11px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">
                        {serviceType === 'delivery' ? 'Ready to Ship' : `${printOptions.type} • ${printOptions.copies} Copies`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-4 space-y-3">
                  {serviceType === 'delivery' && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pickup</span><span className="text-xs font-bold text-navy leading-tight">{pickup}</span></div>
                  </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
                    <div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dropoff To</span><span className="text-xs font-bold text-navy leading-tight">{dropoff}</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-navy rounded-2xl p-4 text-white flex justify-between items-center mb-6">
                <div>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Total Summary</span>
                  <div className="flex items-center gap-1 mt-1">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <span className="text-2xl font-black italic">{serviceType === 'delivery' ? '45.00' : '20.00'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Time</span>
                  <span className="text-sm font-black text-primary block mt-1">15-20 MINS</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('input')} className="flex-1 bg-slate-100 text-navy font-bold py-4 rounded-2xl hover:bg-slate-200 uppercase text-xs">Edit</button>
                <button onClick={handleBooking} className="flex-[2] bg-primary text-navy font-black py-4 rounded-2xl shadow-lg hover:bg-yellow-400 uppercase text-xs">{serviceType === 'delivery' ? 'Ship Now' : 'Print & Deliver'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'booking' && (
        <div className="flex flex-col items-center justify-center h-[80vh] p-8 text-center animate-in zoom-in duration-500">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-slate-100 rounded-full flex items-center justify-center"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100">
              <Printer className="w-6 h-6 text-navy animate-bounce" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-navy">Processing Request...</h3>
          <p className="text-slate-500 font-medium mt-2">Connecting with Munger Printing Shops and Riders.</p>
        </div>
      )}

      {step === 'success' && (
        <div className="p-4 flex flex-col h-full animate-in zoom-in-95 duration-500">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50 animate-bounce"><CheckCircle className="w-12 h-12" /></div>
            <h3 className="text-3xl font-black text-navy mb-2">Order Confirmed!</h3>
            <p className="text-slate-500 font-bold mb-8">
                {serviceType === 'delivery' ? 'Rider assigned for pick-up.' : 'Printing started! Rider will deliver soon.'}
            </p>
          </div>
          <button onClick={resetProcess} className="w-full bg-navy text-white font-black py-5 rounded-2xl uppercase text-sm">Go Back Home</button>
        </div>
      )}
    </MobileFrame>
  );
};

export default PickDrop;
