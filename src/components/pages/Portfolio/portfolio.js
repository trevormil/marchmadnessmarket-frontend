import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    // getTradesForCurrStock,
    getStocks,
} from '../../../redux/actions/dataActions';
import {
    updateUserPortfolioData,
    setOwnedStocks,
} from '../../../redux/actions/userActions';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createChart } from 'lightweight-charts';
import {
    getPositionsHeaderRow,
    getOpenTradeDisplay,
    openTradeHeaderRow,
    summaryHeaderRow,
    getSummaryRows,
    getStockRows,
    transactionHistoryHeaderRow,
    getTransactionRows,
} from './portfolioRows';
import { sort } from '../../../helpers/filterFunctions';
import axios from 'axios';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class PortfolioPage extends Component {
    state = {
        orderBy: 'name',
        direction: 'asc',
        chart: null,
    };
    constructor(props) {
        super(props);
        this.handleClickOnSortLabel = this.handleClickOnSortLabel.bind(this);
        this.attemptToRemove = this.attemptToRemove.bind(this);
        this.getChartDisplay = this.getChartDisplay.bind(this);

        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        if (!this.props.user.loading) {
            this.props.updateUserPortfolioData(this.props.user);
        }
    }
    getChartDisplay() {
        const tradingViewChartElement =
            document.getElementById('tradingviewchart');
        if (
            this.state.chart === null &&
            !this.props.user.loading &&
            tradingViewChartElement !== null
        ) {
            tradingViewChartElement.innerHTML = null;
            const chart = createChart(tradingViewChartElement, {
                width: 650,
                height: 400,
            });
            const lineSeries = chart.addLineSeries();
            if (this.props.user.accountHistory !== null) {
                lineSeries.setData(this.props.user.accountHistory);
            }
            this.setState({
                chart: chart,
            });
        }
    }
    attemptToRemove(event) {
        const tradeId = event.currentTarget.getAttribute('id');
        axios.delete(`/trades/${tradeId}`).then(() => {
            this.props.getTradesForCurrStock(
                this.props.data,
                this.props.data.currStock.stockId
            );
            this.props.setOwnedStocks(this.props.user);
        });
    }
    //handles when arrow icon on table is clicked
    handleClickOnSortLabel(event) {
        const orderByName = event.currentTarget.getAttribute('name');
        const dir = this.state.direction === 'asc' ? 'desc' : 'asc';
        this.setState({
            orderBy: orderByName,
            direction: dir,
        });
        sort(this.props.user.ownedStocks, orderByName, dir);
    }
    componentDidUpdate() {
        this.getChartDisplay();
    }
    render() {
        const { classes } = this.props;
        let stockDisplay = getStockRows(
            this.props.user.ownedStocks,
            this.props.user.loading || this.props.data.loading
        );
        let summaryDisplay = getSummaryRows(
            this.props.user.ownedStocks,
            this.props.user,
            this.props.data
        );
        let transactionDisplay = getTransactionRows(
            this.props.user.transactions,
            this.props.user.loading
        );
        let openTradeDisplay = getOpenTradeDisplay(
            this.props.user.openTrades,
            this.props.user.loading || this.props.data.loading,
            this.attemptToRemove
        );

        return (
            <div className={classes.root}>
                <div className="whiteBG">
                    <Grid item xs={12}>
                        <Typography
                            variant="h2"
                            className={classes.pageTitle}
                            align="center"
                        >
                            Portfolio
                        </Typography>
                    </Grid>
                </div>
                <hr />
                <Grid container spacing={3} justify="space-around">
                    <Grid item xs={7}>
                        {/* <div className="portfolio-card">
                            <Typography
                                variant="h4"
                                className={classes.pageTitle}
                                align="center"
                            >
                                Account Value Chart
                            </Typography>
                            <div id="tradingviewchart" align="center">
                                <CircularProgress size={30} color="secondary" />
                            </div>
                        </div>
                        <p align="center">
                            Note: Account value charts are updated once daily at
                            12:00 AM EST.
                        </p> */}
                        {/* <div className="portfolio-card">
                            <Typography
                                variant="h4"
                                className={classes.pageTitle}
                                align="center"
                            >
                                Recent Transactions
                            </Typography>
                            <div
                                style={{
                                    maxHeight: '250px',
                                    overflow: 'scroll',
                                }}
                            >
                                <CustomizedTables
                                    headerRow={transactionHistoryHeaderRow}
                                    rows={transactionDisplay}
                                />
                            </div>
                        </div> */}
                    </Grid>
                    <Grid item xs={5}>
                        <div className="portfolio-card">
                            <Typography
                                variant="h4"
                                className={classes.pageTitle}
                                align="center"
                            >
                                Account Summary
                            </Typography>
                            <CustomizedTables
                                rows={summaryDisplay}
                                headerRow={summaryHeaderRow}
                            />
                        </div>
                        <div className="portfolio-card">
                            <Typography
                                variant="h4"
                                className={classes.pageTitle}
                                align="center"
                            >
                                Current Positions
                            </Typography>
                            <div
                                style={{
                                    maxHeight: '555px',
                                    overflow: 'scroll',
                                }}
                            >
                                <CustomizedTables
                                    rows={stockDisplay}
                                    headerRow={getPositionsHeaderRow(
                                        this.state.orderBy,
                                        this.state.direction,
                                        this.handleClickOnSortLabel
                                    )}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
            </div>
        );
    }
}

PortfolioPage.propTypes = {
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
    updateUserPortfolioData,
    setOwnedStocks,
    // getTradesForCurrStock,
    getStocks,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(PortfolioPage));
