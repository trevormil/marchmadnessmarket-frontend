import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CustomizedTables from '../../ui/StockInfoTable/stocktable';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
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
    <StyledTableCell align="right">Price</StyledTableCell>
    <StyledTableCell align="right">Shares Owned</StyledTableCell>
    <StyledTableCell align="right">Total Value</StyledTableCell>
    <StyledTableCell align="right">Profit/Loss</StyledTableCell>
    <StyledTableCell align="right">Buy/Sell</StyledTableCell>
</TableRow>);

class PortfolioPage extends Component {
    componentDidUpdate() {
        this.render();
    }
    render() {
        const { classes } = this.props;
        let stockDisplay = Object.keys(this.props.user.ownedStocks).length === 0
            ? <p>Loading</p>
            : this.props.user.ownedStocks.map(stock => <StyledTableRow key={stock.stockId}>
                <StyledTableCell component="th" scope="row">
                    {stock.stockName}
                </StyledTableCell>
                <StyledTableCell align="right">{stock.price}</StyledTableCell>
                <StyledTableCell align="right">{stock.numShares}</StyledTableCell>
                <StyledTableCell align="right">{stock.numShares * stock.price}</StyledTableCell>
                <StyledTableCell align="right">Buy Sell Button</StyledTableCell>
            </StyledTableRow>);
        return (
            <Container maxWidth="lg">
                <div className='portfolio' align="center">
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h2" className={classes.pageTitle} align="center">
                                    Portfolio: Current Value (+- Change)
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <CustomizedTables rows={stockDisplay} headerRow={headerRow} />
                            </Grid>
                            
                            <Grid item xs={6} sm={2}>
                                <Paper className={classes.paper}>Balances and Stats</Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Paper className={classes.paper}>Transaction History</Paper>
                            </Grid>
                            
                            <Grid item xs={12} sm={7}>
                                <Paper className={classes.paper}>Trading View Chart</Paper>
                            </Grid>
                            
                            
                            <Grid item xs={6} sm={5}>
                                <Paper className={classes.paper}>Other charts</Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </Container>

        )
    }
}

PortfolioPage.propTypes = {
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

export default connect(mapStateToProps)(withStyles(styles)(PortfolioPage));