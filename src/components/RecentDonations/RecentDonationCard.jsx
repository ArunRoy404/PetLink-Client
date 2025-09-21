import {
    Typography,
    Avatar,
} from '@material-tailwind/react';
import { formatCurrency } from '../../utilities/formatCurrency';


const RecentDonationCard = ({ index, donation }) => {

    return (
        <div className="flex items-center justify-between dark:bg-gray-700 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 ">

                {/* avatar  */}
                <Avatar
                    src={`https://i.pravatar.cc/150?img=${index + 10}`}
                    size="sm"
                    className="border-2 border-white"
                />

                {/* donor info */}
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

            {/* donation amount and date  */}
            <div className="text-right">
                <Typography variant="h6" className="font-bold text-amber-700">
                    {formatCurrency(donation.amount)}
                </Typography>
                <Typography variant="small" className="text-gray-500">
                    {new Date(donation.createdAt).toLocaleDateString()}
                </Typography>
            </div>
        </div>
    );
};

export default RecentDonationCard;