import React, { useEffect, useState } from 'react';
import { Progress, Button, Typography, Avatar, Card, CardBody, CardFooter } from '@material-tailwind/react';
import { Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useGetDonationsApi } from '../../../axios/donationApi';
import { formatCurrency } from '../../../utilities/formatCurrency';

const DonationCard = ({ campaignData }) => {
    const navigate = useNavigate()

    const [donatedAmount, setDonatedAmount] = useState(0)


    const {
        petName,
        petImage,
        maxDonationAmount,
        shortDescription,
        lastDonationDate,
        paused
    } = campaignData;


    const { getDonationsPromise } = useGetDonationsApi()
    useEffect(() => {
        getDonationsPromise(campaignData._id)
            .then(res => {
                setDonatedAmount(res.data.totalAmount)
            })
    }, [])


    // Calculate donation progress percentage
    const progress = Math.min(Math.round((donatedAmount / maxDonationAmount) * 100), 100);


    return (
        <Card className="w-full dark:bg-[#1F1A33] dark:text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {/* Pet Image with Paused Badge */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={petImage}
                    alt={petName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {paused && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        Paused
                    </div>
                )}
            </div>

            <CardBody className="p-6">
                {/* Pet Name & Description */}
                <div className="flex items-start justify-between mb-4">
                    <Typography variant="h5" className="font-bold text-gray-900 dark:text-white">
                        {petName}
                    </Typography>
                    <Avatar
                        src={petImage}
                        alt={petName}
                        size="sm"
                        className="border-2 border-white shadow-lg"
                    />
                </div>

                <Typography className="text-gray-600 mb-6 h-8">
                    {shortDescription.slice(0, 70) + '...'}
                </Typography>

                {/* Donation Progress */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <Typography variant="small" className="font-semibold text-gray-700">
                            Raised: {formatCurrency(donatedAmount)}
                        </Typography>
                        <Typography variant="small" className="font-semibold text-gray-700">
                            Goal: {formatCurrency(maxDonationAmount)}
                        </Typography>
                    </div>
                    <Progress
                        value={progress}
                        size="lg"
                        color={progress >= 100 ? 'green' : 'amber'}
                        className="bg-gray-200"
                    />
                    <Typography variant="small" className="text-right mt-1 text-gray-500">
                        {progress}% funded
                    </Typography>
                </div>

                {/* Last Donation Date */}
                {lastDonationDate && (
                    <Typography variant="small" className="text-gray-500 italic">
                        Last donation: <span className='text-blue-600'>{new Date(lastDonationDate).toLocaleDateString()}</span>
                    </Typography>
                )}
            </CardBody>

            <CardFooter className="pt-0 pb-6 px-6">
                <div className="flex items-center">
                    {/* <Button
                        variant="outlined"
                        color="gray"
                        className="flex items-center gap-2 dark:text-white dark:border-white hover:bg-gray-100 px-4 py-2 rounded-lg"
                    >
                        <Heart size={18} className="text-red-500" />
                        <span>Save</span>
                    </Button> */}

                    <Button
                        className="flex w-full items-center justify-center gap-2 bg-primary"
                        onClick={() => navigate(`/campaign/${campaignData._id}`)}
                    >
                        <Eye size={18} />
                        See More
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default DonationCard;