import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Landing from '../pages/Landing';
/**
 * Home Route Component
 * 
 *Determines what to show on the root route based on authentication status
 */
const HomeRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Landing />;
  }
  
  return <Navigate to="/user/dashboard" replace />;
};

export default HomeRoute;