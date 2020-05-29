import React from 'react';
import { Link } from 'react-router-dom';
 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <Tabs>
    <header>
      <Tab>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.HOME}>Home</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </Tab>
      <Tab>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </Tab>
    </header>
  </Tabs>
);
 
export default Navigation;