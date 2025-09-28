
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

   useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      
      await currentUser.reload();

      const userdata = {
        displayName: currentUser.displayName,
        email: currentUser.email,
        image: currentUser.photoURL,
        emailVerified: currentUser.emailVerified,
        uid: currentUser.uid,
      };

      setUser(userdata);
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);

    if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      
      <div className="flex justify-center items-center">
        
        <span className="loading loading-spinner loading-xl"></span></div>


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