import moment from "moment";
import calUtils from "../logic/CalendarMonthLogic";

describe("Calendar Month View", function() {
    let currentMonth, currentDay;
    beforeEach(function() {
        currentMonth = calUtils.getMonth();
        currentDay = calUtils.getDate();
    });

    it(" - should get current month", function() {
        expect(calUtils.getMonth()).toEqual(new Date().getMonth());
    });
    it(" - should get current day", function () {
        expect(calUtils.getDate()).toEqual(new Date().getDate());
    });
    it(" - should get day of the week", function () {
        expect(calUtils.getDayOfWeek(moment())).toEqual(new Date().getDay())
    });
    it(" - should return month before current month", function () {
       expect(calUtils.getMonth(calUtils.getPreviousMonth())).toEqual(calUtils.getMonth() - 1)
    });
    it(" - should be an array", function () {
        expect(calUtils.setMonthDatesView(moment())).toEqual(jasmine.any(Array))
    })
});