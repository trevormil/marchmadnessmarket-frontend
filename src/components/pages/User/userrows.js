import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../ui/StockInfoTable/styledTableComponents";

//gets all rows for all users and account values
export function getRows(stocks) {
  if (stocks && stocks.length === 0) {
    return <StyledTableCell>No owned stocks.</StyledTableCell>;
  }
  return stocks ? (
    stocks.map((row) => {
      return (
        <StyledTableRow>
          <StyledTableCell align="right">{row.stockName}</StyledTableCell>
          <StyledTableCell align="right">{row.numShares}</StyledTableCell>
          <StyledTableCell align="right">
            {row.avgBuyPrice.toFixed(2)}
          </StyledTableCell>
        </StyledTableRow>
      );
    })
  ) : (
    <StyledTableCell>Couldn't find any owned stocks.</StyledTableCell>
  );
}

//gets the leaderboard header row
export function getHeaderRow() {
  return (
    <TableRow>
      <StyledTableCell align="left">Stock Name</StyledTableCell>
      <StyledTableCell align="right"># Shares Owned</StyledTableCell>
      <StyledTableCell align="left">Avg. Buy Price</StyledTableCell>
    </TableRow>
  );
}
