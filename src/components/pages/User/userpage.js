import { Container, Typography } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import withStyles from '@mui/styles/withStyles';

import Blockies from 'react-blockies';
import { TOURNAMENT_NOT_STARTED } from '../../../constants/constants';
import {
    getOtherUserStocks,
    getStocks,
} from '../../../redux/actions/dataActions';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import StockModal from '../Stock/stockModal';
import { UserStockRowSchema, getHeaderRow, getRows } from './userrows';
import { getBlankRowFromSchema } from '../../ui/StockInfoTable/stockTableUtils';

//Table Components
const styles = (theme) => ({
    ...theme.spreadThis,
});

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
        const { classes } = this.props;
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

                <div
                    style={{
                        width: '100%',
                        background: `linear-gradient(#000000, #1976d2) fixed`,
                        color: 'white',
                        minHeight: '1000px',
                        paddingBottom: 20,
                    }}
                >
                    <Container maxWidth="lg">
                        <div className={classes.root}>
                            <Typography
                                variant="h2"
                                className={classes.pageTitle}
                                align="center"
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Blockies
                                    seed={this.state.userId}
                                    size={20}
                                    scale={3}
                                    className="identicon"
                                />
                                <span style={{ padding: 10 }}>
                                    {this.state.userId
                                        ? this.state.userId.replace(
                                              '%E2%80%99',
                                              "'"
                                          ) +
                                          ` (${
                                              userJSON[0]
                                                  ? userJSON[0][
                                                        'totalAccountValue'
                                                    ]
                                                  : '0'
                                          })`
                                        : 'Loading....'}
                                </span>
                            </Typography>
                        </div>

                        {TOURNAMENT_NOT_STARTED &&
                            this.props.user?.accountBalance > 0 &&
                            this.props.user.userName === this.state.userId && (
                                <Container maxWidth="lg">
                                    <Typography
                                        variant="h6"
                                        className={classes.pageTitle}
                                        align="center"
                                    >
                                        You have $
                                        {this.props.user.accountBalance} left to
                                        spend!
                                    </Typography>
                                </Container>
                            )}

                        <div className="card">
                            <div style={{ overflow: 'auto' }}>
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
    otherUserStocks: state.otherUserStocks,
});

const mapActionsToProps = {
    getOtherUserStocks,
    getStocks,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(UserPage));
