//react
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

//material ui
import { Container, Grid } from '@mui/material';
import './app.css';

//imports
import BrowseStocksPage from './components/pages/BrowseStocks/browsePage';
import HomePage from './components/pages/Home/home';
import SignInForm from './components/pages/SignIn/signinform';
import SignUpPage from './components/pages/SignUp/signuppage';
import StocksPage from './components/pages/Stock/stockModal';
import Navigation from './components/ui/Navigation/navigation';

import jwtDecode from 'jwt-decode';
import UserPage from './components/pages/User/userpage';
import AuthRoute from './constants/authroute.js';
import * as ROUTES from './constants/routes';

//redux
import { Provider } from 'react-redux';
import { getUserData, logOutUser } from './redux/actions/userActions';
import store from './redux/stores';
import { SET_AUTHENTICATED } from './redux/types';
//axios
import axios from 'axios';
import leaderboard from './components/pages/Leaderboard/leaderboard';
import portfolio from './components/pages/User/portfolio';

axios.defaults.baseURL = 'https://us-central1-tm-market.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        // window.location.href = ROUTES.SIGN_IN;
        store.dispatch(logOutUser());
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="navbar">
                        <Navigation />
                    </div>

                    <div className="page">
                        <Route exact path={ROUTES.HOME} component={HomePage} />
                        <AuthRoute
                            exact
                            path={ROUTES.SIGN_UP}
                            component={SignUpPage}
                        />
                        <AuthRoute
                            exact
                            path={ROUTES.SIGN_IN}
                            component={SignInForm}
                        />
                        <Route
                            exact
                            path={ROUTES.PORTFOLIO}
                            component={portfolio}
                        />
                        {/* <Route
                                    exact
                                    path={ROUTES.SCHEDULE}
                                    component={ScoresPage}
                                /> */}
                        <Route
                            exact
                            path={ROUTES.BROWSE}
                            component={BrowseStocksPage}
                        />
                        {/* <UserRoute
                                    exact
                                    path={ROUTES.MARKET}
                                    component={MarketPage}
                                /> */}
                        <Route
                            exact
                            path={ROUTES.LEADERBOARD}
                            component={leaderboard}
                        />
                        <Route
                            exact
                            path="/users/:userId"
                            component={UserPage}
                        />
                        <Route
                            exact
                            path="/stocks/:stockId"
                            component={StocksPage}
                        />
                        {/* <Route exact path="/rules" component={RulesPage} /> */}
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
