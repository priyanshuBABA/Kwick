import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useAppContext } from '../AppContext';
import LocationPicker from './LocationPicker';

const TopBar = ({ title, showBack = true, rightElement, showLocation = false }) => {
  const navigate = useNavigate();
  const { userLocation } = useAppContext();
  const [isLocationOpen, setIsLocationOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-[#2E2E2E]">
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-white transition-opacity active:opacity-60"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <div>
          <h1 className="text-lg font-bold text-white font-heading leading-tight">{title}</h1>
          {showLocation && (
            <button 
              onClick={() => setIsLocationOpen(true)}
              className="flex items-center gap-1 text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-yellow-400 transition-colors"
            >
              <MapPin size={10} className="text-yellow-400" />
              {userLocation}
            </button>
          )}
        </div>
      </div>
      {rightElement && <div>{rightElement}</div>}
      <LocationPicker isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
    </div>
  );
};

export default TopBar;
