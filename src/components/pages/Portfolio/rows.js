import { StyledTableCell, StyledTableRow } from '../../ui/StockInfoTable/tableComponents';
import React from 'react';
import TableRow from '@material-ui/core/TableRow';

export const positionsHeaderRow = (<TableRow>
    <StyledTableCell>Name</StyledTableCell>
    <StyledTableCell align="right">Last Price</StyledTableCell>
    <StyledTableCell align="right">Avg Buy Price</StyledTableCell>
    <StyledTableCell align="right">Shares Owned</StyledTableCell>
    <StyledTableCell align="right">Total Value</StyledTableCell>
    <StyledTableCell align="right">Profit/Loss</StyledTableCell>
</TableRow>);

export const summaryHeaderRow = (<TableRow>
    <StyledTableCell>Name</StyledTableCell>
    <StyledTableCell align="right">Data</StyledTableCell>
</TableRow>);

export const transactionHistoryHeaderRow = (<TableRow>
    <StyledTableCell>Stock Name</StyledTableCell>
    <StyledTableCell># Shares</StyledTableCell>
    <StyledTableCell>Price</StyledTableCell>
    <StyledTableCell align="right">Value</StyledTableCell>
    <StyledTableCell align="right">Date & Time</StyledTableCell>
</TableRow>);

const getSummaryRow = (title, data) => {
    return <StyledTableRow>
        <StyledTableCell>
            {title}
        </StyledTableCell>
        <StyledTableCell align="left">{data}</StyledTableCell>
    </StyledTableRow>
}

const getAllSummaryRows = (dataArr) => {
    let display = dataArr.map(dataObj => {
        return getSummaryRow(dataObj.title, dataObj.data)
    });
    return display;
}
export const getSummaryRows = (ownedStocks, statistics) => {
    return Object.keys(ownedStocks).length === 0
        ? <StyledTableCell></StyledTableCell>
        : getAllSummaryRows([{ title: "Account Value:", data: statistics.totalValue },
        { title: "Total Profit:", data: statistics.totalProfit }]);
}

export const getStockRows = (ownedStocks) => {
    return Object.keys(ownedStocks).length === 0
        ? <StyledTableCell></StyledTableCell>
        : ownedStocks.map(stock => <StyledTableRow key={stock.stockId}>
            <StyledTableCell component="th" scope="row">
                {stock.stockName}
            </StyledTableCell>
            <StyledTableCell align="right">{stock.currPrice}</StyledTableCell>
            <StyledTableCell align="right">{stock.avgBuyPrice}</StyledTableCell>
            <StyledTableCell align="right">{stock.numShares}</StyledTableCell>
            <StyledTableCell align="right">{stock.numShares * stock.currPrice}</StyledTableCell>
            <StyledTableCell align="right">{(stock.currPrice - stock.avgBuyPrice) * stock.numShares}</StyledTableCell>
        </StyledTableRow>);
}

export const getTransactionRows = (transactionHistory) => {
    return Object.keys(transactionHistory).length === 0
        ? <StyledTableCell>Loading</StyledTableCell>
        : transactionHistory.map(transaction => <StyledTableRow key={transaction.tradeId}>
            <StyledTableCell component="th" scope="row">
                {transaction.stockName}
            </StyledTableCell>
            <StyledTableCell align="right">{transaction.sharesTraded}</StyledTableCell>
            <StyledTableCell align="right">{transaction.sharesPrice}</StyledTableCell>
            <StyledTableCell align="right">{transaction.transactionValue}</StyledTableCell>
            <StyledTableCell align="right">{(new Date(transaction.dateAndTime)).toLocaleString()}</StyledTableCell>
        </StyledTableRow>);
}