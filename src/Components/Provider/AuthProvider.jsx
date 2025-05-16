
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../../firebase.init";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provder = new GoogleAuthProvider();

    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const SignInwithGoogle = () => {
        return signInWithPopup(auth, provder);
    };

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const SignOut = () => {
        return signOut(auth);
    }



    const authInfo = {
        createUser,
        user,
        setUser,
        updateUserProfile,
        SignInwithGoogle,
        userLogin,
        SignOut,
        
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentuser=>{
            if (currentuser){
                const userdata = {
                    displayName: currentuser.displayName,
                    email: currentuser.email,
                    photoURL: currentuser.photoURL,
                }
                setUser(userdata);
                
            }
            else {
                setUser(null);
            }

            setLoading(false);
        })

        return ()=> unsubscribe();


    },[])

   if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl space-y-6 p-4">
        <Skeleton height={200} />
        <Skeleton height={30} width="60%" />
        <Skeleton count={4} />
      </div>
    </div>
  );
}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;