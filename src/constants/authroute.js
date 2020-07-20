import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from './routes';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest}
        render={(props) =>
            authenticated === true ? <Redirect to={ROUTES.HOME} /> : <Component {...props} />
        } />
);
export default AuthRoute;