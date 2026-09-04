import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
  const selectedRole = localStorage.getItem('selected-role');

  if (role && selectedRole && selectedRole !== role) {
    return <Navigate to="/role-selection" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
