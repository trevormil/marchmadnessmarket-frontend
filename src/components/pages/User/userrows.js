import React from 'react';
import TableRow from '@mui/material/TableRow';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

//gets all rows for all users and account values
export function getRows(stocks, isOwnPortfolio) {
    if (stocks && stocks.length === 0) {
        return (
            <StyledTableRow>
                <StyledTableCell>
                    {isOwnPortfolio ? 'No owned stocks.' : 'No owned stocks.'}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
            </StyledTableRow>
        );
    }
    return stocks ? (
        stocks.map((row) => {
            row.currPoints = row.currPoints ? row.currPoints : 0;
            return (
                <StyledTableRow>
                    <StyledTableCell align="right">
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

                    <StyledTableCell align="right">
                        {row.numShares}
                    </StyledTableCell>
                    {/* <StyledTableCell align="right">
            {row.avgBuyPrice.toFixed(2)}
          </StyledTableCell> */}
                    <StyledTableCell align="right">
                        {row.currPoints}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        {row.numShares * row.currPoints}
                    </StyledTableCell>
                </StyledTableRow>
            );
        })
    ) : (
        <StyledTableRow>
            <StyledTableCell>No owned stocks.</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
        </StyledTableRow>
    );
}

//gets the leaderboard header row
export function getHeaderRow() {
    return (
        <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="right">Shares Owned</StyledTableCell>
            {/* <StyledTableCell align="left">Avg. Buy Price</StyledTableCell> */}
            <StyledTableCell align="right">Points Per Share</StyledTableCell>
            <StyledTableCell align="right">Points</StyledTableCell>
        </TableRow>
    );
}
