import {
  StyledTableCell,
  StyledTableRow,
} from "../../ui/StockInfoTable/styledTableComponents";
import React from "react";
import {
  TableSortLabel,
  TableRow,
  Button,
  CircularProgress,
} from "@material-ui/core";
import * as ROUTES from "../../../constants/routes";
import { Link } from "react-router-dom";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

//following four functions get the header rows for their respective tables on portfolio page

export const getPositionsHeaderRow = (orderBy, direction, handleClick) => {
  return (
    <TableRow>
      <StyledTableCell>
        <TableSortLabel
          name="stockName"
          direction={direction}
          active={orderBy === "stockName"}
          onClick={handleClick}
        >
          Name
        </TableSortLabel>
      </StyledTableCell>

      <StyledTableCell align="right">
        <TableSortLabel
          name="numShares"
          direction={direction}
          active={orderBy === "numShares"}
          onClick={handleClick}
        >
          Shares Owned
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        <TableSortLabel
          name="points"
          direction={direction}
          active={orderBy === "points"}
          onClick={handleClick}
        >
          Points per Share
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
        {title === "Portfolio Points:" || title === "Total Points:" ? (
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
  if (data.loading || user.daiTokenBalance == null) {
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

  return ownedStocks.length === 0 && user.accountBalance === null ? (
    <StyledTableCell></StyledTableCell>
  ) : (
    getAllSummaryRows([
      { title: "Dai Token Balance:", data: user.daiTokenBalance },
      { title: "Dai Token Staked:", data: user.stakingBalance },
      {
        title: "Dapp Token Balance: ",
        data: user.dappTokenBalance,
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
    if (stock === null || stock === undefined || !stock) return null;
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
            to={`${ROUTES.STOCKS}/${stock.stockName}`}
          >
            {stock.stockName}
          </Button>
        </StyledTableCell>
        <StyledTableCell align="right">{stock.numShares}</StyledTableCell>
        <StyledTableCell align="right">{stock.currPoints}</StyledTableCell>
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
  if (loading || !transactionHistory) {
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
          {transaction.sharesPrice}
        </StyledTableCell>
        <StyledTableCell align="right">
          <MonetizationOnIcon />
          {transaction.transactionValue}
        </StyledTableCell>
        <StyledTableCell align="right">
          {transaction.dateAndTime}
        </StyledTableCell>
      </StyledTableRow>
    );
  });
  if (currTransactions) return display;
  else return <StyledTableCell>Couldn't get any transactions.</StyledTableCell>;
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
        <StyledTableCell align="right">{trade.sharesTraded}</StyledTableCell>
        <StyledTableCell align="right">
          <MonetizationOnIcon />
          {trade.sharesPrice}
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
