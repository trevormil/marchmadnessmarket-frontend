import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getScores } from "../../../redux/actions/dataActions";
import { connect } from "react-redux";
import { Grid, Typography, Container } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class ScoresPage extends Component {
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
              Schedule
            </Typography>

            <Typography variant="h4" align="center">
              <b>TBD </b>
            </Typography>

            <hr />
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
  getScores,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScoresPage));
