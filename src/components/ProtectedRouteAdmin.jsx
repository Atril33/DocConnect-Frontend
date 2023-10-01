// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import useSession from '../hooks/useSession';

const ProtectedRouteAdmin = () => {
  const userInfo = useSession()[1];

  if (userInfo.role === 'admin') {
    return <Outlet />;
  }

  return (
    <Navigate to="/unauthorize" />
  );
};
export default ProtectedRouteAdmin;
