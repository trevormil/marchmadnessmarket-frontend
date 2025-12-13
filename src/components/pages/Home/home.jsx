import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockModal from '../Stock/stockModal';
import { Hero } from './Hero';

class HomePage extends Component {
    state = {
        openModalStockId: '',
    };

    constructor(props) {
        super(props);
        this.setStockIdForModal = this.setStockIdForModal.bind(this);
    }

    setStockIdForModal(stockId) {
        this.setState({ openModalStockId: stockId });
    }

    render() {
        const { authenticated } = this.props.user;

        return (
            <>
                <StockModal
                    stockId={this.state.openModalStockId}
                    onClose={() => {
                        this.setStockIdForModal('');
                    }}
                />

                {/* Hero Section */}
                <Hero authenticated={authenticated} />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});
const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(HomePage);
