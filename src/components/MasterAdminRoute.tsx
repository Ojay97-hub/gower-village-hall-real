import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function MasterAdminRoute() {
    const { isMasterAdmin, isLoading } = useAuth();
    const location = useLocation();

    // Show loading skeleton while session is being restored
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-full max-w-4xl mx-auto p-8 space-y-6 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-lg w-1/3" />
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-4/6" />
                    </div>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated or not master admin
    if (!isMasterAdmin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
