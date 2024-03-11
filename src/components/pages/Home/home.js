import { Container, Grid, Typography } from '@mui/material';
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

export const overviewBoxStyles = {
    height: '300px',
    // backgroundColor: 'whitesmoke',
    // color: 'black',
    overflowY: 'scroll',
};

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
        return (
            <>
                <StockModal
                    stockId={this.state.openModalStockId}
                    onClose={() => {
                        this.setStockIdForModal('');
                    }}
                />
                <div class="flex" style={{ flexWrap: 'wrap' }}>
                    <div class="bg-gray-800 h-900 flex justify-center items-center md:w-1/2">
                        <img src="mmm-logo.jpg" alt="Main Logo" />
                    </div>
                    <div
                        class="bg-gray-800 h-900 flex flex-col justify-center items-center md:w-1/2"
                        style={{
                            background:
                                'linear-gradient(#000000 20%, #1976d2) fixed',
                        }}
                    >
                        <div class="text-white text-center mb-12">
                            <h1 class="text-4xl font-bold mb-4">
                                Welcome to March Madness Market!
                            </h1>
                            <p class="text-lg text-gray-500 px-6">
                                Allocate your budget of $1000 to build a
                                portfolio of March Madness teams. The better
                                your teams perform in the tournament, the more
                                points you get!
                            </p>
                        </div>

                        <div class="text-white text-center mt-12">
                            (Seed Number) x (Number of Wins) x ($ Allocation) =
                            Points Earned
                        </div>
                        <div className="flex mt-8">
                            <div className="text-center px-2">
                                <b class="text-white">$ Spent</b>
                                <br />
                                <input
                                    min={0}
                                    max={1000}
                                    className="w-20 bg-gray-800 text-white p-2 rounded-lg"
                                    type="number"
                                    value={this.state.spent}
                                    onChange={(e) =>
                                        this.handleInputChange(e, 'spent')
                                    }
                                />
                            </div>
                            <div className="text-center px-2">
                                <b class="text-white">Seed</b>
                                <br />
                                <input
                                    className="w-20 bg-gray-800 text-white p-2 rounded-lg"
                                    type="number"
                                    max={16}
                                    min={1}
                                    value={this.state.seed}
                                    onChange={(e) =>
                                        this.handleInputChange(e, 'seed')
                                    }
                                />
                            </div>
                            <div className="text-center px-2">
                                <b class="text-white px-5">Wins</b>
                                <br />
                                <input
                                    min={1}
                                    max={6}
                                    className="w-20 bg-gray-800 text-white p-2 rounded-lg"
                                    type="number"
                                    value={this.state.wins}
                                    onChange={(e) =>
                                        this.handleInputChange(e, 'wins')
                                    }
                                />
                            </div>
                        </div>
                        <div className="text-white text-center mt-5">
                            <b>Points Earned: {this.state.points}</b>
                        </div>

                        <div className="text-gray-500 text-center mt-1 text-sm">
                            Allocating ${this.state.spent} to a #
                            {this.state.seed} seed team that{' '}
                            {this.state.wins === 1
                                ? ' makes it to the Round of 32'
                                : this.state.wins === 2
                                ? ' makes it to the Sweet 16'
                                : this.state.wins === 3
                                ? ' makes it to the Elite 8'
                                : this.state.wins === 4
                                ? ' makes it to the Final Four'
                                : this.state.wins === 5
                                ? ' makes it to the championship'
                                : ' wins the championship'}{' '}
                            will earn you {this.state.points} points!
                        </div>
                        <div className="mt-12 text-gray-400 text-center"></div>
                    </div>
                </div>
                <div
                    className="pt-20 bg-gray-900"
                    style={{
                        width: '100%',
                        color: 'white',
                        paddingBottom: 20,
                    }}
                >
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <div className="card">
                                    <section
                                        style={{
                                            overflow: 'auto',
                                            height: '400px',
                                        }}
                                    >
                                        <Typography variant="h4" align="center">
                                            Leaderboard
                                        </Typography>
                                        <div className="bg-gray-800 text-white">
                                            <LeaderboardPage
                                                mobile={this.state.mobile}
                                                homePage={true}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="card">
                                    <section
                                        style={{
                                            overflow: 'auto',
                                            height: '400px',
                                        }}
                                    >
                                        <Typography variant="h4" align="center">
                                            Teams
                                        </Typography>

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
                                                ></CustomizedTables>
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
                                                ></CustomizedTables>
                                            )}
                                        </div>
                                    </section>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Scores />
                            </Grid>
                            <Grid item xs={12}>
                                <img
                                    src={BRACKET_IMG_PATH}
                                    width="100%"
                                    alt="Bracket"
                                />
                            </Grid>
                        </Grid>
                    </Container>
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
