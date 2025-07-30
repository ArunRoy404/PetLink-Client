import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { firebaseUser, userSignOut } = useAuthContext()
    const navigate = useNavigate()

    if (firebaseUser) {
        axiosInstance.interceptors.request.use(config => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.authorization = `${token}`
            }
            return config
        },
            (error) => Promise.reject(error)
        )

        axiosInstance.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                const status = error?.response?.status

                if (status === 401 || status === 403) {
                    navigate('/auth/sign-in')
                    userSignOut()
                }
                return Promise.reject(error)
            },
        )
    }
    return axiosInstance
};

export default useAxiosSecure;