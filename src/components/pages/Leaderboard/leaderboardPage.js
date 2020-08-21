import React, { Component } from 'react'
//Redux
import { connect } from 'react-redux';
//UI
import { withStyles, Typography, Container } from '@material-ui/core';
//Table Components
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { getHeaderRow, getRows } from './leaderboardRows'
import { StyledTableCell } from '../../ui/StockInfoTable/styledTableComponents'

const styles = (theme) => ({
    ...theme.spreadThis
});

class LeaderboardPage extends Component {
    render() {
        const { classes } = this.props;
        let stockDisplay = !this.props.user.loading
            ? getRows(this.props.user.leaderboard, classes) : <StyledTableCell>Loading.....</StyledTableCell>;
        return (
            <div className='screener' >
                <Container maxWidth="lg">
                    <div className={classes.root}>
                        <Typography variant="h2" className={classes.pageTitle} align="center">
                            Leaderboards
                         </Typography>
                        <Typography variant="h6" className={classes.pageTitle} align="center">
                            Note: Leaderboards are updated once daily at 12:00 AM EST.
                         </Typography>
                        <hr />
                    </div>
                </Container>

                <Container maxWidth="sm">
                    <div>
                        <CustomizedTables
                            rows={stockDisplay}
                            headerRow={getHeaderRow()} />
                    </div>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data
});

const mapActionsToProps = {
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(LeaderboardPage));