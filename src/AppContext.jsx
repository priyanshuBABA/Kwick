import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [rideRequests, setRideRequests] = useState([]); // Specifically for Bike/Auto rides
  const [orderRequests, setOrderRequests] = useState([]); // Delivery orders for Riders
  const [vendorOrders, setVendorOrders] = useState([]); // Orders specifically for Vendors (Mandi, Cakes, etc.)
  
  const [riderAcceptedTask, setRiderAcceptedTask] = useState(null);
  const [vendorAcceptedTask, setVendorAcceptedTask] = useState(null);
  const [userLocation, setUserLocation] = useState('Munger Fort'); // Default location

  // Add a new ride request (from Ride Booking side)
  const addRideRequest = (ride) => {
    const newRide = {
      id: `RD${Math.floor(Math.random() * 9000) + 1000}`,
      type: 'ride',
      subType: ride.type || 'bike',
      customer: 'Priya Singh',
      pickup: 'Munger Fort', 
      drop: ride.destination || 'Jamalpur Station',
      fare: ride.type === 'bike' ? 40 : 120,
      timestamp: new Date().toLocaleTimeString(),
      status: 'pending'
    };
    setRideRequests(prev => [...prev, newRide]);
    return newRide;
  };

  // Add a new delivery order request (from Customer Cart)
  // This goes to BOTH Vendor and Rider (Customer -> Platform)
  const placeOrder = (order) => {
    const newOrder = {
      id: `ORD${Math.floor(Math.random() * 9000) + 1000}`,
      type: 'delivery',
      customer: 'Aryan Kumar',
      pickup: order.storeName || 'Local Shop',
      drop: 'Gandhi Nagar, Munger',
      items: order.items || [],
      total: order.total || 0,
      timestamp: new Date().toLocaleTimeString(),
      status: 'pending',
      isAcceptedByVendor: false,
      isAcceptedByRider: false
    };
    
    // Send to Vendor Portal
    setVendorOrders(prev => [...prev, newOrder]);
    
    // Send to Rider Portal (Delivery Task)
    setOrderRequests(prev => [...prev, newOrder]);
    
    return newOrder;
  };

  // Vendor Action
  const acceptAsVendor = (orderId) => {
    setVendorOrders(prev => prev.map(o => o.id === orderId ? { ...o, isAcceptedByVendor: true, status: 'Preparing' } : o));
    const accepted = vendorOrders.find(o => o.id === orderId);
    setVendorAcceptedTask(accepted);
  };

  // Rider Action
  const acceptAsRider = (task) => {
    setRiderAcceptedTask(task);
    // Remove from pending lists once accepted by this rider
    if (task.type === 'ride') {
        setRideRequests(prev => prev.filter(r => r.id !== task.id));
    } else {
        setOrderRequests(prev => prev.filter(o => o.id !== task.id));
    }
  };

  const rejectTask = (id, type) => {
    if (type === 'ride') setRideRequests(prev => prev.filter(r => r.id !== id));
    else if (type === 'delivery') setOrderRequests(prev => prev.filter(o => o.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      rideRequests, 
      orderRequests, 
      vendorOrders,
      placeOrder,
      addRideRequest,
      acceptAsVendor,
      acceptAsRider,
      rejectTask,
      riderAcceptedTask,
      vendorAcceptedTask,
      userLocation,
      setUserLocation
    }}>
      {children}
    </AppContext.Provider>
  );
};
