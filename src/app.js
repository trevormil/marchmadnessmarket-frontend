//react
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//material ui
import { Container } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "./app.css";
import themeObject from "./constants/theme";
//imports
import PortfolioPage from "./components/pages/Portfolio/portfolio";
import Navigation from "./components/ui/Navigation/navigation";
import SignUpPage from "./components/pages/SignUp/signuppage";
import SignInForm from "./components/pages/SignIn/signinform";
import BrowseStocksPage from "./components/pages/BrowseStocks/browsePage";
import HomePage from "./components/pages/Home/home";
import StocksPage from "./components/pages/Stock/stockpage";
import RulesPage from "./components/pages/Rules/rulesPage";
import ScoresPage from "./components/pages/Schedule/schedule";

import UserPage from "./components/pages/User/userpage";
import BracketPage from "./components/pages/Bracket/bracket";
import MarketPage from "./components/pages/Market/market";
import LeaderboardPage from "./components/pages/Leaderboard/leaderboardPage";
import jwtDecode from "jwt-decode";
import AuthRoute from "./constants/authroute.js";
import UserRoute from "./constants/userroute.js";
import * as ROUTES from "./constants/routes";
//redux
import { Provider } from "react-redux";
import store from "./redux/stores";
import { SET_AUTHENTICATED } from "./redux/types";
import { logOutUser, getUserData } from "./redux/actions/userActions";
//axios
import axios from "axios";
axios.defaults.baseURL = "https://us-central1-tm-market.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = ROUTES.SIGN_IN;
    store.dispatch(logOutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={themeObject}>
        <Provider store={store}>
          <Router>
            <div className="navbar">
              <Navigation />
            </div>
            <Container maxWidth="lg">
              <div className="middle-block">
                <div className="page">
                  <Route exact path={ROUTES.HOME} component={HomePage} />
                  <Route exact path={ROUTES.BRACKET} component={BracketPage} />
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
                  <UserRoute
                    exact
                    path={ROUTES.PORTFOLIO}
                    component={PortfolioPage}
                  />
                  <Route exact path={ROUTES.SCHEDULE} component={ScoresPage} />
                  <UserRoute
                    exact
                    path={ROUTES.BROWSE}
                    component={BrowseStocksPage}
                  />
                  <UserRoute
                    exact
                    path={ROUTES.MARKET}
                    component={MarketPage}
                  />
                  <UserRoute
                    exact
                    path={ROUTES.LEADERBOARD}
                    component={LeaderboardPage}
                  />
                  <UserRoute exact path="/users/:userId" component={UserPage} />
                  <UserRoute
                    exact
                    path="/stocks/:stockId"
                    component={StocksPage}
                  />
                  <Route exact path="/rules" component={RulesPage} />
                </div>
              </div>
            </Container>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
