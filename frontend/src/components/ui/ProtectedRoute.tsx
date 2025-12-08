import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { refreshAuthToken } from '../../lib/axios';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await refreshAuthToken();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        // Clean up is handled in refreshAuthToken, but we need to redirect
        // navigate('/login', { replace: true }); // Handled by rendering <Navigate />
      } finally {
        setIsChecking(false);
      }
    };

    verifyToken();
  }, [navigate]);

  if (isChecking) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};