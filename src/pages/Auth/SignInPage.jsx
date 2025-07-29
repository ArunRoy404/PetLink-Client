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
import { useForm } from "react-hook-form";
import { Mail, Github, CircleUserRound, EyeOff, Eye } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../ReactHotToast/ReactHotToast";
import { bouncy } from 'ldrs'
import GoogleSignIn from "../../components/ui/GoogleSignIn";
import GithubSignIn from "../../components/ui/GithubSignIn";
bouncy.register()



export default function SignInPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuthContext()

    const navigate = useNavigate()
    const location = useLocation()

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
            .then(() => {
                notifySuccess("SignIn Successful")
                navigate(location.state || '/')
            })
            .catch(err => {
                setError(err)
                notifyError("Sign In Failed")
            })
            .finally(() => { setLoading(false) })
    };

    return (
        <section className="bg-gradient-to-b from-white to-[#CCC2F2] min-h-screen flex items-center justify-center dark:bg-gray-900 transition">
            <Card className="mt-24 mb-12 mx-2 bg-white/20 shadow-none border-2 w-full max-w-md dark:border-gray-700">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardBody className="pb-0 flex flex-col gap-4">
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

                        <div className="-ml-2 -mt-2">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>

                    <CardFooter className="pt-0 flex flex-col gap-4">
                        <p className="text-sm font-bold text-red-400">{error.message}</p>
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
                        <GoogleSignIn setError={setError} />

                        {/* GitHub Sign In */}
                        <GithubSignIn setError={setError} />

                        {/* Signup Redirect */}
                        <Typography
                            variant="small"
                            className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                            Don&apos;t have an account?
                            <Link to={'/auth/sign-up'}
                                state={location.state}
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
