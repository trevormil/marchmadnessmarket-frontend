import React, { Component } from 'react'
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddFilterRow from '../../ui/StockInfoTable/addFilterRow';
import { sort, filterStocks } from '../../ui/StockInfoTable/filterFunctions';
import { getHeaderRow, getRows, StyledTableRow } from '../../ui/StockInfoTable/tableComponents';

const styles = (theme) => ({
    ...theme.spreadThis
});

const initialState = {
    stocks: null,
    orderBy: "stockName",
    direction: "asc",
    headerRow: getHeaderRow("stockName", "asc", null),
    filters: []
};

class BrowseStocksPage extends Component {
    state = initialState;
    constructor(props) {
        super(props);
        //gets stocks from server
        axios.get('/stocks')
            .then((res) => {
                this.setState({
                    stocks: sort(res.data, "stockName", "asc")
                })
            }).catch(err => console.log(err));
        this.handleClickOnSortLabel = this.handleClickOnSortLabel.bind(this);
        this.addFilter = this.addFilter.bind(this);
    }
    //handles when arrow icon on table is clicked
    handleClickOnSortLabel(event) {
        const orderByName = event.currentTarget.getAttribute('name');
        const dir = this.state.direction === "asc" ? "desc" : "asc";
        this.setState({
            orderBy: orderByName,
            direction: dir,
            stocks: sort(this.state.stocks, orderByName, dir),
            headerRow: getHeaderRow(orderByName, dir)
        });
    }
    //applies filter and adds in the text to say it was applied
    addFilter(filter) {
        let filtersArr = this.state.filters;
        filtersArr.push(filter);
        this.setState({
            stocks: filterStocks(this.state.stocks, filter),
            filters: filtersArr
        });
    }
    render() {
        const { classes } = this.props;
        //gets stock data and filters
        let stockDisplay = this.state.stocks !== null ? getRows(this.state.stocks) : <StyledTableRow>Loading...</StyledTableRow>;
        let filterDisplay = this.state.filters === [] ? this.state.filters.map(filter => {
            if (filter.criteria === "equals") {
                return <Typography>{filter.columnValue} is equal to {filter.lowerLimit}</Typography>
            } else if (filter.criteria === "between") {
                return <Typography>{filter.columnValue} is between {filter.lowerLimit} and {filter.upperLimit}</Typography>
            } else return <Typography>No filters added</Typography>;
        }) : <Typography>No filters currently applied</Typography>;

        return (
            <div className='screenr' >
                <Container maxWidth="lg">
                    <div className={classes.root}>
                        <Typography variant="h2" className={classes.pageTitle} align="center">
                            Stock Screener
                         </Typography>
                        <Typography>Applied Filters:</Typography>
                        {filterDisplay}
                        <Grid container spacing={3}>
                            <AddFilterRow addFilter={this.addFilter} />
                            <Grid item xs={12} sm={12} spacing={3}>
                                <Grid container justify="space-between">
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
                <Container maxWidth="lg">
                    <CustomizedTables
                        rows={stockDisplay}
                        headerRow={getHeaderRow(this.state.orderBy, this.state.direction, this.handleClickOnSortLabel)} />
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    sort
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(BrowseStocksPage));