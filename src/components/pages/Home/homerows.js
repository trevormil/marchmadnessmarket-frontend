import React from 'react';
import {
    getCellToDisplay,
    getHeaderRowFromSchema,
} from '../../ui/StockInfoTable/stockTableUtils';
import { StyledTableRow } from '../../ui/StockInfoTable/styledTableComponents';

//all following functions help to create the stock info table on right side of stock page

const TeamCardSchema = [
    {
        name: 'stockName',
        label: 'Logo',
        showMobile: true,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
    },
    {
        name: 'stockName',
        label: 'Name',
        showMobile: true,
        showIfTournamentHasStarted: true,
        showIfTournamentHasNotStarted: true,
    },
    {
        name: 'seed',
        label: 'Seed',
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
];

export const getInfoHeaderRow = (mobile) => {
    return getHeaderRowFromSchema(
        TeamCardSchema,
        undefined,
        undefined,
        undefined,
        mobile
    );
};

export const getInfoRows = (stocks, mobile, handleClickOnBuySellButton) => {
    if (stocks === undefined || stocks === null) {
        return <></>;
    } else {
        stocks.sort((a, b) => {
            return b.currPoints - a.currPoints;
        });
        return stocks.map((stock) => {
            let file = stock.imageUrl;
            return (
                <>
                    <StyledTableRow
                        key={stock.stockName}
                        className="bg-primary  text-white rounded-lg py-2 px-4 text-sm"
                    >
                        {getCellToDisplay(
                            mobile,
                            TeamCardSchema.find((x) => x.label === 'Logo'),
                            <img
                                height="50px"
                                width="50px"
                                alt="Team Logo"
                                src={file}
                                style={{ cursor: 'pointer' }}
                            />
                        )}
                        {getCellToDisplay(
                            mobile,
                            TeamCardSchema.find((x) => x.label === 'Name'),
                            <b>{stock.stockName}</b>
                        )}
                        {getCellToDisplay(
                            mobile,
                            TeamCardSchema.find((x) => x.label === 'Seed'),
                            stock.seed
                        )}
                        {getCellToDisplay(
                            mobile,
                            TeamCardSchema.find((x) => x.label === 'Points'),
                            stock.currPoints
                        )}
                    </StyledTableRow>
                </>
            );
        });
    }
};
