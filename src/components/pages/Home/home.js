import { Container, Grid, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScores, getStocks } from '../../../redux/actions/dataActions';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import {
    StyledTableCell,
    StyledTableRow,
} from '../../ui/StockInfoTable/styledTableComponents';
import LeaderboardPage from '../Leaderboard/leaderboardPage';
import Rules from '../Rules/rules';
import { getInfoHeaderRow, getInfoRows } from './homerows';
import StockModal from '../Stock/stockModal';
import Scores from '../Scores/scores';
import Schedule from '../Schedule/schedule';
import { BRACKET_IMG_PATH } from '../../../constants/constants';

const styles = (theme) => ({
    ...theme.spreadThis,
});

export const overviewBoxStyles = {
    height: '300px',
    backgroundColor: 'whitesmoke',
    color: 'black',
    overflow: 'scroll',
};

class HomePage extends Component {
    state = {
        mobile: !window.matchMedia('(min-width: 1000px)').matches,
        openModalStockId: '',
    };

    constructor(props) {
        super(props);
        this.props.getStocks(this.props.data, []);
        this.setStockIdForModal = this.setStockIdForModal.bind(this);
    }

    setStockIdForModal(stockId) {
        this.setState({ openModalStockId: stockId });
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <StockModal
                    stockId={this.state.openModalStockId}
                    onClose={() => {
                        this.setStockIdForModal('');
                    }}
                />
                <div
                    style={{
                        height: '700px',
                        width: '100%',
                        background: `linear-gradient(#000000, #1976d2) fixed`,
                    }}
                >
                    <div
                        style={{
                            height: '700px',
                            width: '100%',
                            backgroundImage: `url("mmm-logo.jpg")`,
                            backgroundSize: '700px',
                            // backgroundRepeat: 'space repeat',
                            color: 'white',
                            backgroundBlendMode: 'multiply',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                height: '100%',
                                // alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Container>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h2"
                                            className={classes.pageTitle}
                                            align="center"
                                            style={{ paddingTop: 25 }}
                                        >
                                            Welcome!
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </div>
                </div>

                <Rules />

                <div
                    style={{
                        width: '100%',
                        background: `linear-gradient(#000000, #1976d2) fixed`,
                        color: 'white',
                        paddingBottom: 20,
                    }}
                >
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        paddingTop: '32px',
                                    }}
                                >
                                    <Typography variant="h3" align="center">
                                        Overview
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="card">
                                    <section
                                        style={{
                                            overflow: 'auto',
                                            height: '400px',
                                        }}
                                    >
                                        <Typography variant="h4" align="center">
                                            Leaderboard
                                        </Typography>
                                        <div
                                            style={{
                                                backgroundColor: 'whitesmoke',
                                            }}
                                        >
                                            <LeaderboardPage
                                                mobile={this.state.mobile}
                                                homePage={true}
                                            />
                                        </div>
                                    </section>
                                </div>
                                <Scores />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="card">
                                    <section
                                        style={{
                                            overflow: 'auto',
                                            height: '400px',
                                        }}
                                    >
                                        <Typography variant="h4" align="center">
                                            Teams
                                        </Typography>

                                        <div id="market-overview">
                                            {this.props.data.loading ? (
                                                <CustomizedTables
                                                    headerRow={getInfoHeaderRow(
                                                        this.state.mobile
                                                    )}
                                                    rows={
                                                        <StyledTableRow>
                                                            <StyledTableCell>
                                                                Loading...
                                                            </StyledTableCell>
                                                            <StyledTableCell></StyledTableCell>
                                                            <StyledTableCell></StyledTableCell>
                                                            <StyledTableCell></StyledTableCell>
                                                        </StyledTableRow>
                                                    }
                                                ></CustomizedTables>
                                            ) : (
                                                <CustomizedTables
                                                    headerRow={getInfoHeaderRow(
                                                        this.state.mobile
                                                    )}
                                                    rows={getInfoRows(
                                                        this.props.data.stocks,
                                                        this.state.mobile,
                                                        this.setStockIdForModal
                                                    )}
                                                ></CustomizedTables>
                                            )}
                                        </div>
                                    </section>
                                </div>

                                <Schedule />
                            </Grid>
                            <Grid item xs={12}>
                                <img
                                    src={BRACKET_IMG_PATH}
                                    width="100%"
                                    alt="Bracket"
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </>
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
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(HomePage));
