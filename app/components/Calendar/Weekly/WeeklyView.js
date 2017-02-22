import React from 'react';
import {timeDivMap } from './timeMap';
import moment from 'moment';

const mockTimes = [
    {
        start: moment(),
        end: moment().minute(30),
        title: "Time of schedule" 
    },
    {
        start: moment().add(3, 'hours'),
        end: moment().add(17, "minutes"),
        title: "Second time"
    }
];

export default class Week extends React.Component {
    constructor() {
        super();
        this.state = {
            viewHeight: "400px",
            newEvent: null,
            eventDataSource: [],
            newEvents: []
        };
    }

    calculateEventPositionToPixels (event) {
        let startingHour = moment(event.start).hours();
        let startingMinutes = moment(event.start).minutes();
        let position = (startingHour * 60 + startingMinutes) * 0.7;
        return position;
    }

    generateWeeklyEventElement (dayOfWeek){
        return mockTimes.map((x, idx) => {
            if(moment(x.start).day() === dayOfWeek){
               return <div className={"rc-weekly-event"} key={idx} style={{top: this.calculateEventPositionToPixels(x) }}>
                    <p className={"title"}>{x.title}</p>
                </div>
            }
        })
    };
    getWeeklyDates (){
      //Current Week
      let start = this.props.start || moment().startOf('isoWeek');
      debugger
      let firstDate = start.date()-1;
      let limit = firstDate + 6;
      let dateArr = [];
      for (let i = firstDate; i <= limit; i++){ dateArr.push(i); }
      return {dates: dateArr, month: start.month() + 1};
    }

    getPosition (xPos){
        let x = Math.floor(xPos / 1010 * 100);
        return x;
    };

    componentDidMount (){
        window.addEventListener("resize",  () => {
            console.log('resizing', this);
        })
    };
    buildWeeklyTimes (){
        return timeDivMap.map((x, idx) => {
            return <div className="rc-weekly-times" key={idx}><p className="rc-hourly-time"> {x}</p></div>;
        });
    };
    findEventPosition (hour){   
        return hourIndex * 21;
    };

    buildWeeklySlots (){
        let timeDivs = [];
        for (let i = 1; i <= 24; i++){
            timeDivs.push(
                <div key={i} className="rc-markercell">
                    <div className="rc-dualmarker"></div>
                </div>
            );
        }
        return timeDivs;
    }
    buildWeeklyDayCols (){
        let timeDivs = [];
        let dayClass;
        for (let i = 1; i <= 7; i++){
            timeDivs.push(<td key={i} className="rc-weekly-day-col">
                <div  ref={"day-column"+i} onClick={(e) => { this.onDayColClick(e, i)}} className="rc-col-eventwrapper" style={{height: "1008px", marginBottom: "-1008px"}}>
                   {this.generateWeeklyEventElement(i)}
                </div>
            </td>);
        }
        return timeDivs;
    }
    onDayColClick (e, ref){
        let eventPosY = e.clientY - e.target.offsetTop + this.refs['weeklyWrapper'].scrollTop;
        let elem = this.refs[ref];
        let nearestMultiple = Math.round(eventPosY / 21) * 21;
        let events = [...this.state.newEvents, {start: null, position: nearestMultiple}];
        this.setState({newEvents: events});
    }
    
    render() {
        let viewHeight = { height: "400px" };
        let dates = this.getWeeklyDates();
        return (
            <div className="rc-weekly-wrapper">
                <div>
                    <table className="rc-weekly-day-table">
                        <tbody>
                            <tr>
                                <td style={{width: "60px"}}>&nbsp;</td>
                                <td className="rc-day-col">Sun {dates.month}/{dates.dates[0]}</td>
                                <td className="rc-day-col">Mon {dates.month}/{dates.dates[1]}</td>
                                <td className="rc-day-col">Tues {dates.month}/{dates.dates[2]}</td>
                                <td className="rc-day-col">Wed {dates.month}/{dates.dates[3]}</td>
                                <td className="rc-day-col">Thur {dates.month}/{dates.dates[4]}</td>
                                <td className="rc-day-col">Fri {dates.month}/{dates.dates[5]}</td>
                                <td className="rc-day-col">Sat {dates.month}/{dates.dates[6]}</td>
                                <td style={{width: "10px"}}>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={viewHeight} ref="weeklyWrapper" className="rc-weekly-table-wrapper">
                    <table  className="rc-weekly-table">
                        <tbody>
                        <tr height="1">
                            <td style={ {width: '60px'}}></td>
                            <td colSpan="7">
                                <div className="rc-hours-wrapper">
                                    <div className="rc-weekly-hoursmarker">
                                        {this.buildWeeklySlots().map(function (x) {
                                            return x;
                                        })}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: "60px"}}>
                                {this.buildWeeklyTimes().map(function (x) { return x; })}
                            </td>
                            {this.buildWeeklyDayCols().map(function (x) { return x; })}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}