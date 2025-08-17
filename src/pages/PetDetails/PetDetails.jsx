import { useState } from 'react';
import './PetDetails.css'
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    CardBody,
    Typography,
    Button,
    Chip,
} from '@material-tailwind/react';
import {
    MapPin,
    CalendarDays,
    Heart,
    Droplet,
    ShieldCheck,
    Handshake,
    Bell,
    Gift,

} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useGetPetInfoApi } from '../../axios/petsApi';
import AdoptBenefits from '../../components/ui/AdoptPage/AdoptBenefits';
import AdoptTerms from '../../components/ui/AdoptPage/AdoptTerms';
import PetCareTip from '../../components/ui/AdoptPage/PetCareTip';
import AdoptHelp from '../../components/ui/AdoptPage/AdoptHelp';
import AdoptDialog from '../../components/ui/AdoptPage/AdoptDialog';
import { useAuthContext } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';
import Loader from '../../components/ui/Loader';
import RichTextEditor from '../../components/ui/RichTextEditor/RichTextEditor';

// Pet traits with icons and colors
const PET_TRAITS = [
    { label: "Healthy", icon: ShieldCheck, color: "bg-green-100", textColor: "text-green-800" },
    { label: "Neat", icon: Droplet, color: "bg-blue-100", textColor: "text-blue-800" },
    { label: "Vocal", icon: Bell, color: "bg-purple-100", textColor: "text-purple-800" },
    { label: "Friendly", icon: Handshake, color: "bg-amber-100", textColor: "text-amber-800" },
    { label: "Playful", icon: Gift, color: "bg-pink-100", textColor: "text-pink-800" },
    { label: "Vaccinated", icon: Heart, color: "bg-teal-100", textColor: "text-teal-800" }
];


const PetDetails = () => {
    const { petId } = useParams();
    const [openAdoptModal, setOpenAdoptModal] = useState(false);
    const { getPetInfoPromise } = useGetPetInfoApi();
    const navigate = useNavigate()
    const { firebaseUser } = useAuthContext()
    const { isDark } = useThemeContext()

    // Fetch pet details
    const { data: petData, isLoading } = useQuery({
        queryKey: ['pet', petId],
        queryFn: () => getPetInfoPromise(petId).then(res => res.data),
    });


    if (isLoading) return (
        <div className="flex justify-center items-center dark:bg-gradient-to-t dark:from-[#121212] dark:to-[#1F1A33] h-screen">
            {
                isDark
                    ? <Loader size={30} color='white' />
                    : <Loader size={30} />
            }
        </div>
    );

    if (!petData) return <div className="text-center py-20">Pet not found</div>;

    return (
        <div>
            <div className='pt-40 bg-gradient-to-b from-surface dark:bg-gradient-to-t  dark:from-[#342e4e] dark:to-[#121212] pb-16 '>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    {/* Pet Details Card */}
                    <Card className="overflow-hidden shadow-none border-2 border-gray-300 ">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Pet Image */}
                            <div className="relative h-96 lg:h-auto">
                                <img
                                    src={petData.petImage}
                                    alt={petData.petName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Chip
                                        value={petData.petCategory}
                                        color="amber"
                                        className="capitalize font-bold shadow-md"
                                    />
                                </div>
                            </div>

                            {/* Pet Info */}
                            <CardBody className="p-8 bg-gradient-to-br from-gray-50 to-white">
                                <Typography variant="h1" className="font-bold text-3xl mb-2 text-gray-900">
                                    {petData.petName}
                                </Typography>

                                {/* information  */}
                                <div>
                                    <div className='flex items-center justify-between mb-8'>
                                        <div>
                                            <h2 className='font-bold'>Address</h2>
                                            <div className="flex items-center gap-1 text-gray-700  py-1 rounded-full">
                                                <MapPin size={16} className="text" />
                                                <Typography variant="small" className="font-medium">{petData.petLocation}</Typography>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className='font-bold'>Age</h2>
                                            <div className="flex items-center gap-1 text-gray-700  py-1 rounded-full">
                                                <CalendarDays size={16} className="" />
                                                <Typography variant="small" className="font-medium">{petData.petAge} old</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pet Traits */}
                                <div className="mb-8">
                                    <Typography variant="h5" className="font-bold mb-4 text-gray-800">
                                        Characteristics
                                    </Typography>
                                    <div className="grid grid-cols-3 gap-3">
                                        {PET_TRAITS.map((trait, index) => {
                                            const Icon = trait.icon;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`${trait.color} ${trait.textColor} h-20  rounded-lg flex flex-col items-center justify-center text-center `}
                                                >
                                                    <Icon size={24} className="mb-2" />
                                                    <Typography variant="small" className="font-semibold">
                                                        {trait.label}
                                                    </Typography>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Long Description with Scroll */}
                                <div className="mb-8">
                                    <Typography variant="h5" className="font-bold mb-3 text-gray-800">
                                        About {petData.petName}
                                    </Typography>
                                    <div className="max-h-60 overflow-y-auto pr-3 custom-scrollbar">
                                        <RichTextEditor content={petData.longDescription} viewOnly={true} />
                                    </div>
                                </div>

                                {
                                    petData.addedBy !== firebaseUser?.email
                                        ? <Button
                                            size="lg"
                                            className="flex bg-primary w-full items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all mt-4"
                                            disabled={petData.adopted}
                                            onClick={() => setOpenAdoptModal(true)}
                                        >
                                            <Heart size={20} className="fill-current" />
                                            {
                                                petData.adopted
                                                    ? 'Adopted'
                                                    : `Adopt ${petData.petName}`
                                            }
                                        </Button>
                                        : <Button
                                            size="lg"
                                            className="flex bg-primary w-full items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all mt-4"
                                            onClick={() => navigate('/dashboard/my-added-pets')}
                                        >
                                            See your added pets
                                        </Button>
                                }
                            </CardBody>
                        </div>
                    </Card>
                </div>
            </div>


            <div className='container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 mb-10'>
                <div className='dark:bg-gradient-to-b  dark:from-[#342e4e] dark:to-[#121212] '>
                    <AdoptBenefits />
                </div>

                <div className='dark:bg-gradient-to-t  dark:from-[#342e4e] dark:to-[#121212] '>
                    {/* Pet Care Tips */}
                    <PetCareTip petData={petData} />
                </div>

                <div className='dark:bg-gradient-to-b  dark:from-[#342e4e] dark:to-[#121212] '>
                    {/* Terms and Conditions Section */}
                    <AdoptTerms />
                </div>

                <div className='dark:bg-gradient-to-t  dark:from-[#342e4e] dark:to-[#121212]'>
                    {/* Contact Support */}
                    <AdoptHelp petData={petData} />
                </div>
            </div>

            {/* Adoption Form Modal */}
            <AdoptDialog petData={petData} openAdoptModal={openAdoptModal} setOpenAdoptModal={setOpenAdoptModal} />
        </div>
    );
};

export default PetDetails;