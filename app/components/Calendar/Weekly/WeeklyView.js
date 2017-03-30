import React from 'react';
import {timeDivMap } from '../timeMap';
import moment from 'moment';

const mockTimes = [
    {
        start: moment(),
        end: moment().add(30, 'minutes'),
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

  generateWeeklyEventElement (dayOfWeek, dates){
    dates = dates.map((x) => x.date)
    // remove mockTimes
    return mockTimes.map((x, idx) => {
      if(moment(x.start).day() === dayOfWeek && dates.indexOf(moment().date()) > -1 ){
          let diff = x.end.diff(x.start)
          diff = diff/1000 / 60;
        return (
          <div className={"rc-weekly-event"} key={idx} style={{top: this.calculateEventPositionToPixels(x), height: diff * 0.7 }}>
            
            <p className={"title"}>{x.title}</p>
          </div>
        )
      }
    })
  };
  
  getWeeklyDates (){
    let start = this.props.start || moment().startOf('isoWeek');
    let endDate = moment(this.props.start).endOf('isoWeek');
    let firstDate = (start.date() === 1) ? start.date() : start.date()-1;
    let limit = firstDate + 6;
    let dateArr = [];

    let numberOfDays = moment(start).daysInMonth();
    for (let i = firstDate; i <= limit; i++){ dateArr.push(i); }
    if(dateArr.indexOf(numberOfDays) === -1){
      dateArr = dateArr.map((x) => {
        return {month: start.month() + 1, date: x};
      })
    }
    else
    {
      let startHead = dateArr.slice(0, dateArr.indexOf(numberOfDays)+1);
      startHead = startHead.map((x) => { return {month: start.month() + 1, date: x} })
      let tailLength = dateArr.slice(dateArr.indexOf(numberOfDays)+1);
      tailLength = tailLength.map((x, idx) => { return {month: endDate.month() + 1, date: idx+1} })
      dateArr = [...startHead, ...tailLength];
    }
    return dateArr;
  }

  getPosition (xPos){
    let x = Math.floor(xPos / 1010 * 100);
    return x;
  };

  componentDidMount (){
    window.addEventListener("resize",  () => {
    // console.log('resizing', this);
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
  
  buildWeeklyDayCols (dates){
    let timeDivs = [];
    let dayClass;
    for (let i = 0; i <= 6; i++){
      timeDivs.push(
        <td key={i} className="rc-weekly-day-col">
          <div  ref={"day-column"+i} onClick={(e) => { this.onDayColClick(e, i)}} className="rc-col-eventwrapper" style={{height: "1008px", marginBottom: "-1008px"}}>
          {this.generateWeeklyEventElement(i, dates)}
        </div>
        </td>
      );
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
                <td className="rc-day-col">Sun {dates[0].month}/{dates[0].date}</td>
                <td className="rc-day-col">Mon {dates[1].month}/{dates[1].date}</td>
                <td className="rc-day-col">Tues {dates[2].month}/{dates[2].date}</td>
                <td className="rc-day-col">Wed {dates[3].month}/{dates[3].date}</td>
                <td className="rc-day-col">Thur {dates[4].month}/{dates[4].date}</td>
                <td className="rc-day-col">Fri {dates[5].month}/{dates[5].date}</td>
                <td className="rc-day-col">Sat {dates[6].month}/{dates[6].date}</td>
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
                      {this.buildWeeklySlots().map( (x) => { return x; })}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{width: "60px"}}>
                  {this.buildWeeklyTimes().map( (x) => { return x; })}
                </td>
                {this.buildWeeklyDayCols(dates).map( (x) => { return x; })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}