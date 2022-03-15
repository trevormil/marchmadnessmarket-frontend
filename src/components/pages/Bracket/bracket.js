import React, { Component } from 'react';
import withStyles from '@mui/styles/withStyles';

import { connect } from 'react-redux';
import { Grid, Typography, Container, CircularProgress } from '@mui/material';

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
                            <img src="bracket2022.png" width="100%" />
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
                                        <CircularProgress
                                            size={30}
                                            align="center"
                                        />
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
                                        <b>First Four — Tuesday, March 15</b>{' '}
                                        <br />
                                        No. 16 Texas Southern vs. No. 16 Texas
                                        A&M-Corpus Christi 6:40 p.m.
                                        <br />
                                        No. 12 Wyoming vs. No. 12 Indiana 9:10
                                        p.m.
                                        <br />
                                        <br />
                                        <b>
                                            First Four — Wednesday, March 16
                                        </b>{' '}
                                        <br />
                                        No. 16 Wright State vs. No. 16 Bryant
                                        6:40 p.m. truTV <br /> No. 11 Rutgers
                                        vs. No. 11 Notre Dame 9:10 p.m. truTV
                                        <br />
                                        <br />
                                        <b>First Round — Thursday, March 17</b>
                                        <br />
                                        No. 6 Colorado State vs. No. 11 Michigan
                                        12:15 p.m. CBS
                                        <br />
                                        No. 4 Providence vs. No. 13 South Dakota
                                        State 12:40 p.m. truTV <br />
                                        No. 8 Boise State vs. No. 9 Memphis 1:45
                                        p.m. TNT <br />
                                        No. 1 Baylor vs. No. 16 Norfolk State 2
                                        p.m. TBS <br /> No. 3 Tennessee vs. No.
                                        14 Longwood 2:45 p.m. CBS <br />
                                        No. 5 Iowa vs. No. 12 Richmond 3:10 p.m.
                                        truTV <br /> No. 1 Gonzaga vs. No. 16
                                        Georgia State 4:15 p.m. TNT
                                        <br /> No. 8 North Carolina vs. No. 9
                                        Marquette 4:30 p.m. TBS <br />
                                        No. 5 UConn vs. No. 12 New Mexico State
                                        6:50 p.m. TNT <br />
                                        No. 2 Kentucky vs. No. 15 Saint Peter's
                                        7:10 p.m. CBS <br />
                                        No. 5 Saint Mary's (CA) vs. No. 12 TBD
                                        7:20 p.m. TBS <br /> No. 8 San Diego
                                        State vs. No. 9 Creighton 7:27 p.m.
                                        truTV <br /> No. 4 Arkansas vs. No. 13
                                        Vermont 9:20 p.m. TNT
                                        <br /> No. 7 Murray State vs. No. 10 San
                                        Francisco 9:40 p.m. CBS
                                        <br /> No. 4 UCLA vs. No. 13 Akron 9:50
                                        p.m. TBS <br /> No. 1 Kansas vs. No. 16
                                        TBD 9:57 p.m. truTV <br />
                                        <br />
                                        <b>First Round — Friday, March 18</b>
                                        <br /> No. 7 Ohio State vs. No. 10
                                        Loyola Chicago 12:15 p.m. CBS
                                        <br /> No. 2 Auburn vs. No. 15
                                        Jacksonville State 12:40 p.m. truTV
                                        <br /> No. 3 Texas Tech vs. No. 14
                                        Montana State 1:45 p.m. TNT <br />
                                        No. 3 Purdue vs. No. 14 Yale 2 p.m. TBS{' '}
                                        <br /> No. 2 Villanova vs. No. 15
                                        Delaware 2:45 p.m. CBS
                                        <br />
                                        No. 7 Southern California vs. No. 10
                                        Miami (Fla.) 3:10 p.m. truTV
                                        <br /> No. 6 Alabama vs. No. 11 TBD 4:15
                                        p.m. TNT <br /> No. 6 Texas vs. No. 11
                                        Virginia Tech 4:30 p.m. TBS
                                        <br />
                                        No. 4 Illinois vs. No. 13 Chattanooga
                                        6:50 p.m. TNT
                                        <br /> No. 2 Duke vs. Cal State
                                        Fullerton 7:10 p.m. CBS
                                        <br /> No. 6 LSU vs. No. 11 Iowa State
                                        7:20 p.m. TBS <br /> No. 1 Arizona vs.
                                        No. 16 TBD 7:27 p.m. truTV <br /> No. 5
                                        Houston vs. No. 12 UAB 9:20 p.m. TNT{' '}
                                        <br /> No. 7 Michigan State vs. No. 10
                                        Davidson 9:40 p.m. CBS <br />
                                        No. 3 Wisconsin vs. No. 14 Colgate 9:50
                                        p.m. TBS <br />
                                        No. 8 Seton Hall vs. No. 9 TCU 9:57 p.m.
                                        truTV <br /> <br />
                                        <b>Sweet 16 and Elite Eight</b>
                                        <br />
                                        TBD - March 24 - 27 <br /> <br />
                                        <b>Final Four </b> <br />
                                        TBD - April 2<br />
                                        <br />
                                        <b>National Championship </b> <br />
                                        TBD - April 4
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
