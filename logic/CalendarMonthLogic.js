import moment from "moment";

let getMonth = (month) => moment(month).month();
let getDate = (day) => moment(day).date();
let numberOfDaysInMonth = (month) => new moment(month).daysInMonth();
let getDayOfWeek = (date) => moment(date).day();
let getPreviousMonth = (month) => {
    return new moment(month).subtract(1, 'months')
};
let getNextMonth = (month) => new moment(month).add(1, 'months');


let getCalDatesOfPrevMonth = (date, range) => {
    let arr = [];
    let dateDiff = getDayOfWeek(date.date(1));
    for(let i = 0; i < dateDiff; ++i ){
        arr.push(range);
        range = range - 1;
    };
    return arr;
};

let getCalDatesOfNextMonth = (date) => {
    const lastDay = date.date(numberOfDaysInMonth(date));
    const dayOfWeek = getDayOfWeek(lastDay);
    let range = [];
    if(dayOfWeek !== 6){
        for (var i = 0; i < 7 - getDayOfWeek(lastDay) -1; i++) { range.push(i+1); }
    }
    return range;
};

let buildMonthArray = (monthRange) => {
    let range = [];
    for (var i = 0; i < monthRange; i++) { range.push(i+1); }
    return range;
};

let setMonthDatesView = (date) => {
    const previousMonthDateRange = numberOfDaysInMonth(getPreviousMonth(date));
    let prevMonthDates = getCalDatesOfPrevMonth(date, previousMonthDateRange);
    let nextMonthDates = getCalDatesOfNextMonth(moment(date));
    return [...prevMonthDates.reverse(), ...buildMonthArray(numberOfDaysInMonth(date)), ...nextMonthDates];
};

export default {
    getMonth,
    getDate,
    numberOfDaysInMonth,
    getDayOfWeek,
    getPreviousMonth,
    getNextMonth,
    getCalDatesOfPrevMonth,
    getCalDatesOfNextMonth,
    buildMonthArray,
    setMonthDatesView
};
