import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
//UI
import { withStyles, Typography, Container } from '@material-ui/core';
//Table Components
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { getHeaderRow, getRows } from './leaderboardRows';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class LeaderboardPage extends Component {
    render() {
        const { classes } = this.props;
        let stockDisplay = !this.props.data.loading ? (
            getRows(this.props.data.leaderboard, classes)
        ) : (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row" align="left">
                    Loading...
                </StyledTableCell>
                <StyledTableCell
                    component="th"
                    scope="row"
                    align="left"
                ></StyledTableCell>
                <StyledTableCell
                    component="th"
                    scope="row"
                    align="left"
                ></StyledTableCell>
                <StyledTableCell
                    component="th"
                    scope="row"
                    align="left"
                ></StyledTableCell>
            </StyledTableRow>
        );
        return (
            <CustomizedTables rows={stockDisplay} headerRow={getHeaderRow()} />
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data,
});

const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(LeaderboardPage));
