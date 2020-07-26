import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CenteredTabsAuth from './centeredTabs';
import CenteredTabsNonAuth from './centeredTabsNonAuth';


class Navigation extends React.Component {
  render() {
    return (
      <div>
        {this.props.authenticated ? <CenteredTabsAuth /> : <CenteredTabsNonAuth />}
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    authenticated: state.user.authenticated,
    user: state.user
  }
)

Navigation.propTypes = {
  user: PropTypes.object.isRequired
}
export default connect(mapStateToProps)(Navigation);