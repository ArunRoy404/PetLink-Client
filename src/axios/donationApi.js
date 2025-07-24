import useAxiosSecure from "./useAxiosSecure";



const useAddDonationCampaignApi = () => {
    const axiosSecure = useAxiosSecure()
    const addDonationCampaignPromise = (campaignData) => axiosSecure.post('/campaigns', campaignData)
    return { addDonationCampaignPromise }
}

export { useAddDonationCampaignApi }