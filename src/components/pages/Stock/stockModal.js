import TabsUnstyled from '@mui/base/TabsUnstyled';
import withStyles from '@mui/styles/withStyles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setOwnedStocks } from '../../../redux/actions/userActions';
import { Tab, TabsList } from '../../ui/Navigation/tabs';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Fade,
    Grid,
    Modal,
    Typography,
} from '@mui/material';
import { getCurrStock } from '../../../redux/actions/dataActions';
import { BootstrapInput } from '../../ui/TextInputs/textInputs';

import { isInvalidDate } from '../../../helpers/validDates';

import {
    CloseOutlined,
    InfoOutlined,
    SellOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
    BRACKET_IMG_PATH,
    TOURNAMENT_NOT_STARTED,
    getQuadrant,
    getRoundName,
    getSide,
} from '../../../constants/constants';
const styles = (theme) => ({
    ...theme.spreadThis,
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '80%',
    maxHeight: '90%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(#000000, #1976d2) fixed',
    overflow: 'auto',
};

class StockModal extends Component {
    state = {
        // stockId: waitForURLUpdate(),
        numToSell: '',
        sellPrice: '',
        numToBuy: '',
        numToIPOSell: '',
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
        this.attemptToIPOBuy = this.attemptToIPOBuy.bind(this);
        this.attemptToIPOSell = this.attemptToIPOSell.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stockId !== this.props.stockId) {
            this.props.getCurrStock(
                this.props.data,
                this.props.data.filters,
                this.props.stockId
            );
        }
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

    attemptToIPOSell = async () => {
        this.setState({ buyIsLoading: true });
        await axios({
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
            <Modal
                open={
                    this.props.stockId !== '' &&
                    !this.props.data.currStockLoading
                }
                onClose={this.props.onClose}
                closeAfterTransition
                // slots={{ backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                {this.props.stockId ? (
                    <Fade in={this.props.stockId !== ''}>
                        <Box sx={style}>
                            <div
                                style={{
                                    margin: 20,
                                    position: 'absolute',
                                    left: '94%',
                                }}
                            >
                                <CloseOutlined
                                    style={{
                                        color: 'white',
                                        cursor: 'pointer',
                                        position: 'fixed',
                                    }}
                                    onClick={this.props.onClose}
                                />
                            </div>
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
                                                this.props.data.currStock
                                                    .stockData === null ? (
                                                    <CircularProgress
                                                        size={30}
                                                    />
                                                ) : (
                                                    this.props.data.currStock
                                                        .stockData.stockName
                                                )}

                                                {this.props.data.loading ||
                                                this.props.data.currStock
                                                    .stockData === null ? (
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
                                                            backgroundColor:
                                                                'whitesmoke',
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
                                                {this.props.data.loading ||
                                                this.props.data.currStock
                                                    .stockData === null ? (
                                                    <CircularProgress
                                                        size={30}
                                                    />
                                                ) : (
                                                    this.props.data.currStock
                                                        .stockData.seed
                                                )}{' '}
                                                Seed (
                                                {this.props.data.loading ||
                                                this.props.data.currStock
                                                    .stockData === null ? (
                                                    <CircularProgress
                                                        size={30}
                                                    />
                                                ) : (
                                                    this.props.data.currStock
                                                        .stockData.bio
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
                                                        {this.props.data
                                                            .loading ||
                                                        this.props.data
                                                            .currStock
                                                            .stockData ===
                                                            null ? (
                                                            <CircularProgress
                                                                size={30}
                                                            />
                                                        ) : (
                                                            this.props.data
                                                                .currStock
                                                                .stockData
                                                                .currPoints
                                                        )}{' '}
                                                        Points (
                                                        {this.props.data
                                                            .loading ||
                                                        this.props.data
                                                            .currStock
                                                            .stockData ===
                                                            null ? (
                                                            <CircularProgress
                                                                size={30}
                                                            />
                                                        ) : (
                                                            this.props.data
                                                                .currStock
                                                                .stockData
                                                                .currPoints /
                                                            this.props.data
                                                                .currStock
                                                                .stockData.seed
                                                        )}{' '}
                                                        Win
                                                        {this.props.data
                                                            .currStock.stockData
                                                            .currPoints /
                                                            this.props.data
                                                                .currStock
                                                                .stockData
                                                                .seed !==
                                                        1
                                                            ? 's'
                                                            : ''}
                                                        )
                                                    </Typography>
                                                </>
                                            )}
                                            <br />
                                            <Typography
                                                variant="h6"
                                                // className={classes.pageTitle}
                                                align="center"
                                                style={{ textAlign: 'center' }}
                                            >
                                                <div
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {this.props.data.loading ||
                                                    this.props.data.currStock
                                                        .stockData === null ? (
                                                        <CircularProgress
                                                            size={30}
                                                        />
                                                    ) : this.props.data
                                                          .currStock.stockData
                                                          .hasLost ? (
                                                        'The ' +
                                                        this.props.data
                                                            .currStock.stockData
                                                            .stockName +
                                                        ' have been eliminated!'
                                                    ) : (
                                                        'The ' +
                                                        this.props.data
                                                            .currStock.stockData
                                                            .stockName +
                                                        ' are still alive!'
                                                    )}
                                                </div>
                                            </Typography>
                                        </Grid>

                                        {this.props.user &&
                                        this.props.user.authenticated &&
                                        TOURNAMENT_NOT_STARTED ? (
                                            <>
                                                <Grid
                                                    item
                                                    sm={2.5}
                                                    xs={1}
                                                ></Grid>
                                                <Grid
                                                    item
                                                    sm={7}
                                                    xs={10}
                                                    align="center"
                                                >
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
                                                                backgroundColor:
                                                                    'whitesmoke',
                                                                color: 'black',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            {this.state
                                                                .buyIsLoading ? (
                                                                <CircularProgress
                                                                    size={30}
                                                                />
                                                            ) : (
                                                                <>
                                                                    <Typography
                                                                        variant="h6"
                                                                        align="center"
                                                                        style={{
                                                                            display:
                                                                                'flex',
                                                                            alignItems:
                                                                                'center',
                                                                            justifyContent:
                                                                                'center',
                                                                        }}
                                                                    >
                                                                        Account
                                                                        Balance:{' '}
                                                                        <MonetizationOnIcon />
                                                                        {this
                                                                            .props
                                                                            .user
                                                                            .loading ||
                                                                        this
                                                                            .props
                                                                            .data
                                                                            .loading
                                                                            ? 'Loading...'
                                                                            : `${this.props.user.accountBalance.toFixed(
                                                                                  2
                                                                              )}`}
                                                                    </Typography>
                                                                    <br />

                                                                    <br />
                                                                    <Typography
                                                                        variant="h6"
                                                                        align="center"
                                                                        style={{
                                                                            display:
                                                                                'flex',
                                                                            alignItems:
                                                                                'center',
                                                                            justifyContent:
                                                                                'center',
                                                                        }}
                                                                    >
                                                                        You
                                                                        currently
                                                                        own{' '}
                                                                        <MonetizationOnIcon
                                                                            style={{
                                                                                marginLeft: 4,
                                                                            }}
                                                                        />
                                                                        {
                                                                            numSharesOwned
                                                                        }{' '}
                                                                        of this
                                                                        team.
                                                                    </Typography>
                                                                </>
                                                            )}
                                                            <div
                                                                style={{
                                                                    margin: 10,
                                                                    justifyContent:
                                                                        'space-between',
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        flexDirection:
                                                                            'column',
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'center',
                                                                        width: '50%',
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                'flex',
                                                                            alignItems:
                                                                                'center',
                                                                        }}
                                                                    >
                                                                        <SellOutlined />{' '}
                                                                        Sell
                                                                    </div>
                                                                    <BootstrapInput
                                                                        id="numToSell"
                                                                        name="numToSell"
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .numToSell
                                                                        }
                                                                        onChange={
                                                                            this
                                                                                .handleInputChange
                                                                        }
                                                                        placeholder="Amount to Sell"
                                                                        type="number"
                                                                        style={{
                                                                            textAlign:
                                                                                'center',
                                                                        }}
                                                                    ></BootstrapInput>
                                                                    <Button
                                                                        style={{
                                                                            minWidth: 160,
                                                                        }}
                                                                        color="primary"
                                                                        variant="contained"
                                                                        onClick={
                                                                            this
                                                                                .attemptToIPOSell
                                                                        }
                                                                        disabled={
                                                                            isInvalidDate() ||
                                                                            this
                                                                                .props
                                                                                .data
                                                                                .currStock
                                                                                .stockData ===
                                                                                null ||
                                                                            this
                                                                                .state
                                                                                .numToSell <=
                                                                                0 ||
                                                                            this
                                                                                .state
                                                                                .numToSell ===
                                                                                null ||
                                                                            this
                                                                                .state
                                                                                .numToSell >
                                                                                numSharesOwned
                                                                        }
                                                                    >
                                                                        Sell $
                                                                        {this
                                                                            .state
                                                                            .numToSell
                                                                            ? this
                                                                                  .state
                                                                                  .numToSell
                                                                            : 0}{' '}
                                                                    </Button>
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        flexDirection:
                                                                            'column',
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'center',
                                                                        width: '50%',
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                'flex',
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
                                                                            this
                                                                                .state
                                                                                .numToBuy
                                                                        }
                                                                        onChange={
                                                                            this
                                                                                .handleInputChange
                                                                        }
                                                                        placeholder="Amount to Buy"
                                                                        type="number"
                                                                    ></BootstrapInput>
                                                                    <Button
                                                                        style={{
                                                                            minWidth: 160,
                                                                        }}
                                                                        color="primary"
                                                                        variant="contained"
                                                                        onClick={
                                                                            this
                                                                                .attemptToIPOBuy
                                                                        }
                                                                        disabled={
                                                                            isInvalidDate() ||
                                                                            this
                                                                                .props
                                                                                .data
                                                                                .currStock
                                                                                .stockData ===
                                                                                null ||
                                                                            this
                                                                                .state
                                                                                .numToBuy <=
                                                                                0 ||
                                                                            this
                                                                                .state
                                                                                .numToBuy ===
                                                                                null ||
                                                                            this
                                                                                .state
                                                                                .numToBuy *
                                                                                this
                                                                                    .props
                                                                                    .data
                                                                                    .currStock
                                                                                    .stockData
                                                                                    .ipoPrice >
                                                                                this
                                                                                    .props
                                                                                    .user
                                                                                    .accountBalance
                                                                        }
                                                                    >
                                                                        Buy $
                                                                        {this
                                                                            .state
                                                                            .numToBuy
                                                                            ? this
                                                                                  .state
                                                                                  .numToBuy
                                                                            : 0}{' '}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    justifyContent:
                                                                        'center',
                                                                    padding: 10,
                                                                    flexDirection:
                                                                        'column',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    <InfoOutlined />
                                                                    The{' '}
                                                                    {
                                                                        this
                                                                            .props
                                                                            .data
                                                                            .currStock
                                                                            .stockData
                                                                            .stockName
                                                                    }{' '}
                                                                    are a{' '}
                                                                    {
                                                                        this
                                                                            .props
                                                                            .data
                                                                            .currStock
                                                                            .stockData
                                                                            .seed
                                                                    }{' '}
                                                                    seed.
                                                                </div>
                                                                <br />
                                                                <div>
                                                                    For every
                                                                    dollar
                                                                    spent, you
                                                                    will earn{' '}
                                                                    {
                                                                        this
                                                                            .props
                                                                            .data
                                                                            .currStock
                                                                            .stockData
                                                                            .seed
                                                                    }{' '}
                                                                    points per
                                                                    win.
                                                                    {numSharesOwned >
                                                                        0 &&
                                                                        ' You currently own $' +
                                                                            numSharesOwned +
                                                                            '.'}
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
                                                                        <b>
                                                                            Wins
                                                                        </b>
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
                                                                        <b>
                                                                            Seed
                                                                        </b>
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
                                                                        <b>
                                                                            Amount
                                                                            ($)
                                                                        </b>
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
                                                                        <b>
                                                                            Total
                                                                            Points
                                                                        </b>
                                                                    </div>
                                                                </div>
                                                                <br />
                                                                {new Array(7)
                                                                    .fill(0)
                                                                    .map(
                                                                        (
                                                                            x,
                                                                            i
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        i
                                                                                    }
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
                                                                                        {
                                                                                            i
                                                                                        }{' '}
                                                                                        win
                                                                                        {i !==
                                                                                            1 &&
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
                                                                        }
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    item
                                                    sm={2.5}
                                                    xs={1}
                                                ></Grid>
                                            </>
                                        ) : (
                                            <Grid item xs={12}>
                                                {this.props.user &&
                                                TOURNAMENT_NOT_STARTED &&
                                                !this.props.user
                                                    .authenticated ? (
                                                    <Typography align="center">
                                                        Note: You must be logged
                                                        in to buy stock in this
                                                        team.
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

                                        <div
                                            style={{
                                                marginTop: 40,
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
                                                defaultValue={
                                                    this.state.currTab
                                                }
                                            >
                                                <div
                                                    style={{
                                                        justifyContent:
                                                            'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <TabsList>
                                                        <div
                                                            style={{
                                                                justifyContent:
                                                                    'center',
                                                                display: 'flex',
                                                            }}
                                                        >
                                                            {this.tabsToShow.map(
                                                                (tab) => {
                                                                    return (
                                                                        <Tab
                                                                            onClick={(
                                                                                event
                                                                            ) => {
                                                                                this.setState(
                                                                                    {
                                                                                        currTab:
                                                                                            tab.value,
                                                                                    }
                                                                                );
                                                                            }}
                                                                            value={
                                                                                tab.value
                                                                            }
                                                                            key={
                                                                                tab.label
                                                                            }
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    textAlign:
                                                                                        'center',
                                                                                    verticalAlign:
                                                                                        'center',
                                                                                }}
                                                                            >
                                                                                {
                                                                                    tab.label
                                                                                }
                                                                            </div>
                                                                        </Tab>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </TabsList>
                                                </div>
                                            </TabsUnstyled>
                                        </div>

                                        <Grid
                                            item
                                            xs={
                                                this.state.currTab !== 'full'
                                                    ? 2
                                                    : 0
                                            }
                                        />
                                        <Grid
                                            item
                                            xs={
                                                this.state.currTab !== 'full'
                                                    ? 8
                                                    : 12
                                            }
                                        >
                                            <img
                                                src={
                                                    this.state.currTab ===
                                                    'quadrant'
                                                        ? getQuadrant(
                                                              this.props.data
                                                                  .currStock
                                                                  .stockData
                                                                  .stockName
                                                          )
                                                        : this.state.currTab ===
                                                          'side'
                                                        ? getSide(
                                                              this.props.data
                                                                  .currStock
                                                                  .stockData
                                                                  .stockName
                                                          )
                                                        : BRACKET_IMG_PATH
                                                }
                                                width="100%"
                                                alt="bracket"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={
                                                this.state.currTab !== 'full'
                                                    ? 2
                                                    : 0
                                            }
                                        />

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
                        </Box>
                    </Fade>
                ) : (
                    <div></div>
                )}
            </Modal>
        );
    }
}

StockModal.propTypes = {
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
)(withStyles(styles)(StockModal));
