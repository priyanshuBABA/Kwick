import React, { useState } from 'react';
import MobileFrame from '../../components/MobileFrame';
import CustomerTopNav from '../../components/CustomerTopNav';
import BottomNav from '../../components/BottomNav';
import { ChevronRight, MapPin, Phone, Copy, CheckCircle2, Truck, Package, Clock, X } from 'lucide-react';
import { ORDERS } from '../../data/htmlDesignData';

const CustomerOrdersEnhanced = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const filters = [
    { key: 'all', label: 'All Orders', icon: '📦' },
    { key: 'active', label: 'On the Way 🚚', icon: '🚚' },
    { key: 'completed', label: 'Delivered ✅', icon: '✅' },
    { key: 'cancelled', label: 'Cancelled ❌', icon: '❌' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'transit':
        return 'bg-blue-100 text-blue-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  const filteredOrders = ORDERS.filter((order) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return order.status === 'transit';
    if (selectedFilter === 'completed') return order.status === 'delivered';
    if (selectedFilter === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  const copyOrderId = (id) => {
    navigator.clipboard.writeText(id);
    showToast(`📋 Order ID copied: ${id}`);
  };

  const trackOrder = (order) => {
    setExpandedOrder(expandedOrder === order.id ? null : order.id);
  };

  return (
    <MobileFrame>
      <CustomerTopNav />

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg z-50 animate-fade-in-down">
          {toast}
        </div>
      )}

      <div className="pb-24">
        {/* Header */}
        <div className="px-6 pt-6 pb-6">
          <h1 className="text-3xl font-black text-slate-900 mb-2">My Orders</h1>
          <p className="text-sm text-gray-600">Track live deliveries and revisit past orders.</p>
        </div>

        {/* Live Order Alert */}
        {ORDERS.some(o => o.status === 'transit') && (
          <div className="px-6 mb-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-4 flex items-center gap-3">
            <div className="text-2xl animate-pulse">🚚</div>
            <div className="flex-1">
              <p className="font-black text-sm text-slate-900">MediPlus order arriving in 12 mins</p>
              <p className="text-xs text-gray-600 mt-1">Vitamin D, Zinc — 2 items</p>
            </div>
            <button 
              onClick={() => showToast('📍 Opening live map...')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-xs font-black transition-all active:scale-95"
            >
              Track
            </button>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="px-6 mb-6 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all transform hover:scale-105 active:scale-95 ${
                selectedFilter === filter.key
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="px-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-3">📭</p>
              <p className="font-bold text-slate-900 mb-1">No orders yet</p>
              <p className="text-sm text-gray-600 mb-4">Start shopping to see your orders here</p>
              <a 
                href="/customer/home"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2 rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                Browse Now
              </a>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:border-orange-200"
              >
                {/* Order Header */}
                <div 
                  onClick={() => trackOrder(order)}
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex gap-4 items-center justify-between"
                >
                  <div className="flex gap-4 items-start flex-1">
                    <div className="text-3xl">{order.e}</div>
                    <div className="flex-1">
                      <h3 className="font-black text-slate-900">{order.store}</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {order.date} · <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            copyOrderId(order.id_num);
                          }}
                          className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 inline-flex"
                        >
                          {order.id_num} <Copy className="w-3 h-3" />
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                    <ChevronRight 
                      className={`w-5 h-5 text-gray-400 mt-2 transition-transform ${expandedOrder === order.id ? 'rotate-90' : ''}`}
                    />
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="px-4 pb-4 flex gap-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                      {item}
                    </div>
                  ))}
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-700">
                    {order.items.length}+
                  </div>
                </div>

                {/* Total */}
                <div className="px-4 py-3 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                  <span className="font-bold text-slate-900">Order Total</span>
                  <span className="font-black text-lg text-orange-600">₹{order.total}</span>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="px-4 py-4 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 space-y-4">
                    {/* Tracking Steps */}
                    <div>
                      <p className="font-bold text-sm text-slate-900 mb-3">Order Progress</p>
                      <div className="space-y-2">
                        {['Placed', 'Packed', 'On the Way', 'Delivered'].map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              idx < 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                              {idx < 3 ? '✓' : idx + 1}
                            </div>
                            <span className={`text-sm font-bold ${idx < 3 ? 'text-gray-900' : 'text-gray-500'}`}>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Partner (if in transit) */}
                    {order.status === 'transit' && (
                      <div>
                        <p className="font-bold text-sm text-slate-900 mb-3">Delivery Partner</p>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">🧑‍🦱</div>
                            <div>
                              <p className="font-bold text-sm text-slate-900">Sandeep Kumar</p>
                              <p className="text-xs text-gray-600">Bike KA 04 EF 8821</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => showToast('📞 Calling Sandeep...')}
                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-all"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200">
                      <button 
                        onClick={() => showToast('🔄 Reordering items...')}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-2 rounded-lg transition-all text-xs"
                      >
                        🔄 Reorder
                      </button>
                      <button 
                        onClick={() => showToast('📄 Downloading invoice...')}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-2 rounded-lg transition-all text-xs"
                      >
                        📄 Invoice
                      </button>
                      <button 
                        onClick={() => showToast('💬 Opening support chat...')}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold py-2 rounded-lg transition-all text-xs"
                      >
                        💬 Help
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
};

export default CustomerOrdersEnhanced;
