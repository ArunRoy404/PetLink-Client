import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@material-tailwind/react';
import { useInView } from "react-intersection-observer";
import { useGetAllCampaignsApi } from '../axios/donationApi';
import SkeletonContainer from '../components/ui/Skeleton/SkeletonContainer';
import CampaignsContainer from '../components/Campaigns/CampaignsContainer';
import InfiniteLoader from '../components/ui/InfiniteLoader';


const DonationCampaigns = () => {
    const [campaignsData, setPetsData] = useState([])
    const { getAllCampaignsPromise } = useGetAllCampaignsApi()
    const { ref, inView } = useInView({ threshold: 1 })


    // Fetch pets data
    const { data, isLoading } = useQuery({
        queryKey: ['campaigns',],
        queryFn: () => getAllCampaignsPromise().then(res => res.data)
    });


    useEffect(() => {
        if (inView || data?.length) {
            setPetsData(prevData => [...prevData, ...data])
        }
    }, [inView, data])



    return (
        <div className="dark:bg-gradient-to-b  dark:from-[#342e4e] dark:to-[#121212] ">
            <div className='pt-40 bg-gradient-to-b from-surface '>
                {/* Page Header */}
                <div className=" container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
                    <Typography variant="h2" className="dark:text-white font-bold text-gray-900 mb-2">
                        Give Hope to Pets in Need
                    </Typography>
                    <Typography variant="lead" className="text-gray-600 dark:text-white">
                        Your donation can change a life. Browse campaigns below to support pets awaiting medical care, shelter, and loving homes.
                    </Typography>
                </div>
            </div>


            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Loading State */}
                {isLoading && <SkeletonContainer number={6} />}


                {/* Donation Grid */}
                {!isLoading && <CampaignsContainer campaignsData={campaignsData} />}


                {/* infinite data loader  */}
                <InfiniteLoader
                    ref={ref}
                    condition={campaignsData?.length !== 0 && inView && !isLoading}
                />
            </div>
        </div>
    );
};

export default DonationCampaigns;