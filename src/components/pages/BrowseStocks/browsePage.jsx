import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
// import { setUserWatchlist } from '../../../redux/actions/userActions';
import {
    getStocks,
    setStocks,
    sortCurrStocks,
} from '../../../redux/actions/dataActions';
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

                <div className="min-h-[calc(100vh-4rem)] bg-slate-950 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                                Browse Teams
                            </h1>
                            <p className="text-slate-400">
                                Explore all March Madness teams and build your
                                portfolio
                            </p>
                        </div>

                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-6">
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
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapActionsToProps)(BrowseStocksPage);
