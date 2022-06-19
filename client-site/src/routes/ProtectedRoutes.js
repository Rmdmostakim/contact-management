import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        return true;
    }
    return false;
};

function ProtectedRoutes() {
    const hasAccess = useAuth();
    return hasAccess ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoutes;
