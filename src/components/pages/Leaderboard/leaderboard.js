import React, { Component } from 'react';
import withStyles from '@mui/styles/withStyles';

import { connect } from 'react-redux';
import { Grid, Typography, Container, CircularProgress } from '@mui/material';

import { getStocks, getScores } from '../../../redux/actions/dataActions';
import LeaderboardPage from './leaderboardPage';
import { LAST_UPDATED_AT } from '../../../constants/constants';
const styles = (theme) => ({
    ...theme.spreadThis,
});

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.props.getStocks([]);
        // this.props.getScores([]);
    }

    render() {
        const { classes } = this.props;
        const liveFeedStyle = {
            height: '300px',
            backgroundColor: 'whitesmoke',
            color: 'black',
        };
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
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    className={classes.pageTitle}
                                    align="center"
                                >
                                    Leaderboard
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <Typography align="center">
                                    Last Updated: {LAST_UPDATED_AT}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item md={3} xs={0}></Grid>
                        <Grid item xs={12} md={6}>
                            <div className="screenercard">
                                <LeaderboardPage />
                            </div>
                        </Grid>
                        <Grid item md={3} xs={0}></Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data,
    scoreData: state.scoreData,
});
const mapActionsToProps = { getStocks, getScores };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Leaderboard));
