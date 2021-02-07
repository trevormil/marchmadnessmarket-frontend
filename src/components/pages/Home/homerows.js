import {
  StyledTableCell,
  StyledTableRow,
} from "../../ui/StockInfoTable/styledTableComponents";
import React from "react";
import { TableRow } from "@material-ui/core";
import { getLogoName } from "../../../constants/logos";

//all following functions help to create the stock info table on right side of stock page

export const infoHeaderRow = (
  <TableRow>
    <StyledTableCell align="center">Logo</StyledTableCell>
    <StyledTableCell align="center">Name</StyledTableCell>

    <StyledTableCell align="center">Price</StyledTableCell>
    <StyledTableCell align="center">Points</StyledTableCell>
  </TableRow>
);

export const getInfoRows = (stocks) => {
  return stocks === undefined || stocks === null ? (
    <StyledTableRow>
      <StyledTableCell></StyledTableCell>
    </StyledTableRow>
  ) : (
    stocks.map((stock) => {
      let file = "./logos/" + getLogoName(stock.stockName);
      return (
        <StyledTableRow key={stock.stockName}>
          <StyledTableCell align="center">
            <img height="50px" width="50px" alt="Team Logo" src={file} />
          </StyledTableCell>
          <StyledTableCell align="center">{stock.stockName}</StyledTableCell>
          <StyledTableCell align="center">{stock.price}</StyledTableCell>
          <StyledTableCell align="center">{stock.currPoints}</StyledTableCell>
        </StyledTableRow>
      );
    })
  );
};
