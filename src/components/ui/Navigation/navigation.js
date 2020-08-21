import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles, } from '@material-ui/core';
import TabBase from './tabs';
const styles = (theme) => ({
  ...theme.spreadThis
});

class Navigation extends React.Component {
  render() {
    return (
      <TabBase authenticated={this.props.authenticated} />
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
export default connect(
  mapStateToProps
)(withStyles(styles)(Navigation));