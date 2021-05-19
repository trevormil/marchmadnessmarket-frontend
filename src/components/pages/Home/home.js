import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getStocks, getScores } from "../../../redux/actions/dataActions";
import { getUserData } from "../../../redux/actions/userActions";
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

import DaiToken from "../../../abis/DaiToken.json";
const styles = (theme) => ({
  ...theme.spreadThis,
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.props.getStocks([]);
    this.props.getScores([]);
  }

  async componentWillMount() {
    await this.loadBlockchainData();
    await this.props.getUserData();
  }
  async loadBlockchainData() {
    const web3 = window.web3;

    const networkId = await web3.eth.net.getId();

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(
        DaiToken.abi,
        daiTokenData.address
      );
      this.setState({ daiToken });
    } else {
      window.alert("DaiToken contract not deployed to detected network.");
    }

    this.setState({ loading: false });
  }

  claimTokens = () => {
    this.state.daiToken.methods
      .claimDaiTokens()
      .send({ from: this.props.user.address });
  };

  render() {
    const { classes } = this.props;
    const marketOverviewStyle = {
      height:
        !this.props.scoreData ||
        this.props.scoreData.loading ||
        !this.props.scoreData.scores[0]
          ? "650px"
          : "900px",
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
          </Grid>
          <Grid item xs={12}>
            {this.props.user.claimed ? (
              <></>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  align="center"
                  fullWidth
                  onClick={this.claimTokens}
                >
                  It sems you haven't claimed your tokens yet. Claim Here
                </Button>
              </>
            )}

            <hr />
          </Grid>
          {/*<Typography align="center">
              <b>
                <a href="https://docs.google.com/document/d/1X8OCk9LHit_Dyey43wTqn5K2yMt5vWl9U590cqHQWJw/edit?usp=sharing">
                  https://docs.google.com/document/d/1X8OCk9LHit_Dyey43wTqn5K2yMt5vWl9U590cqHQWJw/edit?usp=sharing
                </a>
              </b>
            </Typography>*/}
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
                <b>Market:</b> Browse all the current stocks up for sale!
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
                <b>Rules:</b> New? Check out the rules to learn how to play the
                game!
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
                <b>Play In Tournament</b> — May 18 to May 21
                <br />
                <b>NBA Playoffs Begin</b> — May 22 <br />
                <b>NBA Draft Combine</b>— June 21 - June 27
                <br />
                <b>NBA Draft Lottery</b> — June 22
                <br />
                <b>NBA Playoffs End</b> — July 22
                <br />
                <b>NBA Draft</b> — July 29
                <br />
              </Typography>
            </div>
            <hr />
            <iframe
              src="https://feed.mikle.com/widget/v2/143829/?preloader-text=Loading"
              height="299px"
              width="100%"
              class="fw-iframe"
              scrolling="no"
              frameborder="0"
              title="newsfeed"
            ></iframe>
          </Grid>
          <Grid item xs={6}>
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Account Details
                </Typography>
              </section>
              <div>
                <Typography align="center">
                  <b>Account Address</b> — {this.props.user.address}
                  <br />
                  <b>Dai Token Balance</b> — {this.props.user.daiTokenBalance}{" "}
                  <br />
                  <b>Dai Token Staked</b> — {this.props.user.stakingBalance}{" "}
                  <br />
                  <b>Dapp Token Balance</b>— {this.props.user.dappTokenBalance}{" "}
                  <br />
                </Typography>
              </div>
            </div>
            <hr />
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
  getUserData,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(HomePage));
