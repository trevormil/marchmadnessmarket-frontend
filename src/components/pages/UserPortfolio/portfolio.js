import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
//UI
import { Typography, Container, Grid } from '@mui/material';

import withStyles from '@mui/styles/withStyles';

import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { getHeaderRow, getRows } from '../User/userrows';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import {
    getOtherUserStocks,
    getStocks,
} from '../../../redux/actions/dataActions';

import Blockies from 'react-blockies';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import { TOURNAMENT_NOT_STARTED } from '../../../constants/constants';
//Table Components
const styles = (theme) => ({
    ...theme.spreadThis,
});

class PortfolioPage extends Component {
    state = {
        userId: window.localStorage.getItem('username'),
        orderBy: TOURNAMENT_NOT_STARTED ? 'numShares' : 'points',
        direction: 'asc',
    };
    constructor(props) {
        super(props);
        console.log(this.state.userId);
        this.props.getOtherUserStocks(this.state.userId);
        if (!this.props.data.stocks || !this.props.data.stocks.length) {
            this.props.getStocks([]);
        }
        this.handleClickOnSortLabel = this.handleClickOnSortLabel.bind(this);
    }

    handleClickOnSortLabel(event) {
        const orderByName = event.currentTarget.getAttribute('name');
        const dir = this.state.direction === 'asc' ? 'desc' : 'asc';
        this.setState({
            orderBy: orderByName,
            direction: dir,
        });
        // this.props.sortCurrStocks(
        //     this.props.data,
        //     orderByName,
        //     dir,
        //     this.props.user.watchlist
        // );
    }
    render() {
        const { classes } = this.props;
        console.log(this.props.data.leaderboard);
        const userJSON = this.props.data.leaderboard
            ? this.props.data.leaderboard.filter(
                  (element) => element.userName === this.state.userId
              )
            : [];
        console.log(this.props.otherUserStocks.stocks);

        console.log(this.props.user);
        let stockDisplay =
            !this.props.otherUserStocks.loading && !this.props.data.loading ? (
                getRows(
                    this.props.otherUserStocks.stocks,
                    this.props.data.stocks,
                    window.localStorage.getItem('username') ===
                        this.state.userId,
                    this.state.direction,
                    this.state.orderBy
                )
            ) : (
                <StyledTableRow>
                    <StyledTableCell>Loading...</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    {TOURNAMENT_NOT_STARTED && (
                        <>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </>
                    )}
                </StyledTableRow>
            );

        if (
            TOURNAMENT_NOT_STARTED &&
            this.props.user.userName !== this.state.userId
        ) {
            console.log('AFJKSDFHJSDHKGFSDJ');
            stockDisplay = (
                <StyledTableRow>
                    <StyledTableCell>Picks Hidden</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    {TOURNAMENT_NOT_STARTED && (
                        <>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </>
                    )}
                </StyledTableRow>
            );
        }

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
                <Container maxWidth="md">
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
                                              ? userJSON[0]['totalAccountValue']
                                              : '0'
                                      })`
                                    : 'Loading....'}
                            </span>
                        </Typography>
                    </div>

                    {TOURNAMENT_NOT_STARTED &&
                        this.props.user?.accountBalance >= 0 &&
                        this.props.user.userName === this.state.userId && (
                            <Container maxWidth="lg">
                                <Typography
                                    variant="h6"
                                    className={classes.pageTitle}
                                    align="center"
                                >
                                    You have ${this.props.user.accountBalance}{' '}
                                    left to spend!
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
                                    this.handleClickOnSortLabel
                                )}
                            />
                        </div>
                    </div>
                </Container>
            </div>
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
)(withStyles(styles)(PortfolioPage));