import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import {
    Grid,
    Typography,
    Container,
    CircularProgress,
} from '@material-ui/core';

import { getStocks, getScores } from '../../../redux/actions/dataActions';
import LeaderboardPage from './leaderboardPage';
const styles = (theme) => ({
    ...theme.spreadThis,
});

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.props.getStocks([]);
        this.props.getScores([]);
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
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6}>
                            <LeaderboardPage />
                        </Grid>
                        <Grid item xs={3}></Grid>
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
