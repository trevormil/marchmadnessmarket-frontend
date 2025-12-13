import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import TabBase from './tabs';

const getInitialState = () => {
    const pathName = window.location.pathname.split('/');
    if (pathName[pathName.length - 2] === 'stocks') {
        return ROUTES.BROWSE;
    } else return `/${pathName.pop()}`;
};

class Navigation extends React.Component {
    state = {
        value: getInitialState(),
        matches: window.matchMedia('(min-width: 1215px)').matches,
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        });
    };

    render() {
        if (this.state.matches) {
            return (
                <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo Section */}
                            <Link
                                to={ROUTES.HOME}
                                className="flex items-center space-x-3 group cursor-pointer"
                            >
                                <img
                                    src="/mmm-logo-cropped.jpg"
                                    alt="MMM Logo"
                                    className="h-10 w-10 rounded-lg transition-transform group-hover:scale-110"
                                />
                                <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                    March Madness Market
                                </span>
                            </Link>

                            {/* Main Navigation */}
                            <div className="flex items-center">
                                <TabBase
                                    value={this.state.value}
                                    authenticated={this.props.authenticated}
                                    handleChange={this.handleChange}
                                />
                            </div>

                            {/* User Section */}
                            <div className="flex items-center space-x-4">
                                {this.props.user.authenticated && (
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                                            <span className="text-slate-300 text-sm font-medium">
                                                $
                                                {this.props.user
                                                    .accountBalance || 0}
                                            </span>
                                            <svg
                                                className="w-5 h-5 text-amber-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.613 1.242.96 2.853 1.236V18a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 15.766 14 14.991 14 14c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 11.092V9.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.613-1.242-.96-2.853-1.236V6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                                            <span className="text-slate-300 text-sm font-medium">
                                                {this.props.user
                                                    .totalAccountValue || 0}
                                            </span>
                                            <span className="text-slate-400 text-xs">
                                                Points
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <TabBase
                                    loggedInOnly
                                    authenticated={this.props.authenticated}
                                    value={this.state.value}
                                    handleChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </nav>
            );
        } else {
            return (
                <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg">
                    <div className="px-4">
                        <div className="flex items-center justify-between h-16">
                            <TabBase
                                value={this.state.value}
                                authenticated={this.props.authenticated}
                                handleChange={this.handleChange}
                            />
                            <TabBase
                                loggedInOnly
                                authenticated={this.props.authenticated}
                                value={this.state.value}
                                handleChange={this.handleChange}
                            />
                        </div>
                    </div>
                </nav>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    user: state.user,
});

Navigation.propTypes = {
    user: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(Navigation);
