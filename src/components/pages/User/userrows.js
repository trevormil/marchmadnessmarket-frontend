import { CheckOutlined, CloseTwoTone, ShoppingCart } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { TOURNAMENT_NOT_STARTED } from '../../../constants/constants';
import {
    getBlankRowFromSchema,
    getCellToDisplay,
    getHeaderRowFromSchema,
} from '../../ui/StockInfoTable/stockTableUtils';
import { StyledTableRow } from '../../ui/StockInfoTable/styledTableComponents';

export const UserStockRowSchema = [
    {
        name: 'stockName',
        label: 'Name',
        showMobile: true,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
    },
    {
        name: 'stockName',
        label: 'Logo',
        showMobile: false,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
    },
    {
        name: 'hasLost',
        label: 'Alive?',
        showMobile: false,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: false,
    },
    {
        name: 'seed',
        label: 'Seed',
        showMobile: false,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
    },
    {
        name: 'wins',
        label: 'Wins',
        showMobile: false,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
    },
    {
        name: 'numShares',
        label: 'Amount ($)',
        showMobile: true,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
        minWidth: 110,
    },
    {
        name: 'points',
        label: 'Total Points',
        showMobile: true,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: false,
        minWidth: 110,
    },
    {
        name: 'buySell',
        label: 'Buy/Sell',
        showMobile: true,
        showIfTournamentHasStarted: false,
        showIfTournamentHasNotStarted: true,
        minWidth: 160,
    },
];

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
    if (!stocks) return <></>;

    const newStocks = [];
    stockData.map((stock) => {
        const ownedStock = stocks.find(
            (elem) => elem.stockId === stock.stockId && elem.numShares > 0
        );

        if (TOURNAMENT_NOT_STARTED || ownedStock) {
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

    if (stocks && stocks.length === 0) {
        return getBlankRowFromSchema(
            UserStockRowSchema,
            mobile,
            'No Owned Stocks'
        );
    }

    for (const row of stocks) {
        const currStock = stockData.find(
            (elem) => elem.stockId === row.stockId
        );
        row.currPoints = currStock.currPoints;
        row.imageUrl = currStock.imageUrl.toString();
        row.hasLost = currStock.hasLost;
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
        if (orderBy === 'wins') {
            const aWins = a.currPoints / a.seed;
            const bWins = b.currPoints / b.seed;

            return bWins - aWins;
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
            {stocks.map((row) => {
                return (
                    <>
                        <StyledTableRow className="bg-primary text-white rounded-lg py-2 px-4 text-sm">
                            {getCellToDisplay(
                                mobile,
                                UserStockRowSchema.find(
                                    (x) => x.label === 'Name'
                                ),
                                <b style={{ fontSize: 18 }}>{row.stockName}</b>
                            )}
                            {getCellToDisplay(
                                mobile,
                                UserStockRowSchema.find(
                                    (x) => x.label === 'Logo'
                                ),
                                <img
                                    width="50px"
                                    height="50px"
                                    src={row.imageUrl}
                                    style={{ cursor: 'pointer' }}
                                    alt={`${row.stockName} Team Logo`}
                                />
                            )}
                            {getCellToDisplay(
                                mobile,
                                UserStockRowSchema.find(
                                    (x) => x.label === 'Alive?'
                                ),
                                row.hasLost ? (
                                    <CloseTwoTone
                                        style={{
                                            backgroundColor: 'darkred',
                                            color: 'white',
                                        }}
                                    />
                                ) : (
                                    <CheckOutlined
                                        style={{
                                            backgroundColor: 'darkgreen',
                                            color: 'white',
                                        }}
                                    />
                                )
                            )}
                            {getCellToDisplay(
                                mobile,
                                UserStockRowSchema.find(
                                    (x) => x.label === 'Seed',
                                    row.seed
                                ),
                                row.seed
                            )}
                            {getCellToDisplay(
                                mobile,
                                UserStockRowSchema.find(
                                    (x) => x.label === 'Wins'
                                ),
                                row.currPoints / row.seed
                            )}
                            {getCellToDisplay(
                                mobile,
                                UserStockRowSchema.find(
                                    (x) => x.label === 'Amount ($)'
                                ),
                                row.numShares
                            )}
                            {getCellToDisplay(
                                mobile,
                                UserStockRowSchema.find(
                                    (x) => x.label === 'Total Points'
                                ),
                                row.numShares * row.currPoints
                            )}
                            {getCellToDisplay(
                                mobile,
                                UserStockRowSchema.find(
                                    (x) => x.label === 'Buy/Sell'
                                ),
                                <Button
                                    fullWidth
                                    onClick={() => {
                                        handleClickOnBuySellButton(row.stockId);
                                    }}
                                    align="center"
                                    variant="contained"
                                    color="primary"
                                    style={{ minWidth: 160 }}
                                >
                                    <ShoppingCart /> Buy / Sell
                                </Button>
                            )}
                        </StyledTableRow>
                    </>
                );
            })}
        </>
    );
}

//gets the leaderboard header row
export function getHeaderRow(orderBy, direction, handleClick, mobile) {
    return getHeaderRowFromSchema(
        UserStockRowSchema,
        orderBy,
        direction,
        handleClick,
        mobile
    );
}
