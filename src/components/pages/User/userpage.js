import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
//UI
import { withStyles, Typography, Container } from "@material-ui/core";

import CustomizedTables from "../../ui/StockInfoTable/stockTable";
import { getHeaderRow, getRows } from "./userrows";
import { StyledTableCell } from "../../ui/StockInfoTable/styledTableComponents";
import { getOtherUserStocks } from "../../../redux/actions/dataActions";
//Table Components
const styles = (theme) => ({
  ...theme.spreadThis,
});

const waitForURLUpdate = () => {
  let splitPathName = window.location.pathname.split("/");

  while (splitPathName[splitPathName.length - 2] !== "users") {
    splitPathName = window.location.pathname.split("/");
  }
  let str = window.location.pathname.split("/").pop();
  str = str.replace("%20", " ");
  return str;
};

class UserPage extends Component {
  state = {
    userId: waitForURLUpdate(),
  };
  constructor(props) {
    super(props);
    this.props.getOtherUserStocks(this.state.userId);
  }
  render() {
    const { classes } = this.props;
    const userJSON = this.props.user.leaderboard.filter(
      (element) => element.userName === this.state.userId
    );
    let stockDisplay = !this.props.otherUserStocks.loading ? (
      getRows(this.props.otherUserStocks.stocks)
    ) : (
      <StyledTableCell>Loading.....</StyledTableCell>
    );
    return (
      <div className="screener">
        <Container maxWidth="lg">
          <div className={classes.root}>
            <Typography
              variant="h2"
              className={classes.pageTitle}
              align="center"
            >
              {this.state.userId ? this.state.userId : "Loading...."}
            </Typography>
            <Typography
              variant="h5"
              className={classes.pageTitle}
              align="center"
            >
              Total Account Value:{" "}
              {userJSON[0] ? userJSON[0]["totalAccountValue"] : "Loading..."}
            </Typography>

            <Typography
              variant="h5"
              className={classes.pageTitle}
              align="center"
            >
              Remaining Cash:{" "}
              {userJSON[0] ? userJSON[0]["accountBalance"] : "Loading..."}
            </Typography>
            <hr />
          </div>
        </Container>

        <Container maxWidth="sm">
          <Typography variant="h2" className={classes.pageTitle} align="center">
            {}
          </Typography>
          <div className="card">
            <CustomizedTables rows={stockDisplay} headerRow={getHeaderRow()} />
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
  data: state.data,
  otherUserStocks: state.otherUserStocks,
});

const mapActionsToProps = {
  getOtherUserStocks,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(UserPage));
