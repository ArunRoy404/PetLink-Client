import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';


const axiosInstance = axios.create({
    baseURL: 'https://pet-link-server.vercel.app'
})

const useAxiosSecure = () => {
    const { firebaseUser } = useAuthContext()

    if (firebaseUser) {
        axiosInstance.interceptors.request.use(config => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.authorization = `${token}`
            }
            return config
        })
    }
    return axiosInstance
};

export default useAxiosSecure;