import React from 'react';
import AuthUserContext from './context';
import withAuthentication from './withAuthentication';
import withAuthorization from './withAuthorization';

const Session = () => (
  <div>
    <h1>Session</h1>
  </div>
);

export { AuthUserContext, withAuthentication, withAuthorization };
export default Session;