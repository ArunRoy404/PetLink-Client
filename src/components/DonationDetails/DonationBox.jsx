import {
    Card,
    CardBody,
    Typography,
    Button,
} from '@material-tailwind/react';
import {
    DollarSign,
} from 'lucide-react';
import DonationPetImage from './DonationPetImage';
import DonationProgress from './DonationProgress';
import DonationAmountSelector from './DonationAmountSelector';
import { formatCurrency } from '../../utilities/formatCurrency';


const DonationBox = ({ campaignData, isUrgent, donatedAmount, progress, donationAmount, setDonationAmount, setOpenDonationModal }) => {
    return (
        <div className='pt-40 bg-gradient-to-b pb-8 from-surface dark:bg-gradient-to-b dark:from-[#342e4e] dark:to-[#121212]'>
            {/* Campaign Details Card */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <Card className=" dark:bg-[#1F1A33] overflow-hidden shadow-none border-2 border-gray-300 mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                        {/* Pet Image */}
                        <DonationPetImage campaignData={campaignData} isUrgent={isUrgent} />

                        {/* Donation Info */}
                        <CardBody className=" dark:bg-[#1F1A33]">
                            <Typography variant="h1" className="font-bold text-3xl mb-2 text-gray-900 dark:text-white">
                                Help {campaignData.petName}
                            </Typography>

                            {/* Short Description */}
                            <Typography className="text-lg text-gray-700 mb-6 dark:text-white">
                                {campaignData.shortDescription}
                            </Typography>

                            {/* Donation Progress */}
                            <DonationProgress
                                donatedAmount={donatedAmount}
                                campaignData={campaignData}
                                isUrgent={isUrgent}
                                progress={progress}
                            />

                            {/* Donation Amount Selector */}
                            <DonationAmountSelector
                                donationAmount={donationAmount}
                                setDonationAmount={setDonationAmount}
                            />

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
    );
};

export default DonationBox;