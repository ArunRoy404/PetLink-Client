import { Link } from 'react-router';
import {
    Typography,
    Button,
    Card,
    CardBody,
} from "@material-tailwind/react";

import {
    BarChart2,
    ArrowRight,
} from 'lucide-react';
import DashboardAreaChart from './DashboardAreaChart';



const AdoptionChart = () => {
    // Chart Data
    const adoptionData = [
        { name: 'Jan', adoptions: 11 },
        { name: 'Feb', adoptions: 8 },
        { name: 'Mar', adoptions: 15 },
        { name: 'Apr', adoptions: 12 },
        { name: 'May', adoptions: 18 },
    ];

    return (
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
    );
};

export default AdoptionChart;