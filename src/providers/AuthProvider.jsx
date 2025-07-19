import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { AuthContext } from '../context/AuthContext';


const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [isUserLoading, setIsUserLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()


    const createUser = (email, password) => {
        setIsUserLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
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

    const googleSignIn = () => {
        setIsUserLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    const githubSignIn = () => {
        setIsUserLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    const userSignOut = () => {
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
        googleSignIn,
        githubSignIn,
        createUser,
        updateUserProfile,
        // reloadUser,
        signIn,
        userSignOut,
        resetPass
    }

    return (
        <AuthContext value={firebase}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;