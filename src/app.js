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
import BrowseStocksPage from "./components/pages/BrowseStocks/browsePage";
import HomePage from "./components/pages/Home/home";
import StocksPage from "./components/pages/Stock/stockpage";
import RulesPage from "./components/pages/Rules/rulesPage";
import ScoresPage from "./components/pages/Schedule/schedule";
import UserPage from "./components/pages/User/userpage";
import BracketPage from "./components/pages/Bracket/bracket";
import MarketPage from "./components/pages/Market/market";
import LeaderboardPage from "./components/pages/Leaderboard/leaderboardPage";
import * as ROUTES from "./constants/routes";
//redux
import { Provider } from "react-redux";
import store from "./redux/stores";

import Web3 from "web3";
import PointToken from "./abis/PointToken.json";
import SportToken from "./abis/SportToken.json";

import DaiToken from "./abis/DaiToken.json";
import DappToken from "./abis/DappToken.json";
import TokenFarm from "./abis/TokenFarm.json";

import Main from "./Main";
class App extends React.Component {
  async componentWillMount() {
    await this.loadWeb3();
  }


  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

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
                  <Route
                    exact
                    path={ROUTES.PORTFOLIO}
                    component={PortfolioPage}
                  />
                  <Route exact path={ROUTES.SCHEDULE} component={ScoresPage} />
                  <Route
                    exact
                    path={ROUTES.BROWSE}
                    component={BrowseStocksPage}
                  />
                  <Route exact path={ROUTES.MARKET} component={MarketPage} />
                  <Route
                    exact
                    path={ROUTES.LEADERBOARD}
                    component={LeaderboardPage}
                  />
                  <Route exact path="/users/:userId" component={UserPage} />
                  <Route exact path="/stocks/:stockId" component={StocksPage} />
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
