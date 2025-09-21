import React, { useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Typography,
    Checkbox,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import {
    Mail,
    Lock,
    Github,
    CircleUserRound,
    Eye,
    EyeOff,
    Image as ImageIcon,
    User,
} from "lucide-react";
import axios from 'axios';
import Avatar from "../../components/ui/Avatar";
import { Link, useLocation, useNavigate } from "react-router";
import { notifyError, notifySuccess } from "../../ReactHotToast/ReactHotToast";
import { useAuthContext } from "../../context/AuthContext";
import { bouncy } from 'ldrs'
import SocialLogin from "../../components/ui/SocialLogin";
bouncy.register()



export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [imageLoading, setImageLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [photoURL, setPhotoURL] = useState(null);
    const { createUser, updateUserProfile, saveUserToDB } = useAuthContext()

    const navigate = useNavigate()
    const location = useLocation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, name, password } = data
        const userData = { email, displayName: name, photoURL }
        setLoading(true)
        setError('')

        createUser(email, password)
            .then(() => {
                updateUserProfile(userData)
                    .then(() => {
                        notifySuccess("User Sign Up Successful")
                        saveUserToDB(userData)
                        navigate(location.state || '/')
                    })
            })
            .catch(err => {
                setError(err)
                notifyError("User Sign Up Failed")
            })
            .finally(() => setLoading(false))
    };

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        const imgbbApiKey = import.meta.env.VITE_imgbb_apiKey

        const formData = new FormData()
        formData.append('image', file)

        try {
            setImageLoading(true)
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData)
            if (res.status === 200) {
                setPhotoURL(res.data.data.display_url)
            } else {
                notifyError('Something Went Wrong!')
            }
        }
        catch (err) {
            notifyError(err.message)
        }
        finally {
            setImageLoading(false)
        }
    };

    return (
        <section className="bg-gradient-to-b from-white to-[#CCC2F2] dark:from-[#342e4e] dark:to-[#121212] min-h-screen flex items-center justify-center dark:bg-gray-900 transition px-4">
            <Card className="mt-20 mb-12 w-full max-w-5xl border-2 bg-white/20 shadow-none dark:border-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="dark:text-white">
                        <CardBody className="pb-0 flex flex-col gap-4 ">
                            <div className="flex items-center gap-2">
                                <CircleUserRound className="w-6 h-6 text-primary" />
                                <Typography variant="h4" color="blue-gray " className="dark:text-white">
                                    Sign Up
                                </Typography>
                            </div>
                            <Typography
                                className="-mt-2 text-sm text-black dark:text-gray-400"
                                variant="paragraph"
                            >
                                Create your account below.
                            </Typography>

                            {/* Name */}
                            <div>
                                <Typography variant="h6" className="mb-1">
                                    Name
                                </Typography>
                                <Input
                                className="dark:text-white"
                                    icon={<User className="w-5 h-5 text-primary" />}
                                    label="Enter your name"
                                    size="lg"
                                    {...register("name", { required: "Name is required" })}
                                    error={!!errors.name}
                                />
                                {errors.name && (
                                    <Typography variant="small" color="red">
                                        {errors.name.message}
                                    </Typography>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <Typography variant="h6" className="mb-1">
                                    Email
                                </Typography>
                                <Input
                                className="dark:text-white"
                                    icon={<Mail className="w-5 h-5 text-primary" />}
                                    label="Enter your email"
                                    size="lg"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    error={!!errors.email}
                                />
                                {errors.email && (
                                    <Typography variant="small" color="red">
                                        {errors.email.message}
                                    </Typography>
                                )}
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Typography variant="h6" className="mb-1">
                                    Password
                                </Typography>
                                <Input
                                className="dark:text-white"
                                    icon={
                                        <div
                                            className="cursor-pointer text-primary"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </div>
                                    }
                                    label="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    size="lg"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                        validate: {
                                            hasUppercase: (value) => /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                                            hasLowerCase: (value) => /[a-z]/.test(value) || "Must contain at least one lowercase letter",
                                            hasNumber: (value) => /\d/.test(value) || "Must contain at least one number",
                                        }
                                    })}
                                    error={!!errors.password}
                                />
                                {errors.password && (
                                    <Typography variant="small" color="red">
                                        {errors.password.message}
                                    </Typography>
                                )}
                            </div>


                            {/* Image Upload  */}
                            <div className="flex flex-col gap-2">
                                <Typography variant="h6">
                                    Profile Image
                                </Typography>

                                <div className="relative">
                                    <Input
                                    
                                        icon={<ImageIcon className="absolute top-2 w-5 h-5 text-primary pointer-events-none" />}
                                        type="file"
                                        accept="image/*"
                                        className="!h-14 dark:text-white pr-8 cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                                        containerProps={{ className: "cursor-pointer" }}
                                        label="Choose Profile Image"
                                        {...register("profile", { required: "Profile image is required" })}
                                        onChange={handleImageChange}
                                    />
                                    {
                                        errors.profile && (
                                            <Typography variant="small" className="mt-5" color="red">
                                                {errors.profile.message}
                                            </Typography>
                                        )
                                    }
                                </div>

                            </div>

                            <div>
                                <div className="-ml-3">
                                    <Checkbox className={errors.terms ? 'border border-red-400' : ''} {...register('terms', { required: 'Agreement needed' })} label="I agree to terms & conditions" />
                                </div>
                                {
                                    errors.terms && (
                                        <Typography variant="small" className="mr-10" color="red">
                                            {errors.terms.message}
                                        </Typography>
                                    )
                                }
                            </div>
                        </CardBody>

                        <CardFooter className="pt-0 flex flex-col gap-4">
                            <p className="text-sm font-bold text-red-400">{error.message}</p>
                            <Button disabled={imageLoading || loading} type="submit" fullWidth className="text-white">
                                {
                                    loading
                                        ? <l-bouncy size="20" speed="1.75" color="white"></l-bouncy>
                                        : "Sign Up"
                                }
                            </Button>

                            <div className="space-y-4 md:hidden">
                                {/* OR Divider */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                                    <Typography className="text-sm text-gray-500 dark:text-gray-400">or</Typography>
                                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                                </div>

                                <SocialLogin setError={setError} />
                            </div>
                        </CardFooter>
                    </form>

                    {/* Optionally: Right column illustration or quote */}
                    <div className="hidden md:flex flex-col items-center justify-center p-8">
                        <Avatar loading={imageLoading} size="xxl" src={photoURL} />

                        <Typography
                            variant="h6"
                            className="text-center text-gray-600 dark:text-gray-400 mt-4"
                        >
                            Build your profile and explore amazing tools!
                        </Typography>

                        <div className="w-full space-y-4 mt-10">
                            <SocialLogin setError={setError} />
                        </div>
                    </div>
                </div>
            </Card>
        </section>
    );
}
