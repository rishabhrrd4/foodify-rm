import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { getManagerAccessToken } from '../features/manager/auth/managerAuthService';

// login status ke base pe redirect karna hai
const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const isLoggedInRedux = useSelector((state: RootState) => state.auth.isLoggedIn); // check login status

  const [isAuthenticating, setIsAuthenticating] = useState(true); 
  const [hasValidToken, setHasValidToken] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = getManagerAccessToken();
      setHasValidToken(!!token);
      setIsAuthenticating(false);
    };
    checkToken();
  }, []);

  if (isAuthenticating) {
    return <div>Loading authentication...</div>;
  }

  const finalIsLoggedIn = isLoggedInRedux || hasValidToken;

  if (!finalIsLoggedIn) {
    return <Navigate to="/manager/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;