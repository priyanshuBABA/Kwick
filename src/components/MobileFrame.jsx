import React from 'react';

const MobileFrame = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] w-full flex flex-col relative">
      {/* 
         Removed the phone mockup constraints (max-w-sm, borders, and fixed width) 
         to allow the application to fill the full browser screen while 
         remaining mobile-responsive by design.
      */}
      <div className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto no-scrollbar pb-16">
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
