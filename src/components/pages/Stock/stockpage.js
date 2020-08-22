import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { getBuyTradeDisplay, getSellTradeDisplay } from './tradeDisplay'
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { setOwnedStocks } from '../../../redux/actions/userActions';

import { getCurrStock, getTradesForCurrStock } from '../../../redux/actions/dataActions';
import { Button, Typography, Grid, Container, CircularProgress } from '@material-ui/core';
import { createChart } from 'lightweight-charts';
import { BootstrapInput } from '../../ui/TextInputs/textInputs';
import { stockInfoHeaderRow, getInfoRows } from './stockInfoRows';

const styles = (theme) => ({
    ...theme.spreadThis
});

const waitForURLUpdate = () => {
    let splitPathName = window.location.pathname.split("/");

    while (splitPathName[splitPathName.length - 2] !== "stocks") {
        splitPathName = window.location.pathname.split("/");
    }
    return window.location.pathname.split("/").pop();
}

class StockPage extends Component {

    state = {
        stockId: waitForURLUpdate("stocks"),
        numToSell: 0,
        sellPrice: "",
        numToBuy: 0,
        numToIPOSell: 0
    }
    constructor(props) {
        super(props);
        this.props.getCurrStock(this.props.data, this.props.data.filters, this.state.stockId);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getNumSharesOwned = this.getNumSharesOwned.bind(this);
        this.attemptToBuy = this.attemptToBuy.bind(this);
        this.attemptToSell = this.attemptToSell.bind(this);
        this.attemptToIPOBuy = this.attemptToIPOBuy.bind(this);

    }
    getChartDisplay() {
        const tradingViewChartElement = document.getElementById("tradingviewchart");
        if (!this.props.data.loading && tradingViewChartElement !== null) {
            tradingViewChartElement.innerHTML = null;
            const chart = createChart(tradingViewChartElement, { width: 500, height: 300 });
            const lineSeries = chart.addLineSeries();
            lineSeries.setData(this.props.data.currStock.stockHistory);
        }
    }
    getNumSharesOwned() {
        if (this.props.data.loading
            || this.props.user.loading) return "Loading..."
        else {
            const foundStock = this.props.user.ownedStocks.find(stock => stock.stockName === this.props.data.currStock.stockData.stockName);
            if (foundStock) return foundStock.numShares;
            else return 0;
        }
    }
    attemptToBuy = (event) => {
        const tradeId = event.currentTarget.getAttribute('name');
        axios.put(`/trades/${tradeId}`).then(() => {
            this.props.setOwnedStocks(this.props.user);
            this.props.getCurrStock(this.props.data, this.props.data.filters, this.state.stockId);
        });
    }
    attemptToIPOBuy = () => {
        axios({
            method: 'put',
            url: `/stocks/${this.state.stockId}/buyIpo`,
            data: {
                numShares: Number(this.state.numToBuy)
            }
        }).then(() => {
            this.setState({
                numToBuy: null
            });
            document.getElementById("numToBuy").value = null;
            this.props.setOwnedStocks(this.props.user);
            this.props.getCurrStock(this.props.data, this.props.data.filters, this.state.stockId);
        });
    }
    attemptToIPOSell = () => {
        axios({
            method: 'put',
            url: `/stocks/${this.state.stockId}/sellIpo`,
            data: {
                numShares: Number(this.state.numToIPOSell)
            }
        }).then(() => {
            this.setState({
                numToIPOSell: null
            });
            document.getElementById("numToIPOSell").value = null;
            this.props.setOwnedStocks(this.props.user);
            this.props.getCurrStock(this.props.data, this.props.data.filters, this.state.stockId);
        });
    }
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    attemptToRemove = (event) => {
        const tradeId = event.currentTarget.getAttribute('name');
        axios.delete(`/trades/${tradeId}`).then(() => {
            this.props.setOwnedStocks(this.props.user);
            this.props.getCurrStock(this.props.data, this.props.data.filters, this.state.stockId);
        });
    }
    attemptToSell = () => {
        if (!isNaN(this.state.numToSell) && !isNaN(this.state.sellPrice)) {
            axios({
                method: 'post',
                url: '/trades',
                data: {
                    stockId: this.state.stockId,
                    sharesPrice: Number(this.state.sellPrice),
                    sharesTraded: Number(this.state.numToSell),
                    buy: false
                }
            }).then(() => {
                this.setState({
                    numToSell: null,
                    sellPrice: null
                });
                document.getElementById("numToSell").value = null;
                document.getElementById("sellPrice").value = null;
                this.props.getTradesForCurrStock(this.props.data, this.state.stockId);
            })
        }

    }
    render() {
        const { classes } = this.props;
        let buyTradeDisplay = getBuyTradeDisplay(this.props.data.currStock.trades, this.props.user.userId, this.attemptToBuy, this.props.data.loading || this.props.user.loading);

        let sellTradeDisplay = getSellTradeDisplay(this.props.data.currStock.trades, this.props.user.userId, this.attemptToRemove, this.props.data.loading || this.props.user.loading);
        const numSharesOwned = this.getNumSharesOwned();
        this.getChartDisplay();
        return < Container maxWidth="lg" >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2" className={classes.pageTitle} align="center">
                        {this.props.data.loading || this.props.data.currStock.stockData === null
                            ? <CircularProgress size={30} /> : this.props.data.currStock.stockData.stockName}
                    </Typography>
                    <hr />
                </Grid>

                <Grid item xs={12} sm={7} align="center">
                    <Typography variant="h6" className={classes.pageTitle} align="center">
                        Price Chart
                    </Typography>
                    <div id="tradingviewchart" align="center">
                        <CircularProgress size={30} />
                    </div>
                    <Typography variant="h6" className={classes.pageTitle} align="center">
                        Shares Owned: {numSharesOwned}
                    </Typography>
                    <Typography variant="h6" className={classes.pageTitle} align="center">
                        Account Balance: {
                            this.props.user.loading || this.props.data.loading ? "Loading..." :
                                `$${this.props.user.accountBalance.toFixed(2)}`
                        }
                    </Typography>

                    <div>

                        <BootstrapInput
                            id="numToSell"
                            name="numToSell"
                            value={this.state.numToSell}
                            onChange={this.handleInputChange}
                            placeholder="# Shares to Sell"
                            type="number"
                        ></BootstrapInput>
                        <BootstrapInput
                            id="sellPrice"
                            name="sellPrice"
                            value={this.state.sellPrice}
                            onChange={this.handleInputChange}
                            placeholder="Price per Share"
                            type="number"
                        ></BootstrapInput>
                        <Button color="primary" variant="contained" onClick={this.attemptToSell}
                            disabled={
                                this.props.data.currStock.stockData === null || this.state.numToSell <= 0 || this.state.sellPrice <= 0 || this.state.numToSell === null || this.state.numToSell > numSharesOwned
                            }>
                            Sell
                    </Button>

                    </div>
                    <hr />
                    <div>
                        <BootstrapInput
                            id="numToBuy"
                            name="numToBuy"
                            value={this.state.numToBuy}
                            onChange={this.handleInputChange}
                            placeholder="# Shares to Buy"
                            type="number"
                        ></BootstrapInput>

                        <Typography display="inline"> at ${
                            this.props.data.currStock.stockData && this.props.data.currStock.stockData.ipoPrice ? this.props.data.currStock.stockData.ipoPrice.toFixed(2) : "Loading..."
                        } per share</Typography>
                        <Button color="primary" variant="contained" onClick={this.attemptToIPOBuy}
                            disabled={
                                this.props.data.currStock.stockData === null || this.state.numToBuy <= 0 || this.state.numToBuy === null || this.state.numToBuy * this.props.data.currStock.stockData.ipoPrice > this.props.user.accountBalance
                            }>
                            Instant Buy
                        </Button>
                    </div>
                    <hr />
                    <div>
                        <BootstrapInput
                            id="numToIPOSell"
                            name="numToIPOSell"
                            value={this.state.numToIPOSell}
                            onChange={this.handleInputChange}
                            placeholder="# Shares to Sell"
                        ></BootstrapInput>

                        <Typography display="inline"> at ${
                            this.props.data.currStock.stockData ? (this.props.data.currStock.stockData.ipoPrice / 2).toFixed(2) : "Loading..."
                        } per share</Typography>
                        <Button color="primary"
                            variant="contained"
                            onClick={this.attemptToIPOSell}
                            disabled={
                                this.props.data.currStock.stockData === null || this.state.numToIPOSell <= 0 || this.state.numToIPOSell === null || this.state.numToIPOSell > numSharesOwned
                            }>
                            Instant Sell
                        </Button>
                    </div>



                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6" className={classes.pageTitle} align="center">
                        Statistics and Info
                    </Typography>
                    {this.props.data.loading
                        ? <CircularProgress size={30} />
                        : <CustomizedTables headerRow={stockInfoHeaderRow} rows={getInfoRows(this.props.data.currStock.stockData)}></CustomizedTables>}
                </Grid>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={6}>

                    <Typography variant="h6" className={classes.pageTitle} align="center">
                        Current Sellers
                    </Typography>
                    {buyTradeDisplay}
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" className={classes.pageTitle} align="center">
                        Your Sell Orders
                    </Typography>
                    {sellTradeDisplay}

                </Grid>
            </Grid>
        </Container >
    }
}

StockPage.propTypes = {
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data
});
const mapActionsToProps = {
    setOwnedStocks,
    getCurrStock,
    getTradesForCurrStock
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(StockPage));