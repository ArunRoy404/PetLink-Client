import useAxiosSecure from "./useAxiosSecure";

const useGetUsersApi = () => {
    const axiosSecure = useAxiosSecure()
    const getUsersPromise = (page, size) => axiosSecure.get(`/users?page=${page}&size=${size}`)
    return { getUsersPromise }
}

const useGetUserCountApi = () => {
    const axiosSecure = useAxiosSecure()
    const getUsersCountPromise = () => axiosSecure.get('/users-count')
    return { getUsersCountPromise }
}

const useUpdateUserApi = () => {
    const axiosSecure = useAxiosSecure()
    const getUpdateUserPromise = (userData) => axiosSecure.put('/users', { data: { userData } })
    return { getUpdateUserPromise }
}

export { useGetUsersApi, useUpdateUserApi, useGetUserCountApi }