import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from './routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest}
        render={(props) =>
            authenticated === false ? <Redirect to={ROUTES.SIGN_IN} /> : <Component {...props} />
        } />
);
const mapStateToProps = (state) => (
    {
        authenticated: state.user.authenticated,
        user: state.user
    }
)

UserRoute.propTypes = {
    user: PropTypes.object.isRequired
}
export default connect(mapStateToProps)(UserRoute);