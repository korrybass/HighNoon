import moment from "moment";

export let events = [
    {
        date: moment().hour(11),
        title: "First Event"
    },
    {
        date: moment().hour(4),
        title: "Second Event"
    },
    {
        date: moment().hour(22),
        title: "Third Event"
    },
    {
        date: moment().hour(22).month(11),
        title: "Third Event"
    },
    {
        date: moment().day(5).hour(11),
        title: "First Event"
    },
    {
        date: moment().day(2).hour(4),
        title: "Other Event"
    },
    {
        date: moment().day(5).hour(22),
        title: "Other Third Event"
    },
    {
        date: moment().day(5).hour(22),
        title: "Third Event"
    }
];