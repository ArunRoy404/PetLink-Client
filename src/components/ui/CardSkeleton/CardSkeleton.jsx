import { Card, CardBody } from '@material-tailwind/react';


const CardSkeleton = () => {
    return (
        <Card className="animate-pulse shadow-none border-2">
            <div className="h-48 rounded-t-lg bg-gray-200"></div>
            <CardBody className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
            </CardBody>
        </Card>
    );
};

export default CardSkeleton;