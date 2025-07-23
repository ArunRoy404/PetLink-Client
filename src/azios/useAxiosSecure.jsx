import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { firebaseUser } = useAuthContext()

    if (firebaseUser) {
        axiosInstance.interceptors.request.use(config => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.authorization = `Bearer ${token}`
            }
            return config
        })
    }
    return axiosInstance
};

export default useAxiosSecure;