import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { createChart } from 'lightweight-charts';
import { positionsHeaderRow, summaryHeaderRow, getSummaryRows, getStockRows, transactionHistoryHeaderRow, getTransactionRows } from './rows';
import axios from 'axios';
const styles = (theme) => ({
    ...theme.spreadThis
});

const getStatistics = (ownedStocks) => {
    let totalValue = 0, totalProfit = 0;
    if (Object.keys(ownedStocks).length > 0) {
        ownedStocks.forEach(stock => {
            totalValue += stock.numShares * stock.currPrice;
            totalProfit += (stock.currPrice - stock.avgBuyPrice) * stock.numShares;
        })
    }
    return {
        totalValue,
        totalProfit
    }
}

const initalState = {

    transactionHistory: {},
    accountHistory: []
}

class PortfolioPage extends Component {
    state = {
        transactionHistory: {},
        accountHistory: []
    }
    constructor(props) {
        super(props);
        this.setState(initalState);
        //gets transaction history
        axios.get("/transactions").then((res) => {
            let transactionHistory = res.data;
            transactionHistory.forEach(transaction => {
                transaction.dateAndTime = transaction.dateAndTime._seconds * 1000;
            })
            this.setState({ transactionHistory })
        }).catch(err => {
            console.log(err);
        });
        //gets account history
        axios.get("/accountHistory").then((res) => {
            let accountHistory = res.data;
            accountHistory.forEach(data => {
                data.time = (new Date(data.time._seconds * 1000).toLocaleString())
            })
            this.setState({ accountHistory });
            const tradingViewChartElement = document.getElementById("tradingviewchart");
            const chart = createChart(tradingViewChartElement, { width: tradingViewChartElement.clientWidth, height: 300 });
            const lineSeries = chart.addLineSeries();
            lineSeries.setData(this.state.accountHistory);
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        const { classes } = this.props;
        let stockDisplay = getStockRows(this.props.user.ownedStocks);
        let statistics = getStatistics(this.props.user.ownedStocks);
        let summaryDisplay = getSummaryRows(this.props.user.ownedStocks, statistics);
        let transactionDisplay = getTransactionRows(this.state.transactionHistory);

        return (
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h2" className={classes.pageTitle} align="center">
                            Portfolio
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <CustomizedTables rows={stockDisplay} headerRow={positionsHeaderRow} />
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <CustomizedTables headerRow={transactionHistoryHeaderRow} rows={transactionDisplay} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Typography variant="h6" className={classes.pageTitle} align="center">
                            Account Value:
                        </Typography>
                        <div id="tradingviewchart" align="center">
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>Other charts and data</Paper>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <CustomizedTables rows={summaryDisplay} headerRow={summaryHeaderRow} />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

PortfolioPage.propTypes = {
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

export default connect(mapStateToProps)(withStyles(styles)(PortfolioPage));