
import {
    Typography,
    Button,
    Card,
    CardBody,
} from "@material-tailwind/react";
import {
    Inbox,
    Gift,
    Heart,
    Clock
} from 'lucide-react';

const RecentActivities = () => {
    return (
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
    );
};

export default RecentActivities;