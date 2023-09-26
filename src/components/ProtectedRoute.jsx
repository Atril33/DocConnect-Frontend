// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

const ProtectedRoute = () => {
  const [token] = useState(() => {
    // getting stored value
    const initialValue = localStorage.getItem('token');
    return initialValue || '';
  });
  const [tokenTime] = useState(() => {
    // getting stored value
    const initialValue = Number(localStorage.getItem('token_time'));
    return initialValue || Date.now();
  });

  if (token && Math.abs((Date.now() - tokenTime)) < 1_800_000) { // 30 minutes
    return <Outlet />;
  }

  return (
    <Navigate to="/login" />
  );
};
export default ProtectedRoute;
