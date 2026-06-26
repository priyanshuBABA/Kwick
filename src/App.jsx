import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Kwick Main Layouts/Pages
import LandingPage from './LandingPage';

// Customer Pages
import CustomerHome from './customer/CustomerHome';
import CustomerCart from './customer/CustomerCart';
import CustomerOrders from './customer/CustomerOrders';
import CustomerProfile from './customer/CustomerProfile';
import PickDrop from './customer/PickDrop';
import FreshMandi from './customer/FreshMandi';
import Medicines from './customer/Medicines';
import MishraJiCakes from './customer/MishraJiCakes';
import HouseholdItems from './customer/HouseholdItems';
import HomeServices from './customer/HomeServices';
import OrderTracking from './customer/OrderTracking';
import DoctorService from './customer/DoctorService';
// import StationaryHub from './customer/stationary-app/App';
import ElectricShop from './customer/ElectricShop';
import PandiJiChai from './customer/PandiJiChai';
import StationeryGiftCenter from './customer/StationeryGiftCenter';

// Rider Pages
import RiderHome from './rider/RiderHome';
import RiderOrders from './rider/RiderOrders';
import RiderEarnings from './rider/RiderEarnings';
import RiderProfile from './rider/RiderProfile';

// Vendor Pages
import VendorOrders from './vendor/VendorOrders';
import VendorMenu from './vendor/VendorMenu';
import VendorEarnings from './vendor/VendorEarnings';
import VendorProfile from './vendor/VendorProfile';
import VendorPortal from './vendor/VendorPortal';



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

const App = () => {
  return (
    <Routes>
      {/* Root / Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Customer Portal */}
      <Route path="/customer/home" element={<CustomerHome />} />
      <Route path="/customer/cart" element={<CustomerCart />} />
      <Route path="/customer/orders" element={<CustomerOrders />} />
      <Route path="/customer/profile" element={<CustomerProfile />} />
      <Route path="/customer/pick-drop" element={<PickDrop />} />
      <Route path="/customer/fresh-mandi" element={<FreshMandi />} />
      <Route path="/customer/medicines" element={<Medicines />} />
      <Route path="/customer/mishra-ji-cakes" element={<MishraJiCakes />} />
      <Route path="/customer/food-cakes" element={<MishraJiCakes />} />
      <Route path="/customer/stationary" element={<StationeryGiftCenter />} />
      <Route path="/customer/household-items/*" element={<HouseholdItems />} />
      <Route path="/customer/pandi-ji-chai" element={<PandiJiChai />} />
      <Route path="/customer/electric-shop" element={<ElectricShop />} />
      <Route path="/customer/home-services" element={<HomeServices />} />
      <Route path="/customer/services" element={<CustomerHome />} />
      <Route path="/customer/track/:id" element={<OrderTracking />} />
      <Route path="/customer/doctors" element={<DoctorService />} />
      <Route path="/customer/stationery-gift" element={<StationeryGiftCenter />} />

      {/* Rider Portal */}
      <Route path="/rider/home" element={<RiderHome />} />
      <Route path="/rider/orders" element={<RiderOrders />} />
      <Route path="/rider/earnings" element={<RiderEarnings />} />
      <Route path="/rider/profile" element={<RiderProfile />} />

      {/* Vendor Portal */}
      <Route path="/vendor/portal" element={<VendorPortal />} />
      <Route path="/vendor/orders" element={<VendorOrders />} />
      <Route path="/vendor/menu" element={<VendorMenu />} />
      <Route path="/vendor/earnings" element={<VendorEarnings />} />
      <Route path="/vendor/profile" element={<VendorProfile />} />

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
};

export default App;
