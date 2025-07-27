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

const useGetUserApi = () => {
    const axiosSecure = useAxiosSecure()
    const getUserPromise = (email) => axiosSecure.get(`/users/${email}`,)
    return { getUserPromise }
}

export { useGetUserApi, useGetUsersApi, useUpdateUserApi, useGetUserCountApi }