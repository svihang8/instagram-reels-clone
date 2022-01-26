import React, {useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { Route } from 'react-router-dom';

const PrivateRoute = () => {
    const {user} = useContext(AuthContext);
    // const user = null;
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
