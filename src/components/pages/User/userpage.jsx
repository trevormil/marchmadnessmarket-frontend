import React, { Component } from 'react';
import { connect } from 'react-redux';
import Blockies from 'react-blockies';
import { TOURNAMENT_NOT_STARTED } from '../../../constants/constants';
import {
    getOtherUserStocks,
    getStocks,
} from '../../../redux/actions/dataActions';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { getBlankRowFromSchema } from '../../ui/StockInfoTable/stockTableUtils';
import StockModal from '../Stock/stockModal';
import { UserStockRowSchema, getHeaderRow, getRows } from './userrows';

const getUserIdFromPathname = () => {
    let splitPathName = window.location.pathname.split('/');

    if (splitPathName[splitPathName.length - 1] === 'portfolio') {
        return window.localStorage.getItem('username');
    } else {
        while (splitPathName[splitPathName.length - 2] !== 'users') {
            splitPathName = window.location.pathname.split('/');
        }
        let str = window.location.pathname.split('/').pop();
        str = str.replace('%20', ' ');
        return str;
    }
};

class UserPage extends Component {
    state = {
        userId: getUserIdFromPathname(),
        orderBy: 'points',
        direction: 'asc',
        mobile: !window.matchMedia('(min-width: 600px)').matches,
        openModalStockId: '',
    };
    constructor(props) {
        super(props);
        this.props.getOtherUserStocks(this.state.userId);
        this.props.getStocks(this.props.data, []);
        this.handleClickOnSortLabel = this.handleClickOnSortLabel.bind(this);
        this.handleClickOnBuySellButton =
            this.handleClickOnBuySellButton.bind(this);
    }

    handleClickOnSortLabel(event) {
        const orderByName = event.currentTarget.getAttribute('name');
        const dir = this.state.direction === 'asc' ? 'desc' : 'asc';
        this.setState({
            orderBy: orderByName,
            direction: dir,
        });
    }

    handleClickOnBuySellButton(stockId) {
        this.setState({ openModalStockId: stockId });
        if (stockId === '' && TOURNAMENT_NOT_STARTED) {
            this.props.getOtherUserStocks(this.state.userId); //Closing modal
        }
    }

    render() {
        const userJSON = this.props.data.leaderboard
            ? this.props.data.leaderboard.filter(
                  (element) => element.userName === this.state.userId
              )
            : [];
        let stockDisplay =
            !this.props.otherUserStocks.loading && !this.props.data.loading
                ? getRows(
                      this.props.otherUserStocks.stocks,
                      this.props.data.stocks,
                      window.localStorage.getItem('username') ===
                          this.state.userId,
                      this.state.direction,
                      this.state.orderBy,
                      this.state.mobile,
                      this.handleClickOnBuySellButton
                  )
                : getBlankRowFromSchema(
                      UserStockRowSchema,
                      this.state.mobile,
                      'Loading...'
                  );

        if (
            TOURNAMENT_NOT_STARTED &&
            this.props.user.userName !== this.state.userId
        ) {
            stockDisplay = getBlankRowFromSchema(
                UserStockRowSchema,
                this.state.mobile,
                'Picks Hidden'
            );
        }

        return (
            <>
                <StockModal
                    stockId={this.state.openModalStockId}
                    onClose={() => {
                        this.handleClickOnBuySellButton('');
                    }}
                />

                <div className="min-h-[calc(100vh-4rem)] bg-slate-950 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <div className="flex items-center justify-center space-x-4 mb-4">
                                <Blockies
                                    seed={this.state.userId}
                                    size={20}
                                    scale={3}
                                    className="rounded-lg"
                                />
                                <h1 className="text-4xl font-bold text-white">
                                    {this.state.userId
                                        ? this.state.userId.replace(
                                              '%E2%80%99',
                                              "'"
                                          )
                                        : 'Loading....'}
                                </h1>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl font-semibold text-blue-400">
                                    {userJSON[0]
                                        ? `${userJSON[0]['totalAccountValue']} Points`
                                        : '0 Points'}
                                </span>
                            </div>
                        </div>

                        {TOURNAMENT_NOT_STARTED &&
                            this.props.user?.accountBalance > 0 &&
                            this.props.user.userName === this.state.userId && (
                                <div className="mb-6 text-center">
                                    <div className="inline-block bg-amber-500/20 border border-amber-500/30 rounded-lg px-6 py-3">
                                        <p className="text-lg font-semibold text-amber-400">
                                            You have $
                                            {this.props.user.accountBalance}{' '}
                                            left to spend!
                                        </p>
                                    </div>
                                </div>
                            )}

                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-6">
                                <CustomizedTables
                                    rows={stockDisplay}
                                    headerRow={getHeaderRow(
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
    otherUserStocks: state.otherUserStocks,
});

const mapActionsToProps = {
    getOtherUserStocks,
    getStocks,
};

export default connect(mapStateToProps, mapActionsToProps)(UserPage);
