import React from 'react';
import SignUpForm from './signupform';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/userActions';


const styles = (theme) => ({
    ...theme.spreadThis
});


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
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    loginUser
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(SignUpPage));