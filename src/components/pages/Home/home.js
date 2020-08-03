import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { Grid, Typography, Container, } from '@material-ui/core';
const styles = (theme) => ({
  ...theme.spreadThis
});

class HomePage extends Component {

  render() {
    const { classes } = this.props;
    return (< Container maxWidth="lg" >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.pageTitle} align="center">
            Welcome!  </Typography>
          <hr />
          <Typography align="center">
            Note that some features are restricted to those who are signed in. So if you aren't signed in, sign in to gain access to these features!
          </Typography>
          <hr />
          <Typography align="center">
            Different Pages:
                        </Typography>
          <Typography align="center">
            Screener: Browse all stocks to find your next purchase!
                    </Typography>
          <Typography align="center">
            Portfolio: See your current account balance, stocks owned, recent transactions, and more!
                    </Typography>
          <Typography align="center">
            Leaderboards: View where your rank compared to everyone else!
                    </Typography>
          <Typography align="center">
            Rules: Check out the rules to learn how to play the game!
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(HomePage));
