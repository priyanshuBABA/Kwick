import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const availableRoles = [
  { value: 'customer', label: 'Customer', description: 'Browse services and place orders' },
  { value: 'vendor', label: 'Vendor', description: 'Manage your business and inventory' },
  { value: 'rider', label: 'Rider', description: 'Accept delivery tasks and earn' },
  { value: 'admin', label: 'Super Admin', description: 'Master control over Customers, Vendors, & Riders' },
];

const RoleSelection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState('customer');
  const assignedRoles = (user?.roles || []).filter(Boolean);
  const availableAssignedRoles = availableRoles.filter((role) => assignedRoles.includes(role.value));
  const roles = availableAssignedRoles.length > 0 ? availableAssignedRoles : availableRoles;

  useEffect(() => {
    if (user && roles.length === 1) {
      const onlyRole = roles[0].value;
      localStorage.setItem('selected-role', onlyRole);
      navigate(`/${onlyRole}`);
    }
  }, [navigate, user, roles]);

  useEffect(() => {
    if (roles.length && !roles.some((role) => role.value === selectedRole)) {
      setSelectedRole(roles[0].value);
    }
  }, [roles, selectedRole]);

  const handleContinue = () => {
    if (!roles.some((role) => role.value === selectedRole)) {
      return;
    }

    localStorage.setItem('selected-role', selectedRole);
    const targetPath = selectedRole === 'customer' ? '/customer/home' : `/${selectedRole}`;
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff8c3,_#f8fafc_60%,_#eef2ff)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_25px_60px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-500">Welcome</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Choose how you want to continue</h1>
        <p className="mt-3 text-sm text-slate-600">You have multiple roles assigned. Select the one you want to use right now.</p>

        <div className="mt-8 space-y-3">
          {roles.map((role) => (
            <button key={role.value} onClick={() => setSelectedRole(role.value)} className={`flex w-full items-start justify-between rounded-2xl border px-4 py-4 text-left transition ${selectedRole === role.value ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>
              <span>
                <span className="block text-base font-semibold capitalize">{role.label}</span>
                <span className={`mt-1 block text-sm ${selectedRole === role.value ? 'text-slate-300' : 'text-slate-500'}`}>{role.description}</span>
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${selectedRole === role.value ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>{role.value}</span>
            </button>
          ))}
        </div>

        <button onClick={handleContinue} className="mt-8 w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800">Continue</button>
      </div>
    </div>
  );
};

export default RoleSelection;
