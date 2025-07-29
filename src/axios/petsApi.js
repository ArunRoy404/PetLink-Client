import useAxiosSecure from "./useAxiosSecure";


const useAddPetApi = () => {
    const axiosSecure = useAxiosSecure()
    const addPetPromise = (petData) => axiosSecure.post('/pets', petData)
    return ({ addPetPromise })
};

const useGetPetsCountApi = () => {
    const axiosSecure = useAxiosSecure()
    const getPetsCountPromise = () => axiosSecure.get(`/pets-count`)
    return ({ getPetsCountPromise })
}


const useGetPetCategoriesApi = () => {
    const axiosSecure = useAxiosSecure()
    const getPetCategoriesPromise = () => {
        return axiosSecure.get('/pet-categories')
    }
    return { getPetCategoriesPromise }
}


const useGetPetsApi = () => {
    const axiosSecure = useAxiosSecure()
    const getPetsPromise = (page, size, searchTerm = '', category = '', adopted) => {
        return axiosSecure.get(`/pets?page=${page}&size=${size}&search=${searchTerm}&category=${category}&adopted=${adopted}`)
    }
    return { getPetsPromise }
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




export { useGetPetCategoriesApi, useGetPetsCountApi, useGetPetInfoApi, useDeletePetApi, useUpdatePetApi, useAddPetApi, useGetPetsApi, useGetMyAddedPetsCountApi, useGetMyAddedPetsApi }