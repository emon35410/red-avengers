import React, { useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile,
    GoogleAuthProvider, // ১. গুগল প্রভাইডার ইমপোর্ট
    signInWithPopup     // ২. পপআপ সাইন-ইন ইমপোর্ট
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { AuthContext } from './AuthContext';
import Loading from '../Component/Loading/Loading';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // ৩. গুগল প্রভাইডার ইন্সট্যান্স তৈরি
    const googleProvider = new GoogleAuthProvider();

    // Sign In with email password
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // ৪. গুগল সাইন-ইন ফাংশন
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Log Out 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // update Profile
    const updateUserProfile = (profileInfo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, profileInfo);
        }
        return Promise.reject("No user is currently logged in");
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const token = await currentUser.getIdToken(true); 
                setUser({ ...currentUser, accessToken: token });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        setUser,
        setLoading,
        registerUser,
        signInUser,
        googleSignIn, // ৫. কন্টেক্সট এ গুগল সাইন-ইন এক্সপোর্ট করা
        logOut,
        updateUserProfile
    };

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;