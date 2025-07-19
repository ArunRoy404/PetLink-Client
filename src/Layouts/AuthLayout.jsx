import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { NavbarDefault } from '../components/layout/NavbarDefault';
import Footer from '../components/layout/Footer';

const AuthLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            {/* <Navbar /> */}
            <NavbarDefault />

            <main className="min-h-[100vh]">
                <Outlet />
            </main>

        </>
    );
}
export default AuthLayout;