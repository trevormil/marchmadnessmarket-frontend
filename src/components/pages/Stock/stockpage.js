import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { getBuyTradeDisplay, getSellTradeDisplay } from "./tradeDisplay";
import CustomizedTables from "../../ui/StockInfoTable/stockTable";
import { setOwnedStocks } from "../../../redux/actions/userActions";
import {
  getCurrStock,
  getTradesForCurrStock,
} from "../../../redux/actions/dataActions";
import { getUserData } from "../../../redux/actions/userActions";
import {
  Button,
  Typography,
  Grid,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { createChart } from "lightweight-charts";
import { BootstrapInput } from "../../ui/TextInputs/textInputs";
import { stockInfoHeaderRow, getInfoRows } from "./stockInfoRows";

import { isInvalidDate } from "../../../helpers/validDates";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

import DaiToken from "../../../abis/DaiToken.json";
import DappToken from "../../../abis/DappToken.json";
import TokenFarm from "../../../abis/TokenFarm.json";

const fetch = require('node-fetch');
const styles = (theme) => ({
  ...theme.spreadThis,
});

const waitForURLUpdate = () => {
  let splitPathName = window.location.pathname.split("/");

  while (splitPathName[splitPathName.length - 2] !== "stocks") {
    splitPathName = window.location.pathname.split("/");
  }
  return window.location.pathname.split("/").pop();
};

class StockPage extends Component {
  state = {
    stockId: waitForURLUpdate(),
    numToSell: "",
    sellPrice: "",
    numToBuy: "",
    numToIPOSell: "",
    chart: null,
    daiToken: {},
    dappToken: {},
    tokenFarm: {},
    loading: true,
  };

  constructor(props) {
    super(props);
    this.props.getCurrStock(
      this.props.data,
      this.props.data.filters,
      this.state.stockId
    );

    this.handleInputChange = this.handleInputChange.bind(this);
    this.getNumSharesOwned = this.getNumSharesOwned.bind(this);
    this.attemptToBuy = this.attemptToBuy.bind(this);
    this.attemptToSell = this.attemptToSell.bind(this);
    this.attemptToIPOBuy = this.attemptToIPOBuy.bind(this);
  }

  async componentWillMount() {
    await this.loadBlockchainData();
    await this.props.getUserData();
  }
  async loadBlockchainData() {
    const web3 = window.web3;

    const networkId = await web3.eth.net.getId();

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(
        DaiToken.abi,
        daiTokenData.address
      );
      this.setState({ daiToken });
    } else {
      window.alert("DaiToken contract not deployed to detected network.");
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId];
    if (dappTokenData) {
      const dappToken = new web3.eth.Contract(
        DappToken.abi,
        dappTokenData.address
      );
      this.setState({ dappToken });
    } else {
      window.alert("DappToken contract not deployed to detected network.");
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        TokenFarm.abi,
        tokenFarmData.address
      );
      this.setState({ tokenFarm });
    } else {
      window.alert("TokenFarm contract not deployed to detected network.");
    }
    this.setState({ loading: false });
  }

  getChartDisplay() {
    const tradingViewChartElement = document.getElementById("tradingviewchart");
    if (
      this.state.chart === null &&
      !this.props.data.loading &&
      tradingViewChartElement !== null
    ) {
      tradingViewChartElement.innerHTML = null;
      const chart = createChart(tradingViewChartElement, {
        width: 600,
        height: 300,
      });
      const lineSeries = chart.addLineSeries();
      if (this.props.data.currStock.stockHistory !== null) {
        lineSeries.setData(this.props.data.currStock.stockHistory);
      }
      this.setState({
        chart: chart,
      });
    }
  }
  getNumSharesOwned() {
    if (this.props.data.loading || this.props.user.loading) return "Loading...";
    else {
      const foundStock = this.props.user.ownedStocks.find(
        (stock) =>
          stock.stockName === this.props.data.currStock.stockData.stockName
      );
      console.log(this.props.user.ownedStocks);
      if (foundStock) return foundStock.numShares;
      else return 0;
    }
  }
  attemptToBuy = (event) => {
    const tradeId = event.currentTarget.getAttribute("name");
    axios.put(`/trades/${tradeId}`).then(() => {
      this.props.setOwnedStocks(this.props.user);
      this.props.getCurrStock(
        this.props.data,
        this.props.data.filters,
        this.state.stockId
      );
    });
  };
  attemptToIPOBuy = () => {
    axios({
      method: "put",
      url: `/stocks/${this.state.stockId}/buyIpo`,
      data: {
        numShares: Number(this.state.numToBuy),
      },
    }).then(() => {
      this.setState({
        numToBuy: null,
      });
      document.getElementById("numToBuy").value = null;
      this.props.setOwnedStocks(this.props.user);
      this.props.getCurrStock(
        this.props.data,
        this.props.data.filters,
        this.state.stockId
      );
    });
  };
  attemptToIPOSell = () => {
    axios({
      method: "put",
      url: `/stocks/${this.state.stockId}/sellIpo`,
      data: {
        numShares: Number(this.state.numToIPOSell),
      },
    }).then(() => {
      this.setState({
        numToIPOSell: null,
      });
      document.getElementById("numToIPOSell").value = null;
      this.props.setOwnedStocks(this.props.user);
      this.props.getCurrStock(
        this.props.data,
        this.props.data.filters,
        this.state.stockId
      );
    });
  };
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  attemptToRemove = (event) => {
    const tradeId = event.currentTarget.getAttribute("name");
    axios.delete(`/trades/${tradeId}`).then(() => {
      this.props.setOwnedStocks(this.props.user);
      this.props.getCurrStock(
        this.props.data,
        this.props.data.filters,
        this.state.stockId
      );
    });
  };
  attemptToSell = () => {
    if (!isNaN(this.state.numToSell) && !isNaN(this.state.sellPrice)) {
      axios({
        method: "post",
        url: "/trades",
        data: {
          stockId: this.state.stockId,
          sharesPrice: Number(this.state.sellPrice),
          sharesTraded: Number(this.state.numToSell),
          buy: false,
        },
      }).then(() => {
        this.setState({
          numToSell: null,
          sellPrice: null,
        });
        document.getElementById("numToSell").value = null;
        document.getElementById("sellPrice").value = null;
        this.props.getTradesForCurrStock(this.props.data, this.state.stockId);
      });
    }
  };

  stakeTokens = () => {
    this.setState({ loading: true });
    this.state.daiToken.methods
      .approve(this.state.tokenFarm._address, this.state.numToBuy)
      .send({ from: this.props.user.address })
      .on("transactionHash", (hash) => {
        this.state.tokenFarm.methods
          .stakeTokens(this.state.numToBuy, this.state.stockId)
          .send({ from: this.props.user.address })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
      });
  };

  unstakeTokens = () => {
    this.setState({ loading: true });
    this.state.tokenFarm.methods
      .unstakeTokens(this.state.numToSell, this.state.stockId)
      .send({ from: this.props.user.address })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };
  componentDidUpdate() {
    this.getChartDisplay();
  }
  render() {
    const { classes } = this.props;
    let buyTradeDisplay = getBuyTradeDisplay(
      this.props.data.currStock.trades,
      this.props.user.userId,
      this.attemptToBuy,
      this.props.data.loading || this.props.user.loading
    );

    let sellTradeDisplay = getSellTradeDisplay(
      this.props.data.currStock.trades,
      this.props.user.userId,
      this.attemptToRemove,
      this.props.data.loading || this.props.user.loading
    );
    const numSharesOwned = this.getNumSharesOwned();
    const filename = this.props.data.currStock.stockData.imageUrl;

    

const url = 'https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&collection=kryptokits';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
    return (
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              className={classes.pageTitle}
              align="center"
            >
              {this.props.data.loading ||
              this.props.data.currStock.stockData === null ? (
                <CircularProgress size={30} />
              ) : (
                this.props.data.currStock.stockData.stockName
              )}
            </Typography>
            <div align="center">
              {this.props.data.loading ||
              this.props.data.currStock.stockData === null ? (
                <CircularProgress size={30} />
              ) : (
                <img
                  align="center"
                  width="150px"
                  height="150px"
                  src={filename}
                  alt="Team Logo"
                />
              )}
            </div>

            <hr />
          </Grid>

          <Grid item xs={12} sm={7} align="center">
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Shares Owned: {numSharesOwned}
                </Typography>
                <Typography variant="h4" align="center">
                  Dai Token Balance: <MonetizationOnIcon />
                  {this.props.user.loading || this.props.data.loading
                    ? "Loading..."
                    : `${this.props.user.daiTokenBalance}`}
                </Typography>
              </section>
              <div>
                <BootstrapInput
                  id="numToBuy"
                  name="numToBuy"
                  value={this.state.numToBuy}
                  onChange={this.handleInputChange}
                  placeholder="# Shares to Buy"
                  type="number"
                ></BootstrapInput>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.stakeTokens}
                  disabled={
                    isInvalidDate() ||
                    this.props.data.currStock.stockData === null ||
                    this.state.numToBuy <= 0 ||
                    this.state.numToBuy === null ||
                    Number(this.state.numToBuy) > Number(this.props.user.daiTokenBalance)
                  }
                >
                  Deposit
                </Button>
              </div>
              <hr />
              <div>
                <BootstrapInput
                  id="numToSell"
                  name="numToSell"
                  value={this.state.numToSell}
                  onChange={this.handleInputChange}
                  placeholder="# Shares to Sell"
                  type="number"
                ></BootstrapInput>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.unstakeTokens}
                  disabled={
                    this.props.data.currStock.stockData === null ||
                    this.state.numToSell <= 0 ||
                    this.state.numToSell === null ||
                    Number(this.state.numToSell) > numSharesOwned
                  }
                >
                  Withdraw
                </Button>
              </div>
              {/*
              <hr />
              <div>
                <BootstrapInput
                  id="numToIPOSell"
                  name="numToIPOSell"
                  value={this.state.numToIPOSell}
                  onChange={this.handleInputChange}
                  placeholder="# Shares to Sell"
                ></BootstrapInput>
                

                
                <Typography display="inline">
                  {" "}
                  at $
                  {this.props.data.currStock.stockData.ipoPrice
                    ? (
                        this.props.data.currStock.stockData.ipoPrice / 2
                      ).toFixed(2)
                    : "Loading..."}{" "}
                  per share
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.attemptToIPOSell}
                  disabled={
                    this.props.data.currStock.stockData === null ||
                    this.state.numToIPOSell <= 0 ||
                    this.state.numToIPOSell === null ||
                    this.state.numToIPOSell > numSharesOwned
                  }
                >
                  Instant Sell
                </Button>
              </div>
              */}
            </div>
            {/* 
            <div className="portfolio-card">
              <Typography
                variant="h4"
                className={classes.pageTitle}
                align="center"
              >
                Price Chart
              </Typography>
              <div id="tradingviewchart" align="center">
                <CircularProgress size={30} color="secondary" />
              </div>
            </div>
            */}
          </Grid>
          <Grid item xs={5}>
            <div className="portfolio-card">
              <Typography
                variant="h4"
                className={classes.pageTitle}
                align="center"
              >
                Statistics and Info
              </Typography>
              {this.props.data.loading ? (
                <CircularProgress size={30} />
              ) : (
                <CustomizedTables
                  headerRow={stockInfoHeaderRow}
                  rows={getInfoRows(this.props.data.currStock.stockData)}
                ></CustomizedTables>
              )}
            </div>
          </Grid>
          {/*
          <Grid item xs={12}>
            <hr />
          </Grid>
          <Grid item xs={6}>
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Current Sellers
                </Typography>
              </section>

              {buyTradeDisplay}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Your Sell Orders
                </Typography>
              </section>
              {sellTradeDisplay}
            </div>
          </Grid>
           */}
        </Grid>
      </Container>
    );
  }
}

StockPage.propTypes = {
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
  data: state.data,
});
const mapActionsToProps = {
  setOwnedStocks,
  getCurrStock,
  getTradesForCurrStock,
  getUserData,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(StockPage));
