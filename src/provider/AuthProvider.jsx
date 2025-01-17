import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { app } from '../firebase/firebase.consol';
import axios from 'axios';


export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    console.log("🚀 ~ AuthProvider ~ user:", user)
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signingUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSigning = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
            .catch((error) => {
                console.error("Error during Google sign-in:", error);
                setLoading(false);
            });
    }

    const profileUpdate = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }


    const logOut = async () => {
        setLoading(true)
        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/logout`, { withCredentials: true })
        console.log("🚀 ~ logOut ~ data:", data)
        return signOut(auth)

    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            unsubscribe()
        }
    }, [auth])

    const authInfo = {
        user,
        createUser,
        loading,
        setLoading,
        signingUser,
        googleSigning,
        profileUpdate,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;