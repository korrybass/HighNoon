import React from 'react';
import Day from './Day/day';
import Week from './Weekly/WeeklyView';
import DailyView from './Daily/DailyView';
import moment from 'moment';
import calUtils from '../../logic/CalendarMonthLogic';
import {events} from '../../data/events';
import {uuid} from '../../helper/uuid';


export default class CalendarViewWrapper extends React.Component {
  constructor() {
    super();

    this.state = {
      currentMonth: moment(),
      currentWeek: moment().startOf('week'),
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
      var rowElem;
      if(((idx + 1) % divisor === 0)){
         rowElem = (
          <div key={idx} className="rc-month-row">
            <table className="bg-grid-table">
              <tbody>
                <tr>{temp.map((x, idx) => <td className="rc-day-bg" key={idx}> &nbsp; </td>)}</tr>
              </tbody>
            </table>
            <table className="rc-event-table">
              <tbody>
                <tr>{temp.map((x, idx) => <td key={idx} className="day-number"> {x.props.dayNumber}</td>)}</tr>
                <tr> { temp.map((x) => { return x; }) }</tr>
              </tbody>
            </table>
          </div>
        );
        temp = [];
        // return rowElem;
      }
      return rowElem;
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
  dndActions() {
    return {
      dragAction: this.setCurrentDragItem.bind(this),
      dropAction: this.getCurrentDragItem.bind(this)
    }
  }
  generateMonthlyDate (date) {
    let monthData = calUtils.setMonthDatesView(date);

    let events = this.state.eventSource;
    events.forEach((x) => { x['id'] = uuid() });
    return monthData.dates.map((x, idx) => {
      let dateEvents = events.filter((y) => { return y.date.date() === x.date.date() && y.date.month() === x.date.month() && y.date.year() === x.date.year(); });
      dateEvents = dateEvents.sort( (a, b) => { return a.date._d - b.date._d});
      let dayClass = (idx <= monthData.meta.prevIdx) ? "prev-month-day" : (idx >= monthData.meta.nextIdx) ? 'next-month-day' : "";
      return <Day dndActions={this.dndActions()} events={dateEvents} className={'rc-day ' + dayClass} key={idx} rcDate={x.date} dayNumber={x.day} />;
    }, this);
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
      week: <Week dndActions={ this.dndActions() } start={this.state.currentWeek} />,
      month: <div className="rc-cal-monthly">{this.state.displayDates}</div>
    };
    return viewObject[view];
  }
  
  dailyDates (date){
    let start = date || moment();
    let dateArr = [];
    var formattedDate = {month: start.month() + 1, date: start.date(), year: start.year(),dateObj: start};
    dateArr.push(formattedDate);
    return dateArr;
  };
  formatHeaderDate (){
    switch(this.props.options.view){
      case 'day':
        let dates = this.dailyDates(this.state.currentDay);
        return (
          <span>{moment(dates[0].dateObj).format('dddd') }  {dates[0].month}/{dates[0].date}/{dates[0].year}</span>
        )
      case 'week':
        let start = this.state.currentWeek.startOf('week') || moment().startOf('week');
        let end = moment(this.state.currentWeek ).endOf('week');
        let isDiffYear = start.format("YYYY") !== end.format("YYYY")
        const splitYear = isDiffYear ? start.format("YYYY") : ''
        const startDate = isDiffYear ? `${start.format("MMM D, YYYY")}` : start.format('MMM D')
        const endDate = `${end.format("MMM D, YYYY")}`
        return <span>{startDate} &#8212; {endDate}</span>;
      case 'month':
        return (
          <span>
            {this.state.currentMonth.format("MMMM")}
            <span>{this.state.currentMonth.year()}</span>
          </span>
        );
      default:
        return <span></span>
    }
  }

  goToNextWeek () {
    let start = moment(this.state.currentWeek).add(1, 'weeks').startOf('week');
    this.setState({
      currentWeek: start
    })
  }

  goToPrevWeek () {
    let start = moment(this.state.currentWeek).subtract(1, 'weeks').startOf('week');
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
    //---------
    //create a component for the header of the calendar
    //--------------------------
    return (
      <div className="calendar-container">
        <p>Calendar</p>
        <div className="calendar-header center-align-flex-row">
          <div className="calendar-btns center-align-flex-row">
            <button className="rc-arrow-left rc-prev-btn rc-date-btn" 
            onClick={() => { this.headerNavigation(this.props.options.view).prev() }}> 
              <div className="arr-icon"></div>
            </ button>

            <button className="rc-arrow-right rc-next-btn rc-date-btn" 
            onClick={() => { this.headerNavigation(this.props.options.view).next() }}> 
              <div className="arr-icon"></div>
            </ button>
            
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