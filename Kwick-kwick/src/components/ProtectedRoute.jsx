import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const location = useLocation();
  const { user, roles, activeRole, loading } = useAuth();

  if (loading) return <div className="flex min-h-screen items-center justify-center text-sm font-semibold text-slate-500">Checking your session...</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (roles.length > 1 && !activeRole) return <Navigate to="/select-role" replace />;
  if (role && !roles.includes(role)) return <Navigate to="/select-role" replace />;
  if (role && activeRole && activeRole !== role) {
    return <Navigate to="/role-selection" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
