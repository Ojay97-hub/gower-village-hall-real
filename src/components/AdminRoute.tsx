import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldOff } from 'lucide-react';

const Skeleton = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto p-8 space-y-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-1/3" />
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="h-32 bg-gray-200 rounded-xl" />
                <div className="h-32 bg-gray-200 rounded-xl" />
            </div>
        </div>
    </div>
);

export function AdminRoute({ requiredRole }: { requiredRole?: string }) {
    const { isAdmin, hasRole, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return <Skeleton />;

    if (!isAdmin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (requiredRole && !hasRole(requiredRole)) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto">
                        <ShieldOff className="w-7 h-7 text-red-500" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Access Denied</h1>
                    <p className="text-sm text-gray-500">
                        You don't have permission to access this section. Contact your master admin to request access.
                    </p>
                </div>
            </div>
        );
    }

    return <Outlet />;
}
