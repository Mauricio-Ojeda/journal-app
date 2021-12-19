import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import AuthRouter from "./AuthRouter";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { useDispatch } from "react-redux";
import JournalScreen from "../components/journal/JournalScreen";

import { auth } from "../firebase/firebaseConfig";
import { login } from "../actions/auth";
import Spinner from "../components/atoms/Spinner";

const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
       auth.onAuthStateChanged( (user) => {
           if ( user?.uid ) {
               dispatch( login( user.uid, user.displayName ) );
               setIsLoggedIn( true );
           }else{
               setIsLoggedIn(false);
           }
           setChecking(false);
       } )
    }, [ dispatch, setChecking, setIsLoggedIn ]);

    if ( checking ) {
        return (
            <Spinner />
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="auth/*" 
                    element={ 
                        <PublicRoute isLoggedIn={ isLoggedIn } >
                            <AuthRouter /> 

                        </PublicRoute>
                    } 

                />
                <Route 
                    exact path="/" 
                    element={ 
                        <PrivateRoute isLoggedIn={ isLoggedIn } >
                            <JournalScreen /> 

                        </PrivateRoute>
                    } 

                />
                <Route path="*" element={<Navigate to="auth/login"  replace /> } />
            </Routes>
            
        </BrowserRouter>
    )
}

export default AppRouter
