import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isLoggedIn ,children }) => {
    

    return isLoggedIn
        ? <Navigate to="/" />
        : children
}

export default PublicRoute;