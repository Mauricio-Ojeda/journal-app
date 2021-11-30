import { Routes, Route, Navigate} from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';

const AuthRouter = () => {
    return (
        <Routes>
                <Route exact path='login' element={<LoginScreen /> } />
                <Route exact path='register' element={<RegisterScreen /> } />
                <Route path='/*' element={<Navigate to="login"  replace /> } />
        </Routes>
    )
}

export default AuthRouter
