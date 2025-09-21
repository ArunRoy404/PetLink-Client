import { Chip } from "@material-tailwind/react";
import { AlertCircle } from "lucide-react";

const DonationPetImage = ({ campaignData, isUrgent }) => {
    return (
        <div className="relative h-96 lg:h-auto">
            <img
                src={campaignData.petImage}
                alt={campaignData.petName}
                className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
                {campaignData.paused && (
                    <Chip
                        value="Paused"
                        color="red"
                        className="font-bold shadow-md flex items-center"
                        icon={<AlertCircle size={16} className="mr-1" />}
                    />
                )}
                {isUrgent && (
                    <Chip
                        value="Urgent Need"
                        color="amber"
                        className="font-bold shadow-md"
                    />
                )}
            </div>
        </div>
    );
};

export default DonationPetImage;