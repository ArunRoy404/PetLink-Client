import { useQuery } from '@tanstack/react-query';
import {
    Typography,
} from '@material-tailwind/react';


import { useGetCampaignsApi } from '../../../axios/donationApi';
import NoDataFound from '../../ui/NoDataFound';
import DonationCard from '../../ui/DonationCard.jsx/DonationCard';
import CardSkeleton from '../../ui/CardSkeleton/CardSkeleton';





const ActiveCampaigns = () => {
    const { getCampaignsPromise } = useGetCampaignsApi()

    // Fetch pets data
    const { data: campaignsData, isLoading } = useQuery({
        queryKey: ['campaigns',],
        queryFn: () => getCampaignsPromise(0,3,false).then(res => res.data)
    });

    return (
        <div className="">
            <div className=''>
                {/* Page Header */}
                <div className="text-center mb-10">
                    <Typography variant="h3" className="font-bold text-2xl mb-6 text-gray-900 border-b pb-2 dark:text-white">
                        Recent Active Campaigns
                    </Typography>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
                </div>
            )}

            {/* Donation Grid */}
            {!isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-10">
                    {campaignsData?.length > 0 ? (
                        campaignsData.map((campaignData, index) => <DonationCard key={index} campaignData={campaignData} />)
                    ) : (
                        <div className='col-span-full'>
                            <NoDataFound message={'Try adjusting the category and search text'} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActiveCampaigns;