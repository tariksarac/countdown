import React from 'react';
import PropTypes from 'prop-types';
import './CountDownWrapper.css';
import CountDownItem from '../CountDownItem/index';
import { DatePicker, MuiThemeProvider } from 'material-ui';
import { muiTheme } from '../../utils/constants';

class CountDownWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsedTime: null
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({
      elapsedTime: this.state.elapsedTime - 1000
    });
  };

  setTime = data => {
    let timeNow = new Date().setMilliseconds(0);
    let givenTime = new Date(data).setMilliseconds(0);
    let elepsed = givenTime - timeNow;

    if (elepsed > 0) {
      this.setState({ elapsedTime: elepsed });
    }
  };

  handleChange = (e, date) => {
    this.setTime(date);
  };

  render() {
    if (this.state.elapsedTime === null) {
      return <div>Select date</div>;
    }

    let msDiff = this.state.elapsedTime;
    let days = parseInt(msDiff / (24 * 3600 * 1000));
    let hours = parseInt(msDiff / (3600 * 1000) - days * 24);
    let mins = parseInt(msDiff / (60 * 1000) - days * 24 * 60 - hours * 60);
    let secs = parseInt(msDiff / 1000 - mins * 60 - days * 24 * 60 * 60 - hours * 60 * 60);

    return (
      <div className="count-down-wrapper" style={{ position: 'relative' }}>
        <div className="calendar" style={{ position: 'absolute', top: '10px', left: '20px' }}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <DatePicker
              onChange={this.handleChange}
              hintText="Black Friday date"
              container="inline"
              textFieldStyle={{ width: '100%', borderBottom: 0 }}
            />
          </MuiThemeProvider>
        </div>
        <div className="count-down-container">
          <div className="start-text">STARTS IN</div>
          <div className="count-down-items-container">
            <CountDownItem time={days} period={'days'} />
            <CountDownItem time={hours} period={'hours'} />
            <CountDownItem time={mins} period={'minutes'} />
            <CountDownItem time={secs} period={'seconds'} />
          </div>
        </div>
      </div>
    );
  }
}

CountDownWrapper.propTypes = {
  givenDate: PropTypes.string
};

CountDownWrapper.defaultProps = {
  givenDate: ''
};

export default CountDownWrapper;
