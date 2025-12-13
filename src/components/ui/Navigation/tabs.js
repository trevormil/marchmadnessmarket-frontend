import * as React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { logOutUser } from '../../../redux/actions/userActions';
import store from '../../../redux/stores';

class TabBase extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    authenticatedTabs = [
        {
            label: 'Home',
            linkTo: ROUTES.HOME,
        },
        {
            label: 'Teams',
            linkTo: ROUTES.BROWSE,
        },
        {
            label: 'Leaderboard',
            linkTo: ROUTES.LEADERBOARD,
        },
    ];

    nonAuthenticatedTabs = [
        {
            label: 'Home',
            linkTo: ROUTES.HOME,
        },
        {
            label: 'Teams',
            linkTo: ROUTES.BROWSE,
        },
        {
            label: 'Leaderboard',
            linkTo: ROUTES.LEADERBOARD,
        },
    ];

    signInTabs = [
        {
            label: 'Login',
            linkTo: ROUTES.SIGN_IN,
        },
    ];

    signOutTabs = [
        {
            label: 'Portfolio',
            linkTo: ROUTES.PORTFOLIO,
        },
        {
            label: 'Logout',
            buttonOnClick: true,
        },
    ];

    logOut = () => {
        const currURL = `/${window.location.pathname.split('/').pop()}`;
        let nonAuthTab = false;
        store.dispatch(logOutUser());
        this.nonAuthenticatedTabs.forEach((tab) => {
            if (tab.linkTo === currURL) nonAuthTab = true;
        });
        if (!nonAuthTab) this.setState({ value: ROUTES.SIGN_IN });
        else
            this.setState({
                value: `/${window.location.pathname.split('/').pop()}`,
            });
    };

    render() {
        const tabsToShow = this.props.authenticated
            ? this.props.loggedInOnly
                ? this.signOutTabs
                : this.authenticatedTabs
            : this.props.loggedInOnly
            ? this.signInTabs
            : this.nonAuthenticatedTabs;

        return (
            <div className="flex items-center gap-2">
                {tabsToShow.map((tab) => {
                    let link = tab.linkTo;
                    const selected = this.props.value === link;

                    if (tab.buttonOnClick) {
                        return (
                            <button
                                key={tab.label}
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.logOut();
                                }}
                                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                    selected
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={tab.label}
                            to={link}
                            onClick={(event) => {
                                this.props.handleChange(event, link);
                            }}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                selected
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                                    : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700 hover:text-white hover:scale-105'
                            }`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(TabBase);
