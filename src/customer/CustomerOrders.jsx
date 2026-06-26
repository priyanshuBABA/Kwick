import React from 'react';
import MobileFrame from '../components/MobileFrame';
import TopBar from '../components/TopBar';
import StatusBadge from '../components/StatusBadge';
import BottomNav from '../components/BottomNav';
import { orders } from '../data/mockData';
import { Home, ShoppingBag, Grid, User, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerOrders = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/customer/home' },
    { icon: ShoppingBag, label: 'Orders', path: '/customer/orders' },
    { icon: Grid, label: 'Services', path: '/customer/services' },
    { icon: User, label: 'Profile', path: '/customer/profile' }
  ];

  return (
    <MobileFrame>
      <TopBar title="My Orders" bgColor="bg-slate-50" />
      <div className="p-4 bg-slate-50 min-h-screen pb-24">
        {orders.map((order, idx) => (
          <div key={idx} onClick={() => navigate('/customer/order-tracking')} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden active:scale-[0.99]">
             {/* decorative tag */}
             <div className="absolute top-0 right-0 w-2 h-full bg-primary/20"></div>

             <div className="flex justify-between items-start mb-2">
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
               <div className="flex items-center text-primary text-xs font-bold gap-1 group">
                 Track <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </div>
             </div>
          </div>
        ))}
      </div>
      <BottomNav items={navItems} highlightColor="#FFC107" />
    </MobileFrame>
  );
};

export default CustomerOrders;
