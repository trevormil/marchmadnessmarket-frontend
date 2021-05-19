import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { Grid, Typography, Container } from "@material-ui/core";
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
              Rules{" "}
            </Typography>
            <hr />
            <Typography align="center">
              Note: This is a very new app, and it will have bugs. If you find a
              way to cheat or exploit bugs, please don't. Report them here at:{" "}
              <a href="https://github.com/trevormil/Fantasy-Sports-Stock-Market/issues">
                https://github.com/trevormil/Fantasy-Sports-Stock-Market/issues
              </a>
            </Typography>
            <hr />
            <Typography align="center">
              Everyone is given 100 tokens when they first sign up.
            </Typography>
            <Typography align="center">
              These are the only 100 coins you will be given, so take care of
              them.
            </Typography>
            <Typography align="center">
              The goal of the game is to get as many PointTokens as possible.
            </Typography>
            <Typography align="center">
              There are two ways to get PointTokens:
            </Typography>
            <Typography align="center">
              1) Stake your 100 initial tokens into the "team banks" and get
              rewarded in PointTokens when they do well
            </Typography>
            <Typography align="center">
              2) Purchase NFTs and get rewarded with PointTokens when the team
              does well (Rarer the NFT, the more PointTokens you will receive)
            </Typography>
            <Typography align="center">
              Official point tallies to be announced soon
            </Typography>

            <hr />
            <Typography align="center">Terms to know: </Typography>
            {/*
            <Typography align="center">
              Instant Sell Price: Any amount can be sold instantly at this price
              (half the BIN Price)
            </Typography>*/}
            <Typography align="center">
              Float: Total number of shares of a stock in circulation
            </Typography>

            {/*NFL 
              <Typography align="center">
                0 points - Bottom 10 teams in terms of regular season record
              </Typography>
              <Typography align="center">
                1 point - Every dollar in your account balance at the season end
                is worth one point.
              </Typography>
              <Typography align="center">
                2 points - Teams that don't make the playoffs but are not in
                bottom 10
              </Typography>
              <Typography align="center">
                4 Points - Teams that make the playoffs but lose in quarter
                finals or before.
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
              Note leaderboards, portfolio charts, and stock charts are updated
              once daily at 12:00 EST. Point values will be updated weekly.
            </Typography>*/}
            <hr />
            <Typography align="center">
              If you have any questions, please reach out to me via
              <a href="mailto:trevormil@comcast.net"> trevormil@comcast.net</a>
            </Typography>
            <hr />
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
)(withStyles(styles)(RulesPage));
