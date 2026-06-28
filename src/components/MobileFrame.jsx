import React from 'react';

const MobileFrame = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#0A0A0A', display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
      <div style={{ width: '100%', maxWidth: 480, minHeight: '100vh', background: '#f5f5f5', position: 'relative', overflow: 'hidden', boxShadow: '0 0 0 1px rgba(15, 23, 42, 0.06)' }}>
        <div style={{ width: '100%', minHeight: '100%', overflowX: 'hidden', overflowY: 'auto', paddingBottom: 96 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
