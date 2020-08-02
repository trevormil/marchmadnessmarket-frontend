import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

import { logOutUser } from '../../../redux/actions/userActions';
import store from '../../../redux/stores';

const useStyles = makeStyles({
    root: {
        flexGrow: 3,
    },
});

export default function CenteredTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const logOut = () => {
        store.dispatch(logOutUser());
        window.location.href = ROUTES.SIGN_IN;
    }

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Home" component={Link} to={ROUTES.HOME} />
                <Tab label="Screener" component={Link} to={ROUTES.BROWSE} />
                <Tab label="Portfolio" component={Link} to={ROUTES.PORTFOLIO} />
                <Tab label="Leaderboards" component={Link} to={ROUTES.LEADERBOARD} />
                <Tab label="Rules" component={Link} to={ROUTES.RULES} />
                <Tab label="Sign Out" onClick={logOut} />
            </Tabs >
        </Paper>
    );
}