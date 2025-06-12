import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, role }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'ROLE_ADMIN') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;