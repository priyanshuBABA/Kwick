// Shared Live Offers Service for Admin, Customer, Vendor, and Rider sections

export const DEFAULT_OFFERS = [
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

export const getLiveOffers = () => {
  try {
    const stored = localStorage.getItem('kwick_admin_offers');
    return stored ? JSON.parse(stored) : DEFAULT_OFFERS;
  } catch (e) {
    return DEFAULT_OFFERS;
  }
};

export const saveLiveOffers = (offers) => {
  try {
    localStorage.setItem('kwick_admin_offers', JSON.stringify(offers));
    window.dispatchEvent(new Event('kwick_offers_updated'));
  } catch (e) {
    console.error('Failed to save offers:', e);
  }
};

export const getOffersByDomain = (domain = 'all') => {
  const allOffers = getLiveOffers();
  const activeOffers = allOffers.filter(o => o.status === 'Active');
  
  if (domain === 'all') return activeOffers;

  return activeOffers.filter(offer => {
    const catLower = offer.category.toLowerCase();
    const domainLower = domain.toLowerCase();

    if (domainLower === 'customer') {
      return true;
    }
    if (domainLower === 'vendor') {
      return catLower.includes('vendor') || catLower.includes('mandi') || catLower.includes('cakes') || catLower.includes('doctor') || catLower.includes('stationery') || catLower.includes('all');
    }
    if (domainLower === 'rider') {
      return catLower.includes('ambulance') || catLower.includes('ride') || catLower.includes('delivery') || catLower.includes('all');
    }
    return true;
  });
};
