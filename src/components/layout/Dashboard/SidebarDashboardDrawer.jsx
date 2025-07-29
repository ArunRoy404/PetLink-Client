import {
    Drawer,
} from "@material-tailwind/react";

import ProfileDashboard from './ProfileDashboard';
import NavLinkDashboard from './NavLinkDashboard';
import Logo from '../../components/ui/Logo';

const SidebarDashboardDrawer = ({ isSidebarOpen, toggleSidebar, navItems }) => {
    return (
        <Drawer
            open={isSidebarOpen}
            onClose={toggleSidebar}
            className="flex flex-col bg-white dark:bg-gray-800"
            placement="left"
        >
            <div className="p-4 flex items-center gap-2">
                <Logo />
            </div>
            <nav className="flex-1 flex flex-col gap-1 p-4">
                {navItems.map((item, index) => (
                    <NavLinkDashboard item={item} key={index} />
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <ProfileDashboard />
            </div>
        </Drawer>
    );
};

export default SidebarDashboardDrawer;