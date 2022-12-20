import React from 'react';
import TableRow from '@mui/material/TableRow';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';

import { Button } from '@mui/material';
import Blockies from 'react-blockies';
import * as ROUTES from '../../../constants/routes';
import { Link } from 'react-router-dom';
//gets all rows for all users and account values
export function getRows(leaderboard, mobile) {
    let count = 0;
    return leaderboard ? (
        leaderboard.map((row) => {
            count++;
            return (
                <StyledTableRow>
                    {!mobile && (
                        <StyledTableCell
                            component="th"
                            scope="row"
                            align="left"
                        >
                            {count}
                        </StyledTableCell>
                    )}
                    {!mobile && (
                        <StyledTableCell align="center">
                            <Blockies
                                seed={row.userName}
                                size={18}
                                scale={3}
                                className="identicon"
                            />
                        </StyledTableCell>
                    )}
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
        <StyledTableRow>
            <StyledTableCell>No users found.</StyledTableCell>
        </StyledTableRow>
    );
}

//gets the leaderboard header row
export function getHeaderRow(mobile) {
    return (
        <TableRow>
            {!mobile && <StyledTableCell align="left">Rank</StyledTableCell>}
            {!mobile && <StyledTableCell align="center">Icon</StyledTableCell>}
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="right">Points</StyledTableCell>
        </TableRow>
    );
}
