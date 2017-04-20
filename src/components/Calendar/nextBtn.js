import React from 'react';
import calUtils from '../../logic/CalendarMonthLogic';

export default class CalDateBtn extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={this.props.buttonClass}>
                <button onClick={this.props.action}> {this.props.text} </button>
            </div>
        );
    }
}