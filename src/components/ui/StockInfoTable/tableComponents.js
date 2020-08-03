import React from 'react';
import { Link } from 'react-router-dom';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import * as ROUTES from '../../../constants/routes';
import { TableCell, Button, Checkbox, CircularProgress, Typography } from '@material-ui/core';
import { inWatchlist } from '../StockInfoTable/filterFunctions';
export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: "bold",
        fontSize: 14
    },
    body: {
        fontSize: 18,
        fontWeight: "bold"
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
    if (stocks.length === 0) {
        return <Typography align="center" variant="h6">No matches</Typography>
    }
    return stocks ? (
        stocks.map((row) => <StyledTableRow>
            <StyledTableCell component="th" scope="row" align="left">
                <Button fullWidth component={Link} to={`${ROUTES.STOCKS}/${row.stockId}`} align="center" variant="contained" color="primary" size="medium" >
                    {row.stockName}
                </Button>

            </StyledTableCell>
            <StyledTableCell align="left" padding="checkbox" size="small">
                <Checkbox
                    id={row.stockId}
                    value={inWatchlist(watchlist, row)}
                    checked={inWatchlist(watchlist, row) === 1}
                    onChange={handleClick}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    color="primary"
                />
            </StyledTableCell>
            <StyledTableCell align="right">{row.activeOrder ? "Yes" : "No"}</StyledTableCell>
            <StyledTableCell align="right">{row.market}</StyledTableCell>
            <StyledTableCell align="right">{row.price.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="right">{row.ipoPrice.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="right">{row.volume}</StyledTableCell>
            <StyledTableCell align="right">{row.high.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="right">{row.low.toFixed(2)}</StyledTableCell>
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
            <StyledTableCell align="left"> <TableSortLabel
                name="watchlist"
                direction={direction}
                active={orderBy === "watchlist"}
                onClick={handleClick}>
                Watchlist
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
                    Last Auction
        </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right">
                <TableSortLabel
                    name="ipoPrice"
                    direction={direction}
                    active={orderBy === "ipoPrice"}
                    onClick={handleClick}>
                    BIN Price
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
                name="high"
                direction={direction}
                active={orderBy === "high"}
                onClick={handleClick}>
                Auction High
        </TableSortLabel></StyledTableCell>
            <StyledTableCell align="right"> <TableSortLabel
                name="low"
                direction={direction}
                active={orderBy === "low"}
                onClick={handleClick}>
                Auction Low
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

