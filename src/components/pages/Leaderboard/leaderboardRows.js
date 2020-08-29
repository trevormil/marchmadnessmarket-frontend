import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { StyledTableCell, StyledTableRow } from '../../ui/StockInfoTable/styledTableComponents'

//gets all rows for all users and account values
export function getRows(leaderboard) {
    let count = 0;
    return leaderboard ? (
        leaderboard.map((row) => {
            count++;
            return <StyledTableRow>
                <StyledTableCell component="th" scope="row" align="left">{count}</StyledTableCell>
                <StyledTableCell align="right">{row.userName}</StyledTableCell>
                <StyledTableCell align="right">{row.totalAccountValue.toFixed(2)}</StyledTableCell>
            </StyledTableRow >
        })
    )
        : (<StyledTableCell>No users found.</StyledTableCell>);
}

//gets the leaderboard header row
export function getHeaderRow() {
    return (
        <TableRow>
            <StyledTableCell align="left">
                #
                </StyledTableCell>
            <StyledTableCell align="right">
                Username
                </StyledTableCell>
            <StyledTableCell align="right">
                Account Value
            </StyledTableCell>
        </TableRow>
    );
}

