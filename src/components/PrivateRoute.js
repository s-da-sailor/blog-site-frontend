import { useAuthContext } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useAuthContext();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
