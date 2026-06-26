// Unified Mock Data for Kwick & RideGo

export const products = {
  freshMandi: [
    { id: "FM1", name: "Fresh Tomatoes", image: "https://loremflickr.com/400/400/tomatoes,fresh", price: 40, weight: "1 kg", emoji: "🍅" },
    { id: "FM2", name: "Organic Potatoes", image: "https://loremflickr.com/400/400/potatoes,fresh", price: 30, weight: "1 kg", emoji: "🥔" },
    { id: "FM3", name: "Green Spinach", image: "https://loremflickr.com/400/400/spinach,fresh", price: 20, weight: "250 g", emoji: "🥬" },
    { id: "FM4", name: "Red Onions", image: "https://loremflickr.com/400/400/onions,fresh", price: 35, weight: "1 kg", emoji: "🧅" },
    { id: "FM5", name: "Fresh Carrots", image: "https://loremflickr.com/400/400/carrots,fresh", price: 25, weight: "500 g", emoji: "🥕" },
    { id: "FM6", name: "Green Chillies", image: "https://loremflickr.com/400/400/chilli,fresh", price: 10, weight: "100 g", emoji: "🌶️" }
  ],
  foodCakes: [
    { id: "FC1", name: "Chocolate Truffle", image: "https://loremflickr.com/400/400/cake,fresh", price: 450, weight: "500 g", emoji: "🎂" },
    { id: "FC2", name: "Veg Hakka Noodles", image: "https://loremflickr.com/400/400/noodles,fresh", price: 120, weight: "1 plate", emoji: "🍜" },
    { id: "FC3", name: "Paneer Butter Masala", image: "https://loremflickr.com/400/400/paneer,fresh", price: 220, weight: "1 bowl", emoji: "🥘" },
    { id: "FC4", name: "Black Forest Cake", image: "https://loremflickr.com/400/400/forest,cake,fresh", price: 400, weight: "500 g", emoji: "🍰" },
    { id: "FC5", name: "Gulab Jamun (2pc)", image: "https://loremflickr.com/400/400/sweet,fresh", price: 40, weight: "1 plate", emoji: "🍡" },
    { id: "FC6", name: "Crispy Samosa", image: "https://loremflickr.com/400/400/samosa,fresh", price: 15, weight: "1 pc", emoji: "🥟" }
  ],
  medicines: [
    { id: "MED1", name: "Paracetamol 500mg", image: "https://loremflickr.com/400/400/pills,fresh", price: 15, weight: "10 tablets", emoji: "💊" },
    { id: "MED2", name: "Vitamin C", image: "https://loremflickr.com/400/400/vitamin,fresh", price: 45, weight: "15 tablets", emoji: "🍊" }
  ],
  household: [
    { id: "HH1", name: "Dishwash Gel", image: "https://loremflickr.com/400/400/soap,fresh", price: 95, weight: "500 ml", emoji: "🧼" },
    { id: "HH2", name: "Liquid Detergent", image: "https://loremflickr.com/400/400/detergent,fresh", price: 180, weight: "1 L", emoji: "🧴" }
  ],
  services: [
    { id: "SERV1", name: "AC Servicing", image: "https://loremflickr.com/400/400/ac,fresh", price: 599, weight: "Per visit", emoji: "❄️" },
    { id: "SERV2", name: "Plumbing Work", image: "https://loremflickr.com/400/400/plumbing,fresh", price: 199, weight: "Visit charge", emoji: "🔧" }
  ]
};

export const rideOptions = [
  {
    id: "bike",
    name: "Bike",
    emoji: "🏍️",
    tagline: "Fastest & Cheapest",
    eta: "2 min",
    basePrice: 20,
    perKm: 8,
    promo: "SAVE20",
    capacity: 1,
  },
  {
    id: "car",
    name: "Car",
    emoji: "🚗",
    tagline: "Comfortable Ride",
    eta: "5 min",
    basePrice: 50,
    perKm: 14,
    promo: null,
    capacity: 4,
  },
];

export const drivers = [
  { id: "D001", name: "Arjun Sharma", rating: 4.9, trips: 1240, vehicle: "Honda Activa", plate: "BR 01 AB 1234", emoji: "🏍️", type: "bike", eta: "2 min" },
  { id: "D002", name: "Rahul Verma", rating: 4.8, trips: 980, vehicle: "Maruti Swift", plate: "BR 02 CD 5678", emoji: "🚗", type: "car", eta: "5 min" },
  { id: "D003", name: "Sonu Kumar", rating: 4.7, trips: 760, vehicle: "TVS Jupiter", plate: "BR 03 EF 9012", emoji: "🏍️", type: "bike", eta: "3 min" },
];

export const rideHistory = [
  { id: "R001", type: "bike", from: "Munger Fort", to: "Jamalpur Market", date: "Today, 9:30 AM", fare: "₹56", status: "completed", driver: "Arjun Sharma", rating: 5 },
  { id: "R002", type: "car", from: "Shastri Nagar", to: "Railway Station", date: "Yesterday, 6:00 PM", fare: "₹120", status: "completed", driver: "Rahul Verma", rating: 4 },
  { id: "R003", type: "bike", from: "Kacheri Road", to: "City Hospital", date: "25 Mar, 11:00 AM", fare: "₹44", status: "cancelled", driver: "-", rating: null },
];

export const notifications = [
  { id: 1, title: "Ride Completed!", body: "Your ride to Jamalpur Market is complete. Fare: ₹56", time: "9:45 AM", read: false, icon: "✅" },
  { id: 2, title: "Special Offer 🎉", body: "Use SAVE20 to get 20% off your next bike ride!", time: "Yesterday", read: false, icon: "🎁" },
  { id: 3, title: "Driver Assigned", body: "Arjun Sharma is on the way. ETA: 2 min", time: "9:28 AM", read: true, icon: "🏍️" },
  { id: 4, title: "Wallet Credited", body: "₹50 cashback added to your RideGo Wallet", time: "25 Mar", read: true, icon: "💰" },
];

export const walletTransactions = [
  { id: "W001", label: "Cashback — Promo SAVE20", amount: "+₹50", date: "25 Mar", type: "credit" },
  { id: "W002", label: "Ride to Railway Station", amount: "-₹120", date: "24 Mar", type: "debit" },
  { id: "W003", label: "Added via UPI", amount: "+₹200", date: "22 Mar", type: "credit" },
];

export const orders = [
  { id: "S678", type: "Food", amount: 680, status: "pending", time: "10 mins ago", rider: "Rajesh Kumar" },
  { id: "S677", type: "Household", amount: 120, status: "pending", time: "25 mins ago", rider: "Priya Singh" },
  { id: "S676", type: "Medicine", amount: 450, status: "delivered", time: "Today, 2:30 PM", rider: "Arjun Sharma" }
];
