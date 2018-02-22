import React, { Component } from 'react';
import CountDownWrapper from './components/CountDownWrapper/index';
import { strings } from './utils/strings';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'DE'
    };
  }

  setLanguage = () => {
    if (this.state.selectedLanguage === 'DE') {
      strings.setLanguage('de');
      this.setState({ selectedLanguage: 'EN' });
    } else {
      strings.setLanguage('en');
      this.setState({ selectedLanguage: 'DE' });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="title">{strings.TITLE}</div>
          <button onClick={this.setLanguage}>{this.state.selectedLanguage}</button>
        </header>
        <main>
          <CountDownWrapper />
        </main>
      </div>
    );
  }
}

export default App;
