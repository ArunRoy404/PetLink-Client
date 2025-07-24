import { Typography } from "@material-tailwind/react";
import { Inbox } from "lucide-react";

const NoDataFound = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <Inbox size={48} className="text-gray-400 mb-4" />
            <Typography variant="h5" className="text-gray-600 mb-2">
                No data found
            </Typography>
            <Typography variant="paragraph" className="text-gray-500">
                {message}
            </Typography>
        </div>
    );
};

export default NoDataFound;