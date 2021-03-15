import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { getTradesForCurrStock } from "../../../redux/actions/dataActions";
import {
  updateUserPortfolioData,
  setOwnedStocks,
} from "../../../redux/actions/userActions";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CustomizedTables from "../../ui/StockInfoTable/stockTable";
import { Grid, Typography, Container } from "@material-ui/core";
import { getAllTrades } from "../../../redux/actions/dataActions";
import { getOpenTradeDisplay, openTradeHeaderRow } from "./marketrows";

import axios from "axios";
const styles = (theme) => ({
  ...theme.spreadThis,
});

class MarketPage extends Component {
  constructor(props) {
    super(props);
    this.props.getAllTrades(this.props.data);
    this.attemptToBuy = this.attemptToBuy.bind(this);
  }
  attemptToBuy(event) {
    const tradeId = event.currentTarget.getAttribute("id");
    axios.put(`/trades/${tradeId}`).then(() => {
      this.props.getTradesForCurrStock(
        this.props.data,
        this.props.data.currStock.stockId
      );
      this.props.setOwnedStocks(this.props.user);
      this.props.updateUserPortfolioData(this.props.user);
      this.props.getAllTrades(this.props.data);
    });
  }
  render() {
    let openTradeDisplay = getOpenTradeDisplay(
      this.props.data.trades,
      this.props.user.loading || this.props.data.loading,
      this.attemptToBuy,
      this.props.user.accountBalance
    );
    console.log(this.props.data);
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
              Current Auctions
            </Typography>
            <hr />
            <Typography
              variant="h4"
              className={classes.pageTitle}
              align="center"
            >
              Account Balance: <MonetizationOnIcon align="center" />
              {this.props.user.accountBalance}
            </Typography>
            <hr />
            <div className="portfolio-card">
              <Typography
                variant="h4"
                className={classes.pageTitle}
                align="center"
              >
                Open Orders
              </Typography>
              <CustomizedTables
                headerRow={openTradeHeaderRow}
                rows={openTradeDisplay}
              ></CustomizedTables>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} align="center"></Grid>
        </Grid>
      </Container>
    );
  }
}

MarketPage.propTypes = {
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
  data: state.data,
});
const mapActionsToProps = {
  getAllTrades,
  updateUserPortfolioData,
  setOwnedStocks,
  getTradesForCurrStock,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(MarketPage));
