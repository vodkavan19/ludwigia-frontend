import { useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

function AdminLogin() {
    const status = useSelector((state) => state.adminAuth.login?.status);
    const isLogin = useSelector((state) => state.adminAuth.login?.data);
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch();

    return isLogin ? (
        <Navigate to='/admin/' state={{ from: location }} replace />
    ) : (
        <div>{status}</div>
    );
}

export default AdminLogin;
