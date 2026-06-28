import React from 'react';

const MobileFrame = ({ children }) => {
  return (
    <div style={{ minHeight: '100dvh', width: '100%', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
      <div style={{ width: '100%', maxWidth: '100%', minHeight: '100dvh', background: '#f5f5f5', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(15, 23, 42, 0.04)' }}>
        <div style={{ width: '100%', minHeight: '100%', overflowX: 'hidden', overflowY: 'auto', paddingBottom: 96 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
