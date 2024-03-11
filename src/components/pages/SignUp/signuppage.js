import PropTypes from 'prop-types';
import React from 'react';
import SignUpForm from './signupform';

import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/userActions';

class SignUpPage extends React.Component {
    render() {
        return (
            <div>
                <SignUpForm />
            </div>
        );
    }
}
SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
});

const mapActionsToProps = {
    loginUser,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SignUpPage);
