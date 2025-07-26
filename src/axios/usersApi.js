import useAxiosSecure from "./useAxiosSecure";

const useGetUsersApi = () => {
    const axiosSecure = useAxiosSecure()
    const getUsersPromise = () => axiosSecure.get('/users')
    return { getUsersPromise }
}

const useUpdateUserApi = () => {
    const axiosSecure = useAxiosSecure()
    const getUpdateUserPromise = (updateData) => axiosSecure.put('/users', { data: { updateData } })
    return { getUpdateUserPromise }
}

export { useGetUsersApi, useUpdateUserApi }