import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Component/Firebase/Firebase";



export const AuthContext=createContext()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    // google
    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn=()=>{
        signInWithPopup(auth,provider)
        .then(result=>{

        }).catch(err=> alert("ERROR ", err.message))
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
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })
    }

    const logOut=()=>{
        setLoading(true)
        setUser(null)
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
        handleGoogleSignIn
        
    }

    useEffect(()=>{
        const onSubscribe=onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
                setUser(currentUser)
                
                console.log(currentUser);
                setLoading(false)
            }
            else{
                setLoading(false)
            }
            return ()=>onSubscribe()
        })

        
    },[user])
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider> ;
};

export default AuthProvider;
