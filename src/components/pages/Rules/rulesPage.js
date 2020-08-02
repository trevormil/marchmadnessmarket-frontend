import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { Grid, Typography, Container, } from '@material-ui/core';
const styles = (theme) => ({
    ...theme.spreadThis
});

class RulesPage extends Component {

    render() {
        const { classes } = this.props;
        return (< Container maxWidth="lg" >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2" className={classes.pageTitle} align="center">
                        Rules  </Typography>
                    <hr />
                    <Typography align="center">
                        Everyone is given $500 when they first sign up, and they will be granted 10 shares of each stock bought at $3/share (for portfolio purposes).
                    </Typography>
                    <Typography align="center">
                        The average points per share for a 30 team league is about 2.5-3 points, so that is where the $3 per share came from.
                    </Typography>
                    <Typography align="center">
                        The objective of the game is to get as many points as possible when the season concludes.
                    </Typography>
                    <hr />
                    <Typography align="center">
                        Points per share are awarded as follows:
                        </Typography>
                    <Typography align="center">
                        0 points - 10 teams with worst regular season record
                    </Typography>
                    <Typography align="center">
                        1 point - Every dollar in your account balance is worth one point.
                    </Typography>
                    <Typography align="center">
                        2 points - Teams that don't make the playoffs but are not in bottom 10
                    </Typography>
                    <Typography align="center">
                        4 Points - Teams that make the playoffs but lose before the semi finals.
                    </Typography>
                    <Typography align="center">
                        6 Points - Teams that lose in the semi finals
                    </Typography>
                    <Typography align="center">
                        8 Points - Team that loses in championship.
                    </Typography>
                    <Typography align="center">
                        10 Points - Team that wins the championship.
                    </Typography>
                    <hr />
                    <Typography align="center">
                        Note the following:
                    </Typography>
                    <Typography align="center">
                        This app uses Google's account authentication, and it will sign you out after an hour.
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12} align="center">

                </Grid>
            </Grid>
        </Container >);
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data
});
const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(RulesPage));
