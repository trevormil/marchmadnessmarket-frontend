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
            <hr />
            <Typography variant="h4" align="center">
              <b>Thursday, March 18</b>
            </Typography>
            <Typography align="center">
              11) Drake vs 11) Wichita State
            </Typography>
            <Typography align="center">
              11) UCLA vs 11) Michigan State
            </Typography>
            <Typography align="center">
              16) Appalachian State vs 16) Norfolk State
            </Typography>
            <Typography align="center">
              16) Texas Southern vs 16) Mount St. Mary's
            </Typography>

            <Typography variant="h4" align="center">
              <b>Friday, March 19</b>
            </Typography>
            <Typography align="center">1) Baylor vs 16) Hartford</Typography>
            <Typography align="center">
              8) North Carolina vs 9) Wisconsin
            </Typography>
            <Typography align="center">5) Villanova vs 12) Winthrop</Typography>
            <Typography align="center">4) Purdue vs 13) North Texas</Typography>
            <Typography align="center">
              6) Texas Tech vs 11) Utah State
            </Typography>
            <Typography align="center">3) Arkansas vs 14) Colgate</Typography>
            <Typography align="center">
              7) Virginia Tech vs 10) Florida
            </Typography>
            <Typography align="center">
              2) Ohio State vs 15) Oral Roberts
            </Typography>
            <Typography align="center">1) Illinois vs 16) Drexel</Typography>
            <Typography align="center">
              8) Loyola Chicago vs 9) Georgia Tech
            </Typography>
            <Typography align="center">
              5) Tennessee vs 12) Oregon State
            </Typography>
            <Typography align="center">
              4) Oklahoma State vs 13) Liberty
            </Typography>
            <Typography align="center">
              6) San Diego State vs 11) Syracuse
            </Typography>
            <Typography align="center">
              3) West Virginia vs 14) Morehead State
            </Typography>
            <Typography align="center">7) Clemson vs 10) Rutgers</Typography>
            <Typography align="center">
              2) Houston vs 15) Cleveland State
            </Typography>
            <Typography variant="h4" align="center">
              <b>Saturday, March 20</b>
            </Typography>
            <Typography align="center">8) Oklahoma vs 9) Missouri</Typography>
            <Typography align="center">5) Creighton vs 12) UC Santa Barbara</Typography>
            <Typography align="center">4) Virginia vs 13) Ohio</Typography>
            <Typography align="center">3) Kansas vs 14) Eastern Washington</Typography>
            <Typography align="center">7) Oregon vs 10) VCU</Typography>
            <Typography align="center">2) Iowa vs 15) Grand Canyon</Typography>
            <Typography align="center">1) Michigan vs 16) TBD</Typography>
            <Typography align="center">8) LSU vs 9) St. Bonaventure</Typography>
            <Typography align="center">5) Colorado vs 12) Georgetown</Typography>
            <Typography align="center">4) Florida State vs 13) UNC Greensboro</Typography>
            <Typography align="center">6) BYU vs 11) TBD</Typography>
            <Typography align="center">3) Texas vs 14) Abilene Christian</Typography>
            <Typography align="center">7) UConn vs 10) Maryland</Typography>
            <Typography align="center">2) Alabama vs 15) Iona</Typography>
            <Typography align="center">6) USC vs 11) TBD</Typography>
            <Typography align="center">1) Gonzaga vs 16) TBD</Typography>
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
