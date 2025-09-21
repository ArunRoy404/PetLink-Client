
import { Typography } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router';
import GithubSignIn from './Authentication/GithubSignIn';
import GoogleSignIn from './Authentication/GoogleSignIn';

const SocialLogin = ({ setError }) => {
    const location = useLocation()
    return (
        <>
            {/* Google Sign Up */}
            <GoogleSignIn setError={setError} />

            {/* GitHub Sign Up */}
            <GithubSignIn setError={setError} />

            {/* Already have account? */}
            <Typography
                variant="small"
                className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400"
            >
                Already have an account?
                <Link to={'/auth/sign-in'}
                    state={location.state}
                    href="#signin"
                    className="ml-1 font-semibold text-blue-500 hover:underline"
                >
                    Sign In
                </Link>
            </Typography>
        </>
    );
};

export default SocialLogin;