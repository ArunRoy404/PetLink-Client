import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

const MainLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            {/* <Navbar /> */}
            <div className="">
                <Outlet />
            </div>
            {/* <Footer /> */}
            {/* <FooterNew /> */}
        </>
    );
}
export default MainLayout;