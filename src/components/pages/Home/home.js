import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getStocks } from "../../../redux/actions/dataActions";
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
  }
  render() {
    const { classes } = this.props;
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
                  Upcoming Events:
                </Typography>
              </section>
              <Typography align="center">
                <b>Franchise & Transition Tag Deadline</b> March 9, 2021
                <br />
                <b>League Year Begins and Free Agency:</b> March 17, 2021
                <br></br>
                <b>NFL Draft:</b> April 29, 2021 to May 1, 2021<br></br>
                <b>Season Start:</b> September 9, 2021
              </Typography>
            </div>
            <hr />
            <iframe
              title="newsfeed"
              src="https://feed.mikle.com/widget/v2/143757/?preloader-text=Loading"
              height="364px"
              width="100%"
              className="fw-iframe"
              scrolling="no"
              frameBorder="0"
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

              <div id="market-overview">
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
});
const mapActionsToProps = {
  getStocks,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(HomePage));
