import useAxiosSecure from "./useAxiosSecure";

const useCreateAdoptionApi = () => {
    const axiosSecure = useAxiosSecure();
    const createAdoptionPromise = (adoptionData) => {
        return axiosSecure.post('/adoptions', adoptionData);
    };
    return { createAdoptionPromise };
};


export { useCreateAdoptionApi }