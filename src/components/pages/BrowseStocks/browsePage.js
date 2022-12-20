import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
// import { setUserWatchlist } from '../../../redux/actions/userActions';
import {
    getStocks,
    setStocks,
    sortCurrStocks,
} from '../../../redux/actions/dataActions';
//UI
import AddFilterRow from './addFilterRow';
import { Typography, Grid, Container, CircularProgress } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
//Table Components
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import { getRows, getScreenerHeaderRow } from './screenerRows';
import { getFilterDisplay } from './filterDisplay';

const styles = (theme) => ({
    ...theme.spreadThis,
});

const initialState = {
    orderBy: 'stockName',
    direction: 'asc',
};

class BrowseStocksPage extends Component {
    state = initialState;
    constructor(props) {
        super(props);
        this.props.getStocks(this.props.data.filters);
        this.handleClickOnSortLabel = this.handleClickOnSortLabel.bind(this);
        this.handleClickOnWatchlist = this.handleClickOnWatchlist.bind(this);
    }

    handleClickOnSortLabel(event) {
        const orderByName = event.currentTarget.getAttribute('name');
        const dir = this.state.direction === 'asc' ? 'desc' : 'asc';
        this.setState({
            orderBy: orderByName,
            direction: dir,
        });
        this.props.sortCurrStocks(
            this.props.data,
            orderByName,
            dir,
            this.props.user.watchlist
        );
    }

    handleClickOnWatchlist(event) {
        const currValue = event.currentTarget.getAttribute('value');
        const stockId = event.currentTarget.getAttribute('id');
        this.props.setUserWatchlist(
            this.props.user,
            stockId,
            Number(currValue) === -1
        );
    }

    render() {
        const { classes } = this.props;
        let stockDisplay = !this.props.data.loading ? (
            getRows(
                this.props.data.stocks,
                this.props.user.watchlist,
                this.handleClickOnWatchlist,
                classes
            )
        ) : (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row" align="left">
                    <StyledTableCell>Loading...</StyledTableCell>
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
            </StyledTableRow>
        );
        let filterDisplay = getFilterDisplay(this.props.data);
        return (
            <div
                style={{
                    width: '100%',
                    background: `linear-gradient(#000000, #1976d2) fixed`,
                    color: 'white',
                    minHeight: '1000px',
                    paddingBottom: 20,
                }}
            >
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h2"
                                align="center"
                                className={classes.pageTitle}
                            >
                                Teams
                            </Typography>
                        </Grid>

                        {/* <Grid item xs={12}>
                            {this.props.user &&
                            !this.props.user.authenticated ? (
                                <Typography align="center">
                                    Note: You must be logged in to buy teams.
                                </Typography>
                            ) : (
                                <Typography align="center">
                                    To view more info about a team (and to buy),
                                    click on their name or logo below.
                                </Typography>
                            )}
                        </Grid> */}
                        {/* 
                    <div className="whiteBG">
                        <Grid container spacing={3} justify="space-around">
                            <AddFilterRow
                                addFilter={this.addFilter}
                                reset={this.handleReset}
                            />
                        </Grid>
                    </div>

                    <div className="whiteBG">
                        <Grid item xs={12}>
                            <Grid
                                container
                                spacing={3}
                                justify="space-around"
                                alignItems="center"
                            >
                                <div className={classes.root}>
                                    {filterDisplay}
                                </div>
                            </Grid>
                        </Grid>
                    </div> */}
                        <Grid item xs={0} md={1}></Grid>
                        <Grid item xs={12} md={10}>
                            <div className="screenercard">
                                <CustomizedTables
                                    rows={stockDisplay}
                                    headerRow={getScreenerHeaderRow(
                                        this.state.orderBy,
                                        this.state.direction,
                                        this.handleClickOnSortLabel
                                    )}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={0} md={1}></Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data,
});

const mapActionsToProps = {
    // setUserWatchlist,
    setStocks,
    sortCurrStocks,
    getStocks,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(BrowseStocksPage));
