import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
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
        return (
            <div className="min-h-[calc(100vh-4rem)] bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-white mb-2">
                            Create Account
                        </h2>
                        <p className="text-slate-400">
                            Join March Madness Market and start trading teams
                        </p>
                    </div>

                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8">
                        <form
                            noValidate
                            onSubmit={this.handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="userName"
                                    className="block text-sm font-semibold text-slate-300 mb-2"
                                >
                                    Username
                                </label>
                                <input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    placeholder="Choose a username"
                                    className={`w-full px-4 py-3 bg-slate-950/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                        errors.userName
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                                            : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/50'
                                    }`}
                                    value={this.state.userName}
                                    onChange={this.handleChange}
                                    required
                                />
                                {errors.userName && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.userName}
                                    </p>
                                )}
                            </div>

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
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-semibold text-slate-300 mb-2"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-3 bg-slate-950/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                        errors.confirmPassword
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                                            : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/50'
                                    }`}
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    required
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.confirmPassword}
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
                                        <span>Creating account...</span>
                                    </>
                                ) : (
                                    <span>Sign Up</span>
                                )}
                            </button>

                            <p className="text-center text-sm text-slate-400">
                                Already have an account?{' '}
                                <Link
                                    to={ROUTES.SIGN_IN}
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
});

export default connect(mapStateToProps, { signUpUser })(SignUpForm);
