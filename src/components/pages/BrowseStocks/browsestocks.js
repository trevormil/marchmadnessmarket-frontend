import React, { Component } from 'react'
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomizedTables from '../../ui/StockInfoTable/stocktable';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
const styles = (theme) => ({
    ...theme.spreadThis
});


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const headerRow = (<TableRow>
    <StyledTableCell>Name</StyledTableCell>
    <StyledTableCell align="right">Market</StyledTableCell>
    <StyledTableCell align="right">Price</StyledTableCell>
    <StyledTableCell align="right">Volume</StyledTableCell>
    <StyledTableCell align="right">Open</StyledTableCell>
    <StyledTableCell align="right">High</StyledTableCell>
    <StyledTableCell align="right">Low</StyledTableCell>
    <StyledTableCell align="right">Market Cap</StyledTableCell>
    <StyledTableCell align="right">Float</StyledTableCell>
    <StyledTableCell align="right">Dividends</StyledTableCell>
</TableRow>);

class BrowseStocksPage extends Component {
    state = {
        stocks: null,
        error: null
    };
    componentWillMount() {
        axios.get('/stocks').then((res) => {
            this.setState({
                stocks: res.data
            })
        }).catch(err => console.log(err))
    }
    render() {
        const { classes } = this.props;
        let stockDisplay;
        if (this.state.error === null) {
            stockDisplay = this.state.stocks ? (
                this.state.stocks.map((row) => <StyledTableRow key={row.stockName}>
                    <StyledTableCell component="th" scope="row">
                        {row.stockName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.market}</StyledTableCell>
                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                    <StyledTableCell align="right">{row.volume}</StyledTableCell>
                    <StyledTableCell align="right">{row.open}</StyledTableCell>
                    <StyledTableCell align="right">{row.high}</StyledTableCell>
                    <StyledTableCell align="right">{row.low}</StyledTableCell>
                    <StyledTableCell align="right">{row.marketCap}</StyledTableCell>
                    <StyledTableCell align="right">{row.float}</StyledTableCell>
                    <StyledTableCell align="right">{row.dividends}</StyledTableCell>
                </StyledTableRow>)
            )
                : (<StyledTableRow key="Loading">
                    <StyledTableCell component="th" scope="row">
                        Loading...
                    </StyledTableCell>
                </StyledTableRow>);
        } else {
            stockDisplay = <p>{this.state.error}</p>
        }

        return (
            <div className='portfolio' >
                <Container maxWidth="lg">
                    <Typography variant="h2" className={classes.pageTitle} align="center">
                        Stock Screener
                </Typography>
                    <CustomizedTables rows={stockDisplay} headerRow={headerRow} />
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(BrowseStocksPage);