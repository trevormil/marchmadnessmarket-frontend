import React, { Component } from 'react';
import withStyles from '@mui/styles/withStyles';

import { connect } from 'react-redux';
import { Grid, Typography, Container } from '@mui/material';
const styles = (theme) => ({
    ...theme.spreadThis,
});

class RulesPage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h2"
                            className={classes.pageTitle}
                            align="center"
                        >
                            Rules{' '}
                        </Typography>
                        <hr />

                        <Typography>
                            1) Everyone is given a $1000 budget which must be
                            spent before March 17th at 12:00 PM (unspent funds
                            are worthless).
                        </Typography>
                        <Typography>
                            2) Prices for all teams stock is fixed at $1 per
                            share. You can buy as much or as little stock of a
                            team as you wish.
                        </Typography>
                        <Typography>
                            3) Points are rewarded when a team wins a game in
                            the NCAA March Madness tournament. The amount of
                            points per win per share is equivalent to their seed
                            number.
                        </Typography>

                        <Typography>
                            &emsp;&emsp;-For example, let's say you own 10
                            shares of Team ABC (a #10 seed), and they win two
                            games. You will receive 200 points (10 shares x 10
                            seed x 2 games).
                        </Typography>
                        <Typography>
                            &emsp;&emsp;-Play-in games do not count for points.
                        </Typography>

                        <Typography>
                            4) The winner will be the one who accumulates the
                            most points over the duration of the tournament.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12}></Grid>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data,
});
const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(RulesPage));
