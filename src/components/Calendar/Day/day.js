import React from 'react';
import Event from '../Event/rc-event';

export default class Day extends React.Component {
    createEvents (){
        return this.props.events.map( (x, idx) => {
            return (
                <div key={idx}>
                    <Event eventDate={x} dndActions={this.props.dndActions} eventInfo={x.date} date={x.date.format("ha")} title={x.title} />
                </div>
            );
        });
    }

    dayClick (e){
        e.stopPropagation();
        // console.log(e, 'day was clicked');
    }
    preventDefault(e){
        e.preventDefault();
    }
    dropEvent(e) {
        let obj = { day: this.props.rcDate.date(), date: this.props.rcDate };
        this.props.dndActions.dropAction(obj);
    }

    render() {
        return (
            <td onDragOver={this.preventDefault.bind(this)}
                onDrop={this.dropEvent.bind(this)}
                onClick={this.dayClick.bind(this)} className={this.props.className}>
                {this.createEvents()}
            </td>
        );
    }
}