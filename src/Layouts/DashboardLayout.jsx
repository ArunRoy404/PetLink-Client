import {
    Home,
    PlusCircle,
    Layers,
    Inbox,
    Gift,
    BarChart2,
    Heart,
    LayoutDashboard,
    Users,
    PawPrintIcon,
    LucidePiggyBank,
    HandCoins,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import SidebarDashboard from '../components/layout/Dashboard/SidebarDashboard';
import NavbarDashboard from '../components/layout/Dashboard/NavbarDashboard';
import SidebarDashboardDrawer from '../components/layout/Dashboard/SidebarDashboardDrawer';
import { useAuthContext } from '../context/AuthContext';


const userNav = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Add a Pet", icon: <PlusCircle size={20} />, path: "/dashboard/add-pet" },
    { name: "My added Pets", icon: <Layers size={20} />, path: "/dashboard/my-added-pets" },
    { name: "Adoption Requests", icon: <Inbox size={20} />, path: "/dashboard/adoption-requests" },
    { name: "Create Campaign", icon: <Gift size={20} />, path: "/dashboard/create-campaign" },
    { name: "My Campaigns", icon: <BarChart2 size={20} />, path: "/dashboard/my-campaigns" },
    { name: "My Donations", icon: <Heart size={20} />, path: "/dashboard/my-donations" },
];

const adminNav = [
    { name: "Users", icon: <Users size={20} />, path: "/dashboard/users" },
    { name: "All Pets", icon: <PawPrintIcon size={20} />, path: "/dashboard/all-pets" },
    { name: "All Campaigns", icon: <HandCoins size={20} />, path: "/dashboard/all-campaigns" },
]

const DashboardLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const { userRole, roleLoading} = useAuthContext()

    const [navItems, setNavItems] = useState(userNav)

    useEffect(() => {
        if (!roleLoading && userRole === 'admin') {
            setNavItems([...userNav, ...adminNav])
        }else{
            setNavItems([...userNav])
        }
    }, [roleLoading, userRole])



    return (
        <div className='flex h-screen gap-4 p-4 dark:bg-gradient-to-t dark:from-[#121212] dark:to-[#1F1A33]'>
            <SidebarDashboard navItems={navItems} />
            <SidebarDashboardDrawer navItems={navItems} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                <NavbarDashboard toggleSidebar={toggleSidebar} />

                <main className="flex-1 border border-gray-300 rounded-md overflow-y-auto md:p-4 dark:bg-[#2b2542]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;