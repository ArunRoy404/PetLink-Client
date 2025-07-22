import Logo from "../../ui/Logo";
import ProfileDashboard from "./ProfileDashboard";
import NavLinkDashboard from "./NavLinkDashboard";


const SidebarDashboard = ({navItems}) => {
    return (
        < div className="hidden rounded-md md:flex flex-col w-64 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700" >
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
        </div >
    );
};

export default SidebarDashboard;