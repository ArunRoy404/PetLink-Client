import Logo from "../../ui/Logo";
import ProfileDashboard from "./ProfileDashboard";
import NavLinkDashboard from "./NavLinkDashboard";


const SidebarDashboard = ({navItems}) => {
    return (
        < div className="overflow-hidden hidden rounded-md md:flex flex-col w-64 border border-gray-300 bg-white dark:bg-[#1F1A33] dark:border-gray-700" >
            <div className="p-4 dark:text-white flex items-center gap-2">
                <Logo />
            </div>
            <nav className="h-[calc(100vh-195px)] overflow-y-auto flex flex-col gap-1 p-4">
                {navItems.map((item, index) => (
                    <NavLinkDashboard item={item} key={index} />
                ))}
            </nav>

            <div className="z-10 bottom-0 md:p-4 border-t border-gray-200 dark:border-gray-700">
                <ProfileDashboard />
            </div>
        </div >
    );
};

export default SidebarDashboard;