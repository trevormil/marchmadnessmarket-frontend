import React from 'react';
import TableRow from '@mui/material/TableRow';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import { Button, TableSortLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { TOURNAMENT_NOT_STARTED } from '../../../constants/constants';

//gets all rows for all users and account values
export function getRows(
    stocks,
    stockData,
    isOwnPortfolio,
    direction,
    orderBy,
    hasMoneyLeft
) {
    if (isOwnPortfolio && TOURNAMENT_NOT_STARTED) {
        stockData.map((stock) => {
            if (!stocks.find((elem) => elem.stockId === stock.stockId)) {
                stocks.push({
                    stockId: stock.stockId,
                    stockName: stock.stockName,
                    numShares: 0,
                    currPoints: stock.currPoints,
                    imageUrl: stock.imageUrl,
                });
            }
        });
    }

    if (stocks && stocks.length === 0) {
        return (
            <StyledTableRow>
                <StyledTableCell>
                    {isOwnPortfolio ? 'No owned stocks.' : 'No owned stocks.'}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                {TOURNAMENT_NOT_STARTED && (
                    <>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </>
                )}
            </StyledTableRow>
        );
    }

    for (const row of stocks) {
        row.currPoints = stockData.find(
            (elem) => elem.stockId === row.stockId
        ).currPoints;

        row.imageUrl = stockData
            .find((elem) => elem.stockId === row.stockId)
            .imageUrl.toString();
    }

    console.log(stocks);

    stocks = stocks.sort((a, b) => {
        if (!a.currPoints) {
            a.currPoints = 0;
        }
        if (!b.currPoints) {
            b.currPoints = 0;
        }

        if (orderBy === 'points') {
            if (b.currPoints * b.numShares - a.currPoints * a.numShares !== 0) {
                return b.currPoints * b.numShares - a.currPoints * a.numShares;
            } else {
                return b.numShares - a.numShares;
            }
        }
        if (orderBy === 'stockName') {
            if (a.stockName < b.stockName) {
                return -1;
            }
            if (a.stockName > b.stockName) {
                return 1;
            }
            return 0;
        } else {
            console.log('a', a[orderBy]);
            console.log('b', b[orderBy]);
            console.log('a-b', b[orderBy] - a[orderBy]);

            return b[orderBy] - a[orderBy];
        }
    });

    if (direction === 'desc') {
        stocks = stocks.reverse();
    }

    console.log(orderBy, direction);
    console.log('STOCKS', stocks);
    return stocks ? (
        stocks.map((row) => {
            console.log('ROW', row);

            return (
                <StyledTableRow>
                    <StyledTableCell align="center">
                        <Button
                            fullWidth
                            component={Link}
                            to={`${ROUTES.STOCKS}/${row.stockId}`}
                            align="center"
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            {row.stockName}
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <a href={`${ROUTES.STOCKS}/${row.stockId}`}>
                            <img
                                width="50px"
                                height="50px"
                                src={row.imageUrl}
                                alt={`${row.stockName} Team Logo`}
                            />
                        </a>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        {row.numShares}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
            {row.avgBuyPrice.toFixed(2)}
          </StyledTableCell> */}
                    <StyledTableCell align="center">
                        {row.currPoints}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        {row.numShares * row.currPoints}
                    </StyledTableCell>
                    {TOURNAMENT_NOT_STARTED && (
                        <>
                            <StyledTableCell align="center">
                                <Button
                                    fullWidth
                                    component={Link}
                                    to={`${ROUTES.STOCKS}/${row.stockId}`}
                                    align="center"
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                >
                                    Buy
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    fullWidth
                                    component={Link}
                                    to={`${ROUTES.STOCKS}/${row.stockId}`}
                                    align="center"
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                >
                                    Sell
                                </Button>
                            </StyledTableCell>
                        </>
                    )}
                </StyledTableRow>
            );
        })
    ) : (
        <StyledTableRow>
            <StyledTableCell>No owned stocks.</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            {TOURNAMENT_NOT_STARTED && (
                <>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </>
            )}
        </StyledTableRow>
    );
}

//gets the leaderboard header row
export function getHeaderRow(orderBy, direction, handleClick) {
    return (
        <TableRow>
            <StyledTableCell align="center">
                <TableSortLabel
                    direction={direction}
                    active={orderBy === 'stockName'}
                    onClick={handleClick}
                    name="stockName"
                >
                    Name
                </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">
                <TableSortLabel
                    direction={direction}
                    active={orderBy === 'stockName'}
                    onClick={handleClick}
                    name="stockName"
                >
                    Logo
                </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">
                <TableSortLabel
                    direction={direction}
                    active={orderBy === 'numShares'}
                    onClick={handleClick}
                    name="numShares"
                    align="center"
                >
                    # Shares Owned
                </TableSortLabel>
            </StyledTableCell>
            {/* <StyledTableCell align="left">Avg. Buy Price</StyledTableCell> */}
            <StyledTableCell align="center">
                <TableSortLabel
                    direction={direction}
                    active={orderBy === 'currPoints'}
                    onClick={handleClick}
                    name="currPoints"
                >
                    Points Per Share
                </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">
                <TableSortLabel
                    direction={direction}
                    active={orderBy === 'points'}
                    onClick={handleClick}
                    name="points"
                >
                    Points
                </TableSortLabel>
            </StyledTableCell>
            {TOURNAMENT_NOT_STARTED && (
                <>
                    <StyledTableCell align="center">Buy</StyledTableCell>
                    <StyledTableCell align="center">Sell</StyledTableCell>
                </>
            )}
        </TableRow>
    );
}
