import { useNavigate } from 'react-router';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import {
    handleAdminLogout,
    handleRefreshToken
} from '~/redux/slices/adminAuth.slice';

const useAxiosPrivate = () => {
    const auth = useSelector((state) => state.adminAuth.login?.data);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const axiosPrivate = axios.create({
        withCredentials: true,
        baseURL: import.meta.env.VITE_URL_BE_SERVER
    })

    axiosPrivate.interceptors.request.use(
        (config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    )

    axiosPrivate.interceptors.response.use(
        (response) => {
            return response.data;
        },
        async (error) => {
            const prevRequest = error?.config;
            if (error.response.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                await dispatch(handleRefreshToken(auth)).unwrap()
                    .then((res) => {
                        prevRequest.headers['Authorization'] = `Bearer ${res}`;
                    })
                    .catch((err) => {
                        dispatch(handleAdminLogout()).unwrap()
                        navigate('/admin/login', { replace: true })
                        Swal.fire({
                            icon: 'error',
                            title: err.message,
                            html: '<b>Phiên đăng nhập hiện tại đã hết hạn!</b><br/>'
                                + '<b>Vui lòng tiến hành đăng nhập lại để tiếp tục!</b>',
                            confirmButtonText: 'Xác nhận'
                        })
                    })
                return axiosPrivate(prevRequest)
            }
            return Promise.reject(error.response);
        }
    )

    return axiosPrivate
}


export default useAxiosPrivate;