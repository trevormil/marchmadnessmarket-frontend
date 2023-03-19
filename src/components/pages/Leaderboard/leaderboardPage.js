import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
//UI
import { Pagination } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
//Table Components
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { getBlankRowFromSchema } from '../../ui/StockInfoTable/stockTableUtils';
import { LeaderboardSchema, getHeaderRow, getRows } from './leaderboardRows';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class LeaderboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
    }

    render() {
        let stockDisplay = !this.props.data.loading
            ? getRows(
                  this.props.data.leaderboard,
                  this.props.mobile,
                  this.state.page,
                  window.localStorage.getItem('username'),
                  this.props.homePage
              )
            : getBlankRowFromSchema(
                  LeaderboardSchema,
                  this.props.mobile,
                  'Loading...',
                  this.props.homePage
              );
        return (
            <div>
                <div style={{ overflow: 'auto' }}>
                    <CustomizedTables
                        rows={stockDisplay}
                        headerRow={getHeaderRow(
                            this.props.mobile,
                            this.props.homePage
                        )}
                    />
                </div>

                {(this.props.data.leaderboard
                    ? this.props.data.leaderboard.length / 100
                    : 1) <= 1 ? (
                    <></>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: 'whitesmoke',
                            color: 'white',
                            padding: 15,
                        }}
                    >
                        <Pagination
                            page={this.state.page}
                            style={{ color: 'white' }}
                            count={
                                this.props.data.leaderboard
                                    ? this.props.data.leaderboard.length / 100
                                    : 1
                            }
                            color="standard"
                            variant="outlined"
                            hidden={
                                (this.props.data.leaderboard
                                    ? this.props.data.leaderboard.length / 100
                                    : 1) <= 1
                            }
                            onChange={(event, value) => {
                                this.setState({
                                    page: value,
                                });
                            }}
                        />
                    </div>
                )}
            </div>
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
