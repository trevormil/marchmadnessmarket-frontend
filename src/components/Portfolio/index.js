import React, { Component } from 'react'
import axios from 'axios';


class PortfolioPage extends Component {
    state = {
        stocks: null,
        error: null
    };

    componentDidMount() {
        const headers = {
            headers: { 'authorization': localStorage.FBIdToken }
        };
        axios.get("/userStocks", headers)
            .then(res => {
                console.log(res.data);
                this.setState({
                    stocks: res.data
                })
            })
            .catch((err) => {
                this.setState({
                    error: err.message
                })
            });
    }

    render() {
        let stockDisplay;
        if (this.state.error === null) {
            stockDisplay = this.state.stocks ? (
                this.state.stocks.map((stock) => <p key={stock.stockId}>{stock.stockId} : {stock.numShares} </p>)
            )
                : (<p>Loading</p>);
        } else {
            stockDisplay = <p>{this.state.error}</p>
        }

        return (
            <div className='portfolio' >
                <h1>Portfolio</h1>
                {stockDisplay}
            </div>
        )
    }
}

export default PortfolioPage;