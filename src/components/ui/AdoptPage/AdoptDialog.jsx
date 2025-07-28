import {

    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Avatar,
} from '@material-tailwind/react';
import {
    PawPrint,
    User,
    Phone,
    Home,
    Mail,
} from 'lucide-react';



import { useAuthContext } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { notifyError, notifySuccess } from '../../../ReactHotToast/ReactHotToast';
import { useCreateAdoptionApi } from '../../../axios/AdoptionApi';




const AdoptDialog = ({ openAdoptModal, setOpenAdoptModal, petData }) => {
    const { firebaseUser } = useAuthContext()
    const { createAdoptionPromise } = useCreateAdoptionApi();


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: firebaseUser?.displayName || '',
            email: firebaseUser?.email || '',
            phone: '',
            address: ''
        }
    });


    const { mutate: submitAdoption } = useMutation({
        mutationFn: createAdoptionPromise,
        onSuccess: () => {
            notifySuccess('Adoption request submitted successfully!');
            setOpenAdoptModal(false);
        },
        onError: () => {
            notifyError('Failed to submit adoption request');
        }
    });

    const onSubmit = (data) => {
        const adoptionData = {
            petId: petData._id,
            userEmail: firebaseUser.email,
            phone: data.phone,
            address: data.address,
            status: 'pending',
            requestDate: new Date()
        };
        submitAdoption(adoptionData);
    };
    return (
        <Dialog
            open={openAdoptModal}
            handler={() => setOpenAdoptModal(false)}
            size="md"
            className="rounded-lg"
        >
            <DialogHeader className="bg-primary text-white rounded-t-lg">
                Adopt {petData.petName}
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogBody className="space-y-4 p-6">
                    <Typography variant="h6" color="gray" className="mb-2">
                        We're thrilled you want to adopt {petData.petName}!
                    </Typography>

                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <Avatar
                            src={petData.petImage}
                            alt={petData.petName}
                            size="lg"
                            className="border-2 border-amber-200"
                        />
                        <div>
                            <div className='gap-10'>
                                <Typography variant="h6" className="font-bold">
                                    {petData.petName}
                                </Typography>
                                <Typography variant="p" className="font-bold text-sm opacity-70">
                                    ID: {petData._id}
                                </Typography>
                            </div>
                            <Typography variant="small" color="gray">
                                {petData.petCategory} • {petData.petAge} old
                            </Typography>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100 mt-4">
                        <Avatar
                            src={firebaseUser?.photoURL || '/default-user.jpg'}
                            size="sm"
                            className="border-2 border-white"
                        />
                        <div>
                            <Typography variant="small" className="font-semibold">
                                {firebaseUser?.displayName}
                            </Typography>
                            <Typography variant="small" color="gray">
                                {firebaseUser?.email}
                            </Typography>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <Input
                                label="Your Name"
                                icon={<User size={16} />}
                                value={firebaseUser?.displayName || ''}
                                disabled
                                {...register('userName')}
                                className="bg-gray-100"
                            />
                        </div>
                        <div>
                            <Input
                                label="Your Email"
                                icon={<Mail size={16} />}
                                value={firebaseUser?.email || ''}
                                disabled
                                {...register('email')}
                                className="bg-gray-100"
                            />
                        </div>
                    </div>
                    <div className="space-y-4 mt-6">
                        {/* Phone Input */}
                        <div>
                            <Input
                                label="Phone Number"
                                icon={<Phone size={16} />}
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9]{10,15}$/,
                                        message: 'Please enter a valid phone number'
                                    }
                                })}
                                error={!!errors.phone}
                                className="w-full"
                                containerProps={{ className: "min-w-0" }}
                                labelProps={{ className: "mb-1" }}
                            />
                            {errors.phone && (
                                <Typography variant="small" color="red" className="mt-1 ml-1">
                                    {errors.phone.message}
                                </Typography>
                            )}
                        </div>

                        {/* Address Input */}
                        <div>
                            <Input
                                label="Your Address"
                                icon={<Home size={16} />}
                                {...register('address', {
                                    required: 'Address is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Address should be at least 10 characters'
                                    }
                                })}
                                error={!!errors.address}
                                className="w-full"
                                containerProps={{ className: "min-w-0" }}
                                labelProps={{ className: "mb-1" }}
                            />
                            {errors.address && (
                                <Typography variant="small" color="red" className="mt-1 ml-1">
                                    {errors.address.message}
                                </Typography>
                            )}
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="bg-gray-50 rounded-b-lg px-6 py-4">
                    <Button
                        variant="text"
                        color="gray"
                        onClick={() => setOpenAdoptModal(false)}
                        className="mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex items-center gap-2 shadow-md bg-primary"
                    >
                        <PawPrint size={18} />
                        Submit Adoption Request
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
};

export default AdoptDialog;