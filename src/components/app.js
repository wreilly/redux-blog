import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        React simple starter (&lt; App.js!)
        {this.props.children}
      </div>
    );
  }
}
