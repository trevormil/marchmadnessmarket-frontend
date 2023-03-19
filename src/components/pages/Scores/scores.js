import { CircularProgress, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles/withStyles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScores, getStocks } from '../../../redux/actions/dataActions';
import { overviewBoxStyles } from '../Home/home';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class Scores extends Component {
    constructor(props) {
        super(props);
        this.props.getScores(this.props.scoreData, []);
    }

    render() {
        return (
            <div className="card" style={{ marginTop: 24 }}>
                <section>
                    <Typography variant="h4" align="center">
                        Scores
                    </Typography>
                </section>
                <div id="livescorefeed" style={overviewBoxStyles}>
                    {this.props.scoreData.loading ? (
                        <CircularProgress />
                    ) : this.props.scoreData.scores === 'undefined' ||
                      !this.props.scoreData.scores[0] ? (
                        <Typography variant="h5" align="center">
                            No Current Games
                        </Typography>
                    ) : (
                        this.props.scoreData.scores.map((game) => {
                            return (
                                <div display="flexbox" key={game.name}>
                                    <h3 align="center">{game.name}</h3>

                                    <h1 align="center">
                                        <img
                                            height="50px"
                                            width="50px"
                                            margin="30px"
                                            src={game.score[1].logo}
                                            alt="Team Logo"
                                        />
                                        {game.score[1].score} -{' '}
                                        {game.score[0].score}
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={game.score[0].logo}
                                            alt="Team Logo"
                                        />
                                    </h1>

                                    <hr />
                                </div>
                            );
                        })
                    )}
                </div>
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
const mapActionsToProps = {
    getStocks,
    getScores,
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Scores));
