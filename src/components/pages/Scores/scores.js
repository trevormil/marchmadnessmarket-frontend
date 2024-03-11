import { CircularProgress, Typography } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScores, getStocks } from '../../../redux/actions/dataActions';
import { overviewBoxStyles } from '../Home/home';

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
                <div
                    id="livescorefeed"
                    style={overviewBoxStyles}
                    className="bg-gray-800 text-white w-full"
                >
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
                                <div
                                    key={game.name}
                                    className="items-center mb-5 mt-1"
                                >
                                    <h3 align="center">{game.name}</h3>

                                    <div
                                        align="center"
                                        className="text-white-500 flex justify-center text-center"
                                        style={{ verticalAlign: 'middle' }}
                                    >
                                        <img
                                            height="50px"
                                            width="50px"
                                            margin="30px"
                                            src={game.score[1].logo}
                                            alt="Team Logo"
                                        />
                                        {/* align middle */}
                                        <div className="mx-5 flex items-center">
                                            {game.score[1].score} -{' '}
                                            {game.score[0].score}
                                        </div>
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={game.score[0].logo}
                                            alt="Team Logo"
                                        />
                                    </div>
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
export default connect(mapStateToProps, mapActionsToProps)(Scores);
