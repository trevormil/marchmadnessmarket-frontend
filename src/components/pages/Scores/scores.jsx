import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScores, getStocks } from '../../../redux/actions/dataActions';

class Scores extends Component {
    constructor(props) {
        super(props);
        this.props.getScores(this.props.scoreData, []);
    }

    render() {
        return (
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
                    <h2 className="text-2xl font-bold text-white text-center">
                        Live Scores
                    </h2>
                </div>
                <div
                    id="livescorefeed"
                    className="max-h-[400px] overflow-y-auto p-6 bg-slate-950/50"
                >
                    {this.props.scoreData.loading ? (
                        <div className="flex justify-center items-center py-12">
                            <svg
                                className="animate-spin h-8 w-8 text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </div>
                    ) : this.props.scoreData.scores === 'undefined' ||
                      !this.props.scoreData.scores[0] ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-slate-400">
                                No Current Games
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {this.props.scoreData.scores.map((game) => {
                                return (
                                    <div
                                        key={game.name}
                                        className="bg-slate-900/50 rounded-lg p-4 border border-slate-800"
                                    >
                                        <h3 className="text-lg font-semibold text-white text-center mb-4">
                                            {game.name}
                                        </h3>
                                        <div className="flex items-center justify-center space-x-6">
                                            <div className="flex flex-col items-center">
                                                <img
                                                    className="w-16 h-16 rounded-lg bg-white p-2"
                                                    src={game.score[1].logo}
                                                    alt="Team Logo"
                                                />
                                                <span className="text-sm text-slate-400 mt-2">
                                                    {game.score[1].teamName ||
                                                        'Team 1'}
                                                </span>
                                            </div>
                                            <div className="text-3xl font-bold text-white">
                                                {game.score[1].score} -{' '}
                                                {game.score[0].score}
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <img
                                                    className="w-16 h-16 rounded-lg bg-white p-2"
                                                    src={game.score[0].logo}
                                                    alt="Team Logo"
                                                />
                                                <span className="text-sm text-slate-400 mt-2">
                                                    {game.score[0].teamName ||
                                                        'Team 2'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
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
