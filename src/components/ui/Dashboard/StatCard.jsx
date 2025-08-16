import {
    Typography,
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import {
    ArrowRight,

} from 'lucide-react';
import { NavLink } from "react-router";
import Loader from "../Loader";
const StatCard = ({ icon, title, link, promise, isMoney=false }) => {

    const { data: value, isLoading } = useQuery({
        queryKey: [title],
        queryFn: () => promise().then((res) => res.data || 0)
    })
    return (
        <Card
            className="hover:shadow-lg transition-shadow hover:border-primary dark:bg-[#3b3162] dark:hover:border-gray-600 border border-transparent"
        >
            <CardBody className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-background dark:bg-gray-000`}>
                        {icon}
                    </div>
                </div>
                <Typography variant="h3" className="dark:text-white mb-1">
                    {
                        isLoading
                            ? <Loader />
                            : isMoney
                                ? '$' + value
                                : value
                    }
                </Typography>
                <Typography variant="paragraph" className="text-gray-600 dark:text-gray-400">
                    {title}
                </Typography>
            </CardBody>
            <CardFooter className="p-4 pt-0">
                <NavLink
                    to={link}
                    className="text-sm font-medium text-primary transition flex items-center gap-1"
                >
                    View details
                    <ArrowRight className="h-3 w-3" />
                </NavLink>
            </CardFooter>
        </Card>
    );
};

export default StatCard;