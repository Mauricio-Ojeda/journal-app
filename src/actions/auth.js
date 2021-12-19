import { auth, googleAuthProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile ,signInWithEmailAndPassword } from "firebase/auth";

import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

import Swal from 'sweetalert2';

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
       dispatch( startLoading() ); 
       signInWithEmailAndPassword(auth, email, password)
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );
            })
            .catch( ( e ) => {
                console.log(e.code);
                dispatch( finishLoading() );
                if( e.code === 'auth/user-not-found' ){
                    Swal.fire('ERROR', 'User not found, please enter a valid Email', 'error');
                }else if( e.code === 'auth/wrong-password' ){
                    Swal.fire('ERROR', 'Wrong Password, please try with another', 'error');
                }else{
                    Swal.fire('ERROR', 'User not found, please verify your email and password are correct', 'error');

                }
                
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
            .catch( e => {
              console.log(e.code);
              dispatch( finishLoading() );
              if( e.code === 'auth/email-already-in-use' ){
                  Swal.fire('ERROR', 'Email already in use, please try with another', 'error');
              }else{
                  Swal.fire('ERROR', 'Error has ocurred please try again', 'error');
  
              }
            });
            
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
