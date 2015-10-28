import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/app';
import configureStore from './store/configureStore';

const store = configureStore();

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

render(
  <Provider store={store}><App /></Provider>,
  rootEl
);
