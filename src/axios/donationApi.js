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
    const getCampaignsPromise = (page, size) => {
        return axiosSecure.get(`/campaigns?page=${page}&size=${size}`)
    }
    return { getCampaignsPromise }
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
        return axiosSecure.put('/campaigns', { data: { campaignData } })
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



export {useGetCampaignsApi, useGetCampaignsCountApi, useAddDonationCampaignApi, useGetCampaignInfoApi, useGetMyCampaignsApi, useGetMyCampaignsCountApi, useUpdateCampaignApi }