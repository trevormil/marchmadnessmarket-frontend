import TabUnstyled from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { logOutUser } from '../../../redux/actions/userActions';
import store from '../../../redux/stores';

export const Tab = TabUnstyled;
export const TabsList = TabsListUnstyled;

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
            <TabsUnstyled
                value={this.props.value}
                defaultValue={this.props.value}
            >
                <TabsList className="flex">
                    {tabsToShow.map((tab) => {
                        let link = tab.linkTo;

                        const selected = this.props.value === link;

                        return (
                            <Tab
                                className={`p-2 mx-1 rounded-lg cursor-pointer text-gray-100 ${
                                    selected
                                        ? 'bg-blue-500 shadow-md'
                                        : 'hover:bg-blue-500 hover:shadow-md'
                                }`}
                                style={{ fontSize: '1.25rem' }}
                                component={Link}
                                to={link}
                                onClick={(event) => {
                                    this.props.handleChange(event, link);
                                    if (tab.buttonOnClick) {
                                        this.logOut();
                                    }
                                }}
                                value={link}
                                key={tab.label}
                            >
                                <div
                                    style={{
                                        textAlign: 'center',
                                        verticalAlign: 'center',
                                    }}
                                >
                                    <b> {tab.label}</b>
                                </div>
                            </Tab>
                        );
                    })}
                </TabsList>
            </TabsUnstyled>
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
