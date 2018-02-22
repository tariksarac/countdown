import React from 'react';
import PropTypes from 'prop-types';
import './CountDownWrapper.css';
import CountDownItem from '../CountDownItem/index';
import { DatePicker, MuiThemeProvider } from 'material-ui';
import { muiTheme } from '../../utils/constants';
import {strings} from "../../utils/strings";

class CountDownWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsedTime: null,
      message: strings.SELECT_DATE
    };
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
      this.setState({ elapsedTime: elepsed, message: null });
        this.timerID = setInterval(() => this.tick(), 1000);
    } else {
        this.setState({ elapsedTime: null, message: strings.FUTURE_DATE });
        this.timerID && clearInterval(this.timerID);
    }
  };

  handleChange = (e, date) => {
    this.setTime(date);
  };

  render() {

    let msDiff = this.state.elapsedTime;
    let days = parseInt(msDiff / (24 * 3600 * 1000));
    let hours = parseInt(msDiff / (3600 * 1000) - days * 24);
    let mins = parseInt(msDiff / (60 * 1000) - days * 24 * 60 - hours * 60);
    let secs = parseInt(msDiff / 1000 - mins * 60 - days * 24 * 60 * 60 - hours * 60 * 60);

    return (
      <div className="count-down-wrapper">
        <div className="calendar">
          <MuiThemeProvider muiTheme={muiTheme}>
            <DatePicker
              onChange={this.handleChange}
              hintText={strings.CALENDAR_TITLE}
              container="inline"
            />
          </MuiThemeProvider>
        </div>
        <div className="count-down-container">
          <div className="start-text">{strings.STARTS_IN}</div>
          <div className="count-down-items-container">
            <CountDownItem time={days} period={strings.DAYS} />
            <CountDownItem time={hours} period={strings.HOURS} />
            <CountDownItem time={mins} period={strings.MINUTES} />
            <CountDownItem time={secs} period={strings.SECONDS} />
          </div>
          <div className="message">{this.state.message}</div>
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
