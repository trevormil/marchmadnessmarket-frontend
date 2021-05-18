import React from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "@material-ui/core";
import * as ROUTES from "../../../constants/routes";
//import store from "../../../redux/stores";

const getInitialState = () => {
  const pathName = window.location.pathname.split("/");
  if (pathName[pathName.length - 2] === "stocks") {
    return ROUTES.BROWSE;
  } else return `/${pathName.pop()}`;
};
class TabBase extends React.Component {
  state = {
    value: getInitialState(),
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
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        centered
      >
        {authenticatedTabs.map((tab) => {
              if (tab.buttonOnClick)
                return (
                  <Tab
                    key={tab.label}
                    label={tab.label}
                    value={tab.linkTo}
                    onClick={this.logOut}
                  />
                );
              //hard coded for sign out tab currently
              else
                return (
                  <Tab
                    key={tab.label}
                    label={tab.label}
                    value={tab.linkTo}
                    component={Link}
                    to={tab.linkTo}
                  />
                );
            })
          }
      </Tabs>
    );
  }
}
const authenticatedTabs = [
  {
    label: "Home",
    linkTo: ROUTES.HOME,
  },
  {
    label: "Bracket",
    linkTo: ROUTES.BRACKET,
  },
  {
    label: "SCHEDULE",
    linkTo: ROUTES.SCHEDULE,
  },
  {
    label: "Screener",
    linkTo: ROUTES.BROWSE,
  },/*
  {
    label: "Market",
    linkTo: ROUTES.MARKET,
  },*/
  {
    label: "Portfolio",
    linkTo: ROUTES.PORTFOLIO,
  },/*
  {
    label: "Leaderboards",
    linkTo: ROUTES.LEADERBOARD,
  },*/
  {
    label: "Rules",
    linkTo: ROUTES.RULES,
  }
];

export default TabBase;
