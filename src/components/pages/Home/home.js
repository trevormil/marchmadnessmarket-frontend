import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { Grid, Typography, Container } from "@material-ui/core";
const styles = (theme) => ({
  ...theme.spreadThis,
});

class HomePage extends Component {
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
              Welcome to the Fantasy Stock Market!
            </Typography>
            <hr />
            {!this.props.user.authenticated && (
              <div>
                <Typography align="center">
                  Sign in to gain access to all features!
                </Typography>
                <hr />
              </div>
            )}

            <Typography variant="h4" align="center">
              Overview of Different Pages:
            </Typography>
            <Typography align="center">
              <b>Screener:</b> Browse all stocks to find your next purchase!
            </Typography>
            <Typography align="center">
              <b>Portfolio:</b> See your current account balance, stocks owned,
              recent transactions, and more!
            </Typography>
            <Typography align="center">
              <b>Leaderboards</b>: View where you rank compared to everyone
              else!
            </Typography>
            <Typography align="center">
              <b>Rules:</b> Check out the rules to learn how to play the game!
            </Typography>
            <Typography align="center">
              To navigate, use the bar on the top of the page.
            </Typography>
            <hr />
            <Typography align="center">Note the following:</Typography>
            <Typography align="center">
              This app uses Google's account authentication, and it will sign
              you out after an hour.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} align="center"></Grid>

          
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
)(withStyles(styles)(HomePage));
