import React from 'react';
import Day from './Day/day';
import Week from './Weekly/WeeklyView';
import DailyView from './Daily/DailyView';
import CalDateBtn from './nextBtn';
import moment from 'moment';
import calUtils from '../../../logic/CalendarMonthLogic';
import {events} from '../../../data/events';
import {uuid} from '../../../helper/uuid';


export default class CalendarViewWrapper extends React.Component {
  constructor() {
    super();

    this.state = {
      currentMonth: moment(),
      currentWeek: moment().startOf('isoWeek'),
      currentDay: moment(),
      displayDates: [],
      currentDragElement: null,
      eventSource: events
    };
  }

  divideArray (arr, divisor) {
    let temp = [];
    return arr.map((x, idx) => {
      temp.push(x);
      if(((idx + 1) % divisor === 0)){
        var rowElem = (
          <div key={idx} className="rc-month-row">
            <table className="bg-grid-table">
              <tbody>
                <tr>{temp.map((x, idx) => <td className="rc-day-bg" key={idx}> &nbsp; </td>)}</tr>
              </tbody>
            </table>
            <table className="rc-event-table">
              <tbody>
                <tr>{temp.map((x, idx) => <td key={idx} className="day-number"> {x.props.dayNumber}</td>)}</tr>
                <tr> { temp.map((x) => {return x;}) }</tr>
              </tbody>
            </table>
          </div>
        );
        temp = [];
        return rowElem;
      }
    })
  }

  setCurrentDragItem (item){
    this.setState({currentDragElement: item});
  }
  getCurrentDragItem (item){
    let eventsCopy = [...this.state.eventSource];
    let tempDate = this.state.currentDragElement;
    tempDate.date = tempDate.date.date(item.day).month(item.date.month()).year(item.date.year());
    eventsCopy.forEach((x) => { if(x.id === tempDate.id){ x.date = moment(tempDate.date); } });
    this.setState({
      eventSource: eventsCopy,
      displayDates: this.divideArray(this.generateMonthlyDate(this.state.currentMonth), 7)
    });
  }
  generateMonthlyDate (date) {
    let monthData = calUtils.setMonthDatesView(date);
    const dayAction = (date) => {
      console.log("evt date >>", this.state.eventSource);
    };
    const dndActions = {
      dragAction: this.setCurrentDragItem.bind(this),
      dropAction: this.getCurrentDragItem.bind(this)
    };

    let events = this.state.eventSource;
    events.forEach((x) => { x['id'] = uuid() });

    return monthData.dates.map((x, idx) => {
      let dateEvents = events.filter((y) => { if(y.date.date() === x.date.date() && y.date.month() === x.date.month() && y.date.year() === x.date.year()) { return true; } });
      dateEvents = dateEvents.sort( (a, b) => { return a.date._d - b.date._d});
      let dayClass = (idx <= monthData.meta.prevIdx) ? "prev-month-day" : (idx >= monthData.meta.nextIdx) ? 'next-month-day' : "";
      return <Day dndActions={dndActions} events={dateEvents} className={'rc-day ' + dayClass} key={idx} rcDate={x.date} dayNumber={x.day} />;
    });
  };

  goToPrevMonth () {
    this.setState({
      currentMonth: calUtils.getPreviousMonth(this.state.currentMonth),
      displayDates: this.divideArray(this.generateMonthlyDate(calUtils.getPreviousMonth(this.state.currentMonth)), 7)
    });
  }

  goToNextMonth () {
    this.setState({
      currentMonth: calUtils.getNextMonth(this.state.currentMonth),
      displayDates: this.divideArray(this.generateMonthlyDate(calUtils.getNextMonth(this.state.currentMonth)), 7)
    });
  }

  componentDidMount () {
    this.setState({displayDates: this.divideArray(this.generateMonthlyDate(this.state.currentMonth), 7) })
  }

  getView(view){
    let viewObject = {
      day: <DailyView start={this.state.currentDay} />,
      week: <Week start={this.state.currentWeek} />,
      month: <div className="rc-cal-monthly">{this.state.displayDates}</div>
    };
    return viewObject[view];
  }

  formatHeaderDate (){
    switch(this.props.options.view){
      case 'day': 
        break;
      case 'week':
        let start = this.state.currentWeek.startOf('isoWeek') || moment().startOf('isoWeek');
        let endDate = moment(this.state.currentWeek ).endOf('isoWeek');
        let firstDate = (start.date() === 1) ? start.date() : start.date()-1;
        let dateArr = [];
        let numberOfDays = moment(start).daysInMonth();
          endDate = (endDate.date() === numberOfDays) ? endDate : moment(endDate).subtract(1, 'day')
        for (let i = firstDate; i <= firstDate + 6; i++){ dateArr.push(i); }
        if(dateArr.indexOf(numberOfDays) === -1){
          return <span>{this.state.currentWeek.format("MMM")} {dateArr[0]} &#8212; {dateArr[dateArr.length-1]}, {this.state.currentWeek.format("YYYY")}</span>;                    
        }
        else{
          if(this.state.currentWeek.format("YYYY") !== endDate.format("YYYY")){
            debugger
            return <span>{this.state.currentWeek.format("MMM")} {dateArr[0]}, {this.state.currentWeek.format("YYYY")} &#8212; { endDate.format("MMM") } { endDate.date() }, {endDate.format("YYYY")} </span>;   
          }
          else{
            endDate
            debugger
            return <span>{this.state.currentWeek.format("MMM")} {dateArr[0]} &#8212; { endDate.format("MMM") } { endDate.date() }, {this.state.currentWeek.format("YYYY")} </span>;                           
          }
        }
      case 'month':
        return <span>{this.state.currentMonth.format("MMMM")} <span>{this.state.currentMonth.year()}</span></span>;
    }
  }

  goToNextWeek () {
    let start = moment(this.state.currentWeek).add(1, 'weeks').startOf('isoWeek');
    this.setState({
      currentWeek: start
    })
  }

  goToPrevWeek () {
    let start = moment(this.state.currentWeek).subtract(1, 'weeks').startOf('isoWeek');
    this.setState({
      currentWeek: start
    })
  }

  goToNextDay(){
      let day = moment(this.state.currentDay).add(1, 'day');
      this.setState({ currentDay:  day});
  };
  
  goToPrevDay () {
    let day = moment(this.state.currentDay).subtract(1, 'day');
    this.setState({ currentDay:  day});
  }

  headerNavigation (type){
    var actions = {
      day: {
        next: this.goToNextDay.bind(this),
        prev: this.goToPrevDay.bind(this),
      },
      week: {
        next: this.goToNextWeek.bind(this),
        prev: this.goToPrevWeek.bind(this),
      },
      month: {
        next: this.goToNextMonth.bind(this),
        prev: this.goToPrevMonth.bind(this)
      }
    }
    return actions[type];
  }

  render() {
    let view = this.getView(this.props.options.view);
    let dateHeaderFormat = this.formatHeaderDate();
    console.log(this.props )
    //---------
    //create a component for the header of the calendar
    //--------------------------
    return (
      <div className="calendar-container">
        <p>Calendar</p>
        <div className="calendar-header center-align-flex-row">
          <div className="calendar-btns center-align-flex-row">
            <CalDateBtn  buttonClass="rc-prev-btn rc-arrow-left rc-date-btn" 
            action={() => { this.headerNavigation(this.props.options.view).prev() }} />
            <CalDateBtn text=">" buttonClass="rc-next-btn rc-date-btn" 
            action={() => { this.headerNavigation(this.props.options.view).next() }} />
            <h2 className="monthTitle">{dateHeaderFormat}</h2>
          </div>
          <div className="right-align-flex-row">
            <button onClick={() => this.props.viewAction("day") }>Day</button>
            <button onClick={() => this.props.viewAction("week")}>Week</button>
            <button onClick={() => this.props.viewAction("month")}>Month</button>
          </div>
        </div>
        <div>
          {view}
        </div>
      </div>
    );
  }  
}