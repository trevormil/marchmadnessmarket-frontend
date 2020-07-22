//react
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//material ui
import { Container } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './app.css';
import themeObject from '../../../constants/theme';
//imports
import PortfolioPage from '../Portfolio';
import Navigation from '../../ui/Navigation';
import SignUpPage from '../SignUp/signuppage';
import SignInPage from '../SignIn/signinpage';
import BrowseStocksPage from '../BrowseStocks/browsestocks';
import HomePage from '../Home';
import NewsPage from '../News';
import AccountPage from '../Account';
import jwtDecode from 'jwt-decode';
import AuthRoute from '../../../constants/authroute.js';
import UserRoute from '../../../constants/userroute.js';
import * as ROUTES from '../../../constants/routes';
//redux
import { Provider } from 'react-redux';
import store from '../../../redux/stores';
import { SET_AUTHENTICATED } from '../../../redux/types';
import { logOutUser, getUserData } from '../../../redux/actions/userActions';
//axios
import axios from 'axios';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser());
    window.location.href = ROUTES.SIGN_IN;
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={themeObject}>
        <Provider store={store}>
          <Router >
            <div>
              <Container maxWidth="lg">
                <Navigation />
              </Container>
              <hr />
              <Route exact path={ROUTES.HOME} component={HomePage} />
              <AuthRoute exact path={ROUTES.SIGN_UP} component={SignUpPage} />
              <AuthRoute exact path={ROUTES.SIGN_IN} component={SignInPage} />
              <UserRoute exact path={ROUTES.ACCOUNT} component={AccountPage} />
              <UserRoute exact path={ROUTES.PORTFOLIO} component={PortfolioPage} />
              <UserRoute exact path={ROUTES.BROWSE} component={BrowseStocksPage} />
              <UserRoute exact path={ROUTES.NEWS} component={NewsPage} />
            </div>
          </Router >
        </Provider>
      </MuiThemeProvider>
    );
  }

}

export default App;