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
import { Shop, ShoppingCart } from '@mui/icons-material';

//gets all rows for all users and account values
export function getRows(
    stocks,
    stockData,
    isOwnPortfolio,
    direction,
    orderBy,
    mobile,
    handleClickOnBuySellButton
) {
    if (!stocks) return <> </>;

    const newStocks = [];
    stockData.map((stock) => {
        const foundStock = stocks.find(
            (elem) => elem.stockId === stock.stockId
        );
        if (TOURNAMENT_NOT_STARTED || foundStock) {
            newStocks.push({
                stockId: stock.stockId,
                stockName: stock.stockName,
                numShares: stocks.find((elem) => elem.stockId === stock.stockId)
                    ? stocks.find((elem) => elem.stockId === stock.stockId)
                          .numShares
                    : 0,
                currPoints: stock.currPoints,
                imageUrl: stock.imageUrl,
                seed: stock.seed,
            });
        }
    });

    stocks = newStocks;
    if (isOwnPortfolio && TOURNAMENT_NOT_STARTED) {
    }

    if (stocks && stocks.length === 0) {
        return (
            <StyledTableRow>
                <StyledTableCell>
                    {isOwnPortfolio ? 'No owned stocks.' : 'No owned stocks.'}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                {!mobile && (
                    <>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </>
                )}
                {!mobile && TOURNAMENT_NOT_STARTED && (
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
            return b[orderBy] - a[orderBy];
        }
    });

    if (direction === 'desc') {
        stocks = stocks.reverse();
    }

    return (
        <>
            {stocks ? (
                stocks.map((row) => {
                    return (
                        <>
                            <StyledTableRow>
                                <StyledTableCell align="center">
                                    <Button
                                        fullWidth
                                        // component={Link}
                                        // onClick={() => {}}
                                        // to={`${ROUTES.STOCKS}/${row.stockId}`}
                                        onClick={() => {
                                            handleClickOnBuySellButton(
                                                row.stockId
                                            );
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
                                    <StyledTableCell align="center">
                                        <img
                                            width="50px"
                                            height="50px"
                                            src={row.imageUrl}
                                            style={{ cursor: 'pointer' }}
                                            alt={`${row.stockName} Team Logo`}
                                            onClick={() => {
                                                handleClickOnBuySellButton(
                                                    row.stockId
                                                );
                                            }}
                                        />
                                    </StyledTableCell>
                                )}

                                <StyledTableCell align="center">
                                    {row.numShares}
                                </StyledTableCell>
                                {/* <StyledTableCell align="center">
            {row.avgBuyPrice.toFixed(2)}
          </StyledTableCell> */}
                                {!TOURNAMENT_NOT_STARTED && (
                                    <>
                                        {' '}
                                        {!mobile && (
                                            <StyledTableCell align="center">
                                                {row.currPoints}

                                                <div
                                                    style={{
                                                        fontSize: 13,
                                                        marginTop: 10,
                                                    }}
                                                >
                                                    {row.seed} Seed *{' '}
                                                    {row.currPoints / row.seed}{' '}
                                                    Win
                                                    {row.currPoints /
                                                        row.seed !==
                                                    1
                                                        ? 's'
                                                        : ''}
                                                </div>
                                            </StyledTableCell>
                                        )}
                                        <StyledTableCell align="center">
                                            {row.numShares * row.currPoints}
                                        </StyledTableCell>
                                    </>
                                )}
                                {!mobile && TOURNAMENT_NOT_STARTED && (
                                    <>
                                        <StyledTableCell align="center">
                                            {row.seed}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                fullWidth
                                                // component={Link}
                                                // to={`${ROUTES.STOCKS}/${row.stockId}`}
                                                onClick={() => {
                                                    handleClickOnBuySellButton(
                                                        row.stockId
                                                    );
                                                }}
                                                align="center"
                                                variant="contained"
                                                color="primary"
                                                style={{ minWidth: 160 }}
                                            >
                                                <ShoppingCart /> Buy / Sell
                                            </Button>
                                        </StyledTableCell>
                                    </>
                                )}
                            </StyledTableRow>
                        </>
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
                        </>
                    )}
                </StyledTableRow>
            )}
        </>
    );
}

//gets the leaderboard header row
export function getHeaderRow(orderBy, direction, handleClick, mobile) {
    return (
        <TableRow>
            <StyledTableCell align="center">
                <TableSortLabel
                    style={{ left: 10 }}
                    direction={direction}
                    active={orderBy === 'stockName'}
                    onClick={handleClick}
                    name="stockName"
                >
                    Name
                </TableSortLabel>
            </StyledTableCell>
            {!mobile && (
                <StyledTableCell align="center">
                    <TableSortLabel
                        style={{ left: 10 }}
                        direction={direction}
                        active={orderBy === 'stockName'}
                        onClick={handleClick}
                        name="stockName"
                    >
                        Logo
                    </TableSortLabel>
                </StyledTableCell>
            )}
            <StyledTableCell align="center">
                <TableSortLabel
                    style={{ left: 10 }}
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
            {TOURNAMENT_NOT_STARTED ? (
                <>
                    {!mobile && (
                        <StyledTableCell align="center">
                            <TableSortLabel
                                style={{ left: 10 }}
                                direction={direction}
                                active={orderBy === 'seed'}
                                onClick={handleClick}
                                name="seed"
                            >
                                Seed
                            </TableSortLabel>
                        </StyledTableCell>
                    )}
                </>
            ) : (
                <>
                    {!mobile && (
                        <StyledTableCell align="center">
                            <TableSortLabel
                                style={{ left: 10 }}
                                direction={direction}
                                active={orderBy === 'currPoints'}
                                onClick={handleClick}
                                name="currPoints"
                            >
                                Points Per Share
                            </TableSortLabel>
                        </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                        <TableSortLabel
                            style={{ left: 10 }}
                            direction={direction}
                            active={orderBy === 'points'}
                            onClick={handleClick}
                            name="points"
                        >
                            Points
                        </TableSortLabel>
                    </StyledTableCell>
                </>
            )}

            {!mobile && TOURNAMENT_NOT_STARTED && (
                <>
                    <StyledTableCell align="center">Buy / Sell</StyledTableCell>
                    {/* <StyledTableCell align="center">Sell</StyledTableCell> */}
                </>
            )}
        </TableRow>
    );
}
