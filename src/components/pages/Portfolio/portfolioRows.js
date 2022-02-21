import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import React from 'react';
import {
    TableSortLabel,
    TableRow,
    Button,
    CircularProgress,
} from '@material-ui/core';
import * as ROUTES from '../../../constants/routes';
import { Link } from 'react-router-dom';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

//following four functions get the header rows for their respective tables on portfolio page

export const getPositionsHeaderRow = (orderBy, direction, handleClick) => {
    return (
        <TableRow>
            <StyledTableCell>
                <TableSortLabel
                    name="stockName"
                    direction={direction}
                    active={orderBy === 'stockName'}
                    onClick={handleClick}
                >
                    Name
                </TableSortLabel>
            </StyledTableCell>

            <StyledTableCell align="right">
                <TableSortLabel
                    name="numShares"
                    direction={direction}
                    active={orderBy === 'numShares'}
                    onClick={handleClick}
                >
                    Shares Owned
                </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right">
                <TableSortLabel
                    name="points"
                    direction={direction}
                    active={orderBy === 'points'}
                    onClick={handleClick}
                >
                    Points per Share
                </TableSortLabel>
            </StyledTableCell>

            <StyledTableCell align="right">
                <TableSortLabel
                    name="totalValue"
                    direction={direction}
                    active={orderBy === 'totalValue'}
                    onClick={handleClick}
                >
                    Total Points Value
                </TableSortLabel>
            </StyledTableCell>
        </TableRow>
    );
};

export const summaryHeaderRow = (
    <TableRow>
        <StyledTableCell>Name</StyledTableCell>
        <StyledTableCell align="right">Data</StyledTableCell>
    </TableRow>
);

export const transactionHistoryHeaderRow = (
    <TableRow>
        <StyledTableCell>Stock Name</StyledTableCell>
        <StyledTableCell align="right"># Shares</StyledTableCell>
        <StyledTableCell align="right">Price</StyledTableCell>
        <StyledTableCell align="right">Value</StyledTableCell>
        <StyledTableCell align="right">Date</StyledTableCell>
    </TableRow>
);

export const openTradeHeaderRow = (
    <TableRow>
        <StyledTableCell>Stock Name</StyledTableCell>
        <StyledTableCell># Shares</StyledTableCell>
        <StyledTableCell>Price</StyledTableCell>
        <StyledTableCell align="right">Value</StyledTableCell>
        <StyledTableCell align="right"></StyledTableCell>
    </TableRow>
);

//following three functions work to get account summary rows

const getSummaryRow = (title, data) => {
    return (
        <StyledTableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell align="right">
                {title === 'Portfolio Points:' || title === 'Total Points:' ? (
                    <p></p>
                ) : (
                    <MonetizationOnIcon />
                )}
                {data}
            </StyledTableCell>
        </StyledTableRow>
    );
};

const getAllSummaryRows = (dataArr) => {
    let display = dataArr.map((dataObj) => {
        return getSummaryRow(dataObj.title, dataObj.data);
    });

    return display;
};

export const getSummaryRows = (ownedStocks, user, data) => {
    if (data.loading || user.accountBalance == null) {
        return (
            <StyledTableRow>
                <StyledTableCell align="right">
                    <div>
                        <CircularProgress size={30} />
                    </div>
                </StyledTableCell>
            </StyledTableRow>
        );
    }
    //let totalBoughtValue = 0;
    let totalValue = 0;
    let totalPortfolioPoints = 0;
    // let totalProfit = 0;
    ownedStocks.forEach((stock) => {
        //totalBoughtValue += stock.totalBoughtValue;
        totalValue += stock.totalValue;
        totalPortfolioPoints += stock.currPoints * stock.numShares;
        //totalProfit += stock.totalProfit;
    });
    return ownedStocks.length === 0 && user.accountBalance === null ? (
        <StyledTableCell></StyledTableCell>
    ) : (
        getAllSummaryRows([
            { title: 'Account Balance:', data: user.accountBalance.toFixed(2) },
            {
                title: 'Total Points:',
                data: totalPortfolioPoints.toFixed(0),
            },
        ])
    );
};

//gets the rows for all stocks that are owned
export const getStockRows = (ownedStocks, loading) => {
    if (loading) {
        return (
            <StyledTableRow>
                <StyledTableCell>
                    <CircularProgress size={30} />
                </StyledTableCell>
            </StyledTableRow>
        );
    }
    let currTrade = false;
    const display = ownedStocks.map((stock) => {
        if (
            stock === null ||
            stock === undefined ||
            !stock ||
            stock.currPrice === null ||
            stock.currPrice === undefined
        )
            return null;
        currTrade = true;
        return (
            <StyledTableRow key={stock.stockId}>
                <StyledTableCell>
                    <Button
                        fullWidth
                        align="center"
                        variant="contained"
                        color="primary"
                        size="small"
                        component={Link}
                        to={`${ROUTES.STOCKS}/${stock.stockId}`}
                    >
                        {stock.stockName}
                    </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                    {stock.numShares}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {stock.currPoints}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {stock.currPoints * stock.numShares}
                </StyledTableCell>
            </StyledTableRow>
        );
    });
    if (currTrade) return display;
    else
        return (
            <StyledTableRow>
                <StyledTableCell>No positions.</StyledTableCell>
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell />
            </StyledTableRow>
        );
};

//gets table rows for recent transactions
export const getTransactionRows = (transactionHistory, loading) => {
    if (loading) {
        return (
            <StyledTableRow>
                <StyledTableCell>
                    <CircularProgress size={30} />
                </StyledTableCell>
            </StyledTableRow>
        );
    }
    let currTransactions = false;
    const display = transactionHistory.map((transaction) => {
        currTransactions = true;
        return (
            <StyledTableRow key={transaction.tradeId}>
                <StyledTableCell component="th" scope="row">
                    {transaction.stockName}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {transaction.sharesTraded}
                </StyledTableCell>
                <StyledTableCell align="right">
                    <MonetizationOnIcon />
                    {transaction.sharesPrice.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="right">
                    <MonetizationOnIcon />
                    {transaction.transactionValue.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {transaction.dateAndTime}
                </StyledTableCell>
            </StyledTableRow>
        );
    });
    if (currTransactions) return display;
    else
        return (
            <StyledTableCell>Couldn't get any transactions.</StyledTableCell>
        );
};

//gets rows for user's open trades
export const getOpenTradeDisplay = (trades, loading, attemptToRemove) => {
    if (loading) {
        return (
            <StyledTableRow>
                <StyledTableCell>
                    <CircularProgress size={30} />
                </StyledTableCell>
            </StyledTableRow>
        );
    }
    let currTrade = false;
    const display = trades.map((trade) => {
        currTrade = true;
        return (
            <StyledTableRow key={trade.tradeId}>
                <StyledTableCell component="th" scope="row">
                    <Button
                        fullWidth
                        component={Link}
                        to={`${ROUTES.STOCKS}/${trade.stockId}`}
                        align="center"
                        variant="contained"
                        color="primary"
                        size="medium"
                    >
                        {trade.stockName}
                    </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                    {trade.sharesTraded}
                </StyledTableCell>
                <StyledTableCell align="right">
                    <MonetizationOnIcon />
                    {trade.sharesPrice.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="right">
                    <MonetizationOnIcon />
                    {trade.sharesTraded * trade.sharesPrice}
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Button
                        id={trade.tradeId}
                        variant="contained"
                        color="primary"
                        onClick={attemptToRemove}
                    >
                        Remove
                    </Button>
                </StyledTableCell>
            </StyledTableRow>
        );
    });
    if (currTrade) return display;
    else
        return (
            <StyledTableRow>
                <StyledTableCell>No open sell orders.</StyledTableCell>
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell />
            </StyledTableRow>
        );
};
