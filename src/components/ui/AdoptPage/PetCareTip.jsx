import { Typography } from '@material-tailwind/react';
import { CheckCircle } from 'lucide-react';


const PetCareTip = ({petData}) => {

    // Sample care tips based on pet type
    const getCareTips = () => {
        if (petData.petCategory.toLowerCase().includes('dog')) {
            return [
                "Daily walks (at least 30 minutes)",
                "Regular brushing (2-3 times weekly)",
                "Annual vet checkups recommended",
                "Positive reinforcement training works best"
            ];
        } else if (petData.petCategory.toLowerCase().includes('cat')) {
            return [
                "Provide scratching posts",
                "Keep litter box clean",
                "Regular play sessions (15 mins daily)",
                "Annual vet checkups recommended"
            ];
        } else {
            return [
                "Species-appropriate habitat needed",
                "Research specific dietary needs",
                "Handle with care and proper support",
                "Regular vet checkups recommended"
            ];
        }
    };

    return (
        <div className="rounded-xl">
            <Typography variant="h2" className="dark:text-white font-bold text-2xl mb-6 text-gray-900 border-b pb-2">
                Care Tips for {petData.petName}
            </Typography>
            <div className="grid md:grid-cols-2 gap-4">
                {getCareTips().map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                        <Typography className="text-gray-700">
                            {tip}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetCareTip;