import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import React from 'react';
import { TableRow, Button } from '@mui/material';
//import { getLogoName } from "../../../constants/logos";

//all following functions help to create the stock info table on right side of stock page

export const getInfoHeaderRow = (mobile) => {
    return (
        <TableRow>
            {!mobile && <StyledTableCell align="center">Logo</StyledTableCell>}
            <StyledTableCell align="center">Name</StyledTableCell>

            {!mobile && <StyledTableCell align="center">Seed</StyledTableCell>}
            <StyledTableCell align="center">Points</StyledTableCell>
        </TableRow>
    );
};

export const getInfoRows = (stocks, mobile, handleClickOnBuySellButton) => {
    if (stocks === undefined || stocks === null) {
        return (
            <StyledTableRow>
                <StyledTableCell></StyledTableCell>
            </StyledTableRow>
        );
    } else {
        stocks.sort((a, b) => {
            return b.currPoints - a.currPoints;
        });
        return stocks.map((stock) => {
            let file = stock.imageUrl;
            return (
                <StyledTableRow key={stock.stockName}>
                    {!mobile && (
                        <StyledTableCell align="center">
                            <img
                                height="50px"
                                width="50px"
                                alt="Team Logo"
                                src={file}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    handleClickOnBuySellButton(stock.stockId);
                                }}
                            />
                        </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            align="center"
                            fullWidth
                            onClick={() => {
                                handleClickOnBuySellButton(stock.stockId);
                            }}
                        >
                            {stock.stockName}
                        </Button>
                    </StyledTableCell>
                    {!mobile && (
                        <StyledTableCell align="center">
                            {stock.seed}
                        </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                        {stock.currPoints}
                    </StyledTableCell>
                </StyledTableRow>
            );
        });
    }
};
