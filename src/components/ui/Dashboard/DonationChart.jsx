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
import { useGetAllCampaignsApi } from '../../../axios/donationApi';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';
import { useEffect, useState } from 'react';

const DonationChart = () => {
    const [campaignData, setCampaignData] = useState([])

    const { getAllCampaignsPromise } = useGetAllCampaignsApi()

    const { data, isLoading } = useQuery({
        queryKey: ['donationChart'],
        queryFn: () => getAllCampaignsPromise().then(res => res.data)
    })


    useEffect(() => {
        if (data?.length) {
            const array = data.map(entry => {
                const property = { name: entry?.petName, value: 0 }

                if (entry?.donations?.length) {
                    const sum = entry.donations.reduce((acc, curr) => acc + curr.amount, 0)
                    property.value = sum
                }
                return property
            })
            setCampaignData(array)
        }
    }, [data])



    // function getRandomHexColor() {
    //     return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    // }



    if (isLoading) return <Loader />

    return (
        <Card className="dark:bg-[#3b3162] overflow-hidden shadow-none border border-gray-300">
            <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <Typography variant="h6" color="blue-gray" className="dark:text-white">
                        <Gift className="inline-block h-5 w-5 mr-2 text-emerald-500" />
                        Donation Progress
                    </Typography>
                    <Button variant="text" size="sm" className="flex items-center gap-1 text-primary dark:text-white">
                        View All
                        <ArrowRight className="h-3 w-3" />
                    </Button>
                </div>
                <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={campaignData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                            />
                            <YAxis
                                // dataKey='value'
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#E5E7EB',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    fontSize: '12px'
                                }}
                                cursor={{ fill: '#EFF6FF' }}
                            />
                            <Bar
                                // type='monotone'
                                dataKey='value'
                                // stroke='#8068DF'
                                strokeWidth={3}
                                fill="#CCC2F2"
                                radius={[4, 4, 0, 0]}
                                animationDuration={1500}
                            >
                                {/* {
                                    campaignData.map((entry, i) => {
                                        return <Cell key={i} fill={getRandomHexColor()} />
                                    })
                                } */}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    );
};

export default DonationChart;