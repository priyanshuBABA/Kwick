import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import CustomerTopNav from '../../components/CustomerTopNav';
import BottomNav from '../../components/BottomNav';
import { Home, ShoppingBag, Grid, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { useAuth } from '../../context/AuthContext';
import './CustomerHome.css';

const ServiceCard = ({ title, icon, onClick }) => (
  <button className="kwick-category" onClick={onClick}>
    <span className="kwick-category-icon">{icon}</span>
    <span>{title}</span>
  </button>
);

const OrderRow = ({ icon, name, subtitle, price, status }) => (
  <div className="kwick-order">
    <span className="kwick-order-icon">{icon}</span>
    <div className="kwick-order-info"><strong>{name}</strong><small>{subtitle}</small></div>
    <div className="kwick-order-price">{price}<small>{status}</small></div>
  </div>
);

const CustomerHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userLocation, setUserLocation } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletBalance] = useState(1240);
  const [rewardPoints] = useState(2480);

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  const services = [
    { title: 'Grocery', icon: '🛒', path: '/customer/fresh-mandi' },
    { title: 'Medicines', icon: '💊', path: '/customer/medicines' },
    { title: 'Fresh Mandi', icon: '🥬', path: '/customer/fresh-mandi' },
    { title: 'Fruits', icon: '🍎', path: '/customer/fresh-mandi' },
    { title: 'Vegetables', icon: '🥕', path: '/customer/fresh-mandi' },
    { title: 'Cakes', icon: '🎂', path: '/customer/mishra-ji-cakes' },
    { title: 'Stationery', icon: '📋', path: '/customer/stationery-gift' },
    { title: 'Laundry', icon: '👔', path: '/customer/laundry' },
    { title: 'Electric', icon: '⚡', path: '/customer/electric-shop' },
    { title: 'Home Services', icon: '🔧', path: '/customer/home-services' },
    { title: 'Doctor', icon: '⚕️', path: '/customer/doctor' },
    { title: 'Ambulance', icon: '🚑', path: '/customer/ambulance' },
    { title: 'Taxi', icon: '🚖', path: '/ride-booking' },
    { title: 'Pick & Drop', icon: '📦', path: '/customer/pick-drop' },
    { title: 'Flowers', icon: '🌹', path: '/customer/stationery-gift' },
    { title: 'Gifts', icon: '🎁', path: '/customer/stationery-gift' },
    { title: 'Household', icon: '🛍️', path: '/customer/household-items' },
    { title: 'KwickBook', icon: '📚', path: '/customer/kwickbook' },
    { title: 'Kwick Print', icon: '🖨️', path: '/customer/kwick-print' },
    { title: 'Chai', icon: '☕', path: '/customer/pandi-ji-chai' },
  ];

  const recentOrders = [
    { name: 'Fresh Basket', subtitle: 'Milk, Eggs, Bread', price: '₹187', status: 'Delivered' },
    { name: 'MediPlus', subtitle: 'Vitamin D, Zinc', price: '₹349', status: 'In Transit' }
  ];

  React.useEffect(() => {
    if (!navigator.geolocation) return;
    const onSuccess = async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        setUserLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            if (data.display_name) setUserLocation(data.display_name);
          }
        } catch (err) {
          console.warn('Reverse geocode failed', err);
        }
      } catch (err) {
        console.error('Failed to set location', err);
      }
    };
    const onError = (err) => console.warn('Geolocation error', err);
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 10000 });
  }, []);

  return (
    <div className="kwick-home">
      <CustomerTopNav onMenuClick={() => setSidebarOpen(true)} />
      <main className="kwick-main">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="kwick-content">
          <div className="kwick-content-inner">
            <div className="kwick-greeting">
              <p>Good morning 👋</p>
              <h1>Welcome back, <span>{user?.name?.split(' ')[0] || 'Rahul'}</span></h1>
              <p>What do you want to get delivered today?</p>
            </div>
            <div className="kwick-dashboard">
              <div>
                <section className="kwick-promo">
                  <div className="promo-content"><span className="promo-pill">NEW USER</span><h2>50% OFF on Your<br />First Order</h2><p>Use code KWICK50 at checkout - limited time offer for new users.</p><button onClick={() => navigate('/customer/fresh-mandi')}>Shop Now →</button></div>
                  <div className="promo-dots"><i /><i /><i /></div>
                </section>
                <div className="kwick-section-heading"><h2>Browse Categories</h2><button onClick={() => navigate('/customer/services')}>View All →</button></div>
                <div className="kwick-category-grid">
                  {services.map((service) => <ServiceCard key={service.title} title={service.title} icon={service.icon} onClick={() => navigate(service.path)} />)}
                </div>
              </div>
              <aside className="kwick-rail">
                <div onClick={() => navigate('/customer/wallet')} className="kwick-wallet-card cursor-pointer" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/customer/wallet'); }}>
                  <p>Kwick Wallet</p>
                  <h3>₹{walletBalance.toLocaleString('en-IN')}</h3>
                  <p>Available balance</p>
                  <div className="kwick-wallet-actions"><button type="button" onClick={(e) => e.stopPropagation()}>Add Money</button><button type="button" onClick={(e) => e.stopPropagation()}>Transfer</button></div>
                </div>
                <section className="kwick-rail-card"><div className="rail-title"><h3>Recent Orders</h3><button onClick={() => navigate('/customer/orders')}>All</button></div><OrderRow icon="🛒" {...recentOrders[0]} /><OrderRow icon="💊" {...recentOrders[1]} /></section>
                <div onClick={() => navigate('/customer/rewards')} className="kwick-rail-card kwick-rewards cursor-pointer" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/customer/rewards'); }}>
                  <div className="rail-title"><h3>Reward Points</h3><span>🏅</span></div>
                  <div className="reward-value">{rewardPoints.toLocaleString('en-IN')} <small>pts</small></div>
                  <div className="kwick-progress"><span /></div>
                  <p>520 pts away from Gold tier</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <BottomNav items={navItems} highlightColor="#FF9500" />
    </div>
  );
};

export default CustomerHome;
