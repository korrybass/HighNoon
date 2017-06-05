import React from 'react';
import calUtils from '../../logic/CalendarMonthLogic';

export default class NextBtn extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={this.props.buttonClass}>
                <button onClick={this.props.nextAction}> > </button>
            </div>
        );
    }
}