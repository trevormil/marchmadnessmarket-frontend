import React from 'react';
import {
    Button,
    ListItem,
    List,
    Divider,
    Typography,
    ListItemIcon,
    CircularProgress,
} from '@mui/material';

import { isInvalidDate } from '../../../helpers/validDates';
//gets current open trades others have listd
export const getBuyTradeDisplay = (trades, userId, attemptToBuy, loading) => {
    if (loading) {
        return (
            <List>
                <Divider />
                <ListItem>
                    <CircularProgress size={30}></CircularProgress>
                </ListItem>
                <Divider />
            </List>
        );
    }
    let currTrade = false;
    const tradeDisplay = trades.map((trade) => {
        if (trade.completed === false && trade.sellingUserId !== userId) {
            currTrade = true;
            return (
                <div display="flexbox">
                    <ListItem>
                        <ListItemIcon padding="20px">
                            <Button
                                align="left"
                                color="primary"
                                variant="contained"
                                name={trade.tradeId}
                                onClick={attemptToBuy}
                                disabled={isInvalidDate()}
                            >
                                Buy
                            </Button>
                        </ListItemIcon>
                        <Typography>
                            {trade.sellingUserName} is selling{' '}
                            {trade.sharesTraded} shares at ${trade.sharesPrice}
                            /share
                        </Typography>
                    </ListItem>
                    <Divider />
                </div>
            );
        }
        return null;
    });
    if (currTrade)
        return (
            <List>
                <Divider />
                {tradeDisplay}
            </List>
        );
    else
        return (
            <List>
                <Divider />
                <ListItem>
                    <Typography>None available.</Typography>
                </ListItem>
                <Divider />
            </List>
        );
};

//gets current open trades that user is selling
export const getSellTradeDisplay = (
    trades,
    userId,
    attemptToRemove,
    loading
) => {
    if (loading) {
        return (
            <List>
                <Divider />
                <ListItem>
                    <CircularProgress size={30}></CircularProgress>
                </ListItem>
                <Divider />
            </List>
        );
    }
    let currTrade = false;
    const tradeDisplay = trades.map((trade) => {
        if (trade.completed === false && trade.sellingUserId === userId) {
            currTrade = true;
            return (
                <div display="flexbox">
                    <ListItem>
                        <ListItemIcon padding="20px">
                            <Button
                                align="left"
                                color="primary"
                                variant="contained"
                                name={trade.tradeId}
                                onClick={attemptToRemove}
                            >
                                Remove
                            </Button>
                        </ListItemIcon>
                        <Typography>
                            {trade.sellingUserName} is selling{' '}
                            {trade.sharesTraded} shares at ${trade.sharesPrice}
                            /share
                        </Typography>
                    </ListItem>
                    <Divider />
                </div>
            );
        }
        return null;
    });
    if (currTrade)
        return (
            <List>
                <Divider />
                {tradeDisplay}
            </List>
        );
    else
        return (
            <List>
                <Divider />
                <ListItem>
                    <Typography>None available.</Typography>
                </ListItem>
                <Divider />
            </List>
        );
};
