import * as React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { logOutUser } from '../../../redux/actions/userActions';
import store from '../../../redux/stores';
import { connect } from 'react-redux';
import { Typography, Container } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
const styles = (theme) => ({
    ...theme.spreadThis,
});

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

export const Tab = styled(TabUnstyled)`
    font-family: IBM Plex Sans, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px 16px;
    margin: 6px 6px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: ${blue[400]};
    }

    &:focus {
        color: #fff;
        border-radius: 3px;
        outline: 2px solid ${blue[200]};
        outline-offset: 2px;
    }

    &.${tabUnstyledClasses.selected} {
        background-color: ${blue[50]};
        color: ${blue[600]};
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
`;

export const TabsList = styled(TabsListUnstyled)`
    background-color: ${'#1976d2'};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
`;

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
            label: 'Bracket',
            linkTo: ROUTES.BRACKET,
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
            label: 'Bracket',
            linkTo: ROUTES.BRACKET,
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
                <TabsList>
                    {tabsToShow.map((tab) => {
                        let link = tab.linkTo;

                        return (
                            <Tab
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
                                    {tab.label}
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

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(TabBase));
