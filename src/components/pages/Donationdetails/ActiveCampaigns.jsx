import { useQuery } from '@tanstack/react-query';
import { Typography } from '@material-tailwind/react';
import { useGetCampaignsApi } from '../../../axios/donationApi';
import SkeletonContainer from '../../ui/Skeleton/SkeletonContainer';
import CampaignsContainer from '../../Campaigns/CampaignsContainer';


const ActiveCampaigns = () => {
    const { getCampaignsPromise } = useGetCampaignsApi()

    // Fetch pets data
    const { data: campaignsData, isLoading } = useQuery({
        queryKey: ['campaigns',],
        queryFn: () => getCampaignsPromise(0, 3, false).then(res => res.data)
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
            {isLoading && <SkeletonContainer number={3} />}

            {/* Donation Campaigns Container */}
            {!isLoading && <CampaignsContainer campaignsData={campaignsData} />}
        </div>
    );
};

export default ActiveCampaigns;