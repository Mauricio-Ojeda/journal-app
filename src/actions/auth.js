import { auth, googleAuthProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile ,signInWithEmailAndPassword } from "firebase/auth";

import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
       dispatch( startLoading() ); 
       signInWithEmailAndPassword(auth, email, password)
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );
            })
            .catch( error => {
                console.log(error);
                dispatch( finishLoading() );
            });
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        dispatch( startLoading() );
        createUserWithEmailAndPassword( auth, email, password )
            .then( async (userCredential) => { 
               
                const user = userCredential.user;
                await updateProfile( user, { displayName: name });
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );

            } )
            .catch( error => {
              console.log(error);
              dispatch( finishLoading() );
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
});


export const startLogout = () => {
    return async( dispatch ) => {
        await auth.signOut();
        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
})
