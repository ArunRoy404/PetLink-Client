import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    CardBody,
    Typography,
    Button,
    Chip,
    Progress,
    Avatar,
} from '@material-tailwind/react';
import {
    AlertCircle,
    DollarSign,
} from 'lucide-react';
import { useParams } from 'react-router';


import { useGetCampaignInfoApi, useGetDonationsApi } from '../../axios/donationApi';
import DonationBenefit from '../../components/ui/DonationBenefit.jsx/DonationBenefit';
import DonationTerms from '../../components/ui/DonationTerms/DonationTerms';
import PaymentDialog from '../../components/DonationDialog/PaymentDialog';
import ActiveCampaigns from '../../components/pages/Donationdetails/ActiveCampaigns';
import Loader from '../../components/ui/Loader';
import { useThemeContext } from '../../context/ThemeContext';
import RichTextEditor from '../../components/ui/RichTextEditor/RichTextEditor';

// Dummy donation data for progress visualization
// const donations = [
//     { name: "John D.", amount: 150, date: "2025-07-30" },
//     { name: "Sarah M.", amount: 75, date: "2025-07-29" },
//     { name: "Anonymous", amount: 200, date: "2025-07-28" },
//     { name: "PetLovers Inc.", amount: 300, date: "2025-07-27" }
// ];

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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="">
            <div className='pt-40 bg-gradient-to-b pb-8 from-surface dark:bg-gradient-to-b dark:from-[#342e4e] dark:to-[#121212]'>
                {/* Campaign Details Card */}
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <Card className=" dark:bg-[#1F1A33] overflow-hidden shadow-none border-2 border-gray-300 mb-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Pet Image */}
                            <div className="relative h-96 lg:h-auto">
                                <img
                                    src={campaignData.petImage}
                                    alt={campaignData.petName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {campaignData.paused && (
                                        <Chip
                                            value="Paused"
                                            color="red"
                                            className="font-bold shadow-md flex items-center"
                                            icon={<AlertCircle size={16} className="mr-1" />}
                                        />
                                    )}
                                    {isUrgent && (
                                        <Chip
                                            value="Urgent Need"
                                            color="amber"
                                            className="font-bold shadow-md"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Campaign Info */}
                            <CardBody className=" dark:bg-[#1F1A33]">
                                <Typography variant="h1" className="font-bold text-3xl mb-2 text-gray-900 dark:text-white">
                                    Help {campaignData.petName}
                                </Typography>

                                {/* Short Description */}
                                <Typography className="text-lg text-gray-700 mb-6 dark:text-white">
                                    {campaignData.shortDescription}
                                </Typography>

                                {/* Campaign Progress */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <Typography variant="h5" className="font-bold text-indigo-700 dark:text-white/60">
                                            {formatCurrency(donatedAmount)} raised
                                        </Typography>
                                        <Typography variant="small" className="font-semibold text-gray-600">
                                            of {formatCurrency(campaignData.maxDonationAmount)} goal
                                        </Typography>
                                    </div>
                                    <Progress
                                        value={progress}
                                        size="lg"
                                        color={progress >= 60 ? 'green' : isUrgent ? 'red' : 'amber'}
                                        className="bg-gray-200 h-3 "
                                    />
                                    <div className="flex justify-between mt-2">
                                        <Typography variant="small" className="font-bold dark:text-white" color={isUrgent ? 'red' : 'black'}>
                                            {progress}% funded
                                        </Typography>
                                        {campaignData.lastDonationDate && (
                                            <Typography variant="small" className="text-gray-500">
                                                Last donation: {new Date(campaignData.lastDonationDate).toLocaleDateString()}
                                            </Typography>
                                        )}
                                    </div>
                                </div>

                                {/* Donation Amount Selector */}
                                <div className="mb-8">
                                    <Typography variant="h6" className="font-bold mb-3 text-gray-800 dark:text-white">
                                        Select Donation Amount
                                    </Typography>
                                    <div className="grid grid-cols-4 gap-2 mb-4">
                                        {[25, 50, 100, 250].map((amount) => (
                                            <Button
                                                key={amount}
                                                variant={donationAmount === amount ? 'filled' : 'outlined'}
                                                color={donationAmount === amount ? 'orange' : 'gray'}
                                                className="py-2 dark:text-white dark:border-white"
                                                onClick={() => setDonationAmount(amount)}
                                            >
                                                {formatCurrency(amount)}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            value={donationAmount}
                                            onChange={(e) => setDonationAmount(Math.max(0, parseInt(e.target.value) || 0))}
                                            className="w-full pl-8 p-2 border rounded-lg"
                                            min="1"
                                        />
                                    </div>
                                </div>

                                {/* Donate Button */}
                                <Button
                                    size="lg"
                                    fullWidth
                                    className="flex items-center bg-primary justify-center gap-2 transition-all mt-4"
                                    disabled={campaignData.paused}
                                    onClick={() => setOpenDonationModal(true)}
                                >
                                    <DollarSign size={20} />
                                    {campaignData.paused ? 'Campaign Paused' : `Donate ${formatCurrency(donationAmount)} Now`}
                                </Button>

                                {campaignData.paused && (
                                    <Typography variant="small" className="text-red-500 mt-2 text-center">
                                        This campaign is currently not accepting donations
                                    </Typography>
                                )}
                            </CardBody>
                        </div>
                    </Card>
                </div>
            </div>


            <div className='container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20'>
                <div className='dark:bg-gradient-to-t dark:from-[#342e4e] dark:to-[#121212]'>
                    {/* Long Description Section */}
                    <div className="">
                        <Card className="p-8 shadow-none border-2 border-gray-300">
                            <Typography variant="h3" className="font-bold text-2xl mb-6 text-gray-900 border-b pb-2">
                                About This Campaign
                            </Typography>
                            <div className="max-h-60 overflow-y-auto pr-3 custom-scrollbar">
                                <RichTextEditor content={campaignData.longDescription} viewOnly={true} />
                            </div>
                        </Card>
                    </div>
                </div>

                <div className='dark:bg-gradient-to-b dark:from-[#342e4e] dark:to-[#121212]'>
                    {/* Active donation campaigns  */}
                    <div className=''>
                        <ActiveCampaigns />
                    </div>
                </div>


                <div className='dark:bg-gradient-to-t dark:from-[#342e4e] dark:to-[#121212]'>
                    {/* Recent Donations Section */}
                    <div className="">
                        <Card className=" shadow-none dark:bg-[#1F1A33] dark:border-gray-700 dark:border-2  ">
                            <Typography variant="h3" className="dark:text-white font-bold text-2xl mb-6 text-gray-900 border-b pb-2">
                                Recent Donations
                            </Typography>
                            <div className="space-y-4">
                                {donations.map((donation, index) => (
                                    <div key={index} className="flex items-center justify-between dark:bg-gray-700 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3 ">
                                            <Avatar
                                                src={`https://i.pravatar.cc/150?img=${index + 10}`}
                                                size="sm"
                                                className="border-2 border-white"
                                            />
                                            <div>
                                                <Typography variant="h6" className="font-semibold dark:text-white">
                                                    {donation.donorName}
                                                </Typography>
                                                {donation.message && (
                                                    <Typography variant="small" className="text-gray-600">
                                                        "{donation.message}"
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Typography variant="h6" className="font-bold text-amber-700">
                                                {formatCurrency(donation.amount)}
                                            </Typography>
                                            <Typography variant="small" className="text-gray-500">
                                                {new Date(donation.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
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

            {/* <DonationDialog
                open={openDonationModal}
                handleOpen={setOpenDonationModal}
                donationAmount={donationAmount}
                campaignData={campaignData}
            /><DonationDialog /> */}

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