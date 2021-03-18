import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../ui/StockInfoTable/styledTableComponents";

import { Button } from "@material-ui/core";

import * as ROUTES from "../../../constants/routes";
import { Link } from "react-router-dom";
//gets all rows for all users and account values
export function getRows(leaderboard) {
  let count = 0;
  return leaderboard ? (
    leaderboard.map((row) => {
      count++;
      return (
        <StyledTableRow>
          <StyledTableCell component="th" scope="row" align="left">
            {count}
          </StyledTableCell>
          <StyledTableCell align="right">
            <Button
              fullWidth
              component={Link}
              to={`${ROUTES.USERS}/${row.userName}`}
              align="center"
              variant="contained"
              color="primary"
              size="medium"
            >
              {row.userName}
            </Button>
          </StyledTableCell>
          <StyledTableCell align="right">
            {row.totalAccountValue.toFixed(0)}
          </StyledTableCell>
        </StyledTableRow>
      );
    })
  ) : (
    <StyledTableCell>No users found.</StyledTableCell>
  );
}

//gets the leaderboard header row
export function getHeaderRow() {
  return (
    <TableRow>
      <StyledTableCell align="left">#</StyledTableCell>
      <StyledTableCell align="center">Username</StyledTableCell>
      <StyledTableCell align="right">Account Value + Points</StyledTableCell>
    </TableRow>
  );
}
