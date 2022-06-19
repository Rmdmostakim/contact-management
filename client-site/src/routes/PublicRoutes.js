import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        return true;
    }
    return false;
};

function PublicRoutes() {
    const auth = useAuth();
    return auth ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
