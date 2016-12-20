import React from 'react';

export default class Event extends React.Component {
    render() {
        return (
            <div >
                <span className="rc-event">
                    <span className="rc-event-time">{this.props.date} </span>
                    <span className="rc-event-text">{this.props.title}</span>
                    </span>
            </div>
        );
    }
}