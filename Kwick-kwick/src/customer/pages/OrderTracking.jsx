import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import MobileFrame from '../../components/MobileFrame';
import TopBar from '../../components/TopBar';
import { useAuth } from '../../context/AuthContext';
import { getOrderById } from '../../services/orderApi';
import { AlertCircle, Bike, MapPin, Phone, RefreshCw } from 'lucide-react';

const TRACKING_STEPS = [
  { key: 'placed', label: 'Order placed' },
  { key: 'rider_assigned', label: 'Rider assigned' },
  { key: 'picked_up', label: 'Picked up' },
  { key: 'out_for_delivery', label: 'Out for delivery' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
];

function getStatusIndex(status) {
  const index = TRACKING_STEPS.findIndex((step) => step.key === status);
  return index >= 0 ? index : 0;
}

function formatShortId(value) {
  if (!value) return 'Unavailable';
  return value.length > 12 ? `${value.slice(0, 8)}...` : value;
}

function formatDateTime(value) {
  if (!value) return 'Update unavailable';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Update unavailable';
  return date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

const OrderTracking = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!id) {
      setOrder(null);
      setError('Missing order ID in the tracking URL.');
      setLoading(false);
      return;
    }

    if (!token) {
      setOrder(null);
      setError('Please sign in to view this order.');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const loadOrder = async (showLoading = false) => {
      if (showLoading) setLoading(true);
      setError('');

      try {
        const nextOrder = await getOrderById(id, token);
        if (!isMounted) return;
        setOrder(nextOrder);
      } catch (requestError) {
        if (!isMounted) return;
        setOrder(null);
        setError(requestError.message || 'Unable to load this order right now.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOrder(true);
    const activeStatuses = ['placed', 'rider_assigned', 'picked_up', 'out_for_delivery', 'confirmed', 'preparing', 'ready'];
    const interval = setInterval(() => {
      if (activeStatuses.includes(order?.status)) loadOrder(false);
    }, 7000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [id, token, retryKey, order?.status]);

  const currentStatusIndex = useMemo(() => getStatusIndex(order?.status), [order?.status]);

  const statusSummary = useMemo(() => {
    switch (order?.status) {
      case 'placed':
        return 'Order placed. Waiting for a rider.';
      case 'rider_assigned':
        return 'Your rider has accepted the order.';
      case 'confirmed':
        return 'Your order has been confirmed.';
      case 'preparing':
        return 'Kitchen or store is preparing your items.';
      case 'ready':
        return 'Your order is ready for rider pickup.';
      case 'picked_up':
        return 'The rider has picked up your order.';
      case 'out_for_delivery':
        return 'Your order is on the way.';
      case 'delivered':
        return 'Delivered successfully.';
      case 'cancelled':
        return 'This order was cancelled.';
      default:
        return 'Order status is being updated.';
    }
  }, [order?.status]);

  const deliveryLocation = order?.shippingAddress
    ? [order.shippingAddress.city, order.shippingAddress.state].filter(Boolean).join(', ') || order.shippingAddress.addressLine1 || 'Delivery address available'
    : 'Delivery address unavailable';

  return (
    <MobileFrame>
      <TopBar title="Order Tracking" />

      {loading ? (
        <div className="px-4 pb-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <RefreshCw className="mx-auto h-6 w-6 animate-spin text-orange-500" />
            <p className="mt-3 text-sm font-semibold text-slate-700">Loading order details...</p>
          </div>
        </div>
      ) : error ? (
        <div className="px-4 pb-12">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
            <AlertCircle className="mx-auto h-6 w-6 text-red-600" />
            <p className="mt-3 text-sm font-bold text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => setRetryKey((prev) => prev + 1)}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white"
            >
              Retry
            </button>
          </div>
        </div>
      ) : order ? (
        <>
          <div className="relative mx-4 mt-2 h-48 overflow-hidden rounded-2xl border-2 border-slate-300 bg-slate-200">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.9)_0%,_rgba(148,163,184,0.18)_45%,_rgba(15,23,42,0.14)_100%)]" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
              <div className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur-sm">
                {order.status ? order.status.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) : 'Tracking'}
              </div>
              <div className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur-sm">
                ETA unavailable
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-slate-600">
              <span className="text-3xl">🗺️</span>
              <span className="text-sm font-bold">
                {order.assignedRiderId ? 'Live location unavailable' : 'Rider assignment pending'}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/80 px-3 py-2 text-xs text-slate-700 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 font-semibold">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>{deliveryLocation}</span>
              </div>
            </div>
          </div>

          <div className="px-4 pb-12 pt-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl shadow-inner">
                    <Bike className="h-5 w-5 text-orange-700" />
                  </div>
                  {order.assignedRiderId && (
                    <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {order.assignedRiderId ? 'Rider assigned' : 'Awaiting rider'}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {order.assignedRiderId ? `Rider ID: ${formatShortId(order.assignedRiderId)}` : 'Rider information will appear once assigned.'}
                  </p>
                </div>
              </div>

              {order.assignedRiderId && (
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 shadow-sm"
                  aria-label="Call rider"
                >
                  <Phone className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 rounded-full bg-slate-200" />
                <div
                  className="absolute left-4 top-4 w-0.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                  style={{ height: `${((currentStatusIndex + 1) / TRACKING_STEPS.length) * 100}%` }}
                />

                <div className="space-y-6">
                  {TRACKING_STEPS.map((step, index) => {
                    const isDone = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                      <div key={step.key} className="flex items-start gap-4">
                        <div
                          className={`z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                            isDone ? 'bg-green-500 text-white' : 'border-2 border-slate-200 bg-slate-100 text-slate-400'
                          } ${isCurrent ? 'animate-pulse' : ''}`}
                        >
                          {isDone ? '✓' : index + 1}
                        </div>

                        <div className="pt-1">
                          <h4 className={`text-sm font-bold ${isDone || isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.label}
                          </h4>
                          <p className="text-xs text-slate-400">{isDone ? 'Completed' : isCurrent ? statusSummary : 'Pending'}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Order summary</h3>
                <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">
                  {order.status ? order.status.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) : 'Processing'}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <span>Order ID</span>
                  <span className="font-semibold text-slate-800">{order._id}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Placed</span>
                  <span className="font-semibold text-slate-800">{formatDateTime(order.createdAt)}</span>
                </div>
                {order.updatedAt && (
                  <div className="flex items-center justify-between gap-3">
                    <span>Last updated</span>
                    <span className="font-semibold text-slate-800">{formatDateTime(order.updatedAt)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3">
                  <span>Items</span>
                  <span className="font-semibold text-slate-800">{(order.items || []).length}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Total</span>
                  <span className="font-semibold text-slate-800">₹{Number(order.total || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </MobileFrame>
  );
};

export default OrderTracking;
