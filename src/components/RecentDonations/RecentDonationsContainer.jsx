import {
    Card,
    Typography,
} from '@material-tailwind/react';
import RecentDonationCard from './RecentDonationCard';



const RecentDonationsContainer = ({ donations }) => {

    return (
        <Card className=" shadow-none dark:bg-[#1F1A33] dark:border-gray-700 dark:border-2  ">
            <Typography variant="h3" className="dark:text-white font-bold text-2xl mb-6 text-gray-900 border-b pb-2">
                Recent Donations
            </Typography>
            <div className="space-y-4">
                {donations.map((donation, index) => <RecentDonationCard index={index} donation={donation} />)}
            </div>
        </Card>
    );
};

export default RecentDonationsContainer;