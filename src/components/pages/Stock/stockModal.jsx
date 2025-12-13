import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrStock } from '../../../redux/actions/dataActions';
import { setOwnedStocks } from '../../../redux/actions/userActions';
import { isInvalidDate } from '../../../helpers/validDates';
import {
    TOURNAMENT_NOT_STARTED,
    getRoundName,
} from '../../../constants/constants';

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
            if (!this.props.data.currStock?.stockData?.stockName) return 0;
            const foundStock = this.props.user.ownedStocks.find(
                (stock) =>
                    stock.stockName ===
                    this.props.data.currStock?.stockData?.stockName
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
    handleInputChange = (name, value) => {
        this.setState({
            [name]: value,
        });
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
        const numSharesOwned = this.props.user.ownedStocks
            ? this.getNumSharesOwned()
            : 0;

        const filename = this.props.data.currStock?.stockData?.imageUrl;
        const isOpen =
            this.props.stockId !== '' &&
            !this.props.data.currStockLoading &&
            this.props.data.currStock?.stockData;

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={this.props.onClose}
                ></div>
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-auto transform transition-all">
                        <button
                            onClick={this.props.onClose}
                            className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="p-6 md:p-8 text-white">
                            <div className="max-w-5xl mx-auto space-y-6">
                                {/* Header Section */}
                                <div className="text-center space-y-4">
                                    {this.props.data.loading ||
                                    !this.props.data.currStock?.stockData ? (
                                        <div className="flex justify-center py-8">
                                            <svg
                                                className="animate-spin h-8 w-8 text-blue-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-center space-x-4">
                                                <h2 className="text-4xl font-bold text-white">
                                                    {
                                                        this.props.data
                                                            .currStock
                                                            ?.stockData
                                                            ?.stockName
                                                    }
                                                </h2>
                                                <img
                                                    className="w-16 h-16 rounded-lg bg-white p-2 border-2 border-slate-800"
                                                    src={filename}
                                                    alt="Team Logo"
                                                />
                                            </div>
                                            <div className="text-xl text-slate-300">
                                                <span className="font-semibold text-blue-400">
                                                    {
                                                        this.props.data
                                                            .currStock
                                                            ?.stockData?.seed
                                                    }
                                                </span>{' '}
                                                Seed (
                                                {
                                                    this.props.data.currStock
                                                        ?.stockData?.bio
                                                }
                                                )
                                            </div>
                                        </>
                                    )}
                                </div>

                                {!TOURNAMENT_NOT_STARTED && (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-400">
                                            {
                                                this.props.data.currStock
                                                    ?.stockData?.currPoints
                                            }{' '}
                                            Points
                                        </div>
                                        <div className="text-lg text-slate-300">
                                            (
                                            {this.props.data.currStock
                                                ?.stockData?.currPoints /
                                                this.props.data.currStock
                                                    ?.stockData?.seed}{' '}
                                            Win
                                            {this.props.data.currStock
                                                ?.stockData?.currPoints /
                                                this.props.data.currStock
                                                    ?.stockData?.seed !==
                                            1
                                                ? 's'
                                                : ''}
                                            )
                                        </div>
                                    </div>
                                )}

                                <div className="text-center">
                                    {this.props.data.loading ||
                                    !this.props.data.currStock?.stockData ? (
                                        <div className="flex justify-center py-4">
                                            <svg
                                                className="animate-spin h-6 w-6 text-blue-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : this.props.data.currStock?.stockData
                                          ?.hasLost ? (
                                        <div className="text-lg text-red-400 font-semibold">
                                            The{' '}
                                            {
                                                this.props.data.currStock
                                                    ?.stockData?.stockName
                                            }{' '}
                                            have been eliminated!
                                        </div>
                                    ) : (
                                        <div className="text-lg text-emerald-400 font-semibold">
                                            The{' '}
                                            {
                                                this.props.data.currStock
                                                    ?.stockData?.stockName
                                            }{' '}
                                            are still alive!
                                        </div>
                                    )}
                                </div>

                                {/* Buy/Sell Section */}
                                {this.props.user &&
                                this.props.user.authenticated &&
                                TOURNAMENT_NOT_STARTED ? (
                                    <div className="">
                                        {this.state.buyIsLoading ? (
                                            <div className="flex justify-center py-8">
                                                <svg
                                                    className="animate-spin h-8 w-8 text-blue-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center justify-center space-x-2 mb-4">
                                                    <svg
                                                        className="w-6 h-6 text-amber-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.613 1.242.96 2.853 1.236V18a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 15.766 14 14.991 14 14c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 11.092V9.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.613-1.242-.96-2.853-1.236V6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="text-lg font-semibold text-slate-300">
                                                        Account Balance: $
                                                        {this.props.user
                                                            .loading ||
                                                        this.props.data.loading
                                                            ? 'Loading...'
                                                            : this.props.user.accountBalance.toFixed(
                                                                  2
                                                              )}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-center space-x-2 mb-6">
                                                    <svg
                                                        className="w-5 h-5 text-amber-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.613 1.242.96 2.853 1.236V18a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 15.766 14 14.991 14 14c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 11.092V9.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.613-1.242-.96-2.853-1.236V6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="text-lg text-slate-300">
                                                        You currently own $
                                                        {numSharesOwned} of this
                                                        team.
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Sell Section */}
                                                    <div className="flex flex-col items-center space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                                                        <div className="flex items-center space-x-2 text-red-400">
                                                            <svg
                                                                className="w-6 h-6"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                                />
                                                            </svg>
                                                            <span className="text-lg font-semibold">
                                                                Sell
                                                            </span>
                                                        </div>
                                                        <input
                                                            min={0}
                                                            max={1000}
                                                            className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-white rounded-lg placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                                                            type="number"
                                                            value={
                                                                this.state
                                                                    .numToSell
                                                            }
                                                            onChange={(e) =>
                                                                this.handleInputChange(
                                                                    'numToSell',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Amount"
                                                        />
                                                        <button
                                                            className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                                                            onClick={
                                                                this
                                                                    .attemptToIPOSell
                                                            }
                                                            disabled={
                                                                isInvalidDate() ||
                                                                !this.props.data
                                                                    .currStock
                                                                    ?.stockData ||
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
                                                            Sell $
                                                            {this.state
                                                                .numToSell || 0}
                                                        </button>
                                                    </div>

                                                    {/* Buy Section */}
                                                    <div className="flex flex-col items-center space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                                                        <div className="flex items-center space-x-2 text-emerald-400">
                                                            <svg
                                                                className="w-6 h-6"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                                />
                                                            </svg>
                                                            <span className="text-lg font-semibold">
                                                                Buy
                                                            </span>
                                                        </div>
                                                        <input
                                                            min={0}
                                                            max={1000}
                                                            className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-white rounded-lg placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                                                            type="number"
                                                            value={
                                                                this.state
                                                                    .numToBuy
                                                            }
                                                            onChange={(e) =>
                                                                this.handleInputChange(
                                                                    'numToBuy',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Amount"
                                                        />
                                                        <button
                                                            className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                                                            onClick={
                                                                this
                                                                    .attemptToIPOBuy
                                                            }
                                                            disabled={
                                                                isInvalidDate() ||
                                                                !this.props.data
                                                                    .currStock
                                                                    ?.stockData ||
                                                                this.state
                                                                    .numToBuy <=
                                                                    0 ||
                                                                this.state
                                                                    .numToBuy ===
                                                                    null ||
                                                                this.state
                                                                    .numToBuy *
                                                                    (this.props
                                                                        .data
                                                                        .currStock
                                                                        ?.stockData
                                                                        ?.ipoPrice ||
                                                                        0) >
                                                                    (this.props
                                                                        .user
                                                                        ?.accountBalance ||
                                                                        0)
                                                            }
                                                        >
                                                            Buy $
                                                            {this.state
                                                                .numToBuy || 0}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="border-t border-slate-800 mt-6 pt-6">
                                                    <div className="flex items-center justify-center space-x-2 mb-4">
                                                        <svg
                                                            className="w-5 h-5 text-blue-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span className="text-lg font-semibold text-slate-300">
                                                            The{' '}
                                                            {
                                                                this.props.data
                                                                    .currStock
                                                                    ?.stockData
                                                                    ?.stockName
                                                            }{' '}
                                                            are a{' '}
                                                            {
                                                                this.props.data
                                                                    .currStock
                                                                    ?.stockData
                                                                    ?.seed
                                                            }{' '}
                                                            seed.
                                                        </span>
                                                    </div>
                                                    <p className="text-center text-slate-400 mb-6">
                                                        For every dollar spent,
                                                        you will earn{' '}
                                                        {
                                                            this.props.data
                                                                .currStock
                                                                ?.stockData
                                                                ?.seed
                                                        }{' '}
                                                        points per win.
                                                        {numSharesOwned > 0 &&
                                                            ` You currently own $${numSharesOwned}.`}
                                                    </p>

                                                    {/* Points Table */}
                                                    <div className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
                                                        <table className="w-full text-sm">
                                                            <thead>
                                                                <tr className="border-b border-slate-800">
                                                                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                                                                        Wins
                                                                    </th>
                                                                    <th className="text-center py-3 px-4 text-slate-300 font-semibold">
                                                                        Seed
                                                                    </th>
                                                                    <th className="text-center py-3 px-4 text-slate-300 font-semibold">
                                                                        Amount
                                                                        ($)
                                                                    </th>
                                                                    <th className="text-right py-3 px-4 text-slate-300 font-semibold">
                                                                        Total
                                                                        Points
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {new Array(7)
                                                                    .fill(0)
                                                                    .map(
                                                                        (
                                                                            x,
                                                                            i
                                                                        ) => (
                                                                            <tr
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                                                                            >
                                                                                <td className="py-3 px-4 text-slate-300">
                                                                                    {
                                                                                        i
                                                                                    }{' '}
                                                                                    win
                                                                                    {i !==
                                                                                    1
                                                                                        ? 's'
                                                                                        : ''}{' '}
                                                                                    (
                                                                                    {getRoundName(
                                                                                        64 /
                                                                                            Math.pow(
                                                                                                2,
                                                                                                i
                                                                                            )
                                                                                    )}

                                                                                    )
                                                                                </td>
                                                                                <td className="py-3 px-4 text-center text-slate-300">
                                                                                    {
                                                                                        this
                                                                                            .props
                                                                                            .data
                                                                                            .currStock
                                                                                            ?.stockData
                                                                                            ?.seed
                                                                                    }
                                                                                </td>
                                                                                <td className="py-3 px-4 text-center text-slate-300">
                                                                                    {numSharesOwned ||
                                                                                        1}
                                                                                </td>
                                                                                <td className="py-3 px-4 text-right text-blue-400 font-semibold">
                                                                                    {(numSharesOwned ||
                                                                                        1) *
                                                                                        i *
                                                                                        (this
                                                                                            .props
                                                                                            .data
                                                                                            .currStock
                                                                                            ?.stockData
                                                                                            ?.seed ||
                                                                                            0)}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        {this.props.user &&
                                        TOURNAMENT_NOT_STARTED &&
                                        !this.props.user.authenticated ? (
                                            <p className="text-slate-400">
                                                Note: You must be logged in to
                                                buy stock in this team.
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapActionsToProps)(StockModal);
