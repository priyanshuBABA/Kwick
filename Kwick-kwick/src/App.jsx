import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MobileFrame from './components/MobileFrame';

// Kwick Main Layouts/Pages
import RoleSelection from './pages/RoleSelection';
import ProtectedRoute from './components/ProtectedRoute';
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import BecomeRider from './pages/BecomeRider';
import BecomeVendor from './pages/BecomeVendor';

// Customer Pages - Enhanced Versions
import CustomerHome from './customer/pages/CustomerHomeEnhanced';
import CustomerCart from './customer/pages/CustomerCartEnhanced';
import CustomerOrders from './customer/pages/CustomerOrdersEnhanced';
import CustomerProfile from './customer/pages/CustomerProfileNew';
import AmbulanceService from './customer/services/AmbulanceService';
import DoctorService from './customer/services/DoctorService';
import PickDrop from './customer/services/PickDrop';
import FreshMandi from './customer/services/FreshMandi';
import Medicines from './customer/services/Medicines';
import MishraJiCakes from './customer/services/MishraJiCakes';
import HouseholdItems from './customer/services/HouseholdItems';
import HomeServices from './customer/services/HomeServices';
import OrderTracking from './customer/pages/OrderTracking';
import KwickLaundry from './customer/services/KwickLaundry';
// import StationaryHub from './customer/stationery-app/App';
import ElectricShop from './customer/services/ElectricShop';
import PandiJiChai from './customer/services/PandiJiChai';
import StationeryGiftCenter from './customer/services/StationeryGiftCenter';
import KwickBookService from './customer/services/KwickBookService';
import ServiceList from './customer/pages/ServiceListEnhanced';
import KwickPrint from './customer/services/KwickPrint';
import KwickOffersPage from './customer/pages/OffersPageComplete';
import KwickWishlistPage from './customer/pages/KwickWishlistEnhanced';
import KwickWalletPage from './customer/pages/WalletPageComplete';
import ProfileOptionPage from './customer/pages/ProfileOptionPage';
import KwickNotificationsPage from './customer/pages/KwickNotificationsPage';
import PaymentPage from './customer/pages/PaymentPage';
import ProductDetailPage from './customer/pages/ProductDetailPage';

// Rider and Vendor pages have been removed — landing page will show role options only



// RideGo (Ride Booking) Pages
import RideSplashScreen from './pages/SplashScreen';
import RideOnboarding from './pages/Onboarding';
import RideLogin from './pages/Login';
import RideOtpVerify from './pages/OtpVerify';
import RideHome from './pages/Home';
import RideBook from './pages/BookRide';
import RideChoose from './pages/ChooseRide';
import RideFinding from './pages/FindingDriver';
import RideLive from './pages/RideLive';
import RideComplete from './pages/RideComplete';
import RideHistory from './pages/RideHistory';
import RideProfile from './pages/Profile';
import RideWallet from './pages/Wallet';
import RideNotifications from './pages/Notifications';

// Rider portal
import KwickRiderPage from './pages/KwickRiderPage';
// Vendor portal (integrated)
import KwickPartnerApp from './vendor/KwickPartnerApp.jsx';
// Admin Dashboard
import AdminDashboard from './admin/AdminDashboard';

const App = () => {
  const { pathname } = useLocation();
  const requiredRole = pathname.startsWith('/customer')
    ? 'customer'
    : pathname.startsWith('/rider')
      ? 'rider'
      : pathname.startsWith('/admin')
        ? 'admin'
        : pathname.startsWith('/vendor') || pathname.startsWith('/service-provider')
          ? 'vendor'
          : null;

  const routes = (
    <Routes>
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/register" element={<AuthRegister />} />

      {/* First screen: continue an authenticated session or redirect to login. */}
      <Route path="/" element={<RoleSelection />} />
      <Route path="/role-selection" element={<ProtectedRoute><RoleSelection /></ProtectedRoute>} />
      <Route path="/select-role" element={<ProtectedRoute><RoleSelection /></ProtectedRoute>} />

      {/* Protected role-based routes */}
      <Route element={<ProtectedRoute />}> 
        <Route path="/customer/dashboard" element={<ProtectedRoute role="customer"><CustomerHome /></ProtectedRoute>} />
        <Route path="/rider/dashboard" element={<ProtectedRoute role="rider"><KwickRiderPage /></ProtectedRoute>} />
      </Route>

      <Route path="/vendor/dashboard" element={<ProtectedRoute role="vendor"><KwickPartnerApp /></ProtectedRoute>} />

      {/* Customer Portal */}
      <Route path="/customer/home" element={<CustomerHome />} />
      <Route path="/customer/cart" element={<CustomerCart />} />
      <Route path="/customer/payment" element={<PaymentPage />} />
      <Route path="/customer/products/:id" element={<ProductDetailPage />} />
      <Route path="/customer/orders" element={<CustomerOrders />} />
      <Route path="/customer/profile" element={<CustomerProfile />} />
      <Route path="/customer/profile/become-rider" element={<ProtectedRoute role="customer"><BecomeRider /></ProtectedRoute>} />
      <Route path="/customer/profile/become-vendor" element={<ProtectedRoute role="customer"><BecomeVendor /></ProtectedRoute>} />
      <Route path="/customer/offers" element={<MobileFrame><KwickOffersPage /></MobileFrame>} />
      <Route path="/customer/wishlist" element={<KwickWishlistPage />} />
      <Route path="/customer/wallet" element={<MobileFrame><KwickWalletPage /></MobileFrame>} />
      <Route path="/customer/rewards" element={<MobileFrame><KwickWalletPage /></MobileFrame>} />
      <Route path="/customer/profile/addresses" element={<ProfileOptionPage />} />
      <Route path="/customer/profile/payments" element={<ProfileOptionPage />} />
      <Route path="/customer/profile/kwick-pro" element={<ProfileOptionPage />} />
      <Route path="/customer/profile/preferences" element={<ProfileOptionPage />} />
      <Route path="/customer/profile/security" element={<ProfileOptionPage />} />
      <Route path="/customer/profile/support" element={<ProfileOptionPage />} />
      <Route path="/customer/profile/logout" element={<ProfileOptionPage />} />
      <Route path="/customer/profile/subscriptions" element={<ProfileOptionPage />} />
      <Route path="/customer/profile/help" element={<ProfileOptionPage />} />
      <Route path="/customer/notifications" element={<MobileFrame><KwickNotificationsPage /></MobileFrame>} />
      <Route path="/customer/pick-drop" element={<PickDrop />} />
      <Route path="/customer/fresh-mandi" element={<FreshMandi />} />
      <Route path="/customer/doctor" element={<DoctorService />} />
      <Route path="/customer/services" element={<ServiceList />} />
      <Route path="/customer/medicines" element={<Medicines />} />
      <Route path="/customer/mishra-ji-cakes" element={<MishraJiCakes />} />
      <Route path="/customer/food-cakes" element={<MishraJiCakes />} />
      <Route path="/customer/stationary" element={<StationeryGiftCenter />} />
      <Route path="/customer/household-items/*" element={<HouseholdItems />} />
      <Route path="/customer/pandi-ji-chai" element={<PandiJiChai />} />
      <Route path="/customer/electric-shop" element={<ElectricShop />} />
      <Route path="/customer/home-services" element={<HomeServices />} />
      <Route path="/customer/ambulance" element={<AmbulanceService />} />
      <Route path="/customer/laundry" element={<KwickLaundry />} />
      <Route path="/customer/kwickbook" element={<KwickBookService />} />
      <Route path="/customer/kwick-books" element={<KwickBookService />} />
      <Route path="/customer/kwick-print" element={<KwickPrint />} />
      <Route path="/customer/track/:id" element={<OrderTracking />} />
      <Route path="/customer/stationery-gift" element={<StationeryGiftCenter />} />

      {/* Rider portal */}
      <Route path="/rider" element={<ProtectedRoute role="rider"><KwickRiderPage /></ProtectedRoute>} />

      {/* Vendor portal (integrated from vendor subproject) */}
      <Route path="/service-provider" element={<ProtectedRoute role="vendor"><KwickPartnerApp /></ProtectedRoute>} />
      <Route path="/vendor" element={<ProtectedRoute role="vendor"><KwickPartnerApp /></ProtectedRoute>} />

      {/* Super Admin Portal */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

      {/* RideGo App (Merged Sub-Project) */}
      <Route path="/ride-booking">
        <Route index element={<RideSplashScreen />} />
        <Route path="onboarding" element={<RideOnboarding />} />
        <Route path="login" element={<RideLogin />} />
        <Route path="otp" element={<RideOtpVerify />} />
        <Route path="home" element={<RideHome />} />
        <Route path="book" element={<RideBook />} />
        <Route path="choose" element={<RideChoose />} />
        <Route path="finding" element={<RideFinding />} />
        <Route path="live" element={<RideLive />} />
        <Route path="complete" element={<RideComplete />} />
        <Route path="history" element={<RideHistory />} />
        <Route path="profile" element={<RideProfile />} />
        <Route path="wallet" element={<RideWallet />} />
        <Route path="notifications" element={<RideNotifications />} />
      </Route>

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return requiredRole ? <ProtectedRoute role={requiredRole}>{routes}</ProtectedRoute> : routes;
};

export default App;
