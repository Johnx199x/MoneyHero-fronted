import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { LoadingScreen } from './layout/LoadingScreen';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) return <LoadingScreen/>;
	return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

export default PrivateRoute;
