import { Button } from '@material-tailwind/react';
import { Github } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import { bouncy } from 'ldrs'
import { notifyError, notifySuccess } from '../../ReactHotToast/ReactHotToast';
bouncy.register()


const GithubSignIn = ({ setError }) => {
    const [loading, setLoading] = useState(false)
    const { githubSignIn } = useAuthContext()

    const handleGithubSignIn = () => {
        setLoading(true)
        githubSignIn()
            .then(() => notifySuccess("Sign In Successful"))
            .catch(err => {
                setError(err.message)
                notifyError("Google Sign In Failed")
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <Button
                onClick={handleGithubSignIn}
                fullWidth
                variant="outlined"
                className="flex items-center justify-center gap-2 text-sm normal-case"
            >
                <Github className="w-5 h-5" />
                {
                    loading
                        ? <l-bouncy size="20" speed="1.75" color="black"></l-bouncy>
                        : "Sign In with Github"
                }
            </Button>
        </>
    );
};

export default GithubSignIn;