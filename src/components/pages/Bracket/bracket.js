import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { Grid, Typography, Container } from "@material-ui/core";
const styles = (theme) => ({
  ...theme.spreadThis,
});

class BracketPage extends Component {
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
              Bracket
            </Typography>
            <Typography
              variant="h4"
              className={classes.pageTitle}
              align="center"
            >
              <b>TBD</b>
            </Typography>
            {/*<img width="100%" src={"./brackettemp.webp"} alt="Team Logo" />*/}
            <hr />
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
)(withStyles(styles)(BracketPage));
