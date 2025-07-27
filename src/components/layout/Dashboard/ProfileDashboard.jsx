import { Typography } from '@material-tailwind/react';
import Avatar from '../../ui/Avatar';
import { useAuthContext } from '../../../context/AuthContext';

const ProfileDashboard = () => {

    const { firebaseUser } = useAuthContext()

    return (
        <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer">
            <Avatar
                src={firebaseUser?.photoURL}
                alt="user"
                size="sm"
                className="border border-primary"
            />
            <div>
                <Typography variant="small" className="font-bold dark:text-white">
                    {firebaseUser?.displayName}
                </Typography>
                <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                    User
                </Typography>
            </div>
        </div>
    );
};

export default ProfileDashboard;