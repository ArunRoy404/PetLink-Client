import useAxiosSecure from "./useAxiosSecure";


const useAddPetApi = () => {
    const axiosSecure = useAxiosSecure()
    const addPetPromise = (petData) => axiosSecure.post('/pets', petData)
    return ({ addPetPromise })
};

const useGetPetsApi = () => {
    const axiosSecure = useAxiosSecure()
    return axiosSecure.get('/pets')
}







const useGetMyAddedPetsCountApi = () => {
    const axiosSecure = useAxiosSecure()
    const getMyAddedPetsCountPromise = () => axiosSecure.get(`/my-added-pets-count`)
    return ({ getMyAddedPetsCountPromise })
}

const useGetMyAddedPetsApi = () => {
    const axiosSecure = useAxiosSecure()
    const getMyAddedPetsPromise = (page, size) => {
        return axiosSecure.get(`/my-added-pets?page=${page}&size=${size}`)
    }
    return { getMyAddedPetsPromise }
}

const useUpdatePetApi = () => {
    const axiosSecure = useAxiosSecure()
    const updatePetPromise = (petData) => {
        return axiosSecure.put('/pets', { data: { petData } })
    }
    return { updatePetPromise }
}

const useDeletePetApi = () => {
    const axiosSecure = useAxiosSecure()
    const deletePetPromise = (petId) => {
        return axiosSecure.delete('/pets', { data: { petId } })
    }
    return { deletePetPromise }
}

const useGetPetInfoApi = () => {
    const axiosSecure = useAxiosSecure()
    const getPetInfoPromise = (petId) => {
        return axiosSecure.get(`/pet/${petId}`,)
    }
    return { getPetInfoPromise }
}




export { useGetPetInfoApi, useDeletePetApi, useUpdatePetApi, useAddPetApi, useGetPetsApi, useGetMyAddedPetsCountApi, useGetMyAddedPetsApi }