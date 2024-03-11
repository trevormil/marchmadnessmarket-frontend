import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
// MUI Stuff
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// Redux stuff
import { connect } from 'react-redux';
import { signUpUser } from '../../../redux/actions/userActions';

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            userName: '',
            errors: {},
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors.data });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            userName: this.state.userName,
        };
        this.props.signUpUser(newUserData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const {
            ui: { loading },
        } = this.props;
        const { errors } = this.state;
        const currLoading = loading || this.props.user.loading;
        console.log(errors);
        return (
            <div
                className="bg-gray-900"
                style={{
                    width: '100%',
                    color: 'white',
                    minHeight: '1000px',
                    paddingBottom: 20,
                }}
            >
                <Grid container>
                    <Grid item sm />
                    <Grid item sm>
                        <Typography align="center">
                            <div
                                className="mt-12 bg-gray-800 text-white card"
                                style={{
                                    padding: 20,
                                }}
                            >
                                <form
                                    noValidate
                                    onSubmit={this.handleSubmit}
                                    className="flex flex-col"
                                >
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        className={`p-2 mb-4 bg-gray-700 rounded-lg border border-gray-300 ${
                                            errors.email
                                                ? 'border-red-500'
                                                : 'focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                                        }`}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mb-2">
                                            {errors.email}
                                        </p>
                                    )}
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className={`p-2 mb-4 bg-gray-700 rounded-lg border border-gray-300 ${
                                            errors.password
                                                ? 'border-red-500'
                                                : 'focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                                        }`}
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mb-2">
                                            {errors.password}
                                        </p>
                                    )}
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className={`p-2 mb-4 bg-gray-700 rounded-lg border border-gray-300 ${
                                            errors.confirmPassword
                                                ? 'border-red-500'
                                                : 'focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                                        }`}
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mb-2">
                                            {errors.confirmPassword}
                                        </p>
                                    )}

                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        placeholder="Username"
                                        className={`p-2 mb-4 bg-gray-700 rounded-lg border border-gray-300 ${
                                            errors.userName
                                                ? 'border-red-500'
                                                : 'focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                                        }`}
                                        value={this.state.userName}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    {errors.userName && (
                                        <p className="text-red-500 text-sm mb-2">
                                            {errors.userName}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={currLoading}
                                    >
                                        Sign Up
                                        {currLoading && (
                                            <CircularProgress size={30} />
                                        )}
                                    </Button>
                                    <br />
                                    <small>
                                        Already have an account? Login{' '}
                                        <Link
                                            to={ROUTES.SIGN_IN}
                                            style={{ color: '#4d6cfa' }}
                                        >
                                            here
                                        </Link>
                                    </small>
                                </form>
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
});

export default connect(mapStateToProps, { signUpUser })(SignUpForm);
