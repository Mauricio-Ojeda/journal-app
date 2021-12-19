import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useDispatch } from "react-redux";
import JournalScreen from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";

import { auth } from "../firebase/firebaseConfig";
import { login } from "../actions/auth";
import Spinner from "../components/atoms/Spinner";

const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [inLoggedIn, setInLoggedIn] = useState(false);

    useEffect(() => {
       auth.onAuthStateChanged( (user) => {
           if ( user?.uid ) {
               dispatch( login( user.uid, user.displayName ) );
               setInLoggedIn( true );
           }else{
               setInLoggedIn(false);
           }
           setChecking(false);
       } )
    }, [ dispatch, setChecking, setInLoggedIn ]);

    if ( checking ) {
        return (
            <Spinner />
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={ <AuthRouter /> } />
                <Route exact path="/" element={ <JournalScreen /> } />
                <Route path="*" element={<Navigate to="auth/login"  replace /> } />
            </Routes>
            
        </BrowserRouter>
    )
}

export default AppRouter
