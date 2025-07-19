import React from 'react';
import GoogleSignIn from './GoogleSignIn';
import GithubSignIn from './GithubSignIn';
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router';

const SocialLogin = ({setError}) => {
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