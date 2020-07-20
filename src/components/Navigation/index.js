import React from 'react';
import { Link } from 'react-router-dom';

import { Tab, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import * as ROUTES from '../../constants/routes';
import { authenticated } from '../App';

const Navigation = () => (
  <div>
    {
      authenticated ? <NavigationAuth /> : <NavigationNonAuth />
    }
  </div>
);
const NavigationAuth = () => (
  <TabList>
    <header>
      <Tab>
        <Link to={ROUTES.HOME}>Home</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.BROWSE}>Browse Stocks</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.NEWS}>News</Link>
      </Tab>
      <Tab>
        Search Bar
      </Tab>
      <Tab>
        <Link to={ROUTES.PORTFOLIO}>Portfolio</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.WATCHLIST}>Watchlist</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.ABOUT}>About Us</Link>
      </Tab>
    </header>
  </TabList>
);
const NavigationNonAuth = () => (
  <TabList>
    <header>
      <Tab>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </Tab>
    </header>
  </TabList>
);

export default Navigation;

