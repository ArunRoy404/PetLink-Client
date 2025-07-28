import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Typography,
    Input,
    Textarea,
    Chip,
    IconButton
} from '@material-tailwind/react';
import {
    PawPrint,
    DollarSign,
    Calendar as CalendarIcon,
    AlertCircle,
    Check,
    X,
    UploadCloud,
    Image as ImageIcon,
    Loader2,
    HeartHandshake
} from 'lucide-react';
import { uploadImageToImageBB } from '../../utilities/uploadImage';
import { notifyError, notifySuccess, notifyWarn } from '../../ReactHotToast/ReactHotToast';
import Loader from '../../components/ui/Loader';

import { useAuthContext } from '../../context/AuthContext';
import { useAddDonationCampaignApi } from '../../axios/donationApi';

const CreateDonationCampaign = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const { addDonationCampaignPromise } = useAddDonationCampaignApi();
    const { firebaseUser } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        trigger
    } = useForm({
        defaultValues: {
            petName: '',
            petImage: null,
            maxDonationAmount: '',
            lastDonationDate: '',
            shortDescription: '',
            longDescription: ''
        }
    });

    const handleImageChange = async (e) => {
        removeImage();
        setIsImageLoading(true);
        const file = e.target.files[0];

        if (file) {
            try {
                const res = await uploadImageToImageBB(file);
                if (res.status === 200) {
                    setImagePreview(res.data.data.display_url);
                    setValue('petImage', file, { shouldValidate: true });
                    trigger('petImage');
                } else {
                    notifyError("Something Went Wrong");
                }
            } catch (err) {
                notifyError(err.message);
            } finally {
                setIsImageLoading(false);
            }
        }
        setIsImageLoading(false);
    };

    const removeImage = () => {
        setImagePreview(null);
        setValue('petImage', null, { shouldValidate: true });
        trigger('petImage');
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        const campaignData = {
            ...data,
            addedBy: firebaseUser?.email,
            petImage: imagePreview,
            createdAt: new Date().toISOString()
        };

        addDonationCampaignPromise(campaignData)
            .then(res => {
                if (res.data.insertedId) {
                    notifySuccess("Donation campaign created successfully!");
                    setSubmitStatus('success');
                } else {
                    notifyWarn("Failed to create donation campaign");
                    setSubmitStatus('error');
                }
            })
            .catch(err => {
                setSubmitStatus('error');
                notifyError(err.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <Card className="shadow-none">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Typography variant="h4" color="blue-gray" className="flex items-center gap-2">
                    <HeartHandshake className="h-6 w-6 text-primary" />
                    Create Donation Campaign
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Help pets in need by creating a donation campaign
                </Typography>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Image Upload and Campaign Details Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Image Upload */}
                        <div className="lg:col-span-1">
                            <div className="space-y-2">
                                <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                                    <ImageIcon className="h-5 w-5" />
                                    Pet Photo
                                </Typography>
                                <div className="relative">
                                    <div>
                                        <label
                                            htmlFor="petImage"
                                            className={`min-h-40 md:min-h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer overflow-hidden
                                                        ${errors.petImage ? 'border-red-500' : 'border-gray-300 hover:border-blue-500'} 
                                                        transition-colors bg-gray-50 dark:bg-gray-800`}
                                        >
                                            {imagePreview || isImageLoading ? (
                                                <>
                                                    {imagePreview && (
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-64 object-cover"
                                                        />
                                                    )}
                                                    {isImageLoading && (
                                                        <div className="flex flex-col gap-2 items-center justify-center">
                                                            <Loader size={32} />
                                                            <Typography variant="small" color="gray">
                                                                Uploading...
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-6 text-center">
                                                    <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                                                    <Typography variant="small" color="gray">
                                                        Click to upload
                                                    </Typography>
                                                </div>
                                            )}
                                        </label>
                                        <input
                                            id='petImage'
                                            type="file"
                                            accept="image/*"
                                            className='hidden'
                                            onChange={handleImageChange}
                                        />
                                        <input type='hidden' {...register('petImage', { required: 'Pet Image is Required' })} />
                                    </div>
                                    <div className="absolute -top-2 -right-2 ">
                                        {imagePreview && !isImageLoading && (
                                            <IconButton
                                                size="sm"
                                                color="red"
                                                variant="gradient"
                                                className='rounded-full shadow-md'
                                                onClick={removeImage}
                                            >
                                                <X className="h-4 w-4" />
                                            </IconButton>
                                        )}
                                    </div>
                                </div>
                                {errors.petImage && (
                                    <Typography variant="small" color="red" className="flex items-center gap-1 mt-2">
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.petImage.message}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        {/* Campaign Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Pet Name */}
                            <div className="space-y-2">
                                <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                                    <PawPrint className="h-5 w-5" />
                                    Pet Name
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Enter the pet's name"
                                    {...register('petName', {
                                        required: 'Pet name is required',
                                        maxLength: {
                                            value: 30,
                                            message: 'Name should not exceed 30 characters'
                                        }
                                    })}
                                    error={!!errors.petName}
                                    icon={<PawPrint className="h-5 w-5" />}
                                />
                                {errors.petName && (
                                    <Typography variant="small" color="red" className="flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.petName.message}
                                    </Typography>
                                )}
                            </div>

                            {/* Maximum Donation Amount */}
                            <div className="space-y-2">
                                <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Maximum Donation Amount
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Enter the maximum donation amount"
                                    type="number"
                                    min="1"
                                    {...register('maxDonationAmount', {
                                        required: 'Maximum donation amount is required',
                                        min: {
                                            value: 1,
                                            message: 'Amount must be at least $1'
                                        },
                                        valueAsNumber: true
                                    })}
                                    error={!!errors.maxDonationAmount}
                                    icon={<DollarSign className="h-5 w-5" />}
                                />
                                {errors.maxDonationAmount && (
                                    <Typography variant="small" color="red" className="flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.maxDonationAmount.message}
                                    </Typography>
                                )}
                            </div>

                            {/* Last Donation Date */}
                            <div className="space-y-2">
                                <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                                    <CalendarIcon className="h-5 w-5" />
                                    Last Donation Date
                                </Typography>
                                <div className="relative" >
                                    <Input
                                        type="date"
                                        size="lg"
                                        {...register('lastDonationDate', {
                                            required: 'Last donation date is required',
                                            validate: {
                                                futureDate: (value) => {
                                                    const selectedDate = new Date(value);
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);
                                                    return selectedDate >= today || 'Date must be in the future';
                                                }
                                            }
                                        })}
                                        error={!!errors.lastDonationDate}
                                        icon={<CalendarIcon className="h-5 w-5" />}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="cursor-pointer"
                                        containerProps={{ className: "min-w-0" }}
                                        onFocus={(e) => e.target.showPicker()}
                                    />
                                </div>
                                {errors.lastDonationDate && (
                                    <Typography variant="small" color="red" className="flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.lastDonationDate.message}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Short Description */}
                    <div className="space-y-2">
                        <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                            <PawPrint className="h-5 w-5" />
                            Short Description
                            <Typography variant="small" color="gray" className="inline ml-2">
                                (Max 150 characters)
                            </Typography>
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Briefly describe the purpose of this donation campaign"
                            {...register('shortDescription', {
                                required: 'Short description is required',
                                maxLength: {
                                    value: 150,
                                    message: 'Should not exceed 150 characters'
                                }
                            })}
                            error={!!errors.shortDescription}
                        />
                        {errors.shortDescription && (
                            <Typography variant="small" color="red" className="flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {errors.shortDescription.message}
                            </Typography>
                        )}
                    </div>

                    {/* Long Description */}
                    <div className="space-y-2">
                        <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                            <PawPrint className="h-5 w-5" />
                            Detailed Information
                        </Typography>
                        <Textarea
                            size="lg"
                            placeholder="Provide more details about:
    - The pet's condition or situation
    - How the donations will be used
    - Any specific needs or treatments required
    - The impact donations will make"
                            {...register('longDescription', {
                                required: 'Detailed information is required',
                                minLength: {
                                    value: 50,
                                    message: 'Should be at least 50 characters'
                                },
                                maxLength: {
                                    value: 1000,
                                    message: 'Should not exceed 1000 characters'
                                }
                            })}
                            error={!!errors.longDescription}
                            rows={6}
                        />
                        {errors.longDescription && (
                            <Typography variant="small" color="red" className="flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {errors.longDescription.message}
                            </Typography>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4 pt-6">
                        <Button
                            variant="outlined"
                            color="gray"
                            size="lg"
                            onClick={() => {
                                reset();
                                setImagePreview(null);
                            }}
                            disabled={isSubmitting}
                            className="flex items-center gap-2"
                        >
                            <X className="h-5 w-5" />
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color=""
                            size="lg"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-primary"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Creating Campaign...
                                </>
                            ) : (
                                <>
                                    <HeartHandshake className="h-5 w-5" />
                                    Create Campaign
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Form Status */}
                    {submitStatus === 'error' && (
                        <Chip
                            color="red"
                            value={
                                <div className="flex items-center gap-2">
                                    <X className="h-5 w-5" />
                                    Error creating campaign. Please try again.
                                </div>
                            }
                            className="rounded-full mt-6"
                        />
                    )}
                    {submitStatus === 'success' && (
                        <Chip
                            color="green"
                            value={
                                <div className="flex items-center gap-2">
                                    <Check className="h-5 w-5" />
                                    Campaign created successfully!
                                </div>
                            }
                            className="rounded-full mt-6"
                        />
                    )}
                </form>
            </CardBody>
        </Card>
    );
};

export default CreateDonationCampaign;