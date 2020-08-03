import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { makeStyles } from '@material-ui/core/styles';


export default function CenteredTabsNonAuth() {
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
                <Tab label="Rules" component={Link} to={ROUTES.RULES} />
                <Tab label="Sign In" component={Link} to={ROUTES.SIGN_IN} />
            </Tabs >

        </div>
    );
}