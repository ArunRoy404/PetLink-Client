import { Typography } from "@material-tailwind/react";
import CountUp from "react-countup";


const StatsCard = ({ stat }) => {
    return (
        <div
            className="bg-white dark:bg-[#121212] p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition duration-300"
        >
            <stat.icon className="w-8 h-8 text-primary mb-3 mx-auto" />
            <Typography
                variant="h4"
                className="mb-1 text-primary"
                placeholder=""
            >
                <CountUp end={stat.value} enableScrollSpy={true} />
                {stat.percentage ? "%" : "+"}
            </Typography>
            <Typography
                variant="small"
                className="text-gray-600 dark:text-gray-300"
                placeholder=""
            >
                {stat.label}
            </Typography>
        </div>
    );
};

export default StatsCard;