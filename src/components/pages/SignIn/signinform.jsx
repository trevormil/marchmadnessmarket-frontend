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
            <div className="min-h-[calc(100vh-4rem)] bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="text-slate-400">
                            Sign in to your March Madness Market account
                        </p>
                    </div>

                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8">
                        <form onSubmit={this.onSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-slate-300 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className={`w-full px-4 py-3 bg-slate-950/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                        errors.email
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                                            : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/50'
                                    }`}
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-slate-300 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-3 bg-slate-950/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                        errors.password
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                                            : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/50'
                                    }`}
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    required
                                />
                                {errors.error && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.error.substring(
                                            errors.error.indexOf('auth/') + 5
                                        )}
                                    </p>
                                )}
                                {errors.general && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.general}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={currLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-blue-500/50 disabled:to-blue-500/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-blue-900/20 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                {currLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </button>

                            <p className="text-center text-sm text-slate-400">
                                Don't have an account?{' '}
                                <Link
                                    to={ROUTES.SIGN_UP}
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                >
                                    Sign up here!
                                </Link>
                            </p>
                            <p className="text-center text-xs text-slate-500">
                                Accounts from prior years have been reset.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
SignInForm.propTypes = {
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
