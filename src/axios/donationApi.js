import useAxiosSecure from "./useAxiosSecure";



const useAddDonationCampaignApi = () => {
    const axiosSecure = useAxiosSecure()
    const addDonationCampaignPromise = (campaignData) => axiosSecure.post('/campaigns', campaignData)
    return { addDonationCampaignPromise }
}


const useGetCampaignsCountApi = () => {
    const axiosSecure = useAxiosSecure()
    const getCampaignsCountPromise = () => axiosSecure.get(`/campaigns-count`)
    return ({ getCampaignsCountPromise })
}

const useGetMyCampaignsCountApi = () => {
    const axiosSecure = useAxiosSecure()
    const getMyCampaignsCountPromise = () => axiosSecure.get(`/my-campaigns-count`)
    return ({ getMyCampaignsCountPromise })
}



const useGetCampaignsApi = () => {
    const axiosSecure = useAxiosSecure()
    const getCampaignsPromise = (page, size, paused) => {
        return axiosSecure.get(`/campaigns?page=${page}&size=${size}&paused=${paused}`)
    }
    return { getCampaignsPromise }
}


const useGetAllCampaignsApi = () => {
    const axiosSecure = useAxiosSecure()
    const getAllCampaignsPromise = () => {
        return axiosSecure.get(`/all-campaigns`)
    }
    return { getAllCampaignsPromise }
}

const useGetMyCampaignsApi = () => {
    const axiosSecure = useAxiosSecure()
    const getMyCampaignsPromise = (page, size) => {
        return axiosSecure.get(`/my-campaigns?page=${page}&size=${size}`)
    }
    return { getMyCampaignsPromise }
}


const useUpdateCampaignApi = () => {
    const axiosSecure = useAxiosSecure()
    const updateCampaignPromise = (campaignData) => {
        return axiosSecure.patch('/campaigns', { data: { campaignData } })
    }
    return { updateCampaignPromise }
}


const useGetCampaignInfoApi = () => {
    const axiosSecure = useAxiosSecure()
    const getCampaignInfoPromise = (campaignId) => {
        return axiosSecure.get(`/campaign/${campaignId}`,)
    }
    return { getCampaignInfoPromise }
}














const useCreateDonationApi = () => {
    const axiosSecure = useAxiosSecure()
    const getCreateDonationPromise = (donationData) => {
        return axiosSecure.post('/donations', donationData)
    }
    return { getCreateDonationPromise }
}


const useGetDonationsApi = () => {
    const axiosSecure = useAxiosSecure()
    const getDonationsPromise = (campaignId) => {
        return axiosSecure.get(`/donations/${campaignId}`, campaignId)
    }
    return { getDonationsPromise }
}


const useGetMyDonationsCountPromise = () => {
    const axiosSecure = useAxiosSecure()
    const getMyDonationsCountPromise = () => {
        return axiosSecure.get('/my-donations-count',)
    }
    return { getMyDonationsCountPromise }
}

const useGetMyDonationsApi = () => {
    const axiosSecure = useAxiosSecure()
    const getMyDonationsPromise = (page, size) => {
        return axiosSecure.get(`/my-donations?page=${page}&size=${size}`)
    }
    return { getMyDonationsPromise }
}

const useDeleteDonationsApi = () => {
    const axiosSecure = useAxiosSecure()
    const DeleteMyDonationsPromise = (id) => {
        return axiosSecure.delete('/donations', { data: { id } })
    }
    return { DeleteMyDonationsPromise }
}




export {useGetAllCampaignsApi, useGetMyDonationsCountPromise, useDeleteDonationsApi, useGetMyDonationsApi, useGetDonationsApi, useCreateDonationApi, useGetCampaignsApi, useGetCampaignsCountApi, useAddDonationCampaignApi, useGetCampaignInfoApi, useGetMyCampaignsApi, useGetMyCampaignsCountApi, useUpdateCampaignApi }