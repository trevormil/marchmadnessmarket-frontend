import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
//import { getLogoName } from "../../../constants/logos";

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
    Button,
    Checkbox,
    CircularProgress,
    Typography,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import { inWatchlist } from '../../../helpers/filterFunctions';
import { TOURNAMENT_NOT_STARTED } from '../../../constants/constants';

//gets all rows for table for all stocks that match current filters
export function getRows(
    stocks,
    watchlist,
    handleClick,
    mobile,
    handleClickOnBuySellButton
) {
    if (stocks === null || stocks === 'undefined') {
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
                <StyledTableCell />
            </StyledTableRow>
        );
    }

    return stocks ? (
        stocks.map((row) => (
            <StyledTableRow key={row.stockId}>
                <StyledTableCell component="th" scope="row" align="center">
                    <Button
                        fullWidth
                        // component={Link}
                        // to={`${ROUTES.STOCKS}/${row.stockId}`}
                        onClick={() => {
                            handleClickOnBuySellButton(row.stockId);
                        }}
                        align="center"
                        variant="contained"
                        color="primary"
                        size="medium"
                    >
                        {row.stockName}
                    </Button>
                </StyledTableCell>
                {!mobile && (
                    <StyledTableCell component="th" scope="row" align="center">
                        {/* <a href={`${ROUTES.STOCKS}/${row.stockId}`}> */}
                        <img
                            width="50px"
                            height="50px"
                            src={row.imageUrl}
                            alt={`${row.stockName} Team Logo`}
                            // onClick={() => {
                            //     handleClickOnBuySellButton(row.stockId);
                            // }}
                            // style={{ cursor: 'pointer' }}
                        />
                        {/* </a> */}
                    </StyledTableCell>
                )}
                {/* <StyledTableCell align="center" padding="checkbox" size="small">
                    <Checkbox
                        id={row.stockId}
                        value={inWatchlist(watchlist, row)}
                        checked={inWatchlist(watchlist, row) === 1}
                        onChange={handleClick}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        color="primary"
                    />
                </StyledTableCell> */}

                {!mobile && (
                    <>
                        <StyledTableCell align="center">
                            {row.seed}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.bio}
                        </StyledTableCell>
                    </>
                )}
                <StyledTableCell align="center">
                    {row.currPoints}

                    <div
                        style={{
                            fontSize: 13,
                            marginTop: 10,
                        }}
                    >
                        {row.seed} Seed * {row.currPoints / row.seed} Win
                        {row.currPoints / row.seed !== 1 ? 's' : ''}
                    </div>
                </StyledTableCell>
                {!mobile && !TOURNAMENT_NOT_STARTED && (
                    <StyledTableCell align="center">
                        {row.float.toFixed(0)}
                    </StyledTableCell>
                )}
            </StyledTableRow>
        ))
    ) : (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row" align="center">
                <CircularProgress size={30}></CircularProgress>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
        </StyledTableRow>
    );
}

//gets the header row
export function getScreenerHeaderRow(orderBy, direction, handleClick, mobile) {
    return (
        <TableRow>
            <StyledTableCell align="center">
                <TableSortLabel
                    style={{ left: 10 }}
                    name="stockName"
                    direction={direction}
                    active={orderBy === 'stockName'}
                    onClick={handleClick}
                >
                    Name
                </TableSortLabel>
            </StyledTableCell>
            {!mobile && (
                <>
                    <StyledTableCell align="center">
                        <TableSortLabel
                            style={{ left: 10 }}
                            name="stockName"
                            direction={direction}
                            active={orderBy === 'stockName'}
                            onClick={handleClick}
                        >
                            Logo
                        </TableSortLabel>
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                {' '}
                <TableSortLabel
                    style={{ left: 10}}
                    name="watchlist"
                    direction={direction}
                    active={orderBy === 'watchlist'}
                    onClick={handleClick}
                >
                    Watchlist
                </TableSortLabel>
            </StyledTableCell> */}

                    <StyledTableCell align="center">
                        {' '}
                        <TableSortLabel
                            style={{ left: 10 }}
                            name="seed"
                            direction={direction}
                            active={orderBy === 'seed'}
                            onClick={handleClick}
                        >
                            Seed
                        </TableSortLabel>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        {' '}
                        <TableSortLabel
                            style={{ left: 10 }}
                            name="bio"
                            direction={direction}
                            active={orderBy === 'bio'}
                            onClick={handleClick}
                        >
                            Record
                        </TableSortLabel>
                    </StyledTableCell>
                </>
            )}
            <StyledTableCell align="center">
                {' '}
                <TableSortLabel
                    style={{ left: 10 }}
                    name="currPoints"
                    direction={direction}
                    active={orderBy === 'currPoints'}
                    onClick={handleClick}
                >
                    Points per Share
                </TableSortLabel>
            </StyledTableCell>

            {/* <StyledTableCell align="center">
                <TableSortLabel
                    style={{ left: 10}}
                    name="ipoPrice"
                    direction={direction}
                    active={orderBy === 'ipoPrice'}
                    onClick={handleClick}
                >
                    Instant BIN Price
                </TableSortLabel>
            </StyledTableCell> */}

            {/* <StyledTableCell align="center">
                {' '}
                <TableSortLabel
                    style={{ left: 10}}
                    name="volume"
                    direction={direction}
                    active={orderBy === 'volume'}
                    onClick={handleClick}
                >
                    Volume
                </TableSortLabel>
            </StyledTableCell> */}

            {!mobile && !TOURNAMENT_NOT_STARTED && (
                <StyledTableCell align="center">
                    {' '}
                    <TableSortLabel
                        style={{ left: 10 }}
                        name="float"
                        direction={direction}
                        active={orderBy === 'float'}
                        onClick={
                            TOURNAMENT_NOT_STARTED ? undefined : handleClick
                        }
                    >
                        Total Shares <br />
                        (All Users)
                    </TableSortLabel>
                </StyledTableCell>
            )}
            {/* <StyledTableCell align="center">
                {' '}
                <TableSortLabel
                        style={{ left: 10}}
                    name="activeOrder"
                    direction={direction}
                    active={orderBy === 'activeOrder'}
                    onClick={handleClick}
                >
                    Current Auction?
                </TableSortLabel>
            </StyledTableCell> */}
        </TableRow>
    );
}
