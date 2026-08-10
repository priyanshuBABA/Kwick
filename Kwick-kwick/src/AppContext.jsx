import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [rideRequests, setRideRequests] = useState([]); // Specifically for Bike/Auto rides
  const [orderRequests, setOrderRequests] = useState([]); // Delivery orders for Riders
  const [vendorOrders, setVendorOrders] = useState([]); // Orders specifically for Vendors (Mandi, Cakes, etc.)

  const [riderAcceptedTask, setRiderAcceptedTask] = useState(null);
  const [vendorAcceptedTask, setVendorAcceptedTask] = useState(null);
  const [userLocation, setUserLocation] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);

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
    const service = order.service || order.items?.[0]?.service || order.storeName || 'General';
    const newOrder = {
      id: `ORD${Math.floor(Math.random() * 9000) + 1000}`,
      type: 'delivery',
      customer: 'Aryan Kumar',
      pickup: order.storeName || 'Local Shop',
      drop: order.drop || 'Gandhi Nagar, Munger',
      items: order.items || [],
      total: order.total || 0,
      timestamp: new Date().toLocaleTimeString(),
      status: 'pending',
      isAcceptedByVendor: false,
      isAcceptedByRider: false,
      paymentMethod: order.paymentMethod || 'Cash on Delivery'
      ,service
    };

    setVendorOrders(prev => [...prev, newOrder]);
    setOrderRequests(prev => [...prev, newOrder]);

    return newOrder;
  };

  const rejectAsVendor = (orderId) => {
    setVendorOrders(prev => prev.filter(order => order.id !== orderId));
  };

  // Vendor Action
  const acceptAsVendor = (orderId) => {
    let accepted = null;

    setVendorOrders(prev => {
      const next = prev.map(o => {
        if (o.id !== orderId) return o;
        accepted = { ...o, isAcceptedByVendor: true, status: 'Preparing' };
        return accepted;
      });
      return next;
    });

    if (accepted) {
      setVendorAcceptedTask(accepted);
    }
  };

  // Rider Action
  const acceptAsRider = (task) => {
    const acceptedTask = task && { ...task, status: 'accepted' };
    setRiderAcceptedTask(acceptedTask);

    if (acceptedTask?.type === 'ride') {
      setRideRequests(prev => prev.filter(r => r.id !== acceptedTask.id));
    } else {
      setOrderRequests(prev => prev.filter(o => o.id !== acceptedTask.id));
    }
  };

  const rejectTask = (id, type) => {
    if (type === 'ride') {
      setRideRequests(prev => prev.filter(r => r.id !== id));
    } else if (type === 'delivery') {
      setOrderRequests(prev => prev.filter(o => o.id !== id));
    }
  };

  return (
    <AppContext.Provider value={{ 
      rideRequests, 
      orderRequests, 
      vendorOrders,
      placeOrder,
      addRideRequest,
      acceptAsVendor,
      rejectAsVendor,
      acceptAsRider,
      rejectTask,
      riderAcceptedTask,
      vendorAcceptedTask,
      userLocation,
      setUserLocation,
      isLocationOpen,
      setIsLocationOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};
