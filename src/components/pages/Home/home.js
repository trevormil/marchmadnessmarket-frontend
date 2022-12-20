import React, { Component } from 'react';
import withStyles from '@mui/styles/withStyles';
import { getStocks, getScores } from '../../../redux/actions/dataActions';
import { connect } from 'react-redux';
import {
    Grid,
    Typography,
    Container,
    CircularProgress,
    Button,
    Card,
    Paper,
    Avatar,
} from '@mui/material';
import { getInfoRows, getInfoHeaderRow } from './homerows';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import LeaderboardPage from '../Leaderboard/leaderboardPage';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import {
    SportsBasketballRounded,
    EmojiEventsRounded,
    MonetizationOn,
    MonetizationOnRounded,
    ShowChartRounded,
} from '@mui/icons-material';
import { LAST_UPDATED_AT } from '../../../constants/constants';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class HomePage extends Component {
    state = {
        mobile: !window.matchMedia('(min-width: 1000px)').matches,
    };

    constructor(props) {
        super(props);
        this.props.getStocks([]);
        this.props.getScores([]);
    }
    render() {
        const { classes } = this.props;
        const marketOverviewStyle = {
            overflow: 'auto',
            height: '500px',
        };

        const liveFeedStyle = {
            height: '300px',
            backgroundColor: this.props.scoreData.loading
                ? undefined
                : 'whitesmoke',
            color: 'black',
            overflow: 'scroll',
        };

        const upcomingEventsStyle = {
            height: '300px',
            backgroundColor: 'whitesmoke',
            color: 'black',
            overflow: 'scroll',
        };
        return (
            <>
                <div
                    style={{
                        height: '700px',
                        width: '100%',
                        background: `linear-gradient(#000000, #1976d2) fixed`,
                    }}
                >
                    <div
                        style={{
                            height: '700px',
                            width: '100%',
                            backgroundImage: `url("mmm-logo.jpg")`,
                            backgroundSize: '700px',
                            // backgroundRepeat: 'space repeat',
                            color: 'white',
                            backgroundBlendMode: 'multiply',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                height: '100%',
                                // alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Container>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h2"
                                            className={classes.pageTitle}
                                            align="center"
                                            style={{ paddingTop: 25 }}
                                        >
                                            Welcome!
                                        </Typography>

                                        {/* <Typography variant="h6" align="center">
                                            <img
                                                src="mmm-logo.jpg"
                                                height="300px"
                                            />
                                        </Typography> */}
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: '100%',
                        background: `linear-gradient(#1976d2, #000000) fixed`,
                        color: 'white',
                    }}
                >
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        paddingTop: '32px',
                                    }}
                                >
                                    <Typography variant="h3" align="center">
                                        How It Works
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div
                                    style={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <Avatar
                                        style={{
                                            height: '200px',
                                            width: '200px',
                                            backgroundColor: 'black',
                                        }}
                                    >
                                        <MonetizationOnRounded
                                            style={{
                                                height: '180px',
                                                width: '180px',
                                                backgroundColor: 'black',
                                            }}
                                        />
                                    </Avatar>
                                </div>
                                <div
                                    style={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        marginTop: 30,
                                    }}
                                >
                                    <Typography>
                                        Everyone is given a $1000 budget of
                                        in-game money which must be spent before
                                        March 17th at 12:00 PM (unspent funds
                                        are worthless).
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div
                                    style={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <Avatar
                                        style={{
                                            height: '200px',
                                            width: '200px',
                                            backgroundColor: 'black',
                                        }}
                                    >
                                        <ShowChartRounded
                                            style={{
                                                height: '180px',
                                                width: '180px',
                                                backgroundColor: 'black',
                                            }}
                                        />
                                    </Avatar>
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        marginTop: 30,
                                    }}
                                >
                                    <Typography>
                                        Prices for all teams' stock is fixed at
                                        $1 per share. You can buy as much or as
                                        little stock of a team as you wish.
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div
                                    style={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <Avatar
                                        style={{
                                            height: '200px',
                                            width: '200px',
                                            backgroundColor: 'black',
                                        }}
                                    >
                                        <SportsBasketballRounded
                                            style={{
                                                height: '180px',
                                                width: '180px',
                                                backgroundColor: 'black',
                                            }}
                                        />
                                    </Avatar>
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        marginTop: 30,
                                    }}
                                >
                                    <Typography>
                                        Points are rewarded whenever a team
                                        wins, excluding play-in games. The
                                        amount of points per win per share is
                                        equal to their seed number.
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div
                                    style={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <Avatar
                                        style={{
                                            height: '200px',
                                            width: '200px',
                                            backgroundColor: 'black',
                                        }}
                                    >
                                        <EmojiEventsRounded
                                            style={{
                                                height: '180px',
                                                width: '180px',
                                                backgroundColor: 'black',
                                            }}
                                        />
                                    </Avatar>
                                </div>
                                <div
                                    style={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        marginTop: 30,
                                    }}
                                >
                                    <Typography>
                                        The winner will be the one who
                                        accumulates the most points over the
                                        duration of the tournament.
                                    </Typography>
                                </div>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                style={{ marginTop: 20, paddingBottom: 30 }}
                            >
                                <Typography align="center">
                                    For example, let's say you own 10 shares of
                                    Florida (a #10 seed), and they win two
                                    games. You will receive 200 points (10
                                    shares x 10 seed x 2 wins).
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <div
                    style={{
                        width: '100%',
                        background: `linear-gradient(#000000, #1976d2) fixed`,
                        color: 'white',
                        paddingBottom: 20,
                    }}
                >
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        paddingTop: '32px',
                                    }}
                                >
                                    <Typography variant="h3" align="center">
                                        Overview
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
                                        <div
                                            style={{
                                                backgroundColor: 'whitesmoke',
                                            }}
                                        >
                                            <LeaderboardPage
                                                mobile={this.state.mobile}
                                            />
                                        </div>
                                    </section>
                                </div>

                                <div className="card" style={{ marginTop: 24 }}>
                                    <section>
                                        <Typography variant="h4" align="center">
                                            Scores
                                        </Typography>
                                    </section>
                                    <div
                                        id="livescorefeed"
                                        style={liveFeedStyle}
                                    >
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
                                            <Typography
                                                variant="h5"
                                                align="center"
                                            >
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
                                                                    game
                                                                        .score[1]
                                                                        .score
                                                                }{' '}
                                                                -{' '}
                                                                {
                                                                    game
                                                                        .score[0]
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
                                                        this.state.mobile
                                                    )}
                                                ></CustomizedTables>
                                            )}
                                        </div>
                                    </section>
                                </div>
                                <div
                                    className="card"
                                    style={{
                                        marginTop: 24,
                                    }}
                                >
                                    <section>
                                        <Typography variant="h4" align="center">
                                            Upcoming Events
                                        </Typography>
                                    </section>
                                    <div style={upcomingEventsStyle}>
                                        <Typography
                                            align="center"
                                            style={{ padding: 5 }}
                                        >
                                            <b>Final Four - April 2 </b> <br />
                                            No. 1 Kansas vs. No. 2 Villanova
                                            6:09 p.m. TBS
                                            <br />
                                            No. 2 Duke vs. No. 8 North Carolina
                                            8:49 p.m. TBS
                                            <br />
                                            <br />
                                            <b>
                                                National Championship - April 4
                                            </b>{' '}
                                            <br />
                                            No. 1 Kansas vs. No. 8 North
                                            Carolina 9:20pm TBS
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <img src="bracket2022final.jpg" width="100%" />
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
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(HomePage));
