import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
//import { getLogoName } from "../../../constants/logos";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import {
  Button,
  Checkbox,
  CircularProgress,
  Typography,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../ui/StockInfoTable/styledTableComponents";
import { inWatchlist } from "../../../helpers/filterFunctions";

//gets all rows for table for all stocks that match current filters
export function getRows(stocks, watchlist, handleClick, classes) {
  if (stocks === null || stocks === "undefined") {
    return (
      <StyledTableRow>
        <StyledTableCell>
          <Typography align="center" variant="h6">
            Error. No stocks found.
          </Typography>
        </StyledTableCell>
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
      </StyledTableRow>
    );
  }
  if (stocks.length === 0) {
    return (
      <StyledTableRow>
        <StyledTableCell>
          <Typography align="center" variant="h6">
            No matches
          </Typography>
        </StyledTableCell>
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
      </StyledTableRow>
    );
  }

  return stocks ? (
    stocks.map((row) => (
      <StyledTableRow key={row.stockId}>
        <StyledTableCell component="th" scope="row" align="left">
          <Button
            fullWidth
            component={Link}
            to={`${ROUTES.STOCKS}/${row.stockName}`}
            align="center"
            variant="contained"
            color="primary"
            size="medium"
          >
            {row.stockName}
          </Button>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="center">
          <a href={`${ROUTES.STOCKS}/${row.stockName}`}>
            <img
              width="50px"
              height="50px"
              src={row.imageUrl}
              alt={`${row.stockName} Team Logo`}
            />
          </a>
        </StyledTableCell>
        <StyledTableCell align="right">{row.market}</StyledTableCell>
        <StyledTableCell align="right">{row.seed}</StyledTableCell>
        <StyledTableCell align="right">{row.currPoints}</StyledTableCell>
        <StyledTableCell align="right">{row.float}</StyledTableCell>
      </StyledTableRow>
    ))
  ) : (
    <CircularProgress size={30}></CircularProgress>
  );
}

//gets the header row
export function getScreenerHeaderRow(orderBy, direction, handleClick) {
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
      <StyledTableCell align="center">
        <TableSortLabel
          name="stockName"
          direction={direction}
          active={orderBy === "stockName"}
          onClick={handleClick}
        >
          Logo
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        {" "}
        <TableSortLabel
          name="market"
          direction={direction}
          active={orderBy === "market"}
          onClick={handleClick}
        >
          Market
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        {" "}
        <TableSortLabel
          name="seed"
          direction={direction}
          active={orderBy === "seed"}
          onClick={handleClick}
        >
          Seed
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        {" "}
        <TableSortLabel
          name="currPoints"
          direction={direction}
          active={orderBy === "currPoints"}
          onClick={handleClick}
        >
          Total Points
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        {" "}
        <TableSortLabel
          name="float"
          direction={direction}
          active={orderBy === "float"}
          onClick={handleClick}
        >
          Total Float
        </TableSortLabel>
      </StyledTableCell>
    </TableRow>
  );
}
