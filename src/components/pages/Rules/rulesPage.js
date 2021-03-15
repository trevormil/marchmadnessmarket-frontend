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
              Everyone is given 500 coins when they first sign up.
            </Typography>
            <Typography align="center">
              These are the only 500 coins you will be given, so spend them
              wisely.
            </Typography>
            <Typography align="center">
              You don't have to spend all coins before the first week, but
              stocks will get more expensive and scarcer as season goes along.
            </Typography>
            <Typography align="center">
              The objective of the game is to get as many <u>points</u> as
              possible when the season concludes,{" "}
              <u>not highest portfolio market value.</u>
            </Typography>
            <Typography align="center">
              Winning games is the only way a team can get points. The amount of
              points given is their seed number. 0 points are given for losses.
            </Typography>
            <Typography align="center">
              For example, if a #5 seed wins a game, they are awarded 5 points.
            </Typography>
            <Typography align="center">
              There also will be a 5 point bonus for the champions.
            </Typography>
            <Typography align="center"></Typography>
            <Typography align="center">
              Portfolio market value will give you an estimate of the current
              market price, but{" "}
              <u>
                the objective of the game is not portfolio market value, it is
                points.
              </u>
            </Typography>
            <hr />
            <Typography align="center">
              You can not buy stocks from Friday to Tuesday to keep it fair.
            </Typography>
            <Typography align="center">
              Every team's price is $1 at the start of the season. Each week,
              the price will update to double the number of points they have
              accumulated.
            </Typography>
            <Typography align="center">
              There are a couple ways that you can buy and sell stocks:{" "}
            </Typography>
            <Typography align="center">
              1) Every stock has a BIN (buy it now) price that you can instantly
              purchase any number of shares at. Think of this like buying it
              straight from the bank.
            </Typography>

            <Typography align="center">
              2) Any stock can be listed for auction by a seller, and once a
              buyer is found, the shares and balances are updated.
            </Typography>
            <Typography align="center">
              <b>
                Important note: If you sell a stock, you lose all points
                associated with that stock.
              </b>
            </Typography>

            <Typography align="center">
              <b>
                Similarly, if you buy a stock, you gain all points associated
                with that stock.
              </b>
            </Typography>
            <Typography align="center">
              <b>
                So if a team has 12 points per share, do not sell under $12 per
                share.
              </b>
            </Typography>
            <Typography align="center">
              <b>
                In other words, the owner of the stock at the end of the season
                gets all the points and any intermediate owners get no points at
                all.
              </b>
            </Typography>
            {/*<Typography align="center">
              3) You can also instantly sell any number of shares at half the
              value of the BIN price.
            </Typography><Typography align="center">
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
            </Typography>*/}

            <hr />
            <Typography align="center">Terms to know: </Typography>
            <Typography align="center">
              BIN ("Buy It Now") Price: Any amount can be bought instantly at
              this price{" "}
            </Typography>
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
              </Typography>*/}
            <hr />
            <Typography align="center">
              Note leaderboards, portfolio charts, and stock charts are updated
              once daily at 12:00 EST. Point values will be updated weekly.
            </Typography>
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
