import React, { Component } from 'react';

import { Container, Grid } from '@mui/material';
import { connect } from 'react-redux';

import { getScores, getStocks } from '../../../redux/actions/dataActions';
import LeaderboardPage from './leaderboardPage';

class Leaderboard extends Component {
    state = {
        mobile: !window.matchMedia('(min-width: 600px)').matches,
    };
    constructor(props) {
        super(props);
        this.props.getStocks(this.props.data, []);
        // this.props.getStocks(this.props.data, []);
    }

    render() {
        return (
            <div
                className="bg-gray-900"
                style={{
                    width: '100%',

                    color: 'white',
                    minHeight: '1000px',
                    paddingBottom: 20,
                }}
            >
                <Container className="mt-12">
                    <Grid container spacing={3}>
                        <Grid item md={2} xs={0}></Grid>
                        <Grid item xs={12} md={8}>
                            <div className="card mt-12">
                                <LeaderboardPage mobile={this.state.mobile} />
                            </div>
                        </Grid>
                        <Grid item md={2} xs={0}></Grid>
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

export default connect(mapStateToProps, mapActionsToProps)(Leaderboard);
