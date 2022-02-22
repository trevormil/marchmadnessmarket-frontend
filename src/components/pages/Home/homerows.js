import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import React from 'react';
import { TableRow, Button } from '@mui/material';
//import { getLogoName } from "../../../constants/logos";

//all following functions help to create the stock info table on right side of stock page

export const infoHeaderRow = (
    <TableRow>
        <StyledTableCell align="center">Logo</StyledTableCell>
        <StyledTableCell align="center">Name</StyledTableCell>

        <StyledTableCell align="center">Seed</StyledTableCell>
        <StyledTableCell align="center">Points</StyledTableCell>
    </TableRow>
);

export const getInfoRows = (stocks) => {
    return stocks === undefined || stocks === null ? (
        <StyledTableRow>
            <StyledTableCell></StyledTableCell>
        </StyledTableRow>
    ) : (
        stocks.map((stock) => {
            let file = stock.imageUrl;
            return (
                <StyledTableRow key={stock.stockName}>
                    <StyledTableCell align="center">
                        <a href={`./stocks/${stock.stockId}`}>
                            <img
                                height="50px"
                                width="50px"
                                alt="Team Logo"
                                src={file}
                            />
                        </a>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            href={`./stocks/${stock.stockId}`}
                            align="center"
                            fullWidth
                        >
                            {stock.stockName}
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        {stock.seed}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        {stock.currPoints}
                    </StyledTableCell>
                </StyledTableRow>
            );
        })
    );
};
