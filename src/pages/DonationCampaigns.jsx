import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Typography,
} from '@material-tailwind/react';
import { Search } from 'lucide-react';
import Select from 'react-select';


import { useInView } from "react-intersection-observer";

import NoDataFound from '../components/ui/NoDataFound';
import Loader from '../components/ui/Loader';
import CardSkeleton from '../components/ui/CardSkeleton/CardSkeleton';
import PetCard from '../components/ui/PetCard';
import { useGetAllCampaignsApi } from '../axios/donationApi';
import DonationCard from '../components/ui/DonationCard.jsx/DonationCard';



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
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
                    </div>
                )}



                {/* Donation Grid */}
                {!isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {campaignsData?.length > 0 ? (
                            campaignsData.map((campaignData, index) => <DonationCard key={index} campaignData={campaignData} />)
                        ) : (
                            <div className='col-span-full'>
                                <NoDataFound message={'Try adjusting the category and search text'} />
                            </div>
                        )}
                    </div>
                )}

                <div ref={ref} className='py-10 w-full flex items-center justify-center'>
                    {
                        campaignsData?.length !== 0 && inView && !isLoading && (
                            <div className='flex flex-col items-center justify-center gap-4 font-bold '>
                                <Loader size={50} />
                                Loading...
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default DonationCampaigns;