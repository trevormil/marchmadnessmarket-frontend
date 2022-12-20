//react
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//material ui
import { Container, Grid } from '@mui/material';
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
import emailList from './components/pages/EmailList/emailList';
import portfolio from './components/pages/UserPortfolio/portfolio';
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
                                    path={ROUTES.EMAILLIST}
                                    component={emailList}
                                />
                                <Route
                                    exact
                                    path="/stocks/:stockId"
                                    component={StocksPage}
                                />
                                {/* <Route exact path="/rules" component={RulesPage} /> */}
                            </div>
                            <div className="footer">
                                <Container>
                                    <Grid container spacing={3}>
                                        <Grid
                                            item
                                            xs={12}
                                            align="center"
                                            style={{
                                                paddingTop: 45,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: 'white',
                                            }}
                                        >
                                            <div>
                                                For feedback or questions,
                                                please use{' '}
                                                <a
                                                    href="https://us14.list-manage.com/survey?u=69ac8d65ddbf7f3d487964f5f&id=30be53df48&e=*|UNIQID|*"
                                                    style={{
                                                        color: 'darkblue',
                                                    }}
                                                >
                                                    this form
                                                </a>{' '}
                                                or
                                                <a
                                                    style={{
                                                        color: 'darkblue',
                                                    }}
                                                    href="mailto:trevormil@comcast.net"
                                                >
                                                    {' '}
                                                    send us an e-mail.
                                                </a>
                                            </div>
                                            <br />
                                            <div>
                                                Disclaimer: This web app was
                                                made for fun. It uses no real
                                                money, and no profit will be
                                                made from this web app.
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </div>
                        </Router>
                    </Provider>
                </ThemeProvider>
            </StyledEngineProvider>
        );
    }
}

export default App;
