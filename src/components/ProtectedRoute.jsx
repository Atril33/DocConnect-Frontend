// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import useSession from '../hooks/useSession';

const ProtectedRoute = () => {
  const [userSignedIn] = useSession();

  if (userSignedIn) {
    return <Outlet />;
  }

  return (
    <Navigate to="/login" />
  );
};
export default ProtectedRoute;
