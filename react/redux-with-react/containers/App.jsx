import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import parseMs from 'parse-ms';

import Timer from '../components/Timer';
import * as actions from '../actions';

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  render() {
    const { time, records } = this.props;

    return (
      <div className="app">
        <Timer { ...parseMs(time) } />
      </div>
    );
  }
}
