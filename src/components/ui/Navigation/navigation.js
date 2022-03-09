import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as ROUTES from '../../../constants/routes';
import { Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import TabBase from './tabs';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import useMediaQuery from '@mui/material/useMediaQuery';

const styles = (theme) => ({
    ...theme.spreadThis,
});

const getInitialState = () => {
    const pathName = window.location.pathname.split('/');
    if (pathName[pathName.length - 2] === 'stocks') {
        return ROUTES.BROWSE;
    } else return `/${pathName.pop()}`;
};

class Navigation extends React.Component {
    state = {
        value: getInitialState(),
        matches: window.matchMedia('(min-width: 1215px)').matches,
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        });
    };

    render() {
        console.log(this.state.matches);
        if (this.state.matches) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        verticalAlign: 'center',
                        alignItems: 'center',
                        overflow: 'auto',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            alignItems: 'center',
                            width: '30%',
                            color: 'white',
                            fontWeight: 'bolder',
                            fontSize: '1.25rem',
                        }}
                    >
                        <img
                            height={'50px'}
                            src="mmm-logo-cropped.jpg"
                            style={{ marginRight: '5px' }}
                        />
                    
                        <Typography
                            style={{
                                display: 'flex',
                                flexDirection: 'row-reverse',
                                textAlign: 'center',
                                verticalAlign: 'center',
                                alignItems: 'center',
                                color: 'white',
                                fontSize: 20,
                                padding: 10,

                                fontWeight: 'bolder',
                            }}
                        >
                            March Madness Market
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontWeight: 'bolder',
                            fontSize: '1.25rem',
                        }}
                    >
                        <TabBase
                            value={this.state.value}
                            authenticated={this.props.authenticated}
                            handleChange={this.handleChange}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            alignItems: 'center',
                            width: '30%',
                            color: 'white',
                            fontSize: '0.75rem',
                        }}
                    >
                        <TabBase
                            loggedInOnly
                            authenticated={this.props.authenticated}
                            value={this.state.value}
                            handleChange={this.handleChange}
                        />
                        {this.props.user.authenticated && (
                            <>
                                <Typography
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row-reverse',
                                        textAlign: 'center',
                                        verticalAlign: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        fontSize: 20,
                                        padding: 10,
                                    }}
                                >
                                    {this.props.user.accountBalance
                                        ? this.props.user.accountBalance
                                        : 0}
                                    <MonetizationOn
                                        style={{ paddingRight: 3 }}
                                    />
                                </Typography>
                                <Typography
                                    style={{
                                        flexDirection: 'row-reverse',
                                        textAlign: 'center',
                                        verticalAlign: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        fontSize: 20,
                                        padding: 10,
                                    }}
                                >
                                    {`${
                                        this.props.user.totalAccountValue
                                            ? this.props.user.totalAccountValue
                                            : 0
                                    } Points`}
                                </Typography>
                            </>
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        verticalAlign: 'center',
                        alignItems: 'center',
                        overflow: 'auto',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontWeight: 'bolder',
                            fontSize: '1.25rem',
                        }}
                    >
                        <TabBase
                            value={this.state.value}
                            authenticated={this.props.authenticated}
                            handleChange={this.handleChange}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '0.75rem',
                        }}
                    >
                        <TabBase
                            loggedInOnly
                            authenticated={this.props.authenticated}
                            value={this.state.value}
                            handleChange={this.handleChange}
                        />
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    user: state.user,
});

Navigation.propTypes = {
    user: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(withStyles(styles)(Navigation));
