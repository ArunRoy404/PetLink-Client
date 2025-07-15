import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { AuthContext } from '../context/AuthContext';


const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [isUserLoading, setIsUserLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()


    const createUser = (email, password) => {
        setIsUserLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setIsUserLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (updateInfo) => {
        return updateProfile(auth.currentUser, updateInfo)
    }

    // const reloadUser = async () => {
    //     setIsUserLoading(true)
    //     await auth.currentUser.reload()
    //         .then(() => {
    //             setFirebaseUser({ ...auth.currentUser })
    //             setIsUserLoading(false)
    //         })
    // }

    const googleLogIn = () => {
        setIsUserLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        localStorage.removeItem("accessToken");
        setIsUserLoading(true)
        return signOut(auth)
    }

    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setFirebaseUser({ ...currentUser })
                localStorage.setItem("accessToken", currentUser.accessToken);
                // reloadUser()
            } else {
                setFirebaseUser(null)
            }
            setIsUserLoading(false)
        })

        return () => {
            unSubscribe()
        }
    }, [])

    const firebase = {
        firebaseUser,
        isUserLoading,
        googleLogIn,
        createUser,
        updateUserProfile,
        // reloadUser,
        logIn,
        logOut,
        resetPass
    }

    return (
        <AuthContext value={firebase}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;