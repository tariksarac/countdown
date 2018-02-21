import React from 'react'
import './CountDownItem.css'

const CountDownItem = ({time, period}) => {
    return (
        <div className="count-down-item">
            <div className="number">{time}</div>
            <div className="period">{period}</div>
        </div>
    )
}

export default CountDownItem