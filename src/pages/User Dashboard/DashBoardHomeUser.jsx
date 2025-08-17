import {
    Typography,
    Card,
    CardBody,
} from "@material-tailwind/react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    AreaChart,
    Area
} from 'recharts';
import {
    Layers,
    Inbox,
    Gift,
    BarChart2,
    PawPrint,
} from 'lucide-react';
import DashboardAreaChart from '../../components/ui/Dashboard/DashboardAreaChart';
import { useAuthContext } from '../../context/AuthContext';
import { useGetPetsCountApi } from '../../axios/petsApi';
import StatCard from '../../components/ui/Dashboard/StatCard';
import { useGetAllAdoptionRequestsCountApi } from '../../axios/AdoptionApi';
import { useGetCampaignsCountApi, useGetDonationAmountApi } from '../../axios/donationApi';
import RecentActivities from '../../components/ui/Dashboard/RecentActivities';
import AdoptionChart from '../../components/ui/Dashboard/AdoptionChart';
import DonationChart from '../../components/ui/Dashboard/DonationChart';

const DashBoardHomeUser = () => {

    const { firebaseUser } = useAuthContext()
    const { getPetsCountPromise } = useGetPetsCountApi()
    const { getAllAdoptionRequestsCountPromise} = useGetAllAdoptionRequestsCountApi()
    const {getCampaignsCountPromise} = useGetCampaignsCountApi()
    const {getDonationAmountPromise} = useGetDonationAmountApi()





    return (
        <div className="space-y-6 p-4">
            {/* Welcome Banner */}
            <Card className="bg-primary overflow-hidden">
                <CardBody className="p-6 relative">
                    <div className="absolute right-0 top-0 opacity-10">
                        <PawPrint className="h-64 w-64 text-white" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <Typography variant="h4" color="white" className="mb-2 font-bold">
                                Welcome back, {firebaseUser?.displayName}! 🐾
                            </Typography>
                            <Typography color="white" className="opacity-90 max-w-md">
                                You've helped 12 pets find homes this month. Keep up the great work!
                            </Typography>
                        </div>
                        {/* <Button
                            color="white"
                            size="sm"
                            className="mt-4 md:mt-0 flex items-center gap-2 shadow-md hover:shadow-lg transition"
                        >
                            Quick Actions
                            <ArrowRight className="h-4 w-4" />
                        </Button> */}
                    </div>
                </CardBody>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<Layers className="text-primary" />} link={'/dashboard/my-added-pets'} promise={getPetsCountPromise} title={'Pets Added'} />
                <StatCard icon={<Inbox className="text-primary" />} link={'/dashboard/adoption-requests'} promise={getAllAdoptionRequestsCountPromise} title={'Adoption Requests'} />
                <StatCard icon={<Gift className="text-primary" />} link={'/dashboard/my-campaigns'} promise={getCampaignsCountPromise} title={'Campaigns'} />
                <StatCard icon={<BarChart2 className="text-primary" />} link={'/dashboard/my-campaigns'} isMoney={true} promise={getDonationAmountPromise} title={'Total Donations'} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Adoptions Chart */}
                <AdoptionChart/>

                {/* Donations Chart */}
                <DonationChart/>

            </div>

            {/* Recent Activity */}
            {/* <RecentActivities/> */}
        </div>
    );
};

export default DashBoardHomeUser;