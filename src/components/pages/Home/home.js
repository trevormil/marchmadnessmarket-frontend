import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getStocks, getScores } from "../../../redux/actions/dataActions";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { infoHeaderRow, getInfoRows } from "./homerows";
import CustomizedTables from "../../ui/StockInfoTable/stockTable";

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
      height:
        !this.props.scoreData ||
        this.props.scoreData.loading ||
        !this.props.scoreData.scores[0]
          ? "820px"
          : "1070px",
    };
    const liveFeedStyle = {
      height:
        !this.props.scoreData ||
        this.props.scoreData.loading ||
        !this.props.scoreData.scores[0]
          ? "50px"
          : "300px",
    };
    return (
      <Container>
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
                  <Button
                    variant="contained"
                    color="primary"
                    href="./signin"
                    align="right"
                  >
                    Sign in here to gain access to all features!
                  </Button>
                </Typography>
                <hr />
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Overview of Pages:
                </Typography>
              </section>

              <Typography align="center">
                <b>Screener:</b> Browse all stocks to find your next purchase!
              </Typography>
              <Typography align="center">
                <b>Portfolio:</b> See your current account balance, stocks
                owned, recent transactions, and more!
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
            </div>
            <hr />
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Scores:
                </Typography>
              </section>
              <div id="livescorefeed" style={liveFeedStyle}>
                {this.props.scoreData.loading ? (
                  <CircularProgress size={30} align="center" />
                ) : this.props.scoreData.scores === "undefined" ||
                  !this.props.scoreData.scores[0] ? (
                  <Typography variant="h5" align="center">
                    No Current Games
                  </Typography>
                ) : (
                  this.props.scoreData.scores.map((game) => {
                    return (
                      <div display="flexbox" key={game.name}>
                        <h3 align="center">{game.name}</h3>

                        <h1 align="center">
                          <img
                            height="50px"
                            width="50px"
                            margin="30px"
                            src={game.score[1].logo}
                            alt="Team Logo"
                          />
                          {game.score[1].score} - {game.score[0].score}
                          <img
                            height="50px"
                            width="50px"
                            src={game.score[0].logo}
                            alt="Team Logo"
                          />
                        </h1>

                        <hr />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <hr />
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Upcoming Events:
                </Typography>
              </section>
              {/*
              <Typography align="center">
                <b>NFL Season 1 Ends: </b> March 16, 2021
                <br />
                <b>March Madness Season 1 Begins: </b> March 17, 2021
                <br></br>
                <b>March Madness Season 1 Ends: </b> April 5, 2021<br></br>
                <b>EURO 2021 Season 1 Begins: </b> June 10, 2021
                <br></br>
                <b>EURO 2021 Season 1 Ends: </b> July 12, 2021<br></br>
                <b>NFL Season 2 Begins: </b> September 8, 2021
                <br></br>
              </Typography>*/}
              <Typography align="center">
                <b>Selection Sunday</b> — Sunday, March 14
                <br />
                <b>First Four</b> — Thursday, March 18 <br />
                <b>First round</b> — Friday, March 19 to Saturday, March 20
                <br />
                <b>Second round</b>— Sunday, March 21 to Monday, March 22
                <br />
                <b>Sweet 16</b> — Saturday, March 27 to Sunday, March 28
                <br /> <b>Elite Eight</b> — Monday, March 29, to Tuesday, March
                30
                <br /> <b>Final Four</b> — Saturday, April 3
                <br />
                <b> NCAA championship game</b> — Monday, April 5
              </Typography>
            </div>
            <hr />
            <iframe
              src="https://feed.mikle.com/widget/v2/143829/?preloader-text=Loading"
              height="299px"
              width="100%"
              className="fw-iframe"
              scrolling="no"
              frameBorder="0"
              title="newsfeed"
            ></iframe>
          </Grid>
          <Grid item xs={6}>
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Market Overview
                </Typography>
                <Typography variant="h6" align="center">
                  For more in depth stats and filters, go to{" "}
                  <a href="./browse">Screener</a>.
                </Typography>
              </section>

              <div id="market-overview" style={marketOverviewStyle}>
                {this.props.data.loading ? (
                  <CircularProgress size={30} align="center" />
                ) : (
                  <CustomizedTables
                    headerRow={infoHeaderRow}
                    rows={getInfoRows(this.props.data.stocks)}
                  ></CustomizedTables>
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} align="center">
            <hr />
            <Typography align="center">
              Please use the following link to give feedback on issues,
              suggestions, or advice. All feedback is appreciated!
            </Typography>
            <Typography align="center">
              <a href="https://github.com/trevormil/Fantasy-Sports-Stock-Market/issues">
                https://github.com/trevormil/Fantasy-Sports-Stock-Market/issues
              </a>
            </Typography>
            <hr />
            <Typography align="center">Note the following:</Typography>
            <Typography align="center">
              This app uses Google's account authentication, and it will sign
              you out after an hour.
            </Typography>
          </Grid>
        </Grid>
      </Container>
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
