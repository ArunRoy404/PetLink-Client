import useAxiosSecure from "./useAxiosSecure";

const useAddPetApi = () => {
    const axiosSecure = useAxiosSecure()

    const addPetPromise = (petData) => axiosSecure.post('/pets', petData)
    return ({ addPetPromise })
};

export { useAddPetApi }