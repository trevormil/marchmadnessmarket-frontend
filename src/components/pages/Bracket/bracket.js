import React, { Component } from 'react';
import withStyles from '@mui/styles/withStyles';

import { connect } from 'react-redux';
import { Grid, Typography, Container, CircularProgress } from '@mui/material';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import LeaderboardPage from '../Leaderboard/leaderboardPage';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import { getStocks, getScores } from '../../../redux/actions/dataActions';
const styles = (theme) => ({
    ...theme.spreadThis,
});

class BracketPage extends Component {
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
            overflow: 'scroll',
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
                                    Bracket
                                </Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <img src="bracket2022final.jpg" width="100%" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <div className="card">
                                <section>
                                    <Typography variant="h4" align="center">
                                        Scores
                                    </Typography>
                                </section>
                                <div id="livescorefeed" style={liveFeedStyle}>
                                    {this.props.scoreData.loading ? (
                                        <CustomizedTables
                                            headerRow={undefined}
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
                                    ) : this.props.scoreData.scores ===
                                          'undefined' ||
                                      !this.props.scoreData.scores[0] ? (
                                        <Typography variant="h5" align="center">
                                            No Current Games
                                        </Typography>
                                    ) : (
                                        this.props.scoreData.scores.map(
                                            (game) => {
                                                return (
                                                    <div
                                                        display="flexbox"
                                                        key={game.name}
                                                    >
                                                        <h3 align="center">
                                                            {game.name}
                                                        </h3>

                                                        <h1 align="center">
                                                            <img
                                                                height="50px"
                                                                width="50px"
                                                                margin="30px"
                                                                src={
                                                                    game
                                                                        .score[1]
                                                                        .logo
                                                                }
                                                                alt="Team Logo"
                                                            />
                                                            {
                                                                game.score[1]
                                                                    .score
                                                            }{' '}
                                                            -{' '}
                                                            {
                                                                game.score[0]
                                                                    .score
                                                            }
                                                            <img
                                                                height="50px"
                                                                width="50px"
                                                                src={
                                                                    game
                                                                        .score[0]
                                                                        .logo
                                                                }
                                                                alt="Team Logo"
                                                            />
                                                        </h1>

                                                        <hr />
                                                    </div>
                                                );
                                            }
                                        )
                                    )}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="card">
                                <section>
                                    <Typography variant="h4" align="center">
                                        Upcoming Events
                                    </Typography>
                                </section>
                                <div style={liveFeedStyle}>
                                    <Typography align="center">
                                        <b>Final Four - April 2 </b> <br />
                                        No. 1 Kansas vs. No. 2 Villanova 6:09
                                        p.m TBS
                                        <br />
                                        No. 2 Duke vs. No. 8 North Carolina 8:49
                                        p.m TBS
                                        <br />
                                        <br />
                                        <b>
                                            National Championship - April 4
                                        </b>{' '}
                                        <br />
                                        No. 1 Kansas vs. No. 8 North Carolina
                                        9:20pm TBS
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
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
)(withStyles(styles)(BracketPage));
