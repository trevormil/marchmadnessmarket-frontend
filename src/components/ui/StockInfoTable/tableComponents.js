import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import * as ROUTES from '../../../constants/routes';
import { TableCell, Button, Checkbox, CircularProgress } from '@material-ui/core';
import { inWatchlist } from '../StockInfoTable/filterFunctions';
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


export function getRows(stocks, watchlist, handleClick, classes) {
    return stocks ? (
        stocks.map((row) => <StyledTableRow>
            <StyledTableCell component="th" scope="row" align="left">
                <Button align="center" variant="contained" color="primary" size="medium" href={`${ROUTES.STOCKS}/${row.stockId}`}>
                    {row.stockName}
                </Button>

            </StyledTableCell>
            <StyledTableCell align="right" padding="checkbox" size="small">
                <Checkbox
                    id={row.stockId}
                    value={inWatchlist(watchlist, row)}
                    checked={inWatchlist(watchlist, row) === 1}
                    onChange={handleClick}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </StyledTableCell>
            <StyledTableCell align="right">{row.activeOrder ? "Yes" : "No"}</StyledTableCell>
            <StyledTableCell align="right">{row.market}</StyledTableCell>
            <StyledTableCell align="right">{row.price}</StyledTableCell>
            <StyledTableCell align="right">{row.volume}</StyledTableCell>
            <StyledTableCell align="right">{row.open}</StyledTableCell>
            <StyledTableCell align="right">{row.high}</StyledTableCell>
            <StyledTableCell align="right">{row.low}</StyledTableCell>
            <StyledTableCell align="right">{row.marketCap}</StyledTableCell>
            <StyledTableCell align="right">{row.float}</StyledTableCell>
        </StyledTableRow >)
    )
        : (<CircularProgress size={30}></CircularProgress>);
}


export function getScreenerHeaderRow(orderBy, direction, handleClick) {
    return (
        <TableRow>
            <StyledTableCell>
                <TableSortLabel
                    name="stockName"
                    direction={direction}
                    active={orderBy === "stockName"}
                    onClick={handleClick}>
                    Name
        </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right" padding="checkbox" size="small"> <TableSortLabel
                name="watchlist"
                direction={direction}
                active={orderBy === "watchlist"}
                onClick={handleClick}>
                Starred
        </TableSortLabel></StyledTableCell>
            <StyledTableCell align="right"> <TableSortLabel
                name="activeOrder"
                direction={direction}
                active={orderBy === "activeOrder"}
                onClick={handleClick}>
                Current Seller?
        </TableSortLabel></StyledTableCell>
            <StyledTableCell align="right"> <TableSortLabel
                name="market"
                direction={direction}
                active={orderBy === "market"}
                onClick={handleClick}>
                Market
        </TableSortLabel></StyledTableCell>
            <StyledTableCell align="right">
                <TableSortLabel
                    name="price"
                    direction={direction}
                    active={orderBy === "price"}
                    onClick={handleClick}>
                    Price
        </TableSortLabel>
            </StyledTableCell>

            <StyledTableCell align="right"> <TableSortLabel
                name="volume"
                direction={direction}
                active={orderBy === "volume"}
                onClick={handleClick}>
                Volume
        </TableSortLabel></StyledTableCell>
            <StyledTableCell align="right"> <TableSortLabel
                name="open"
                direction={direction}
                active={orderBy === "open"}
                onClick={handleClick}>
                Open
        </TableSortLabel></StyledTableCell>
            <StyledTableCell align="right"> <TableSortLabel
                name="high"
                direction={direction}
                active={orderBy === "high"}
                onClick={handleClick}>
                High
        </TableSortLabel></StyledTableCell>
            <StyledTableCell align="right"> <TableSortLabel
                name="low"
                direction={direction}
                active={orderBy === "low"}
                onClick={handleClick}>
                Low
        </TableSortLabel></StyledTableCell>
            <StyledTableCell align="right"> <TableSortLabel
                name="marketCap"
                direction={direction}
                active={orderBy === "marketCap"}
                onClick={handleClick}>
                Market Cap
        </TableSortLabel></StyledTableCell>
            <StyledTableCell align="right"> <TableSortLabel
                name="float"
                direction={direction}
                active={orderBy === "float"}
                onClick={handleClick}>
                Float
        </TableSortLabel></StyledTableCell>
        </TableRow>
    );
}

