import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import { infoHeaderRow, getInfoRows } from './homerows';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import LeaderboardPage from '../Leaderboard/leaderboardPage';
import {
    SportsBasketballRounded,
    EmojiEventsRounded,
    MonetizationOn,
    MonetizationOnRounded,
    ShowChartRounded,
} from '@material-ui/icons';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.props.getStocks([]);
        this.props.getScores([]);
    }
    render() {
        const { classes } = this.props;
        const marketOverviewStyle = {
            overflow: 'scroll',
            height: '500px',
        };

        const liveFeedStyle = {
            height: '300px',
            backgroundColor: 'whitesmoke',
            color: 'black',
        };
        return (
            <>
                <div
                    style={{
                        height: '700px',
                        width: '100%',
                        backgroundImage: `url("bg-bball.jpg")`,
                        backgroundSize: '100%',
                        backgroundRepeat: 'no-repeat',
                        color: 'white',
                        backgroundBlendMode: 'multiply',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Container>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="h2"
                                        className={classes.pageTitle}
                                        align="center"
                                    >
                                        Welcome to March Madness Market!
                                    </Typography>
                                    <Typography variant="h6" align="center">
                                        Buy stock in teams you think will do
                                        well, and get rewarded with points when
                                        they win!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
                <div
                    style={{
                        height: '600px',
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
                                        Rules
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '20%',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
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
                                                        backgroundColor:
                                                            'black',
                                                    }}
                                                />
                                            </Avatar>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '20%',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
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
                                                        backgroundColor:
                                                            'black',
                                                    }}
                                                />
                                            </Avatar>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '20%',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
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
                                                        backgroundColor:
                                                            'black',
                                                    }}
                                                />
                                            </Avatar>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '20%',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
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
                                                        backgroundColor:
                                                            'black',
                                                    }}
                                                />
                                            </Avatar>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '20%',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
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
                                                Everyone is given a $1000 budget
                                                of in-game money which must be
                                                spent before March 17th at 12:00
                                                PM (unspent funds are
                                                worthless).
                                            </Typography>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '20%',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                justifyContent: 'center',
                                                display: 'flex',
                                                marginTop: 30,
                                            }}
                                        >
                                            <Typography>
                                                Prices for all teams' stock is
                                                fixed at $1 per share. You can
                                                buy as much or as little stock
                                                of a team as you wish.
                                            </Typography>
                                        </div>{' '}
                                    </div>

                                    <div
                                        style={{
                                            width: '20%',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                justifyContent: 'center',
                                                display: 'flex',
                                                marginTop: 30,
                                            }}
                                        >
                                            <Typography>
                                                Points are rewarded whenever a
                                                team wins, excluding play-in
                                                games. The amount of points per
                                                win per share is equivalent to
                                                their seed number.
                                            </Typography>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '20%',
                                            marginLeft: 10,
                                            marginRight: 10,
                                        }}
                                    >
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
                                                accumulates the most points over
                                                the duration of the tournament.
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: 20 }}>
                                <Typography align="center">
                                    For example, let's say you own 10 shares of
                                    Team ABC (a #10 seed), and they win two
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
                            <Grid item xs={6}>
                                <div className="card">
                                    <section
                                        style={{
                                            overflow: 'scroll',
                                            height: '400px',
                                        }}
                                    >
                                        <Typography variant="h4" align="center">
                                            Leaderboard
                                        </Typography>
                                        <LeaderboardPage />
                                    </section>
                                </div>
                                <hr />
                                <div className="card">
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
                                            <CircularProgress
                                                size={30}
                                                align="center"
                                            />
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
                            <Grid item xs={6}>
                                <div className="card">
                                    <section
                                        style={{
                                            overflow: 'scroll',
                                            height: '400px',
                                        }}
                                    >
                                        <Typography variant="h4" align="center">
                                            Teams
                                        </Typography>

                                        <div id="market-overview">
                                            {this.props.data.loading ? (
                                                <CircularProgress
                                                    size={30}
                                                    align="center"
                                                />
                                            ) : (
                                                <CustomizedTables
                                                    headerRow={infoHeaderRow}
                                                    rows={getInfoRows(
                                                        this.props.data.stocks
                                                    )}
                                                ></CustomizedTables>
                                            )}
                                        </div>
                                    </section>
                                </div>

                                <hr />
                                <div className="card">
                                    <section>
                                        <Typography variant="h4" align="center">
                                            Upcoming Events
                                        </Typography>
                                    </section>
                                    <div style={liveFeedStyle}>
                                        <Typography align="center">
                                            <b>Selection Sunday</b> — March 13
                                            <br />
                                            <b>Round of 64</b> — March 17-18{' '}
                                            <br />
                                            <b>Round of 32</b>— March 19-20
                                            <br />
                                            <b>Sweet 16</b> — March 24-25
                                            <br />
                                            <b>Elite Eight</b> — March 26-27
                                            <br />
                                            <b>Final Four</b> — April 2
                                            <br />
                                            <b>NCAA Championship</b> — April 4
                                            <br />
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <img
                                    src="https://tm-market.web.app/nbabracket.jpg"
                                    width="100%"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                align="center"
                                style={{
                                    marginTop: 64,
                                    color: 'black',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    Please use{' '}
                                    <a href="https://github.com/trevormil/Fantasy-Sports-Stock-Market/issues">
                                        this link
                                    </a>{' '}
                                    to give any feedback. Or, you can
                                    <a href="mailto:trevormil@comcast.net">
                                        {' '}
                                        reach out via e-mail.
                                    </a>
                                </div>
                                <div>
                                    Note leaderboards, portfolio charts, and
                                    stock charts are updated once daily at 12:00
                                    EST. Point values will be updated weekly.
                                </div>
                                <br />
                                <div>
                                    Disclaimer: This web app was made for fun.
                                    It uses no real money, and no profit will be
                                    made from this web app.
                                </div>
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
