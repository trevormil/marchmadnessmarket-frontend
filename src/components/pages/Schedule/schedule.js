import { Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScores } from '../../../redux/actions/dataActions';
import { overviewBoxStyles } from '../Home/home';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class ScoresPage extends Component {
    render() {
        return (
            <div className="card" style={{ marginTop: 24 }}>
                <section>
                    <Typography variant="h4" align="center">
                        Rounds
                    </Typography>
                </section>
                <div style={overviewBoxStyles}>
                    <Typography align="center" style={{ padding: 5 }}>
                        <b>Round of 64 - March 16 - 17 </b>
                        <br />
                        <b>Round of 32 - March 17 - 18 </b>
                        <br />
                        <b>Sweet 16 - March 23 - 24 </b>
                        <br />
                        <b>Elite 8 - March 25 - 26 </b>
                        <br />
                        <b>Final Four - April 1 </b>
                        <br />
                        <b>Championship - April 3 </b>
                        <br />
                    </Typography>
                </div>
            </div>
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
