import { auth, googleAuthProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile ,signInWithEmailAndPassword } from "firebase/auth";

import { types } from "../types/types";

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
       signInWithEmailAndPassword(auth, email, password)
            .then( ({ user }) => {
                console.log(user)
                dispatch( login( user.uid, user.displayName ) );
            });
}
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        createUserWithEmailAndPassword( auth, email, password )
            .then( async (userCredential) => { 
               
                const user = userCredential.user;
                await updateProfile( user, { displayName: name });
                console.log(user);
                dispatch( login( user.uid, user.displayName ) );

            } )
            .catch( error => {
              console.log(error)
             })
    }
}

export const startGoogleLogin = () => {
    return  ( dispatch ) => {
       signInWithPopup( auth, googleAuthProvider )
            .then( ({ user }) => {
            
              dispatch( login( user.uid, user.displayName ) );
            } )
            .catch( error => {
                console.log(error)
            })
    }    
}


export const login = (uid, displayName) => ({
   
        type: types.login,
        payload:{
            uid,
            displayName
        }
})    
