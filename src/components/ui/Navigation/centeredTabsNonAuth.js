import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function CenteredTabsNonAuth() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <Tab label="Rules" component={Link} to={ROUTES.RULES} />
                <Tab label="Sign In" component={Link} to={ROUTES.SIGN_IN} />
            </Tabs >
        </Paper>
    );
}