import React, { Component } from 'react';
import CountDownWrapper from './components/CountDownWrapper/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">COUNTER</header>
        <CountDownWrapper />
      </div>
    );
  }
}

export default App;
