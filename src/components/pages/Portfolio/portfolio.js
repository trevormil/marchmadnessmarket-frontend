import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTradesForCurrStock, getStocks } from '../../../redux/actions/dataActions'
import { updateUserPortfolioData, setOwnedStocks } from '../../../redux/actions/userActions'
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createChart } from 'lightweight-charts';
import {
    getPositionsHeaderRow, getOpenTradeDisplay, openTradeHeaderRow,
    summaryHeaderRow, getSummaryRows, getStockRows, transactionHistoryHeaderRow, getTransactionRows
} from './rows';
import { sort } from '../../ui/StockInfoTable/filterFunctions';
import axios from 'axios';

const styles = (theme) => ({
    ...theme.spreadThis
});


class PortfolioPage extends Component {
    state = {
        orderBy: "name",
        direction: "asc",
    };
    constructor(props) {
        super(props);
        this.handleClickOnSortLabel = this.handleClickOnSortLabel.bind(this);
        this.attemptToRemove = this.attemptToRemove.bind(this);
        this.getChartDisplay = this.getChartDisplay.bind(this);
        if (!this.props.user.loading) {
            this.props.updateUserPortfolioData(this.props.user);
        }
    }
    getChartDisplay() {
        const tradingViewChartElement = document.getElementById("tradingviewchart");
        if (!this.props.user.loading && tradingViewChartElement !== null) {
            tradingViewChartElement.innerHTML = null;
            const chart = createChart(tradingViewChartElement, { width: 500, height: 300 });
            const areaSeries = chart.addAreaSeries();
            areaSeries.setData(this.props.user.accountHistory);
        }
    }
    attemptToRemove(event) {
        const tradeId = event.currentTarget.getAttribute("id");
        axios.delete(`/trades/${tradeId}`).then(() => {
            this.props.getTradesForCurrStock(this.props.data, this.props.data.currStock.stockId);
            this.props.setOwnedStocks(this.props.user);
        });
    }
    //handles when arrow icon on table is clicked
    handleClickOnSortLabel(event) {
        const orderByName = event.currentTarget.getAttribute('name');
        const dir = this.state.direction === "asc" ? "desc" : "asc";
        this.setState({
            orderBy: orderByName,
            direction: dir
        });
        sort(this.props.user.ownedStocks, orderByName, dir);
    }
    render() {
        const { classes } = this.props;
        let stockDisplay = getStockRows(this.props.user.ownedStocks, (this.props.user.loading || this.props.data.loading));
        let summaryDisplay = getSummaryRows(this.props.user.ownedStocks, this.props.user, this.props.data);
        let transactionDisplay = getTransactionRows(this.props.user.transactions, this.props.user.loading);
        let openTradeDisplay = getOpenTradeDisplay(this.props.user.openTrades, (this.props.user.loading || this.props.data.loading), this.attemptToRemove);
        this.getChartDisplay();

        return (
            <div className={classes.root}>
                <div className="whiteBG">
                    <Grid item xs={12}>
                        <Typography variant="h2" className={classes.pageTitle} align="center">
                            Portfolio
                        </Typography>
                    </Grid>
                </div>
                <hr />
                <Grid container spacing={3} justify="space-around">
                    <Grid item xs={7}>
                        <Typography variant="h6" className={classes.pageTitle} align="center">
                            Current Positions
                        </Typography>
                        <CustomizedTables rows={stockDisplay} headerRow={getPositionsHeaderRow(this.state.orderBy, this.state.direction, this.handleClickOnSortLabel)} />
                        <Typography variant="p" className={classes.pageTitle} align="center">
                            *Note that adjusted price is based on halfway between the instant buy and instant sell prices.
                        </Typography>
                        <Typography variant="h6" className={classes.pageTitle} align="center">
                            Recent Transactions
                            </Typography><div max-height="30px">
                            <CustomizedTables headerRow={transactionHistoryHeaderRow} rows={transactionDisplay} />
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h6" className={classes.pageTitle} align="center">
                            Account Summary
                        </Typography>
                        <CustomizedTables rows={summaryDisplay} headerRow={summaryHeaderRow} />
                        <Typography variant="h6" className={classes.pageTitle} align="center">
                            Open Sell Orders
                        </Typography>
                        <CustomizedTables headerRow={openTradeHeaderRow} rows={openTradeDisplay}></CustomizedTables>

                        <Typography variant="h6" className={classes.pageTitle} align="center">
                            Account Value Chart
                        </Typography>
                        <div id="tradingviewchart" align="center">
                            <CircularProgress size={30} />
                        </div>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

PortfolioPage.propTypes = {
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
    updateUserPortfolioData,
    setOwnedStocks,
    getTradesForCurrStock,
    getStocks
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(PortfolioPage));