import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useGetCampaignInfoApi, useGetDonationsApi } from '../../axios/donationApi';
import DonationBenefit from '../../components/ui/DonationBenefit.jsx/DonationBenefit';
import DonationTerms from '../../components/ui/DonationTerms/DonationTerms';
import PaymentDialog from '../../components/DonationDialog/PaymentDialog';
import ActiveCampaigns from '../../components/pages/Donationdetails/ActiveCampaigns';
import Loader from '../../components/ui/Loader';
import { useThemeContext } from '../../context/ThemeContext';
import RecentDonationsContainer from '../../components/RecentDonations/RecentDonationsContainer';
import DonationInfo from '../../components/DonationDetails/DonationInfo';
import DonationBox from '../../components/DonationDetails/DonationBox';

const DonationDetail = () => {
    const { campaignId } = useParams();
    const { getCampaignInfoPromise } = useGetCampaignInfoApi();
    const [donationAmount, setDonationAmount] = useState(50);
    const [openDonationModal, setOpenDonationModal] = useState(false);
    const [donatedAmount, setDonatedAmount] = useState(0)
    const [donations, setDonations] = useState([])
    const { isDark } = useThemeContext()


    const { getDonationsPromise } = useGetDonationsApi()
    useEffect(() => {
        getDonationsPromise(campaignId)
            .then(res => {
                setDonatedAmount(res.data.totalAmount)
                setDonations(res.data.donations)
            })
    }, [openDonationModal])


    const handleCloseDialog = () => {
        setOpenDonationModal(false)
    }

    // Fetch campaign details
    const { data: campaignData, isLoading } = useQuery({
        queryKey: ['campaign', campaignId],
        queryFn: () => getCampaignInfoPromise(campaignId).then(res => res.data),
    });

    if (isLoading) return (
        <div className="flex justify-center items-center dark:bg-gradient-to-t dark:from-[#121212] dark:to-[#1F1A33] h-screen">
            {
                isDark
                    ? <Loader size={30} color='white' />
                    : <Loader size={30} />
            }
        </div>
    );
    

    if (!campaignData) return <div className="text-center py-20">Campaign not found</div>;
    const progress = Math.min(Math.round((donatedAmount / campaignData.maxDonationAmount) * 100), 100);
    const remainingAmount = campaignData.maxDonationAmount - donatedAmount;
    const isUrgent = remainingAmount > campaignData.maxDonationAmount * 0.7;

    return (
        <div className="">

            {/* donation box  */}
            <DonationBox
                campaignData={campaignData}
                isUrgent={isUrgent}
                donatedAmount={donatedAmount}
                progress={progress}
                donationAmount={donationAmount}
                setDonationAmount={setDonationAmount}
                setOpenDonationModal={setOpenDonationModal}
            />


            {/* about this campaign  */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20'>
                <DonationInfo campaignData={campaignData} />


                <div className='dark:bg-gradient-to-b dark:from-[#342e4e] dark:to-[#121212]'>
                    {/* Active donation campaigns  */}
                    <div className=''>
                        <ActiveCampaigns />
                    </div>
                </div>


                <div className='dark:bg-gradient-to-t dark:from-[#342e4e] dark:to-[#121212]'>
                    {/* Recent Donations Section */}
                    <RecentDonationsContainer donations={donations} />
                </div>


                <div className='dark:bg-gradient-to-b dark:from-[#342e4e] dark:to-[#121212]'>
                    {/* Campaign Benefits Section */}
                    <div className="">
                        <DonationBenefit />
                    </div>
                </div>

                <div className='dark:bg-gradient-to-t dark:from-[#342e4e] dark:to-[#121212]'>
                    {/* Terms Section */}
                    <div className="">
                        <DonationTerms />
                    </div>
                </div>
            </div>

            <PaymentDialog
                open={openDonationModal}
                onClose={handleCloseDialog}
                campaignData={campaignData}
                donationAmount={donationAmount}
            />
        </div>
    );
};

export default DonationDetail;