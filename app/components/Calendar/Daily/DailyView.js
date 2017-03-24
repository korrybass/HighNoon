import React from 'react';
import moment from 'moment';
import {timeDivMap } from '../timeMap';


export default class DailyView extends React.Component {

  buildDailyCols(){
    return <div> </div>;
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
                <td className="rc-day-col"> {moment(dates[0].dateObj).format('dddd') }  {dates[0].month}/{dates[0].date}</td>
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
                <td>
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