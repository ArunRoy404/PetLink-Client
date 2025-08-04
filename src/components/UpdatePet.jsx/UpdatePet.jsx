import { useEffect, useState } from 'react';
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
import { uploadImageToImageBB } from '../../utilities/uploadImage';
import { notifyError, notifySuccess, notifyWarn } from '../../ReactHotToast/ReactHotToast';
import Loader from '../../components/ui/Loader';
import { useGetPetInfoApi, useUpdatePetApi } from '../../axios/petsApi';
import { useAuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import NoDataFound from '../ui/NoDataFound';
import FormSkeleton from '../ui/FormSkeleton/FormSkeleton';
import RichTextEditor from '../ui/RichTextEditor/RichTextEditor';




const UpdatePet = () => {
    const [petData, setPetData] = useState(null)
    const [petDataLoading, setPetDataLoading] = useState(true)
    const [imagePreview, setImagePreview] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [description, setDescription] = useState('')
    const { firebaseUser } = useAuthContext()
    const { getPetInfoPromise } = useGetPetInfoApi()
    const { updatePetPromise } = useUpdatePetApi()
    const { id } = useParams()

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


    useEffect(() => {
        getPetInfoPromise(id)
            .then(res => {
                setPetData(res.data)
            })
            .catch(() => {
                notifyError('Error loading pet data')
            })
            .finally(() => {
                setPetDataLoading(false)
            })
    }, [])


    useEffect(() => {
        if (petData) {
            reset({ ...petData })
            setImagePreview(petData.petImage)
            setDescription(petData.longDescription)
            const selectedCategory = petCategories.find(category => category.value == petData.petCategory)
            setValue('petCategory', selectedCategory, {
                shouldValidate: true
            })
        }
    }, [petData, reset])



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

    const handleDescriptionChange = (data) => {
        setDescription(data)
        setValue('longDescription', data)

        if (data === '') {
            setValue('longDescription', null, { shouldValidate: true })
        }
    }


    const removeImage = () => {
        setImagePreview(null)
        setValue('petImage', null, { shouldValidate: true })
        trigger('petImage')
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        const updatePetData = data
        delete updatePetData.petImage

        updatePetData.addedBy = firebaseUser?.email
        updatePetData.petCategory = data.petCategory.value
        updatePetData.petImage = imagePreview
        

        updatePetPromise(updatePetData)
            .then(res => {
                if (res.data.modifiedCount) {
                    notifySuccess("Pet Updated Successfully")
                    setSubmitStatus('success')
                } else {
                    notifyWarn("No information Changed")
                    setSubmitStatus('error')
                }
            })
            .catch(err => {
                setSubmitStatus('error')
                notifyError(err.message)
            })
            .finally(() => {
                setIsSubmitting(false)
            })

    };

    // Custom select component with icons
    const formatOptionLabel = ({ label, icon }) => (
        <div className="flex items-center">
            {icon}
            <span>{label}</span>
        </div>
    );

    if (petDataLoading) {
        return <FormSkeleton />
    }

    if (!petData) {
        return <NoDataFound message={'Pet dose not exist'} />
    }


    return (
        <Card className="shadow-none">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Typography variant="h4" color="blue-gray" className="flex items-center gap-2">
                    <PawPrint className="h-6 w-6 text-primary" />
                    Update Pet Information
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

                        <RichTextEditor
                            className={`border border-black/50 rounded-md ${errors.longDescription ? 'border-red-400' : ''}`}
                            content={description}
                            onChange={handleDescriptionChange}
                        />

                        {errors.longDescription && (
                            <Typography variant="small" color="red" className="flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {errors.longDescription.message}
                            </Typography>
                        )}
                        <textarea
                            size="lg"
                            className='hidden'
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
                            rows={6}
                        />

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
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Check className="h-5 w-5" />
                                    update Pet
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
                                    Error Updating form. Please try again.
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
                                    Pet Updated successfully!
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

export default UpdatePet;