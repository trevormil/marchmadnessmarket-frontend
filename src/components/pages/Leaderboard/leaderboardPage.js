import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
//UI
import { Typography, Container } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
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
        // console.log(this.props.mobile, 'AFAHFGHJKASDGHJ');
        const { classes } = this.props;
        let stockDisplay = !this.props.data.loading ? (
            getRows(this.props.data.leaderboard, this.props.mobile)
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
            // <div style={{ overflow: 'auto' }}>
            <CustomizedTables
                rows={stockDisplay}
                headerRow={getHeaderRow(this.props.mobile)}
            />
            // </div>
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
