import {
    IconButton,
    Avatar,
} from "@material-tailwind/react";

import {
    Bell,
    Search,
    Menu,
} from 'lucide-react';
import Profile from "../../ui/Profile";
import ThemeToggle from "../../ui/ThemeToggle";


const NavbarDashboard = ({ toggleSidebar }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <IconButton
                        variant="text"
                        onClick={toggleSidebar}
                        className="md:hidden dark:text-white"
                    >
                        <Menu className="h-6 w-6" />
                    </IconButton>
                    <div className="relative w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search pets, campaigns..."
                            className="block w-full pl-10 pr-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hover:bg-gray-200 p-2 rounded-full">
                        <ThemeToggle />
                    </div>
                    <IconButton
                        variant="text"
                        className="dark:text-white rounded-full relative"
                        ripple={false}
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    </IconButton>
                    <Profile />
                </div>
            </div>
        </header>
    );
};

export default NavbarDashboard;