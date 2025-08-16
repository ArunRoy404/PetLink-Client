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

const DashBoardHomeUser = () => {

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

    const stats = [
        {
            title: "Pets Added",
            value: "24",
            change: "+5%",
            link: "/dashboard/my-pets",
            icon: <Layers className="text-blue-500" />,
            trend: 'up'
        },
        {
            title: "Adoption Requests",
            value: "8",
            change: "+12%",
            link: "/dashboard/adoption-requests",
            icon: <Inbox className="text-purple-500" />,
            trend: 'up'
        },
        {
            title: "Active Campaigns",
            value: "3",
            change: "+2",
            link: "/dashboard/my-campaigns",
            icon: <Gift className="text-amber-500" />,
            trend: 'up'
        },
        {
            title: "Total Donations",
            value: "$1,240",
            change: "+18%",
            link: "/dashboard/donations",
            icon: <BarChart2 className="text-emerald-500 dark:text-white" />,
            trend: 'up'
        },
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
                                Welcome back, John! 🐾
                            </Typography>
                            <Typography color="white" className="opacity-90 max-w-md">
                                You've helped 12 pets find homes this month. Keep up the great work!
                            </Typography>
                        </div>
                        <Button
                            color="white"
                            size="sm"
                            className="mt-4 md:mt-0 flex items-center gap-2 shadow-md hover:shadow-lg transition"
                        >
                            Quick Actions
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-lg transition-shadow hover:border-blue-100 dark:bg-[#3b3162] dark:hover:border-gray-600 border border-transparent"
                    >
                        <CardBody className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-green-50 dark:bg-gray-700' : 'bg-red-50 dark:bg-gray-700'}`}>
                                    {stat.icon}
                                </div>
                                <Chip
                                    value={stat.change}
                                    color={stat.change.includes('+') ? 'green' : 'red'}
                                    size="sm"
                                    className="rounded-full"
                                    icon={
                                        stat.change.includes('+') ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )
                                    }
                                />
                            </div>
                            <Typography variant="h3" className="dark:text-white mb-1">
                                {stat.value}
                            </Typography>
                            <Typography variant="paragraph" className="text-gray-600 dark:text-gray-400">
                                {stat.title}
                            </Typography>
                        </CardBody>
                        <CardFooter className="p-4 pt-0">
                            <NavLink
                                to={stat.link}
                                className="text-sm font-medium text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition flex items-center gap-1"
                            >
                                View details
                                <ArrowRight className="h-3 w-3" />
                            </NavLink>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Adoptions Chart */}
                <Card className="dark:bg-[#3b3162] overflow-hidden">
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
            <Card className="dark:bg-[#3b3162]">
                <CardBody className="p-6">
                    <Typography variant="h6" color="blue-gray" className="mb-6 dark:text-white">
                        <Clock className="inline-block h-5 w-5 mr-2 text-amber-500" />
                        Recent Activity
                    </Typography>
                    <div className="space-y-4">
                        {[
                            {
                                action: "New adoption request",
                                pet: "Max (Golden Retriever)",
                                time: "2 hours ago",
                                icon: <Inbox className="h-5 w-5 text-blue-500" />
                            },
                            {
                                action: "Donation received",
                                pet: "For Bella's treatment",
                                time: "5 hours ago",
                                icon: <Gift className="h-5 w-5 text-emerald-500" />
                            },
                            {
                                action: "Pet marked as adopted",
                                pet: "Whiskers (Tabby Cat)",
                                time: "1 day ago",
                                icon: <Heart className="h-5 w-5 text-pink-500" />
                            }
                        ].map((activity, index) => (
                            <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mt-1">
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <Typography variant="paragraph" className="font-medium dark:text-white">
                                        {activity.action}
                                    </Typography>
                                    <Typography variant="small" className="text-gray-600 dark:text-gray-400">
                                        {activity.pet} • {activity.time}
                                    </Typography>
                                </div>
                                <Button variant="text" size="sm" className="text-blue-500">
                                    View
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default DashBoardHomeUser;