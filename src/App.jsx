import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Kwick Main Layouts/Pages
import LandingPage from './LandingPage';

// Customer Pages
import CustomerHome from './customer/CustomerHome';
import CustomerCart from './customer/CustomerCart';
import CustomerOrders from './customer/CustomerOrders';
import CustomerProfile from './customer/CustomerProfile';
import AmbulanceService from './customer/AmbulanceService';
import DoctorService from './customer/DoctorService';
import PickDrop from './customer/PickDrop';
import FreshMandi from './customer/FreshMandi';
import Medicines from './customer/Medicines';
import MishraJiCakes from './customer/MishraJiCakes';
import HouseholdItems from './customer/HouseholdItems';
import HomeServices from './customer/HomeServices';
import OrderTracking from './customer/OrderTracking';
import KwickLaundry from './customer/KwickLaundry';
// import StationaryHub from './customer/stationary-app/App';
import ElectricShop from './customer/ElectricShop';
import PandiJiChai from './customer/PandiJiChai';
import StationeryGiftCenter from './customer/StationeryGiftCenter';
import KwickBooks from './customer/KwickBooks';

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
      <Route path="/customer/doctor" element={<DoctorService />} />
      <Route path="/customer/services" element={<DoctorService />} />
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
      <Route path="/customer/kwick-books" element={<KwickBooks />} />
      <Route path="/customer/track/:id" element={<OrderTracking />} />
      <Route path="/customer/stationery-gift" element={<StationeryGiftCenter />} />

      {/* Rider and Vendor portals removed — landing page shows role selection only */}

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
