// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import useSession from '../hooks/useSession';

const ProtectedRouteAdmin = () => {
  const [userInfo] = useSession();

  if (userInfo.role === 'admin') {
    return <Outlet />;
  }

  return (
    <Navigate to="/unauthorize" />
  );
};
export default ProtectedRouteAdmin;
