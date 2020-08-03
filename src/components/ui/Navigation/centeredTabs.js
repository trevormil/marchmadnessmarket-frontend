import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import * as ROUTES from '../../../constants/routes';

import { logOutUser } from '../../../redux/actions/userActions';
import store from '../../../redux/stores';

export default function CenteredTabs() {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: "#20c6b6",
            color: "#000"
        },
    }));
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const logOut = () => {
        store.dispatch(logOutUser());
    }

    return (
        <div className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                centered
            >
                <Tab label="Home" component={Link} to={ROUTES.HOME} />
                <Tab label="Screener" component={Link} to={ROUTES.BROWSE} />
                <Tab label="Portfolio" component={Link} to={ROUTES.PORTFOLIO} />
                <Tab label="Leaderboards" component={Link} to={ROUTES.LEADERBOARD} />
                <Tab label="Rules" component={Link} to={ROUTES.RULES} />
                <Tab label="Sign Out" onClick={logOut} />
            </Tabs >
        </div>
    );
}