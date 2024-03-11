import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../redux/actions/userActions';
import * as ROUTES from './../../../constants/routes';

class SignInForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors.data });
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(userData);
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            ui: { loading },
        } = this.props;
        const currLoading = loading || this.props.user.loading;
        const { errors } = this.state;
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
                <Container>
                    <Grid container spacing={3}>
                        <Grid item md={3} xs={0}></Grid>
                        <Grid item xs={12} md={6}>
                            <Typography align="center">
                                <div
                                    className="mt-12 card bg-gray-800 text-white"
                                    style={{
                                        padding: 20,
                                    }}
                                >
                                    <form
                                        onSubmit={this.onSubmit}
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
                                            onChange={this.onChange}
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
                                            onChange={this.onChange}
                                            required
                                        />
                                        {errors.error && (
                                            <p className="text-red-500 text-sm mb-2">
                                                {errors.error.substring(
                                                    errors.error.indexOf(
                                                        'auth/'
                                                    ) + 5
                                                )}
                                            </p>
                                        )}
                                        {errors.general && (
                                            <p className="text-red-500 text-sm mb-2">
                                                {errors.general}
                                            </p>
                                        )}

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={currLoading}
                                            style={{ marginTop: 10 }}
                                        >
                                            Login
                                            {currLoading && (
                                                <CircularProgress size={30} />
                                            )}
                                        </Button>
                                        <br />
                                        <small>
                                            Dont have an account? Sign up{' '}
                                            <Link
                                                to={ROUTES.SIGN_UP}
                                                style={{ color: '#4d6cfa' }}
                                            >
                                                here!
                                            </Link>{' '}
                                            Accounts from prior years have been
                                            reset.
                                        </small>
                                    </form>
                                </div>
                            </Typography>
                        </Grid>
                        <Grid item md={3} xs={0}></Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}
SignInForm.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(SignInForm);
