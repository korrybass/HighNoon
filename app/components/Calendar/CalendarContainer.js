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
            displayDates: this.generateMonthlyDate(moment()),
            displayView: 'month'
        };
    }

    dayClick (evt){
        console.log('evt',evt);
    }

    generateMonthlyDate (date) {
        let monthData = calUtils.setMonthDatesView(date);

        return monthData.map(function (x, idx) {
            return (
                <div className='rc-day' key={idx}>
                    <Day  dayNumber={x} />
                </div>
            );
        });
    }
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
    render() {
        return (
            <div className="calendar-container">
                <p>Calendar</p>
                <div>
                    <h2>{this.state.currentMonth.format("MMMM")} <span>{this.state.currentMonth.year()}</span></h2>
                    <CalDateBtn text="<" buttonClass="rc-prev-btn rc-date-btn" action={this.goToPrevMonth.bind(this)} />
                    <CalDateBtn text=">" buttonClass="rc-next-btn rc-date-btn" action={this.goToNextMonth.bind(this)} />
                </div>
                <div className="rc-cal-monthly">{this.state.displayDates}</div>
            </div>
        );
    }
}