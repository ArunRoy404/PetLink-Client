import { Typography } from '@material-tailwind/react';
import { NavLink } from 'react-router';

const NavLinkDashboard = ({item}) => {
    return (
        <NavLink
            to={item.path}
            end
            className={({ isActive }) =>
                `group flex items-center gap-3 p-3 rounded-lg transition-all
                ${isActive
                    ? 'bg-surface text-primary dark:bg-gray-700 dark:text-[#c2b3ff] font-bold'
                    : 'hover:bg-surface hover:text-primary dark:hover:bg-gray-700 dark:text-gray-300'}`
            }
        >
            <span className={`opacity-60`}>
                {item.icon}
            </span>
            <Typography variant="paragraph" className="text-sm ">
                {item.name}
            </Typography>
        </NavLink>
    );
};

export default NavLinkDashboard;