import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { NavbarDefault } from '../components/layout/NavbarDefault';

const MainLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            {/* <Navbar /> */}
            <NavbarDefault />

            <main className="">
                <Outlet />
            </main>
            {/* <Footer /> */}
            {/* <FooterNew /> */}
        </>
    );
}
export default MainLayout;