import PropTypes from 'prop-types';
import app from '../Firebase/Firebase_config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from 'react';
// import AxiosSecure from '../Hooks/AxiosSecure';
import axios from 'axios';


const auth = getAuth(app);
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const axiosSecure = AxiosSecure();

    // create a new user register
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // update user profile
    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    }

    // signIn user
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google login
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // logOut a user
    const Logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    // forget password
    const forgetPassword = () => {
        return sendPasswordResetEmail(auth, email);
    }


    // observer 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if(currentUser?.email){
                const userInfo = {email: currentUser.email};
                axios.post('https://hotel-server-side-kappa.vercel.app/jwt', userInfo, {withCredentials: true})
                .then(res => {
                    // console.log( 'login token' ,res.data)
                    setLoading(false);
                })
            }
            else{
                axios.post('https://hotel-server-side-kappa.vercel.app/logout', {}, {withCredentials: true})
                .then(res => {
                    // console.log('logout', res.data)
                    setLoading(false);
                })
            }

        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        signInWithGoogle,
        Logout,
        createNewUser,
        signIn,
        loading,
        updateUserProfile,
        forgetPassword,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {

};

export default AuthProvider;