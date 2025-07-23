import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
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
    Dog,
    Cat,
    Rabbit,
    Bird,
    Fish,
    Turtle,
    Check,
    X,
    UploadCloud,
    Image as ImageIcon,
    User,
    MapPin,
    Calendar,
    AlertCircle,
    CatIcon,
    Loader2
} from 'lucide-react';
import { uploadImageToImageBB } from '../../utilities/uploadimage';
import { notifyError } from '../../ReactHotToast/ReactHotToast';
import Loader from '../../components/ui/Loader';


const AddPet = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);



    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
        trigger
    } = useForm({
        defaultValues: {
            petName: '',
            petAge: '',
            petCategory: null,
            petLocation: '',
            shortDescription: '',
            longDescription: '',
            petImage: null
        }
    });

    // Pet categories with icons
    const petCategories = [
        { value: 'dog', label: 'Dog', icon: <Dog className="w-4 h-4 mr-2" /> },
        { value: 'cat', label: 'Cat', icon: <Cat className="w-4 h-4 mr-2" /> },
        { value: 'rabbit', label: 'Rabbit', icon: <Rabbit className="w-4 h-4 mr-2" /> },
        { value: 'bird', label: 'Bird', icon: <Bird className="w-4 h-4 mr-2" /> },
        { value: 'fish', label: 'Fish', icon: <Fish className="w-4 h-4 mr-2" /> },
        { value: 'reptile', label: 'Reptile', icon: <Turtle className="w-4 h-4 mr-2" /> },
        { value: 'other', label: 'Other', icon: <PawPrint className="w-4 h-4 mr-2" /> }
    ];

    const handleImageChange = async (e) => {
        removeImage()
        setIsImageLoading(true)
        const file = e.target.files[0];


        if (file) {
            try {
                const res = await uploadImageToImageBB(file)
                if (res.status === 200) {
                    setImagePreview(res.data.data.display_url)
                    setValue('petImage', file, { shouldValidate: true });
                    trigger('petImage')
                } else {
                    notifyError("Something Went Wrong")
                }
            }
            catch (err) {
                notifyError(err.message)
            } finally {
                setIsImageLoading(false)
            }

        }
        setIsImageLoading(false)
    };

    const removeImage = () => {
        setImagePreview(null)
        setValue('petImage', null, { shouldValidate: true })
        trigger('petImage')
    };

    const onSubmit = async (data) => {
        // setIsSubmitting(true);
        // setSubmitStatus(null);

        const petData = data
        delete petData.petImage
        // delete petData.petCategory

        petData.petCategory = data.petCategory.value
        petData.petImage = imagePreview

        console.log(petData);
    };

    // Custom select component with icons
    const formatOptionLabel = ({ label, icon }) => (
        <div className="flex items-center">
            {icon}
            <span>{label}</span>
        </div>
    );

    return (
        <Card className="shadow-none">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Typography variant="h4" color="blue-gray" className="flex items-center gap-2">
                    <PawPrint className="h-6 w-6 text-primary" />
                    Add a New Pet
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Help your pet find a loving forever home
                </Typography>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Image Upload and Basic Info Row */}
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
                                                    {
                                                        imagePreview && (
                                                            <img
                                                                src={imagePreview}
                                                                alt="Preview"
                                                                className="w-full h-64 object-cover"
                                                            />
                                                        )
                                                    }
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

                        {/* Basic Info Fields */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Pet Name */}
                            <div className="space-y-2">
                                <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                                    <CatIcon className="h-5 w-5" />
                                    Pet Name
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="e.g. Max, Bella, Luna"
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

                            {/* Pet Age and Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Age
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="e.g. 2 years, 6 months"
                                        {...register('petAge', {
                                            required: 'Age is required',
                                            pattern: {
                                                value: /^[0-9]+(\s?(years?|months?))?$/i,
                                                message: 'Enter valid age (e.g. "2 years" or "6 months")'
                                            }
                                        })}
                                        error={!!errors.petAge}
                                    />
                                    {errors.petAge && (
                                        <Typography variant="small" color="red" className="flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.petAge.message}
                                        </Typography>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                                        <PawPrint className="h-5 w-5" />
                                        Category
                                    </Typography>
                                    <Controller
                                        name='petCategory'
                                        control={control}
                                        rules={{ required: 'Pet Category is needed' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={petCategories}
                                                formatOptionLabel={formatOptionLabel}
                                                onChange={selectedOption => field.onChange(selectedOption)}
                                                isClearable={true}
                                            />
                                        )}
                                    />
                                    {errors.petCategory && (
                                        <Typography variant="small" color="red" className="flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            Please select a category
                                        </Typography>
                                    )}
                                </div>
                            </div>

                            {/* Pet Location */}
                            <div className="space-y-2">
                                <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Location
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="City or address where pet can be adopted"
                                    {...register('petLocation', {
                                        required: 'Location is required',
                                        maxLength: {
                                            value: 100,
                                            message: 'Location should not exceed 100 characters'
                                        }
                                    })}
                                    error={!!errors.petLocation}
                                />
                                {errors.petLocation && (
                                    <Typography variant="small" color="red" className="flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.petLocation.message}
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
                            placeholder="Briefly describe your pet's personality"
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
                            placeholder="Tell potential adopters about:
    - Personality traits
    - Health conditions
    - Special care needs
    - Behavior with other pets/children
    - Any training received"
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
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Check className="h-5 w-5" />
                                    Submit Pet
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
                                    Error submitting form. Please try again.
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
                                    Pet added successfully!
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

export default AddPet;