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
        arr.push({date: getPreviousMonth(date).date(range), day: range});
        range--;
    };
    return arr;
};

let getCalDatesOfNextMonth = (date) => {
    const lastDay = date.date(numberOfDaysInMonth(date));
    const dayOfWeek = getDayOfWeek(lastDay);
    let range = [];
    if(dayOfWeek !== 6){
        for (var i = 0; i < 7 - getDayOfWeek(lastDay) -1; i++) { range.push({date: getNextMonth(date).date(i+1), day: i+1} ); }
    }
    return range;
};

let buildMonthArray = (date, monthRange) => {
    let range = [];
    for (var i = 0; i < monthRange; i++) {range.push({date: new moment(date).date(i+1), day: i+1}); }
    return range;
};

let setMonthDatesView = (date) => {
    const previousMonthDateRange = numberOfDaysInMonth(getPreviousMonth(date));
    let prevMonthDates = getCalDatesOfPrevMonth(date, previousMonthDateRange);
    let nextMonthDates = getCalDatesOfNextMonth(moment(date));
    return  {
        dates: [...prevMonthDates.reverse(), ...buildMonthArray(date, numberOfDaysInMonth(date)), ...nextMonthDates],
        meta: {
            prevIdx: prevMonthDates.length - 1,
            nextIdx: buildMonthArray(date, numberOfDaysInMonth(date)).length + prevMonthDates.length
        }

    }
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

