import {
    Typography,
    Progress,
} from '@material-tailwind/react';
import { formatCurrency } from '../../utilities/formatCurrency';


const DonationProgress = ({ donatedAmount, campaignData, progress, isUrgent }) => {

    return (
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
    );
};

export default DonationProgress;