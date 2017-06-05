import React, { Component } from 'react';
import Calendar from './components/Calendar/CalendarContainer';

//==========for testing only======
let options = {
    dailyView: "week"
};
//================================

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar options={options} />
      </div>
    );
  }
}

export default App;