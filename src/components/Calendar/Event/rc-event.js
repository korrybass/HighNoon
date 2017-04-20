import React from 'react';

export default class Event extends React.Component {

  evtClick (e){
    e.stopPropagation();
    console.log('clicked event',e);
  }

  preventDefault(e){
    e.preventDefault();
  }
  dragStart (e, a){      
    this.props.dndActions.dragAction(this.props.eventDate);
  }
  dragEvent (e, a){
  }
  dropEvent(e) {
    console.log(e, "drop event");
  }
  grabEvent (e) {
    console.log('dragging event', e);
    this.dragEvent(e);
  }
  render() {
    return (
      <div draggable='true'
           ref="rc-event"
           onDragStart={this.dragStart.bind(this)}
           onDrag={this.dragEvent.bind(this)}
           onClick={this.evtClick.bind(this)}>
      <span className="rc-event">
        <span className="rc-event-time">{this.props.date} </span>
        <span className="rc-event-text">{this.props.title}</span>
      </span>
    </div>
    );
  }
}