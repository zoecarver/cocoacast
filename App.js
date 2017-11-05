console.disableYellowBox = true;

import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tbd from './src/reducers/';
import Home from './src/components/';
import logger from 'redux-logger';
import track from './src/actions/analytics';

let store = createStore(tbd, applyMiddleware(logger))

export default class App extends Component {
  render() {
    track('Home');

    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}


/* TODO:
* - https://facebook.github.io/react-native/docs/performance.html#using-console-log-statements
* - https://facebook.github.io/react-native/docs/performance.html#listview-initial-rendering-is-too-slow-or-scroll-performance-is-bad-for-large-lists
* - figure out why redux only triggers re-render after first deletion of podcast
* - implement refresh control https://facebook.github.io/react-native/docs/refreshcontrol.html
* - move to slide (animated)
*   + settings for animations
* -
*/