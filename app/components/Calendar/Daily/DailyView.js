import React from 'react';
import moment from 'moment';
import {timeDivMap } from '../timeMap';


const mockTimes = [
    {
        start: moment(),
        end: moment().minute(60),
        title: "Time of schedule" 
    },
    {
        start: moment().add(3, 'hours'),
        end: moment().add(17, "minutes"),
        title: "Second time"
    }
];

export default class DailyView extends React.Component {

  buildDailyCols(dates){
    return (
      <div  key={1} ref={"daily-day-column-1"} onClick={(e) => { this.onDayColClick(e, 'daily-day-column-1')}} className="rc-col-eventwrapper" style={{height: "1008px"}}>
          {this.generateWeeklyEventElement(this.props.start.day(), dates)}
        </div>
    );
  }

  generateWeeklyEventElement (dayOfWeek, dates){
    dates = dates.map((x) => x.date)
    // remove mockTimes
   
    return mockTimes.map((x, idx) => {
      if(moment(x.start).day() === dayOfWeek && dates.indexOf(moment().date()) > -1 && this.props.start.month() === x.start.month() ){
        return (
          <div className={"rc-weekly-event"} key={idx} style={{top: this.calculateEventPositionToPixels(x) }}>
            <p className={"title"}>{x.title}</p>
          </div>
        )
      }
    })
  };

  calculateEventPositionToPixels (event) {
    let startingHour = moment(event.start).hours();
    let startingMinutes = moment(event.start).minutes();
    let position = (startingHour * 60 + startingMinutes) * 0.7;
    return position;
  }

  onDayColClick (e, ref){
    let eventPosY = e.clientY - e.target.offsetTop + this.refs['weeklyWrapper'].scrollTop;
    let elem = this.refs[ref];
    let nearestMultiple = Math.round(eventPosY / 21) * 21;
    let events = [...this.state.newEvents, {start: null, position: nearestMultiple}];
    this.setState({newEvents: events});
  }
  
  buildDailySlots (){
    let timeDivs = [];
    for (let i = 1; i <= 24; i++){
      timeDivs.push(
        <div key={i} className="rc-markercell">
          <div className="rc-dualmarker"></div>
        </div>
      );
    }
    return timeDivs;
  };

  dailyDates (){

    let start = this.props.start || moment();
    let dateArr = [];
    var date = {month: start.month() + 1, date: start.date(), dateObj: start};
    dateArr.push(date);
    return dateArr;
  };
  
  buildTimeSlots(){
    return timeDivMap.map((x, idx) => {
      return <div className="rc-weekly-times" key={idx}><p className="rc-hourly-time"> {x}</p></div>;
    });
  };
  
  render(){
    let dates = this.dailyDates();
    return (
       <div>
         <div>
           <table className="rc-weekly-day-table">
             <tbody>
               <tr>
                <td style={{width: "60px"}}>&nbsp;</td>
                <td className="rc-day-col"> </td>
                <td style={{width: "10px"}}>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rc-weekly-table-wrapper">
          <table className="rc-weekly-table">
            <tbody>
              <tr height="1">
                <td style={ {width: '60px'}}></td>
                <td colSpan="1">
                  <div className="rc-hours-wrapper">
                    <div className="rc-weekly-hoursmarker">
                      {this.buildDailySlots().map( (x) => { return x;})}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{width: "60px"}}>
                  {this.buildTimeSlots().map( (x) => { return x; })}
                </td>
                <td className="rc-weekly-day-col">
                  {this.buildDailyCols(dates)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    )   
  }
}