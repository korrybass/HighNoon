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
        date: moment().day(5).hour(4),
        title: "Second Event"
    },
    {
        date: moment().day(5).hour(22),
        title: "Third Event"
    },
    {
        date: moment().day(5).hour(22),
        title: "Third Event"
    }
];