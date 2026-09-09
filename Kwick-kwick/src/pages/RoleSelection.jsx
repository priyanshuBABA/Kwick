import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const availableRoles = [
  { value: 'customer', label: 'Customer', description: 'Browse services and place orders' },
  { value: 'rider', label: 'Rider', description: 'Accept delivery tasks and earn' },
  { value: 'vendor', label: 'Service Provider', description: 'Manage your services, products, orders and business.' },
  { value: 'admin', label: 'Super Admin', description: 'Master control over Customers, Vendors, & Riders' },
];

const rolePath = (role) => role === 'customer' ? '/customer/home' : role === 'vendor' ? '/service-provider' : `/${role}`;

const RoleSelection = () => {
  const navigate = useNavigate();
  const { user, roles: assignedUserRoles, activeRole, switchRole, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState('customer');
  const assignedRoles = (assignedUserRoles.length ? assignedUserRoles : user?.roles || []).filter(Boolean);
  const availableAssignedRoles = availableRoles.filter((role) => assignedRoles.includes(role.value));
  const roles = availableAssignedRoles;

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
      return;
    }
    if (user && !loading && roles.length === 1) {
      const onlyRole = roles[0].value;
      if (activeRole !== onlyRole) switchRole(onlyRole);
      navigate(rolePath(onlyRole));
    }
  }, [navigate, user, roles, loading, activeRole, switchRole]);

  useEffect(() => {
    if (roles.length && !roles.some((role) => role.value === selectedRole)) {
      setSelectedRole(roles[0].value);
    }
  }, [roles, selectedRole]);

  if (loading) return <div className="flex min-h-screen items-center justify-center text-sm font-semibold text-slate-500">Loading your account...</div>;
  if (!user) return null;
  if (!roles.length) return <div className="flex min-h-screen items-center justify-center px-4 text-center text-sm font-semibold text-red-600">No active role is assigned to this account.</div>;

  const handleContinue = () => {
    if (!roles.some((role) => role.value === selectedRole)) {
      return;
    }

    switchRole(selectedRole);
    const targetPath = rolePath(selectedRole);
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff8c3,_#f8fafc_60%,_#eef2ff)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_25px_60px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-500">Welcome Back 👋</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">How would you like to continue?</h1>
        <p className="mt-3 text-sm text-slate-600">Select the role you want to use right now.</p>

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
