
import {
    Typography,
} from '@material-tailwind/react';
import {
    Heart,
    ShieldCheck,
    Handshake,
    Gift,

} from 'lucide-react';




const AdoptBenefits = () => {
    return (
        <div className="rounded-xl">
            <Typography variant="h2" className="dark:text-white font-bold text-2xl  text-gray-900 border-b pb-2">
                Adoption Benefits with PetLink
            </Typography>

            <div className="grid md:grid-cols-2 gap-6 pt-8">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <Typography variant="h5" className="font-bold mb-3 text-blue-800 flex items-center gap-2">
                        <ShieldCheck className="text-blue-600" />
                        Health Guarantee
                    </Typography>
                    <Typography className="text-gray-700">
                        All pets come with a 30-day health guarantee. If any health issues arise within this period,
                        we'll cover veterinary costs up to $500.
                    </Typography>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <Typography variant="h5" className="font-bold mb-3 text-green-800 flex items-center gap-2">
                        <Heart className="text-green-600" />
                        Free First Vet Visit
                    </Typography>
                    <Typography className="text-gray-700">
                        Your first veterinary checkup is on us! We partner with local vets to ensure your new pet
                        gets the best start in their new home.
                    </Typography>
                </div>

                <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                    <Typography variant="h5" className="font-bold mb-3 text-amber-800 flex items-center gap-2">
                        <Gift className="text-amber-600" />
                        Starter Kit
                    </Typography>
                    <Typography className="text-gray-700">
                        Receive a free starter kit including food samples, toys, leash/collar, and care instructions
                        to help your pet settle in.
                    </Typography>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                    <Typography variant="h5" className="font-bold mb-3 text-purple-800 flex items-center gap-2">
                        <Handshake className="text-purple-600" />
                        Lifetime Support
                    </Typography>
                    <Typography className="text-gray-700">
                        Our team is always available for advice and support. We also offer discounted training
                        sessions with certified pet behaviorists.
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default AdoptBenefits;