import { Link, NavLink } from 'react-router';
import {
    Typography,
    Button,
    Card,
    CardBody,
    CardFooter,
    Chip
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
    ArrowRight,
    PawPrint,
    Heart,
    Clock
} from 'lucide-react';
import DashboardAreaChart from '../../components/ui/Dashboard/DashboardAreaChart';
import { useAuthContext } from '../../context/AuthContext';
import { useGetPetsCountApi } from '../../axios/petsApi';
import StatCard from '../../components/ui/Dashboard/StatCard';
import { useGetAllAdoptionRequestsCountApi } from '../../axios/AdoptionApi';
import { useGetCampaignsCountApi, useGetDonationAmountApi } from '../../axios/donationApi';
import RecentActivities from '../../components/ui/Dashboard/RecentActivities';

const DashBoardHomeUser = () => {

    const { firebaseUser } = useAuthContext()
    const { getPetsCountPromise } = useGetPetsCountApi()
    const { getAllAdoptionRequestsCountPromise} = useGetAllAdoptionRequestsCountApi()
    const {getCampaignsCountPromise} = useGetCampaignsCountApi()
    const {getDonationAmountPromise} = useGetDonationAmountApi()

    // Chart Data
    const adoptionData = [
        { name: 'Jan', adoptions: 11 },
        { name: 'Feb', adoptions: 8 },
        { name: 'Mar', adoptions: 15 },
        { name: 'Apr', adoptions: 12 },
        { name: 'May', adoptions: 18 },
    ];

    const campaignData = [
        { name: 'Max Surgery', value: 75, color: '#3B82F6' },
        { name: 'Shelter Reno', value: 45, color: '#10B981' },
        { name: 'Food Drive', value: 90, color: '#F59E0B' },
    ];


    return (
        <div className="space-y-6">
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
                <Card className="dark:bg-[#3b3162] overflow-hidden shadow-none border border-gray-300">
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <Typography variant="h6" color="blue-gray" className="dark:text-white">
                                <BarChart2 className="inline-block h-5 w-5 mr-2 text-primary" />
                                Monthly Adoptions
                            </Typography>
                            <Link to={'/dashboard/adoption-requests'}>
                                <Button variant="text" size="sm" className="flex items-center gap-1 text-primary">
                                    View All
                                    <ArrowRight className="h-3 w-3" />
                                </Button>
                            </Link>
                        </div>
                        <div className="h-[280px]">
                            <DashboardAreaChart data={adoptionData} dataKey={"adoptions"} />
                        </div>
                    </CardBody>
                </Card>


                {/* Donations Chart */}
                <Card className="dark:bg-[#3b3162] overflow-hidden">
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <Typography variant="h6" color="blue-gray" className="dark:text-white">
                                <Gift className="inline-block h-5 w-5 mr-2 text-emerald-500" />
                                Donation Progress
                            </Typography>
                            <Button variant="text" size="sm" className="flex items-center gap-1 text-blue-500">
                                View All
                                <ArrowRight className="h-3 w-3" />
                            </Button>
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={campaignData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {campaignData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => [`${value}%`, 'Progress']}
                                        contentStyle={{
                                            backgroundColor: '#FFFFFF',
                                            borderColor: '#E5E7EB',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            fontSize: '12px'
                                        }}
                                    />
                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                        wrapperStyle={{ paddingTop: '20px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Recent Activity */}
            {/* <RecentActivities/> */}
        </div>
    );
};

export default DashBoardHomeUser;