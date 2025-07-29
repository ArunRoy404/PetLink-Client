import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [isUserLoading, setIsUserLoading] = useState(true)
    const [userRole, setUserRole] = useState(null)
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const [roleLoading, setRoleLoading] = useState(true)


    const getUserRole = async () => {
        if (firebaseUser) {
            setRoleLoading(false)
            await axios.get(`https://pet-link-server.vercel.app/users/${firebaseUser.email}`)
                .then(res => {
                    setUserRole(res.data.role)
                })
                .finally(() => setRoleLoading(false))
        }
    }

    useEffect(() => {
        getUserRole()
    }, [firebaseUser])

    const createUser = (email, password) => {
        setIsUserLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const saveUserToDB = async (userData) => {
        const { email, displayName, photoURL } = userData
        const user = { email, displayName, photoURL }
        const res = await axios.post('https://pet-link-server.vercel.app/users', user)
        console.log(res);
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

    useEffect(() => {
        if (firebaseUser) {
            localStorage.setItem("accessToken", firebaseUser.accessToken);
            saveUserToDB(firebaseUser)
        } else {
            localStorage.removeItem("accessToken");
        }
    }, [firebaseUser])

    const firebase = {
        firebaseUser,
        isUserLoading,
        roleLoading,
        googleSignIn,
        githubSignIn,
        createUser,
        updateUserProfile,
        // reloadUser,
        signIn,
        userSignOut,
        resetPass,
        userRole
    }

    return (
        <AuthContext value={firebase}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;