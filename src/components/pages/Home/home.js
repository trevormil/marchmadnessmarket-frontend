import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BRACKET_IMG_PATH } from '../../../constants/constants';
import { getScores, getStocks } from '../../../redux/actions/dataActions';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import LeaderboardPage from '../Leaderboard/leaderboardPage';
import Scores from '../Scores/scores';
import StockModal from '../Stock/stockModal';
import { getInfoHeaderRow, getInfoRows } from './homerows';
import { Hero } from './Hero';

class HomePage extends Component {
    state = {
        mobile: !window.matchMedia('(min-width: 1000px)').matches,
        openModalStockId: '',
        seed: 1,
        wins: 1,
        spent: 1,
        points: 1,
    };

    constructor(props) {
        super(props);
        this.props.getStocks(this.props.data, []);
        this.setStockIdForModal = this.setStockIdForModal.bind(this);
    }

    setStockIdForModal(stockId) {
        this.setState({ openModalStockId: stockId });
    }

    // Function to calculate points based on input values
    calculatePoints() {
        const { seed, wins, spent } = this.state;
        const calculatedPoints = seed * wins * spent;
        this.setState({ points: calculatedPoints });
    }

    // Function to handle input changes and update corresponding state
    handleInputChange(e, field) {
        const value = parseInt(e.target.value);
        this.setState({ [field]: value }, () => {
            this.calculatePoints(); // Recalculate points after state update
        });
    }

    render() {
        const { authenticated } = this.props.user;

        return (
            <>
                <StockModal
                    stockId={this.state.openModalStockId}
                    onClose={() => {
                        this.setStockIdForModal('');
                    }}
                />

                {/* Hero Section from Figma Design */}
                <Hero authenticated={authenticated} />

                {/* Main Content Section */}
                <div className="bg-slate-950 min-h-[calc(100vh-4rem)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                            {/* Leaderboard Card */}
                            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                                    <h2 className="text-2xl font-bold text-white text-center">
                                        Leaderboard
                                    </h2>
                                </div>
                                <div className="p-6 max-h-[500px] overflow-y-auto">
                                    <LeaderboardPage
                                        mobile={this.state.mobile}
                                        homePage={true}
                                    />
                                </div>
                            </div>

                            {/* Teams Card */}
                            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                                    <h2 className="text-2xl font-bold text-white text-center">
                                        Top Teams
                                    </h2>
                                </div>
                                <div className="p-6 max-h-[500px] overflow-y-auto">
                                    <div id="market-overview">
                                        {this.props.data.loading ? (
                                            <CustomizedTables
                                                headerRow={getInfoHeaderRow(
                                                    this.state.mobile
                                                )}
                                                rows={
                                                    <StyledTableRow>
                                                        <StyledTableCell>
                                                            Loading...
                                                        </StyledTableCell>
                                                        <StyledTableCell></StyledTableCell>
                                                        <StyledTableCell></StyledTableCell>
                                                        <StyledTableCell></StyledTableCell>
                                                    </StyledTableRow>
                                                }
                                            />
                                        ) : (
                                            <CustomizedTables
                                                headerRow={getInfoHeaderRow(
                                                    this.state.mobile
                                                )}
                                                rows={getInfoRows(
                                                    this.props.data.stocks,
                                                    this.state.mobile,
                                                    this.setStockIdForModal
                                                )}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Scores Section */}
                        <div className="mb-16">
                            <Scores />
                        </div>

                        {/* Bracket Image */}
                        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden p-6">
                            <h2 className="text-2xl font-bold text-white text-center mb-6">
                                Tournament Bracket
                            </h2>
                            <img
                                src={BRACKET_IMG_PATH}
                                alt="Tournament Bracket"
                                className="w-full rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </>
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
export default connect(mapStateToProps, mapActionsToProps)(HomePage);
