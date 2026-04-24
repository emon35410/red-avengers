import React, { useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup 
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { AuthContext } from './AuthContext';
import Loading from '../Component/Loading/Loading';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = async () => {
        setLoading(true);
        localStorage.removeItem('access-token'); // লগআউট করলে টোকেন ক্লিয়ার
        return signOut(auth);
    };

    const updateUserProfile = (profileInfo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, profileInfo);
        }
        return Promise.reject("No user is currently logged in");
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // লেটেস্ট টোকেন নিয়ে localStorage-এ সেভ করা
                const token = await currentUser.getIdToken(true); 
                localStorage.setItem('access-token', token);
                setUser(currentUser);
            } else {
                setUser(null);
                localStorage.removeItem('access-token');
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
        googleSignIn,
        logOut,
        updateUserProfile
    };

    if (loading) return <Loading />;

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;