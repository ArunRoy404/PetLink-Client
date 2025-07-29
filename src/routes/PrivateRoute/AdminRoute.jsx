import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { notifyWarn } from "../../ReactHotToast/ReactHotToast";
import Loader from "../../components/ui/Loader";



const AdminRoute = ({ children }) => {

    const { firebaseUser, isUserLoading, userRole, roleLoading } = useAuthContext()
    const { pathname } = useLocation()

    useEffect(() => {
        if (!isUserLoading && !firebaseUser) {
            notifyWarn("You need to log in first.")
        }
    }, [isUserLoading, firebaseUser])

    if (isUserLoading || roleLoading) {
        return <div className="h-[80vh] flex items-center justify-center"><Loader /></div>
    }

    if (userRole ==='user') {
        return <Navigate to={'/dashboard'} state={pathname}></Navigate>
    }

    if (!firebaseUser) {
        return <Navigate to={'/auth/sign-in'} state={pathname}></Navigate>
    }
    return children
};

export default AdminRoute;