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

import axios from "axios";
const styles = (theme) => ({
  ...theme.spreadThis,
});

class NFTMarketPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container maxWidth="lg">
        <iframe
          src="https://testnets.opensea.io/collection/kryptokits-3xxddbgjgs?embed=true"
          height="900px"
          width="100%"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </Container>
    );
  }
}

NFTMarketPage.propTypes = {
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
)(withStyles(styles)(NFTMarketPage));
