import React, { Component } from 'react';
import { Avatar, Container, Grid, Typography } from '@mui/material';
import {
    EmojiEventsRounded,
    MonetizationOnRounded,
    ShowChartRounded,
    SportsBasketballRounded,
} from '@mui/icons-material';

class Rules extends Component {
    render() {
        return (
            <>
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
                                        Rules
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
                                        March 16th at 12:00 PM (unspent funds
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
                                        The $1000 enables you to purchase stock
                                        in teams. You can allocate your $1000
                                        however you would like.
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
                                        You earn points whenever a team that you
                                        own wins. The amount of points awarded
                                        per win is equal to the team's seed
                                        multiplied by the dollar amount that you
                                        purchased.
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
                                        The winner is whoever earns the most
                                        points over the duration of the
                                        tournament!
                                    </Typography>
                                </div>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                style={{ marginTop: 20, paddingBottom: 30 }}
                            >
                                <Typography align="center">
                                    For example, if you own $5 of a 10 seed who
                                    wins 2 games in the tournament, you will be
                                    awarded 100 points ($5 x 10 seed x 2 wins).
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </>
        );
    }
}

export default Rules;
