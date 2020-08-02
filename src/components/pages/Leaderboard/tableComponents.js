import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core';
export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: "bold",
        fontSize: 13
    },
    body: {
        fontSize: 13,
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


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

