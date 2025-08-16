import { Button, Typography } from '@material-tailwind/react';
import { MessageSquare, Phone } from 'lucide-react';

const AdoptHelp = ({petData}) => {
    return (
        <div className=" rounded-xl shadow-none">
            <Typography variant="h2" className="dark:text-white font-bold text-2xl mb-6 text-gray-900 border-b pb-2">
                Need Help Deciding?
            </Typography>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <Typography variant="h5" className="font-bold mb-3 text-blue-800 flex items-center gap-2">
                        <MessageSquare className="text-blue-600" />
                        Chat with Our Team
                    </Typography>
                    <Typography className="text-gray-700 mb-4">
                        Our adoption specialists are available to answer any questions about {petData.petName} or the adoption process.
                    </Typography>
                    <Button color="blue" size="sm" className="flex items-center gap-2">
                        Start Live Chat
                    </Button>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <Typography variant="h5" className="font-bold mb-3 text-green-800 flex items-center gap-2">
                        <Phone className="text-green-600" />
                        Schedule a Call
                    </Typography>
                    <Typography className="text-gray-700 mb-4">
                        Prefer to talk? Schedule a callback at your convenience to discuss {petData.petName}'s needs.
                    </Typography>
                    <Button color="green" size="sm" className="flex items-center gap-2">
                        Request Callback
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdoptHelp;