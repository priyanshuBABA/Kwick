/**
 * Mock data extracted from HTML design
 * Used for all customer pages to maintain consistent design
 */

export const PRODUCTS = [
  { id: 'p1', e: '🍜', n: 'Maggi Noodles Bundle', p: 120, left: 50, tag: '40%' },
  { id: 'p2', e: '🥛', n: 'Amul Milk 1L', p: 45, left: 100, tag: '15%' },
  { id: 'p3', e: '🍵', n: 'Tea Powder 250g', p: 95, left: 75, tag: '30%' },
  { id: 'p4', e: '📦', n: 'Bread Pack', p: 35, left: 200, tag: '20%' },
];

export const BUY_AGAIN = [
  { id: 'b1', e: '🥛', n: 'Milk 1L', p: 58 },
  { id: 'b2', e: '📦', n: 'Bread', p: 45 },
  { id: 'b3', e: '🍵', n: 'Chai Patti', p: 120 },
  { id: 'b4', e: '🥚', n: 'Eggs (12)', p: 84 },
  { id: 'b5', e: '🧂', n: 'Sugar 1kg', p: 48 },
];

export const TRENDING = [
  { id: 't1', e: '🧈', n: 'Amul Butter 500g', p: 265, tag: 'Top Seller' },
  { id: 't2', e: '🍜', n: 'Maggi 4-Pack', p: 56, tag: '20% Off' },
  { id: 't3', e: '📦', n: 'Britannia Bread', p: 45, tag: 'Under ₹99' },
  { id: 't4', e: '🍵', n: 'Tata Tea Gold 250g', p: 138, tag: 'Top Seller' },
  { id: 't5', e: '🧀', n: 'Fresh Paneer 200g', p: 89, tag: 'Under ₹99' },
];

export const BRANDS = [
  { id: 'br1', e: '🥛', n: 'Amul' },
  { id: 'br2', e: '📦', n: 'ITC' },
  { id: 'br3', e: '🪥', n: 'Colgate' },
  { id: 'br4', e: '🧴', n: 'Boroplus' },
  { id: 'br5', e: '🍪', n: "Haldiram's" },
  { id: 'br6', e: '🍕', n: 'Britannia' },
];

export const DAILY_CATS = [
  { id: 'dc1', e: '🛒', n: 'Grocery', c: '#D1FAE5', sub: '400+ Items' },
  { id: 'dc2', e: '💊', n: 'Medicines', c: '#FEE2E2', sub: '24x7 Delivery' },
  { id: 'dc3', e: '🥦', n: 'Fresh Mandi', c: '#DCFCE7', sub: 'Farm Fresh' },
  { id: 'dc4', e: '🍎', n: 'Fruits', c: '#FEE2E2', sub: 'Handpicked' },
  { id: 'dc5', e: '🥕', n: 'Vegetables', c: '#FEF3C7', sub: 'Daily Stock' },
  { id: 'dc6', e: '🎂', n: 'Cakes', c: '#FCE7F3', sub: 'Fresh Baked' },
  { id: 'dc7', e: '🍞', n: 'Bakery', c: '#FEF3C7', sub: 'Warm & Fresh' },
  { id: 'dc8', e: '📎', n: 'Stationery', c: '#E0E7FF', sub: '120+ Items' },
  { id: 'dc9', e: '🧺', n: 'Laundry', c: '#DBEAFE', sub: '2hr Pickup' },
  { id: 'dc10', e: '🔌', n: 'Electric', c: '#FEF9C3', sub: 'Fast Fix' },
  { id: 'dc11', e: '🌷', n: 'Flowers', c: '#FCE7F3', sub: 'Same Day' },
  { id: 'dc12', e: '🐾', n: 'Pet Shop', c: '#E0E7FF', sub: '150+ Items' },
];

export const SERVICE_CATS = [
  { id: 'sc1', e: '🔧', n: 'Home Services', c: '#F1F5F9', sub: 'Verified Pros' },
  { id: 'sc2', e: '🩺', n: 'Doctor', c: '#DBEAFE', sub: 'Video Consult' },
  { id: 'sc3', e: '🚑', n: 'Ambulance', c: '#FEE2E2', sub: 'Emergency' },
  { id: 'sc4', e: '🚕', n: 'Taxi', c: '#FEF3C7', sub: 'On Demand' },
  { id: 'sc5', e: '🏍️', n: 'Bike Ride', c: '#CFFAFE', sub: 'Quick Hop' },
  { id: 'sc6', e: '📦', n: 'Pick & Drop', c: '#FDE68A', sub: 'Same Hour' },
  { id: 'sc7', e: '🖨️', n: 'Kwick Print', c: '#E9D5FF', sub: 'Instant Print' },
];

export const STORES = [
  { id: 's1', e: '🎂', n: 'Mishra Cake & Bak...', tag: 'Verified Partner', r: 4.7 },
  { id: 's2', e: '🥦', n: 'Jhagriya Fresh Mart', tag: 'Local Favourite', r: 4.4 },
  { id: 's3', e: '💊', n: 'Apna Medical Store', tag: 'Verified Partner', r: 4.8 },
  { id: 's4', e: '🌸', n: 'City Florist', tag: 'New', r: 4.5 },
];

export const REVIEWS = [
  { id: 'rv1', n: 'Aman K.', t: 'Delivery was insanely fast — 12 minutes for groceries at 9pm. Kwick is now my default app.' },
  { id: 'rv2', n: 'Priya S.', t: 'Booked a home service and an ambulance both through Kwick this month. Genuinely useful for a household.' },
  { id: 'rv3', n: 'Rahul V.', t: 'Wallet cashback plus reward points make repeat orders feel worth it. UI is clean and quick to use.' },
];

export const ORDERS = [
  { id: 'o1', store: 'Fresh Basket', e: '🧺', id_num: '#KWK89231', date: '28 Aug, 6:40 PM', items: ['🥛', '🥚', '📦'], total: 187, status: 'delivered' },
  { id: 'o2', store: 'MediPlus', e: '💊', id_num: '#KWK89187', date: '27 Aug, 4:10 PM', items: ['💊', '💊'], total: 349, status: 'transit' },
  { id: 'o3', store: 'Mishra Cake & Bakery', e: '🎂', id_num: '#KWK88790', date: '22 Aug, 11:05 AM', items: ['🎂'], total: 499, status: 'delivered' },
  { id: 'o4', store: 'Jhagriya Fresh Mart', e: '🥦', id_num: '#KWK88420', date: '15 Aug, 8:20 PM', items: ['🥕', '🍎', '🥦'], total: 242, status: 'cancelled' },
];

export const WISHLIST_ITEMS = [
  { id: 'w1', e: '🧈', n: 'Amul Butter 500g', p: 265, save: '15% OFF', stock: true },
  { id: 'w2', e: '🍫', n: 'Dairy Milk Silk 150g', p: 210, save: '10% OFF', stock: true },
  { id: 'w3', e: '🧴', n: 'Boroplus Lotion 400ml', p: 189, save: '', stock: false },
  { id: 'w4', e: '🧀', n: 'Fresh Paneer 200g', p: 89, save: '', stock: true },
];

export const TRANSACTIONS = [
  { id: 'tx1', t: 'Order Payment — Fresh Basket', d: '28 Aug, 6:40 PM', amt: -187, type: 'debit', ic: '🛒' },
  { id: 'tx2', t: 'Cashback Credited', d: '27 Aug, 4:15 PM', amt: 35, type: 'credit', ic: '🎁' },
  { id: 'tx3', t: 'Wallet Top-up', d: '25 Aug, 9:02 AM', amt: 1000, type: 'credit', ic: '➕' },
  { id: 'tx4', t: 'Order Payment — MediPlus', d: '27 Aug, 4:10 PM', amt: -349, type: 'debit', ic: '💊' },
  { id: 'tx5', t: 'Refund — Jhagriya Fresh Mart', d: '15 Aug, 9:30 PM', amt: 242, type: 'credit', ic: '↩️' },
];

export const COUPONS = [
  { id: 'c1', code: 'KWICK50', desc: 'Flat ₹50 off on orders above ₹299', exp: 'Valid till 5 Sep' },
  { id: 'c2', code: 'MEDI20', desc: '20% off on medicines, max ₹100', exp: 'Valid till 10 Sep' },
  { id: 'c3', code: 'FRESH100', desc: '₹100 off on fruits & veggies, min ₹499', exp: 'Valid till 3 Sep' },
];

export const SETTINGS = [
  { id: 'st1', ic: '📍', t: 'Saved Addresses', s: 'Home, Work +1 more', path: '/customer/profile/addresses' },
  { id: 'st2', ic: '💳', t: 'Payment Methods', s: '2 UPI IDs, 1 Card saved', path: '/customer/profile/payments' },
  { id: 'st3', ic: '👑', t: 'Kwick Pro Subscription', s: 'Renew or upgrade your plan', path: '/customer/profile/kwick-pro' },
  { id: 'st4', ic: '🌐', t: 'Language & Preferences', s: 'English • Voice search on', path: '/customer/profile/preferences' },
  { id: 'st5', ic: '🔒', t: 'Security & Privacy', s: 'Password, account deletion', path: '/customer/profile/security' },
  { id: 'st6', ic: '📞', t: 'Help & Support', s: '24x7 chatbot & call support', path: '/customer/profile/support' },
];

export const NOTIFICATIONS = [
  'Aman from Jhagriya reordered Groceries — 4m ago',
  'Priya near you just booked a Home Service — 3m ago',
  'Someone in Bhopal just used code KWICK50 — 2m ago',
];

export const ACTIVE_ORDER = { name: 'MediPlus', eta: 12 };

export const TRACKING_STEPS = [
  { label: 'Placed', status: 'completed' },
  { label: 'Packed', status: 'completed' },
  { label: 'On the Way', status: 'completed' },
  { label: 'Delivered', status: 'pending' },
];

export const PARTNER_INFO = {
  name: 'Sandeep Kumar',
  role: 'Delivery Partner',
  bike: 'Bike KA 04 EF 8821',
  avatar: '🧑‍🦱',
};
