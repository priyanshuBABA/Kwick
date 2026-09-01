import React, { useState } from 'react';
import MobileFrame from '../../components/MobileFrame';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import BottomNav from '../../components/BottomNav';
import { orders } from '../../data/mockData';
import { Home, ShoppingBag, Grid, User, Clock, ChevronRight, Truck, CheckCircle2, X, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerOrders = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  const filterOptions = [
    { key: 'all', label: 'All Orders', icon: ShoppingBag },
    { key: 'active', label: 'Active', icon: Truck },
    { key: 'completed', label: 'Completed', icon: CheckCircle2 },
    { key: 'cancelled', label: 'Cancelled', icon: X }
  ];

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders.filter(o => {
        if (selectedFilter === 'active') return ['Pending', 'Confirmed', 'In Transit'].includes(o.status);
        if (selectedFilter === 'completed') return o.status === 'Delivered';
        if (selectedFilter === 'cancelled') return o.status === 'Cancelled';
        return true;
      });

  return (
    <MobileFrame>
      <TopBar title="My Orders" bgColor="bg-slate-50" />
      <div className="p-4 bg-slate-50 min-h-screen pb-24">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {filterOptions.map(filter => {
            const FilterIcon = filter.icon;
            return (
              <button 
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`shrink-0 px-4 py-2 rounded-full font-medium text-xs transition-all ${
                  selectedFilter === filter.key 
                    ? 'bg-primary text-navy shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FilterIcon className="w-3.5 h-3.5" />
                  {filter.label}
                </span>
              </button>
            );
          })}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <Package className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-600">No orders found</h3>
            <p className="text-sm text-slate-400 mt-1">Start shopping to see your orders here</p>
            <button 
              onClick={() => navigate('/customer/home')}
              className="mt-4 px-6 py-2 bg-primary text-navy font-bold rounded-full hover:bg-yellow-400 transition-colors"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order, idx) => (
              <div key={idx} onClick={() => navigate('/customer/order-tracking')} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-slate-200 transition-all group active:scale-[0.99]">
                 {/* decorative accent */}
                 <div className={`absolute top-0 right-0 w-2 h-full ${
                   order.status === 'Delivered' ? 'bg-green-500/20' :
                   order.status === 'Cancelled' ? 'bg-red-500/20' :
                   order.status === 'In Transit' ? 'bg-blue-500/20' :
                   'bg-primary/20'
                 }`}></div>

                 <div className="flex justify-between items-start mb-3">
                   <div>
                      <h3 className="font-bold text-navy text-sm uppercase tracking-wider">#{order.id} <span className="text-slate-400 mx-1">•</span> {order.type}</h3>
                      <div className="flex items-center text-xs text-slate-400 mt-1 gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{order.time}</span>
                      </div>
                   </div>
                   <StatusBadge status={order.status} />
                 </div>
                 
                 <div className="mt-4 flex justify-between items-end border-t border-slate-100 pt-3">
                   <div>
                     <p className="text-sm font-semibold text-navy">₹{order.amount}</p>
                     {order.rider && <p className="text-xs text-slate-500 mt-0.5">Rider: {order.rider}</p>}
                   </div>
                   <div className="flex items-center text-primary text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                     Track <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </MobileFrame>
  );
};
      </div>
      <BottomNav items={navItems} highlightColor="#FFC107" />
    </MobileFrame>
  );
};

export default CustomerOrders;
