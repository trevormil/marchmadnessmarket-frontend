import React from 'react';
//import { getLogoName } from "../../../constants/logos";

import { CheckOutlined, CloseTwoTone } from '@mui/icons-material';
import { CircularProgress, Typography } from '@mui/material';
import {
    getBlankRowFromSchema,
    getCellToDisplay,
    getHeaderRowFromSchema,
} from '../../ui/StockInfoTable/stockTableUtils';
import { StyledTableRow } from '../../ui/StockInfoTable/styledTableComponents';

export const ScreenerRowSchema = [
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
        showMobile: true,
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
        name: 'bio',
        label: 'Record',
        showMobile: false,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
    },
    {
        name: 'currPoints',
        label: 'Points',
        showMobile: true,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
        minWidth: 110,
    },
    {
        name: 'float',
        label: 'Total Spent ($)',
        showMobile: false,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: false,
        minWidth: 130,
    },
];

//gets all rows for table for all stocks that match current filters
export function getRows(stocks, mobile, handleClick) {
    if (!stocks || stocks.length === 0) {
        return getBlankRowFromSchema(
            ScreenerRowSchema,
            mobile,
            <Typography align="center" variant="h6">
                No stocks found.
            </Typography>
        );
    }

    if (!stocks) {
        return getBlankRowFromSchema(
            ScreenerRowSchema,
            mobile,
            <CircularProgress size={30}></CircularProgress>
        );
    }

    return stocks.map((row) => (
        <StyledTableRow
            key={row.stockId}
            className="text-white border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors "
        >
            {getCellToDisplay(
                mobile,
                ScreenerRowSchema.find((item) => item.label === 'Name'),
                <b style={{ fontSize: 18 }}>{row.stockName}</b>
            )}
            {getCellToDisplay(
                mobile,
                ScreenerRowSchema.find((item) => item.label === 'Logo'),
                <div className="flex justify-center items-center">
                    <img
                        width="50px"
                        height="50px"
                        src={row.imageUrl}
                        alt={`${row.stockName} Team Logo`}
                    />
                </div>
            )}
            {getCellToDisplay(
                mobile,
                ScreenerRowSchema.find((item) => item.label === 'Alive?'),
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
                ScreenerRowSchema.find((item) => item.label === 'Seed'),
                row.seed
            )}
            {getCellToDisplay(
                mobile,
                ScreenerRowSchema.find((item) => item.label === 'Record'),
                row.bio
            )}
            {getCellToDisplay(
                mobile,
                ScreenerRowSchema.find((item) => item.label === 'Points'),
                <>{row.currPoints}</>
            )}
            {getCellToDisplay(
                mobile,
                ScreenerRowSchema.find((item) => item.name === 'float'),
                <>{row.float.toFixed(0)}</>
            )}{' '}
        </StyledTableRow>
    ));
}

//gets the header row
export function getScreenerHeaderRow(orderBy, direction, handleClick, mobile) {
    return getHeaderRowFromSchema(
        ScreenerRowSchema,
        orderBy,
        direction,
        handleClick,
        mobile
    );
}
