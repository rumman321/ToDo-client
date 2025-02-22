import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Component/Firebase/Firebase";



export const AuthContext=createContext()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    // google
    const provider = new GoogleAuthProvider();
    const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const userNewCreate=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

     // user signIn
     const userSignIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

     
     const upDateUserProfile=(name,photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })
    }

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)  
        
    }
    const authInfo={
        user,
        setUser,
        userNewCreate,
        logOut,
        userSignIn,
        loading,
        upDateUserProfile,
        googleSignIn
        
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log(currentUser);
            setLoading(false);
        });
    
        return () => unsubscribe(); // Cleanup on unmount
    }, []);
    
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider> ;
};

export default AuthProvider;
