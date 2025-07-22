import {
    Home,
    PlusCircle,
    Layers,
    Inbox,
    Gift,
    BarChart2,
    Heart,
    LayoutDashboard,
} from 'lucide-react';
import { NavLink } from "react-router";
import { useState } from 'react';
import { Outlet } from 'react-router';
import SidebarDashboard from '../components/layout/Dashboard/SidebarDashboard';
import NavbarDashboard from '../components/layout/Dashboard/NavbarDashboard';
import SidebarDashboardDrawer from '../components/layout/Dashboard/SidebarDashboardDrawer';

const DashboardLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { name: "Home", icon: <Home size={20} />, path: "/" },
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
        { name: "Add a Pet", icon: <PlusCircle size={20} />, path: "/dashboard/add-pet" },
        { name: "My added Pets", icon: <Layers size={20} />, path: "/dashboard/my-pets" },
        { name: "Adoption Requests", icon: <Inbox size={20} />, path: "/dashboard/adoption-requests" },
        { name: "Create Campaign", icon: <Gift size={20} />, path: "/dashboard/create-campaign" },
        { name: "My Campaigns", icon: <BarChart2 size={20} />, path: "/dashboard/my-campaigns" },
        { name: "My Donations", icon: <Heart size={20} />, path: "/dashboard/donations" },
    ];

    return (
        <div className='flex h-screen gap-4 p-4'>
            <SidebarDashboard navItems={navItems} />
            <SidebarDashboardDrawer navItems={navItems} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <NavbarDashboard toggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6  dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;