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
              Everyone is given 500 coins when they first sign up.
            </Typography>
            <Typography align="center">
              In addition, every week 100 coins will be added to everyone's
              account
            </Typography>
            <Typography align="center">
              The objective of the game is to get as many points as possible
              when the season concludes, not highest portfolio market value.
            </Typography>
            <Typography align="center">
              Portfolio market value will give you a good estimate of how you
              are performing, but points are determined by a team's performance
              in real life (see below).
            </Typography>
            <Typography align="center">
              Note leaderboards, portfolio charts, and stock charts are updated
              once daily at 12:00 EST. Point values will be updated weekly.
            </Typography>
            <hr />
            <Typography align="center">
              There are a couple ways that you can buy and sell stocks:{" "}
            </Typography>
            <Typography align="center">
              1) Every stock has a BIN (buy it now) price that you can instantly
              purchase any number of shares at.
            </Typography>
            <Typography align="center">
              2) You can also instantly sell any number of shares at half the
              value of the BIN price.
            </Typography>
            <Typography align="center">
              3) Any stock can be listed for auction by a seller, and once a
              buyer is found, the shares and balances are updated.
            </Typography>
            <Typography align="center">
              For every transaction that occurs, the BIN price and instant sell
              price gets updated slightly based on an algorithm.
            </Typography>
            <Typography align="center">
              Example: If a stock is being bought a lot at the BIN price or
              being sold for a high price on auction, the BIN price will
              automatically increase. Vice versa for being sold.
            </Typography>
            <Typography align="center">
              For calculations of price for the charts and portfolio market
              value, it uses the price that is halfway between the BIN price and
              the instant sell price.
            </Typography>
            <hr />
            <Typography align="center">
              Points per share are awarded as follows:
            </Typography>
            <Typography align="center">
              For every game that a team wins, they are awarded the number of
              points determined by their seed value.
            </Typography>
            <Typography align="center">5 point bonus for champions.</Typography>
            <Typography align="center">
              No points are given for a loss.
            </Typography>
            <Typography align="center">
              For example, if a #5 seed wins a game, they are awarded 5 points.
            </Typography>

            <Typography align="center">
              If a #10 seed wins a game, they are awarded 10 points.
            </Typography>

            <hr />
            <Typography align="center">Terms to know: </Typography>
            <Typography align="center">
              BIN ("Buy It Now") Price: Any amount can be bought instantly at
              this price{" "}
            </Typography>
            <Typography align="center">
              Instant Sell Price: Any amount can be sold instantly at this price
              (half the BIN Price)
            </Typography>
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
              </Typography>*/}
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
)(withStyles(styles)(RulesPage));
