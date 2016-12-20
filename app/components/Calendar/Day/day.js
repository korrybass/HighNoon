import React from 'react';
import Event from '../Event/rc-event';

export default class Day extends React.Component {
    createEvents (){
        return this.props.events.map(function (x, idx) {
            console.log(x);
            return (
                <div key={idx}>
                    <Event date={x.format("ha")} title={'test'} />
                </div>
            );
        });
    }

    render() {
        return (
            <div >
                <p className="day-number">{this.props.dayNumber}</p>
                {this.createEvents()}
            </div>
        );
    }
}