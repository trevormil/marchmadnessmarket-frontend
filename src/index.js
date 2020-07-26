import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/pages/App/app';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

serviceWorker.unregister();