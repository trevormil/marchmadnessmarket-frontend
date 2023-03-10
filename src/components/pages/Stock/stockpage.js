import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@mui/styles/withStyles';
import axios from 'axios';
import { getBuyTradeDisplay, getSellTradeDisplay } from './tradeDisplay';
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { setOwnedStocks } from '../../../redux/actions/userActions';
import { TabsList, Tab } from '../../ui/Navigation/tabs';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

import {
    getCurrStock,
    // getTradesForCurrStock,
} from '../../../redux/actions/dataActions';
import {
    Button,
    Typography,
    Grid,
    Container,
    CircularProgress,
} from '@mui/material';
import { createChart } from 'lightweight-charts';
import { BootstrapInput } from '../../ui/TextInputs/textInputs';
import { stockInfoHeaderRow, getInfoRows } from './stockInfoRows';

import { isInvalidDate } from '../../../helpers/validDates';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
    TOURNAMENT_NOT_STARTED,
    getQuadrant,
    getSide,
} from '../../../constants/constants';
import {
    InfoOutlined,
    SellOutlined,
    ShoppingCart,
    ShoppingCartOutlined,
} from '@mui/icons-material';
const styles = (theme) => ({
    ...theme.spreadThis,
});

const waitForURLUpdate = () => {
    let splitPathName = window.location.pathname.split('/');

    while (splitPathName[splitPathName.length - 2] !== 'stocks') {
        splitPathName = window.location.pathname.split('/');
    }
    return window.location.pathname.split('/').pop();
};

function getRoundName(roundNum) {
    switch (roundNum) {
        case 64:
            return 'Lose in First Round';
        case 32:
            return 'Lose in Second Round';
        case 16:
            return 'Lose in Sweet 16';
        case 8:
            return 'Lose in Elite 8';
        case 4:
            return 'Lose in Final Four';
        case 2:
            return 'Lose in Championship';
        case 1:
            return 'Win Championship';
        default:
            return 'Error';
    }
}

class StockPage extends Component {
    state = {
        // stockId: waitForURLUpdate(),
        numToSell: '',
        sellPrice: '',
        numToBuy: '',
        numToIPOSell: '',
        chart: null,
        buyIsLoading: false,
        currTab: 'quadrant',
    };

    constructor(props) {
        super(props);

        this.props.getCurrStock(
            this.props.data,
            this.props.data.filters,
            this.props.stockId
        );
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getNumSharesOwned = this.getNumSharesOwned.bind(this);
        this.attemptToBuy = this.attemptToBuy.bind(this);
        this.attemptToSell = this.attemptToSell.bind(this);
        this.attemptToIPOBuy = this.attemptToIPOBuy.bind(this);
    }

    getChartDisplay() {
        // const tradingViewChartElement =
        //     document.getElementById('tradingviewchart');
        // if (
        //     this.state.chart === null &&
        //     !this.props.data.loading &&
        //     tradingViewChartElement !== null
        // ) {
        //     tradingViewChartElement.innerHTML = null;
        //     const chart = createChart(tradingViewChartElement, {
        //         width: 600,
        //         height: 300,
        //     });
        //     const lineSeries = chart.addLineSeries();
        //     if (this.props.data.currStock.stockHistory !== null) {
        //         lineSeries.setData(this.props.data.currStock.stockHistory);
        //     }
        //     this.setState({
        //         chart: chart,
        //     });
        // }
    }

    getNumSharesOwned() {
        if (this.props.data.loading || this.props.user.loading)
            return 'Loading ...';
        else {
            const foundStock = this.props.user.ownedStocks.find(
                (stock) =>
                    stock.stockName ===
                    this.props.data.currStock.stockData.stockName
            );
            if (foundStock) return foundStock.numShares;
            else return 0;
        }
    }

    attemptToBuy = (event) => {
        // const tradeId = event.currentTarget.getAttribute('name');
        // axios.put(`/trades/${tradeId}`).then(() => {
        //     this.props.setOwnedStocks(this.props.user);
        //     this.props.getCurrStock(
        //         this.props.data,
        //         this.props.data.filters,
        //         this.props.stockId
        //     );
        // });
    };

    attemptToIPOBuy = async () => {
        this.setState({ buyIsLoading: true });
        await axios({
            method: 'put',
            url: `/stocks/${this.props.stockId}/buyIpo`,
            data: {
                numShares: Number(this.state.numToBuy),
            },
        }).then(async () => {
            this.setState({
                numToBuy: 0,
            });
            // document.getElementById('numToBuy').value = null;
            await this.props.setOwnedStocks(this.props.user);
            await this.props.getCurrStock(
                this.props.data,
                this.props.data.filters,
                this.props.stockId
            );
        });
        this.setState({ buyIsLoading: false });
    };

    attemptToIPOSell = () => {
        this.setState({ buyIsLoading: true });
        axios({
            method: 'put',
            url: `/stocks/${this.props.stockId}/sellIpo`,
            data: {
                numShares: Number(this.state.numToSell),
            },
        }).then(() => {
            this.setState({
                numToSell: 0,
            });
            // document.getElementById('numToIPOSell').value = null;
            this.props.setOwnedStocks(this.props.user);
            this.props.getCurrStock(
                this.props.data,
                this.props.data.filters,
                this.props.stockId
            );
            this.setState({ buyIsLoading: false });
        });
    };
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    attemptToRemove = (event) => {
        const tradeId = event.currentTarget.getAttribute('name');
        axios.delete(`/trades/${tradeId}`).then(() => {
            this.props.setOwnedStocks(this.props.user);
            this.props.getCurrStock(
                this.props.data,
                this.props.data.filters,
                this.props.stockId
            );
        });
    };
    attemptToSell = () => {
        if (!isNaN(this.state.numToSell) && !isNaN(this.state.sellPrice)) {
            axios({
                method: 'post',
                url: '/trades',
                data: {
                    stockId: this.props.stockId,
                    sharesPrice: Number(this.state.sellPrice),
                    sharesTraded: Number(this.state.numToSell),
                    buy: false,
                },
            }).then(() => {
                this.setState({
                    numToSell: null,
                    sellPrice: null,
                });
                document.getElementById('numToSell').value = null;
                document.getElementById('sellPrice').value = null;
                this.props.getTradesForCurrStock(
                    this.props.data,
                    this.props.stockId
                );
            });
        }
    };
    componentDidUpdate() {
        this.getChartDisplay();
    }

    tabsToShow = [
        {
            value: 'quadrant',
            label: 'Quadrant',
        },
        {
            value: 'side',
            label: 'Side',
        },
        {
            value: 'full',
            label: 'Full',
        },
    ];

    render() {
        const { classes } = this.props;

        const numSharesOwned = this.props.user.ownedStocks
            ? this.getNumSharesOwned()
            : 0;
        const filename = this.props.data.currStock.stockData.imageUrl;
        return (
            <div
                style={{
                    // width: '100%',
                    // background: `linear-gradient(#000000, #1976d2) fixed`,
                    color: 'white',
                    // minHeight: '1000px',
                    paddingBottom: 20,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h2"
                                className={classes.pageTitle}
                                align="center"
                            >
                                {this.props.data.loading ||
                                this.props.data.currStock.stockData === null ? (
                                    <CircularProgress size={30} />
                                ) : (
                                    this.props.data.currStock.stockData
                                        .stockName
                                )}

                                {this.props.data.loading ||
                                this.props.data.currStock.stockData === null ? (
                                    <></>
                                ) : (
                                    <img
                                        align="center"
                                        width="70px"
                                        height="70px"
                                        src={filename}
                                        alt="Team Logo"
                                        style={{
                                            marginLeft: 10,
                                            backgroundColor: 'whitesmoke',
                                            border: '5px solid black',
                                        }}
                                    />
                                )}
                            </Typography>

                            <Typography
                                variant="h4"
                                // className={classes.pageTitle}
                                align="center"
                            >
                                #
                                {this.props.data.loading ||
                                this.props.data.currStock.stockData === null ? (
                                    <CircularProgress size={30} />
                                ) : (
                                    this.props.data.currStock.stockData.seed
                                )}{' '}
                                Seed (
                                {this.props.data.loading ||
                                this.props.data.currStock.stockData === null ? (
                                    <CircularProgress size={30} />
                                ) : (
                                    this.props.data.currStock.stockData.bio
                                )}
                                )
                            </Typography>

                            {!TOURNAMENT_NOT_STARTED && (
                                <>
                                    <br />
                                    <Typography
                                        variant="h4"
                                        // className={classes.pageTitle}
                                        align="center"
                                    >
                                        {this.props.data.loading ||
                                        this.props.data.currStock.stockData ===
                                            null ? (
                                            <CircularProgress size={30} />
                                        ) : (
                                            this.props.data.currStock.stockData
                                                .currPoints
                                        )}{' '}
                                        Points (
                                        {this.props.data.loading ||
                                        this.props.data.currStock.stockData ===
                                            null ? (
                                            <CircularProgress size={30} />
                                        ) : (
                                            this.props.data.currStock.stockData
                                                .currPoints /
                                            this.props.data.currStock.stockData
                                                .seed
                                        )}{' '}
                                        Win
                                        {this.props.data.currStock.stockData
                                            .currPoints /
                                            this.props.data.currStock.stockData
                                                .seed !==
                                        1
                                            ? 's'
                                            : ''}
                                        )
                                    </Typography>
                                </>
                            )}
                        </Grid>
                        {this.props.user &&
                        this.props.user.authenticated &&
                        TOURNAMENT_NOT_STARTED ? (
                            <>
                                <Grid item sm={3} xs={1}></Grid>
                                <Grid item sm={6} xs={10} align="center">
                                    <div
                                        className="portfolio-card"
                                        style={{ margin: 4 }}
                                    >
                                        <section>
                                            <Typography
                                                variant="h4"
                                                align="center"
                                            >
                                                Buy / Sell
                                            </Typography>
                                        </section>
                                        <div
                                            style={{
                                                backgroundColor: 'whitesmoke',
                                                color: 'black',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {this.state.buyIsLoading ? (
                                                <CircularProgress size={30} />
                                            ) : (
                                                <>
                                                    <Typography
                                                        variant="h6"
                                                        align="center"
                                                    >
                                                        Shares Owned:{' '}
                                                        {numSharesOwned}
                                                    </Typography>
                                                    <Typography
                                                        variant="h6"
                                                        align="center"
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        Account Balance:{' '}
                                                        <MonetizationOnIcon />
                                                        {this.props.user
                                                            .loading ||
                                                        this.props.data.loading
                                                            ? 'Loading...'
                                                            : `${this.props.user.accountBalance.toFixed(
                                                                  2
                                                              )}`}
                                                    </Typography>
                                                </>
                                            )}
                                            <br />
                                            <div
                                                style={{
                                                    margin: 10,
                                                    justifyContent:
                                                        'space-between',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        flexDirection: 'column',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        width: '50%',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <SellOutlined /> Sell
                                                    </div>
                                                    <BootstrapInput
                                                        id="numToSell"
                                                        name="numToSell"
                                                        value={
                                                            this.state.numToSell
                                                        }
                                                        onChange={
                                                            this
                                                                .handleInputChange
                                                        }
                                                        placeholder="# Shares To Sell"
                                                        type="number"
                                                    ></BootstrapInput>
                                                    <Button
                                                        style={{
                                                            marginLeft: 10,
                                                        }}
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={
                                                            this
                                                                .attemptToIPOSell
                                                        }
                                                        disabled={
                                                            isInvalidDate() ||
                                                            this.props.data
                                                                .currStock
                                                                .stockData ===
                                                                null ||
                                                            this.state
                                                                .numToSell <=
                                                                0 ||
                                                            this.state
                                                                .numToSell ===
                                                                null ||
                                                            this.state
                                                                .numToSell >
                                                                numSharesOwned
                                                        }
                                                    >
                                                        Sell{' '}
                                                        {this.state.numToSell
                                                            ? this.state
                                                                  .numToSell
                                                            : 0}{' '}
                                                        at $
                                                        {this.props.data
                                                            .currStock
                                                            .stockData &&
                                                        this.props.data
                                                            .currStock.stockData
                                                            .ipoPrice
                                                            ? this.props.data.currStock.stockData.ipoPrice.toFixed(
                                                                  2
                                                              )
                                                            : '...'}{' '}
                                                        per share
                                                    </Button>
                                                </div>
                                                <div
                                                    style={{
                                                        flexDirection: 'column',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        width: '50%',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <ShoppingCartOutlined />{' '}
                                                        Buy
                                                    </div>

                                                    <BootstrapInput
                                                        id="numToBuy"
                                                        name="numToBuy"
                                                        value={
                                                            this.state.numToBuy
                                                        }
                                                        onChange={
                                                            this
                                                                .handleInputChange
                                                        }
                                                        placeholder="# Shares To Buy"
                                                        type="number"
                                                    ></BootstrapInput>
                                                    <Button
                                                        style={{
                                                            marginLeft: 10,
                                                        }}
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={
                                                            this.attemptToIPOBuy
                                                        }
                                                        disabled={
                                                            isInvalidDate() ||
                                                            this.props.data
                                                                .currStock
                                                                .stockData ===
                                                                null ||
                                                            this.state
                                                                .numToBuy <=
                                                                0 ||
                                                            this.state
                                                                .numToBuy ===
                                                                null ||
                                                            this.state
                                                                .numToBuy *
                                                                this.props.data
                                                                    .currStock
                                                                    .stockData
                                                                    .ipoPrice >
                                                                this.props.user
                                                                    .accountBalance
                                                        }
                                                    >
                                                        Buy{' '}
                                                        {this.state.numToBuy
                                                            ? this.state
                                                                  .numToBuy
                                                            : 0}{' '}
                                                        at $
                                                        {this.props.data
                                                            .currStock
                                                            .stockData &&
                                                        this.props.data
                                                            .currStock.stockData
                                                            .ipoPrice
                                                            ? this.props.data.currStock.stockData.ipoPrice.toFixed(
                                                                  2
                                                              )
                                                            : '...'}{' '}
                                                        per share
                                                    </Button>
                                                </div>
                                            </div>
                                            <hr />
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: 10,
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    <InfoOutlined />
                                                    The{' '}
                                                    {
                                                        this.props.data
                                                            .currStock.stockData
                                                            .stockName
                                                    }{' '}
                                                    are a #
                                                    {
                                                        this.props.data
                                                            .currStock.stockData
                                                            .seed
                                                    }{' '}
                                                    seed.
                                                </div>
                                                <br />
                                                <div>
                                                    Each share that you own will
                                                    earn you{' '}
                                                    {
                                                        this.props.data
                                                            .currStock.stockData
                                                            .seed
                                                    }{' '}
                                                    points per win.
                                                    {numSharesOwned > 0 &&
                                                        ' You currently own ' +
                                                            numSharesOwned +
                                                            ' shares.'}
                                                </div>
                                            </div>{' '}
                                            <div
                                                style={{
                                                    // display: 'flex',
                                                    // alignItems: 'center',
                                                    // justifyContent: 'center',
                                                    padding: 10,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: '45%',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <b>Wins</b>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '20%',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <b>Seed</b>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '25%',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <b>Shares Owned</b>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '20%',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <b>Total Points</b>
                                                    </div>
                                                </div>
                                                <br />
                                                {new Array(7)
                                                    .fill(0)
                                                    .map((x, i) => {
                                                        return (
                                                            <div
                                                                key={i}
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    justifyContent:
                                                                        'center',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        width: '45%',
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    {i} win
                                                                    {i !== 1 &&
                                                                        's'}{' '}
                                                                    (
                                                                    {getRoundName(
                                                                        64 /
                                                                            Math.pow(
                                                                                2,
                                                                                i
                                                                            )
                                                                    )}
                                                                    )
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        width: '20%',
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    {
                                                                        this
                                                                            .props
                                                                            .data
                                                                            .currStock
                                                                            .stockData
                                                                            .seed
                                                                    }
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        width: '25%',
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    {numSharesOwned
                                                                        ? numSharesOwned
                                                                        : 1}
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        width: '20%',
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    {(numSharesOwned
                                                                        ? numSharesOwned
                                                                        : 1) *
                                                                        i *
                                                                        this
                                                                            .props
                                                                            .data
                                                                            .currStock
                                                                            .stockData
                                                                            .seed}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                            {/* <br />
                                                <br />0 wins (Lose in Round of
                                                64) = 0 points per share
                                                <br />1 win (Lose in Round of
                                                32) ={' '}
                                                {this.props.data.currStock
                                                    .stockData.seed * 1}{' '}
                                                points
                                                <br />2 wins (Lose in Sweet 16)
                                                ={' '}
                                                {this.props.data.currStock
                                                    .stockData.seed * 2}{' '}
                                                points
                                                <br />3 wins (Lose in Elite 8) ={' '}
                                                {this.props.data.currStock
                                                    .stockData.seed * 3}{' '}
                                                points
                                                <br />4 wins (Lose in Final
                                                Four) ={' '}
                                                {this.props.data.currStock
                                                    .stockData.seed * 4}{' '}
                                                points
                                                <br />5 wins (Lose in
                                                Championship) ={' '}
                                                {this.props.data.currStock
                                                    .stockData.seed * 5}{' '}
                                                points
                                                <br />6 wins (Win Championship)
                                                ={' '}
                                                {this.props.data.currStock
                                                    .stockData.seed * 6}{' '}
                                                points
                                            </div>
                                            <br /> */}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item sm={3} xs={1}></Grid>
                            </>
                        ) : (
                            <Grid item xs={12}>
                                {this.props.user &&
                                TOURNAMENT_NOT_STARTED &&
                                !this.props.user.authenticated ? (
                                    <Typography align="center">
                                        Note: You must be logged in to buy stock
                                        in this team.
                                    </Typography>
                                ) : (
                                    <></>
                                    // <Typography align="center">
                                    //     To view more info about a team (and to
                                    //     buy), click on their name or logo below.
                                    // </Typography>
                                )}
                            </Grid>
                        )}
                        {/* <Grid item sm={3} xs={1}></Grid>
                        <Grid item sm={6} xs={10}>
                            <div className="portfolio-card">
                                <Typography
                                    variant="h4"
                                    className={classes.pageTitle}
                                    align="center"
                                >
                                    Team Info
                                </Typography>
                                {this.props.data.loading ? (
                                    <CircularProgress size={30} />
                                ) : (
                                    <CustomizedTables
                                        headerRow={stockInfoHeaderRow}
                                        rows={getInfoRows(
                                            this.props.data.currStock.stockData
                                        )}
                                    ></CustomizedTables>
                                )}
                            </div>
                        </Grid>
                        <Grid item sm={3} xs={1}></Grid> */}

                        <div
                            style={{
                                marginTop: 20,
                                display: 'flex',
                                textAlign: 'center',
                                verticalAlign: 'center',
                                alignItems: 'center',
                                color: 'white',
                                fontWeight: 'bolder',
                                fontSize: '1.25rem',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <TabsUnstyled
                                value={this.state.currTab}
                                defaultValue={this.state.currTab}
                            >
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <TabsList>
                                        <div
                                            style={{
                                                justifyContent: 'center',
                                                display: 'flex',
                                            }}
                                        >
                                            {this.tabsToShow.map((tab) => {
                                                return (
                                                    <Tab
                                                        onClick={(event) => {
                                                            this.setState({
                                                                currTab:
                                                                    tab.value,
                                                            });
                                                        }}
                                                        value={tab.value}
                                                        key={tab.label}
                                                    >
                                                        <div
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                                verticalAlign:
                                                                    'center',
                                                            }}
                                                        >
                                                            {tab.label}
                                                        </div>
                                                    </Tab>
                                                );
                                            })}
                                        </div>
                                    </TabsList>
                                </div>
                            </TabsUnstyled>
                        </div>

                        <Grid item xs={this.state.currTab !== 'full' ? 2 : 0} />
                        <Grid item xs={this.state.currTab !== 'full' ? 8 : 12}>
                            <img
                                src={
                                    this.state.currTab === 'quadrant'
                                        ? getQuadrant(
                                              this.props.data.currStock
                                                  .stockData.stockName
                                          )
                                        : this.state.currTab === 'side'
                                        ? getSide(
                                              this.props.data.currStock
                                                  .stockData.stockName
                                          )
                                        : '/bracket2022final.jpg'
                                }
                                width="100%"
                            />
                        </Grid>
                        <Grid item xs={this.state.currTab !== 'full' ? 2 : 0} />

                        {/* 
          <Grid item xs={12}>
            <hr />
          </Grid>
          <Grid item xs={6}>
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Current Sellers
                </Typography>
              </section>

              {buyTradeDisplay}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="card">
              <section>
                <Typography variant="h4" align="center">
                  Your Sell Orders
                </Typography>
              </section>
              {sellTradeDisplay}
            </div>
</Grid> */}
                    </Grid>
                </Container>
            </div>
        );
    }
}

StockPage.propTypes = {
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
    setOwnedStocks,
    getCurrStock,
    // getTradesForCurrStock,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(StockPage));
