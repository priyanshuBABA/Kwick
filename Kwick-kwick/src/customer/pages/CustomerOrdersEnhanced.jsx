import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../../components/MobileFrame';
import BottomNav from '../../components/BottomNav';
import { ChevronRight, Copy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getMyOrders } from '../../services/orderApi';

const CustomerOrdersEnhanced = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, loading: authLoading } = useAuth();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const loadOrders = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError('');
    try {
      setOrders(await getMyOrders(token));
    } catch (requestError) {
      setOrders([]);
      setError(requestError.message || 'Unable to load your orders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      setOrders([]);
      setError('Please sign in to view your orders.');
      setIsLoading(false);
      return;
    }
    loadOrders();
  }, [authLoading, loadOrders, token]);

  const filters = [
    { key: 'all', label: 'All Orders', icon: '📦' },
    { key: 'active', label: 'On the Way 🚚', icon: '🚚' },
    { key: 'completed', label: 'Delivered ✅', icon: '✅' },
    { key: 'cancelled', label: 'Cancelled ❌', icon: '❌' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed':
      case 'confirmed':
      case 'preparing':
      case 'ready':
      case 'picked_up':
      case 'out_for_delivery':
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
      case 'placed':
        return 'Placed';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'picked_up':
        return 'Picked Up';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return ['placed', 'confirmed', 'preparing', 'ready', 'picked_up', 'out_for_delivery'].includes(order.status);
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

  const activeOrders = orders.filter((order) => ['placed', 'confirmed', 'preparing', 'ready', 'picked_up', 'out_for_delivery'].includes(order.status));

  return (
    <MobileFrame>

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
        {activeOrders.length > 0 && (
          <div className="px-6 mb-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-4 flex items-center gap-3">
            <div className="text-2xl animate-pulse">🚚</div>
            <div className="flex-1">
              <p className="font-black text-sm text-slate-900">Your order is {getStatusLabel(activeOrders[0].status).toLowerCase()}</p>
              <p className="text-xs text-gray-600 mt-1">{activeOrders[0].items.length} item{activeOrders[0].items.length === 1 ? '' : 's'} · {activeOrders[0].date}</p>
            </div>
            <button 
              onClick={() => navigate(`/customer/track/${activeOrders[0].id}`)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-xs font-black transition-all active:scale-95"
            >
              View
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
          {isLoading ? (
            <div className="text-center py-12">
              <p className="font-bold text-slate-900">Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p role="alert" className="font-bold text-red-700">{error}</p>
              {token && <button onClick={loadOrders} className="mt-4 rounded-lg bg-orange-600 px-6 py-2 font-bold text-white">Try again</button>}
            </div>
          ) : filteredOrders.length === 0 ? (
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
                    <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                      {order.e || (order.items[0]?.image ? <img src={order.items[0].image} alt="" className="h-full w-full object-cover" /> : '📦')}
                    </div>
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
                  {order.items.map((item) => (
                    <div key={item.productId} className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center text-lg">
                      {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : '📦'}
                    </div>
                  ))}
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-700">
                    {order.items.length}+
                  </div>
                </div>

                {/* Total */}
                <div className="px-4 py-3 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                  <span className="font-bold text-slate-900">Order Total</span>
                  <span className="font-black text-lg text-orange-600">₹{Number(order.total || 0).toLocaleString('en-IN')}</span>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="px-4 py-4 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 space-y-4">
                    {/* Order details use the stored order snapshot; tracking remains outside Step 6. */}
                    <div>
                      <p className="font-bold text-sm text-slate-900 mb-3">Order details</p>
                      <div className="space-y-2 text-sm text-gray-700">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex justify-between gap-3">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-bold">₹{Number(item.lineTotal || 0).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-200 pt-2 flex justify-between"><span>Subtotal</span><span>₹{Number(order.subtotal || 0).toLocaleString('en-IN')}</span></div>
                        <div className="flex justify-between"><span>Payment</span><span>{order.paymentStatus || 'pending'}</span></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200">
                      <button 
                        onClick={() => navigate(`/customer/track/${order.id}`)}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-2 rounded-lg transition-all text-xs"
                      >
                        Track
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
