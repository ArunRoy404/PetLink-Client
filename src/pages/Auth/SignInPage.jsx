import { useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Typography,
    Checkbox,
} from "@material-tailwind/react";
import { set, useForm } from "react-hook-form";
import { Mail, Github, CircleUserRound, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../ReactHotToast/ReactHotToast";
import { bouncy } from 'ldrs'
bouncy.register()



export default function SignInPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuthContext()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data
        setLoading(true)
        setError('')

        signIn(email, password)
            .then(() => {notifySuccess("SignIn Successful")})
            .catch(err => {
                setError(err)
                notifyError("Sign In Failed")
            })
            .finally(()=>{setLoading(false)})
    };

    return (
        <section className="bg-gradient-to-b from-white to-[#CCC2F2] min-h-screen flex items-center justify-center dark:bg-gray-900 transition">
            <Card className="mt-24 mb-12 mx-2 bg-white/20 shadow-none border-2 w-full max-w-md dark:border-gray-700">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardBody className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <CircleUserRound className="w-6 h-6 text-primary" />
                            <Typography variant="h4" color="blue-gray">
                                Sign In
                            </Typography>
                        </div>
                        <Typography
                            className="-mt-2 text-sm text-black dark:text-gray-400"
                            variant="paragraph"
                        >
                            Enter your email and password to sign in.
                        </Typography>

                        {/* Email */}
                        <div>
                            <Typography variant="h6" className="mb-1">
                                Email
                            </Typography>
                            <Input
                                icon={<Mail className="w-5 h-5 text-gray-400" />}
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
                                icon={<div
                                    className="cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </div>}
                                label="Enter your password"
                                type={showPassword ? "text" : "password"}
                                size="lg"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                error={!!errors.password}
                            />

                            {errors.password && (
                                <Typography variant="small" color="red">
                                    {errors.password.message}
                                </Typography>
                            )}
                        </div>

                        <p className="text-sm font-bold text-red-400">{error.message}</p>

                        <div className="-ml-2 -mt-2">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>

                    <CardFooter className="pt-0 flex flex-col gap-4">
                        {/* Sign In Button */}
                        <Button type="submit" fullWidth disabled={loading} className="text-white " >
                            {
                                loading
                                ? <l-bouncy size="20" speed="1.75" color="white"></l-bouncy>
                                : "Sign In"
                            }
                        </Button>

                        {/* OR Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                            <Typography className="text-sm text-gray-500 dark:text-gray-400">or</Typography>
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                        </div>

                        {/* Google Sign In */}
                        <Button
                            fullWidth
                            variant="outlined"
                            className="flex items-center justify-center gap-2 text-sm normal-case"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Sign in with Google
                        </Button>

                        {/* GitHub Sign In */}
                        <Button
                            fullWidth
                            variant="outlined"
                            className="flex items-center justify-center gap-2 text-sm normal-case"
                        >
                            <Github className="w-5 h-5" />
                            Sign in with GitHub
                        </Button>

                        {/* Signup Redirect */}
                        <Typography
                            variant="small"
                            className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                            Don&apos;t have an account?
                            <Link to={'/auth/sign-up'}
                                href="#signup"
                                className="ml-1 font-semibold text-blue-500 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}
