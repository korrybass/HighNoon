import React from 'react';
import Day from './Day/day';
import CalDateBtn from './nextBtn';
import moment from 'moment';
import calUtils from '../../../logic/CalendarMonthLogic';

export default class CalendarContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            currentMonth: moment(),
            displayDates: [],
            displayView: 'month',
            eventSource: [moment()]
        };
    }

    generateMonthlyDate (date) {
        let monthData = calUtils.setMonthDatesView(date);
        const dayAction = (date) => {
            console.log("evt date >>", this.state.eventSource);
        };

        let events = this.state.eventSource;
        return monthData.dates.map(function (x, idx) {
            let dateEvents = events.filter((y) => { if(y.date() === x.date.date()) { return true; } });
            let dayClass = (idx <= monthData.meta.prevIdx) ? "prev-month-day" : (idx >= monthData.meta.nextIdx) ? 'next-month-day' : "";
            return (
                <div onClick={() => {dayAction(x.date)}} className={'rc-day ' + dayClass} key={idx}>
                    <Day events={dateEvents} rcDate={x.date} dayNumber={x.day} />
                </div>
            );
        });
    };
    goToPrevMonth () {
        this.setState({
            currentMonth: calUtils.getPreviousMonth(this.state.currentMonth),
            displayDates: this.generateMonthlyDate(calUtils.getPreviousMonth(this.state.currentMonth))
        });
    }
    goToNextMonth () {
        this.setState({
            currentMonth: calUtils.getNextMonth(this.state.currentMonth),
            displayDates: this.generateMonthlyDate(calUtils.getNextMonth(this.state.currentMonth))
        });
    }

    componentDidMount () {
        this.setState({displayDates: this.generateMonthlyDate(moment())})
    }



    render() {
        return (
            <div className="calendar-container">
                <p>Calendar</p>
                <div>
                    <h2 >{this.state.currentMonth.format("MMMM")} <span>{this.state.currentMonth.year()}</span></h2>
                    <CalDateBtn text="<" buttonClass="rc-prev-btn rc-date-btn" action={this.goToPrevMonth.bind(this)} />
                    <CalDateBtn text=">" buttonClass="rc-next-btn rc-date-btn" action={this.goToNextMonth.bind(this)} />
                </div>
                <div className="rc-cal-monthly">{this.state.displayDates}</div>
            </div>
        );
    }
}