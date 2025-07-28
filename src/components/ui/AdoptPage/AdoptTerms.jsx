
import {
    Typography,
} from '@material-tailwind/react';
import {
    CalendarDays,
    Heart,
    Home,
    Shield,
} from 'lucide-react';



const AdoptTerms = () => {
    return (
        <div className="container mx-auto px-4  rounded-xl shadow-none p-8">
            <Typography variant="h2" className="font-bold text-2xl mb-6 text-gray-900 border-b pb-2">
                Adoption Terms & Conditions
            </Typography>

            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Shield size={20} className="text-amber-600" />
                    </div>
                    <div>
                        <Typography variant="h6" className="font-semibold text-gray-800">
                            Eligibility Requirements
                        </Typography>
                        <Typography className="text-gray-700">
                            Adopters must be at least 21 years old, provide valid identification, and demonstrate the ability
                            to care for the pet financially and physically.
                        </Typography>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Home size={20} className="text-amber-600" />
                    </div>
                    <div>
                        <Typography variant="h6" className="font-semibold text-gray-800">
                            Home Environment
                        </Typography>
                        <Typography className="text-gray-700">
                            Your home must be safe and appropriate for the specific pet. Some pets may require a home visit
                            before finalizing adoption.
                        </Typography>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Heart size={20} className="text-amber-600" />
                    </div>
                    <div>
                        <Typography variant="h6" className="font-semibold text-gray-800">
                            Return Policy
                        </Typography>
                        <Typography className="text-gray-700">
                            If you can no longer care for your pet, you must return them to PetLink. Rehoming or surrendering
                            to another party is prohibited.
                        </Typography>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <CalendarDays size={20} className="text-amber-600" />
                    </div>
                    <div>
                        <Typography variant="h6" className="font-semibold text-gray-800">
                            Follow-up Checks
                        </Typography>
                        <Typography className="text-gray-700">
                            PetLink reserves the right to conduct follow-up checks (with notice) to ensure the pet is being
                            properly cared for during the first year.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdoptTerms;