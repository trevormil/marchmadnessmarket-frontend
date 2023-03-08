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
export function getRows(leaderboard, mobile, page, username) {
    let count = 0;
    let PAGE_SIZE = 25;

    let index = 0;
    const userInfo = leaderboard.find((user, i) => {
        if (user.userName === username) {
            index = i;
            return true;
        }
        return false;
    });

    return leaderboard ? (
        <>
            {userInfo && (
                <StyledTableRow style={{ borderBottom: '3px solid black' }}>
                    {!mobile && (
                        <StyledTableCell
                            component="th"
                            scope="row"
                            align="left"
                        >
                            {index + 1}
                        </StyledTableCell>
                    )}
                    {!mobile && (
                        <StyledTableCell align="center">
                            <Blockies
                                seed={userInfo.userName}
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
                            to={`${ROUTES.USERS}/${userInfo.userName}`}
                            align="center"
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            {userInfo.userName}
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        {userInfo.totalAccountValue.toFixed(0)}
                    </StyledTableCell>
                </StyledTableRow>
            )}

            {leaderboard.map((row, i) => {
                if (i < (page - 1) * PAGE_SIZE || i >= page * PAGE_SIZE) {
                    return <></>;
                }

                return (
                    <StyledTableRow>
                        {!mobile && (
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="left"
                            >
                                {i + 1}
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
            })}
        </>
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
