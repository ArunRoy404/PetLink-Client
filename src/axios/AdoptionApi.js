import useAxiosSecure from "./useAxiosSecure";

const useCreateAdoptionApi = () => {
    const axiosSecure = useAxiosSecure();
    const createAdoptionPromise = (adoptionData) => {
        return axiosSecure.post('/adoptions', adoptionData);
    };
    return { createAdoptionPromise };
};

const useGetAdoptionApi = () => {
    const axiosSecure = useAxiosSecure();
    const getAdoptionPromise = (id) => {
        return axiosSecure.get(`/adoptions/${id}`,);
    };
    return { getAdoptionPromise };
};

const useGetAdoptionRequestsCountApi = () => {
    const axiosSecure = useAxiosSecure();
    const getAdoptionRequestsCountPromise = (email) => {
        return axiosSecure.get(`/adoption-requests-count?email=${email}`);
    };
    return { getAdoptionRequestsCountPromise };
};

const useGetAdoptionRequestsApi = () => {
    const axiosSecure = useAxiosSecure();
    const getAdoptionRequestsPromise = (page, size, email) => {
        return axiosSecure.get(`/adoption-requests?email=${email}&page=${page}&size=${size}`);
    };
    return { getAdoptionRequestsPromise };
};

const useUpdateAdoptionApi = () => {
    const axiosSecure = useAxiosSecure();
    const updateAdoptionPromise = (updateData) => {
        return axiosSecure.patch('/adoptions', { data: { updateData } });
    };
    return { updateAdoptionPromise };
};


export { useGetAdoptionRequestsCountApi, useUpdateAdoptionApi, useGetAdoptionRequestsApi, useGetAdoptionApi, useCreateAdoptionApi }