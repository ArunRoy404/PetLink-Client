import { Card, Typography } from "@material-tailwind/react";
import { Gift, ShieldCheck, Users } from "lucide-react";


const DonationBenefit = () => {
    return (
        <Card className="shadow-none dark:bg-[#1F1A33] dark:border-2 dark:border-gray-700 ">
            <Typography variant="h3" className="font-bold text-2xl mb-6 text-gray-900 border-b pb-2 dark:text-white">
                How Your Donation Helps
            </Typography>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    {
                        icon: <ShieldCheck size={32} className="text-green-600" />,
                        title: "Medical Care",
                        description: "Funds go directly to veterinary treatments and medications"
                    },
                    {
                        icon: <Gift size={32} className="text-blue-600" />,
                        title: "Daily Needs",
                        description: "Provides food, shelter, and essential supplies"
                    },
                    {
                        icon: <Users size={32} className="text-purple-600" />,
                        title: "Rescue Operations",
                        description: "Supports our team in saving more animals"
                    }
                ].map((item, index) => (
                    <div key={index} className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            {item.icon}
                        </div>
                        <Typography variant="h5" className="font-bold mb-2 dark:text-white/80">
                            {item.title}
                        </Typography>
                        <Typography className="text-gray-700 dark:text-white/60">
                            {item.description}
                        </Typography>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default DonationBenefit;