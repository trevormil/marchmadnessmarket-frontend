import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
//UI
import { withStyles, Typography, Container, Grid } from '@material-ui/core';

import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { getHeaderRow, getRows } from './userrows';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import { getOtherUserStocks } from '../../../redux/actions/dataActions';

import Blockies from 'react-blockies';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
//Table Components
const styles = (theme) => ({
    ...theme.spreadThis,
});

const waitForURLUpdate = () => {
    let splitPathName = window.location.pathname.split('/');

    while (splitPathName[splitPathName.length - 2] !== 'users') {
        splitPathName = window.location.pathname.split('/');
    }
    let str = window.location.pathname.split('/').pop();
    str = str.replace('%20', ' ');
    return str;
};

class UserPage extends Component {
    state = {
        userId: waitForURLUpdate(),
    };
    constructor(props) {
        super(props);
        this.props.getOtherUserStocks(this.state.userId);
    }
    render() {
        const { classes } = this.props;
        const userJSON = this.props.user.leaderboard.filter(
            (element) => element.userName == this.state.userId
        );
        let stockDisplay = !this.props.otherUserStocks.loading ? (
            getRows(
                this.props.otherUserStocks.stocks,
                window.localStorage.getItem('username') == this.state.userId
            )
        ) : (
            <StyledTableRow>
                <StyledTableCell>Loading...</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
            </StyledTableRow>
        );
        return (
            <div
                style={{
                    width: '100%',
                    background: `linear-gradient(#000000, #1976d2) fixed`,
                    color: 'white',
                    minHeight: '1000px',
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
                                    ? this.state.userId +
                                      ` (${
                                          userJSON[0]
                                              ? userJSON[0]['totalAccountValue']
                                              : '0'
                                      } Points)`
                                    : 'Loading....'}
                            </span>
                        </Typography>
                    </div>
                </Container>

                <Container maxWidth="sm">
                    <Typography
                        variant="h2"
                        className={classes.pageTitle}
                        align="center"
                    >
                        {}
                    </Typography>
                    <div className="card">
                        <CustomizedTables
                            rows={stockDisplay}
                            headerRow={getHeaderRow()}
                        />
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
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(UserPage));
