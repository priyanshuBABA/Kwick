import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomerTopNav from './CustomerTopNav';

const MobileFrame = ({ children }) => {
  const location = useLocation();
  const isCustomer = location.pathname.startsWith('/customer');

  const containerStyle = isCustomer
    ? { width: '100%', maxWidth: '100%', minHeight: '100dvh', background: '#f5f5f5', position: 'relative', overflow: 'visible' }
    : { width: '100%', maxWidth: '1200px', minHeight: '100dvh', background: '#f5f5f5', position: 'relative', overflow: 'visible', boxShadow: 'inset 0 0 0 1px rgba(15, 23, 42, 0.04)' };

  return (
    <div style={{ minHeight: '100dvh', width: '100%', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
      <div style={containerStyle}>
        {isCustomer && <CustomerTopNav />}
        <div style={{ width: '100%', minHeight: '100%', overflowX: 'hidden', overflowY: 'auto', paddingBottom: 96 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
