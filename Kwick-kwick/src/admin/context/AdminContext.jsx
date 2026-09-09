import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

const initialCategories = [
  { id: 'cat-1', name: 'Doctor', subtitle: 'Consultation', emoji: '🩺', iconBg: 'bg-yellow-100', iconColor: 'text-purple-600' },
  { id: 'cat-2', name: 'Medicine Store', subtitle: 'Health Care', emoji: '💊', iconBg: 'bg-yellow-100', iconColor: 'text-rose-500' },
  { id: 'cat-3', name: 'Ambulance', subtitle: 'Emergency', emoji: '🚑', iconBg: 'bg-yellow-100', iconColor: 'text-blue-500' },
  { id: 'cat-4', name: 'Kwick Laundry', subtitle: 'Laundry', emoji: '🧺', iconBg: 'bg-yellow-100', iconColor: 'text-amber-600' },
  { id: 'cat-5', name: 'Fresh Mandi', subtitle: 'Fruits & Veg', emoji: '🥦', iconBg: 'bg-yellow-100', iconColor: 'text-emerald-500' },
  { id: 'cat-6', name: 'Pick & Drop', subtitle: 'Logistics', emoji: '🛵', iconBg: 'bg-yellow-100', iconColor: 'text-pink-500' },
  { id: 'cat-7', name: 'Mishra Ji Cake', subtitle: 'Cakes & Bakes', emoji: '🎂', iconBg: 'bg-yellow-100', iconColor: 'text-amber-500' },
  { id: 'cat-8', name: 'Household', subtitle: 'Daily Needs', emoji: '🛍️', iconBg: 'bg-yellow-100', iconColor: 'text-sky-500' },
  { id: 'cat-9', name: 'Kwick.Books Vendor', subtitle: 'Books & Rentals', emoji: '📚', iconBg: 'bg-yellow-100', iconColor: 'text-indigo-500' },
  { id: 'cat-10', name: 'Stationary Shop', subtitle: 'Books & Pens', emoji: '📝', iconBg: 'bg-yellow-100', iconColor: 'text-teal-500' },
  { id: 'cat-11', name: 'Electric Shop', subtitle: 'Home Gear', emoji: '⚡', iconBg: 'bg-yellow-100', iconColor: 'text-amber-600' },
  { id: 'cat-12', name: 'Pandit Ji Chai', subtitle: 'Tea & Snacks', emoji: '☕', iconBg: 'bg-yellow-100', iconColor: 'text-amber-800' },
  { id: 'cat-13', name: 'Home Services', subtitle: 'Maintenance', emoji: '🔧', iconBg: 'bg-yellow-100', iconColor: 'text-slate-600' }
];

const initialCategoryItems = {
  'cat-1': [
    { id: 'item-101', name: 'General Physician Consultation', price: 300, unit: 'per session', vendor: 'Dr. R. K. Sinha Clinic', status: 'Active' },
    { id: 'item-102', name: 'Pediatrician Checkup', price: 400, unit: 'per visit', vendor: 'Munger Child Care Clinic', status: 'Active' }
  ],
  'cat-2': [
    { id: 'item-201', name: 'Paracetamol 500mg (10 tabs)', price: 15, unit: '1 strip', vendor: 'Kwick Pharmacy & Medical', status: 'Active' },
    { id: 'item-202', name: 'Digital Thermometer', price: 250, unit: '1 piece', vendor: 'City Medical Store', status: 'Active' }
  ],
  'cat-3': [
    { id: 'item-301', name: 'Advanced Life Support (ALS) Ambulance', price: 1500, unit: 'per emergency call', vendor: 'Munger Emergency Ambulance Care', status: 'Active' },
    { id: 'item-302', name: 'Basic Life Support (BLS) Ambulance', price: 800, unit: 'per trip', vendor: 'Munger Emergency Ambulance Care', status: 'Active' }
  ],
  'cat-4': [
    { id: 'item-401', name: 'Dry Cleaning (Shirt / Pant)', price: 60, unit: '1 piece', vendor: 'Kwick Laundry Service', status: 'Active' },
    { id: 'item-402', name: 'Wash & Fold Laundry', price: 49, unit: 'per kg', vendor: 'Express Wash Munger', status: 'Active' }
  ],
  'cat-5': [
    { id: 'item-501', name: 'Fresh Farm Tomatoes', price: 40, unit: '1 kg', vendor: 'Fresh Mandi Grocery Superstore', status: 'Active' },
    { id: 'item-502', name: 'Organic Potatoes', price: 30, unit: '1 kg', vendor: 'Fresh Mandi Grocery Superstore', status: 'Active' }
  ],
  'cat-6': [
    { id: 'item-601', name: 'Local Parcel Pick & Drop', price: 50, unit: 'up to 5 km', vendor: 'Kwick Logistics', status: 'Active' },
    { id: 'item-602', name: 'Inter-City Express Courier', price: 120, unit: 'per package', vendor: 'Kwick Express Dispatch', status: 'Active' }
  ],
  'cat-7': [
    { id: 'item-701', name: 'Chocolate Truffle Cake', price: 450, unit: '500g', vendor: 'Mishra Ji Bakery & Cakes', status: 'Active' },
    { id: 'item-702', name: 'Fresh Cream Black Forest Cake', price: 400, unit: '500g', vendor: 'Mishra Ji Bakery & Cakes', status: 'Active' }
  ],
  'cat-8': [
    { id: 'item-801', name: 'Dishwash Gel 500ml', price: 95, unit: '1 bottle', vendor: 'Daily Needs Store', status: 'Active' },
    { id: 'item-802', name: 'Floor Cleaner Liquid 1L', price: 180, unit: '1 bottle', vendor: 'Household Mart Munger', status: 'Active' }
  ],
  'cat-9': [
    { id: 'item-901', name: 'NCERT Class 10 Books Set', price: 650, unit: 'complete set', vendor: 'Kwick Books & Rentals', status: 'Active' },
    { id: 'item-902', name: 'Competitive Exam Guide Book', price: 320, unit: '1 copy', vendor: 'Kwick Books & Rentals', status: 'Active' }
  ],
  'cat-10': [
    { id: 'item-1001', name: 'Classmate Notebooks (Pack of 6)', price: 180, unit: 'pack', vendor: 'Stationery Gift Center', status: 'Active' },
    { id: 'item-1002', name: 'Gel Pens Assorted (10 pcs)', price: 100, unit: 'box', vendor: 'Stationery Gift Center', status: 'Active' }
  ],
  'cat-11': [
    { id: 'item-1101', name: 'LED Bulb 9W (Pack of 2)', price: 140, unit: 'pack', vendor: 'Electric Hardware Shop', status: 'Active' },
    { id: 'item-1102', name: 'Extension Board 4 Socket', price: 299, unit: '1 piece', vendor: 'Electric Hardware Shop', status: 'Active' }
  ],
  'cat-12': [
    { id: 'item-1201', name: 'Kulhad Masala Chai', price: 15, unit: '1 cup', vendor: 'Pandit Ji Chai Corner', status: 'Active' },
    { id: 'item-1202', name: 'Bun Maska & Special Tea', price: 45, unit: '1 combo', vendor: 'Pandit Ji Chai Corner', status: 'Active' }
  ],
  'cat-13': [
    { id: 'item-1301', name: 'Home AC Servicing & Cleaning', price: 599, unit: 'per AC', vendor: 'Home Services Munger', status: 'Active' },
    { id: 'item-1302', name: 'Plumbing Repair Visit', price: 199, unit: 'visit charge', vendor: 'Home Services Munger', status: 'Active' }
  ]
};

const initialOffers = [
  {
    id: 'OFFER-101',
    code: 'SAVE20',
    title: '20% OFF Ambulance & Rides',
    description: 'Flat 20% discount on emergency ambulance and local bike ride bookings.',
    discount: '20% OFF',
    category: 'Ambulance & RideGo',
    expiry: '31 Aug 2026',
    status: 'Active',
    usageCount: 1240
  },
  {
    id: 'OFFER-102',
    code: 'FREEDEL',
    title: 'Free Express Delivery',
    description: 'Free home delivery on Fresh Mandi & Mishra Ji Cake orders above ₹499.',
    discount: 'Free Shipping',
    category: 'Fresh Mandi & Cakes',
    expiry: '15 Sep 2026',
    status: 'Active',
    usageCount: 890
  },
  {
    id: 'OFFER-103',
    code: 'KWICKHEALTH',
    title: 'Flat ₹100 Off Doctor Visit',
    description: 'Discount on online physician appointment booking & medicine orders.',
    discount: '₹100 OFF',
    category: 'Doctor & Medicines',
    expiry: '10 Sep 2026',
    status: 'Active',
    usageCount: 430
  },
  {
    id: 'OFFER-104',
    code: 'KWICKBOOKS',
    title: '15% Off Book Rentals & Stationery',
    description: 'Special student discount on Class 10 NCERT books & school supplies.',
    discount: '15% OFF',
    category: 'Kwick.Books & Stationery',
    expiry: '05 Oct 2026',
    status: 'Active',
    usageCount: 310
  }
];

const initialVendors = [
  {
    id: 'VND-101',
    name: 'Munger Emergency Ambulance Care',
    category: 'Ambulance',
    owner: 'Dr. R. K. Sinha',
    phone: '+91 98351 22341',
    location: 'Fort Road, Munger',
    status: 'Active',
    commissionRate: 10,
    kycStatus: 'Verified',
    rating: 4.9,
    totalBookings: 1420
  },
  {
    id: 'VND-102',
    name: 'Fresh Mandi Grocery Superstore',
    category: 'Fresh Mandi',
    owner: 'Amit Kumar',
    phone: '+91 94312 88712',
    location: 'Jamalpur Market',
    status: 'Active',
    commissionRate: 8,
    kycStatus: 'Verified',
    rating: 4.7,
    totalBookings: 3290
  },
  {
    id: 'VND-103',
    name: 'Mishra Ji Bakery & Cakes',
    category: 'Mishra Ji Cake',
    owner: 'Sanjay Mishra',
    phone: '+91 91223 44556',
    location: 'Station Road, Munger',
    status: 'Suspended',
    commissionRate: 12,
    kycStatus: 'Pending',
    rating: 4.5,
    totalBookings: 840
  },
  {
    id: 'VND-104',
    name: 'Kwick Pharmacy & Medical',
    category: 'Medicine Store',
    owner: 'Rajesh Verma',
    phone: '+91 99341 77623',
    location: 'City Hospital Gate, Munger',
    status: 'Active',
    commissionRate: 7,
    kycStatus: 'Verified',
    rating: 4.8,
    totalBookings: 2150
  }
];

const initialCustomers = [
  {
    id: 'CUST-201',
    name: 'Priyanshu Kumar',
    phone: '+91 98012 34567',
    email: 'priyanshu@kwick.com',
    status: 'Active',
    walletBalance: 450,
    totalOrders: 28,
    joinedDate: '2024-01-15'
  },
  {
    id: 'CUST-202',
    name: 'Neha Sharma',
    phone: '+91 94789 12345',
    email: 'neha.s@gmail.com',
    status: 'Active',
    walletBalance: 120,
    totalOrders: 14,
    joinedDate: '2024-03-02'
  },
  {
    id: 'CUST-203',
    name: 'Vikram Singh',
    phone: '+91 91555 88990',
    email: 'vikram.singh@yahoo.com',
    status: 'Banned',
    walletBalance: 0,
    totalOrders: 3,
    joinedDate: '2024-05-18'
  },
  {
    id: 'CUST-204',
    name: 'Ananya Roy',
    phone: '+91 98321 65498',
    email: 'ananya.roy@outlook.com',
    status: 'Active',
    walletBalance: 890,
    totalOrders: 42,
    joinedDate: '2023-11-20'
  }
];

const initialRiders = [
  {
    id: 'RDR-301',
    name: 'Arjun Sharma',
    phone: '+91 98355 11223',
    vehicleType: 'Emergency ALS Ambulance',
    plateNumber: 'BR 01 AB 1234',
    status: 'Active',
    dutyStatus: 'Online',
    rating: 4.9,
    trips: 1240,
    earnings: 38400,
    assignedVendor: 'Munger Emergency Ambulance Care'
  },
  {
    id: 'RDR-302',
    name: 'Rahul Verma',
    phone: '+91 94311 44556',
    vehicleType: 'Patient Transport Vehicle',
    plateNumber: 'BR 02 CD 5678',
    status: 'Active',
    dutyStatus: 'On Trip',
    rating: 4.8,
    trips: 980,
    earnings: 29500,
    assignedVendor: 'Munger Emergency Ambulance Care'
  },
  {
    id: 'RDR-303',
    name: 'Sonu Kumar',
    phone: '+91 91222 77889',
    vehicleType: 'Delivery Bike',
    plateNumber: 'BR 03 EF 9012',
    status: 'Active',
    dutyStatus: 'Offline',
    rating: 4.7,
    trips: 760,
    earnings: 18900,
    assignedVendor: 'Fresh Mandi Grocery Superstore'
  },
  {
    id: 'RDR-304',
    name: 'Ramesh Yadav',
    phone: '+91 99344 33221',
    vehicleType: 'Basic Life Support (BLS)',
    plateNumber: 'BR 01 XY 7788',
    status: 'Suspended',
    dutyStatus: 'Offline',
    rating: 4.2,
    trips: 310,
    earnings: 9200,
    assignedVendor: 'Munger Emergency Ambulance Care'
  }
];

import { getLiveOffers, saveLiveOffers } from '../../utils/offersService';

export const AdminProvider = ({ children }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [categoryItems, setCategoryItems] = useState(initialCategoryItems);
  const [offers, setOffers] = useState(getLiveOffers);
  const [vendors, setVendors] = useState(initialVendors);
  const [customers, setCustomers] = useState(initialCustomers);
  const [riders, setRiders] = useState(initialRiders);
  const [activeTab, setActiveTab] = useState('overview');

  // Ongoing Offers CRUD with live broadcast sync
  const addOffer = (offerData) => {
    const newOffer = {
      id: `OFFER-${Date.now()}`,
      status: 'Active',
      usageCount: 0,
      ...offerData
    };
    setOffers(prev => {
      const next = [newOffer, ...prev];
      saveLiveOffers(next);
      return next;
    });
  };

  const updateOffer = (id, updatedFields) => {
    setOffers(prev => {
      const next = prev.map(o => o.id === id ? { ...o, ...updatedFields } : o);
      saveLiveOffers(next);
      return next;
    });
  };

  const deleteOffer = (id) => {
    setOffers(prev => {
      const next = prev.filter(o => o.id !== id);
      saveLiveOffers(next);
      return next;
    });
  };

  const toggleOfferStatus = (id) => {
    setOffers(prev => {
      const next = prev.map(o => {
        if (o.id === id) {
          return { ...o, status: o.status === 'Active' ? 'Inactive' : 'Active' };
        }
        return o;
      });
      saveLiveOffers(next);
      return next;
    });
  };

  // Business Category CRUD
  const addCategory = (catData) => {
    const newCat = {
      id: `cat-${Date.now()}`,
      emoji: catData.emoji || '🏪',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-amber-600',
      ...catData
    };
    setCategories(prev => [...prev, newCat]);
    setCategoryItems(prev => ({ ...prev, [newCat.id]: [] }));
  };

  const updateCategory = (id, updatedFields) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    setCategoryItems(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // Business Category Item CRUD
  const addCategoryItem = (catId, itemData) => {
    const newItem = {
      id: `item-${Date.now()}`,
      status: 'Active',
      ...itemData
    };
    setCategoryItems(prev => ({
      ...prev,
      [catId]: [newItem, ...(prev[catId] || [])]
    }));
  };

  const updateCategoryItem = (catId, itemId, updatedFields) => {
    setCategoryItems(prev => ({
      ...prev,
      [catId]: (prev[catId] || []).map(item => item.id === itemId ? { ...item, ...updatedFields } : item)
    }));
  };

  const deleteCategoryItem = (catId, itemId) => {
    setCategoryItems(prev => ({
      ...prev,
      [catId]: (prev[catId] || []).filter(item => item.id !== itemId)
    }));
  };

  const toggleCategoryItemStatus = (catId, itemId) => {
    setCategoryItems(prev => ({
      ...prev,
      [catId]: (prev[catId] || []).map(item => {
        if (item.id === itemId) {
          return { ...item, status: item.status === 'Active' ? 'Disabled' : 'Active' };
        }
        return item;
      })
    }));
  };

  // Vendor CRUD
  const addVendor = (vendorData) => {
    const newVendor = {
      id: `VND-${Math.floor(100 + Math.random() * 900)}`,
      rating: 5.0,
      totalBookings: 0,
      kycStatus: 'Verified',
      status: 'Active',
      ...vendorData
    };
    setVendors(prev => [newVendor, ...prev]);
  };

  const updateVendor = (id, updatedFields) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, ...updatedFields } : v));
  };

  const deleteVendor = (id) => {
    setVendors(prev => prev.filter(v => v.id !== id));
  };

  const toggleVendorStatus = (id) => {
    setVendors(prev => prev.map(v => {
      if (v.id === id) {
        return { ...v, status: v.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return v;
    }));
  };

  // Customer CRUD
  const addCustomer = (customerData) => {
    const newCust = {
      id: `CUST-${Math.floor(200 + Math.random() * 800)}`,
      status: 'Active',
      totalOrders: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      walletBalance: Number(customerData.walletBalance || 0),
      ...customerData
    };
    setCustomers(prev => [newCust, ...prev]);
  };

  const updateCustomer = (id, updatedFields) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const toggleCustomerStatus = (id) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'Active' ? 'Banned' : 'Active' };
      }
      return c;
    }));
  };

  const adjustCustomerWallet = (id, deltaAmount) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        const newBal = Math.max(0, c.walletBalance + Number(deltaAmount));
        return { ...c, walletBalance: newBal };
      }
      return c;
    }));
  };

  // Rider CRUD
  const addRider = (riderData) => {
    const newRider = {
      id: `RDR-${Math.floor(300 + Math.random() * 700)}`,
      status: 'Active',
      dutyStatus: 'Offline',
      rating: 5.0,
      trips: 0,
      earnings: 0,
      ...riderData
    };
    setRiders(prev => [newRider, ...prev]);
  };

  const updateRider = (id, updatedFields) => {
    setRiders(prev => prev.map(r => r.id === id ? { ...r, ...updatedFields } : r));
  };

  const deleteRider = (id) => {
    setRiders(prev => prev.filter(r => r.id !== id));
  };

  const toggleRiderDuty = (id) => {
    setRiders(prev => prev.map(r => {
      if (r.id === id) {
        const nextDuty = r.dutyStatus === 'Online' ? 'Offline' : 'Online';
        return { ...r, dutyStatus: nextDuty };
      }
      return r;
    }));
  };

  const toggleRiderStatus = (id) => {
    setRiders(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, status: r.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return r;
    }));
  };

  return (
    <AdminContext.Provider
      value={{
        categories,
        categoryItems,
        offers,
        vendors,
        customers,
        riders,
        activeTab,
        setActiveTab,
        addOffer,
        updateOffer,
        deleteOffer,
        toggleOfferStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        addCategoryItem,
        updateCategoryItem,
        deleteCategoryItem,
        toggleCategoryItemStatus,
        addVendor,
        updateVendor,
        deleteVendor,
        toggleVendorStatus,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        toggleCustomerStatus,
        adjustCustomerWallet,
        addRider,
        updateRider,
        deleteRider,
        toggleRiderDuty,
        toggleRiderStatus
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
