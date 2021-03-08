import {
  StyledTableCell,
  StyledTableRow,
} from "../../ui/StockInfoTable/styledTableComponents";
import React from "react";
import { TableRow } from "@material-ui/core";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
//all following functions help to create the stock info table on right side of stock page

export const stockInfoHeaderRow = (
  <TableRow>
    <StyledTableCell>Name</StyledTableCell>
    <StyledTableCell align="right">Data</StyledTableCell>
  </TableRow>
);

const getInfoRow = (title, data) => {
  return (
    <StyledTableRow key={title}>
      <StyledTableCell>{title}</StyledTableCell>
      <StyledTableCell align="right">
        {title === "Last Auction:" ||
        title === "BIN Price:" ||
        title === "Auction High:" ||
        title === "Auction Low:" ||
        title === "Auction Open:" ? (
          <MonetizationOnIcon />
        ) : (
          <p></p>
        )}
        {data}
      </StyledTableCell>
    </StyledTableRow>
  );
};

const getAllInfoRows = (dataArr) => {
  let display = dataArr.map((dataObj) => {
    return getInfoRow(dataObj.title, dataObj.data);
  });
  return display;
};
export const getInfoRows = (stock) => {
  return stock === undefined ||
    stock === null ||
    stock.price === undefined ||
    stock.price === null ? (
    <StyledTableRow>
      <StyledTableCell></StyledTableCell>
    </StyledTableRow>
  ) : (
    getAllInfoRows([
      {
        title: "Name:",
        data: stock.stockName,
      },
      { title: "Last Auction:", data: stock.price.toFixed(2) },
      { title: "BIN Price:", data: stock.ipoPrice.toFixed(2) },
      { title: "Current Points:", data: stock.currPoints },
      { title: "Market:", data: stock.market },
      { title: "Bio:", data: stock.bio },
      { title: "Auction High:", data: stock.high.toFixed(2) },
      { title: "Auction Low:", data: stock.low.toFixed(2) },
      { title: "Auction Open:", data: stock.open.toFixed(2) },
      { title: "Volume:", data: stock.volume },
      { title: "Market Cap:", data: stock.marketCap },
      { title: "Float:", data: stock.float },
      { title: "Dividends:", data: stock.dividends },
    ])
  );
};
