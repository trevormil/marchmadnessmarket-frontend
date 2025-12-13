import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as ROUTES from '../../../constants/routes';
import { logOutUser } from '../../../redux/actions/userActions';

interface Tab {
    label: string;
    linkTo?: string;
    buttonOnClick?: boolean;
}

interface TabsProps {
    value: string;
    authenticated: boolean;
    loggedInOnly?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
    value,
    authenticated,
    loggedInOnly = false,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authenticatedTabs: Tab[] = [
        { label: 'Home', linkTo: ROUTES.HOME },
        { label: 'Teams', linkTo: ROUTES.BROWSE },
        { label: 'Leaderboard', linkTo: ROUTES.LEADERBOARD },
    ];

    const nonAuthenticatedTabs: Tab[] = [
        { label: 'Home', linkTo: ROUTES.HOME },
        { label: 'Teams', linkTo: ROUTES.BROWSE },
        { label: 'Leaderboard', linkTo: ROUTES.LEADERBOARD },
    ];

    const signInTabs: Tab[] = [{ label: 'Login', linkTo: ROUTES.SIGN_IN }];

    const signOutTabs: Tab[] = [
        { label: 'Portfolio', linkTo: ROUTES.PORTFOLIO },
        { label: 'Logout', buttonOnClick: true },
    ];

    const handleLogout = () => {
        dispatch(logOutUser());
        const currentPath = window.location.pathname;
        const isNonAuthPath = nonAuthenticatedTabs.some(
            (tab) => tab.linkTo === currentPath
        );
        if (!isNonAuthPath) {
            navigate(ROUTES.SIGN_IN);
        }
    };

    const tabsToShow = authenticated
        ? loggedInOnly
            ? signOutTabs
            : authenticatedTabs
        : loggedInOnly
        ? signInTabs
        : nonAuthenticatedTabs;

    return (
        <div className="flex items-center gap-1">
            {tabsToShow.map((tab) => {
                const selected = value === tab.linkTo;

                if (tab.buttonOnClick) {
                    return (
                        <button
                            key={tab.label}
                            onClick={handleLogout}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                                selected
                                    ? 'bg-slate-800 text-white border border-slate-700'
                                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                }

                return (
                    <Link
                        key={tab.label}
                        to={tab.linkTo!}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                            selected
                                ? 'bg-slate-800 text-white border border-slate-700'
                                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
};

export default Tabs;
