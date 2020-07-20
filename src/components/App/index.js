import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from '@material-ui/core';

import PortfolioPage from '../Portfolio';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import BrowseStocksPage from '../BrowseStocks/browsestocks';
import HomePage from '../Home';
import AccountPage from '../Account';
import jwtDecode from 'jwt-decode';
import AuthRoute from '../../constants/authroute.js';

import * as ROUTES from '../../constants/routes';


let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = ROUTES.SIGN_IN;
    authenticated = false;
  } else {
    authenticated = true;
  }
} else {
  authenticated = false;
}

const App = () => (
  <Router>
    <div>
      <Container maxWidth="lg">
        <Navigation />
      </Container>
      <hr />

      <AuthRoute exact path={ROUTES.LANDING} component={LandingPage} authenticated={authenticated} />
      <AuthRoute exact path={ROUTES.SIGN_UP} component={SignUpPage} authenticated={authenticated} />
      <AuthRoute exact path={ROUTES.SIGN_IN} component={SignInPage} authenticated={authenticated} />
      <AuthRoute exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} authenticated={authenticated} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.PORTFOLIO} component={PortfolioPage} />
      <Route exact path={ROUTES.BROWSE} component={BrowseStocksPage} />
    </div>
  </Router>
);

export { authenticated };
export default App;