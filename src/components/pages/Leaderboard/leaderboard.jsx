import React, { Component } from 'react';
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
            <div className="min-h-[calc(100vh-4rem)] bg-slate-950 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Leaderboard
                        </h1>
                        <p className="text-slate-400">
                            See how you rank against other players
                        </p>
                    </div>

                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-6">
                            <LeaderboardPage mobile={this.state.mobile} />
                        </div>
                    </div>
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
const mapActionsToProps = { getStocks, getScores };

export default connect(mapStateToProps, mapActionsToProps)(Leaderboard);
