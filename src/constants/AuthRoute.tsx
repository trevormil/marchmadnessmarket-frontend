import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface AuthRouteProps {
    children: React.ReactElement;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    const authenticated = useSelector(
        (state: RootState) => state.user.authenticated
    );

    return authenticated ? <Navigate to="/" replace /> : children;
};

export default AuthRoute;
