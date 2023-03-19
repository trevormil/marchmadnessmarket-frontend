import withStyles from '@mui/styles/withStyles';
import React, { Component } from 'react';

import { Container, Grid, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { getScores, getStocks } from '../../../redux/actions/dataActions';
import Scores from '../Scores/scores';
import Schedule from '../Schedule/schedule';
import { BRACKET_IMG_PATH } from '../../../constants/constants';
const styles = (theme) => ({
    ...theme.spreadThis,
});

class BracketPage extends Component {
    constructor(props) {
        super(props);
        this.props.getStocks(this.props.data, []);
    }

    render() {
        const { classes } = this.props;
        return (
            <div
                style={{
                    width: '100%',
                    background: `linear-gradient(#000000, #1976d2) fixed`,
                    color: 'white',
                    minHeight: '1000px',
                    paddingBottom: 20,
                }}
            >
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    className={classes.pageTitle}
                                    align="center"
                                >
                                    Bracket
                                </Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <img
                                src={BRACKET_IMG_PATH}
                                width="100%"
                                alt="Bracket"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Scores />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Schedule />
                        </Grid>
                    </Grid>
                </Container>
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
const mapActionsToProps = { getStocks, getScores };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(BracketPage));
