import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { Button, Typography, Paper, Grid, Container } from '@material-ui/core';
import { createChart } from 'lightweight-charts';
import { BootstrapInput } from '../../ui/TextInputs/textInputs';

const styles = (theme) => ({
    ...theme.spreadThis
});

const initalState = {
    stockData: {},
    stockId: window.location.pathname.split("/").pop(),
    stockHistory: [],
    availableTrades: [],
    numToSell: null,
    sellPrice: null
}


class StockPage extends Component {
    state = {
        stockData: {},
        stockId: window.location.pathname.split("/").pop(),
        stockHistory: [],
        availableTrades: [],
        numToSell: null,
        sellPrice: null
    }
    constructor(props) {
        super(props);
        this.setState(initalState);
        axios.get(`/stocks/${this.state.stockId}`).then(res => {
            this.setState({
                stockData: res.data
            })

        });
        axios.get(`/trades/all/${this.state.stockId}`).then(res => {
            this.setState({
                availableTrades: res.data
            })
        })
        axios.get(`/stocks/${this.state.stockId}/stockHistory`).then((res) => {
            let stockHistory = res.data;
            stockHistory.forEach(data => {
                data.time = (new Date(data.time._seconds * 1000).toLocaleString())
            })
            this.setState({ stockHistory });
            const tradingViewChartElement = document.getElementById("tradingviewchart");
            const chart = createChart(tradingViewChartElement, { width: tradingViewChartElement.clientWidth, height: 300 });
            const lineSeries = chart.addLineSeries();
            lineSeries.setData(this.state.stockHistory);
        });

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    getNumSharesOwned() {
        if (Object.keys(this.props.user.ownedStocks).length === 0) return 0;
        else {
            const foundStock = this.props.user.ownedStocks.find(stock => stock.stockName === this.state.stockData.stockName);
            if (foundStock) return foundStock.numShares;
            else return 0;
        }
    }
    attemptToBuy = (event) => {
        const tradeId = event.currentTarget.getAttribute('name');
        axios.put(`/trades/${tradeId}`).then(() => {
            window.location.reload();
        }).catch((err) => {
        })
    }
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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
            });
        }
    }
    render() {
        const { classes } = this.props;
        let buyTradeDisplay = Object.keys(this.state.availableTrades).length === 0 ? <p>None</p>
            : this.state.availableTrades.map(trade => {
                if (trade.completed === false) {
                    return <div display="inline-block">
                        <p>{trade.stockId}</p>
                        <Button name={trade.tradeId} onClick={this.attemptToBuy}>Buy</Button>
                    </div>
                } else return null;
            }
            );
        return < Container maxWidth="lg" >
            <Grid container spacing={3}>
                <Typography variant="h2" className={classes.pageTitle} align="center">
                    {this.state.stockData.stockName}
                </Typography>
                <Grid item xs={8}>
                    <div id="tradingviewchart" align="center">
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        Stats and Add to Watchlist
                        </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Available Trades: </Typography>
                    {buyTradeDisplay}
                </Grid>
                <Grid item xs={6}>
                    <Typography>Current # of Shares Owned: {this.getNumSharesOwned()} </Typography>
                    <BootstrapInput
                        name="numToSell"
                        value={this.state.numToSell}
                        onChange={this.handleInputChange}
                        placeholder="# Shares to Sell"
                    ></BootstrapInput>
                    <BootstrapInput
                        name="sellPrice"
                        value={this.state.sellPrice}
                        onChange={this.handleInputChange}
                        placeholder="Price"
                    ></BootstrapInput>
                    <Button onClick={this.attemptToSell}>
                        Sell
                    </Button>

                </Grid>
            </Grid>
        </Container >
    }
}

StockPage.propTypes = {
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    stockId: PropTypes.string.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

export default connect(mapStateToProps)(withStyles(styles)(StockPage));