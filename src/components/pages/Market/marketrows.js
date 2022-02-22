import {
  StyledTableCell,
  StyledTableRow,
} from "../../ui/StockInfoTable/styledTableComponents";
import React from "react";
import { TableRow, Button, CircularProgress } from "@mui/material";
import * as ROUTES from "../../../constants/routes";
import { Link } from "react-router-dom";

//import { getLogoName } from "../../../constants/logos";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { isInvalidDate } from "../../../helpers/validDates";
//following four functions get the header rows for their respective tables on portfolio page

export const openTradeHeaderRow = (
  <TableRow>
    <StyledTableCell>Stock Name</StyledTableCell>
    <StyledTableCell align="center">Seller</StyledTableCell>
    <StyledTableCell align="center">Date Posted</StyledTableCell>
    <StyledTableCell align="center"># Shares</StyledTableCell>
    <StyledTableCell align="center">Price</StyledTableCell>
    <StyledTableCell align="center">Total Value</StyledTableCell>
    <StyledTableCell align="center">Buy?</StyledTableCell>
  </TableRow>
);

//gets rows for user's open trades
export const getOpenTradeDisplay = (
  trades,
  loading,
  attemptToRemove,
  accountBalance
) => {
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
        <StyledTableCell component="th" scope="row" align="left">
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
        <StyledTableCell align="center">
          {trade.sellingUserName}
        </StyledTableCell>
        <StyledTableCell align="center">{trade.dateCreated}</StyledTableCell>
        <StyledTableCell align="center">{trade.sharesTraded}</StyledTableCell>
        <StyledTableCell align="center">
          <MonetizationOnIcon />
          {trade.sharesPrice.toFixed(2)}
        </StyledTableCell>
        <StyledTableCell align="center">
          <MonetizationOnIcon />
          {trade.sharesTraded * trade.sharesPrice}
        </StyledTableCell>
        {console.log(isInvalidDate())}
        <StyledTableCell align="center">
          <Button
            id={trade.tradeId}
            variant="contained"
            color="primary"
            onClick={attemptToRemove}
            disabled={
              isInvalidDate() ||
              trade.sharesTraded * trade.sharesPrice > accountBalance
            }
          >
            Buy
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    );
  });
  if (currTrade) return display;
  else
    return (
      <StyledTableRow>
        <StyledTableCell>No open orders. Check back later.</StyledTableCell>
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
      </StyledTableRow>
    );
};
