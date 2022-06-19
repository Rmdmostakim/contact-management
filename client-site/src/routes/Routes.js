import { Route, Routes } from 'react-router-dom';
import Forgetpassword from '../pages/Forgetpassword';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Verification from '../pages/Verification';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';

function MainRoutes() {
    return (
        <Routes>
            {/* protecrted routes */}
            <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
            </Route>
            {/* public routes */}
            <Route path="login" element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route path="registration" element={<PublicRoutes />}>
                <Route path="/registration" element={<Registration />} />
            </Route>
            <Route path="verification" element={<PublicRoutes />}>
                <Route path="/verification" element={<Verification />} />
            </Route>
            <Route path="password-reset" element={<PublicRoutes />}>
                <Route path="/password-reset" element={<Forgetpassword />} />
            </Route>
        </Routes>
    );
}
export default MainRoutes;
