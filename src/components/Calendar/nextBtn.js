import React from 'react';

export default class CalDateBtn extends React.Component {
    render() {
        return (
            <div className={this.props.buttonClass}>
                <button onClick={this.props.action}> {this.props.text} </button>
            </div>
        );
    }
}