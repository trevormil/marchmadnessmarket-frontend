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
import { Container, Grid } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
//Table Components
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { getBlankRowFromSchema } from '../../ui/StockInfoTable/stockTableUtils';
import { StyledTableCell } from '../../ui/StockInfoTable/styledTableComponents';
import StockModal from '../Stock/stockModal';
import {
  ScreenerRowSchema,
  getRows,
  getScreenerHeaderRow,
} from './screenerRows';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class BrowseStocksPage extends Component {
    state = {
        orderBy: 'stockName',
        direction: 'asc',
        mobile: !window.matchMedia('(min-width: 1000px)').matches,
        openModalStockId: '',
        loadedOnce: false,
    };

    constructor(props) {
        super(props);
        this.props.getStocks(this.props.data, this.props.data.filters);
        this.handleClickOnSortLabel = this.handleClickOnSortLabel.bind(this);
        this.setIdForStockModal = this.setIdForStockModal.bind(this);
    }

    setIdForStockModal(stockId) {
        this.setState({ openModalStockId: stockId });
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

    render() {
        let stockDisplay = !this.props.data.loading
            ? getRows(
                  this.props.data.stocks,
                  this.state.mobile,
                  this.setIdForStockModal
              )
            : getBlankRowFromSchema(
                  ScreenerRowSchema,
                  this.state.mobile,
                  <StyledTableCell>Loading...</StyledTableCell>
              );

        return (
            <>
                <StockModal
                    stockId={this.state.openModalStockId}
                    onClose={() => {
                        this.setIdForStockModal('');
                    }}
                />

                <div
                    className="bg-gray-900"
                    style={{
                        width: '100%',
                        color: 'white',
                        minHeight: '1000px',
                        paddingBottom: 20,
                    }}
                >
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={0} md={1}></Grid>
                            <Grid item xs={12} md={10}>
                                <div className="rounded-lg card mt-12">
                                    <CustomizedTables
                                        rows={stockDisplay}
                                        headerRow={getScreenerHeaderRow(
                                            this.state.orderBy,
                                            this.state.direction,
                                            this.handleClickOnSortLabel,
                                            this.state.mobile
                                        )}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={0} md={1}></Grid>
                        </Grid>
                    </Container>
                </div>
            </>
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
