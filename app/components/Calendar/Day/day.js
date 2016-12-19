import React from 'react';

export default class Day extends React.Component {
    render() {
        return (
            <div>
                <p className="day-number">{this.props.dayNumber}</p>
            </div>
        );
    }
}