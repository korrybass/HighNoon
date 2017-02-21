import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar/CalendarContainer';

//for testing only
let options = {
    dailyView: "week"
};

ReactDOM.render( <Calendar options={options} />, document.getElementById('calendar') );