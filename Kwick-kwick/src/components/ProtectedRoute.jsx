import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ role }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  if (role && !user.roles?.includes(role)) {
    return <Navigate to="/role-selection" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
