//react
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//material ui
import { Grid } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import './app.css';
import themeObject from './constants/theme';
//imports
// import PortfolioPage from './components/pages/Portfolio/portfolio';
import Navigation from './components/ui/Navigation/navigation';
import SignUpPage from './components/pages/SignUp/signuppage';
import SignInForm from './components/pages/SignIn/signinform';
import BrowseStocksPage from './components/pages/BrowseStocks/browsePage';
import HomePage from './components/pages/Home/home';
import StocksPage from './components/pages/Stock/stockpage';
import RulesPage from './components/pages/Rules/rulesPage';
import ScoresPage from './components/pages/Schedule/schedule';

import UserPage from './components/pages/User/userpage';
import BracketPage from './components/pages/Bracket/bracket';
// import MarketPage from './components/pages/Market/market';
// import LeaderboardPage from './components/pages/Leaderboard/leaderboardPage';
import jwtDecode from 'jwt-decode';
import AuthRoute from './constants/authroute.js';
// import UserRoute from './constants/userroute.js';
import * as ROUTES from './constants/routes';
//redux
import { Provider } from 'react-redux';
import store from './redux/stores';
import { SET_AUTHENTICATED } from './redux/types';
import { logOutUser, getUserData } from './redux/actions/userActions';
//axios
import axios from 'axios';
import leaderboard from './components/pages/Leaderboard/leaderboard';
axios.defaults.baseURL = 'https://us-central1-tm-market.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = ROUTES.SIGN_IN;
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
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themeObject}>
                    <Provider store={store}>
                        <Router>
                            <div className="navbar">
                                <Navigation />
                            </div>

                            <div className="page">
                                <Route
                                    exact
                                    path={ROUTES.HOME}
                                    component={HomePage}
                                />
                                <Route
                                    exact
                                    path={ROUTES.BRACKET}
                                    component={BracketPage}
                                />
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
                                {/* <UserRoute
                                    exact
                                    path={ROUTES.PORTFOLIO}
                                    component={PortfolioPage}
                                /> */}
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
                            <div className="footer">
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    align="center"
                                    style={{
                                        paddingTop: 15,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: 'white',
                                    }}
                                >
                                    <div>
                                        For feedback or questions, visit our{' '}
                                        <a href="https://github.com/trevormil/Fantasy-Sports-Stock-Market/issues">
                                            GitHub Issues
                                        </a>{' '}
                                        page or
                                        <a href="mailto:trevormil@comcast.net">
                                            {' '}
                                            send us an e-mail.
                                        </a>
                                    </div>
                                    <br />
                                    <div>
                                        Disclaimer: This web app was made for fun.
                                        It uses no real money, and no profit will be
                                        made from this web app.
                                    </div>
                                </Grid>
                            </div>
                        </Router>
                    </Provider>
                </ThemeProvider>
            </StyledEngineProvider>
        );
    }
}

export default App;
