import { auth, googleAuthProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

import { types } from "../types/types";

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
       setTimeout(() => {
           dispatch( login(123, 'mauri') );
           
       }, 3500); 
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        createUserWithEmailAndPassword( auth, email, password )
            .then( (userCredential) => { 
               
                const user = userCredential.user;
                user.displayName = name;
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
